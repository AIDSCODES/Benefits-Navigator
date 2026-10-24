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
  CheckCircle2,
  ArrowRight,
  Award,
  MapPin,
  Briefcase,
  Calendar,
  Wallet,
  Users,
  Zap,
} from 'lucide-react';
import { UserProfile, SupportedLanguage, Scheme } from '../lib/engine/types.ts';
import { SCHEMES } from '../data/schemes.ts';
import { evaluateAllSchemes } from '../lib/engine/evaluator.ts';
import { TRANSLATIONS } from '../lib/i18n/translations.ts';

export type AiGuideCharacter = 'dhanu' | 'vedu' | 'asha' | 'mitra';

export interface SchemeRecommendationItem {
  id: string;
  name: string;
  category: string;
  benefitType?: string;
  officialUrl: string;
  shortSummary?: string;
}

export interface RecommendationCardData {
  profile: Partial<UserProfile>;
  matchedSchemes: SchemeRecommendationItem[];
  totalEligible: number;
}

export interface InteractiveRecommendationStep {
  step: 'state' | 'occupation' | 'age' | 'income' | 'category';
  prompt: string;
  options: { label: string; value: string; icon?: string }[];
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: 'gemini-ai' | 'local-knowledge-engine' | 'ai-recommendation-engine';
  schemes?: { id: string; name: string; url: string }[];
  recommendation?: RecommendationCardData;
  interactiveStep?: InteractiveRecommendationStep;
}

