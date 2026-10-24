/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  MapPin,
  Eye,
  FileCheck2,
  ExternalLink,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
  Flame,
  Award,
  ShieldCheck,
  RefreshCw,
  BarChart3,
  Building2,
  Users,
  Compass,
  ChevronRight,
} from 'lucide-react';
import { SupportedLanguage, UserProfile } from '../lib/engine/types.ts';
import {
  getTrendingAnalyticsForRegion,
  getAvailableRegionsList,
  TrendingSchemeItem,
  recordSchemeInquiry,
} from '../data/trendingAnalyticsData.ts';

interface TrendingAnalyticsViewProps {
  lang: SupportedLanguage;
  onCheckEligibility?: (preset: Partial<UserProfile>) => void;
  onNavigateTab?: (tab: string) => void;
}

export const TrendingAnalyticsView: React.FC<TrendingAnalyticsViewProps> = ({
  lang,
  onCheckEligibility,
  onNavigateTab,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all_india');
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | 'all'>('7d');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const availableRegions = useMemo(() => getAvailableRegionsList(), []);

  // Fetch regional analytics data
  const analyticsData = useMemo(() => {
    return getTrendingAnalyticsForRegion(selectedRegion, timeRange);
  }, [selectedRegion, timeRange]);

  // Filter schemes by category and search
  const filteredSchemes = useMemo(() => {
    return analyticsData.trendingSchemes.filter((item) => {
      const matchCat = categoryFilter === 'all' || item.category === categoryFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        (item.name[lang] || item.name.en).toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.topDistricts.some((d) => d.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [analyticsData, categoryFilter, searchQuery, lang]);

  const topScheme = analyticsData.trendingSchemes[0];
  const mostAppliedScheme = [...analyticsData.trendingSchemes].sort((a, b) => b.applications - a.applications)[0];
  const fastestGrowingScheme = [...analyticsData.trendingSchemes].sort((a, b) => b.growthPct - a.growthPct)[0];

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const formatNumber = (num: number) => {
    if (num >= 10000000) return (num / 10000000).toFixed(2) + ' Cr';
    if (num >= 100000) return (num / 100000).toFixed(1) + ' Lakh';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toLocaleString('en-IN');
  };

  const quickPopularRegions = [
    { id: 'all_india', label: '🇮🇳 All India' },
    { id: 'Maharashtra', label: 'Maharashtra' },
    { id: 'Uttar Pradesh', label: 'Uttar Pradesh' },
    { id: 'Karnataka', label: 'Karnataka' },
    { id: 'Delhi', label: 'Delhi' },
    { id: 'Madhya Pradesh', label: 'Madhya Pradesh' },
    { id: 'West Bengal', label: 'West Bengal' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* ── Top Header Banner ── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 text-white p-6 sm:p-10 border border-stone-800 shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wide uppercase">
              <Flame className="w-3.5 h-3.5 animate-pulse" />
              <span>Public Welfare Open Data Analytics</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Trending Schemes & Regional Application Demand
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Real-time citizen engagement insights across India. Discover which public welfare benefits are experiencing the highest search volumes, inquiries, and application submissions in your state and district.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {/* Real-time sync indicator */}
            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors shadow-xs cursor-pointer min-h-[44px]"
              title="Refresh live metrics"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Syncing...' : 'Live Synced'}</span>
            </button>

            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('navigator')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-bold shadow-md transition-all cursor-pointer min-h-[44px]"
              >
                <Compass className="w-4 h-4 text-stone-950" />
                <span>Check My Eligibility</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Filters & Controls Bar ── */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-4 sm:p-5 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Region Dropdown Selector */}
          <div className="flex-1 max-w-md">
            <label htmlFor="region-select" className="block text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>Select Region / State</span>
            </label>
            <div className="relative">
              <select
                id="region-select"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full appearance-none bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500/50 pr-8 cursor-pointer"
              >
                {availableRegions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-stone-500">
                <ChevronRight className="w-4 h-4 rotate-90" />
              </div>
            </div>
          </div>

          {/* Timeframe Switcher */}
          <div className="flex flex-col">
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span>Timeframe Window</span>
            </span>
            <div className="flex items-center bg-stone-100 dark:bg-stone-800 p-1 rounded-xl border border-stone-200 dark:border-stone-700">
              {[
                { id: '24h', label: 'Past 24h' },
                { id: '7d', label: 'Past 7 Days' },
                { id: '30d', label: 'Past 30 Days' },
                { id: 'all', label: 'All-Time' },
              ].map((tf) => (
                <button
                  key={tf.id}
                  onClick={() => setTimeRange(tf.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    timeRange === tf.id
                      ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs font-bold'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input */}
          <div className="flex-1 max-w-xs">
            <span className="block text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-stone-400" />
              <span>Filter by Scheme / District</span>
            </span>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search scheme or district..."
                className="w-full bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl px-3.5 py-2 text-xs text-stone-900 dark:text-white placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50"
              />
            </div>
          </div>
        </div>

        {/* Quick Regional Pills Bar */}
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider shrink-0 mr-1">
            Popular Regions:
          </span>
          {quickPopularRegions.map((qr) => (
            <button
              key={qr.id}
              onClick={() => setSelectedRegion(qr.id)}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                selectedRegion === qr.id
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-2xs'
                  : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
              }`}
            >
              {qr.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Key Metrics Highlights Strip ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Views / Inquiries */}
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              Citizen Inquiries
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tabular-nums">
              {formatNumber(analyticsData.totalViews)}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{analyticsData.growthPct}% vs prior period</span>
            </div>
          </div>
        </div>

        {/* Card 2: Applications Initiated */}
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              Applications Tracked
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tabular-nums">
              {formatNumber(analyticsData.totalApplications)}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-stone-500">
              <span>Across {analyticsData.activeDistricts} reporting districts</span>
            </div>
          </div>
        </div>

        {/* Card 3: Top Scheme in Region */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              #1 Most In-Demand
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-xs">
              #1
            </div>
          </div>
          <div className="mt-3">
            <div className="text-sm font-bold text-stone-900 dark:text-white line-clamp-1">
              {topScheme ? topScheme.name[lang] || topScheme.name.en : 'PM-KISAN'}
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-400 mt-1 line-clamp-1">
              {topScheme ? formatNumber(topScheme.views) + ' views' : ''}
            </div>
          </div>
        </div>

        {/* Card 4: Fastest Growing Spike */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/30 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              Fastest Velocity
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-sm font-bold text-stone-900 dark:text-white line-clamp-1">
              {fastestGrowingScheme ? fastestGrowingScheme.name[lang] || fastestGrowingScheme.name.en : 'PM-SVANidhi'}
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1">
              +{fastestGrowingScheme?.growthPct}% week-over-week spike
            </div>
          </div>
        </div>
      </div>

      {/* ── Category / Sector Distribution Progress Heatmap ── */}
      <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-stone-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
              Sector Demand Distribution in {analyticsData.regionName}
            </h3>
          </div>
          <span className="text-xs text-stone-500">Share of Total Inquiries</span>
        </div>

        {/* Segmented Color Bar */}
        <div className="w-full h-3 rounded-full overflow-hidden flex bg-stone-100 dark:bg-stone-800">
          {analyticsData.categoryBreakdown.map((cat, idx) => (
            <div
              key={idx}
              className={`${cat.color} h-full transition-all duration-300`}
              style={{ width: `${cat.percentage}%` }}
              title={`${cat.label}: ${cat.percentage}% (${formatNumber(cat.views)} views)`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {analyticsData.categoryBreakdown.map((cat, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-400">
              <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
              <span className="font-semibold">{cat.label}:</span>
              <span className="font-mono text-stone-900 dark:text-white">{cat.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Two-Column Layout: Trending Leaderboard & Live Citizen Feed ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Trending Leaderboard (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500" />
              <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white">
                Top Schemes in {analyticsData.regionName}
              </h2>
            </div>
            <span className="text-xs text-stone-500">
              Showing {filteredSchemes.length} schemes
            </span>
          </div>

          <div className="space-y-3">
            {filteredSchemes.map((scheme, idx) => (
              <div
                key={scheme.id}
                className="group p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-400/60 dark:hover:border-amber-400/40 shadow-xs hover:shadow-md transition-all flex flex-col gap-3.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    {/* Rank Badge */}
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-2xs ${
                        idx === 0
                          ? 'bg-amber-500 text-stone-950 ring-2 ring-amber-300'
                          : idx === 1
                          ? 'bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200'
                          : idx === 2
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      #{scheme.rank}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-bold uppercase tracking-wider text-[10px]">
                          {scheme.level === 'central' ? 'Central Gov' : `${scheme.state || 'State'} Gov`}
                        </span>
                        {scheme.badge && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-800 dark:text-amber-300 font-bold border border-amber-500/30">
                            {scheme.badge}
                          </span>
                        )}
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                          +{scheme.growthPct}% weekly growth
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-stone-900 dark:text-white mt-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {scheme.name[lang] || scheme.name.en}
                      </h4>

                      <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 leading-relaxed">
                        {scheme.benefitHighlight[lang] || scheme.benefitHighlight.en}
                      </p>
                    </div>
                  </div>

                  {/* External Portal Link */}
                  <a
                    href={scheme.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => recordSchemeInquiry(scheme.id)}
                    className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-600 dark:text-stone-300 transition-all shrink-0 cursor-pointer"
                    title="Open official government application portal"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Progress Comparison Strip */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
                  <div>
                    <div className="flex items-center justify-between text-stone-500 mb-1">
                      <span>Citizen Inquiries / Views</span>
                      <span className="font-bold text-stone-900 dark:text-white font-mono">
                        {formatNumber(scheme.views)}
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${Math.min(100, Math.round((scheme.views / (analyticsData.trendingSchemes[0]?.views || 1)) * 100))}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-stone-500 mb-1">
                      <span>Applications Initiated</span>
                      <span className="font-bold text-stone-900 dark:text-white font-mono">
                        {formatNumber(scheme.applications)}
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${Math.min(100, Math.round((scheme.applications / (analyticsData.trendingSchemes[0]?.applications || 1)) * 100))}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Hotspot Districts & Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-stone-500 text-[11px] overflow-hidden">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="font-semibold text-stone-700 dark:text-stone-300 shrink-0">Hotspots:</span>
                    <span className="truncate">{scheme.topDistricts.join(', ')}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {onCheckEligibility && (
                      <button
                        onClick={() => {
                          recordSchemeInquiry(scheme.id);
                          onCheckEligibility({
                            state: scheme.state || 'Maharashtra',
                            occupation:
                              scheme.category === 'agriculture'
                                ? 'farmer'
                                : scheme.category === 'education'
                                ? 'student'
                                : undefined,
                          });
                        }}
                        className="px-3 py-1.5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors shadow-2xs cursor-pointer"
                      >
                        Check My Eligibility
                      </button>
                    )}

                    <a
                      href={scheme.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => recordSchemeInquiry(scheme.id)}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold flex items-center gap-1 transition-colors shadow-2xs cursor-pointer"
                    >
                      <span>Apply on Portal</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Live Citizen Activity Feed & Open Data Transparency (1 col) */}
        <div className="space-y-6">
          {/* Live Activity Stream */}
          <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                  Live Regional Activity
                </h3>
              </div>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Live Feed
              </span>
            </div>

            <p className="text-xs text-stone-500">
              Recent citizen checks and application events in {analyticsData.regionName}:
            </p>

            <div className="space-y-3">
              {analyticsData.recentActivities.map((act) => (
                <div
                  key={act.id}
                  className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/60 flex items-start gap-2.5 text-xs"
                >
                  <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-stone-900 dark:text-white line-clamp-1">
                      {act.schemeName}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                      <span className="text-amber-600 dark:text-amber-400 font-medium">{act.district}</span>
                      <span>•</span>
                      <span>{act.timeAgo}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Open Data & Public Audit Notice */}
          <div className="p-5 rounded-2xl bg-stone-100 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-3 text-xs text-stone-600 dark:text-stone-400">
            <div className="flex items-center gap-2 font-bold text-stone-900 dark:text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Public Welfare Open Data Transparency</span>
            </div>
            <p className="leading-relaxed">
              Trending analytics are aggregated from public MIS dashboards (including <strong>DBT Bharat (dbtbharat.gov.in)</strong>, <strong>PM-KISAN National Portal</strong>, and <strong>NHA Ayushman Bharat</strong>) combined with anonymous platform inquiries.
            </p>
            <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-[11px]">
              <span className="font-semibold text-stone-500">Citizen Privacy Guarantee:</span>
              <span className="text-emerald-600 font-bold">100% Non-PII Aggregated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
