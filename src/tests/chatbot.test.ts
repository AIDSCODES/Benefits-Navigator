/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect } from 'vitest';
import { SCHEMES } from '../data/schemes.ts';

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
});
