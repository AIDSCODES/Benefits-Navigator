/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { Volume2, Mic, MicOff, ArrowRight, ArrowLeft, SkipForward, Search, Sparkles, MessageSquare } from 'lucide-react';
import { UserProfile, SupportedLanguage } from '../lib/engine/types.ts';
import { QUESTIONS, QuestionOption } from '../data/questions.ts';
import { TRANSLATIONS } from '../lib/i18n/translations.ts';
import { STATES_AND_UTS_DATA } from '../data/statesData.ts';
import {
  getRationCardOptionsForState,
  getRationCardHelpTextForState,
  hasCustomStateRationCards,
} from '../data/rationCardsData.ts';


interface QuestionFlowProps {
  userProfile: UserProfile;
  onUpdateProfile: (field: keyof UserProfile, value: any) => void;
  onComplete: () => void;
  lang: SupportedLanguage;
  isLowLiteracy: boolean;
  onOpenChatbot?: () => void;
}

export const QuestionFlow: React.FC<QuestionFlowProps> = ({
  userProfile,
  onUpdateProfile,
  onComplete,
  lang,
  isLowLiteracy,
  onOpenChatbot,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [voiceRecognitionSupported, setVoiceRecognitionSupported] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState<string | null>(null);
  const [stateSearch, setStateSearch] = useState('');
  const [stateFilter, setStateFilter] = useState<'all' | 'state' | 'ut'>('all');

  const t = TRANSLATIONS[lang];
  const currentQuestion = QUESTIONS[currentIndex];
  const currentValue = (userProfile as Record<string, any>)[currentQuestion.field];

  // Dynamically resolve options and help text tailored to the user's selected state
  const activeOptions =
    currentQuestion.field === 'rationCardStatus'
      ? getRationCardOptionsForState(userProfile.state)
      : currentQuestion.options;

  const activeHelpText =
    currentQuestion.field === 'rationCardStatus'
      ? getRationCardHelpTextForState(userProfile.state)
      : currentQuestion.helpText;

  // Check speech synthesis & recognition availability
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) setSpeechSupported(true);
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) setVoiceRecognitionSupported(true);
    }
  }, []);

  // Text-to-speech handler
  const handleReadAloud = () => {
    if (!speechSupported || typeof window === 'undefined') return;
    window.speechSynthesis.cancel();

    const titleText = currentQuestion.title[lang] || currentQuestion.title.en;
    const optionsText = activeOptions
      .map((opt, i) => `${i + 1}: ${opt.label[lang] || opt.label.en}`)
      .join('. ');

    const fullUtterance = `${titleText}. Options: ${optionsText}`;
    const utterance = new SpeechSynthesisUtterance(fullUtterance);

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

    utterance.lang = localeMap[lang] || 'en-IN';
    window.speechSynthesis.speak(utterance);
  };

  // Voice speech-to-text recognition handler
  const handleVoiceRecognition = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
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
      recognition.lang = localeMap[lang] || 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceFeedback(t.listening);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        setVoiceFeedback(`"${transcript}"`);

        // Fuzzy match against active state-tailored option keywords
        let matchedOption: QuestionOption | null = null;
        for (const opt of activeOptions) {
          const keywords = [
            ...(opt.voiceKeywords[lang] || []),
            ...(opt.voiceKeywords.en || []),
            opt.label[lang]?.toLowerCase(),
            opt.label.en?.toLowerCase(),
          ];
          if (keywords.some((kw) => kw && transcript.includes(kw.toLowerCase()))) {
            matchedOption = opt;
            break;
          }
        }


        if (matchedOption) {
          onUpdateProfile(currentQuestion.field, matchedOption.value);
          setTimeout(() => {
            handleNext();
          }, 800);
        } else {
          setVoiceFeedback(`Could not match "${transcript}". Please tap an option below.`);
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        setVoiceFeedback(null);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleSelectOption = (value: string) => {
    onUpdateProfile(currentQuestion.field, value);
    // Auto advance on selection for low friction
    setTimeout(() => {
      handleNext();
    }, 250);
  };

  const handleNext = () => {
    setStateSearch('');
    setStateFilter('all');
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setVoiceFeedback(null);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    setStateSearch('');
    setStateFilter('all');
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setVoiceFeedback(null);
    }
  };

  const handleSkip = () => {
    // Save as undefined or prefer_not_to_say
    onUpdateProfile(currentQuestion.field, 'prefer_not_to_say');
    handleNext();
  };

  // Helper to dynamically render Lucide icons
  const renderIcon = (name: string, className = 'w-6 h-6') => {
    const IconComponent = (Icons as any)[name] || Icons.Circle;
    return <IconComponent className={className} />;
  };

  const progressPercent = Math.round(((currentIndex + 1) / QUESTIONS.length) * 100);

  // Filter options for state question or return full set
  const displayedOptions = activeOptions.filter((option) => {
    if (currentQuestion.field !== 'state') return true;

    // Filter by type: State vs UT
    if (stateFilter === 'state') {
      const isUT = option.description?.en?.startsWith('UT');
      if (isUT && option.value !== 'Other State') return false;
    } else if (stateFilter === 'ut') {
      const isUT = option.description?.en?.startsWith('UT');
      if (!isUT && option.value !== 'Other State') return false;
    }

    // Filter by search query
    if (stateSearch.trim()) {
      const q = stateSearch.toLowerCase().trim();
      const matchLabel =
        option.label.en.toLowerCase().includes(q) ||
        (option.label[lang] || '').toLowerCase().includes(q) ||
        (option.description?.en || '').toLowerCase().includes(q);
      const matchVoice =
        (option.voiceKeywords?.en || []).some((kw) => kw.toLowerCase().includes(q)) ||
        (option.voiceKeywords?.[lang] || []).some((kw) => kw.toLowerCase().includes(q));
      return matchLabel || matchVoice;
    }

    return true;
  });

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 sm:py-10">
      {/* AI Benefit Recommendation Engine Header Banner */}
      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-blue-500/10 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                AI-Powered Benefit Recommendation Engine
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-300 dark:border-emerald-700">
                Deterministic 35+ Schemes Match
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
              Enter your basic details (State, Age, Occupation, Income, Category) to instantly receive your personalized list of eligible public welfare benefits.
            </p>
          </div>
        </div>

        {onOpenChatbot && (
          <button
            onClick={onOpenChatbot}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold border border-stone-200 dark:border-stone-700 shrink-0 transition-colors shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
            <span>Chat with AI Guide instead</span>
          </button>
        )}
      </div>

      {/* Progress Strip */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-semibold text-stone-500 dark:text-stone-400 mb-2">
          <span>
            {t.questionProgress
              .replace('{current}', String(currentIndex + 1))
              .replace('{total}', String(QUESTIONS.length))}
          </span>
          <span className="font-mono tabular-nums">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-stone-900 dark:bg-stone-100 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-10 border border-stone-200 dark:border-stone-800 shadow-xs">
        {/* Card Header with Question & Accessibility Speech Buttons */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-white text-balance leading-snug">
              {currentQuestion.title[lang] || currentQuestion.title.en}
            </h1>

            {/* Read aloud & Mic triggers */}
            <div className="flex items-center gap-2 shrink-0">
              {speechSupported && (
                <button
                  onClick={handleReadAloud}
                  title={t.readAloud}
                  aria-label={t.readAloud}
                  className="p-2.5 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-stone-900"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              )}

              {voiceRecognitionSupported && (
                <button
                  onClick={handleVoiceRecognition}
                  title={isListening ? t.stopVoice : t.speakToAnswer}
                  aria-label={isListening ? t.stopVoice : t.speakToAnswer}
                  className={`p-2.5 rounded-xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-stone-900 ${
                    isListening
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
              )}
            </div>
          </div>

          {activeHelpText && (
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-2 leading-relaxed">
              {activeHelpText[lang] || activeHelpText.en}
            </p>
          )}

          {voiceFeedback && (
            <div className="mt-3 py-2 px-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs font-medium text-amber-900 dark:text-amber-200 flex items-center gap-2">
              <Mic className="w-4 h-4 shrink-0 text-amber-600" />
              <span>{voiceFeedback}</span>
            </div>
          )}
        </div>

        {/* Ration Card State Customization Notice & Quick State Switcher */}
        {currentQuestion.field === 'rationCardStatus' && (
          <div className="mb-5 p-3.5 bg-stone-50/90 dark:bg-stone-800/60 rounded-2xl border border-stone-200 dark:border-stone-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-sm shrink-0">
                {userProfile.state && userProfile.state !== 'Other State' ? '✓' : 'ℹ'}
              </span>
              <div>
                <div className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <span>
                    {userProfile.state && userProfile.state !== 'Other State'
                      ? `Options tailored for: ${userProfile.state}`
                      : 'All-India NFSA standard options'}
                  </span>
                  {hasCustomStateRationCards(userProfile.state) && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                      State PDS Rules
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400">
                  {userProfile.state && userProfile.state !== 'Other State'
                    ? `Showing local card colors, vernacular terms, and quotas in ${userProfile.state}.`
                    : 'Choose your state to see local card colors and department rules.'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <label htmlFor="ration-state-select" className="text-xs font-medium text-stone-500">
                State:
              </label>
              <select
                id="ration-state-select"
                value={userProfile.state || ''}
                onChange={(e) => onUpdateProfile('state', e.target.value)}
                className="text-xs py-1.5 px-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-800 dark:text-stone-200 focus:outline-hidden focus:ring-2 focus:ring-stone-900 min-h-[36px]"
              >
                <option value="">All-India (Standard NFSA)</option>
                {STATES_AND_UTS_DATA.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* State Selection Search & Category Filter Pills */}
        {currentQuestion.field === 'state' && (
          <div className="mb-5 space-y-3 bg-stone-50/80 dark:bg-stone-800/50 p-3.5 rounded-2xl border border-stone-200/80 dark:border-stone-700/60">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
              <input
                type="text"
                value={stateSearch}
                onChange={(e) => setStateSearch(e.target.value)}
                placeholder="Search state, capital, or UT (e.g., Karnataka, Delhi, UP, Bengal)..."
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-stone-900 dark:focus:ring-white min-h-[44px]"
              />
            </div>
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mr-1">Filter:</span>
              <button
                type="button"
                onClick={() => setStateFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all min-h-[32px] ${
                  stateFilter === 'all'
                    ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-xs'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-100'
                }`}
              >
                All States & UTs (37)
              </button>
              <button
                type="button"
                onClick={() => setStateFilter('state')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all min-h-[32px] ${
                  stateFilter === 'state'
                    ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-xs'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-100'
                }`}
              >
                States (28)
              </button>
              <button
                type="button"
                onClick={() => setStateFilter('ut')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all min-h-[32px] ${
                  stateFilter === 'ut'
                    ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-xs'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-100'
                }`}
              >
                Union Territories (8)
              </button>
            </div>
          </div>
        )}

        {/* Options Grid (Mobile-friendly >=44px touch targets) */}
        <div
          role="radiogroup"
          aria-label={currentQuestion.title.en}
          className={`grid gap-2.5 ${
            currentQuestion.field === 'state'
              ? 'grid-cols-1 sm:grid-cols-2 max-h-[440px] overflow-y-auto pr-1.5'
              : isLowLiteracy || activeOptions.length <= 4
              ? 'grid-cols-1 sm:grid-cols-2'
              : 'grid-cols-1'
          }`}
        >
          {displayedOptions.length === 0 && (
            <div className="col-span-full py-8 text-center text-sm text-stone-500 dark:text-stone-400">
              No matching State or UT found for "{stateSearch}". Try clearing search or choose "Other State / UT".
            </div>
          )}
          {displayedOptions.map((option) => {
            const isSelected = currentValue === option.value;

            return (
              <button
                key={option.value}
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleSelectOption(option.value)}
                className={`group w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer min-h-[56px] flex items-center gap-4 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-stone-900 dark:focus-visible:ring-white ${
                  isSelected
                    ? 'border-stone-900 dark:border-stone-100 bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-sm'
                    : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 text-stone-900 dark:text-stone-100 hover:border-stone-400 dark:hover:border-stone-600'
                }`}
              >
                {/* Icon box */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-white/20 text-white dark:bg-stone-900/20 dark:text-stone-900'
                      : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 shadow-2xs'
                  }`}
                >
                  {renderIcon(option.iconName, isLowLiteracy ? 'w-7 h-7' : 'w-6 h-6')}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm sm:text-base leading-snug">
                    {option.label[lang] || option.label.en}
                  </div>
                  {option.description && !isLowLiteracy && (
                    <div
                      className={`text-xs mt-1 leading-normal ${
                        isSelected
                          ? 'text-stone-300 dark:text-stone-600'
                          : 'text-stone-500 dark:text-stone-400'
                      }`}
                    >
                      {option.description[lang] || option.description.en}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Navigation Bar */}
        <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3">
          {/* Back Button */}
          <button
            onClick={handleBack}
            disabled={currentIndex === 0}
            className={`px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors min-h-[44px] ${
              currentIndex === 0
                ? 'opacity-0 pointer-events-none'
                : 'text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{t.back}</span>
          </button>

          {/* Right Action: Skip or Next / See Results */}
          <div className="flex items-center gap-2">
            {currentQuestion.isOptional && (
              <button
                onClick={handleSkip}
                className="px-4 py-3 rounded-xl text-xs sm:text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors min-h-[44px] flex items-center gap-1.5"
              >
                <span>{t.skip}</span>
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white transition-colors flex items-center gap-2 min-h-[44px]"
            >
              <span>{currentIndex === QUESTIONS.length - 1 ? t.seeResults : t.next}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
