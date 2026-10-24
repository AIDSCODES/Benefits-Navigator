/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Copy, Check, QrCode, ShieldCheck } from 'lucide-react';
import { SupportedLanguage } from '../lib/engine/types.ts';
import { TRANSLATIONS } from '../lib/i18n/translations.ts';

interface QrCodeModalProps {
  shareUrl: string;
  lang: SupportedLanguage;
  onClose: () => void;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({ shareUrl, lang, onClose }) => {
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[lang];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-modal-title"
    >
      <div className="relative w-full max-w-md p-6 bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 text-center">
        <button
          onClick={onClose}
          aria-label={t.close}
          className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-900 dark:text-stone-100">
          <QrCode className="w-6 h-6" />
        </div>

        <h3 id="qr-modal-title" className="text-xl font-bold text-stone-900 dark:text-white mb-2">
          {t.qrModalTitle}
        </h3>

        <p className="text-xs text-stone-500 dark:text-stone-400 mb-6 leading-relaxed">
          {t.qrModalDesc}
        </p>

        {/* QR Code Canvas */}
        <div className="inline-block p-4 bg-white rounded-2xl border border-stone-200 shadow-xs mb-6">
          <QRCodeSVG
            value={shareUrl}
            size={220}
            level="M"
            includeMargin={false}
          />
        </div>

        <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 py-2 px-3 rounded-xl mb-5">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>No personal identity or server tracking involved</span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 py-3 px-4 text-sm font-semibold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white rounded-xl transition-colors flex items-center justify-center gap-2 min-h-[44px]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
                <span>{t.linkCopied}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{t.copyLink}</span>
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="py-3 px-5 text-sm font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-xl transition-colors min-h-[44px]"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
