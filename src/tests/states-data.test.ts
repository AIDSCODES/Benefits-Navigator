/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import http from 'http';
import { STATES_AND_UTS_DATA, getStateData } from '../data/statesData.ts';
import { QUESTIONS } from '../data/questions.ts';
import { SCHEMES } from '../data/schemes.ts';
import { evaluateScheme } from '../lib/engine/evaluator.ts';
import { UserProfile } from '../lib/engine/types.ts';
import { createServerApp } from '../serverApp.ts';

describe('States & Union Territories Comprehensive Data Layer', () => {
  let server: http.Server;
  let baseUrl: string;

  beforeAll(async () => {
    const app = createServerApp();
    server = app.listen(0);
    const addr = server.address() as { port: number };
    baseUrl = `http://127.0.0.1:${addr.port}`;
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  it('01. contains exactly 36 jurisdictions: 28 States and 8 Union Territories', () => {
    expect(STATES_AND_UTS_DATA).toHaveLength(36);

    const states = STATES_AND_UTS_DATA.filter((s) => s.type === 'state');
    const uts = STATES_AND_UTS_DATA.filter((s) => s.type === 'union_territory');

    expect(states).toHaveLength(28);
    expect(uts).toHaveLength(8);
  });

  it('02. validates that every State and UT has official government portal on .gov.in (or .nic.in)', () => {
    for (const item of STATES_AND_UTS_DATA) {
      expect(item.id).toBeTruthy();
      expect(item.code).toHaveLength(2);
      expect(item.name).toBeTruthy();
      expect(item.capital).toBeTruthy();
      expect(item.regionalLanguages.length).toBeGreaterThanOrEqual(1);

      // Localized name
      expect(item.localizedName.en).toBeTruthy();
      expect(item.localizedName.hi).toBeTruthy();
      expect(item.localizedName.mr).toBeTruthy();

      // Official portal
      expect(item.portal.name).toBeTruthy();
      expect(
        item.portal.url.includes('.gov.in') || item.portal.url.includes('.nic.in'),
        `${item.name} portal URL (${item.portal.url}) must be on official .gov.in or .nic.in`
      ).toBe(true);
      expect(item.portal.department).toBeTruthy();
      expect(item.portal.keyServices.length).toBeGreaterThanOrEqual(2);

      // Documents & flagship schemes
      expect(item.keyDocuments.length, `Expected keyDocuments for ${item.name}`).toBeGreaterThanOrEqual(1);
      expect(item.flagshipSchemes.length, `Expected flagshipSchemes for ${item.name}`).toBeGreaterThanOrEqual(1);
    }
  });

  it('03. getStateData helper correctly finds state by ID or code', () => {
    const karnataka = getStateData('karnataka');
    expect(karnataka).toBeDefined();
    expect(karnataka?.name).toBe('Karnataka');
    expect(karnataka?.code).toBe('KA');
    expect(karnataka?.capital).toBe('Bengaluru');

    const delhi = getStateData('DL');
    expect(delhi).toBeDefined();
    expect(delhi?.name).toBe('Delhi');
    expect(delhi?.type).toBe('union_territory');

    const maharashtra = getStateData('Maharashtra');
    expect(maharashtra).toBeDefined();
    expect(maharashtra?.capital).toBe('Mumbai');
  });

  it('04. QuestionFlow state question includes all 36 States/UTs with voice recognition keywords', () => {
    const stateQuestion = QUESTIONS.find((q) => q.field === 'state');
    expect(stateQuestion).toBeDefined();
    // 36 states/UTs + 1 "Other State" option = 37 options
    expect(stateQuestion!.options.length).toBeGreaterThanOrEqual(37);

    // Check specific states are available
    const optionValues = stateQuestion!.options.map((o) => o.value);
    expect(optionValues).toContain('Karnataka');
    expect(optionValues).toContain('West Bengal');
    expect(optionValues).toContain('Uttar Pradesh');
    expect(optionValues).toContain('Tamil Nadu');
    expect(optionValues).toContain('Maharashtra');
    expect(optionValues).toContain('Delhi');
    expect(optionValues).toContain('Ladakh');
    expect(optionValues).toContain('Other State');
  });

  it('05. deterministic evaluator matches state-specific schemes only to residents of that state', () => {
    const kaGruhaLakshmi = SCHEMES.find((s) => s.id === 'ka-gruha-lakshmi')!;
    expect(kaGruhaLakshmi).toBeDefined();

    // Resident of Karnataka
    const kaResident: UserProfile = {
      state: 'Karnataka',
      gender: 'female',
      incomeBand: 'below_1lakh',
    };
    const kaResult = evaluateScheme(kaGruhaLakshmi, kaResident);
    expect(kaResult.status).toBe('LIKELY_MATCH');
    expect(kaResult.failed).toHaveLength(0);

    // Resident of Maharashtra trying to access Karnataka scheme
    const mhResident: UserProfile = {
      state: 'Maharashtra',
      gender: 'female',
      incomeBand: 'below_1lakh',
    };
    const mhResult = evaluateScheme(kaGruhaLakshmi, mhResident);
    expect(mhResult.status).toBe('NOT_MATCHED');
    expect(mhResult.failed.some((f) => f.criterion.field === 'state')).toBe(true);
  });

  it('06. GET /api/states returns all 36 states and supports type and search filtering', async () => {
    // All states & UTs
    const resAll = await fetch(`${baseUrl}/api/states`);
    expect(resAll.status).toBe(200);
    const bodyAll = (await resAll.json()) as any;
    expect(bodyAll.data).toHaveLength(36);
    expect(bodyAll.meta.total).toBe(36);

    // Filter by type: union_territory
    const resUT = await fetch(`${baseUrl}/api/states?type=union_territory`);
    expect(resUT.status).toBe(200);
    const bodyUT = (await resUT.json()) as any;
    expect(bodyUT.data).toHaveLength(8);

    // Filter by search query: "karnataka"
    const resSearch = await fetch(`${baseUrl}/api/states?search=karnataka`);
    expect(resSearch.status).toBe(200);
    const bodySearch = (await resSearch.json()) as any;
    expect(bodySearch.data).toHaveLength(1);
    expect(bodySearch.data[0].name).toBe('Karnataka');

    // Single state lookup by code or id
    const resSingle = await fetch(`${baseUrl}/api/states/KA`);
    expect(resSingle.status).toBe(200);
    const bodySingle = (await resSingle.json()) as any;
    expect(bodySingle.data.name).toBe('Karnataka');
    expect(bodySingle.data.capital).toBe('Bengaluru');
  });
});
