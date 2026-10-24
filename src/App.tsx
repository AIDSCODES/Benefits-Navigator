/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { UserProfile, SupportedLanguage, Scheme } from './lib/engine/types.ts';
import { SCHEMES } from './data/schemes.ts';
import { SIMULATION_NEW_SCHEMES } from './data/newSchemesCatalog.ts';
import { evaluateAllSchemes } from './lib/engine/evaluator.ts';
import { isSchemeApplicableToUser, triggerBrowserNotification } from './lib/schemeNotificationService.ts';
import { TRANSLATIONS } from './lib/i18n/translations.ts';
import { Header } from './components/Header.tsx';
import { QuestionFlow } from './components/QuestionFlow.tsx';
import { ResultsView } from './components/ResultsView.tsx';
import { RegistryBrowser } from './components/RegistryBrowser.tsx';
import { TrendingAnalyticsView } from './components/TrendingAnalyticsView.tsx';
import { DeadlinesCalendarView } from './components/DeadlinesCalendarView.tsx';
import { BenefitWalletView } from './components/BenefitWalletView.tsx';
import { AboutView } from './components/AboutView.tsx';
import { LoginView } from './components/LoginView.tsx';
import { WorkspaceModal } from './components/WorkspaceModal.tsx';
import { AiTutorVideoModal } from './components/AiTutorVideoModal.tsx';
import { AiAssistantChatbot } from './components/AiAssistantChatbot.tsx';
import { NewSchemeAlertModal } from './components/NewSchemeAlertModal.tsx';
import { CitizenUser, getStoredCitizen } from './lib/citizenAuth.ts';
import { ShieldAlert, Check, Bell, LogIn } from 'lucide-react';


const STORAGE_KEY = 'benefits_navigator_answers_session_only';
const TUTORIAL_SEEN_KEY = 'benefits_navigator_has_seen_tutorial';

