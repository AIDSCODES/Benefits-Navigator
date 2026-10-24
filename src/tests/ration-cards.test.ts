/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import http from 'http';
import {
  getRationCardOptionsForState,
  getRationCardHelpTextForState,
  hasCustomStateRationCards,
  STATE_RATION_CARD_MAP,
  DEFAULT_NFSA_RATION_OPTIONS,
} from '../data/rationCardsData.ts';
import { evaluateScheme } from '../lib/engine/evaluator.ts';
import { SCHEMES } from '../data/schemes.ts';
import { UserProfile } from '../lib/engine/types.ts';
import { createServerApp } from '../serverApp.ts';

describe('State-Tailored Ration Cards & Food Security Options', () => {
  let server: http.Server;
  let baseUrl: string;

  beforeAll(async () => {
    const app = createServerApp();
    server = http.createServer(app);
    await new Promise<void>((resolve) => {
      server.listen(0, '127.0.0.1', () => {
        const address = server.address() as { port: number };
        baseUrl = `http://127.0.0.1:${address.port}`;
        resolve();
      });
    });
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  it('01. provides customized options for major states with state-specific PDS terminology', () => {
    // 1. Maharashtra: Yellow (पिवळे), Kesari (केशरी), White (पांढरे)
    const mhOptions = getRationCardOptionsForState('Maharashtra');
    expect(mhOptions.length).toBeGreaterThanOrEqual(4);
    const mhLabelsEn = mhOptions.map((o) => o.label.en.toLowerCase());
    expect(mhLabelsEn.some((l) => l.includes('yellow'))).toBe(true);
    expect(mhLabelsEn.some((l) => l.includes('kesari') || l.includes('saffron'))).toBe(true);
    expect(mhLabelsEn.some((l) => l.includes('white'))).toBe(true);

    // 2. Tamil Nadu: Rice card (அரிசி), Sugar card (சர்க்கரை), No-commodity
    const tnOptions = getRationCardOptionsForState('Tamil Nadu');
    const tnLabelsEn = tnOptions.map((o) => o.label.en.toLowerCase());
    expect(tnLabelsEn.some((l) => l.includes('rice card'))).toBe(true);
    expect(tnLabelsEn.some((l) => l.includes('sugar card'))).toBe(true);
    expect(tnLabelsEn.some((l) => l.includes('no-commodity'))).toBe(true);

    // 3. Karnataka: Green / Anna Bhagya (ಹಸಿರು ಪಟ್ಟಿ), AAY, White NPHH
    const kaOptions = getRationCardOptionsForState('Karnataka');
    const kaLabelsEn = kaOptions.map((o) => o.label.en.toLowerCase());
    expect(kaLabelsEn.some((l) => l.includes('anna bhagya') || l.includes('priority'))).toBe(true);

    // 4. West Bengal: RKSY-I, RKSY-II, SPHH/PHH
    const wbOptions = getRationCardOptionsForState('West Bengal');
    const wbLabelsEn = wbOptions.map((o) => o.label.en.toLowerCase());
    expect(wbLabelsEn.some((l) => l.includes('rksy-i'))).toBe(true);
    expect(wbLabelsEn.some((l) => l.includes('rksy-ii'))).toBe(true);

    // 5. Uttar Pradesh: Patra Grihasti (पात्र गृहस्थी), Antyodaya Red card
    const upOptions = getRationCardOptionsForState('Uttar Pradesh');
    const upLabelsEn = upOptions.map((o) => o.label.en.toLowerCase());
    expect(upLabelsEn.some((l) => l.includes('patra grihasti'))).toBe(true);
    expect(upLabelsEn.some((l) => l.includes('red aay card') || l.includes('लाल'))).toBe(true);

    // 6. Telangana & Andhra Pradesh: White Food Security Card (FSC)
    const tgOptions = getRationCardOptionsForState('Telangana');
    const apOptions = getRationCardOptionsForState('Andhra Pradesh');
    expect(tgOptions.some((o) => o.label.en.includes('White Food Security Card'))).toBe(true);
    expect(apOptions.some((o) => o.label.en.includes('White Rice Card'))).toBe(true);

    // 7. Delhi: Pink Card (PHH), Yellow Card (AAY)
    const dlOptions = getRationCardOptionsForState('Delhi');
    expect(dlOptions.some((o) => o.label.en.includes('Pink Card'))).toBe(true);
    expect(dlOptions.some((o) => o.label.en.includes('Yellow Card'))).toBe(true);

    // 8. Kerala: Yellow, Pink, Blue, White cards
    const klOptions = getRationCardOptionsForState('Kerala');
    expect(klOptions.some((o) => o.label.en.includes('Yellow Card'))).toBe(true);
    expect(klOptions.some((o) => o.label.en.includes('Pink Card'))).toBe(true);
    expect(klOptions.some((o) => o.label.en.includes('Blue Card'))).toBe(true);
    expect(klOptions.some((o) => o.label.en.includes('White Card'))).toBe(true);

    // 9. Odisha: SFSS Green Card
    const odOptions = getRationCardOptionsForState('Odisha');
    expect(odOptions.some((o) => o.label.en.includes('SFSS Green Card'))).toBe(true);

    // 10. Punjab: Smart Ration Card (Atta-Dal Scheme)
    const pbOptions = getRationCardOptionsForState('Punjab');
    expect(pbOptions.some((o) => o.label.en.includes('Atta-Dal Scheme'))).toBe(true);
  });

  it('02. all options map strictly to canonical engine values (antyodaya_bpl, priority, none, unsure)', () => {
    const validCanonicalValues = new Set(['antyodaya_bpl', 'priority', 'none', 'unsure']);

    // Check default options
    for (const opt of DEFAULT_NFSA_RATION_OPTIONS) {
      expect(validCanonicalValues.has(opt.value)).toBe(true);
    }

    // Check all state overrides
    for (const [stateKey, config] of Object.entries(STATE_RATION_CARD_MAP)) {
      expect(config.options.length).toBeGreaterThanOrEqual(3);
      for (const opt of config.options) {
        expect(
          validCanonicalValues.has(opt.value),
          `Invalid value '${opt.value}' in state '${stateKey}'`
        ).toBe(true);
      }
    }
  });

  it('03. every state option satisfies accessibility, localization, and voice keyword standards', () => {
    for (const [stateKey, config] of Object.entries(STATE_RATION_CARD_MAP)) {
      expect(config.helpText.en).toBeDefined();
      expect(config.helpText.hi).toBeDefined();
      expect(config.helpText.mr).toBeDefined();

      for (const opt of config.options) {
        // Localized labels
        expect(opt.label.en.length, `${stateKey} label.en`).toBeGreaterThan(0);
        expect(opt.label.hi.length, `${stateKey} label.hi`).toBeGreaterThan(0);
        expect(opt.label.mr.length, `${stateKey} label.mr`).toBeGreaterThan(0);

        // Icon name
        expect(opt.iconName).toBeDefined();

        // Voice keywords
        expect(opt.voiceKeywords.en.length, `${stateKey} voice.en`).toBeGreaterThan(0);
        expect(opt.voiceKeywords.hi.length, `${stateKey} voice.hi`).toBeGreaterThan(0);
        expect(opt.voiceKeywords.mr.length, `${stateKey} voice.mr`).toBeGreaterThan(0);
      }
    }
  });

  it('04. falls back gracefully to standard NFSA options for undefined or unmapped states', () => {
    const fallbackUndefined = getRationCardOptionsForState(undefined);
    expect(fallbackUndefined).toEqual(DEFAULT_NFSA_RATION_OPTIONS);

    const fallbackOther = getRationCardOptionsForState('Other State');
    expect(fallbackOther).toEqual(DEFAULT_NFSA_RATION_OPTIONS);

    const fallbackUnknown = getRationCardOptionsForState('ImaginaryState');
    expect(fallbackUnknown).toEqual(DEFAULT_NFSA_RATION_OPTIONS);

    expect(hasCustomStateRationCards('Maharashtra')).toBe(true);
    expect(hasCustomStateRationCards('Other State')).toBe(false);
    expect(hasCustomStateRationCards(undefined)).toBe(false);
  });

  it('05. deterministic scheme evaluator matches PM-JAY using state-tailored card values', () => {
    const pmjay = SCHEMES.find((s) => s.id === 'pm-jay')!;
    expect(pmjay).toBeDefined();

    // 1. Citizen with Maharashtra Kesari Card (mapped to 'priority')
    const mhProfile: UserProfile = {
      ageBand: '36_50',
      gender: 'female',
      state: 'Maharashtra',
      incomeBand: 'below_1lakh',
      rationCardStatus: 'priority', // Selected Kesari Card in QuestionFlow
    };
    const evalMh = evaluateScheme(pmjay, mhProfile);
    const rationCriterion = evalMh.matched.find((c) => c.criterion.field === 'rationCardStatus');
    expect(rationCriterion).toBeDefined();
    expect(rationCriterion?.matched).toBe(true);

    // 2. Citizen with Maharashtra White Card (mapped to 'none')
    const mhWhiteProfile: UserProfile = {
      ageBand: '36_50',
      gender: 'female',
      state: 'Maharashtra',
      incomeBand: 'below_1lakh',
      rationCardStatus: 'none', // Selected White Card in QuestionFlow
    };
    const evalMhWhite = evaluateScheme(pmjay, mhWhiteProfile);
    const whiteCriterion = evalMhWhite.failed.find((c) => c.criterion.field === 'rationCardStatus');
    expect(whiteCriterion).toBeDefined();
    expect(whiteCriterion?.matched).toBe(false);
  });

  it('06. GET /api/ration-cards and /api/ration-cards/:state API endpoints return correct metadata', async () => {
    // Test all states endpoint
    const resAll = await fetch(`${baseUrl}/api/ration-cards`);
    expect(resAll.status).toBe(200);
    const dataAll = await resAll.json();
    expect(dataAll.data.states.maharashtra).toBeDefined();
    expect(dataAll.data.states['tamil-nadu']).toBeDefined();

    // Test single state endpoint
    const resMh = await fetch(`${baseUrl}/api/ration-cards/Maharashtra`);
    expect(resMh.status).toBe(200);
    const dataMh = await resMh.json();
    expect(dataMh.hasCustomRules).toBe(true);
    expect(dataMh.options.length).toBeGreaterThanOrEqual(4);
    expect(dataMh.options[0].label.en).toContain('Yellow Card');

    // Test state details enrichment: GET /api/states/maharashtra includes rationCards
    const resState = await fetch(`${baseUrl}/api/states/maharashtra`);
    expect(resState.status).toBe(200);
    const dataState = await resState.json();
    expect(dataState.data.rationCards).toBeDefined();
    expect(dataState.data.rationCards.hasCustomRules).toBe(true);
    expect(dataState.data.rationCards.options.length).toBeGreaterThanOrEqual(4);
  });
});
