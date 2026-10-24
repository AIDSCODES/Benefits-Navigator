/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  CitizenUser,
  DEMO_PROFILES,
  getStoredCitizen,
  saveCitizenSession,
  clearCitizenSession,
  signInWithDemoCitizen,
  signInAsGuest,
  toggleBookmarkedScheme,
} from '../lib/citizenAuth.ts';
import { SCHEMES } from '../data/schemes.ts';

describe('Citizen Authentication & Login Management', () => {
  beforeEach(() => {
    clearCitizenSession();
  });

  it('01. demo profiles provide verified personas with valid presets and real schemes', () => {
    expect(DEMO_PROFILES.length).toBeGreaterThanOrEqual(4);

    const schemeIds = new Set(SCHEMES.map((s) => s.id));

    for (const profile of DEMO_PROFILES) {
      expect(profile.name.length).toBeGreaterThan(0);
      expect(profile.state.length).toBeGreaterThan(0);
      expect(profile.avatar.length).toBeGreaterThan(0);
      expect(profile.preset).toBeDefined();

      // Top schemes must be present in scheme catalog
      for (const schemeId of profile.topSchemes) {
        expect(
          schemeIds.has(schemeId),
          `Scheme '${schemeId}' in demo profile '${profile.name}' should exist in SCHEMES`
        ).toBe(true);
      }
    }
  });

  it('02. saves citizen session, retrieves stored user, and clears safely', () => {
    expect(getStoredCitizen()).toBeNull();

    const mockUser: CitizenUser = {
      id: 'test-user-123',
      name: 'Pooja Sharma',
      email: 'pooja@example.com',
      state: 'Rajasthan',
      authProvider: 'email',
      savedSchemes: ['pm-jay'],
      loginTimestamp: new Date().toISOString(),
    };

    saveCitizenSession(mockUser, false);
    const stored = getStoredCitizen();
    expect(stored).toBeDefined();
    expect(stored?.name).toBe('Pooja Sharma');
    expect(stored?.email).toBe('pooja@example.com');
    expect(stored?.state).toBe('Rajasthan');

    clearCitizenSession();
    expect(getStoredCitizen()).toBeNull();
  });

  it('03. signInWithDemoCitizen creates full user and applies preset', () => {
    const ramesh = signInWithDemoCitizen('ramesh-kisan');
    expect(ramesh.id).toContain('ramesh-kisan');
    expect(ramesh.name).toBe('Ramesh Kisan');
    expect(ramesh.state).toBe('Maharashtra');
    expect(ramesh.occupation).toBe('farmer');
    expect(ramesh.presetProfile?.landHolding).toBe('small');
    expect(ramesh.presetProfile?.rationCardStatus).toBe('priority');

    const stored = getStoredCitizen();
    expect(stored?.name).toBe('Ramesh Kisan');
  });

  it('04. signInAsGuest creates an anonymous private session', () => {
    const guest = signInAsGuest();
    expect(guest.id).toContain('guest-');
    expect(guest.name).toBe('Guest Citizen');
    expect(guest.authProvider).toBe('guest');

    const stored = getStoredCitizen();
    expect(stored?.id).toBe(guest.id);
  });

  it('05. toggleBookmarkedScheme adds and removes bookmarked schemes', () => {
    const user = signInWithDemoCitizen('ananya-rao');
    expect(user.savedSchemes).toContain('ka-yuva-nidhi');

    // Toggle off existing scheme
    const afterRemove = toggleBookmarkedScheme('ka-yuva-nidhi');
    expect(afterRemove).not.toContain('ka-yuva-nidhi');

    // Toggle on new scheme
    const afterAdd = toggleBookmarkedScheme('pm-jay');
    expect(afterAdd).toContain('pm-jay');
  });
});
