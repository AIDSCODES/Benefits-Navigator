/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CheckCircle2,
  HelpCircle,
  XCircle,
  ExternalLink,
  Printer,
  QrCode,
  RotateCcw,
  Sparkles,
  FileText,
  Clock,
  AlertCircle,
  Check,
  ChevronDown,
  ChevronUp,
  HardDrive,
  Mail,
} from 'lucide-react';
import {
  Scheme,
  SchemeEvaluationResult,
  SupportedLanguage,
  UserProfile,
} from '../lib/engine/types.ts';
import { TRANSLATIONS } from '../lib/i18n/translations.ts';
import { ExternalExitModal } from './ExternalExitModal.tsx';
import { QrCodeModal } from './QrCodeModal.tsx';
import { WorkspaceModal } from './WorkspaceModal.tsx';
import { AiSchemeAnalysisModal } from './AiSchemeAnalysisModal.tsx';

interface ResultsViewProps {
  likelyMatch: SchemeEvaluationResult[];
  needMoreInfo: SchemeEvaluationResult[];
  notMatched: SchemeEvaluationResult[];
  consolidatedDocuments: {
    name: Record<string, string | undefined> & { en: string; hi: string; mr: string };
    schemes: { id: string; name: string }[];
    mandatory: boolean;
    alternative?: Record<string, string | undefined> & { en: string; hi: string; mr: string };
  }[];
  profile: UserProfile;
  lang: SupportedLanguage;
  onRetake: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  likelyMatch,
  needMoreInfo,
  notMatched,
  consolidatedDocuments,
  profile,
  lang,
  onRetake,
}) => {
  const [selectedExitUrl, setSelectedExitUrl] = useState<string | null>(null);
  const [selectedExitSchemeName, setSelectedExitSchemeName] = useState('');
  const [selectedAnalysisScheme, setSelectedAnalysisScheme] = useState<Scheme | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [expandedSchemes, setExpandedSchemes] = useState<Record<string, boolean>>({});
  const [aiSimplifiedText, setAiSimplifiedText] = useState<Record<string, string>>({});
  const [aiLoading, setAiLoading] = useState<Record<string, boolean>>({});
  const [aiAvailable, setAiAvailable] = useState<boolean | null>(null);

  const t = TRANSLATIONS[lang];

  // Report generation timestamp for print/PDF export
  const reportTimestamp = React.useMemo(() => {
    try {
      const now = new Date();
      const localeMap: Record<SupportedLanguage, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        mr: 'mr-IN',
        bn: 'bn-IN',
        te: 'te-IN',
        ta: 'ta-IN',
        gu: 'gu-IN',
        kn: 'kn-IN',
        ml: 'ml-IN',
        pa: 'pa-IN',
        or: 'or-IN',
      };
      return now.toLocaleString(localeMap[lang] || 'en-IN', {
        dateStyle: 'full',
        timeStyle: 'short',
      });
    } catch {
      return new Date().toISOString().split('T')[0];
    }
  }, [lang]);

  // Formatted HTML Report for Google Drive & Gmail Export
  const reportContentHtml = React.useMemo(() => {
    const matchedList = likelyMatch
      .map(
        (m) =>
          `<li style="margin-bottom:8px;"><strong>${m.scheme.name[lang] || m.scheme.name.en}</strong> (${m.scheme.code})<br/><span style="color:#555;">${m.scheme.short_summary[lang] || m.scheme.short_summary.en}</span><br/><span style="color:#777; font-size:11px;">Official Portal: <a href="${m.scheme.official_url}">${m.scheme.official_url}</a></span></li>`
      )
      .join('');
    const docsList = consolidatedDocuments
      .map((d) => `<li style="margin-bottom:4px;">${d.name[lang] || d.name.en} ${d.mandatory ? '<strong>(Mandatory)</strong>' : ''}</li>`)
      .join('');

    return `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.5; color: #1c1917;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
          <img src="${typeof window !== 'undefined' ? window.location.origin : ''}/yojana360-logo.png" alt="Yojana360 Logo" style="width: 36px; height: 36px; object-fit: contain; border-radius: 6px;" />
          <h2 style="color: #0c0a09; margin: 0; font-size: 20px;">Yojana360 — Entitlement Report</h2>
        </div>
        <p style="color: #78716c; font-size: 12px; margin-top: 0;">Generated on: ${reportTimestamp}</p>
        <div style="background: #f5f5f4; border: 1px solid #e7e5e4; padding: 12px; border-radius: 8px; font-size: 11px; color: #44403c; margin-bottom: 20px;">
          <strong>Notice:</strong> Unofficial guidance document. Not a government issuance. Always verify and apply on official portals.
        </div>
        <h3 style="color: #166534; border-bottom: 1px solid #e7e5e4; padding-bottom: 6px;">Likely Matched Public Schemes (${likelyMatch.length})</h3>
        <ul style="padding-left: 20px;">${matchedList || '<li>No direct likely matches found.</li>'}</ul>
        <h3 style="color: #1c1917; border-bottom: 1px solid #e7e5e4; padding-bottom: 6px; margin-top: 24px;">Consolidated Document Checklist</h3>
        <p style="font-size: 12px; color: #57534e;">Bring these documents to your local center:</p>
        <ul style="padding-left: 20px;">${docsList || '<li>No documents specified.</li>'}</ul>
      </div>
    `;
  }, [likelyMatch, consolidatedDocuments, reportTimestamp, lang]);

  // Document checklist toggle
  const toggleDocChecked = (docName: string) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [docName]: !prev[docName],
    }));
  };

  // Card expand/collapse toggle
  const toggleCard = (id: string) => {
    setExpandedSchemes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Construct URL with coarse answers in hash only (no server)
  const shareHash = `#profile=${encodeURIComponent(JSON.stringify(profile))}`;
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}${shareHash}` : '';

  // Trigger browser print dialog for printable checklist / Save as PDF
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // Optional AI simplification request
  const handleAiSimplify = async (schemeId: string, originalText: string) => {
    if (aiLoading[schemeId]) return;

    setAiLoading((prev) => ({ ...prev, [schemeId]: true }));
    try {
      const res = await fetch('/api/ai/simplify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schemeId, text: originalText, targetLang: lang }),
      });

      if (res.ok) {
        const data = await res.json();
        setAiSimplifiedText((prev) => ({ ...prev, [schemeId]: data.simplifiedText }));
        setAiAvailable(true);
      } else {
        setAiAvailable(false);
      }
    } catch {
      setAiAvailable(false);
    } finally {
      setAiLoading((prev) => ({ ...prev, [schemeId]: false }));
    }
  };

  // Render a Scheme Card
  const renderSchemeCard = (res: SchemeEvaluationResult, tier: 'likely' | 'possible' | 'notMatched') => {
    const scheme = res.scheme;
    const isExpanded = expandedSchemes[scheme.id] ?? (tier === 'likely');

    const badgeBorder =
      tier === 'likely'
        ? 'border-emerald-600/30 dark:border-emerald-500/30'
        : tier === 'possible'
        ? 'border-amber-600/30 dark:border-amber-500/30'
        : 'border-stone-300 dark:border-stone-800 opacity-80';

    return (
      <div
        key={scheme.id}
        className={`bg-white dark:bg-stone-900 rounded-3xl border ${badgeBorder} shadow-xs transition-all overflow-hidden mb-5 print-break-inside-avoid print-card-border scheme-card`}
      >
        {/* Card Header */}
        <div className="p-6 sm:p-8 print:p-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1">
              {/* Unboxed Metadata Header (Anti-slop zero-pill rule) */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400 font-medium">
                <span className="font-semibold tracking-wide text-stone-700 dark:text-stone-300 print:text-black">
                  {scheme.code}
                </span>
                <span aria-hidden="true">·</span>
                <span className="capitalize">{scheme.category}</span>
                <span aria-hidden="true">·</span>
                <span>{scheme.level === 'central' ? 'Central Scheme' : `${scheme.state} State`}</span>
                {res.isOutdated && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {t.outdatedWarning}
                    </span>
                  </>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-white print:text-black pt-1">
                {scheme.name[lang] || scheme.name.en}
              </h3>

              {scheme.benefit_type && (
                <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 print:text-stone-900">
                  {scheme.benefit_type[lang] || scheme.benefit_type.en}
                </div>
              )}

              {/* Print-only URL display */}
              <div className="print-only text-[9pt] font-mono text-stone-700 pt-1">
                Official Portal: {scheme.official_url}
              </div>
            </div>

            {/* Quick Status Pill Alternative: Human Readable State with Icon */}
            <div className="shrink-0 flex items-center gap-2">
              {tier === 'likely' && (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 print:bg-white print:text-black print:border-black">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 print:text-black" />
                  {t.statusLikely}
                </span>
              )}
              {tier === 'possible' && (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-amber-800 print:bg-white print:text-black print:border-black">
                  <HelpCircle className="w-4 h-4 text-amber-600 print:text-black" />
                  {t.statusPossible}
                </span>
              )}
              {tier === 'notMatched' && (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-lg print:bg-white print:text-black print:border-stone-400">
                  <XCircle className="w-4 h-4 text-stone-400 print:text-black" />
                  {t.statusNotMatched}
                </span>
              )}
            </div>
          </div>

          {/* Plain Summary */}
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 print:text-stone-900 mt-3 leading-relaxed">
            {scheme.short_summary[lang] || scheme.short_summary.en}
          </p>

          {/* Optional AI Explainer text if generated */}
          {aiSimplifiedText[scheme.id] && (
            <div className="mt-4 p-4 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-2xl print:bg-white print:border-stone-400">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-800 dark:text-sky-300 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.aiSimplifiedBadge}</span>
              </div>
              <p className="text-sm text-sky-950 dark:text-sky-100 leading-relaxed font-sans">
                {aiSimplifiedText[scheme.id]}
              </p>
            </div>
          )}

          {/* Expand/Collapse Toggle & AI Simplify Button */}
          <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-3 no-print">
            <button
              onClick={() => toggleCard(scheme.id)}
              className="text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-stone-900 flex items-center gap-1.5 py-1"
            >
              <span>{isExpanded ? 'Hide Details & Steps' : 'View Criteria & Steps'}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <div className="flex items-center gap-3">
              {/* AI Simplifier Trigger (Feature flagged) */}
              <button
                onClick={() =>
                  handleAiSimplify(
                    scheme.id,
                    scheme.description[lang] || scheme.description.en
                  )
                }
                disabled={aiLoading[scheme.id]}
                className="text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 transition-colors"
                title="Uses Gemini 2.5 Flash to rephrase scheme benefits in simpler language"
              >
                <Sparkles className="w-3.5 h-3.5 text-stone-500" />
                <span>
                  {aiLoading[scheme.id] ? 'Simplifying...' : t.aiSimplifyButton}
                </span>
              </button>

              {/* BUTTON: AI Analysis */}
              <button
                onClick={() => setSelectedAnalysisScheme(scheme)}
                className="px-2.5 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs hover:scale-102 cursor-pointer"
                title="Run in-depth AI Analysis on this scheme & its official website"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 animate-pulse" />
                <span>AI Analysis</span>
              </button>

              {/* Official Link Trigger with Exit Modal */}
              <button
                onClick={() => {
                  setSelectedExitUrl(scheme.official_url);
                  setSelectedExitSchemeName(scheme.name[lang] || scheme.name.en);
                }}
                className="text-xs font-semibold text-stone-900 dark:text-white hover:underline flex items-center gap-1"
              >
                <span>{t.officialPortal}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Documents Needed Directly Below Scheme Website Link */}
          <div className="mt-4 pt-3.5 border-t border-stone-100 dark:border-stone-800">
            <div className="p-3 bg-stone-50 dark:bg-stone-900/60 rounded-xl border border-stone-200/80 dark:border-stone-800">
              <div className="flex items-center justify-between text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-2">
                <span className="flex items-center gap-1.5 uppercase tracking-wider">
                  <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  {t.docsRequired} ({scheme.documents.length})
                </span>
                <span className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold">
                  {scheme.documents.filter((d) => d.mandatory).length} {t.mandatory}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {scheme.documents.map((doc) => (
                  <span
                    key={doc.id}
                    className={`text-xs px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${
                      doc.mandatory
                        ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border-stone-200 dark:border-stone-700 font-medium shadow-2xs'
                        : 'bg-stone-100 dark:bg-stone-800/50 text-stone-600 dark:text-stone-400 border-dashed border-stone-300 dark:border-stone-700'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{doc.name[lang] || doc.name.en}</span>
                    {doc.mandatory ? (
                      <span className="text-[9px] text-rose-600 dark:text-rose-400 font-bold bg-rose-50 dark:bg-rose-950/40 px-1 py-0.2 rounded border border-rose-200 dark:border-rose-900">
                        {t.mandatory}
                      </span>
                    ) : (
                      <span className="text-[9px] text-stone-400 font-normal">
                        ({t.optionalAlternative || 'Optional'})
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Details Section: Visible if expanded on screen, or always visible in print */}
        <div
          className={`${
            isExpanded ? 'block' : 'hidden print:block'
          } bg-stone-50/60 dark:bg-stone-950/40 p-6 sm:p-8 border-t border-stone-200 dark:border-stone-800 space-y-6 print:bg-white print:p-4 print:space-y-4 print:border-stone-400`}
        >
            {/* 1. Transparent Criteria Evaluation (Why it matches / failed / unknown) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Matched Criteria */}
              {res.matched.length > 0 && (
                <div className="p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-400 mb-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>{t.matchedCriteria}</span>
                  </div>
                  <ul className="text-xs space-y-1.5 text-stone-700 dark:text-stone-300">
                    {res.matched.map((m) => (
                      <li key={m.criterion.id} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{m.criterion.explanation[lang] || m.criterion.explanation.en}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Incomplete / Unknown Criteria */}
              {res.unknown.length > 0 && (
                <div className="p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-400 mb-2">
                    <HelpCircle className="w-4 h-4 shrink-0 text-amber-600" />
                    <span>{t.missingCriteria}</span>
                  </div>
                  <ul className="text-xs space-y-1.5 text-stone-700 dark:text-stone-300">
                    {res.unknown.map((u) => (
                      <li key={u.criterion.id} className="flex items-start gap-1.5">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{u.criterion.explanation[lang] || u.criterion.explanation.en}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Failed Criteria */}
              {res.failed.length > 0 && (
                <div className="p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-800 dark:text-rose-400 mb-2">
                    <XCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{t.failedCriteria}</span>
                  </div>
                  <ul className="text-xs space-y-1.5 text-stone-700 dark:text-stone-300">
                    {res.failed.map((f) => (
                      <li key={f.criterion.id} className="flex items-start gap-1.5">
                        <span className="text-rose-600 font-bold">•</span>
                        <span>{f.criterion.explanation[lang] || f.criterion.explanation.en}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 2. Documents required for this specific scheme */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3">
                {t.docsRequired}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {scheme.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 flex items-start gap-2.5"
                  >
                    <FileText className="w-4 h-4 mt-0.5 text-stone-400 shrink-0" />
                    <div className="text-xs">
                      <div className="font-semibold text-stone-900 dark:text-stone-100">
                        {doc.name[lang] || doc.name.en}
                        {doc.mandatory && (
                          <span className="ml-1.5 text-[10px] text-rose-600 dark:text-rose-400 font-bold">
                            ({t.mandatory})
                          </span>
                        )}
                      </div>
                      {doc.description && (
                        <div className="text-stone-500 dark:text-stone-400 mt-0.5">
                          {doc.description[lang] || doc.description.en}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Numbered Application Steps */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3">
                {t.stepsToApply}
              </h4>
              <ol className="space-y-3">
                {scheme.steps.map((step) => (
                  <li
                    key={step.step_number}
                    className="p-3.5 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 flex items-start gap-3.5"
                  >
                    <div className="w-6 h-6 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold flex items-center justify-center shrink-0">
                      {step.step_number}
                    </div>
                    <div className="text-xs">
                      <div className="font-bold text-stone-900 dark:text-stone-100">
                        {step.title[lang] || step.title.en}
                      </div>
                      <div className="text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                        {step.instruction[lang] || step.instruction.en}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Source citation and last verified footer */}
            <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 gap-2">
              <div>
                <span className="font-semibold">Source: </span>
                <span>{scheme.source_citation}</span>
              </div>
              <div className="flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3" />
                <span>
                  {t.lastVerified} {scheme.last_verified}
                </span>
              </div>
            </div>
          </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Print Watermark */}
      <div className="print-only fixed inset-0 pointer-events-none flex items-center justify-center opacity-[0.04] select-none z-0" aria-hidden="true">
        <img src="/yojana360-logo.png" alt="" className="w-[450px] h-[450px] object-contain filter grayscale" />
      </div>

      {/* Enhanced Print-Only Report Header with App Name and Timestamp */}
      <div className="print-only mb-6 pb-4 border-b-2 border-stone-900 text-stone-950 relative z-10">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex items-center gap-3">
            <img src="/yojana360-logo.png" alt="Yojana360 Logo" className="w-12 h-12 object-contain rounded-lg shrink-0" />
            <div>
              <h1 className="text-xl font-bold tracking-tight text-black">
                Yojana360 — Public Welfare & Entitlements Report
              </h1>
              <div className="text-xs text-stone-700 font-medium mt-0.5">
                Decentralized Public Welfare Assistance · Unofficial Decision-Support
              </div>
            </div>
          </div>
          <div className="text-right text-xs font-mono text-stone-700">
            <div>Report Generated:</div>
            <div className="font-bold text-stone-950">{reportTimestamp}</div>
          </div>
        </div>

        {/* Notice & Anonymous Coarse Input Summary */}
        <div className="mt-3 p-3 bg-stone-100 rounded-lg text-[9.5pt] text-stone-800 border border-stone-300">
          <div className="font-bold text-stone-900 mb-1">
            Official Verification Notice: This is an unofficial decision-support checklist. Not a government issuance. Always verify and apply on official portals.
          </div>
          {Object.keys(profile).length > 0 && (
            <div className="text-[9pt] text-stone-700 flex flex-wrap gap-x-3 gap-y-0.5 font-mono pt-1 border-t border-stone-200">
              <span className="font-bold text-stone-900">Coarse Profile Evaluated:</span>
              {profile.state && <span>State: {profile.state}</span>}
              {profile.occupation && <span>Occupation: {profile.occupation}</span>}
              {profile.ageBand && <span>Age Band: {profile.ageBand}</span>}
              {profile.incomeBand && <span>Income Band: {profile.incomeBand}</span>}
              {profile.landHolding && <span>Land: {profile.landHolding}</span>}
              {profile.housingType && <span>Housing: {profile.housingType}</span>}
            </div>
          )}
        </div>
      </div>

      {/* Top Banner & Summary Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
            {t.resultsSummary
              .replace('{likely}', String(likelyMatch.length))
              .replace('{possible}', String(needMoreInfo.length))}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Deterministic matching based on verified public scheme criteria. No personal data was stored.
          </p>
        </div>

        {/* Global Export & Retake Actions */}
        <div className="flex flex-wrap items-center gap-2 no-print">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors min-h-[44px]"
          >
            <Printer className="w-4 h-4" />
            <span>{t.printChecklist}</span>
          </button>

          <button
            onClick={() => setShowQrModal(true)}
            className="px-4 py-2.5 bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-200 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors min-h-[44px]"
          >
            <QrCode className="w-4 h-4" />
            <span>{t.showQrCode}</span>
          </button>

          <button
            onClick={() => setShowWorkspaceModal(true)}
            className="px-3.5 py-2.5 bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-200 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors min-h-[44px]"
            title="Save to Google Drive or Email via Gmail"
          >
            <div className="flex items-center -space-x-1">
              <HardDrive className="w-4 h-4 text-amber-500" />
              <Mail className="w-4 h-4 text-rose-500" />
            </div>
            <span>Drive & Gmail</span>
          </button>

          <button
            onClick={onRetake}
            className="px-3 py-2.5 text-stone-500 dark:text-stone-400 hover:text-stone-900 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-1.5 min-h-[44px]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Edit Answers</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: CONSOLIDATED DOCUMENT CHECKLIST */}
      {consolidatedDocuments.length > 0 && (
        <div className="mb-10 p-6 sm:p-8 bg-stone-900 text-white dark:bg-stone-800 rounded-3xl shadow-sm print-checklist-container print-break-inside-avoid print:bg-white print:text-black">
          <div className="mb-5">
            <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 print:text-black">
              <FileText className="w-5 h-5 text-amber-400 print:text-black" />
              <span>{t.consolidatedDocsTitle}</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 print:text-stone-700 mt-1">
              {t.consolidatedDocsSubtitle} — Bring these papers to complete applications without repeated visits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 print:grid-cols-1 print:gap-2">
            {consolidatedDocuments.map((doc, idx) => {
              const docName = doc.name[lang] || doc.name.en;
              const isChecked = !!checkedDocs[docName];

              return (
                <div
                  key={idx}
                  onClick={() => toggleDocChecked(docName)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 print-checklist-item ${
                    isChecked
                      ? 'bg-stone-800/90 border-emerald-500/80 text-stone-300 print:bg-white print:text-black print:border-stone-800'
                      : 'bg-stone-800/40 border-stone-700/60 hover:border-stone-500 text-white print:bg-white print:text-black print:border-stone-800'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors print-checkbox ${
                      isChecked
                        ? 'bg-emerald-500 border-emerald-500 text-white print:bg-black print:text-white'
                        : 'border-stone-500 bg-stone-700/50 print:bg-white print:border-black'
                    }`}
                  >
                    {isChecked ? (
                      <Check className="w-4 h-4 stroke-[3] print:stroke-white" />
                    ) : (
                      <span className="print-only text-[8pt] text-transparent">[ ]</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold leading-tight print:text-black">
                      {docName}
                      {doc.mandatory && (
                        <span className="ml-1.5 text-[10px] text-amber-400 print:text-stone-900 font-bold uppercase">
                          ({t.mandatory})
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-stone-400 print:text-stone-700 mt-1">
                      <span className="font-medium text-stone-300 print:text-stone-900">{t.forSchemes} </span>
                      {doc.schemes.map((s) => s.name).join(', ')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: LIKELY MATCHES */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <h2 className="text-xl font-bold text-stone-900 dark:text-white">
            {t.statusLikely} ({likelyMatch.length})
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mb-5">
          {t.statusLikelyDesc}
        </p>

        {likelyMatch.length === 0 ? (
          <div className="p-8 text-center bg-stone-100 dark:bg-stone-800/40 rounded-2xl text-stone-500 text-sm">
            No direct likely matches found with current inputs. Check the schemes below for additional requirements.
          </div>
        ) : (
          likelyMatch.map((res) => renderSchemeCard(res, 'likely'))
        )}
      </div>

      {/* SECTION 3: POSSIBLE MATCHES (NEED MORE INFO) */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <h2 className="text-xl font-bold text-stone-900 dark:text-white">
            {t.statusPossible} ({needMoreInfo.length})
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mb-5">
          {t.statusPossibleDesc}
        </p>

        {needMoreInfo.map((res) => renderSchemeCard(res, 'possible'))}
      </div>

      {/* SECTION 4: NOT MATCHED SCHEMES */}
      {notMatched.length > 0 && (
        <div className="mb-10 pt-6 border-t border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-stone-400" />
            <h2 className="text-lg font-bold text-stone-700 dark:text-stone-300">
              {t.statusNotMatched} ({notMatched.length})
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mb-5">
            {t.statusNotMatchedDesc}
          </p>

          {notMatched.map((res) => renderSchemeCard(res, 'notMatched'))}
        </div>
      )}

      {/* Exit confirmation modal before going to official external portal */}
      <ExternalExitModal
        url={selectedExitUrl}
        schemeName={selectedExitSchemeName}
        lang={lang}
        onClose={() => setSelectedExitUrl(null)}
      />

      {/* QR Code export modal */}
      {showQrModal && (
        <QrCodeModal
          shareUrl={shareUrl}
          lang={lang}
          onClose={() => setShowQrModal(false)}
        />
      )}

      {/* Google Workspace Drive & Gmail Modal */}
      <WorkspaceModal
        isOpen={showWorkspaceModal}
        onClose={() => setShowWorkspaceModal(false)}
        reportContentHtml={reportContentHtml}
        reportContentText={reportContentHtml.replace(/<[^>]+>/g, '')}
        likelyMatch={likelyMatch}
        consolidatedDocs={consolidatedDocuments}
      />

      {/* AI Scheme & Website Analysis Modal */}
      <AiSchemeAnalysisModal
        scheme={selectedAnalysisScheme}
        lang={lang}
        userProfile={profile}
        isOpen={Boolean(selectedAnalysisScheme)}
        onClose={() => setSelectedAnalysisScheme(null)}
        onOpenOfficialUrl={(url, name) => {
          setSelectedExitUrl(url);
          setSelectedExitSchemeName(name);
        }}
      />
    </div>
  );
};
