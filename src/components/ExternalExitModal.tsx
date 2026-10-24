/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ExternalLink, ShieldAlert, X } from 'lucide-react';
import { SupportedLanguage } from '../lib/engine/types.ts';
import { TRANSLATIONS } from '../lib/i18n/translations.ts';

interface ExternalExitModalProps {
  url: string | null;
  schemeName: string;
  lang: SupportedLanguage;
  onClose: () => void;
}

export const ExternalExitModal: React.FC<ExternalExitModalProps> = ({
  url,
  schemeName,
  lang,
  onClose,
}) => {
  if (!url) return null;
  const t = TRANSLATIONS[lang];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="external-modal-title"
    >
      <div className="relative w-full max-w-lg p-6 bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800">
        <button
          onClick={onClose}
          aria-label={t.close}
          className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4 text-amber-600 dark:text-amber-400">
          <ShieldAlert className="w-7 h-7 shrink-0" />
          <h3 id="external-modal-title" className="text-lg font-bold text-stone-900 dark:text-white">
            {t.externalLinkNotice}
          </h3>
        </div>

        <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300 mb-4">
          {t.leaveToOfficialNotice}
        </p>

        <div className="p-3 mb-6 bg-stone-100 dark:bg-stone-800 rounded-xl text-xs font-mono text-stone-700 dark:text-stone-300 break-all select-all">
          <div className="font-semibold text-stone-900 dark:text-stone-100 mb-1">{schemeName}</div>
          {url}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-xl transition-colors min-h-[44px]"
          >
            {t.cancel}
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white rounded-xl transition-colors flex items-center justify-center gap-2 min-h-[44px]"
          >
            <span>{t.proceedToOfficial}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
