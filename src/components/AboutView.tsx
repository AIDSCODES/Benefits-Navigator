/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Info,
  AlertOctagon,
  CheckCircle2,
  Shield,
  BookOpen,
  Bug,
  Globe,
  ExternalLink,
  Building2,
} from 'lucide-react';
import { SupportedLanguage } from '../lib/engine/types.ts';
import { TRANSLATIONS } from '../lib/i18n/translations.ts';
import { OFFICIAL_PORTALS } from '../data/officialPortals.ts';
import { ExternalExitModal } from './ExternalExitModal.tsx';

interface AboutViewProps {
  lang: SupportedLanguage;
}

export const AboutView: React.FC<AboutViewProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [exitUrl, setExitUrl] = useState<string | null>(null);
  const [exitName, setExitName] = useState('');

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white mb-3">
          About Benefits Navigator
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
          A public interest decision-support service built for Hackathon Track 1-05: Interoperable Benefits & Entitlement Navigation for Financial Inclusion.
        </p>
      </div>

      {/* 4 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xs">
          <div className="flex items-center gap-2 text-stone-900 dark:text-white font-bold mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>1. Deterministic Rules Engine</span>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            Eligibility is evaluated strictly by a deterministic TypeScript rules engine comparing coarse inputs against verified scheme criteria. Generative AI is never permitted to calculate, invent, or guess eligibility.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xs">
          <div className="flex items-center gap-2 text-stone-900 dark:text-white font-bold mb-2">
            <Shield className="w-5 h-5 text-emerald-600" />
            <span>2. Zero-Impersonation Guarantee</span>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            This tool is an unofficial advisory service. We never use national emblems, lookalike government styling, or fake logos. We never accept applications, issue government certificates, or ask for Aadhaar OTPs.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xs">
          <div className="flex items-center gap-2 text-stone-900 dark:text-white font-bold mb-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span>3. Complete Source Transparency</span>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            Every scheme in our registry includes a verifiable citation to official gazettes or operational guidelines, a direct portal URL, and a last-verified date. Schemes older than 90 days are automatically flagged.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xs">
          <div className="flex items-center gap-2 text-stone-900 dark:text-white font-bold mb-2">
            <AlertOctagon className="w-5 h-5 text-emerald-600" />
            <span>4. The "Never Eligible" Rule</span>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            We never state "You are eligible." Official approvals belong solely to government welfare sanctioning authorities. We classify states into <code className="text-[11px] font-mono">LIKELY_MATCH</code>, <code className="text-[11px] font-mono">POSSIBLE_NEED_MORE_INFO</code>, and <code className="text-[11px] font-mono">NOT_MATCHED</code>.
          </p>
        </div>
      </div>

      {/* Authoritative Government Gateways & Official Portals Directory */}
      <div className="mb-12">
        <div className="flex items-center gap-2.5 mb-3">
          <Globe className="w-5 h-5 text-emerald-600" />
          <h2 className="text-xl font-bold text-stone-900 dark:text-white">
            Authoritative Government Gateways & Portals ({OFFICIAL_PORTALS.length})
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mb-6 leading-relaxed">
          Benefits Navigator connects citizens directly to verified Government of India (.gov.in) and Government of Maharashtra portals. We do not intermediate applications; each link opens the authoritative official platform.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {OFFICIAL_PORTALS.map((portal) => (
            <div
              key={portal.id}
              className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs flex flex-col justify-between hover:border-emerald-500/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
                  <span>{portal.category.replace('_', ' ')}</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold truncate max-w-[140px]">
                    {portal.badge}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-stone-900 dark:text-white mb-1 leading-snug">
                  {portal.name[lang] || portal.name.en}
                </h3>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mb-2 line-clamp-2">
                  {portal.department[lang] || portal.department.en}
                </p>
                <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed mb-3">
                  {portal.description[lang] || portal.description.en}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                <button
                  onClick={() => {
                    setExitUrl(portal.official_url);
                    setExitName(portal.name[lang] || portal.name.en);
                  }}
                  className="w-full text-left flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 py-1 cursor-pointer"
                >
                  <span className="truncate">{portal.official_url.replace('https://', '')}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Limitations Section */}
      <div className="p-6 sm:p-8 bg-stone-100 dark:bg-stone-800/60 rounded-3xl mb-10">
        <h2 className="text-lg font-bold text-stone-900 dark:text-white mb-3">
          Known Limitations & Assumptions
        </h2>
        <ul className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>
            <strong>Coarse Inputs:</strong> To protect privacy, we do not verify land records or bank account statuses. Actual sanctioning depends on government e-KYC.
          </li>
          <li>
            <strong>Quotas & Budget Caps:</strong> Some schemes (e.g. state pension quotas or district scholarship allocations) may experience temporary budgetary hold-ups not captured in static criteria.
          </li>
          <li>
            <strong>Policy Revisions:</strong> Welfare guidelines frequently evolve with new state government resolutions (GRs). Users should always check the official portal link provided.
          </li>
        </ul>
      </div>

      {/* Report an Error / Bug */}
      <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 flex items-start gap-4">
        <Bug className="w-6 h-6 text-stone-600 shrink-0 mt-1" />
        <div className="text-xs sm:text-sm">
          <h3 className="font-bold text-stone-900 dark:text-white mb-1">
            Found an error or outdated scheme rule?
          </h3>
          <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
            Our registry is open source. Civic researchers and contributors can submit pull requests or error reports with official government gazette citations in accordance with our <span className="font-semibold text-stone-800 dark:text-stone-200">/data/README.md</span> guidelines.
          </p>
        </div>
      </div>

      {/* Safe External Exit Modal */}
      <ExternalExitModal
        url={exitUrl}
        schemeName={exitName}
        lang={lang}
        onClose={() => setExitUrl(null)}
      />
    </div>
  );
};
