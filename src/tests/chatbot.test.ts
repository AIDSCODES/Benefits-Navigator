/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect } from 'vitest';
import { SCHEMES } from '../data/schemes.ts';
import { extractProfileFromNaturalLanguage } from '../components/AiAssistantChatbot.tsx';
import { evaluateAllSchemes } from '../lib/engine/evaluator.ts';

describe('AI Welfare Assistant & Chatbot Knowledge Engine', () => {
  it('1. Correctly searches welfare schemes for agriculture/farmer queries', () => {
    const query = 'farmer schemes agriculture';
    const terms = query.toLowerCase().split(/\s+/);

    const matches = SCHEMES.filter((s) => {
      const name = (s.name.en || '').toLowerCase();
      const cat = (s.category || '').toLowerCase();
      const desc = (s.short_summary.en || '').toLowerCase();
      return terms.some((term) => term.length > 2 && (name.includes(term) || cat.includes(term) || desc.includes(term)));
    });

    expect(matches.length).toBeGreaterThan(0);
    const pmKisan = matches.find((s) => s.code.includes('KISAN'));
    expect(pmKisan).toBeDefined();
    expect(pmKisan?.name.en).toContain('PM-KISAN');
  });

  it('2. Correctly matches healthcare queries to Ayushman Bharat', () => {
    const query = 'ayushman bharat health insurance 5 lakh';
    const terms = query.toLowerCase().split(/\s+/);

    const matches = SCHEMES.filter((s) => {
      const name = (s.name.en || '').toLowerCase();
      const cat = (s.category || '').toLowerCase();
      const desc = (s.short_summary.en || '').toLowerCase();
      return terms.some((term) => term.length > 2 && (name.includes(term) || cat.includes(term) || desc.includes(term)));
    });

    expect(matches.length).toBeGreaterThan(0);
    const pmjay = matches.find((s) => s.code.includes('PM-JAY'));
    expect(pmjay).toBeDefined();
  });

  it('3. Ensures all schemes have valid English names and official URLs for assistant citation', () => {
    for (const scheme of SCHEMES) {
      expect(scheme.name.en).toBeTruthy();
      expect(scheme.official_url).toMatch(/^https?:\/\//);
      expect(scheme.documents).toBeDefined();
    }
  });

  it('4. Verifies AI Scheme Analysis data completeness across all schemes', () => {
    for (const scheme of SCHEMES) {
      // Must have code, name, category, and valid official government URL
      expect(scheme.code).toBeTruthy();
      expect(scheme.name.en).toBeTruthy();
      expect(scheme.name.hi).toBeTruthy();
      expect(scheme.name.mr).toBeTruthy();
      expect(scheme.official_url).toMatch(/^https?:\/\//);
      // Criteria & application steps must exist for AI step-by-step guidance
      expect(scheme.criteria.length).toBeGreaterThan(0);
      expect(scheme.documents.length).toBeGreaterThan(0);
      expect(scheme.steps.length).toBeGreaterThan(0);
    }
  });

  it('5. Correctly extracts user profile details from conversational natural language', () => {
    const text1 = 'I am a 22 year old student from Karnataka with 1.5 lakh income and SC category';
    const profile1 = extractProfileFromNaturalLanguage(text1);
    expect(profile1.state).toBe('Karnataka');
    expect(profile1.occupation).toBe('student');
    expect(profile1.ageBand).toBe('18_35');
    expect(profile1.incomeBand).toBe('1lakh_2_5lakh');
    expect(profile1.socialCategory).toBe('sc');

    const text2 = '65 year old farmer in Maharashtra earning 80000 rupees';
    const profile2 = extractProfileFromNaturalLanguage(text2);
    expect(profile2.state).toBe('Maharashtra');
    expect(profile2.occupation).toBe('farmer');
    expect(profile2.ageBand).toBe('60_plus');
    expect(profile2.incomeBand).toBe('below_1lakh');

    const text3 = 'senior citizen living in Delhi';
    const profile3 = extractProfileFromNaturalLanguage(text3);
    expect(profile3.state).toBe('Delhi');
    expect(profile3.ageBand).toBe('60_plus');
  });

  it('6. Instantly evaluates and recommends personalized schemes for extracted profiles', () => {
    const studentProfile = {
      state: 'Karnataka',
      occupation: 'student' as const,
      ageBand: '18_35' as const,
      incomeBand: '1lakh_2_5lakh' as const,
      socialCategory: 'sc' as const,
    };
    const studentEval = evaluateAllSchemes(SCHEMES, studentProfile);
    expect(studentEval.likelyMatch.length).toBeGreaterThan(0);
    const hasStudentScheme = studentEval.likelyMatch.some(
      (m) => m.scheme.id === 'ka-yuva-nidhi' || m.scheme.id === 'nsp-post-matric'
    );
    expect(hasStudentScheme).toBe(true);

    const farmerProfile = {
      state: 'Maharashtra',
      occupation: 'farmer' as const,
      ageBand: '36_50' as const,
      incomeBand: 'below_1lakh' as const,
      landHolding: 'small' as const,
    };
    const farmerEval = evaluateAllSchemes(SCHEMES, farmerProfile);
    expect(farmerEval.likelyMatch.length).toBeGreaterThan(0);
    const hasFarmerScheme = farmerEval.likelyMatch.some(
      (m) => m.scheme.id === 'pm-kisan' || m.scheme.id === 'mahadbt-farmer'
    );
    expect(hasFarmerScheme).toBe(true);
  });
});
