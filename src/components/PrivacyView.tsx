/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, XCircle, CheckCircle2, Lock, Trash2, EyeOff } from 'lucide-react';
import { SupportedLanguage } from '../lib/engine/types.ts';
import { TRANSLATIONS } from '../lib/i18n/translations.ts';

interface PrivacyViewProps {
  lang: SupportedLanguage;
  onClearAnswers: () => void;
  hasAnswers: boolean;
}

export const PrivacyView: React.FC<PrivacyViewProps> = ({
  lang,
  onClearAnswers,
  hasAnswers,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="mb-10 text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white mb-2">
          {t.whatWeStoreTitle}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
          {t.whatWeStoreZero}
        </p>
      </div>

      {/* Data Minimization Audit Table */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs mb-10">
        <div className="p-6 border-b border-stone-100 dark:border-stone-800">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white">
            Data Minimization Audit & Policy
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Track 1-05 privacy compliance audit against surveillance risks.
          </p>
        </div>

        <div className="divide-y divide-stone-100 dark:divide-stone-800 text-xs sm:text-sm">
          <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
            <div>
              <span className="font-semibold text-stone-900 dark:text-white block">Full Name & Parent's Name</span>
              <span className="text-xs text-stone-500">Not asked. Completely anonymous.</span>
            </div>
            <span className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4" /> NEVER COLLECTED
            </span>
          </div>

          <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
            <div>
              <span className="font-semibold text-stone-900 dark:text-white block">Aadhaar Number / PAN / Voter ID</span>
              <span className="text-xs text-stone-500">Never asked, stored, or processed on any network.</span>
            </div>
            <span className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4" /> NEVER COLLECTED
            </span>
          </div>

          <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
            <div>
              <span className="font-semibold text-stone-900 dark:text-white block">Phone Number & OTPs</span>
              <span className="text-xs text-stone-500">No SMS verification, no logins, no persistent accounts.</span>
            </div>
            <span className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4" /> NEVER COLLECTED
            </span>
          </div>

          <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
            <div>
              <span className="font-semibold text-stone-900 dark:text-white block">Biometric Fingerprints or Palm Veins</span>
              <span className="text-xs text-stone-500">Zero biometric scanning inside this decision navigator.</span>
            </div>
            <span className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4" /> NEVER COLLECTED
            </span>
          </div>

          <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
            <div>
              <span className="font-semibold text-stone-900 dark:text-white block">Exact Income & Salary Slips</span>
              <span className="text-xs text-stone-500">Only coarse bracket bands (e.g. Below 1 Lakh).</span>
            </div>
            <span className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4" /> COARSE ONLY
            </span>
          </div>

          <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
            <div>
              <span className="font-semibold text-stone-900 dark:text-white block">Third-Party Analytics & Tracking Pixels</span>
              <span className="text-xs text-stone-500">Zero Google Analytics, Facebook Pixels, or external ad trackers.</span>
            </div>
            <span className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4" /> ZERO TRACKERS
            </span>
          </div>
        </div>
      </div>

      {/* How answers are stored */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2 font-bold text-stone-900 dark:text-white mb-2">
            <Lock className="w-5 h-5 text-stone-700 dark:text-stone-300" />
            <span>Where do my answers live?</span>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            Your answers reside exclusively in your web browser's temporary working memory (RAM) and session storage. The server never logs or retains your answers. When you close the browser tab, the data disappears immediately.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2 font-bold text-stone-900 dark:text-white mb-2">
            <EyeOff className="w-5 h-5 text-stone-700 dark:text-stone-300" />
            <span>How does QR code sharing work?</span>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            The QR code generates a link with the coarse answers encoded in the URL hash (<code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded font-mono text-[11px]">#profile=...</code>). Because URL hashes are never transmitted to web servers in HTTP requests, your answers stay strictly peer-to-peer between your devices.
          </p>
        </div>
      </div>

      {/* Manual Erase Action */}
      {hasAnswers && (
        <div className="p-6 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-3xl text-center">
          <h3 className="text-base font-bold text-rose-950 dark:text-rose-200 mb-2">
            Want to immediately clear this browser session?
          </h3>
          <p className="text-xs text-rose-800 dark:text-rose-300 mb-4 max-w-lg mx-auto">
            Clicking below instantly removes all answers from this device’s memory.
          </p>
          <button
            onClick={onClearAnswers}
            className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-semibold rounded-xl inline-flex items-center gap-2 transition-colors min-h-[44px]"
          >
            <Trash2 className="w-4 h-4" />
            <span>{t.clearAnswers}</span>
          </button>
        </div>
      )}
    </div>
  );
};
