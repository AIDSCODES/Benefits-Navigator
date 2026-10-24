/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { Volume2, Mic, MicOff, ArrowRight, ArrowLeft, SkipForward } from 'lucide-react';
import { UserProfile, SupportedLanguage } from '../lib/engine/types.ts';
import { QUESTIONS, QuestionOption } from '../data/questions.ts';
import { TRANSLATIONS } from '../lib/i18n/translations.ts';

interface QuestionFlowProps {
  userProfile: UserProfile;
  onUpdateProfile: (field: keyof UserProfile, value: any) => void;
  onComplete: () => void;
  lang: SupportedLanguage;
  isLowLiteracy: boolean;
}

export const QuestionFlow: React.FC<QuestionFlowProps> = ({
  userProfile,
  onUpdateProfile,
  onComplete,
  lang,
  isLowLiteracy,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [voiceRecognitionSupported, setVoiceRecognitionSupported] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState<string | null>(null);

  const t = TRANSLATIONS[lang];
  const currentQuestion = QUESTIONS[currentIndex];
  const currentValue = (userProfile as Record<string, any>)[currentQuestion.field];

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
    const optionsText = currentQuestion.options
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

        // Fuzzy match against option keywords
        let matchedOption: QuestionOption | null = null;
        for (const opt of currentQuestion.options) {
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
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setVoiceFeedback(null);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
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

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 sm:py-10">
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

          {currentQuestion.helpText && (
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-2 leading-relaxed">
              {currentQuestion.helpText[lang] || currentQuestion.helpText.en}
            </p>
          )}

          {voiceFeedback && (
            <div className="mt-3 py-2 px-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs font-medium text-amber-900 dark:text-amber-200 flex items-center gap-2">
              <Mic className="w-4 h-4 shrink-0 text-amber-600" />
              <span>{voiceFeedback}</span>
            </div>
          )}
        </div>

        {/* Options Grid (Mobile-friendly >=44px touch targets) */}
        <div
          role="radiogroup"
          aria-label={currentQuestion.title.en}
          className={`grid gap-3 ${
            isLowLiteracy || currentQuestion.options.length <= 4
              ? 'grid-cols-1 sm:grid-cols-2'
              : 'grid-cols-1'
          }`}
        >
          {currentQuestion.options.map((option) => {
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
