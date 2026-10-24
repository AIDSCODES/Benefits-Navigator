/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Globe,
  Trash2,
  AlertTriangle,
  Menu,
  X,
  HardDrive,
  Mail,
  Video,
  Sparkles,
  Bell,
  LogIn,
  TrendingUp,
  Calendar,
  Wallet,
} from 'lucide-react';
import { SupportedLanguage } from '../lib/engine/types.ts';
import { TRANSLATIONS } from '../lib/i18n/translations.ts';
import { CitizenUser } from '../lib/citizenAuth.ts';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  lang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  isHighContrast?: boolean;
  onToggleHighContrast?: () => void;
  isLargeText?: boolean;
  onToggleLargeText?: () => void;
  isLowLiteracy?: boolean;
  onToggleLowLiteracy?: () => void;
  onClearAnswers: () => void;
  hasAnswers: boolean;
  onOpenWorkspace?: () => void;
  onOpenTutorVideo?: () => void;
  onOpenChatbot?: () => void;
  onOpenNotifications?: () => void;
  newSchemesCount?: number;
  citizenUser?: CitizenUser | null;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  lang,
  onLanguageChange,
  isHighContrast,
  onToggleHighContrast,
  isLargeText,
  onToggleLargeText,
  isLowLiteracy,
  onToggleLowLiteracy,
  onClearAnswers,
  hasAnswers,
  onOpenWorkspace,
  onOpenTutorVideo,
  onOpenChatbot,
  onOpenNotifications,
  newSchemesCount = 0,
  citizenUser,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const t = TRANSLATIONS[lang];

  const handleTabClick = (tab: string) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  const confirmClear = () => {
    onClearAnswers();
    setShowClearConfirm(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800">
      {/* Non-negotiable Persistent Unofficial Guidance Banner */}
      <div
        role="region"
        aria-label="Government Impersonation Disclaimer"
        className="w-full bg-amber-500 text-stone-950 font-medium text-xs sm:text-sm px-4 py-2 text-center flex items-center justify-center gap-2 select-none"
      >
        <AlertTriangle className="w-4 h-4 shrink-0 text-stone-950" aria-hidden="true" />
        <span className="font-semibold">{t.bannerDisclaimer}</span>
      </div>

      {/* Main Top Bar: Left Group (Brand & Nav Buttons) and Right Group (Quick Action Utilities) */}
      <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 h-16">
        {/* Left Side: Wordmark Brand Logo + Header Navigation Buttons */}
        <div className="flex items-center gap-3 lg:gap-4 xl:gap-5 min-w-0 flex-1">
          {/* Brand Wordmark Logo */}
          <button
            onClick={() => handleTabClick('navigator')}
            className="text-left group cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-stone-900 dark:focus-visible:ring-white rounded-md p-1 shrink-0"
          >
            <div className="flex items-center gap-2 sm:gap-2.5">
              <img
                src="/yojana360-logo.png"
                alt="Yojana360 Logo"
                className="w-8 h-8 sm:w-9 sm:h-9 object-contain rounded-lg shadow-xs"
              />
              <span className="text-lg sm:text-xl font-bold tracking-tight text-stone-900 dark:text-white whitespace-nowrap">
                Yojana360
              </span>
            </div>
          </button>

          {/* Header Navigation Buttons moved to Left Side */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs xl:text-sm font-medium text-stone-600 dark:text-stone-300 min-w-0 overflow-x-auto no-scrollbar py-1"
            aria-label="Main Navigation"
          >
            <button
              onClick={() => handleTabClick('navigator')}
              className={`whitespace-nowrap shrink-0 transition-colors px-2.5 py-1.5 rounded-lg ${
                currentTab === 'navigator'
                  ? 'bg-stone-100 dark:bg-stone-800 text-stone-950 dark:text-white font-semibold'
                  : 'hover:bg-stone-50 dark:hover:bg-stone-800/60 hover:text-stone-950 dark:hover:text-white'
              }`}
            >
              {t.navFind}
            </button>

            <button
              onClick={() => handleTabClick('registry')}
              className={`whitespace-nowrap shrink-0 transition-colors px-2.5 py-1.5 rounded-lg ${
                currentTab === 'registry'
                  ? 'bg-stone-100 dark:bg-stone-800 text-stone-950 dark:text-white font-semibold'
                  : 'hover:bg-stone-50 dark:hover:bg-stone-800/60 hover:text-stone-950 dark:hover:text-white'
              }`}
            >
              {t.navRegistry}
            </button>

            <button
              onClick={() => handleTabClick('trending')}
              className={`whitespace-nowrap shrink-0 transition-colors px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 ${
                currentTab === 'trending'
                  ? 'bg-stone-100 dark:bg-stone-800 text-stone-950 dark:text-white font-semibold'
                  : 'hover:bg-stone-50 dark:hover:bg-stone-800/60 hover:text-stone-950 dark:hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>{t.navTrending || 'Trending'}</span>
            </button>

            <button
              onClick={() => handleTabClick('calendar')}
              className={`whitespace-nowrap shrink-0 transition-colors px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 ${
                currentTab === 'calendar'
                  ? 'bg-stone-100 dark:bg-stone-800 text-stone-950 dark:text-white font-semibold'
                  : 'hover:bg-stone-50 dark:hover:bg-stone-800/60 hover:text-stone-950 dark:hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>{t.navCalendar || 'Calendar'}</span>
            </button>

            <button
              onClick={() => handleTabClick('wallet')}
              className={`whitespace-nowrap shrink-0 transition-colors px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 ${
                currentTab === 'wallet'
                  ? 'bg-stone-100 dark:bg-stone-800 text-stone-950 dark:text-white font-semibold'
                  : 'hover:bg-stone-50 dark:hover:bg-stone-800/60 hover:text-stone-950 dark:hover:text-white'
              }`}
            >
              <Wallet className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{t.navWallet || 'Wallet'}</span>
            </button>

            <button
              onClick={() => handleTabClick('about')}
              className={`whitespace-nowrap shrink-0 transition-colors px-2.5 py-1.5 rounded-lg ${
                currentTab === 'about'
                  ? 'bg-stone-100 dark:bg-stone-800 text-stone-950 dark:text-white font-semibold'
                  : 'hover:bg-stone-50 dark:hover:bg-stone-800/60 hover:text-stone-950 dark:hover:text-white'
              }`}
            >
              {t.navAbout}
            </button>
          </nav>
        </div>

        {/* Right Side: Quick Action Utilities */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Language Selector */}
          <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-xl p-0.5 sm:p-1">
            <Globe className="w-3.5 h-3.5 ml-1.5 mr-0.5 text-stone-500 shrink-0" aria-hidden="true" />
            <select
              value={lang}
              onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
              aria-label="Select Language"
              className="bg-transparent text-xs font-semibold text-stone-800 dark:text-stone-200 py-1 pr-1.5 pl-0.5 cursor-pointer focus:outline-hidden min-h-[34px]"
            >
              <option value="en" className="dark:bg-stone-900 text-stone-900 dark:text-stone-100">English</option>
              <option value="hi" className="dark:bg-stone-900 text-stone-900 dark:text-stone-100">हिन्दी</option>
              <option value="mr" className="dark:bg-stone-900 text-stone-900 dark:text-stone-100">मराठी</option>
              <option value="bn" className="dark:bg-stone-900 text-stone-900 dark:text-stone-100">বাংলা</option>
              <option value="te" className="dark:bg-stone-900 text-stone-900 dark:text-stone-100">తెలుగు</option>
              <option value="ta" className="dark:bg-stone-900 text-stone-900 dark:text-stone-100">தமிழ்</option>
              <option value="gu" className="dark:bg-stone-900 text-stone-900 dark:text-stone-100">ગુજરાતી</option>
              <option value="kn" className="dark:bg-stone-900 text-stone-900 dark:text-stone-100">ಕನ್ನಡ</option>
              <option value="ml" className="dark:bg-stone-900 text-stone-900 dark:text-stone-100">മലയാളം</option>
              <option value="pa" className="dark:bg-stone-900 text-stone-900 dark:text-stone-100">ਪੰਜਾਬੀ</option>
              <option value="or" className="dark:bg-stone-900 text-stone-900 dark:text-stone-100">ଓଡ଼ିଆ</option>
            </select>
          </div>

          {/* AI Tutor Video Guide Trigger */}
          {onOpenTutorVideo && (
            <button
              onClick={onOpenTutorVideo}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 rounded-xl text-xs font-semibold transition-colors min-h-[34px]"
              title={t.tutorVideoBtn}
            >
              <Video className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="hidden xl:inline">{t.tutorVideoBtn}</span>
              <span className="xl:hidden hidden sm:inline">Video</span>
            </button>
          )}

          {/* New Scheme Arrival Notification Bell */}
          {onOpenNotifications && (
            <button
              onClick={onOpenNotifications}
              className="relative p-2 text-stone-700 dark:text-stone-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-xl transition-colors min-h-[34px] min-w-[34px] flex items-center justify-center cursor-pointer"
              title="New Scheme Arrival Alerts"
              aria-label="New Scheme Arrival Alerts"
            >
              <Bell className="w-4 h-4" />
              {newSchemesCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-black text-stone-950 shadow-xs ring-2 ring-white dark:ring-stone-900 animate-pulse">
                  {newSchemesCount}
                </span>
              )}
            </button>
          )}

          {/* Google Workspace Trigger */}
          {onOpenWorkspace && (
            <button
              onClick={onOpenWorkspace}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-xl text-xs font-semibold transition-colors min-h-[34px]"
              title="Connect Google Drive & Gmail"
            >
              <div className="flex items-center -space-x-1 shrink-0">
                <HardDrive className="w-3.5 h-3.5 text-amber-500" />
                <Mail className="w-3.5 h-3.5 text-rose-500" />
              </div>
              <span className="hidden 2xl:inline">Drive & Gmail</span>
              <span className="2xl:hidden hidden xl:inline">Drive</span>
            </button>
          )}

          {/* Clear My Answers Button */}
          {hasAnswers && (
            <button
              onClick={() => setShowClearConfirm(true)}
              title={t.clearAnswers}
              aria-label={t.clearAnswers}
              className="p-1.5 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors min-h-[34px] min-w-[34px] flex items-center justify-center"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 rounded-lg min-h-[36px] min-w-[36px] flex items-center justify-center"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-4 pt-2 pb-6 space-y-2">
          {/* Mobile Sign In / Account Entry */}
          <button
            onClick={() => handleTabClick('login')}
            className={`w-full text-left px-3 py-3 rounded-xl font-medium text-sm min-h-[44px] flex items-center gap-2 ${
              currentTab === 'login'
                ? 'bg-stone-100 dark:bg-stone-800 font-bold'
                : citizenUser
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border border-emerald-500/30'
                : 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 font-bold'
            }`}
          >
            {citizenUser ? (
              <>
                <span className="text-base">{citizenUser.avatarUrl || '👤'}</span>
                <span>My Account ({citizenUser.name})</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Citizen Sign In / Register</span>
              </>
            )}
          </button>

          <button
            onClick={() => handleTabClick('navigator')}
            className={`w-full text-left px-3 py-3 rounded-xl font-medium text-sm min-h-[44px] ${
              currentTab === 'navigator' ? 'bg-stone-100 dark:bg-stone-800 font-bold' : ''
            }`}
          >
            {t.navFind}
          </button>
          <button
            onClick={() => handleTabClick('registry')}
            className={`w-full text-left px-3 py-3 rounded-xl font-medium text-sm min-h-[44px] ${
              currentTab === 'registry' ? 'bg-stone-100 dark:bg-stone-800 font-bold' : ''
            }`}
          >
            {t.navRegistry}
          </button>
          <button
            onClick={() => handleTabClick('trending')}
            className={`w-full text-left px-3 py-3 rounded-xl font-medium text-sm min-h-[44px] flex items-center gap-2 ${
              currentTab === 'trending' ? 'bg-stone-100 dark:bg-stone-800 font-bold' : ''
            }`}
          >
            <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>{t.navTrending || 'Trending Analytics'}</span>
          </button>
          <button
            onClick={() => handleTabClick('calendar')}
            className={`w-full text-left px-3 py-3 rounded-xl font-medium text-sm min-h-[44px] flex items-center gap-2 ${
              currentTab === 'calendar' ? 'bg-stone-100 dark:bg-stone-800 font-bold' : ''
            }`}
          >
            <Calendar className="w-4 h-4 text-rose-500" />
            <span>{t.navCalendar || 'Deadlines & Calendar'}</span>
          </button>
          <button
            onClick={() => handleTabClick('wallet')}
            className={`w-full text-left px-3 py-3 rounded-xl font-medium text-sm min-h-[44px] flex items-center gap-2 ${
              currentTab === 'wallet' ? 'bg-stone-100 dark:bg-stone-800 font-bold' : ''
            }`}
          >
            <Wallet className="w-4 h-4 text-emerald-500" />
            <span>{t.navWallet || 'Benefit Wallet'}</span>
          </button>
          <button
            onClick={() => handleTabClick('about')}
            className={`w-full text-left px-3 py-3 rounded-xl font-medium text-sm min-h-[44px] ${
              currentTab === 'about' ? 'bg-stone-100 dark:bg-stone-800 font-bold' : ''
            }`}
          >
            {t.navAbout}
          </button>

          {onOpenTutorVideo && (
            <button
              onClick={() => {
                onOpenTutorVideo();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-3 rounded-xl font-medium text-sm min-h-[44px] flex items-center gap-2 bg-amber-500/15 text-amber-900 dark:text-amber-300 border border-amber-500/30"
            >
              <Video className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>{t.tutorVideoBtn}</span>
            </button>
          )}



          {onOpenNotifications && (
            <button
              onClick={() => {
                onOpenNotifications();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-3 rounded-xl font-medium text-sm min-h-[44px] flex items-center justify-between bg-emerald-500/15 text-emerald-900 dark:text-emerald-300 border border-emerald-500/30"
            >
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>New Scheme Alerts</span>
              </div>
              {newSchemesCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-stone-950 text-xs font-bold">
                  {newSchemesCount} New
                </span>
              )}
            </button>
          )}

          {onOpenWorkspace && (
            <button
              onClick={() => {
                onOpenWorkspace();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-3 rounded-xl font-medium text-sm min-h-[44px] flex items-center gap-2 bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200"
            >
              <div className="flex items-center -space-x-1">
                <HardDrive className="w-4 h-4 text-amber-500" />
                <Mail className="w-4 h-4 text-rose-500" />
              </div>
              <span>Google Drive & Gmail</span>
            </button>
          )}

          {/* Mobile Language Selector Strip */}
          <div className="pt-2 flex items-center justify-between border-t border-stone-200 dark:border-stone-800">
            <span className="text-xs text-stone-500 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" /> Language:
            </span>
            <select
              value={lang}
              onChange={(e) => {
                onLanguageChange(e.target.value as SupportedLanguage);
                setMobileMenuOpen(false);
              }}
              aria-label="Select Mobile Language"
              className="bg-stone-100 dark:bg-stone-800 text-xs font-semibold text-stone-800 dark:text-stone-200 py-1.5 px-2 rounded-lg cursor-pointer focus:outline-hidden min-h-[36px]"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="mr">मराठी</option>
              <option value="bn">বাংলা</option>
              <option value="te">తెలుగు</option>
              <option value="ta">தமிழ்</option>
              <option value="gu">ગુજરાતી</option>
              <option value="kn">ಕನ್ನಡ</option>
              <option value="ml">മലയാളം</option>
              <option value="pa">ਪੰਜਾਬੀ</option>
              <option value="or">ଓଡ଼ିଆ</option>
            </select>
          </div>
        </div>
      )}

      {/* Clear Answers Confirmation Modal */}
      {showClearConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md p-6 bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800">
            <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2">
              {t.clearAnswers}
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-300 mb-6">
              {t.clearAnswersConfirm}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2.5 text-sm font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 rounded-xl min-h-[44px]"
              >
                {t.cancel}
              </button>
              <button
                onClick={confirmClear}
                className="px-4 py-2.5 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl min-h-[44px]"
              >
                {t.clearAnswers}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