interface AiAssistantChatbotProps {
  lang: SupportedLanguage;
  isOpen: boolean;
  onToggle: () => void;
  onOpenTutorVideo?: () => void;
  onNavigateTab?: (tab: string) => void;
  onApplyProfile?: (profile: Partial<UserProfile>) => void;
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

const INITIAL_GREETINGS: Record<SupportedLanguage, Record<AiGuideCharacter, string>> = {
  en: {
    dhanu: 'Namaste! I am Dhanu, your AI public welfare guide. Ask me about government schemes, documents, or click "✨ AI Recommendation Engine" to find all benefits you qualify for!',
    vedu: 'Hello! I am Vedu, your smart welfare assistant. Tell me your details or click "✨ AI Recommendation Engine" to instantly match 35+ verified government schemes!',
    asha: 'Namaste! I am Dhanu, your AI public welfare guide. Ask me about government schemes, documents, or click "✨ AI Recommendation Engine" to find all benefits you qualify for!',
    mitra: 'Hello! I am Vedu, your smart welfare assistant. Tell me your details or click "✨ AI Recommendation Engine" to instantly match 35+ verified government schemes!',
  },
  hi: {
    dhanu: 'नमस्ते! मैं धनू हूं, आपकी एआई जन-कल्याण मार्गदर्शक। योजनाओं या दस्तावेजों के बारे में पूछें, या अपनी पात्रता जांचने के लिए "✨ एआई सिफारिश इंजन" पर क्लिक करें!',
    vedu: 'नमस्कार! मैं वेदू हूं, आपका स्मार्ट सहायक। अपनी पात्रता तुरंत जानने के लिए अपनी उम्र, राज्य व पेशा बताएं या "✨ एआई सिफारिश इंजन" शुरू करें!',
    asha: 'नमस्ते! मैं धनू हूं, आपकी एआई जन-कल्याण मार्गदर्शक। योजनाओं या दस्तावेजों के बारे में पूछें, या अपनी पात्रता जांचने के लिए "✨ एआई सिफारिश इंजन" पर क्लिक करें!',
    mitra: 'नमस्कार! मैं वेदू हूं, आपका स्मार्ट सहायक। अपनी पात्रता तुरंत जानने के लिए अपनी उम्र, राज्य व पेशा बताएं या "✨ एआई सिफारिश इंजन" शुरू करें!',
  },
  mr: {
    dhanu: 'नमस्कार! मी धनू, तुमची एआई योजना मार्गदर्शक. शासकीय योजना किंवा कागदपत्रांबद्दल विचारा, किंवा आपल्यासाठी पात्र योजना शोधण्यासाठी "✨ एआई शिफारस इंजिन" वापरा!',
    vedu: 'नमस्कार! मी वेदू, तुमचा स्मार्ट साहाय्यक. शासकीय योजनांची पात्रता तत्काळ जाणून घेण्यासाठी आपली माहिती सांगा किंवा "✨ एआई शिफारस इंजिन" वर क्लिक करा!',
    asha: 'नमस्कार! मी धनू, तुमची एआई योजना मार्गदर्शक. शासकीय योजना किंवा कागदपत्रांबद्दल विचारा, किंवा आपल्यासाठी पात्र योजना शोधण्यासाठी "✨ एआई शिफारस इंजिन" वापरा!',
    mitra: 'नमस्कार! मी वेदू, तुमचा स्मार्ट साहाय्यक. शासकीय योजनांची पात्रता तत्काळ जाणून घेण्यासाठी आपली माहिती सांगा किंवा "✨ एआई शिफारस इंजिन" वर क्लिक करा!',
  },
  bn: {
    dhanu: 'নমস্কার! আমি ধনু, আপনার এআই কল্যাণ গাইড। সরকারি প্রকল্প সম্পর্কে জানুন বা "✨ এআই সুপারিশ ইঞ্জিন" ব্যবহার করুন!',
    vedu: 'হ্যালো! আমি বেদূ। সরকারি সুবিধার যোগ্যতা খুঁজতে আপনার তথ্য বলুন বা "✨ এআই সুপারিশ ইঞ্জিন" চাপুন!',
    asha: 'নমস্কার! আমি ধনু, আপনার এআই কল্যাণ গাইড। সরকারি প্রকল্প সম্পর্কে জানুন বা "✨ এআই সুপারিশ ইঞ্জিন" ব্যবহার করুন!',
    mitra: 'হ্যালো! আমি বেদূ। সরকারি সুবিধার যোগ্যতা খুঁজতে আপনার তথ্য বলুন বা "✨ এআই সুপারিশ ইঞ্জিন" চাপুন!',
  },
  te: {
    dhanu: 'నమస్కారం! నేను ధను. సంక్షేమ పథకాల వివరాల కోసం అడగండి లేదా "✨ AI సిఫార్సు ఇంజిన్" ఉపయోగించండి!',
    vedu: 'హలో! నేను వేదు. అర్హత గల పథకాలను తక్షణమే కనుగొనడానికి "✨ AI సిఫార్సు ఇంజిన్" ప్రారంభించండి!',
    asha: 'నమస్కారం! నేను ధను. సంక్షేమ పథకాల వివరాల కోసం అడగండి లేదా "✨ AI సిఫార్సు ఇంజిన్" ఉపయోగించండి!',
    mitra: 'హలో! నేను వేదు. అర్హత గల పథకాలను తక్షణమే కనుగొనడానికి "✨ AI సిఫార్సు ఇంజిన్" ప్రారంభించండి!',
  },
  ta: {
    dhanu: 'வணக்கம்! நான் தனு. அரசு நலத்திட்டங்கள் அறிய அல்லது "✨ AI பரிந்துரை என்ஜின்" மூலம் தகுதி பெற கேளுங்கள்!',
    vedu: 'வணக்கம்! நான் வேது. உங்களுக்கான அரசு நலத்திட்டங்களை உடனடியாக அறிய "✨ AI பரிந்துரை என்ஜின்" கிளிக் செய்யவும்!',
    asha: 'வணக்கம்! நான் தனு. அரசு நலத்திட்டங்கள் அறிய அல்லது "✨ AI பரிந்துரை என்ஜின்" மூலம் தகுதி பெற கேளுங்கள்!',
    mitra: 'வணக்கம்! நான் வேது. உங்களுக்கான அரசு நலத்திட்டங்களை உடனடியாக அறிய "✨ AI பரிந்துரை என்ஜின்" கிளிக் செய்யவும்!',
  },
  gu: {
    dhanu: 'નમસ્તે! હું ધનુ છું. સરકારી યોજનાઓ માટે પૂછો અથવા "✨ AI ભલામણ એન્જિન" પર ક્લિક કરો!',
    vedu: 'નમસ્તે! હું વેદુ છું. તમારી પાત્ર યોજનાઓ શોધવા "✨ AI ભલામણ એન્જિન" નો ઉપયોગ કરો!',
    asha: 'નમસ્તે! હું ધનુ છું. સરકારી યોજનાઓ માટે પૂછો અથવા "✨ AI ભલામણ એન્જિન" પર ક્લિક કરો!',
    mitra: 'નમસ્તે! હું વેદુ છું. તમારી પાત્ર યોજનાઓ શોધવા "✨ AI ભલામણ એન્જિન" નો ઉપયોગ કરો!',
  },
  kn: {
    dhanu: 'ನಮಸ್ಕಾರ! ನಾನು ಧನು. ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ ಅಥವಾ "✨ AI ಶಿಫಾರಸು ಎಂಜಿನ್" ಪ್ರಾರಂಭಿಸಿ!',
    vedu: 'ಹಲೋ! ನಾನು ವೇದು. ನಿಮ್ಮ ಅರ್ಹ ಯೋಜನೆಗಳನ್ನು ತಕ್ಷಣವೇ ತಿಳಿಯಲು "✨ AI ಶಿಫಾರಸು ಎಂಜಿನ್" ಬಳಸಿ!',
    asha: 'ನಮಸ್ಕಾರ! ನಾನು ಧನು. ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ ಅಥವಾ "✨ AI ಶಿಫಾರಸು ಎಂಜಿನ್" ಪ್ರಾರಂಭಿಸಿ!',
    mitra: 'ಹಲೋ! ನಾನು ವೇದು. ನಿಮ್ಮ ಅರ್ಹ ಯೋಜನೆಗಳನ್ನು ತಕ್ಷಣವೇ ತಿಳಿಯಲು "✨ AI ಶಿಫಾರಸು ಎಂಜಿನ್" ಬಳಸಿ!',
  },
  ml: {
    dhanu: 'നമസ്കാരം! ഞാൻ ധനു. പദ്ധതികളെക്കുറിച്ചോ "✨ AI ശുപാർശ എഞ്ചിൻ" വഴിയോ ചോദിക്കാം!',
    vedu: 'ഹലോ! ഞാൻ വേദു. അർഹമായ പദ്ധതികൾ ഉടൻ കണ്ടെത്താൻ "✨ AI ശുപാർശ എഞ്ചിൻ" ഉപയോഗിക്കുക!',
    asha: 'നമസ്കാരം! ഞാൻ ധനു. പദ്ധതികളെക്കുറിച്ചോ "✨ AI ശുപാർശ എഞ്ചിൻ" വഴിയോ ചോദിക്കാം!',
    mitra: 'ഹലോ! ഞാൻ വേദു. അർഹമായ പദ്ധതികൾ ഉടൻ കണ്ടെത്താൻ "✨ AI ശുപാർശ എഞ്ചിൻ" ഉപയോഗിക്കുക!',
  },
  pa: {
    dhanu: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਧਨੂੰ ਹਾਂ। ਸਕੀਮਾਂ ਬਾਰੇ ਪੁੱਛੋ ਜਾਂ "✨ AI ਸਿਫ਼ਾਰਸ਼ ਇੰਜਣ" ਸ਼ੁਰੂ ਕਰੋ!',
    vedu: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਵੇਦੂ ਹਾਂ। ਆਪਣੀ ਯੋਗਤਾ ਜਾਣਨ ਲਈ "✨ AI ਸਿਫ਼ਾਰਸ਼ ਇੰਜਣ" ਵਰਤੋ!',
    asha: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਧਨੂੰ ਹਾਂ। ਸਕੀਮਾਂ ਬਾਰੇ ਪੁੱਛੋ ਜਾਂ "✨ AI ਸਿਫ਼ਾਰਸ਼ ਇੰਜਣ" ਸ਼ੁਰੂ ਕਰੋ!',
    mitra: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਵੇਦੂ ਹਾਂ। ਆਪਣੀ ਯੋਗਤਾ ਜਾਣਨ ਲਈ "✨ AI ਸਿਫ਼ਾਰਸ਼ ਇੰਜਣ" ਵਰਤੋ!',
  },
  or: {
    dhanu: 'ନମସ୍କାର! ମୁଁ ଧନୁ। ଯୋଜନା ବିଷୟରେ ପଚାରନ୍ତୁ କିମ୍ବା "✨ AI ସୁପାରିଶ ଇଞ୍ଜିନ" ବ୍ୟବହାର କରନ୍ତୁ!',
    vedu: 'ହେଲୋ! ମୁଁ ବେଦୁ। ଯୋଗ୍ୟ ଯୋଜନା ତୁରନ୍ତ ପାଇବା ପାଇଁ "✨ AI ସୁପାରିଶ ଇଞ୍ଜିନ" ଆରମ୍ଭ କରନ୍ତୁ!',
    asha: 'ନମସ୍କାର! ମୁଁ ଧନୁ। ଯୋଜନା ବିଷୟରେ ପଚାରନ୍ତୁ କିମ୍ବା "✨ AI ସୁପାରିଶ ଇଞ୍ଜିନ" ବ୍ୟବହାର କରନ୍ତୁ!',
    mitra: 'ହେଲୋ! ମୁଁ ବେଦୁ। ଯୋଗ୍ୟ ଯୋଜନା ତୁରନ୍ତ ପାଇବା ପାଇଁ "✨ AI ସୁପାରିଶ ଇଞ୍ଜିନ" ଆରମ୍ଭ କରନ୍ତୁ!',
  },
};

const SUGGESTION_CHIPS = [
  { label: '✨ AI Benefit Recommendation Engine', query: 'recommend-schemes-wizard' },
  { label: '🌾 Schemes for Farmers', query: 'What schemes are available for farmers and agriculture?' },
  { label: '🎓 Schemes for Students', query: 'What scholarships and student benefits can I get?' },
  { label: '👵 Senior Citizen Pensions', query: 'What welfare schemes and pensions are available for senior citizens?' },
  { label: '🏥 Ayushman Bharat Healthcare', query: 'How does Ayushman Bharat ₹5 Lakh health cover work?' },
  { label: '📋 Required Documents', query: 'What documents are required to apply for welfare schemes?' },
  { label: '👩 Schemes for Women & SHG', query: 'What welfare schemes are available for women, SHGs and mothers?' },
];

/**
 * Natural Language Profile Extractor
 * Parses age, state, occupation, income, category from conversational input
 */
export function extractProfileFromNaturalLanguage(text: string): Partial<UserProfile> {
  const lower = text.toLowerCase();
  const profile: Partial<UserProfile> = {};

  // 1. State extraction
  const STATES = [
    'andhra pradesh', 'arunachal pradesh', 'assam', 'bihar', 'chhattisgarh', 'goa',
    'gujarat', 'haryana', 'himachal pradesh', 'jharkhand', 'karnataka', 'kerala',
    'madhya pradesh', 'maharashtra', 'manipur', 'meghalaya', 'mizoram', 'nagaland',
    'odisha', 'punjab', 'rajasthan', 'sikkim', 'tamil nadu', 'telangana', 'tripura',
    'uttar pradesh', 'uttarakhand', 'west bengal', 'delhi', 'jammu and kashmir',
    'ladakh', 'puducherry', 'chandigarh'
  ];
  for (const s of STATES) {
    if (lower.includes(s)) {
      profile.state = s.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      break;
    }
  }
  if (!profile.state) {
    if (/\bup\b/i.test(lower) && !lower.includes('cup') && !lower.includes('setup')) profile.state = 'Uttar Pradesh';
    else if (/\bmp\b/i.test(lower) && !lower.includes('temp')) profile.state = 'Madhya Pradesh';
    else if (/\bmh\b/i.test(lower) || lower.includes('maharastra')) profile.state = 'Maharashtra';
  }

  // 2. Occupation extraction
  if (lower.includes('farmer') || lower.includes('kisan') || lower.includes('krishi') || lower.includes('agriculture') || lower.includes('खेती') || lower.includes('किसान') || lower.includes('शेतकरी')) {
    profile.occupation = 'farmer';
  } else if (lower.includes('student') || lower.includes('college') || lower.includes('school') || lower.includes('study') || lower.includes('छात्र') || lower.includes('विद्यार्थी')) {
    profile.occupation = 'student';
  } else if (lower.includes('senior citizen') || lower.includes('elderly') || lower.includes('pensioner') || lower.includes('बुजुर्ग') || lower.includes('ज्येष्ठ नागरिक')) {
    profile.occupation = 'unemployed';
    profile.ageBand = '60_plus';
  } else if (lower.includes('vendor') || lower.includes('thela') || lower.includes('street vendor') || lower.includes('फेरीवाला') || lower.includes('रेहड़ी')) {
    profile.occupation = 'street_vendor';
  } else if (lower.includes('daily wage') || lower.includes('labour') || lower.includes('labor') || lower.includes('mazdoor') || lower.includes('मजदूर') || lower.includes('मजूर')) {
    profile.occupation = 'daily_wage';
  } else if (lower.includes('homemaker') || lower.includes('housewife') || lower.includes('गृहिणी')) {
    profile.occupation = 'homemaker';
    profile.gender = 'female';
  } else if (lower.includes('salaried') || lower.includes('employee') || lower.includes('job') || lower.includes('नौकरी')) {
    profile.occupation = 'salaried';
  }

  // 3. Age extraction
  const ageMatch = text.match(/\b([1-9][0-9]?)\s*(?:years?|yrs?|वर्ष|साल|वय)?\s*(?:old|age)?\b/i);
  if (ageMatch && ageMatch[1]) {
    const ageNum = parseInt(ageMatch[1], 10);
    if (ageNum < 18) profile.ageBand = '0_17';
    else if (ageNum <= 35) profile.ageBand = '18_35';
    else if (ageNum <= 50) profile.ageBand = '36_50';
    else if (ageNum <= 59) profile.ageBand = '51_59';
    else profile.ageBand = '60_plus';
  }

  // 4. Income extraction
  if (lower.includes('below 1 lakh') || lower.includes('below 1l') || lower.includes('< 1') || lower.includes('50000') || lower.includes('60000') || lower.includes('70000') || lower.includes('80000') || lower.includes('90000') || lower.includes('गरीब') || lower.includes('bpl')) {
    profile.incomeBand = 'below_1lakh';
  } else if (lower.includes('1.5 lakh') || lower.includes('2 lakh') || lower.includes('1 lakh') || lower.includes('1lakh') || lower.includes('1-2.5') || lower.includes('1.5l') || lower.includes('2l')) {
    profile.incomeBand = '1lakh_2_5lakh';
  } else if (lower.includes('3 lakh') || lower.includes('4 lakh') || lower.includes('2.5-5') || lower.includes('3l') || lower.includes('4l') || lower.includes('5 lakh')) {
    profile.incomeBand = '2_5lakh_5lakh';
  } else if (lower.includes('above 5 lakh') || lower.includes('6 lakh') || lower.includes('10 lakh') || lower.includes('> 5')) {
    profile.incomeBand = 'above_5lakh';
  }

  // 5. Social Category
  if (/\bsc\b/i.test(lower) || lower.includes('scheduled caste') || lower.includes('अनुसूचित जाति')) {
    profile.socialCategory = 'sc';
  } else if (/\bst\b/i.test(lower) || lower.includes('scheduled tribe') || lower.includes('अनुसूचित जनजाति')) {
    profile.socialCategory = 'st';
  } else if (/\bobc\b/i.test(lower) || lower.includes('other backward') || lower.includes('ओबीसी')) {
    profile.socialCategory = 'obc';
  } else if (lower.includes('general') || lower.includes('open') || lower.includes('सामान्य')) {
    profile.socialCategory = 'general';
  }

  return profile;
}

export const AiAssistantChatbot: React.FC<AiAssistantChatbotProps> = ({
  lang,
  isOpen,
  onToggle,
  onOpenTutorVideo,
  onNavigateTab,
  onApplyProfile,
}) => {
  const [character, setCharacter] = useState<AiGuideCharacter>('dhanu');
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome',
      sender: 'assistant',
      text: INITIAL_GREETINGS[lang]?.dhanu || INITIAL_GREETINGS.en.dhanu,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'local-knowledge-engine',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isVoiceMuted, setIsVoiceMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [wizardProfile, setWizardProfile] = useState<Partial<UserProfile>>({});

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

  /**
   * Generates a rich, personalized recommendation card message
   */
  const buildRecommendationMessage = (profile: Partial<UserProfile>): ChatMessage => {
    // Fill safe defaults for non-specified attributes so user gets maximum valid matches
    const effectiveProfile: UserProfile = {
      state: profile.state || 'Maharashtra',
      occupation: profile.occupation || 'farmer',
      ageBand: profile.ageBand || '18_35',
      incomeBand: profile.incomeBand || 'below_1lakh',
      socialCategory: profile.socialCategory || 'general',
      hasBankAcc: 'yes',
      rationCardStatus: profile.rationCardStatus || 'priority',
      ...profile,
    };

    const evalResult = evaluateAllSchemes(SCHEMES, effectiveProfile);
    const matchedItems: SchemeRecommendationItem[] = evalResult.likelyMatch.map((res) => ({
      id: res.scheme.id,
      name: res.scheme.name[lang] || res.scheme.name.en,
      category: res.scheme.category,
      benefitType: res.scheme.benefit_type?.[lang] || res.scheme.benefit_type?.en,
      officialUrl: res.scheme.official_url,
      shortSummary: res.scheme.short_summary?.[lang] || res.scheme.short_summary?.en,
    }));

    const stateDisplay = profile.state || 'All India';
    const occDisplay = profile.occupation
      ? profile.occupation.replace('_', ' ').toUpperCase()
      : 'CITIZEN';

    let summaryText = '';
    if (lang === 'hi') {
      summaryText = `🎉 बहुत बढ़िया! आपकी प्रोफ़ाइल (${stateDisplay} · ${occDisplay}) के लिए मैंने ${matchedItems.length} सरकारी योजनाओं की पुष्टि की है जिनके लिए आप तुरंत पात्र हैं:`;
    } else if (lang === 'mr') {
      summaryText = `🎉 छान! आपल्या माहितीनुसार (${stateDisplay} · ${occDisplay}), मला आपल्यासाठी पात्र असलेल्या ${matchedItems.length} शासकीय कल्याणकारी योजना मिळाल्या आहेत:`;
    } else {
      summaryText = `🎉 Excellent! Based on your profile (${stateDisplay} · ${occDisplay}), I found ${matchedItems.length} verified government welfare schemes you qualify for:`;
    }

    return {
      id: 'rec-' + Date.now(),
      sender: 'assistant',
      text: summaryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'ai-recommendation-engine',
      recommendation: {
        profile: effectiveProfile,
        matchedSchemes: matchedItems,
        totalEligible: matchedItems.length,
      },
    };
  };

  /**
   * Initiates the conversational AI Recommendation Wizard step-by-step
   */
  const startRecommendationWizard = () => {
    setWizardProfile({});
    const promptText =
      lang === 'hi'
        ? 'आइए आपके लिए सरकारी योजनाओं की पात्रता जांचते हैं! सबसे पहले, आप किस राज्य या केंद्र शासित प्रदेश में रहते हैं?'
        : lang === 'mr'
        ? 'चला आपल्यासाठी शासकीय योजनांची पात्रता तपासूया! प्रथम, आपले राज्य किंवा केंद्रशासित प्रदेश निवडा:'
        : "Let's find all public welfare schemes you qualify for! First, which State or Union Territory do you live in?";

    const stepMsg: ChatMessage = {
      id: 'step-state-' + Date.now(),
      sender: 'assistant',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'ai-recommendation-engine',
      interactiveStep: {
        step: 'state',
        prompt: promptText,
        options: [
          { label: 'Maharashtra', value: 'Maharashtra', icon: '📍' },
          { label: 'Uttar Pradesh', value: 'Uttar Pradesh', icon: '📍' },
          { label: 'Karnataka', value: 'Karnataka', icon: '📍' },
          { label: 'Delhi', value: 'Delhi', icon: '📍' },
          { label: 'Bihar', value: 'Bihar', icon: '📍' },
          { label: 'West Bengal', value: 'West Bengal', icon: '📍' },
          { label: 'Tamil Nadu', value: 'Tamil Nadu', icon: '📍' },
          { label: 'Rajasthan', value: 'Rajasthan', icon: '📍' },
          { label: 'Gujarat', value: 'Gujarat', icon: '📍' },
          { label: 'All India / Other', value: 'Other State', icon: '🇮🇳' },
        ],
      },
    };

    setMessages((prev) => [...prev, stepMsg]);
    speakText(promptText);
  };

  /**
   * Handles user clicking an interactive step chip
   */
  const handleSelectStepOption = (step: string, value: string, label: string) => {
    // 1. Append user response bubble
    const userMsg: ChatMessage = {
      id: 'usr-step-' + Date.now(),
      sender: 'user',
      text: label,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedProfile = { ...wizardProfile };

    if (step === 'state') {
      updatedProfile.state = value;
      setWizardProfile(updatedProfile);

      const nextPrompt =
        lang === 'hi'
          ? `बढ़िया, ${value}! आपका मुख्य पेशा या व्यवसाय क्या है?`
          : lang === 'mr'
          ? `उत्तम, ${value}! आपला मुख्य व्यवसाय किंवा भूमिका काय आहे?`
          : `Great, ${value}! What is your primary occupation or role?`;

      const nextMsg: ChatMessage = {
        id: 'step-occ-' + Date.now(),
        sender: 'assistant',
        text: nextPrompt,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'ai-recommendation-engine',
        interactiveStep: {
          step: 'occupation',
          prompt: nextPrompt,
          options: [
            { label: '🌾 Farmer / Agriculture', value: 'farmer' },
            { label: '🎓 Student / Youth', value: 'student' },
            { label: '👴 Senior Citizen (60+)', value: 'senior_citizen' },
            { label: '🔨 Daily Wage Worker', value: 'daily_wage' },
            { label: '🛒 Street Vendor / Small Biz', value: 'street_vendor' },
            { label: '💼 Salaried Employee', value: 'salaried' },
            { label: '🏠 Homemaker', value: 'homemaker' },
          ],
        },
      };

      setMessages((prev) => [...prev, userMsg, nextMsg]);
      speakText(nextPrompt);
      return;
    }

    if (step === 'occupation') {
      if (value === 'senior_citizen') {
        updatedProfile.occupation = 'unemployed';
        updatedProfile.ageBand = '60_plus';
      } else {
        updatedProfile.occupation = value as any;
      }
      setWizardProfile(updatedProfile);

      // If senior citizen selected, skip age question and go straight to income
      if (value === 'senior_citizen') {
        const incomePrompt =
          lang === 'hi'
            ? 'आपकी वार्षिक पारिवारिक आय (Annual Income) लगभग कितनी है?'
            : lang === 'mr'
            ? 'आपले वार्षिक कौटुंबिक उत्पन्न अंदाजे किती आहे?'
            : 'What is your approximate annual household income?';

        const nextMsg: ChatMessage = {
          id: 'step-inc-' + Date.now(),
          sender: 'assistant',
          text: incomePrompt,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          source: 'ai-recommendation-engine',
          interactiveStep: {
            step: 'income',
            prompt: incomePrompt,
            options: [
              { label: 'Below ₹1 Lakh / yr (BPL)', value: 'below_1lakh' },
              { label: '₹1 Lakh – ₹2.5 Lakh / yr', value: '1lakh_2_5lakh' },
              { label: '₹2.5 Lakh – ₹5 Lakh / yr', value: '2_5lakh_5lakh' },
              { label: 'Above ₹5 Lakh / yr', value: 'above_5lakh' },
            ],
          },
        };

        setMessages((prev) => [...prev, userMsg, nextMsg]);
        speakText(incomePrompt);
        return;
      }

      const agePrompt =
        lang === 'hi'
          ? 'आपका आयु वर्ग (Age Group) क्या है?'
          : lang === 'mr'
          ? 'आपला वयोगट निवडा:'
          : 'What is your age group?';

      const nextMsg: ChatMessage = {
        id: 'step-age-' + Date.now(),
        sender: 'assistant',
        text: agePrompt,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'ai-recommendation-engine',
        interactiveStep: {
          step: 'age',
          prompt: agePrompt,
          options: [
            { label: 'Under 18 Years (Minor)', value: '0_17' },
            { label: '18 – 35 Years (Youth)', value: '18_35' },
            { label: '36 – 50 Years', value: '36_50' },
            { label: '51 – 59 Years', value: '51_59' },
            { label: '60+ Years (Senior Citizen)', value: '60_plus' },
          ],
        },
      };

      setMessages((prev) => [...prev, userMsg, nextMsg]);
      speakText(agePrompt);
      return;
    }

    if (step === 'age') {
      updatedProfile.ageBand = value as any;
      setWizardProfile(updatedProfile);

      const incomePrompt =
        lang === 'hi'
          ? 'आपकी वार्षिक पारिवारिक आय (Annual Income) लगभग कितनी है?'
          : lang === 'mr'
          ? 'आपले वार्षिक कौटुंबिक उत्पन्न अंदाजे किती आहे?'
          : 'What is your approximate annual household income?';

      const nextMsg: ChatMessage = {
        id: 'step-inc-' + Date.now(),
        sender: 'assistant',
        text: incomePrompt,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'ai-recommendation-engine',
        interactiveStep: {
          step: 'income',
          prompt: incomePrompt,
          options: [
            { label: 'Below ₹1 Lakh / yr (BPL)', value: 'below_1lakh' },
            { label: '₹1 Lakh – ₹2.5 Lakh / yr', value: '1lakh_2_5lakh' },
            { label: '₹2.5 Lakh – ₹5 Lakh / yr', value: '2_5lakh_5lakh' },
            { label: 'Above ₹5 Lakh / yr', value: 'above_5lakh' },
          ],
        },
      };

      setMessages((prev) => [...prev, userMsg, nextMsg]);
      speakText(incomePrompt);
      return;
    }

    if (step === 'income') {
      updatedProfile.incomeBand = value as any;
      setWizardProfile(updatedProfile);

      const catPrompt =
        lang === 'hi'
          ? 'अंतिम प्रश्न: आपकी सामाजिक श्रेणी (Social Category) क्या है?'
          : lang === 'mr'
          ? 'शेवटचा प्रश्न: आपला सामाजिक प्रवर्ग कोणता आहे?'
          : 'Lastly: What is your social category?';

      const nextMsg: ChatMessage = {
        id: 'step-cat-' + Date.now(),
        sender: 'assistant',
        text: catPrompt,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'ai-recommendation-engine',
        interactiveStep: {
          step: 'category',
          prompt: catPrompt,
          options: [
            { label: 'General / Open', value: 'general' },
            { label: 'OBC (Other Backward Class)', value: 'obc' },
            { label: 'SC (Scheduled Caste)', value: 'sc' },
            { label: 'ST (Scheduled Tribe)', value: 'st' },
          ],
        },
      };

      setMessages((prev) => [...prev, userMsg, nextMsg]);
      speakText(catPrompt);
      return;
    }

    if (step === 'category') {
      updatedProfile.socialCategory = value as any;
      setWizardProfile(updatedProfile);

      // We have all 5 basic details! Generate instant recommendation card
      const recMsg = buildRecommendationMessage(updatedProfile);
      setMessages((prev) => [...prev, userMsg, recMsg]);
      speakText(recMsg.text);
      return;
    }
  };

  // Send message to server or handle local recommendation
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isTyping) return;

    // Check if user requested the recommendation wizard
    if (
      text === 'recommend-schemes-wizard' ||
      text.toLowerCase().includes('recommend') ||
      text.toLowerCase().includes('check my eligibility') ||
      text.toLowerCase().includes('find my benefits')
    ) {
      setInputText('');
      startRecommendationWizard();
      return;
    }

    // Check if the user typed complete profile details in natural language
    // e.g. "22 year old student in Karnataka with 1.5 lakh income" or "farmer in UP age 45"
    const parsed = extractProfileFromNaturalLanguage(text);
    const hasMultipleCriteria =
      (parsed.occupation && parsed.state) ||
      (parsed.occupation && parsed.ageBand) ||
      (parsed.occupation && parsed.incomeBand) ||
      (parsed.ageBand && parsed.state && parsed.incomeBand);

    const userMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    // If natural language contains strong profile criteria, instantly run Recommendation Engine!
    if (hasMultipleCriteria) {
      setIsTyping(true);
      setTimeout(() => {
        const recMsg = buildRecommendationMessage(parsed);
        setMessages((prev) => [...prev, recMsg]);
        setIsTyping(false);
        speakText(recMsg.text);
      }, 400);
      return;
    }

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
    } catch {
      const fallbackReply =
        lang === 'hi'
          ? 'माफ़ कीजिए, सर्वर से संपर्क नहीं हो पाया। लेकिन आप "✨ एआई सिफारिश इंजन" पर क्लिक करके अपनी पात्रता तुरंत देख सकते हैं!'
          : 'I am here to help! Click the "✨ AI Benefit Recommendation Engine" chip below to instantly calculate your eligible schemes.';

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
    setWizardProfile({});
  };

