/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Bell,
  X,
  Send,
  MessageCircle,
  Mail,
  Smartphone,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { Scheme, UserProfile, SupportedLanguage } from '../lib/engine/types.ts';
import {
  formatSchemeAlertMessage,
  sendSchemeAlertViaWhatsApp,
  sendSchemeAlertViaEmail,
  sendSchemeAlertViaSMS,
  requestNotificationPermission,
  triggerBrowserNotification,
  isSchemeApplicableToUser,
} from '../lib/schemeNotificationService.ts';
import { SIMULATION_NEW_SCHEMES } from '../data/newSchemesCatalog.ts';

interface NewSchemeAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  lang: SupportedLanguage;
  availableNewSchemes: Scheme[];
  onAddNewSchemeToRegistry: (scheme: Scheme) => void;
  onStartQuestions?: () => void;
}

export const NewSchemeAlertModal: React.FC<NewSchemeAlertModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  lang,
  availableNewSchemes,
  onAddNewSchemeToRegistry,
  onStartQuestions,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [recipientPhone, setRecipientPhone] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [browserNotifStatus, setBrowserNotifStatus] = useState<NotificationPermission>(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'default';
  });
  const [simulationStatus, setSimulationStatus] = useState<{
    schemeName: string;
    isApplicable: boolean;
    reason: string;
  } | null>(null);
  const [apiSendingId, setApiSendingId] = useState<string | null>(null);
  const [apiSuccessId, setApiSuccessId] = useState<string | null>(null);
  const [apiMessage, setApiMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const hasProfileAnswers = Object.keys(userProfile).length > 0;

  // Evaluate which schemes match the user
  const evaluatedSchemes = availableNewSchemes.map((scheme) => {
    const evaluation = isSchemeApplicableToUser(scheme, userProfile);
    return {
      scheme,
      ...evaluation,
    };
  });

  const applicableSchemes = evaluatedSchemes.filter((e) => e.isApplicable);
  const otherSchemes = evaluatedSchemes.filter((e) => !e.isApplicable);

  const handleCopy = (scheme: Scheme) => {
    const { plainText } = formatSchemeAlertMessage(scheme, userProfile, lang);
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(plainText);
      setCopiedId(scheme.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleEnableBrowserNotifications = async () => {
    const perm = await requestNotificationPermission();
    setBrowserNotifStatus(perm);
    if (perm === 'granted' && applicableSchemes.length > 0) {
      triggerBrowserNotification(applicableSchemes[0].scheme, lang, () => {});
    }
  };

  const handleSendViaWhatsAppApi = async (scheme: Scheme) => {
    const { whatsAppText } = formatSchemeAlertMessage(scheme, userProfile, lang);
    setApiSendingId(scheme.id);
    setApiMessage(null);

    try {
      const res = await fetch('/api/notifications/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: recipientPhone,
          message: whatsAppText,
          schemeName: scheme.name[lang] || scheme.name.en,
          apiKey: 'LlanIPOMu47tkS0I4sEqmbNTRnT98gn64imkUFyZ416e2450',
        }),
      });

      const data = await res.json();
      setApiSuccessId(scheme.id);
      setApiMessage(data.message || 'WhatsApp message dispatched with API key!');
      
      // If direct intent link provided, open it
      if (data.directWebUrl) {
        window.open(data.directWebUrl, '_blank');
      }
    } catch {
      sendSchemeAlertViaWhatsApp(scheme, userProfile, lang, recipientPhone);
      setApiSuccessId(scheme.id);
      setApiMessage('WhatsApp link opened with pre-filled message!');
    } finally {
      setApiSendingId(null);
      setTimeout(() => setApiSuccessId(null), 6000);
    }
  };

  const handleSimulateSchemeArrival = (newScheme: Scheme) => {
    onAddNewSchemeToRegistry(newScheme);
    const evalResult = isSchemeApplicableToUser(newScheme, userProfile);

    if (evalResult.isApplicable) {
      setSimulationStatus({
        schemeName: newScheme.name[lang] || newScheme.name.en,
        isApplicable: true,
        reason: evalResult.reasons.join(', ') || 'Matches your current profile responses.',
      });
      // Fire native browser notification if allowed
      triggerBrowserNotification(newScheme, lang, () => {});
    } else {
      setSimulationStatus({
        schemeName: newScheme.name[lang] || newScheme.name.en,
        isApplicable: false,
        reason:
          evalResult.status === 'NOT_MATCHED'
            ? 'Not applicable to your current profile (e.g. requires specific occupation or gender).'
            : 'More profile details needed to confirm eligibility.',
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-scheme-alert-title"
    >
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden text-stone-900 dark:text-stone-100">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-emerald-800 via-teal-800 to-stone-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-300 shadow-inner">
              <Bell className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="new-scheme-alert-title" className="text-base sm:text-lg font-bold">
                  New Scheme Arrival Alerts
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/40 text-[10px] font-bold tracking-wide uppercase">
                  Live Dispatch
                </span>
              </div>
              <p className="text-xs text-emerald-100/80">
                Send instant notification messages to users when a matching scheme is published
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {/* User Profile Context Strip */}
          <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  Target User Profile:
                </span>{' '}
                {hasProfileAnswers ? (
                  <span className="text-stone-600 dark:text-stone-300">
                    State: <strong>{userProfile.state || 'All India'}</strong> | Age:{' '}
                    <strong>{userProfile.ageBand || 'Any'}</strong> | Occupation:{' '}
                    <strong>{userProfile.occupation || 'Any'}</strong> | Gender:{' '}
                    <strong>{userProfile.gender || 'Any'}</strong>
                  </span>
                ) : (
                  <span className="text-amber-700 dark:text-amber-400 font-medium">
                    No profile responses yet. Answering quick questions helps match applicable schemes.
                  </span>
                )}
              </div>
            </div>

            {!hasProfileAnswers && onStartQuestions && (
              <button
                onClick={() => {
                  onClose();
                  onStartQuestions();
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shrink-0 cursor-pointer shadow-xs"
              >
                Start Quick Questions
              </button>
            )}
          </div>

          {/* Browser Notification Opt-in Strip */}
          <div className="p-3.5 rounded-2xl bg-teal-50/80 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
              <div>
                <span className="font-semibold text-teal-950 dark:text-teal-200">
                  Browser Push Notifications:
                </span>{' '}
                <span className="text-teal-800 dark:text-teal-300">
                  {browserNotifStatus === 'granted'
                    ? 'Active. You will get native desktop alerts when new applicable schemes launch.'
                    : 'Get notified instantly on your phone or desktop when an applicable scheme arrives.'}
                </span>
              </div>
            </div>

            {browserNotifStatus !== 'granted' && (
              <button
                onClick={handleEnableBrowserNotifications}
                className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs shrink-0 cursor-pointer shadow-xs transition-colors"
              >
                Enable Notifications
              </button>
            )}
          </div>

          {/* Simulation Feedback Alert */}
          {simulationStatus && (
            <div
              className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-start gap-3 transition-all ${
                simulationStatus.isApplicable
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100'
                  : 'bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-300'
              }`}
            >
              {simulationStatus.isApplicable ? (
                <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <div className="font-bold">
                  {simulationStatus.isApplicable
                    ? `🎉 New Scheme "${simulationStatus.schemeName}" is Applicable to this user!`
                    : `ℹ️ Scheme "${simulationStatus.schemeName}" Arrived (Not Applicable)`}
                </div>
                <div className="text-xs mt-1 opacity-90">{simulationStatus.reason}</div>
              </div>
              <button
                onClick={() => setSimulationStatus(null)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* WhatsApp API Key & Recipient Phone Strip */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-bold text-emerald-950 dark:text-emerald-200">
                  Citizen WhatsApp Number:
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                  API Key Configured (LlanIPO...2450)
                </span>
              </div>
              <span className="text-[11px] text-emerald-800/80 dark:text-emerald-300">
                Enter phone number to receive WhatsApp alert
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-2.5 text-xs text-stone-500 font-bold">+91</span>
                <input
                  type="tel"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value.replace(/[^\d]/g, '').slice(0, 10))}
                  placeholder="Enter 10-digit mobile (e.g. 9876543210)"
                  className="w-full bg-white dark:bg-stone-900 border border-emerald-400/50 dark:border-emerald-700/60 rounded-xl pl-11 pr-3 py-2 text-xs sm:text-sm text-stone-900 dark:text-stone-100 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="text-[11px] text-stone-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Instant API delivery</span>
              </div>
            </div>

            {apiMessage && (
              <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-400 text-emerald-900 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{apiMessage}</span>
              </div>
            )}
          </div>

          {/* Applicable New Schemes List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <span>Applicable New Schemes</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 text-xs font-black">
                  {applicableSchemes.length}
                </span>
              </h3>
              <span className="text-[11px] text-stone-500">
                Filtered strictly by applicant eligibility
              </span>
            </div>

            {applicableSchemes.length === 0 ? (
              <div className="p-6 text-center border-2 border-dashed border-stone-200 dark:border-stone-800 rounded-3xl">
                <Bell className="w-8 h-8 text-stone-300 dark:text-stone-600 mx-auto mb-2" />
                <p className="text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-300">
                  No newly arrived schemes matching your current profile.
                </p>
                <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
                  Try answering all profile questions or use the "Simulate Scheme Arrival" buttons
                  below to test sending messages for new schemes!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {applicableSchemes.map(({ scheme, reasons }) => {
                  const schemeName = scheme.name[lang] || scheme.name.en;
                  const benefit =
                    scheme.benefit_type?.[lang] || scheme.benefit_type?.en || 'Welfare Benefit';
                  const summary = scheme.short_summary[lang] || scheme.short_summary.en;

                  return (
                    <div
                      key={scheme.id}
                      className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-white to-stone-50/80 dark:from-stone-800/80 dark:to-stone-900/80 border-2 border-emerald-500/30 dark:border-emerald-500/20 shadow-md space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-stone-950 text-[10px] font-black uppercase tracking-wider">
                              NEW ARRIVAL
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 text-[10px] font-bold">
                              {scheme.code}
                            </span>
                            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                              🟢 Highly Applicable
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-stone-900 dark:text-white mt-1">
                            {schemeName}
                          </h4>
                        </div>

                        <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-300/40 shrink-0">
                          {benefit}
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                        {summary}
                      </p>

                      {/* Matching Reasons */}
                      {reasons.length > 0 && (
                        <div className="text-xs bg-emerald-50/80 dark:bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-200">
                          <span className="font-bold">Why it applies to this user: </span>
                          <span>{reasons.join(' · ')}</span>
                        </div>
                      )}

                      {/* Documents snippet */}
                      <div className="text-xs text-stone-500">
                        <span className="font-semibold text-stone-700 dark:text-stone-300">
                          Documents Needed:{' '}
                        </span>
                        {scheme.documents.map((d) => d.name[lang] || d.name.en).join(', ')}
                      </div>

                      {/* ── Message Dispatch Action Bar ── */}
                      <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center gap-2">
                        {/* WhatsApp API Key Button */}
                        <button
                          onClick={() => handleSendViaWhatsAppApi(scheme)}
                          disabled={apiSendingId === scheme.id}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer min-h-[38px]"
                          title="Send scheme alert message directly using WhatsApp API Key"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>
                            {apiSendingId === scheme.id
                              ? 'Sending...'
                              : apiSuccessId === scheme.id
                              ? 'Sent via WhatsApp!'
                              : 'Send via WhatsApp (API)'}
                          </span>
                        </button>

                        {/* Gmail / Email Button */}
                        <button
                          onClick={() => sendSchemeAlertViaEmail(scheme, userProfile, lang, recipientEmail)}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer min-h-[38px]"
                          title="Send scheme alert message via Email or Gmail"
                        >
                          <Mail className="w-4 h-4" />
                          <span>Send via Email</span>
                        </button>

                        {/* SMS Button */}
                        <button
                          onClick={() => sendSchemeAlertViaSMS(scheme, userProfile, lang, recipientPhone)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 dark:bg-stone-700 dark:hover:bg-stone-600 text-stone-800 dark:text-stone-200 text-xs font-bold transition-all cursor-pointer min-h-[38px]"
                          title="Send scheme alert message via Phone SMS"
                        >
                          <Smartphone className="w-4 h-4" />
                          <span className="hidden sm:inline">Send SMS</span>
                        </button>

                        {/* Copy Alert Text */}
                        <button
                          onClick={() => handleCopy(scheme)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-medium transition-all cursor-pointer min-h-[38px] ml-auto"
                          title="Copy formatted scheme message to clipboard"
                        >
                          {copiedId === scheme.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                                Copied!
                              </span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Message</span>
                            </>
                          )}
                        </button>

                        {/* Official Portal Link */}
                        <a
                          href={scheme.official_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                          title="Visit official portal"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Test / Simulation Control Section ── */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <h4 className="text-xs sm:text-sm font-bold text-amber-950 dark:text-amber-200">
                  Simulate New Scheme Launch (Testing Lab)
                </h4>
              </div>
              <span className="text-[11px] text-amber-800/80 dark:text-amber-300">
                Click any scheme to broadcast arrival & test applicability:
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {SIMULATION_NEW_SCHEMES.map((scheme) => (
                <button
                  key={scheme.id}
                  onClick={() => handleSimulateSchemeArrival(scheme)}
                  className="p-3 text-left rounded-xl bg-white dark:bg-stone-800 border border-amber-500/30 hover:border-amber-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase">
                      {scheme.code}
                    </div>
                    <div className="text-xs font-bold text-stone-900 dark:text-white line-clamp-1 group-hover:text-amber-600 transition-colors">
                      {scheme.name.en}
                    </div>
                    <div className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                      {scheme.benefit_type?.en || 'Welfare benefit'}
                    </div>
                  </div>
                  <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" />
                    <span>Broadcast Scheme Arrival →</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Zero-PII notification: Messages are dispatched directly via your device.</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
