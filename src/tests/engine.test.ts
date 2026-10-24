/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect } from 'vitest';
import { evaluateScheme, evaluateAllSchemes, isSchemeOutdated } from '../lib/engine/evaluator.ts';
import { SCHEMES } from '../data/schemes.ts';
import { SchemeRegistrySchema } from '../lib/engine/schema.ts';
import { UserProfile } from '../lib/engine/types.ts';

describe('Benefits Navigator Rules Engine', () => {
  const pmKisan = SCHEMES.find((s) => s.id === 'pm-kisan')!;
  const pmJay = SCHEMES.find((s) => s.id === 'pm-jay')!;
  const pmUjjwala = SCHEMES.find((s) => s.id === 'pm-ujjwala')!;
  const pmayG = SCHEMES.find((s) => s.id === 'pmay-g')!;
  const nsp = SCHEMES.find((s) => s.id === 'nsp-post-matric')!;
  const apy = SCHEMES.find((s) => s.id === 'apy')!;
  const pmsby = SCHEMES.find((s) => s.id === 'pmsby')!;
  const pmjjby = SCHEMES.find((s) => s.id === 'pmjjby')!;
  const svanidhi = SCHEMES.find((s) => s.id === 'pm-svanidhi')!;
  const ssy = SCHEMES.find((s) => s.id === 'ssy')!;
  const sgnry = SCHEMES.find((s) => s.id === 'mh-sanjay-gandhi-niradhar')!;

  // 1. Schema integrity
  it('01. validates that all 12 schemes conform to the Zod schema', () => {
    const parseResult = SchemeRegistrySchema.safeParse(SCHEMES);
    expect(parseResult.success).toBe(true);
    expect(SCHEMES.length).toBeGreaterThanOrEqual(12);
  });

  // 2. All-unknown profile never gives silent pass
  it('02. all-unknown empty profile yields POSSIBLE_NEED_MORE_INFO, never LIKELY_MATCH or eligible', () => {
    const emptyProfile: UserProfile = {};
    const result = evaluateScheme(pmKisan, emptyProfile);
    expect(result.status).toBe('POSSIBLE_NEED_MORE_INFO');
    expect(result.missing_inputs.length).toBeGreaterThan(0);
    expect(result.status).not.toBe('LIKELY_MATCH');
  });

  // 3. PM-KISAN landholding farmer match
  it('03. PM-KISAN matches a landholding farmer with low income', () => {
    const farmerProfile: UserProfile = {
      occupation: 'farmer',
      landHolding: 'small',
      incomeBand: 'below_1lakh',
    };
    const result = evaluateScheme(pmKisan, farmerProfile);
    expect(result.status).toBe('LIKELY_MATCH');
    expect(result.matched.length).toBeGreaterThanOrEqual(2);
    expect(result.failed.length).toBe(0);
  });

  // 4. PM-KISAN fails when landholding is none
  it('04. PM-KISAN fails when applicant holds no agricultural land', () => {
    const landlessProfile: UserProfile = {
      occupation: 'farmer',
      landHolding: 'none',
      incomeBand: 'below_1lakh',
    };
    const result = evaluateScheme(pmKisan, landlessProfile);
    expect(result.status).toBe('NOT_MATCHED');
    expect(result.failed.some((f) => f.criterion.field === 'landHolding')).toBe(true);
  });

  // 5. PM-KISAN fails when occupation is not farmer
  it('05. PM-KISAN fails when occupation is non-farmer', () => {
    const studentProfile: UserProfile = {
      occupation: 'student',
      landHolding: 'small',
    };
    const result = evaluateScheme(pmKisan, studentProfile);
    expect(result.status).toBe('NOT_MATCHED');
  });

  // 6. PM-JAY low income match
  it('06. PM-JAY matches low income family with BPL ration card', () => {
    const bplProfile: UserProfile = {
      incomeBand: 'below_1lakh',
      rationCardStatus: 'antyodaya_bpl',
    };
    const result = evaluateScheme(pmJay, bplProfile);
    expect(result.status).toBe('LIKELY_MATCH');
    expect(result.failed.length).toBe(0);
  });

  // 7. PM-JAY fails for above 5 lakh income
  it('07. PM-JAY fails when family income exceeds target threshold', () => {
    const richProfile: UserProfile = {
      incomeBand: 'above_5lakh',
    };
    const result = evaluateScheme(pmJay, richProfile);
    expect(result.status).toBe('NOT_MATCHED');
  });

  // 8. PM Ujjwala woman without gas match
  it('08. PM Ujjwala matches adult female in low income without existing LPG', () => {
    const womanProfile: UserProfile = {
      gender: 'female',
      ageBand: '18_35',
      incomeBand: 'below_1lakh',
      hasLPG: 'no',
    };
    const result = evaluateScheme(pmUjjwala, womanProfile);
    expect(result.status).toBe('LIKELY_MATCH');
  });

  // 9. PM Ujjwala fails for male applicant
  it('09. PM Ujjwala fails for male applicant as connection is only for adult woman', () => {
    const maleProfile: UserProfile = {
      gender: 'male',
      ageBand: '18_35',
      incomeBand: 'below_1lakh',
      hasLPG: 'no',
    };
    const result = evaluateScheme(pmUjjwala, maleProfile);
    expect(result.status).toBe('NOT_MATCHED');
    expect(result.failed.some((f) => f.criterion.field === 'gender')).toBe(true);
  });

  // 10. PM Ujjwala fails if household already has LPG
  it('10. PM Ujjwala fails if household already has an active LPG connection', () => {
    const existingLpgProfile: UserProfile = {
      gender: 'female',
      ageBand: '18_35',
      incomeBand: 'below_1lakh',
      hasLPG: 'yes',
    };
    const result = evaluateScheme(pmUjjwala, existingLpgProfile);
    expect(result.status).toBe('NOT_MATCHED');
  });

  // 11. PMAY-G matches kutcha / temporary housing
  it('11. PMAY-G matches low-income family living in kutcha/dilapidated house', () => {
    const kutchaProfile: UserProfile = {
      housingType: 'kutcha_temporary',
      incomeBand: 'below_1lakh',
    };
    const result = evaluateScheme(pmayG, kutchaProfile);
    expect(result.status).toBe('LIKELY_MATCH');
  });

  // 12. PMAY-G fails for permanent pucca house owner
  it('12. PMAY-G fails if applicant already owns a permanent pucca house', () => {
    const puccaProfile: UserProfile = {
      housingType: 'pucca_permanent',
      incomeBand: 'below_1lakh',
    };
    const result = evaluateScheme(pmayG, puccaProfile);
    expect(result.status).toBe('NOT_MATCHED');
  });

  // 13. NSP Post-Matric matches student from reserved/minority community
  it('13. NSP matches student from SC/ST/OBC with family income below 2.5L', () => {
    const studentProfile: UserProfile = {
      occupation: 'student',
      socialCategory: 'sc',
      incomeBand: 'below_1lakh',
    };
    const result = evaluateScheme(nsp, studentProfile);
    expect(result.status).toBe('LIKELY_MATCH');
  });

  // 14. NSP fails for non-student
  it('14. NSP fails if applicant is not a student', () => {
    const nonStudentProfile: UserProfile = {
      occupation: 'salaried',
      socialCategory: 'sc',
      incomeBand: 'below_1lakh',
    };
    const result = evaluateScheme(nsp, nonStudentProfile);
    expect(result.status).toBe('NOT_MATCHED');
  });

  // 15. NSP fails if income is above 2.5 Lakhs
  it('15. NSP fails if family income exceeds 2.5 Lakhs threshold', () => {
    const studentHighInc: UserProfile = {
      occupation: 'student',
      socialCategory: 'obc',
      incomeBand: '2_5lakh_5lakh',
    };
    const result = evaluateScheme(nsp, studentHighInc);
    expect(result.status).toBe('NOT_MATCHED');
  });

  // 16. APY matches 18-40 age group unorganized worker
  it('16. APY matches unorganized worker aged 18-40 with modest income', () => {
    const apyProfile: UserProfile = {
      ageBand: '18_35',
      incomeBand: 'below_1lakh',
    };
    const result = evaluateScheme(apy, apyProfile);
    expect(result.status).toBe('LIKELY_MATCH');
  });

  // 17. APY fails for 60+ applicant
  it('17. APY fails for applicant aged 60+ as entry cutoff is age 40', () => {
    const seniorProfile: UserProfile = {
      ageBand: '60_plus',
      incomeBand: 'below_1lakh',
    };
    const result = evaluateScheme(apy, seniorProfile);
    expect(result.status).toBe('NOT_MATCHED');
  });

  // 18. APY fails for high income taxpayer
  it('18. APY fails for high-income taxpayers excluded under PFRDA rules', () => {
    const richApyProfile: UserProfile = {
      ageBand: '18_35',
      incomeBand: 'above_5lakh',
    };
    const result = evaluateScheme(apy, richApyProfile);
    expect(result.status).toBe('NOT_MATCHED');
  });

  // 19. PMSBY matches adult in 18-70 age range
  it('19. PMSBY matches any adult aged 18-70', () => {
    const pmsbyProfile: UserProfile = {
      ageBand: '36_50',
    };
    const result = evaluateScheme(pmsby, pmsbyProfile);
    expect(result.status).toBe('LIKELY_MATCH');
  });

  // 20. PMSBY fails for under 18 child
  it('20. PMSBY fails for minor under age 18', () => {
    const childProfile: UserProfile = {
      ageBand: '0_17',
    };
    const result = evaluateScheme(pmsby, childProfile);
    expect(result.status).toBe('NOT_MATCHED');
  });

  // 21. PMJJBY matches adult in 18-50 age range
  it('21. PMJJBY matches adults aged 18-50', () => {
    const jjbyProfile: UserProfile = {
      ageBand: '18_35',
    };
    const result = evaluateScheme(pmjjby, jjbyProfile);
    expect(result.status).toBe('LIKELY_MATCH');
  });

  // 22. PMJJBY fails for applicant aged 51-59
  it('22. PMJJBY fails for applicant entering beyond age 50', () => {
    const olderProfile: UserProfile = {
      ageBand: '51_59',
    };
    const result = evaluateScheme(pmjjby, olderProfile);
    expect(result.status).toBe('NOT_MATCHED');
  });

  // 23. PM SVANidhi matches street vendor
  it('23. PM SVANidhi matches street vendor / hawker aged 18+', () => {
    const vendorProfile: UserProfile = {
      occupation: 'street_vendor',
      ageBand: '18_35',
    };
    const result = evaluateScheme(svanidhi, vendorProfile);
    expect(result.status).toBe('LIKELY_MATCH');
  });

  // 24. PM SVANidhi fails for salaried formal employee
  it('24. PM SVANidhi fails for salaried formal employee', () => {
    const salariedProfile: UserProfile = {
      occupation: 'salaried',
      ageBand: '18_35',
    };
    const result = evaluateScheme(svanidhi, salariedProfile);
    expect(result.status).toBe('NOT_MATCHED');
  });

  // 25. Sukanya Samriddhi matches household with girl child
  it('25. Sukanya Samriddhi matches parent with a girl child', () => {
    const ssyProfile: UserProfile = {
      hasGirlChild: 'yes',
    };
    const result = evaluateScheme(ssy, ssyProfile);
    expect(result.status).toBe('LIKELY_MATCH');
  });

  // 26. Sukanya Samriddhi fails for household without girl child
  it('26. Sukanya Samriddhi fails when there is no girl child in the household', () => {
    const noGirlProfile: UserProfile = {
      hasGirlChild: 'no',
    };
    const result = evaluateScheme(ssy, noGirlProfile);
    expect(result.status).toBe('NOT_MATCHED');
  });

  // 27. Sanjay Gandhi Niradhar matches destitute Maharashtra resident
  it('27. Sanjay Gandhi Niradhar matches low income Maharashtra resident', () => {
    const mhProfile: UserProfile = {
      state: 'Maharashtra',
      incomeBand: 'below_1lakh',
      occupation: 'unemployed',
    };
    const result = evaluateScheme(sgnry, mhProfile);
    expect(result.status).toBe('LIKELY_MATCH');
  });

  // 28. Sanjay Gandhi Niradhar fails for non-Maharashtra resident
  it('28. Sanjay Gandhi Niradhar fails for residents outside Maharashtra', () => {
    const karnatakaProfile: UserProfile = {
      state: 'Karnataka',
      incomeBand: 'below_1lakh',
      occupation: 'unemployed',
    };
    const result = evaluateScheme(sgnry, karnatakaProfile);
    expect(result.status).toBe('NOT_MATCHED');
    expect(result.failed.some((f) => f.criterion.field === 'state')).toBe(true);
  });

  // 29. Partial input surfaces missing_inputs
  it('29. Partial profile missing occupation surfaces missing_inputs', () => {
    const partialProfile: UserProfile = {
      landHolding: 'small',
    };
    const result = evaluateScheme(pmKisan, partialProfile);
    expect(result.status).toBe('POSSIBLE_NEED_MORE_INFO');
    expect(result.missing_inputs).toContain('occupation');
  });

  // 30. "prefer_not_to_say" does not throw or crash
  it('30. prefer_not_to_say values are treated as unknown without crashing', () => {
    const optOutProfile: UserProfile = {
      occupation: 'farmer',
      landHolding: 'marginal',
      gender: 'prefer_not_to_say',
      socialCategory: 'prefer_not_to_say',
      disability: 'prefer_not_to_say',
    };
    const result = evaluateScheme(pmKisan, optOutProfile);
    expect(result.status).toBe('LIKELY_MATCH');
  });

  // 31. Outdated scheme detection (>90 days)
  it('31. Flags scheme as outdated if last_verified is older than 90 days', () => {
    expect(isSchemeOutdated('2020-01-01', '2026-10-24')).toBe(true);
    expect(isSchemeOutdated('2026-10-01', '2026-10-24')).toBe(false);
  });

  // 32. Consolidated documents deduplication
  it('32. Consolidated documents correctly deduplicates shared certificates across schemes', () => {
    const profile: UserProfile = {
      occupation: 'farmer',
      landHolding: 'marginal',
      incomeBand: 'below_1lakh',
      ageBand: '18_35',
      rationCardStatus: 'antyodaya_bpl',
    };
    const evalAll = evaluateAllSchemes(SCHEMES, profile);
    const aadhaarDoc = evalAll.consolidatedDocuments.find(
      (d) => d.name.en.toLowerCase().includes('aadhaar')
    );
    expect(aadhaarDoc).toBeDefined();
    // Aadhaar should be required by multiple matching schemes
    expect(aadhaarDoc!.schemes.length).toBeGreaterThan(1);
  });

  // 33. Determinism test
  it('33. Engine is 100% deterministic over 50 iterations', () => {
    const testProfile: UserProfile = {
      occupation: 'student',
      socialCategory: 'sc',
      incomeBand: 'below_1lakh',
      ageBand: '18_35',
    };
    const firstResult = evaluateScheme(nsp, testProfile);
    for (let i = 0; i < 50; i++) {
      const iterResult = evaluateScheme(nsp, testProfile);
      expect(iterResult.status).toBe(firstResult.status);
      expect(iterResult.matched.length).toBe(firstResult.matched.length);
      expect(iterResult.reasons.en[0]).toBe(firstResult.reasons.en[0]);
    }
  });

  // 34. Multi-language explanation generation
  it('34. Produces human-readable reason strings in en, hi, and mr', () => {
    const profile: UserProfile = {
      occupation: 'farmer',
      landHolding: 'marginal',
    };
    const result = evaluateScheme(pmKisan, profile);
    expect(result.reasons.en.length).toBeGreaterThan(0);
    expect(result.reasons.hi.length).toBeGreaterThan(0);
    expect(result.reasons.mr.length).toBeGreaterThan(0);
    expect(result.reasons.hi[0]).toContain('मेल खाया');
    expect(result.reasons.mr[0]).toContain('जुळले');
  });
});