  const isDhanu = character === 'dhanu' || character === 'asha';
  const isAsha = isDhanu;

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
            <span className="relative z-10">{isDhanu ? '👩🏽' : '👨🏽'}</span>
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
              {isDhanu ? 'Dhanu (Welfare Guide)' : 'Vedu (Smart Assistant)'}
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
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[440px] h-[620px] max-h-[88vh]'
          }`}
          role="dialog"
          aria-label="AI Welfare Assistant Chatbot"
        >
          {/* ── Top Bar ── */}
          <div className="px-4 py-3 bg-gradient-to-r from-stone-900 via-stone-900 to-stone-950 text-white border-b border-stone-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Character Avatar Icon */}
              <div className="relative w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-base shrink-0">
                <span>{isDhanu ? '👩🏽' : '👨🏽'}</span>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-stone-900" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs sm:text-sm font-bold text-white truncate">
                    {isDhanu ? 'Dhanu — AI Welfare Guide' : 'Vedu — AI Smart Assistant'}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-stone-400">
                  <span className="text-emerald-400 font-semibold">● Online</span>
                  <span>•</span>
                  <span>Benefit Recommendation Engine</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {/* Quick AI Recommendation Wizard Action */}
              <button
                onClick={startRecommendationWizard}
                className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-[10px] font-bold shadow-xs transition-all mr-1 cursor-pointer"
                title="Start AI Benefit Recommendation Wizard"
              >
                <Sparkles className="w-3 h-3" />
                <span>AI Wizard</span>
              </button>

              {/* Character Switcher Toggle */}
              <div className="flex items-center bg-stone-800 rounded-lg p-0.5 border border-stone-700 mr-1">
                <button
                  onClick={() => setCharacter('dhanu')}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all ${
                    isDhanu
                      ? 'bg-amber-500 text-stone-950 shadow-xs'
                      : 'text-stone-400 hover:text-white'
                  }`}
                  title="Switch to Dhanu (Welfare Guide)"
                >
                  👩🏽 Dhanu
                </button>
                <button
                  onClick={() => setCharacter('vedu')}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all ${
                    !isDhanu
                      ? 'bg-teal-500 text-stone-950 shadow-xs'
                      : 'text-stone-400 hover:text-white'
                  }`}
                  title="Switch to Vedu (Smart Tech Assistant)"
                >
                  👨🏽 Vedu
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

              {/* Expand / Minimize Window */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors hidden sm:block"
                title={isExpanded ? 'Minimize' : 'Maximize'}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>

              {/* Close Button */}
              <button
                onClick={onToggle}
                className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── Sub-Header: Recommendation Engine Live Banner ── */}
          <div className="px-4 py-2 bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-amber-500/10 border-b border-amber-500/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-amber-900 dark:text-amber-300 font-semibold text-[11px]">
              <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Instant AI Benefit Recommendation Engine</span>
            </div>
            <button
              onClick={startRecommendationWizard}
              className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold hover:underline flex items-center gap-0.5"
            >
              <span>Launch Wizard</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* ── Chat Messages Scroll Area ── */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs sm:text-sm bg-stone-50/50 dark:bg-stone-950/40">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col gap-1.5 ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[92%] sm:max-w-[85%] ${
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
                          : 'bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-800 rounded-tl-xs shadow-xs w-full'
                      }`}
                    >
                      {msg.text}

                      {/* ── Interactive Step Option Chips ── */}
                      {msg.interactiveStep && (
                        <div className="mt-3 pt-2.5 border-t border-stone-200 dark:border-stone-800">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-2">
                            Select an option or type below:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.interactiveStep.options.map((opt) => (
                              <button
                                key={opt.value}
                                onClick={() =>
                                  handleSelectStepOption(
                                    msg.interactiveStep!.step,
                                    opt.value,
                                    opt.label
                                  )
                                }
                                className="px-2.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-500 hover:text-stone-950 text-stone-800 dark:text-stone-200 text-xs font-semibold border border-amber-300 dark:border-amber-700/60 transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                              >
                                {opt.icon && <span>{opt.icon}</span>}
                                <span>{opt.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* ── Rich AI Recommendation Results Card ── */}
                      {msg.recommendation && (
                        <div className="mt-3 pt-3 border-t border-stone-200 dark:border-stone-800 space-y-2.5">
                          {/* Profile Summary Badges */}
                          <div className="flex flex-wrap items-center gap-1 bg-stone-100 dark:bg-stone-800/80 p-2 rounded-xl text-[10px] font-medium text-stone-600 dark:text-stone-300">
                            {msg.recommendation.profile.state && (
                              <span className="flex items-center gap-1 bg-white dark:bg-stone-700 px-1.5 py-0.5 rounded-md border border-stone-200 dark:border-stone-600">
                                <MapPin className="w-2.5 h-2.5 text-amber-500" />
                                <span>{msg.recommendation.profile.state}</span>
                              </span>
                            )}
                            {msg.recommendation.profile.occupation && (
                              <span className="flex items-center gap-1 bg-white dark:bg-stone-700 px-1.5 py-0.5 rounded-md border border-stone-200 dark:border-stone-600">
                                <Briefcase className="w-2.5 h-2.5 text-blue-500" />
                                <span>{msg.recommendation.profile.occupation.replace('_', ' ')}</span>
                              </span>
                            )}
                            {msg.recommendation.profile.ageBand && (
                              <span className="flex items-center gap-1 bg-white dark:bg-stone-700 px-1.5 py-0.5 rounded-md border border-stone-200 dark:border-stone-600">
                                <Calendar className="w-2.5 h-2.5 text-emerald-500" />
                                <span>Age {msg.recommendation.profile.ageBand.replace('_', '-')}</span>
                              </span>
                            )}
                            {msg.recommendation.profile.incomeBand && (
                              <span className="flex items-center gap-1 bg-white dark:bg-stone-700 px-1.5 py-0.5 rounded-md border border-stone-200 dark:border-stone-600">
                                <Wallet className="w-2.5 h-2.5 text-purple-500" />
                                <span>{msg.recommendation.profile.incomeBand.replace('_', ' ')}</span>
                              </span>
                            )}
                          </div>

                          {/* Matched Schemes List */}
                          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                            {msg.recommendation.matchedSchemes.slice(0, 5).map((scheme) => (
                              <div
                                key={scheme.id}
                                className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700/80 flex flex-col gap-1 hover:border-amber-400 transition-colors"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <span className="font-bold text-stone-900 dark:text-white text-xs leading-tight">
                                    {scheme.name}
                                  </span>
                                  <a
                                    href={scheme.officialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1 rounded-md bg-stone-200 dark:bg-stone-700 hover:bg-amber-500 hover:text-stone-950 text-stone-700 dark:text-stone-300 text-[10px] shrink-0 transition-colors"
                                    title="Open official portal"
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                </div>
                                {scheme.benefitType && (
                                  <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                                    <Award className="w-3 h-3 shrink-0" />
                                    <span>{scheme.benefitType}</span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Primary CTA Buttons */}
                          <div className="pt-2 flex flex-col gap-1.5">
                            {onApplyProfile && (
                              <button
                                onClick={() => {
                                  onApplyProfile(msg.recommendation!.profile);
                                  onToggle(); // Close or dock modal to show results
                                }}
                                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                              >
                                <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                                <span>View Complete Checklist & Documents</span>
                                <ArrowRight className="w-3.5 h-3.5 ml-1" />
                              </button>
                            )}

                            <button
                              onClick={startRecommendationWizard}
                              className="w-full py-1.5 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-semibold text-[11px] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                            >
                              <RotateCcw className="w-3 h-3 text-stone-400" />
                              <span>Recalculate with Different Details</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Optional matched scheme links */}
                      {!msg.recommendation && msg.schemes && msg.schemes.length > 0 && (
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
                        {msg.source === 'ai-recommendation-engine'
                          ? '✨ AI Recommendation Engine'
                          : msg.source === 'gemini-ai'
                          ? '⚡ Gemini AI'
                          : '✓ Verified Facts'}
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
                    {isDhanu ? 'Dhanu is matching verified schemes...' : 'Vedu is analyzing rules...'}
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
              placeholder={`e.g. "I am a 22 yr student in Karnataka" or ask ${isDhanu ? 'Dhanu' : 'Vedu'}...`}
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
