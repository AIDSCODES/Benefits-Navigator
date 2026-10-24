/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect } from 'vitest';
import {
  getTrendingAnalyticsForRegion,
  getAvailableRegionsList,
  recordSchemeInquiry,
} from '../data/trendingAnalyticsData.ts';

describe('Trending Schemes Analytics Service', () => {
  it('1. Returns national analytics for all_india region with valid metrics', () => {
    const national = getTrendingAnalyticsForRegion('all_india', '7d');

    expect(national.regionId).toBe('all_india');
    expect(national.regionName).toBe('All India');
    expect(national.totalViews).toBeGreaterThan(0);
    expect(national.totalApplications).toBeGreaterThan(0);
    expect(national.trendingSchemes.length).toBeGreaterThanOrEqual(5);

    // Verify scheme item properties
    const topScheme = national.trendingSchemes[0];
    expect(topScheme.rank).toBe(1);
    expect(topScheme.name.en).toBeDefined();
    expect(topScheme.views).toBeGreaterThan(0);
    expect(topScheme.applications).toBeGreaterThan(0);
    expect(topScheme.growthPct).toBeGreaterThanOrEqual(0);
    expect(topScheme.topDistricts.length).toBeGreaterThan(0);
    expect(topScheme.officialUrl).toMatch(/^https?:\/\//);
  });

  it('2. Returns specialized state-level analytics for Maharashtra and Karnataka', () => {
    const mh = getTrendingAnalyticsForRegion('maharashtra', '7d');
    expect(mh.regionName).toBe('Maharashtra');
    expect(mh.trendingSchemes.some((s) => s.id.includes('mahadbt') || s.name.en.includes('MahaDBT'))).toBe(true);

    const ka = getTrendingAnalyticsForRegion('karnataka', '7d');
    expect(ka.regionName).toBe('Karnataka');
    expect(ka.trendingSchemes.some((s) => s.id.includes('gruha-lakshmi') || s.name.en.includes('Gruha Lakshmi'))).toBe(true);
  });

  it('3. Dynamically synthesizes reliable analytics for any of the 36 States/UTs', () => {
    // Test a state without hardcoded custom set, e.g., Sikkim or Odisha
    const odisha = getTrendingAnalyticsForRegion('odisha', '30d');
    expect(odisha.regionName).toBe('Odisha');
    expect(odisha.trendingSchemes.length).toBeGreaterThan(0);
    expect(odisha.totalViews).toBeGreaterThan(0);
    expect(odisha.categoryBreakdown.length).toBeGreaterThan(0);

    const sikkim = getTrendingAnalyticsForRegion('sikkim', '24h');
    expect(sikkim.regionName).toBe('Sikkim');
    expect(sikkim.trendingSchemes.length).toBeGreaterThan(0);
  });

  it('4. Properly applies timeframe multipliers across 24h, 7d, 30d, and all-time', () => {
    const t24h = getTrendingAnalyticsForRegion('all_india', '24h');
    const t7d = getTrendingAnalyticsForRegion('all_india', '7d');
    const t30d = getTrendingAnalyticsForRegion('all_india', '30d');
    const tAll = getTrendingAnalyticsForRegion('all_india', 'all');

    expect(t24h.totalViews).toBeLessThan(t7d.totalViews);
    expect(t7d.totalViews).toBeLessThan(t30d.totalViews);
    expect(t30d.totalViews).toBeLessThan(tAll.totalViews);
  });

  it('5. Provides comprehensive list of available regions including all states and UTs', () => {
    const regions = getAvailableRegionsList();
    expect(regions.length).toBeGreaterThanOrEqual(37); // All India + 36 States/UTs

    const national = regions.find((r) => r.id === 'all_india');
    expect(national).toBeDefined();

    const delhi = regions.find((r) => r.name.toLowerCase().includes('delhi'));
    expect(delhi).toBeDefined();
    expect(delhi?.isUT).toBe(true);
  });

  it('6. Records citizen scheme inquiry incrementation gracefully in-memory', () => {
    const before = getTrendingAnalyticsForRegion('all_india', '7d');
    const targetSchemeId = before.trendingSchemes[0].id;
    const initialViews = before.trendingSchemes[0].views;

    recordSchemeInquiry(targetSchemeId);

    const after = getTrendingAnalyticsForRegion('all_india', '7d');
    const updatedScheme = after.trendingSchemes.find((s) => s.id === targetSchemeId);
    expect(updatedScheme?.views).toBeGreaterThan(initialViews);
  });
});
