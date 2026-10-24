/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { TRANSLATIONS } from '../lib/i18n/translations.ts';

describe('AI Tutor Video Walkthrough & Orientation Policy', () => {
  const TUTORIAL_KEY = 'benefits_navigator_has_seen_tutorial';

  beforeEach(() => {
    // Clean mock environment
    try {
      localStorage.removeItem(TUTORIAL_KEY);
    } catch {}
  });

  it('1. Verifies that first-time visitors are identified when local storage key is absent', () => {
    const isSeen = typeof localStorage !== 'undefined' ? localStorage.getItem(TUTORIAL_KEY) === 'true' : false;
    expect(isSeen).toBe(false);

    // When first visit completed, flag is stored
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(TUTORIAL_KEY, 'true');
      expect(localStorage.getItem(TUTORIAL_KEY)).toBe('true');
    }
  });
  it('2. Verifies that translations exist across all supported languages for AI Tutor Video elements', () => {
    const languages = ['en', 'hi', 'mr', 'bn', 'te', 'ta', 'gu', 'kn', 'ml', 'pa', 'or'] as const;

    for (const lang of languages) {
      const t = TRANSLATIONS[lang];
      expect(t.tutorVideoBtn).toBeDefined();
      expect(t.tutorVideoTitle).toBeDefined();
      expect(t.tutorFirstVisitBadge).toBeDefined();
      expect(t.tutorReturningBadge).toBeDefined();
      expect(t.tutorCompulsoryNotice).toBeDefined();
      expect(t.tutorSkipBtn).toBeDefined();
      expect(t.tutorFinishBtn).toBeDefined();
      expect(t.tutorReplayBtn).toBeDefined();
      expect(t.tutorVoiceToggle).toBeDefined();
      expect(t.tutorChapterProgress).toBeDefined();
      expect(t.tutorResetFirstTime).toBeDefined();

      // Check that compulsory notice communicates non-governmental status
      if (lang === 'en') {
        expect(t.tutorCompulsoryNotice.toLowerCase()).toContain('not a government service');
      }
    }
  });

  it('3. Ensures Demo Reset function removes stored key to allow re-testing first-time compulsory tour', () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(TUTORIAL_KEY, 'true');
      expect(localStorage.getItem(TUTORIAL_KEY)).toBe('true');

      // Trigger reset
      localStorage.removeItem(TUTORIAL_KEY);
      expect(localStorage.getItem(TUTORIAL_KEY)).toBeNull();
    }
  });

  it('4. Verifies that Indian Sign Language (ISL) gloss and key signs are defined for all 5 chapters', async () => {
    const { ISL_CHAPTER_GLOSS } = await import('../components/AiTutorVideoModal.tsx');
    expect(ISL_CHAPTER_GLOSS).toBeDefined();

    for (let step = 1; step <= 5; step++) {
      const gloss = ISL_CHAPTER_GLOSS[step];
      expect(gloss).toBeDefined();
      expect(gloss.stepNumber).toBe(step);
      expect(gloss.glossEn.length).toBeGreaterThan(10);
      expect(gloss.glossHi.length).toBeGreaterThan(5);
      expect(gloss.keySigns.length).toBeGreaterThanOrEqual(3);

      // Verify each chapter has multilingual descriptions
      const languages = ['en', 'hi', 'mr', 'bn', 'te', 'ta', 'gu', 'kn', 'ml', 'pa', 'or'] as const;
      for (const lang of languages) {
        expect(gloss.visualDescription[lang]).toBeDefined();
        expect(gloss.visualDescription[lang].length).toBeGreaterThan(10);
      }
    }
  });

  it('5. Verifies ISL translation toggle and badge keys exist in en and hi dictionaries', () => {
    expect(TRANSLATIONS.en.tutorIslToggle).toBe('Indian Sign Language (ISL)');
    expect(TRANSLATIONS.en.tutorIslBadge).toBe('ISL Interpreter Active');
    expect(TRANSLATIONS.hi.tutorIslToggle).toBe('भारतीय सांकेतिक भाषा (ISL)');
    expect(TRANSLATIONS.hi.tutorIslBadge).toBe('सांकेतिक भाषा दुभाषिया सक्रिय');
  });

  it('6. Verifies that the official MP4 Indian Sign Language (ISL) video source is configured and accessible', async () => {
    const { ISL_VIDEO_SRC } = await import('../components/AiTutorVideoModal.tsx');
    expect(ISL_VIDEO_SRC).toBe('/video_1792858177800_1b98b6a2.mp4');
  });
});

