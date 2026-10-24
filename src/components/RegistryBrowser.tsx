/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Search,
  ExternalLink,
  ShieldCheck,
  Clock,
  FileText,
  Globe,
  Building2,
  CheckCircle2,
  Copy,
  Check,
  Landmark,
  Layers,
  Sparkles,
} from 'lucide-react';
import { SCHEMES } from '../data/schemes.ts';
import { OFFICIAL_PORTALS, OfficialPortal } from '../data/officialPortals.ts';
import { Scheme, SchemeCategory, SupportedLanguage, LocalizedString } from '../lib/engine/types.ts';
import { ExternalExitModal } from './ExternalExitModal.tsx';
import { AiSchemeAnalysisModal } from './AiSchemeAnalysisModal.tsx';

interface RegistryBrowserProps {
  lang: SupportedLanguage;
  initialMode?: 'schemes' | 'portals';
}

export const RegistryBrowser: React.FC<RegistryBrowserProps> = ({
  lang,
  initialMode = 'schemes',
}) => {
  const [activeTab, setActiveTab] = useState<'schemes' | 'portals'>(initialMode);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [portalCategory, setPortalCategory] = useState<string>('all');
  const [portalSearch, setPortalSearch] = useState('');
  const [copiedPortalId, setCopiedPortalId] = useState<string | null>(null);
  const [exitUrl, setExitUrl] = useState<string | null>(null);
  const [exitName, setExitName] = useState('');
  const [analysisScheme, setAnalysisScheme] = useState<Scheme | null>(null);
  const [analysisPortal, setAnalysisPortal] = useState<OfficialPortal | null>(null);

  const categories: SchemeCategory[] = [
    'agriculture',
    'health',
    'banking',
    'livelihood',
    'housing',
    'education',
    'pension',
    'insurance',
    'women_child',
  ];

  const portalCategories: { id: string; label: LocalizedString }[] = [
    { id: 'all', label: { en: `All Portals (${OFFICIAL_PORTALS.length})`, hi: `सभी पोर्टल (${OFFICIAL_PORTALS.length})`, mr: `सर्व पोर्टल्स (${OFFICIAL_PORTALS.length})` } },
    { id: 'procurement_tenders', label: { en: 'Government Tenders & GeM (4)', hi: 'सरकारी टेंडर एवं ई-खरीद (GeM)', mr: 'शासकीय निविदा व खरेदी (GeM टेंडर)' } },
    { id: 'agriculture', label: { en: 'Agriculture & Farmers', hi: 'कृषि एवं किसान', mr: 'शेती आणि शेतकरी' } },
    { id: 'enterprise', label: { en: 'Enterprise, MSME & Loans', hi: 'उद्यम, एमएसएमई व ऋण', mr: 'उद्योग, एमएसएमई आणि कर्ज' } },
    { id: 'national_directory', label: { en: 'National Directories & Single Window', hi: 'राष्ट्रीय निर्देशिका व एकल खिड़की', mr: 'राष्ट्रीय निर्देशिका व एकल खिडकी' } },
    { id: 'state_gateway', label: { en: 'State Gateways (Maharashtra)', hi: 'राज्य पोर्टल (महाराष्ट्र)', mr: 'राज्य पोर्टल (महाराष्ट्र)' } },
  ];

  const docLabels: Record<string, LocalizedString> = {
    officialWebsite: {
      en: 'Official Website',
      hi: 'आधिकारिक वेबसाइट',
      mr: 'अधिकृत संकेतस्थळ',
    },
    aiAnalysis: {
      en: 'AI Analysis',
      hi: 'एआई विश्लेषण',
      mr: 'एआय विश्लेषण',
    },
    schemeDocsHeader: {
      en: 'Documents Needed to Apply',
      hi: 'आवेदन के लिए आवश्यक दस्तावेज',
      mr: 'अर्जासाठी लागणारी आवश्यक कागदपत्रे',
    },
    portalDocsHeader: {
      en: 'Documents Needed to Apply / Register on this Portal',
      hi: 'पोर्टल पर आवेदन / पंजीकरण हेतु आवश्यक दस्तावेज',
      mr: 'पोर्टलवर अर्ज / नोंदणीसाठी आवश्यक कागदपत्रे',
    },
    mandatory: {
      en: 'Mandatory',
      hi: 'अनिवार्य',
      mr: 'बंधनकारक',
    },
    optional: {
      en: 'Optional',
      hi: 'वैकल्पिक',
      mr: 'पर्यायी',
    },
  };

  const filteredSchemes = SCHEMES.filter((scheme) => {
    const nameMatch =
      scheme.name[lang]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.code.toLowerCase().includes(searchTerm.toLowerCase());

    const catMatch = selectedCategory === 'all' || scheme.category === selectedCategory;
    const levelMatch = selectedLevel === 'all' || scheme.level === selectedLevel;

    return nameMatch && catMatch && levelMatch;
  });

  const filteredPortals = OFFICIAL_PORTALS.filter((portal) => {
    const nameMatch =
      portal.name[lang]?.toLowerCase().includes(portalSearch.toLowerCase()) ||
      portal.name.en.toLowerCase().includes(portalSearch.toLowerCase()) ||
      portal.department[lang]?.toLowerCase().includes(portalSearch.toLowerCase()) ||
      portal.department.en.toLowerCase().includes(portalSearch.toLowerCase()) ||
      portal.keyServices.some((s) => (s[lang] || s.en).toLowerCase().includes(portalSearch.toLowerCase()));

    const catMatch = portalCategory === 'all' || portal.category === portalCategory;

    return nameMatch && catMatch;
  });

  const copyPortalUrl = (portal: OfficialPortal) => {
    navigator.clipboard.writeText(portal.official_url);
    setCopiedPortalId(portal.id);
    setTimeout(() => setCopiedPortalId(null), 2500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verified Public Knowledge Base & Gateways</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
          Public Scheme Registry & Official Gateways
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-1 max-w-3xl">
          Browse verified government welfare schemes backed by gazette criteria, or directly explore official Government of India (.gov.in) single-window systems, farmer portals, and enterprise credit platforms.
        </p>
      </div>

      {/* Main Tab Toggle: Schemes vs Official Portals */}
      <div className="flex border-b border-stone-200 dark:border-stone-800 mb-8">
        <button
          onClick={() => setActiveTab('schemes')}
          className={`flex items-center gap-2 px-6 py-3.5 font-bold text-sm border-b-2 transition-all cursor-pointer ${
            activeTab === 'schemes'
              ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 dark:border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-t-xl'
              : 'border-transparent text-stone-500 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Verified Schemes ({SCHEMES.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('portals')}
          className={`flex items-center gap-2 px-6 py-3.5 font-bold text-sm border-b-2 transition-all cursor-pointer ${
            activeTab === 'portals'
              ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 dark:border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-t-xl'
              : 'border-transparent text-stone-500 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Official Portals & Gateways ({OFFICIAL_PORTALS.length})</span>
          <span className="ml-1 px-2 py-0.5 text-[10px] uppercase font-bold rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
            Official .gov.in
          </span>
        </button>
      </div>

      {/* VIEW 1: SCHEMES DIRECTORY */}
      {activeTab === 'schemes' && (
        <div>
          {/* Filter and Search Bar */}
          <div className="flex flex-col md:flex-row gap-3 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search scheme name, code (e.g. PM-KISAN, PMFBY, MUDRA, Udyam)..."
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-stone-900 dark:focus:ring-white min-h-[44px]"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-xs sm:text-sm font-medium focus:outline-hidden min-h-[44px]"
              >
                <option value="all">All Categories ({SCHEMES.length})</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c.replace('_', ' ').toUpperCase()}
                  </option>
                ))}
              </select>

              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-xs sm:text-sm font-medium focus:outline-hidden min-h-[44px]"
              >
                <option value="all">All Levels</option>
                <option value="central">Central Sector</option>
                <option value="state">State Sponsored</option>
              </select>
            </div>
          </div>

          {/* Schemes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-2xs flex flex-col justify-between hover:border-emerald-500/40 transition-colors"
              >
                <div>
                  {/* Metadata */}
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-2">
                    <span className="font-semibold text-stone-800 dark:text-stone-200">
                      {scheme.code}
                    </span>
                    <span>·</span>
                    <span className="capitalize">{scheme.category}</span>
                    <span>·</span>
                    <span>{scheme.level === 'central' ? 'Central' : scheme.state}</span>
                  </div>

                  <h2 className="text-lg font-bold text-stone-900 dark:text-white leading-snug mb-2">
                    {scheme.name[lang] || scheme.name.en}
                  </h2>

                  <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed mb-4">
                    {scheme.short_summary[lang] || scheme.short_summary.en}
                  </p>

                  {scheme.benefit_type && (
                    <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-3 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1.5 rounded-lg border border-emerald-100 dark:border-emerald-900/60 inline-block">
                      {scheme.benefit_type[lang] || scheme.benefit_type.en}
                    </div>
                  )}

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 text-[11px] text-stone-500 mb-4">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      {scheme.documents.length} Docs
                    </span>
                    <span>·</span>
                    <span>{scheme.steps.length} Steps</span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Fact
                    </span>
                  </div>
                </div>

                {/* Scheme Official Website Link Row */}
                <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 text-stone-500 min-w-0">
                    <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="text-[11px] font-mono text-stone-600 dark:text-stone-400 truncate max-w-[120px] sm:max-w-[160px]">
                      {scheme.official_url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* BUTTON: AI Analysis */}
                    <button
                      onClick={() => setAnalysisScheme(scheme)}
                      className="px-2.5 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-[11px] font-bold flex items-center gap-1.5 transition-all shadow-2xs hover:scale-102 cursor-pointer"
                      title="Run AI Analysis on this scheme & its website"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 animate-pulse" />
                      <span>{docLabels.aiAnalysis[lang] || docLabels.aiAnalysis.en}</span>
                    </button>

                    {/* Official Website Button */}
                    <button
                      onClick={() => {
                        setExitUrl(scheme.official_url);
                        setExitName(scheme.name[lang] || scheme.name.en);
                      }}
                      className="font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline flex items-center gap-1 min-h-[32px] shrink-0 cursor-pointer"
                    >
                      <span>{docLabels.officialWebsite[lang] || docLabels.officialWebsite.en}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Documents Needed to Apply — Directly Below the Website */}
                <div className="mt-3 p-3.5 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200/80 dark:border-stone-700/60">
                  <div className="flex items-center justify-between text-[11px] font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{docLabels.schemeDocsHeader[lang] || docLabels.schemeDocsHeader.en} ({scheme.documents.length})</span>
                    </div>
                    <span className="text-[10px] font-semibold text-rose-600 dark:text-rose-400">
                      {scheme.documents.filter((d) => d.mandatory).length} {docLabels.mandatory[lang] || docLabels.mandatory.en}
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs">
                    {scheme.documents.map((doc) => (
                      <li
                        key={doc.id}
                        className="flex items-start gap-2 bg-white dark:bg-stone-900/80 p-2.5 rounded-lg border border-stone-200/70 dark:border-stone-800 shadow-2xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 flex-wrap">
                            <span className="font-semibold text-stone-900 dark:text-stone-100 text-xs">
                              {doc.name[lang] || doc.name.en}
                            </span>
                            {doc.mandatory ? (
                              <span className="text-[9px] text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 font-bold px-1.5 py-0.5 rounded border border-rose-200 dark:border-rose-900">
                                {docLabels.mandatory[lang] || docLabels.mandatory.en}
                              </span>
                            ) : (
                              <span className="text-[9px] text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 font-medium px-1.5 py-0.5 rounded">
                                {docLabels.optional[lang] || docLabels.optional.en}
                              </span>
                            )}
                          </div>
                          {doc.description && (
                            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 leading-snug">
                              {doc.description[lang] || doc.description.en}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-2.5 pt-2 border-t border-stone-200/60 dark:border-stone-700/50 flex items-center justify-between text-[10px] text-stone-400">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {scheme.last_verified}
                    </span>
                    <span>{scheme.steps.length} application steps</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: OFFICIAL GOVERNMENT PORTALS & GATEWAYS */}
      {activeTab === 'portals' && (
        <div>
          {/* Informational Guidance Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 mb-6 flex items-start gap-3.5">
            <Landmark className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              <p className="font-bold text-stone-900 dark:text-white mb-0.5">
                Direct Authoritative Access to Government Gateways
              </p>
              <p className="leading-relaxed">
                Benefits Navigator never accepts applications or charges fees. Below are the verified apex portals of the Government of India and Government of Maharashtra for schemes, public procurement, tenders, and enterprise licenses. Clicking any portal gives you a secure exit notice before proceeding directly to the official government domain.
              </p>
            </div>
          </div>

          {/* Search and Category Filter */}
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
              <input
                type="text"
                value={portalSearch}
                onChange={(e) => setPortalSearch(e.target.value)}
                placeholder="Search official portals, ministries, or tenders (e.g., MahaTenders, GeM, CPPP, Tender Search, PM-KISAN, Udyam)..."
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-stone-900 dark:focus:ring-white min-h-[44px]"
              />
            </div>
          </div>

          {/* Sector Category Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {portalCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setPortalCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  portalCategory === cat.id
                    ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {cat.label[lang] || cat.label.en}
              </button>
            ))}
          </div>

          {/* Portals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPortals.map((portal) => (
              <div
                key={portal.id}
                className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-7 border border-stone-200 dark:border-stone-800 shadow-2xs flex flex-col justify-between hover:border-emerald-500/50 transition-all hover:shadow-md"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                      {portal.category.replace('_', ' ')}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                      {portal.badge}
                    </span>
                  </div>

                  {/* Portal Title */}
                  <h2 className="text-xl font-bold text-stone-900 dark:text-white leading-tight mb-1.5">
                    {portal.name[lang] || portal.name.en}
                  </h2>

                  {/* Ministry / Department */}
                  <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 mb-3.5 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{portal.department[lang] || portal.department.en}</span>
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-5">
                    {portal.description[lang] || portal.description.en}
                  </p>

                  {/* Key Services Offered */}
                  <div className="mb-6 p-3.5 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-100 dark:border-stone-800">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
                      Key Services & Facilities
                    </div>
                    <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                      {portal.keyServices.map((service, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{service[lang] || service.en}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2.5 flex-wrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyPortalUrl(portal)}
                      className="p-2 rounded-xl text-stone-500 hover:text-stone-900 dark:hover:text-white border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Copy Official Website URL"
                    >
                      {copiedPortalId === portal.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>

                    {/* BUTTON: AI Analysis */}
                    <button
                      onClick={() => setAnalysisPortal(portal)}
                      className="px-3 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs hover:scale-102 cursor-pointer"
                      title="Run AI Analysis on this portal"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 animate-pulse" />
                      <span>{docLabels.aiAnalysis[lang] || docLabels.aiAnalysis.en}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setExitUrl(portal.official_url);
                      setExitName(portal.name[lang] || portal.name.en);
                    }}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Open Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Documents Needed to Apply / Register — Directly Below Website Action */}
                {portal.requiredDocuments && portal.requiredDocuments.length > 0 && (
                  <div className="mt-4 p-3.5 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-200/80 dark:border-stone-700/60">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-2.5 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{docLabels.portalDocsHeader[lang] || docLabels.portalDocsHeader.en} ({portal.requiredDocuments.length})</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                      {portal.requiredDocuments.map((doc, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2 bg-white dark:bg-stone-900/70 p-2 rounded-lg border border-stone-100 dark:border-stone-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="font-medium text-stone-800 dark:text-stone-200 leading-snug">
                            {doc[lang] || doc.en}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredPortals.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800">
              <Search className="w-8 h-8 text-stone-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-stone-900 dark:text-white mb-1">
                No portals matching "{portalSearch}"
              </h3>
              <p className="text-xs text-stone-500">
                Try searching for "farmer", "MSME", "loan", "Maharashtra", or select "All Portals".
              </p>
            </div>
          )}
        </div>
      )}

      {/* External Exit Modal */}
      <ExternalExitModal
        url={exitUrl}
        schemeName={exitName}
        lang={lang}
        onClose={() => setExitUrl(null)}
      />

      {/* AI Scheme & Portal Analysis Modal */}
      <AiSchemeAnalysisModal
        scheme={analysisScheme}
        portal={analysisPortal}
        lang={lang}
        isOpen={Boolean(analysisScheme || analysisPortal)}
        onClose={() => {
          setAnalysisScheme(null);
          setAnalysisPortal(null);
        }}
        onOpenOfficialUrl={(url, name) => {
          setExitUrl(url);
          setExitName(name);
        }}
      />
    </div>
  );
};