export default function App() {
  const [lang, setLang] = useState<SupportedLanguage>('en');
  const [currentTab, setCurrentTab] = useState<string>('navigator');
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [isLargeText, setIsLargeText] = useState<boolean>(false);
  const [isLowLiteracy, setIsLowLiteracy] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showGlobalWorkspace, setShowGlobalWorkspace] = useState<boolean>(false);

  // Tutorial tracking: on first visit it is compulsory, next visits it has skip option
  const [hasSeenTutorial, setHasSeenTutorial] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    try {
      return localStorage.getItem(TUTORIAL_SEEN_KEY) === 'true';
    } catch {
      return true;
    }
  });
  const [showTutorModal, setShowTutorModal] = useState<boolean>(false);
  const [showChatbot, setShowChatbot] = useState<boolean>(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState<boolean>(false);
  const [allSchemes, setAllSchemes] = useState<Scheme[]>(SCHEMES);
  const [availableNewSchemes, setAvailableNewSchemes] = useState<Scheme[]>(SIMULATION_NEW_SCHEMES);

  // Authenticated citizen state
  const [citizenUser, setCitizenUser] = useState<CitizenUser | null>(() => getStoredCitizen());

  useEffect(() => {
    const handleAuthChange = (e: any) => {
      setCitizenUser(e.detail);
    };
    window.addEventListener('yojana360_auth_change', handleAuthChange);
    return () => window.removeEventListener('yojana360_auth_change', handleAuthChange);
  }, []);

  // In-memory / session user profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    if (typeof window === 'undefined') return {};
    try {
      // 1. Check URL hash for peer-to-peer shared answers
      const hash = window.location.hash;
      if (hash && hash.includes('profile=')) {
        const encoded = hash.split('profile=')[1];
        if (encoded) {
          const parsed = JSON.parse(decodeURIComponent(encoded));
          if (parsed && typeof parsed === 'object') return parsed;
        }
      }

      // 2. Fallback to session storage
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore parse errors
    }
    return {};
  });

  // Sync to session storage (never local storage, never server)
  useEffect(() => {
    try {
      if (Object.keys(userProfile).length > 0) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userProfile));
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Storage unavailable
    }
  }, [userProfile]);

  // Sync accessibility classes to HTML document
  useEffect(() => {
    const root = document.documentElement;
    if (isHighContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (isLargeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }
  }, [isHighContrast, isLargeText]);

  // If initial URL had hash answers, start on results view
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash.includes('profile=')) {
      setCurrentTab('results');
    }
  }, []);

  // Check if first-time visitor on load -> Open video tutorial compulsory
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const seen = localStorage.getItem(TUTORIAL_SEEN_KEY);
        if (!seen) {
          setShowTutorModal(true);
        }
      } catch {}
    }
  }, []);

  const handleFirstVisitComplete = () => {
    try {
      localStorage.setItem(TUTORIAL_SEEN_KEY, 'true');
    } catch {}
    setHasSeenTutorial(true);
  };

  const handleResetFirstVisitDemo = () => {
    try {
      localStorage.removeItem(TUTORIAL_SEEN_KEY);
    } catch {}
    setHasSeenTutorial(false);
    setShowTutorModal(true);
  };

  const handleUpdateProfile = (field: keyof UserProfile, value: any) => {
    setUserProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClearAnswers = () => {
    setUserProfile({});
    try {
      sessionStorage.removeItem(STORAGE_KEY);
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    } catch {}

    setToastMessage(TRANSLATIONS[lang].clearedToast);
    setCurrentTab('navigator');
    setTimeout(() => setToastMessage(null), 3500);
  };
 
  // Evaluate schemes deterministically
  const evaluation = useMemo(() => {
    return evaluateAllSchemes(allSchemes, userProfile);
  }, [allSchemes, userProfile]);

  // Compute newly arrived schemes that match user eligibility
  const applicableNewSchemes = useMemo(() => {
    return availableNewSchemes.filter((s) => isSchemeApplicableToUser(s, userProfile).isApplicable);
  }, [availableNewSchemes, userProfile]);

  const handleAddNewSchemeToRegistry = (newScheme: Scheme) => {
    setAllSchemes((prev) => {
      if (prev.some((s) => s.id === newScheme.id)) return prev;
      return [newScheme, ...prev];
    });

    const evalResult = isSchemeApplicableToUser(newScheme, userProfile);
    if (evalResult.isApplicable) {
      setToastMessage(`🔔 New scheme "${newScheme.name[lang] || newScheme.name.en}" is applicable to your profile! Click to send alert.`);
      triggerBrowserNotification(newScheme, lang, () => setShowNotificationsModal(true));
      setTimeout(() => setToastMessage(null), 8000);
    }
  };

  const hasAnswers = Object.keys(userProfile).length > 0;
  const t = TRANSLATIONS[lang];

  return (
    <div className="relative min-h-screen flex flex-col bg-[#fafaf9] dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
      {/* Subtle Background Brand Watermark */}
      <div
        className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-[0.035] dark:opacity-[0.025] select-none overflow-hidden"
        aria-hidden="true"
      >
        <img
          src="/yojana360-logo.png"
          alt=""
          className="w-[520px] h-[520px] max-w-[85vw] max-h-[85vh] object-contain filter grayscale"
        />
      </div>

      {/* Header with Persistent Non-Governmental Disclaimer Banner */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        lang={lang}
        onLanguageChange={setLang}
        isHighContrast={isHighContrast}
        onToggleHighContrast={() => setIsHighContrast(!isHighContrast)}
        isLargeText={isLargeText}
        onToggleLargeText={() => setIsLargeText(!isLargeText)}
        isLowLiteracy={isLowLiteracy}
        onToggleLowLiteracy={() => setIsLowLiteracy(!isLowLiteracy)}
        onClearAnswers={handleClearAnswers}
        hasAnswers={hasAnswers}
        onOpenWorkspace={() => setShowGlobalWorkspace(true)}
        onOpenTutorVideo={() => setShowTutorModal(true)}
        onOpenChatbot={() => setShowChatbot(true)}
        onOpenNotifications={() => setShowNotificationsModal(true)}
        newSchemesCount={applicableNewSchemes.length}
        citizenUser={citizenUser}
      />

      {/* Main Content Workspace */}
      <main className="flex-1 flex flex-col justify-start">
        {/* Toast Notification */}
        {toastMessage && (
          <div
            onClick={() => {
              if (toastMessage.includes('🔔')) setShowNotificationsModal(true);
            }}
            className={`max-w-md mx-auto my-4 px-4 py-3 text-xs sm:text-sm font-semibold rounded-2xl shadow-lg flex items-center gap-2 transition-transform cursor-pointer hover:scale-102 ${
              toastMessage.includes('🔔')
                ? 'bg-emerald-900 text-white border border-emerald-500/60 shadow-emerald-900/30'
                : 'bg-stone-900 text-white dark:bg-white dark:text-stone-900'
            }`}
          >
            {toastMessage.includes('🔔') ? (
              <Bell className="w-4 h-4 text-emerald-400 shrink-0 animate-bounce" />
            ) : (
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Tab 1: Guided Question Flow */}
        {currentTab === 'navigator' && (
          <QuestionFlow
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            onComplete={() => setCurrentTab('results')}
            lang={lang}
            isLowLiteracy={isLowLiteracy}
            onOpenChatbot={() => setShowChatbot(true)}
          />
        )}

        {/* Tab 2: Results View */}
        {currentTab === 'results' && (
          <ResultsView
            likelyMatch={evaluation.likelyMatch}
            needMoreInfo={evaluation.needMoreInfo}
            notMatched={evaluation.notMatched}
            consolidatedDocuments={evaluation.consolidatedDocuments}
            profile={userProfile}
            lang={lang}
            onRetake={() => setCurrentTab('navigator')}
          />
        )}

        {/* Tab 3: Scheme Registry Browser */}
        {currentTab === 'registry' && <RegistryBrowser lang={lang} />}

        {/* Tab: Trending Schemes Analytics */}
        {currentTab === 'trending' && (
          <TrendingAnalyticsView
            lang={lang}
            onCheckEligibility={(preset) => {
              setUserProfile((prev) => ({ ...prev, ...preset }));
              setCurrentTab('results');
              setToastMessage('Target scheme loaded! Showing matched requirements.');
              setTimeout(() => setToastMessage(null), 3500);
            }}
            onNavigateTab={(tab) => setCurrentTab(tab)}
          />
        )}

        {/* Tab: Deadlines & Fiscal Calendar */}
        {currentTab === 'calendar' && (
          <DeadlinesCalendarView
            lang={lang}
            onCheckEligibility={(preset) => {
              setUserProfile((prev) => ({ ...prev, ...preset }));
              setCurrentTab('results');
              setToastMessage('Scheme requirements loaded! Showing eligibility match.');
              setTimeout(() => setToastMessage(null), 3500);
            }}
            onNavigateTab={(tab) => setCurrentTab(tab)}
            onSetReminderAlert={(event) => {
              setToastMessage(`🔔 Reminder registered for ${event.schemeName}!`);
              setTimeout(() => setToastMessage(null), 3500);
            }}
          />
        )}

        {/* Tab: Digital Benefit Wallet (Locker) */}
        {currentTab === 'wallet' && (
          <BenefitWalletView
            lang={lang}
            onApplyProfileToNavigator={(profile) => {
              setUserProfile((prev) => ({ ...prev, ...profile }));
              setCurrentTab('results');
              setToastMessage('🎉 Form auto-filled from your encrypted Benefit Wallet!');
              setTimeout(() => setToastMessage(null), 3500);
            }}
            onNavigateTab={(tab) => setCurrentTab(tab)}
          />
        )}

        {/* Tab 4: Citizen Login & Account Portal */}
        {currentTab === 'login' && (
          <LoginView
            lang={lang}
            onLoginSuccess={(user) => {
              setCitizenUser(user);
              setToastMessage(`Welcome back, ${user.name}!`);
              setTimeout(() => setToastMessage(null), 3500);
            }}
            onNavigateToTab={(tab) => setCurrentTab(tab)}
            onApplyProfilePreset={(preset) => {
              setUserProfile((prev) => ({ ...prev, ...preset }));
              setToastMessage('Persona loaded! Matched schemes updated.');
              setTimeout(() => setToastMessage(null), 3500);
            }}
          />
        )}

        {/* Tab 5: About, Sources & Reporting */}
        {currentTab === 'about' && <AboutView lang={lang} />}
      </main>

      {/* Clean Non-Governmental Footer */}
      <footer className="mt-auto border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs text-stone-500 py-6 px-4 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <ShieldAlert className="w-4 h-4 text-stone-400 shrink-0" />
            <span>
              Yojana360 — An open-source, privacy-first decision tool. Not affiliated with or endorsed by any government entity.
            </span>
          </div>

          <div className="flex items-center gap-4 text-stone-600 dark:text-stone-400 font-medium">
            <button onClick={() => setCurrentTab('trending')} className="hover:underline">
              {t.navTrending || 'Trending Analytics'}
            </button>
            <span>·</span>
            <button onClick={() => setCurrentTab('calendar')} className="hover:underline">
              {t.navCalendar || 'Deadlines & Calendar'}
            </button>
            <span>·</span>
            <button onClick={() => setCurrentTab('wallet')} className="hover:underline">
              {t.navWallet || 'Benefit Wallet'}
            </button>
            <span>·</span>
            <button onClick={() => setCurrentTab('login')} className="hover:underline font-semibold text-emerald-600 dark:text-emerald-400">
              {citizenUser ? 'My Account' : 'Sign In'}
            </button>
            <span>·</span>
            <button onClick={() => setCurrentTab('about')} className="hover:underline">
              {t.navAbout}
            </button>
          </div>
        </div>
      </footer>

      {/* Global Google Workspace Drive & Gmail Modal */}
      <WorkspaceModal
        isOpen={showGlobalWorkspace}
        onClose={() => setShowGlobalWorkspace(false)}
        reportContentHtml={`
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.5; color: #1c1917;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
              <img src="${typeof window !== 'undefined' ? window.location.origin : ''}/yojana360-logo.png" alt="Yojana360" style="width: 36px; height: 36px; object-fit: contain; border-radius: 6px;" />
              <h2 style="color: #0c0a09; margin: 0; font-size: 20px;">Yojana360 — Entitlement Report</h2>
            </div>
            <p style="color: #78716c; font-size: 12px; margin-top: 0;">Generated on: ${new Date().toLocaleDateString()}</p>
            <div style="background: #f5f5f4; border: 1px solid #e7e5e4; padding: 12px; border-radius: 8px; font-size: 11px; color: #44403c; margin-bottom: 20px;">
              <strong>Notice:</strong> Unofficial guidance document. Not a government issuance. Always verify and apply on official portals.
            </div>
            <h3 style="color: #166534; border-bottom: 1px solid #e7e5e4; padding-bottom: 6px;">Likely Matched Public Schemes (${evaluation.likelyMatch.length})</h3>
            <ul>${evaluation.likelyMatch.map(m => `<li><strong>${m.scheme.name[lang] || m.scheme.name.en}</strong> (${m.scheme.code}): ${m.scheme.short_summary[lang] || m.scheme.short_summary.en}</li>`).join('') || '<li>No direct likely matches found.</li>'}</ul>
            <h3 style="color: #1c1917; border-bottom: 1px solid #e7e5e4; padding-bottom: 6px; margin-top: 24px;">Consolidated Document Checklist</h3>
            <ul>${evaluation.consolidatedDocuments.map(d => `<li>${d.name[lang] || d.name.en} ${d.mandatory ? '(Mandatory)' : ''}</li>`).join('') || '<li>No documents specified.</li>'}</ul>
          </div>
        `}
        reportContentText="Yojana360 Public Entitlement Report"
        likelyMatch={evaluation.likelyMatch}
        consolidatedDocs={evaluation.consolidatedDocuments}
      />

      {/* Interactive AI Tutor Video Walkthrough Modal */}
      <AiTutorVideoModal
        isOpen={showTutorModal}
        onClose={() => setShowTutorModal(false)}
        lang={lang}
        onLanguageChange={setLang}
        isFirstVisit={!hasSeenTutorial}
        onFirstVisitComplete={handleFirstVisitComplete}
        onResetFirstVisitDemo={handleResetFirstVisitDemo}
      />

      {/* Interactive AI Welfare Assistant Chatbot (Floating launcher & interactive modal) */}
      <AiAssistantChatbot
        lang={lang}
        isOpen={showChatbot}
        onToggle={() => setShowChatbot((prev) => !prev)}
        onOpenTutorVideo={() => setShowTutorModal(true)}
        onNavigateTab={(tab) => setCurrentTab(tab)}
        onApplyProfile={(profile) => {
          setUserProfile((prev) => ({ ...prev, ...profile }));
          setCurrentTab('results');
          setToastMessage('🎉 Personalized schemes loaded from AI Assistant!');
          setTimeout(() => setToastMessage(null), 3500);
        }}
      />

      {/* Floating Citizen Account / Sign In Button (Fixed at Bottom Left Corner) */}
      <button
        onClick={() => setCurrentTab('login')}
        className={`fixed bottom-5 left-4 sm:left-6 z-40 group flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border no-print min-h-[46px] ${
          citizenUser
            ? currentTab === 'login'
              ? 'bg-emerald-600 text-white border-emerald-300 font-extrabold shadow-emerald-950/30 ring-2 ring-emerald-400/50'
              : 'bg-emerald-700/95 hover:bg-emerald-600 text-white border-emerald-400/70 shadow-emerald-950/25'
            : currentTab === 'login'
            ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 border-amber-300 font-extrabold shadow-amber-900/25 ring-2 ring-amber-400/50'
            : 'bg-stone-900/95 hover:bg-stone-900 text-white dark:bg-white/95 dark:hover:bg-white dark:text-stone-950 border-stone-700/80 dark:border-stone-300 shadow-stone-950/30'
        }`}
        title={citizenUser ? `Signed in as ${citizenUser.name} — View Citizen Account` : 'Sign In to Yojana360'}
        aria-label={citizenUser ? `My Account (${citizenUser.name})` : 'Sign In'}
      >
        {citizenUser ? (
          <>
            <div className="relative w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm shadow-xs shrink-0 overflow-hidden">
              <span className="relative z-10">{citizenUser.avatarUrl || '👤'}</span>
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-300 ring-1 ring-emerald-700" />
            </div>
            <div className="flex flex-col text-left pr-0.5 max-w-[120px]">
              <span className="text-xs font-bold leading-tight truncate">My Account</span>
              <span className="text-[10px] text-emerald-100 font-medium leading-tight truncate">
                {citizenUser.name.split(' ')[0]}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="w-7 h-7 rounded-full bg-white/10 dark:bg-stone-900/10 flex items-center justify-center shrink-0">
              <LogIn className="w-4 h-4" />
            </div>
            <div className="flex flex-col text-left pr-0.5">
              <span className="text-xs font-bold leading-tight">Sign In</span>
              <span className="text-[10px] opacity-75 font-medium leading-tight">Citizen Portal</span>
            </div>
          </>
        )}
      </button>

      {/* New Scheme Arrival & Citizen Message Dispatch Modal */}
      <NewSchemeAlertModal
        isOpen={showNotificationsModal}
        onClose={() => setShowNotificationsModal(false)}
        userProfile={userProfile}
        lang={lang}
        availableNewSchemes={availableNewSchemes}
        onAddNewSchemeToRegistry={handleAddNewSchemeToRegistry}
        onStartQuestions={() => setCurrentTab('navigator')}
      />
    </div>
  );
}
