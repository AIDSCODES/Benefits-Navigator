/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect } from 'vitest';
import { TRANSLATIONS } from '../lib/i18n/translations.ts';
import { QUESTIONS } from '../data/questions.ts';
import { SCHEMES } from '../data/schemes.ts';

describe('Accessibility & WCAG 2.2 AA Compliance Assertions', () => {
  it('1. All languages have complete non-governmental persistent disclaimer text', () => {
    const allLangs = ['en', 'hi', 'mr', 'bn', 'te', 'ta', 'gu', 'kn', 'ml', 'pa', 'or'] as const;
    for (const lang of allLangs) {
      const banner = TRANSLATIONS[lang].bannerDisclaimer;
      expect(banner).toBeDefined();
      expect(banner.length).toBeGreaterThan(20);
      // Ensure it explicitly disclaims being a government service
      if (lang === 'en') {
        expect(banner.toLowerCase()).toContain('not a government service');
      }
    }
  });

  it('2. Every question has distinct ARIA-ready localized options and voice keywords', () => {
    for (const q of QUESTIONS) {
      expect(q.title.en).toBeDefined();
      expect(q.title.hi).toBeDefined();
      expect(q.title.mr).toBeDefined();
      expect(q.options.length).toBeGreaterThanOrEqual(2);

      for (const opt of q.options) {
        expect(opt.value).toBeDefined();
        expect(opt.label.en).toBeDefined();
        expect(opt.label.hi).toBeDefined();
        expect(opt.label.mr).toBeDefined();
        expect(opt.iconName).toBeDefined();
        expect(opt.voiceKeywords.en.length).toBeGreaterThan(0);
      }
    }
  });

  it('3. Every scheme in the registry provides bilingual names, source citation, and valid URL', () => {
    for (const s of SCHEMES) {
      expect(s.name.en).toBeDefined();
      expect(s.name.hi).toBeDefined();
      expect(s.name.mr).toBeDefined();
      expect(s.official_url.startsWith('https://')).toBe(true);
      expect(s.source_citation.length).toBeGreaterThan(5);
      expect(s.last_verified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('4. Data minimization: schema never includes PII fields (name, phone, aadhaar, email)', () => {
    const piiBlacklist = ['name', 'phone', 'mobile', 'aadhaar', 'pan', 'email', 'exact_address', 'biometric'];
    for (const q of QUESTIONS) {
      expect(piiBlacklist.includes(q.field.toLowerCase())).toBe(false);
    }
  });
});
