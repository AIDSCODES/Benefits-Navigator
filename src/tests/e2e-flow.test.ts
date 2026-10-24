/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect } from 'vitest';
import { evaluateAllSchemes } from '../lib/engine/evaluator.ts';
import { SCHEMES } from '../data/schemes.ts';
import { UserProfile } from '../lib/engine/types.ts';

describe('End-to-End Persona Verification Flows', () => {
  // Persona 1: Small Farmer in Maharashtra
  it('e2e flow 1: Small farmer in Maharashtra discovers PM-KISAN, PMSBY, PMJJBY and state pension', () => {
    // 1. Initial blank state
    let profile: UserProfile = {};
    let evalResults = evaluateAllSchemes(SCHEMES, profile);
    expect(evalResults.likelyMatch.length).toBe(0);

    // 2. User answers State = Maharashtra
    profile.state = 'Maharashtra';
    evalResults = evaluateAllSchemes(SCHEMES, profile);

    // 3. User answers Occupation = Farmer
    profile.occupation = 'farmer';

    // 4. User answers Landholding = Small (1-2 hectares)
    profile.landHolding = 'small';

    // 5. User answers Age Band = 36-50
    profile.ageBand = '36_50';

    // 6. User answers Income Band = Below ₹1 Lakh
    profile.incomeBand = 'below_1lakh';

    // 7. Re-evaluate
    evalResults = evaluateAllSchemes(SCHEMES, profile);

    // PM-KISAN must be in likelyMatch
    const pmKisanMatch = evalResults.likelyMatch.find((s) => s.schemeId === 'pm-kisan');
    expect(pmKisanMatch).toBeDefined();
    expect(pmKisanMatch!.status).toBe('LIKELY_MATCH');

    // PMSBY (18-70 insurance) must be in likelyMatch
    const pmsbyMatch = evalResults.likelyMatch.find((s) => s.schemeId === 'pmsby');
    expect(pmsbyMatch).toBeDefined();
    expect(pmsbyMatch!.status).toBe('LIKELY_MATCH');

    // Consolidated document checklist must include 7/12 land extract and Aadhaar
    const docs = evalResults.consolidatedDocuments;
    const landDoc = docs.find((d) => d.name.en.toLowerCase().includes('land'));
    expect(landDoc).toBeDefined();
    expect(landDoc!.mandatory).toBe(true);
  });

  // Persona 2: Low-Income Female Student
  it('e2e flow 2: Low-income female student from SC category discovers NSP and PM-JAY', () => {
    const studentProfile: UserProfile = {
      occupation: 'student',
      gender: 'female',
      ageBand: '18_35',
      socialCategory: 'sc',
      incomeBand: 'below_1lakh',
      rationCardStatus: 'antyodaya_bpl',
    };

    const evalResults = evaluateAllSchemes(SCHEMES, studentProfile);

    // National Scholarship Scheme must be likely match
    const nspMatch = evalResults.likelyMatch.find((s) => s.schemeId === 'nsp-post-matric');
    expect(nspMatch).toBeDefined();
    expect(nspMatch!.status).toBe('LIKELY_MATCH');

    // PM-JAY (Ayushman Bharat) must be likely match due to low income & BPL
    const pmJayMatch = evalResults.likelyMatch.find((s) => s.schemeId === 'pm-jay');
    expect(pmJayMatch).toBeDefined();
    expect(pmJayMatch!.status).toBe('LIKELY_MATCH');

    // Farmer-only scheme (PM-KISAN) must NOT match
    const pmKisan = evalResults.notMatched.find((s) => s.schemeId === 'pm-kisan');
    expect(pmKisan).toBeDefined();

    // Check that Caste Certificate is in consolidated checklist
    const casteDoc = evalResults.consolidatedDocuments.find((d) =>
      d.name.en.toLowerCase().includes('caste')
    );
    expect(casteDoc).toBeDefined();
    expect(casteDoc!.mandatory).toBe(true);
  });
});
