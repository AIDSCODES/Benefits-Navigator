/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect } from 'vitest';
import {
  isSchemeApplicableToUser,
  formatSchemeAlertMessage,
} from '../lib/schemeNotificationService.ts';
import { SIMULATION_NEW_SCHEMES } from '../data/newSchemesCatalog.ts';
import { UserProfile } from '../lib/engine/types.ts';

describe('New Scheme Arrival Notification & Applicability Filtering', () => {
  const suryaGhar = SIMULATION_NEW_SCHEMES.find((s) => s.id === 'pm-surya-ghar')!;
  const lakhpatiDidi = SIMULATION_NEW_SCHEMES.find((s) => s.id === 'lakhpati-didi')!;
  const vishwakarma = SIMULATION_NEW_SCHEMES.find((s) => s.id === 'pm-vishwakarma')!;

  it('1. Verifies that PM Surya Ghar is applicable to adult homeowners', () => {
    const adultProfile: UserProfile = {
      state: 'Maharashtra',
      ageBand: '18_35',
      occupation: 'salaried',
    };

    const result = isSchemeApplicableToUser(suryaGhar, adultProfile);
    expect(result.isApplicable).toBe(true);
    expect(result.status).toBe('LIKELY_MATCH');
  });

  it('2. Verifies that Lakhpati Didi is NOT applicable to male users (honoring applicability constraint)', () => {
    const maleProfile: UserProfile = {
      state: 'Uttar Pradesh',
      gender: 'male',
      occupation: 'farmer',
    };

    const result = isSchemeApplicableToUser(lakhpatiDidi, maleProfile);
    expect(result.isApplicable).toBe(false);
    expect(result.status).toBe('NOT_MATCHED');
  });

  it('3. Verifies that Lakhpati Didi IS applicable to female applicants', () => {
    const femaleProfile: UserProfile = {
      state: 'Bihar',
      gender: 'female',
      ageBand: '18_35',
    };

    const result = isSchemeApplicableToUser(lakhpatiDidi, femaleProfile);
    expect(result.isApplicable).toBe(true);
    expect(result.status).toBe('LIKELY_MATCH');
  });

  it('4. Formats WhatsApp and Email alert messages with complete entitlement details', () => {
    const profile: UserProfile = {
      state: 'Karnataka',
      occupation: 'farmer',
      ageBand: '36_50',
    };

    const formatted = formatSchemeAlertMessage(suryaGhar, profile, 'en');

    // Subject checks
    expect(formatted.subject).toContain('PM Surya Ghar');
    expect(formatted.subject).toContain('applicable to you');

    // WhatsApp text checks
    expect(formatted.whatsAppText).toContain('*New Government Scheme Alert!*');
    expect(formatted.whatsAppText).toContain('pmsuryaghar.gov.in');
    expect(formatted.whatsAppText).toContain('₹78,000');

    // Plain text checks
    expect(formatted.plainText).toContain('YOJANA360 — NEW SCHEME ALERT');
    expect(formatted.plainText).toContain('Required Documents Checklist:');

    // HTML body checks
    expect(formatted.htmlBody).toContain('<h2');
    expect(formatted.htmlBody).toContain('Apply on Official Government Portal');
  });
});
