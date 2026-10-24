/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect } from 'vitest';
import { OFFICIAL_PORTALS } from '../data/officialPortals.ts';
import { SCHEMES } from '../data/schemes.ts';

describe('Official Government Portals & Scheme Verification', () => {
  it('contains all 17 official portals and platforms requested by user with clean official URLs', () => {
    expect(OFFICIAL_PORTALS).toHaveLength(17);

    const requiredHostnames = [
      'pmkisan.gov.in',
      'mahadbt.maharashtra.gov.in',
      'pmfby.gov.in',
      'www.india.gov.in',
      'www.startupindia.gov.in',
      'udyamregistration.gov.in',
      'www.sidbi.in',
      'www.mudra.org.in',
      'www.standupmitra.in',
      'maitri.mahaonline.gov.in',
      'www.nsws.gov.in',
      'mahatenders.gov.in',
      'eprocure.gov.in',
      'gem.gov.in',
      'umed.in',
      'lakhpatididi.gov.in',
    ];

    for (const host of requiredHostnames) {
      const found = OFFICIAL_PORTALS.some((p) => p.official_url.includes(host));
      expect(found, `Expected portal with domain ${host} to be registered`).toBe(true);
    }
  });

  it('verifies the 4 tender & procurement portals are registered with category procurement_tenders', () => {
    const tenderPortals = OFFICIAL_PORTALS.filter((p) => p.category === 'procurement_tenders');
    expect(tenderPortals).toHaveLength(4);

    const tenderPortalIds = tenderPortals.map((p) => p.id);
    expect(tenderPortalIds).toContain('mahatenders-portal');
    expect(tenderPortalIds).toContain('cppp-central-tenders-portal');
    expect(tenderPortalIds).toContain('gem-portal');
    expect(tenderPortalIds).toContain('cppp-tender-search-portal');
  });

  it('verifies UMED and Lakhpati Didi portals are registered with correct attributes', () => {
    const umed = OFFICIAL_PORTALS.find((p) => p.id === 'umed-msrlm-portal');
    expect(umed).toBeDefined();
    expect(umed?.official_url).toBe('https://umed.in');
    expect(umed?.name.mr).toContain('उमेद');

    const lakhpati = OFFICIAL_PORTALS.find((p) => p.id === 'lakhpati-didi-portal');
    expect(lakhpati).toBeDefined();
    expect(lakhpati?.official_url).toBe('https://lakhpatididi.gov.in');
    expect(lakhpati?.name.en).toContain('Lakhpati Didi');
  });

  it('ensures all portals have no tracking utm parameters and possess required localized fields', () => {
    for (const portal of OFFICIAL_PORTALS) {
      // Must not contain tracking tags
      expect(portal.official_url).not.toContain('utm_source');
      expect(portal.official_url).not.toContain('chatgpt.com');

      // Must have valid http/https URL
      expect(portal.official_url.startsWith('https://')).toBe(true);

      // Must have localized name
      expect(portal.name.en).toBeTruthy();
      expect(portal.name.hi).toBeTruthy();
      expect(portal.name.mr).toBeTruthy();

      // Must have localized department & description
      expect(portal.department.en).toBeTruthy();
      expect(portal.description.en).toBeTruthy();

      // Must have non-empty key services
      expect(portal.keyServices.length).toBeGreaterThan(0);
      expect(portal.keyServices[0].en).toBeTruthy();
    }
  });

  it('ensures welfare schemes corresponding to user request exist in SCHEMES registry', () => {
    const requiredSchemeCodes = [
      'PM-KISAN',
      'PMFBY',
      'MAHADBT-AGRI',
      'PMMY-MUDRA',
      'STANDUP-INDIA',
      'STARTUP-INDIA',
      'UDYAM-MSME',
      'MSE-PROCUREMENT-GEM',
      'LAKHPATI-DIDI',
      'UMED-MSRLM',
    ];

    for (const code of requiredSchemeCodes) {
      const scheme = SCHEMES.find((s) => s.code === code);
      expect(scheme, `Expected scheme with code ${code} to exist in SCHEMES`).toBeDefined();
      expect(scheme?.official_url).not.toContain('utm_source');
      expect(scheme?.criteria.length).toBeGreaterThan(0);
      expect(scheme?.documents.length).toBeGreaterThan(0);
    }
  });

  it('ensures all 17 portals have requiredDocuments defined with multilingual support', () => {
    for (const portal of OFFICIAL_PORTALS) {
      expect(portal.requiredDocuments, `Portal ${portal.id} must define requiredDocuments`).toBeDefined();
      expect(portal.requiredDocuments.length).toBeGreaterThan(0);
      for (const doc of portal.requiredDocuments) {
        expect(doc.en).toBeTruthy();
        expect(doc.hi).toBeTruthy();
        expect(doc.mr).toBeTruthy();
      }
    }
  });

  it('ensures all welfare schemes have required application documents with mandatory flags', () => {
    for (const scheme of SCHEMES) {
      expect(scheme.documents.length).toBeGreaterThan(0);
      for (const doc of scheme.documents) {
        expect(doc.name.en).toBeTruthy();
        expect(typeof doc.mandatory).toBe('boolean');
      }
    }
  });
});
