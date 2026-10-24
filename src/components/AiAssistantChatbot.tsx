/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Maximize2,
  Minimize2,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  User,
  ShieldCheck,
  Check,
  Info,
} from 'lucide-react';
import { SupportedLanguage } from '../lib/engine/types.ts';
import { TRANSLATIONS } from '../lib/i18n/translations.ts';

export type AiGuideCharacter = 'asha' | 'mitra';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: 'gemini-ai' | 'local-knowledge-engine';
  schemes?: { id: string; name: string; url: string }[];
}

interface AiAssistantChatbotProps {
  lang: SupportedLanguage;
  isOpen: boolean;
  onToggle: () => void;
  onOpenTutorVideo?: () => void;
  onNavigateTab?: (tab: string) => void;
}

const VOICE_LANG_MAP: Record<SupportedLanguage, string> = {
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

const INITIAL_GREETINGS: Record<SupportedLanguage, { asha: string; mitra: string }> = {
  en: {
    asha: 'Namaste! I am Asha, your AI public welfare guide. Ask me anything about government schemes, documents, or how to use this website!',
    mitra: 'Hello! I am Mitra, your smart welfare assistant. How can I help you find government benefits and checklists today?',
  },
  hi: {
    asha: 'नमस्ते! मैं आशा हूं, आपकी एआई जन-कल्याण मार्गदर्शक। सरकारी योजनाओं, जरूरी दस्तावेजों या इस वेबसाइट के बारे में कुछ भी पूछें!',
    mitra: 'नमस्कार! मैं मित्र हूं, आपका स्मार्ट सहायक। आज सरकारी लाभ खोजने में मैं आपकी क्या मदद कर सकता हूं?',
  },
  mr: {
    asha: 'नमस्कार! मी आशा, तुमची एआई योजना मार्गदर्शक. शासकीय योजना, कागदपत्रे किंवा या संकेतस्थळाबद्दल काहीही विचारा!',
    mitra: 'नमस्कार! मी मित्र, तुमचा स्मार्ट साहाय्यक. शासकीय योजना शोधण्यात मी कशी मदत करू?',
  },
  bn: {
    asha: 'নমস্কার! আমি আশা, আপনার এআই কল্যাণ গাইড। সরকারি প্রকল্প বা ওয়েবসাইট সম্পর্কে যেকোনো প্রশ্ন করুন!',
    mitra: 'হ্যালো! আমি মিত্র, আপনার সহকারী। সরকারি সুবিধা ও দরকারি কাগজ খুঁজতে আমি সাহায্য করছি!',
  },
  te: {
    asha: 'నమస్కారం! నేను ఆశా, మీ AI సంక్షేమ గైడ్. ప్రభుత్వ పథకాలు లేదా ఈ వెబ్‌సైట్ గురించి ఏదైనా అడగండి!',
    mitra: 'హలో! నేను మిత్ర. ప్రభుత్వ పథకాలు మరియు పత్రాల వివరాల కోసం నన్ను అడగండి!',
  },
  ta: {
    asha: 'வணக்கம்! நான் ஆஷா, உங்கள் AI வழிகாட்டி. அரசு நலத்திட்டங்கள் அல்லது தளம் குறித்து எதையும் கேளுங்கள்!',
    mitra: 'வணக்கம்! நான் மித்ரா, உங்கள் ஸ்மார்ட் உதவியாளர். நலத்திட்டங்களை கண்டறிய நான் உதவுகிறேன்!',
  },
  gu: {
    asha: 'નમસ્તે! હું આશા છું, તમારી AI માર્ગદર્શક. સરકારી યોજનાઓ કે દસ્તાવેજો વિશે કંઈ પણ પૂછો!',
    mitra: 'નમસ્તે! હું મિત્ર છું. સરકારી યોજનાઓ શોધવામાં હું તમને મદદ કરીશ!',
  },
  kn: {
    asha: 'ನಮಸ್ಕಾರ! ನಾನು ಆಶಾ, ನಿಮ್ಮ AI ಮಾರ್ಗದರ್ಶಿ. ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಅಥವಾ ದಾಖಲೆಗಳ ಬಗ್ಗೆ ಏನನ್ನಾದರೂ ಕೇಳಿ!',
    mitra: 'ಹಲೋ! ನಾನು ಮಿತ್ರ. ಸರ್ಕಾರಿ ಸೌಲಭ್ಯಗಳನ್ನು ಹುಡುಕಲು ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತೇನೆ!',
  },
  ml: {
    asha: 'നമസ്കാരം! ഞാൻ ആശ, നിങ്ങളുടെ AI ഗൈഡ്. സർക്കാർ പദ്ധതികളെക്കുറിച്ചോ വെബ്സൈറ്റിനെക്കുറിച്ചോ എന്തും ചോദിക്കാം!',
    mitra: 'ഹലോ! ഞാൻ മിത്ര. സർക്കാർ ആനുകൂല്യങ്ങളും രേഖകളും കണ്ടെത്താൻ ഞാൻ സഹായിക്കാം!',
  },
  pa: {
    asha: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਆਸ਼ਾ ਹਾਂ। ਸਰਕਾਰੀ ਸਕੀਮਾਂ, ਦਸਤਾਵੇਜ਼ਾਂ ਜਾਂ ਵੈੱਬਸਾਈਟ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ!',
    mitra: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਮਿੱਤਰਾ ਹਾਂ। ਸਰਕਾਰੀ ਲਾਭ ਲੱਭਣ ਵਿੱਚ ਮੈਂ ਤੁਹਾਡੀ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ!',
  },
  or: {
    asha: 'ନମସ୍କାର! ମୁଁ ଆଶା, ଆପଣଙ୍କ AI ମାର୍ଗଦର୍ଶକ। ସରକାରୀ ଯୋଜନା ବା ଦଲିଲ ବିଷୟରେ କିଛି ବି ପଚାରନ୍ତୁ!',
    mitra: 'ହେଲୋ! ମୁଁ ମିତ୍ର। ସରକାରୀ ସୁବିଧା ଖୋଜିବାରେ ମୁଁ ଆପଣଙ୍କୁ ସାହାଯ୍ୟ କରିବି!',
  },
};

const SUGGESTION_CHIPS = [
  { label: '🌾 Schemes for Farmers', query: 'What schemes are available for farmers and agriculture?' },
  { label: '🏥 Ayushman Bharat Healthcare', query: 'How does Ayushman Bharat ₹5 Lakh health cover work?' },
  { label: '📋 Required Documents', query: 'What documents are required to apply for welfare schemes?' },
  { label: '👩 Schemes for Women', query: 'What welfare schemes are available for women and mothers?' },
  { label: '💡 How to Use This Website', query: 'How do I use this website step-by-step to get my benefits checklist?' },
];

export const AiAssistantChatbot: React.FC<AiAssistantChatbotProps> = ({
  lang,
  isOpen,
  onToggle,
  onOpenTutorVideo,
  onNavigateTab,
}) => {
  const [character, setCharacter] = useState<AiGuideCharacter>('asha');
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome',
      sender: 'assistant',
      text: INITIAL_GREETINGS[lang]?.asha || INITIAL_GREETINGS.en.asha,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'local-knowledge-engine',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isVoiceMuted, setIsVoiceMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Update welcome greeting when language or character changes
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        const greeting =
          INITIAL_GREETINGS[lang]?.[character] || INITIAL_GREETINGS.en[character];
        return [
          {
            ...prev[0],
            text: greeting,
          },
        ];
      }
      return prev;
    });
  }, [lang, character]);

  // Play narration using SpeechSynthesis
  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis || isVoiceMuted) return;
    try {
      window.speechSynthesis.cancel();
      // Strip markdown symbols for natural reading
      const cleanText = text
        .replace(/[*_#`\[\]()]/g, '')
        .replace(/https?:\/\/\S+/g, '')
        .trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      const targetTag = VOICE_LANG_MAP[lang] || 'en-IN';
      utterance.lang = targetTag;
      utterance.rate = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const matched = voices.find(
        (v) => v.lang.toLowerCase() === targetTag.toLowerCase() || v.lang.startsWith(lang)
      );
      if (matched) utterance.voice = matched;

      window.speechSynthesis.speak(utterance);
    } catch {}
  };

  // Toggle speech-to-text input
  const toggleSpeechRecognition = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your question.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = VOICE_LANG_MAP[lang] || 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0]?.[0]?.transcript;
        if (transcript) {
          setInputText(transcript);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  // Send message to server
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isTyping) return;

    const userMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          character,
          lang,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.reply || "I'm sorry, I could not process that question. Please try asking again.";

      const botMessage: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source,
        schemes: data.schemes,
      };

      setMessages((prev) => [...prev, botMessage]);

      if (!isVoiceMuted) {
        speakText(replyText);
      }
    } catch (err: any) {
      const fallbackReply =
        lang === 'hi'
          ? 'माफ़ कीजिए, सर्वर से संपर्क नहीं हो पाया। कृपया अपना प्रश्न दोबारा पूछें या वीडियो गाइड देखें।'
          : 'I am here to help! For public welfare schemes like PM-Kisan and Ayushman Bharat, you can answer the 6 quick questions on the homepage to find your eligible benefits.';

      const errorMessage: ChatMessage = {
        id: 'bot-err-' + Date.now(),
        sender: 'assistant',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'local-knowledge-engine',
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearHistory = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    const greeting = INITIAL_GREETINGS[lang]?.[character] || INITIAL_GREETINGS.en[character];
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: greeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'local-knowledge-engine',
      },
    ]);
  };

  const isAsha = character === 'asha';

  return (
    <>
      {/* ── Floating Launcher Button (Bottom Right) ── */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-5 right-5 z-40 group flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-stone-950 font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 border border-amber-300 cursor-pointer min-h-[48px]"
          title="Open AI Assistant Chatbot"
          aria-label="Open AI Assistant Chatbot"
        >
          {/* Animated Avatar Thumbnail */}
          <div className="relative w-7 h-7 rounded-full bg-stone-900 border border-amber-300 flex items-center justify-center text-sm shadow-xs shrink-0 overflow-hidden">
            <span className="relative z-10">{isAsha ? '👩🏽' : '👨🏽'}</span>
            <span className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" />
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black tracking-wide text-stone-950">
                Ask AI Assistant
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <span className="text-[10px] font-semibold text-stone-900/80 -mt-0.5">
              {isAsha ? 'Asha (Welfare Guide)' : 'Mitra (Smart Assistant)'}
            </span>
          </div>

          <Sparkles className="w-4 h-4 text-stone-950 animate-pulse ml-1" />
        </button>
      )}

      {/* ── Chat Window (Modal / Drawer) ── */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ease-out flex flex-col bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 shadow-2xl rounded-3xl overflow-hidden ${
            isExpanded
              ? 'inset-3 sm:inset-6 max-w-4xl max-h-[92vh] m-auto'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh]'
          }`}
          role="dialog"
          aria-label="AI Welfare Assistant Chatbot"
        >
          {/* ── Top Bar ── */}
          <div className="px-4 py-3 bg-gradient-to-r from-stone-900 via-stone-900 to-stone-950 text-white border-b border-stone-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Character Avatar Icon */}
              <div className="relative w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-base shrink-0">
                <span>{isAsha ? '👩🏽' : '👨🏽'}</span>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-stone-900" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs sm:text-sm font-bold text-white truncate">
                    {isAsha ? 'Asha — AI Welfare Guide' : 'Mitra — AI Smart Assistant'}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-stone-400">
                  <span className="text-emerald-400 font-semibold">● Online</span>
                  <span>•</span>
                  <span>Public Welfare Advisor</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {/* Character Switcher Toggle */}
              <div className="flex items-center bg-stone-800 rounded-lg p-0.5 border border-stone-700 mr-1">
                <button
                  onClick={() => setCharacter('asha')}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all ${
                    isAsha
                      ? 'bg-amber-500 text-stone-950 shadow-xs'
                      : 'text-stone-400 hover:text-white'
                  }`}
                  title="Switch to Asha (Welfare Guide)"
                >
                  👩🏽 Asha
                </button>
                <button
                  onClick={() => setCharacter('mitra')}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all ${
                    !isAsha
                      ? 'bg-teal-500 text-stone-950 shadow-xs'
                      : 'text-stone-400 hover:text-white'
                  }`}
                  title="Switch to Mitra (Smart Tech Assistant)"
                >
                  👨🏽 Mitra
                </button>
              </div>

              {/* Voice Mute Toggle */}
              <button
                onClick={() => setIsVoiceMuted(!isVoiceMuted)}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  isVoiceMuted
                    ? 'text-stone-400 hover:text-white hover:bg-stone-800'
                    : 'text-amber-400 hover:bg-stone-800'
                }`}
                title={isVoiceMuted ? 'Voice Narration Muted' : 'Voice Narration Enabled'}
              >
                {isVoiceMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* Expand Toggle */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="hidden sm:flex p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
                title={isExpanded ? 'Minimize' : 'Expand'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Close Button */}
              <button
                onClick={onToggle}
                className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
                title="Close Chat"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── Subtitle / Safety Notice Strip ── */}
          <div className="px-3.5 py-1.5 bg-amber-500/10 border-b border-amber-500/20 text-[11px] text-amber-900 dark:text-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Free, non-governmental decision aid. Never share OTPs or passwords.</span>
            </div>
            {onOpenTutorVideo && (
              <button
                onClick={onOpenTutorVideo}
                className="text-[10px] font-bold text-amber-600 dark:text-amber-400 underline hover:text-amber-700 ml-2 shrink-0"
              >
                Watch Video Guide
              </button>
            )}
          </div>

          {/* ── Chat Messages Body ── */}
          <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3 bg-stone-50/50 dark:bg-stone-950/40 text-xs sm:text-sm">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[85%] ${
                      isUser ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {/* Small Avatar Icon */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                        isUser
                          ? 'bg-amber-500 text-stone-950'
                          : 'bg-stone-900 border border-stone-700 text-white'
                      }`}
                    >
                      {isUser ? <User className="w-3 h-3" /> : isAsha ? '👩🏽' : '👨🏽'}
                    </div>

                    {/* Speech Bubble */}
                    <div
                      className={`p-3 rounded-2xl leading-relaxed whitespace-pre-wrap break-words ${
                        isUser
                          ? 'bg-amber-500 text-stone-950 font-medium rounded-tr-xs shadow-xs'
                          : 'bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-800 rounded-tl-xs shadow-xs'
                      }`}
                    >
                      {msg.text}

                      {/* Optional matched scheme links */}
                      {msg.schemes && msg.schemes.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-stone-200 dark:border-stone-800 space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                            Direct Government Links:
                          </span>
                          {msg.schemes.map((s) => (
                            <a
                              key={s.id}
                              href={s.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-amber-700 dark:text-amber-400 text-[11px] font-semibold hover:underline mr-1 mb-1"
                            >
                              <span>{s.name}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message Meta Info: Timestamp & Read Aloud button */}
                  <div
                    className={`flex items-center gap-2 text-[10px] text-stone-400 px-8 ${
                      isUser ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => speakText(msg.text)}
                        className="hover:text-amber-500 transition-colors flex items-center gap-0.5"
                        title="Listen to response"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Read</span>
                      </button>
                    )}
                    {msg.source && (
                      <span className="text-[9px] uppercase tracking-wider opacity-60">
                        {msg.source === 'gemini-ai' ? '⚡ Gemini AI' : '✓ Verified Facts'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-stone-400 text-xs">
                <div className="w-6 h-6 rounded-full bg-stone-900 border border-stone-700 flex items-center justify-center text-xs">
                  {isAsha ? '👩🏽' : '👨🏽'}
                </div>
                <div className="p-3 bg-white dark:bg-stone-900 rounded-2xl rounded-tl-xs border border-stone-200 dark:border-stone-800 flex items-center gap-1.5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-[11px] text-stone-500 ml-1">
                    {isAsha ? 'Asha is finding verified schemes...' : 'Mitra is analyzing rules...'}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Suggested Question Chips ── */}
          <div className="px-3 py-2 bg-stone-100 dark:bg-stone-900/90 border-t border-stone-200 dark:border-stone-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider shrink-0 mr-1">
              Suggestions:
            </span>
            {SUGGESTION_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip.query)}
                disabled={isTyping}
                className="px-2.5 py-1 rounded-full bg-white dark:bg-stone-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-stone-700 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-300 text-[11px] font-medium border border-stone-200 dark:border-stone-700 shrink-0 transition-colors"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* ── Input Bar ── */}
          <div className="p-3 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 flex items-center gap-2 shrink-0">
            {/* Clear Chat Button */}
            <button
              onClick={handleClearHistory}
              title="Reset conversation"
              className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Voice Input Microphone Button */}
            <button
              onClick={toggleSpeechRecognition}
              className={`p-2 rounded-xl transition-all ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'text-stone-500 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
              title={isListening ? 'Listening... click to stop' : 'Speak with microphone'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder={`Ask ${isAsha ? 'Asha' : 'Mitra'} about schemes, documents, or website...`}
              disabled={isTyping}
              className="flex-1 bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-900 dark:text-white placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50"
            />

            {/* Send Button */}
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isTyping}
              className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-stone-950 font-bold transition-all shadow-xs cursor-pointer min-w-[38px] flex items-center justify-center"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
