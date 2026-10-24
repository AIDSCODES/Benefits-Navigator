/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LocalizedString } from '../lib/engine/types.ts';
import { QuestionOption } from './questions.ts';

export interface StateRationCardConfig {
  stateName: string;
  aliases: string[];
  helpText: LocalizedString;
  options: QuestionOption[];
}

/**
 * Standard All-India NFSA 2013 Ration Card options
 * Used as fallback for any state without custom overrides.
 */
export const DEFAULT_NFSA_RATION_OPTIONS: QuestionOption[] = [
  {
    value: 'antyodaya_bpl',
    label: {
      en: 'Antyodaya (AAY) / BPL / Yellow or Red Card',
      hi: 'अंत्योदय (AAY) / बीपीएल / पीला या लाल कार्ड',
      mr: 'अंत्योदय (AAY) / बीपीएल / पिवळे किंवा लाल कार्ड',
    },
    iconName: 'Award',
    description: {
      en: 'Poorest of the poor families (35 kg subsidized food grains monthly)',
      hi: 'अति निर्धन परिवार (35 किलोग्राम मासिक रियायती खाद्यान्न)',
      mr: 'अति दारिद्र्यरेषेखालील कुटुंबे (दरमहा ३५ किलो सवलतीचे धान्य)',
    },
    voiceKeywords: {
      en: ['antyodaya', 'aay', 'bpl', 'yellow card', 'red card'],
      hi: ['अंत्योदय', 'बीपीएल', 'पीला कार्ड', 'लाल कार्ड', 'एएवाई'],
      mr: ['अंत्योदय', 'बीपीएल', 'पिवळे कार्ड', 'लाल कार्ड'],
    },
  },
  {
    value: 'priority',
    label: {
      en: 'Priority Household (PHH) / Subsidized Card',
      hi: 'प्राथमिकता परिवार (PHH) / सब्सिडी राशन कार्ड',
      mr: 'प्राधान्य कुटुंब (PHH) / सवलतीचे रेशन कार्ड',
    },
    iconName: 'Bookmark',
    description: {
      en: 'Subsidized grain card (5 kg food grains per member monthly)',
      hi: 'सब्सिडी राशन कार्ड (5 किलोग्राम प्रति सदस्य मासिक खाद्यान्न)',
      mr: 'सवलतीचे धान्य मिळणारे कुटुंब (दरमहा प्रति व्यक्ती ५ किलो धान्य)',
    },
    voiceKeywords: {
      en: ['priority', 'phh', 'priority household', 'subsidized'],
      hi: ['प्राथमिकता', 'पीएचएच', 'सब्सिडी कार्ड'],
      mr: ['प्राधान्य', 'प्राधान्य कुटुंब', 'सवलतीचे धान्य'],
    },
  },
  {
    value: 'none',
    label: {
      en: 'White Card (Non-Subsidized) / APL or No Card',
      hi: 'सफेद कार्ड (गैर-सब्सिडी) / एपीएल या कोई कार्ड नहीं',
      mr: 'पांढरी शिधापत्रिका (बिगर-अनुदानित) / एपीएल किंवा रेशन कार्ड नाही',
    },
    iconName: 'FileText',
    description: {
      en: 'Above Poverty Line or general non-subsidized household',
      hi: 'गरीबी रेखा से ऊपर या गैर-सब्सिडी सामान्य परिवार',
      mr: 'दारिद्र्यरेषेवरील किंवा बिगर-अनुदानित सर्वसाधारण कुटुंब',
    },
    voiceKeywords: {
      en: ['white card', 'apl', 'no card', 'none', 'non subsidized'],
      hi: ['सफेद कार्ड', 'एपीएल', 'कोई कार्ड नहीं', 'गैर सब्सिडी'],
      mr: ['पांढरे कार्ड', 'एपीएल', 'कार्ड नाही', 'बिगर अनुदानित'],
    },
  },
  {
    value: 'unsure',
    label: {
      en: 'Not sure / Need to check',
      hi: 'पता नहीं / देखना पड़ेगा',
      mr: 'माहित नाही / तपासावे लागेल',
    },
    iconName: 'HelpCircle',
    description: {
      en: 'We will check based on your income and household details',
      hi: 'हम आपकी आय और परिवार के विवरण के आधार पर जांच करेंगे',
      mr: 'आम्ही आपले उत्पन्न व कौटुंबिक माहितीच्या आधारे तपासू',
    },
    voiceKeywords: {
      en: ['not sure', 'unsure', 'dont know', 'check'],
      hi: ['पता नहीं', 'मालूम नहीं', 'देखना पड़ेगा'],
      mr: ['माहित नाही', 'सांगता येत नाही', 'तपासावे लागेल'],
    },
  },
];

/**
 * State-specific Food Security & Ration Card Configurations
 */
export const STATE_RATION_CARD_MAP: Record<string, StateRationCardConfig> = {
  // 1. MAHARASHTRA
  maharashtra: {
    stateName: 'Maharashtra',
    aliases: ['maharashtra', 'mh', 'maha'],
    helpText: {
      en: 'Maharashtra Food & Civil Supplies: Cards are color-coded by annual income — Yellow (< ₹15k), Kesari (₹15k–₹1L), and White (> ₹1L).',
      hi: 'महाराष्ट्र अन्न एवं नागरिक आपूर्ति: कार्ड वार्षिक आय के अनुसार रंग-कोडेड हैं — पीला (< ₹15 हजार), केशरी (₹15 हजार - ₹1 लाख), और सफेद (> ₹1 लाख)।',
      mr: 'महाराष्ट्र अन्न व नागरी पुरवठा: वार्षिक उत्पन्नानुसार रंग ठरवले आहेत — पिवळे (< ₹१५ हजार), केशरी (₹१५ हजार ते ₹१ लाख), आणि पांढरे (> ₹१ लाख).',
    },
    options: [
      {
        value: 'antyodaya_bpl',
        label: {
          en: 'Yellow Card / Antyodaya (पिवळी शिधापत्रिका)',
          hi: 'पीला कार्ड / अंत्योदय (पिवळी शिधापत्रिका)',
          mr: 'पिवळी शिधापत्रिका / अंत्योदय (AAY-BPL)',
        },
        iconName: 'Award',
        description: {
          en: 'Annual income up to ₹15,000; 35 kg subsidized grains monthly',
          hi: 'वार्षिक आय ₹15,000 तक; 35 किग्रा रियायती खाद्यान्न',
          mr: 'वार्षिक उत्पन्न ₹१५,००० पर्यंत; दरमहा ३५ किलो सवलतीचे धान्य',
        },
        voiceKeywords: {
          en: ['yellow card', 'yellow', 'pivle', 'aay', 'bpl'],
          hi: ['पीला कार्ड', 'पीला', 'पिवळी', 'अंत्योदय'],
          mr: ['पिवळी शिधापत्रिका', 'पिवळे कार्ड', 'अंत्योदय', 'बीपीएल'],
        },
      },
      {
        value: 'priority',
        label: {
          en: 'Kesari / Saffron Card (केशरी शिधापत्रिका - PHH)',
          hi: 'केशरी / नारंगी कार्ड (केशरी शिधापत्रिका - प्राथमिकता)',
          mr: 'केशरी शिधापत्रिका (प्राधान्य कुटुंब - PHH)',
        },
        iconName: 'Bookmark',
        description: {
          en: 'Annual income ₹15,000 to ₹1 Lakh; subsidized food grain allocation',
          hi: 'वार्षिक आय ₹15,000 से ₹1 लाख; रियायती अनाज वितरण',
          mr: 'वार्षिक उत्पन्न ₹१५,००० ते ₹१ लाख; सवलतीचे धान्य वाटप',
        },
        voiceKeywords: {
          en: ['kesari', 'orange', 'saffron', 'phh', 'kesari card'],
          hi: ['केशरी', 'नारंगी', 'केसरिया कार्ड', 'प्राथमिकता'],
          mr: ['केशरी शिधापत्रिका', 'केशरी कार्ड', 'प्राधान्य कुटुंब'],
        },
      },
      {
        value: 'none',
        label: {
          en: 'White Card (पांढरी शिधापत्रिका - APL)',
          hi: 'सफेद कार्ड (पांढरी शिधापत्रिका - गैर-सब्सिडी)',
          mr: 'पांढरी शिधापत्रिका (बिगर-अनुदानित - APL)',
        },
        iconName: 'FileText',
        description: {
          en: 'Annual income above ₹1 Lakh; general non-subsidized household',
          hi: 'वार्षिक आय ₹1 लाख से अधिक; गैर-सब्सिडी सामान्य कार्ड',
          mr: 'वार्षिक उत्पन्न ₹१ लाखापेक्षा जास्त; बिगर-अनुदानित शिधापत्रिका',
        },
        voiceKeywords: {
          en: ['white card', 'white', 'pandhri', 'apl'],
          hi: ['सफेद कार्ड', 'सफेद', 'एपीएल'],
          mr: ['पांढरी शिधापत्रिका', 'पांढरे कार्ड', 'एपीएल'],
        },
      },
      {
        value: 'unsure',
        label: {
          en: 'Not sure / Need to check',
          hi: 'पता नहीं / देखना पड़ेगा',
          mr: 'माहित नाही / तपासावे लागेल',
        },
        iconName: 'HelpCircle',
        voiceKeywords: {
          en: ['not sure', 'unsure', 'dont know'],
          hi: ['पता नहीं', 'मालूम नहीं'],
          mr: ['माहित नाही', 'तपासावे लागेल'],
        },
      },
    ],
  },

  // 2. TAMIL NADU
  'tamil-nadu': {
    stateName: 'Tamil Nadu',
    aliases: ['tamil nadu', 'tn', 'tamilnadu'],
    helpText: {
      en: 'TNPDS Smart Family Cards: Green/Rice cards receive all subsidized commodities & free rice; Sugar cards receive sugar only; No-Commodity cards serve as ID proof.',
      hi: 'तमिलनाडु टीएनपीडीएस: हरा/चावल कार्ड सभी वस्तुओं और मुफ्त चावल के लिए पात्र है; चीनी कार्ड केवल चीनी हेतु; नो-कमोडिटी कार्ड केवल पहचान हेतु है।',
      mr: 'तमिळनाडू टीएनपीडीएस: हिरवे/तांदूळ कार्ड मोफत तांदळासाठी पात्र आहे; साखर कार्ड फक्त साखरेसाठी; नो-कमोडिटी कार्ड केवळ ओळखपत्र म्हणून काम करते.',
    },
    options: [
      {
        value: 'priority',
        label: {
          en: 'Rice Card / Green Card (அரிசி அட்டை / PHH)',
          hi: 'राइस कार्ड / ग्रीन कार्ड (அரிசி குடும்ப அட்டை)',
          mr: 'राईस कार्ड / हिरवे कार्ड (तांदूळ शिधापत्रिका - PHH)',
        },
        iconName: 'Bookmark',
        description: {
          en: 'Eligible for all subsidized commodities and free rice under TNPDS',
          hi: 'सभी रियायती वस्तुओं और मुफ्त चावल के लिए पात्र',
          mr: 'सर्व सवलतीच्या वस्तू आणि मोफत तांदळासाठी पात्र',
        },
        voiceKeywords: {
          en: ['rice card', 'green card', 'arisi', 'phh'],
          hi: ['चावल कार्ड', 'ग्रीन कार्ड', 'राइस कार्ड'],
          mr: ['तांदूळ कार्ड', 'हिरवे कार्ड', 'राईस कार्ड'],
        },
      },
      {
        value: 'antyodaya_bpl',
        label: {
          en: 'Antyodaya Anna Yojana (அந்தியோதயா அட்டை / AAY)',
          hi: 'अंत्योदय अन्न योजना (AAY / அந்தியோதயா)',
          mr: 'अंत्योदय अन्न योजना (AAY / அந்தியோதயா அட்டை)',
        },
        iconName: 'Award',
        description: {
          en: 'Poorest households; 35 kg free rice monthly + Pongal gift hampers',
          hi: 'अति निर्धन परिवार; 35 किलो मुफ्त चावल प्रतिमाह',
          mr: 'अति निर्धन कुटुंबे; दरमहा ३५ किलो मोफत तांदूळ',
        },
        voiceKeywords: {
          en: ['aay', 'antyodaya', '35kg'],
          hi: ['अंत्योदय', 'एएवाई', '35 किलो'],
          mr: ['अंत्योदय', 'एएवाय'],
        },
      },
      {
        value: 'none',
        label: {
          en: 'Sugar Card / White Card (சர்க்கரை அட்டை / NPHH-S)',
          hi: 'शुगर कार्ड / सफेद कार्ड (சர்க்கரை அட்டை)',
          mr: 'शुगर कार्ड / पांढरे कार्ड (साखर शिधापत्रिका - NPHH-S)',
        },
        iconName: 'FileText',
        description: {
          en: 'Subsidized sugar & kerosene only; no subsidized rice quota',
          hi: 'केवल रियायती चीनी व केरोसिन; रियायती चावल कोटा नहीं',
          mr: 'केवळ सवलतीची साखर; तांदूळ कोटा नाही',
        },
        voiceKeywords: {
          en: ['sugar card', 'white card', 'nphh-s', 'sarkarai'],
          hi: ['शुगर कार्ड', 'चीनी कार्ड', 'सफेद कार्ड'],
          mr: ['शुगर कार्ड', 'साखर कार्ड', 'पांढरे कार्ड'],
        },
      },
      {
        value: 'none',
        label: {
          en: 'No-Commodity Card (பொருளற்ற அட்டை / NPHH-NC)',
          hi: 'नो-कमोडिटी कार्ड (பொருளற்ற அட்டை - केवल पहचान)',
          mr: 'नो-कमोडिटी कार्ड (केवळ ओळखपत्र - NPHH-NC)',
        },
        iconName: 'FileText',
        description: {
          en: 'Identity & residence proof only; zero commodity drawal',
          hi: 'केवल पहचान और पते का प्रमाण; कोई राशन वस्तु नहीं',
          mr: 'केवळ ओळख आणि रहिवासी पुरावा; रेशन धान्य नाही',
        },
        voiceKeywords: {
          en: ['no commodity', 'id card', 'nphh-nc', 'porulatra'],
          hi: ['नो कमोडिटी', 'सिर्फ पहचान'],
          mr: ['नो कमोडिटी', 'फक्त ओळखपत्र'],
        },
      },
      {
        value: 'unsure',
        label: {
          en: 'Not sure / Need to check',
          hi: 'पता नहीं / देखना पड़ेगा',
          mr: 'माहित नाही / तपासावे लागेल',
        },
        iconName: 'HelpCircle',
        voiceKeywords: {
          en: ['not sure', 'unsure'],
          hi: ['पता नहीं'],
          mr: ['माहित नाही'],
        },
      },
    ],
  },

  // 3. KARNATAKA
  karnataka: {
    stateName: 'Karnataka',
    aliases: ['karnataka', 'ka'],
    helpText: {
      en: 'Karnataka Ahara PDS: Priority Household (PHH/BPL) cards receive free rice under Anna Bhagya; AAY receives 35 kg; NPHH are White cards.',
      hi: 'कर्नाटक आहार पीडीएस: प्राथमिकता (बीपीएल) कार्ड को अन्न भाग्य के तहत मुफ्त चावल मिलता है; अंत्योदय को 35 किग्रा; एनपीएचएच सफेद कार्ड हैं।',
      mr: 'कर्नाटक आहार पीडीएस: प्राधान्य (बीपीएल) कार्डधारकांना अन्न भाग्य अंतर्गत मोफत तांदूळ मिळतो; अंत्योदयला ३५ किलो; एनपीएचएच पांढरे कार्ड आहेत.',
    },
    options: [
      {
        value: 'priority',
        label: {
          en: 'Priority Household / BPL (PHH / ಹಸಿರು ಪಟ್ಟಿ / Anna Bhagya)',
          hi: 'प्राथमिकता परिवार / बीपीएल (PHH / अन्न भाग्य)',
          mr: 'प्राधान्य कुटुंब / बीपीएल (PHH / अन्न भाग्य कार्ड)',
        },
        iconName: 'Bookmark',
        description: {
          en: 'Eligible for 10 kg Anna Bhagya free food grains & Arogya Karnataka health cover',
          hi: 'अन्न भाग्य मुफ्त अनाज और आरोग्य कर्नाटक स्वास्थ्य लाभ हेतु पात्र',
          mr: 'अन्न भाग्य मोफत धान्य आणि आरोग्य कर्नाटक आरोग्य संरक्षणासाठी पात्र',
        },
        voiceKeywords: {
          en: ['bpl', 'phh', 'green card', 'anna bhagya', 'priority'],
          hi: ['बीपीएल', 'अन्न भाग्य', 'हरा कार्ड', 'प्राथमिकता'],
          mr: ['बीपीएल', 'अन्न भाग्य', 'हिरवे कार्ड', 'प्राधान्य'],
        },
      },
      {
        value: 'antyodaya_bpl',
        label: {
          en: 'Antyodaya Anna Yojana (AAY / ಅಂತ್ಯೋದಯ ಕಾರ್ಡ್)',
          hi: 'अंत्योदय अन्न योजना (AAY / ಅಂತ್ಯೋದಯ)',
          mr: 'अंत्योदय अन्न योजना (AAY / ಅಂತ್ಯೋದಯ ಕಾರ್ಡ್)',
        },
        iconName: 'Award',
        description: {
          en: 'Poorest households; 35 kg free food grains monthly per family',
          hi: 'अति निर्धन परिवार; 35 किलोग्राम मुफ्त मासिक खाद्यान्न',
          mr: 'अति निर्धन कुटुंबे; दरमहा ३५ किलो मोफत धान्य',
        },
        voiceKeywords: {
          en: ['antyodaya', 'aay', '35kg'],
          hi: ['अंत्योदय', 'एएवाई'],
          mr: ['अंत्योदय', 'एएवाय'],
        },
      },
      {
        value: 'none',
        label: {
          en: 'Non-Priority / APL (NPHH / ಬಿಳಿ ಕಾರ್ಡ್ / White Card)',
          hi: 'गैर-प्राथमिकता / एपीएल (NPHH / सफेद कार्ड)',
          mr: 'बिगर-प्राधान्य / एपीएल (NPHH / पांढरे कार्ड)',
        },
        iconName: 'FileText',
        description: {
          en: 'General non-subsidized ration card used primarily as ID proof',
          hi: 'गैर-सब्सिडी सामान्य राशन कार्ड जो पहचान प्रमाण के रूप में उपयोगी है',
          mr: 'बिगर-अनुदानित सर्वसाधारण शिधापत्रिका (केवळ ओळखपत्र)',
        },
        voiceKeywords: {
          en: ['apl', 'nphh', 'white card'],
          hi: ['एपीएल', 'सफेद कार्ड'],
          mr: ['एपीएल', 'पांढरे कार्ड'],
        },
      },
      {
        value: 'unsure',
        label: {
          en: 'Not sure / Need to check',
          hi: 'पता नहीं / देखना पड़ेगा',
          mr: 'माहित नाही / तपासावे लागेल',
        },
        iconName: 'HelpCircle',
        voiceKeywords: {
          en: ['not sure', 'unsure'],
          hi: ['पता नहीं'],
          mr: ['माहित नाही'],
        },
      },
    ],
  },

  // 4. WEST BENGAL
  'west-bengal': {
    stateName: 'West Bengal',
    aliases: ['west bengal', 'wb', 'bengal', 'paschim banga'],
    helpText: {
      en: 'West Bengal Food & Supplies: Central NFSA cards are AAY, PHH & SPHH; State schemes are RKSY-I (subsidized) and RKSY-II (general/non-subsidized).',
      hi: 'पश्चिम बंगाल खाद्य एवं आपूर्ति: केंद्रीय एनएफएसए कार्ड AAY, PHH और SPHH हैं; राज्य योजनाएं RKSY-I (सब्सिडी) और RKSY-II (सामान्य) हैं।',
      mr: 'पश्चिम बंगाल अन्न व पुरवठा: केंद्रीय एनएफएसए कार्ड AAY, PHH आणि SPHH आहेत; राज्य योजना RKSY-I (अनुदानित) व RKSY-II (सामान्य) आहेत.',
    },
    options: [
      {
        value: 'antyodaya_bpl',
        label: {
          en: 'Antyodaya Anna Yojana (AAY / অন্ত্যোদয়)',
          hi: 'अंत्योदय अन्न योजना (AAY / अंत्योदय)',
          mr: 'अंत्योदय अन्न योजना (AAY / অন্ত্যোদয়)',
        },
        iconName: 'Award',
        description: {
          en: 'Central NFSA destitute household; 35 kg food grains per family monthly',
          hi: 'केंद्रीय एनएफएसए अति निर्धन परिवार; 35 किग्रा खाद्यान्न',
          mr: 'केंद्रीय एनएफएसए अति निर्धन कुटुंब; दरमहा ३५ किलो धान्य',
        },
        voiceKeywords: {
          en: ['aay', 'antyodaya'],
          hi: ['अंत्योदय', 'एएवाई'],
          mr: ['अंत्योदय', 'एएवाय'],
        },
      },
      {
        value: 'priority',
        label: {
          en: 'PHH / SPHH Card (Priority & Special Priority / বিশেষ অগ্রাধিকার)',
          hi: 'पीएचएच / एसपीएचएच कार्ड (केंद्रीय प्राथमिकता खाद्यान्न)',
          mr: 'पीएचएच / एसपीएचएच कार्ड (केंद्रीय प्राधान्य कुटुंब)',
        },
        iconName: 'Bookmark',
        description: {
          en: 'Central NFSA 5 kg free food grains per member monthly via Duare Ration',
          hi: 'दुआरे राशन के माध्यम से प्रति सदस्य 5 किलो मुफ्त खाद्यान्न',
          mr: 'दुआरे रेशन अंतर्गत दरमहा प्रति व्यक्ती ५ किलो मोफत धान्य',
        },
        voiceKeywords: {
          en: ['phh', 'sphh', 'priority'],
          hi: ['पीएचएच', 'एसपीएचएच', 'प्राथमिकता'],
          mr: ['पीएचएच', 'एसपीएचएच', 'प्राधान्य'],
        },
      },
      {
        value: 'priority',
        label: {
          en: 'RKSY-I Card (Rajya Khadya Suraksha Yojana - 1)',
          hi: 'आरकेएसवाई-1 कार्ड (राज्य खाद्य सुरक्षा योजना १)',
          mr: 'आरकेएसवाय-१ कार्ड (राज्य अन्न सुरक्षा योजना १)',
        },
        iconName: 'Bookmark',
        description: {
          en: 'West Bengal state-funded 5 kg subsidized food grains per person monthly',
          hi: 'पश्चिम बंगाल राज्य द्वारा वित्तपोषित 5 किग्रा रियायती खाद्यान्न',
          mr: 'पश्चिम बंगाल राज्य अनुदानित दरमहा प्रति व्यक्ती ५ किलो धान्य',
        },
        voiceKeywords: {
          en: ['rksy 1', 'rksy-1', 'rksy one', 'state ration'],
          hi: ['आरकेएसवाई 1', 'राज्य खाद्य सुरक्षा 1'],
          mr: ['आरकेएसवाय १', 'राज्य अन्न सुरक्षा १'],
        },
      },
      {
        value: 'none',
        label: {
          en: 'RKSY-II / Non-Subsidized (राज्य खाद्य सुरक्षा २ / APL)',
          hi: 'आरकेएसवाई-2 / गैर-सब्सिडी (राज्य खाद्य सुरक्षा २ / सामान्य)',
          mr: 'आरकेएसवाय-२ / बिगर-अनुदानित (सामान्य शिधापत्रिका)',
        },
        iconName: 'FileText',
        description: {
          en: 'Non-subsidized / general card with 1-2 kg food grains or ID only',
          hi: 'गैर-सब्सिडी अथवा नाममात्र राशन वाला सामान्य कार्ड',
          mr: 'बिगर-अनुदानित किंवा केवळ नाममात्र रेशन असणारे सामान्य कार्ड',
        },
        voiceKeywords: {
          en: ['rksy 2', 'rksy-2', 'rksy two', 'non subsidized', 'apl'],
          hi: ['आरकेएसवाई 2', 'गैर सब्सिडी', 'एपीएल'],
          mr: ['आरकेएसवाय २', 'बिगर अनुदानित'],
        },
      },
      {
        value: 'unsure',
        label: {
          en: 'Not sure / Need to check',
          hi: 'पता नहीं / देखना पड़ेगा',
          mr: 'माहित नाही / तपासावे लागेल',
        },
        iconName: 'HelpCircle',
        voiceKeywords: {
          en: ['not sure', 'unsure'],
          hi: ['पता नहीं'],
          mr: ['माहित नाही'],
        },
      },
    ],
  },

  // 5. UTTAR PRADESH
  'uttar-pradesh': {
    stateName: 'Uttar Pradesh',
    aliases: ['uttar pradesh', 'up'],
    helpText: {
      en: 'UP Food & Civil Supplies: Patra Grihasti (White card with PHH stamp) gets 5 kg/unit; Antyodaya (Red card) gets 35 kg food grains per family.',
      hi: 'उत्तर प्रदेश खाद्य एवं रसद: पात्र गृहस्थी (पीएचएच मोहर वाला सफेद कार्ड) को 5 किग्रा/यूनिट; अंत्योदय (लाल कार्ड) को 35 किग्रा खाद्यान्न मिलता है।',
      mr: 'उत्तर प्रदेश अन्न व रसद: पात्र गृहस्थी (पीएचएच शिक्का असलेले पांढरे कार्ड) ला ५ किलो/युनिट; अंत्योदय (लाल कार्ड) ला ३५ किलो धान्य मिळते.',
    },
    options: [
      {
        value: 'priority',
        label: {
          en: 'Patra Grihasti (पात्र गृहस्थी / White PHH Card)',
          hi: 'पात्र गृहस्थी (पात्र गृहस्थी / पीएचएच राशन कार्ड)',
          mr: 'पात्र गृहस्थी (पात्र गृहस्थी / PHH शिधापत्रिका)',
        },
        iconName: 'Bookmark',
        description: {
          en: '5 kg free food grains per family unit monthly under NFSA UP',
          hi: 'प्रति यूनिट 5 किलोग्राम मुफ्त खाद्यान्न प्रतिमाह',
          mr: 'दरमहा प्रति युनिट ५ किलो मोफत धान्य वाटप',
        },
        voiceKeywords: {
          en: ['patra grihasti', 'grihasti', 'phh', 'white card'],
          hi: ['पात्र गृहस्थी', 'गृहस्थी कार्ड', 'पीएचएच'],
          mr: ['पात्र गृहस्थी', 'गृहस्थी'],
        },
      },
      {
        value: 'antyodaya_bpl',
        label: {
          en: 'Antyodaya Card (लाल राशन कार्ड / Red AAY Card)',
          hi: 'अंत्योदय कार्ड (लाल राशन कार्ड / AAY)',
          mr: 'अंत्योदय कार्ड (लाल शिधापत्रिका / AAY)',
        },
        iconName: 'Award',
        description: {
          en: '35 kg free food grains per family monthly (Destitute / Poorest families)',
          hi: 'प्रति परिवार 35 किलोग्राम मुफ्त खाद्यान्न (अति निर्धन परिवार)',
          mr: 'दरमहा प्रति कुटुंब ३५ किलो मोफत धान्य (अति निर्धन कुटुंबे)',
        },
        voiceKeywords: {
          en: ['red card', 'laal card', 'antyodaya', 'aay'],
          hi: ['लाल कार्ड', 'अंत्योदय', 'रेड कार्ड'],
          mr: ['लाल कार्ड', 'अंत्योदय', 'लाल शिधापत्रिका'],
        },
      },
      {
        value: 'none',
        label: {
          en: 'General / Non-NFSA (सामान्य राशन कार्ड / APL)',
          hi: 'सामान्य राशन कार्ड (गैर-सब्सिडी / एपीएल)',
          mr: 'सर्वसाधारण शिधापत्रिका (बिगर-अनुदानित / APL)',
        },
        iconName: 'FileText',
        description: {
          en: 'Non-subsidized general family card or no active ration card',
          hi: 'बिना सब्सिडी वाला सामान्य पारिवारिक कार्ड',
          mr: 'बिगर-अनुदानित सर्वसाधारण कार्ड किंवा रेशन कार्ड नाही',
        },
        voiceKeywords: {
          en: ['general', 'apl', 'non nfsa', 'no card'],
          hi: ['सामान्य कार्ड', 'एपीएल', 'गैर सब्सिडी'],
          mr: ['सामान्य कार्ड', 'एपीएल'],
        },
      },
      {
        value: 'unsure',
        label: {
          en: 'Not sure / Need to check',
          hi: 'पता नहीं / देखना पड़ेगा',
          mr: 'माहित नाही / तपासावे लागेल',
        },
        iconName: 'HelpCircle',
        voiceKeywords: {
          en: ['not sure', 'unsure'],
          hi: ['पता नहीं'],
          mr: ['माहित नाही'],
        },
      },
    ],
  },

  // 6. TELANGANA
  telangana: {
    stateName: 'Telangana',
    aliases: ['telangana', 'ts', 'tg'],
    helpText: {
      en: 'Telangana Civil Supplies: White Food Security Card (FSC) provides free rice & qualifies for Aarogyasri healthcare; Pink Card is for non-BPL households.',
      hi: 'तेलंगाना नागरिक आपूर्ति: सफेद खाद्य सुरक्षा कार्ड (FSC) मुफ्त चावल और आरोग्यश्री स्वास्थ्य लाभ देता है; गुलाबी कार्ड गैर-बीपीएल परिवारों के लिए है।',
      mr: 'तेलंगणा नागरी पुरवठा: पांढरे अन्न सुरक्षा कार्ड (FSC) मोफत तांदूळ आणि आरोग्यश्री आरोग्य लाभ देते; गुलाबी कार्ड बिगर-बीपीएल कुटुंबांसाठी आहे.',
    },
    options: [
      {
        value: 'priority',
        label: {
          en: 'White Food Security Card (FSC / తెల్ల రేషన్ కార్డు)',
          hi: 'व्हाइट फूड सिक्योरिटी कार्ड (सफेद राशन कार्ड / FSC)',
          mr: 'पांढरे अन्न सुरक्षा कार्ड (White FSC / తెల్ల రేషన్ కార్డు)',
        },
        iconName: 'Bookmark',
        description: {
          en: '6 kg free rice per person monthly + qualifies for Aarogyasri health scheme',
          hi: '6 किलो मुफ्त चावल प्रति व्यक्ति प्रतिमाह + आरोग्यश्री स्वास्थ्य योजना पात्र',
          mr: 'दरमहा प्रति व्यक्ती ६ किलो मोफत तांदूळ + आरोग्यश्री आरोग्य योजना पात्र',
        },
        voiceKeywords: {
          en: ['white card', 'fsc', 'food security card', 'tella ration', 'white fsc'],
          hi: ['व्हाइट कार्ड', 'सफेद राशन', 'एफएससी', 'खाद्य सुरक्षा'],
          mr: ['पांढरे कार्ड', 'अन्न सुरक्षा कार्ड', 'एफएससी'],
        },
      },
      {
        value: 'antyodaya_bpl',
        label: {
          en: 'Antyodaya Anna Yojana (AAY Card / అంత్యోదయ)',
          hi: 'अंत्योदय अन्न योजना (AAY कार्ड / అంత్యోదయ)',
          mr: 'अंत्योदय अन्न योजना (AAY कार्ड / అంత్యోదయ)',
        },
        iconName: 'Award',
        description: {
          en: '35 kg free rice monthly for poorest destitute households',
          hi: 'अति निर्धन परिवारों के लिए 35 किलो मुफ्त चावल प्रतिमाह',
          mr: 'अति निर्धन कुटुंबांसाठी दरमहा ३५ किलो मोफत तांदूळ',
        },
        voiceKeywords: {
          en: ['antyodaya', 'aay', '35kg'],
          hi: ['अंत्योदय', 'एएवाई'],
          mr: ['अंत्योदय', 'एएवाय'],
        },
      },
      {
        value: 'none',
        label: {
          en: 'Pink Card / Non-BPL (గులాబీ కార్డు / APL)',
          hi: 'पिंक कार्ड / गैर-बीपीएल (गुलाबी राशन कार्ड / एपीएल)',
          mr: 'गुलाबी कार्ड / बिगर-बीपीएल (Pink Card / APL)',
        },
        iconName: 'FileText',
        description: {
          en: 'Non-subsidized general household card for above poverty line families',
          hi: 'गैर-सब्सिडी सामान्य पारिवारिक कार्ड',
          mr: 'बिगर-अनुदानित सर्वसाधारण शिधापत्रिका',
        },
        voiceKeywords: {
          en: ['pink card', 'gulabi card', 'apl', 'non bpl'],
          hi: ['पिंक कार्ड', 'गुलाबी कार्ड', 'एपीएल'],
          mr: ['गुलाबी कार्ड', 'पिंक कार्ड', 'एपीएल'],
        },
      },
      {
        value: 'unsure',
        label: {
          en: 'Not sure / Need to check',
          hi: 'पता नहीं / देखना पड़ेगा',
          mr: 'माहित नाही / तपासावे लागेल',
        },
        iconName: 'HelpCircle',
        voiceKeywords: {
          en: ['not sure', 'unsure'],
          hi: ['पता नहीं'],
          mr: ['माहित नाही'],
        },
      },
    ],
  },

  // 7. ANDHRA PRADESH
  'andhra-pradesh': {
    stateName: 'Andhra Pradesh',
    aliases: ['andhra pradesh', 'ap', 'andhra'],
    helpText: {
      en: 'Andhra Pradesh Civil Supplies: White Rice Card (బియ్యం కార్డు) gives free rice & enables Dr. YSR Aarogyasri health coverage; Pink card is general/APL.',
      hi: 'आंध्र प्रदेश नागरिक आपूर्ति: व्हाइट राइस कार्ड (चावल कार्ड) मुफ्त चावल और वाईएसआर आरोग्यश्री स्वास्थ्य लाभ देता है; गुलाबी कार्ड सामान्य है।',
      mr: 'आंध्र प्रदेश नागरी पुरवठा: व्हाइट राईस कार्ड मोफत तांदूळ आणि डॉ. वायएसआर आरोग्यश्री संरक्षण देते; गुलाबी कार्ड सामान्य आहे.',
    },
    options: [
      {
        value: 'priority',
        label: {
          en: 'White Rice Card (బియ్యం కార్డు / White FSC)',
          hi: 'व्हाइट राइस कार्ड (सफेद चावल कार्ड / FSC)',
          mr: 'व्हाईट राईस कार्ड (पांढरे तांदूळ कार्ड / FSC)',
        },
        iconName: 'Bookmark',
        description: {
          en: 'Subsidized rice, doorstep delivery & Dr. YSR Aarogyasri healthcare cover',
          hi: 'मुफ्त चावल, घर पर वितरण और डॉ. वाईएसआर आरोग्यश्री स्वास्थ्य सुरक्षा',
          mr: 'मोफत तांदूळ, घरपोच वितरण आणि डॉ. वायएसआर आरोग्यश्री आरोग्य कवच',
        },
        voiceKeywords: {
          en: ['white card', 'rice card', 'biyyam card', 'white fsc'],
          hi: ['व्हाइट कार्ड', 'चावल कार्ड', 'सफेद राशन'],
          mr: ['व्हाईट कार्ड', 'तांदूळ कार्ड', 'पांढरे कार्ड'],
        },
      },
      {
        value: 'antyodaya_bpl',
        label: {
          en: 'Antyodaya Anna Yojana (AAY Card / అంత్యోదయ)',
          hi: 'अंत्योदय अन्न योजना (AAY कार्ड / అంత్యోదయ)',
          mr: 'अंत्योदय अन्न योजना (AAY कार्ड / అంత్యోదయ)',
        },
        iconName: 'Award',
        description: {
          en: '35 kg free food grains monthly for poorest families',
          hi: 'अति निर्धन परिवारों के लिए 35 किलो मुफ्त खाद्यान्न',
          mr: 'अति निर्धन कुटुंबांसाठी दरमहा ३५ किलो मोफत धान्य',
        },
        voiceKeywords: {
          en: ['antyodaya', 'aay', '35kg'],
          hi: ['अंत्योदय', 'एएवाई'],
          mr: ['अंत्योदय', 'एएवाय'],
        },
      },
      {
        value: 'none',
        label: {
          en: 'Pink / Non-BPL Card (సాధారణ కార్డు / APL)',
          hi: 'पिंक / गैर-बीपीएल कार्ड (सामान्य राशन कार्ड)',
          mr: 'गुलाबी / बिगर-बीपीएल कार्ड (सामान्य शिधापत्रिका)',
        },
        iconName: 'FileText',
        description: {
          en: 'Non-subsidized general card used for residency & citizen services',
          hi: 'गैर-सब्सिडी सामान्य कार्ड जो पते और सेवाओं के लिए उपयोगी है',
          mr: 'बिगर-अनुदानित सर्वसाधारण कार्ड',
        },
        voiceKeywords: {
          en: ['pink card', 'non bpl', 'apl'],
          hi: ['पिंक कार्ड', 'गुलाबी कार्ड', 'एपीएल'],
          mr: ['गुलाबी कार्ड', 'एपीएल'],
        },
      },
      {
        value: 'unsure',
        label: {
          en: 'Not sure / Need to check',
          hi: 'पता नहीं / देखना पड़ेगा',
          mr: 'माहित नाही / तपासावे लागेल',
        },
        iconName: 'HelpCircle',
        voiceKeywords: {
          en: ['not sure', 'unsure'],
          hi: ['पता नहीं'],
          mr: ['माहित नाही'],
        },
      },
    ],
  },

  // 8. DELHI
  delhi: {
    stateName: 'Delhi',
    aliases: ['delhi', 'nct of delhi', 'dl'],
    helpText: {
      en: 'Delhi Food & Supplies: Priority Households (PHH) hold Pink Cards (5 kg/member); Antyodaya (AAY) hold Yellow Cards (35 kg/family).',
      hi: 'दिल्ली खाद्य एवं आपूर्ति: प्राथमिकता परिवार (PHH) गुलाबी कार्ड रखते हैं (5 किग्रा/सदस्य); अंत्योदय (AAY) पीला कार्ड रखते हैं (35 किग्रा/परिवार)।',
      mr: 'दिल्ली अन्न व पुरवठा: प्राधान्य कुटुंब (PHH) गुलाबी कार्ड बाळगतात (५ किलो/व्यक्ती); अंत्योदय (AAY) पिवळे कार्ड बाळगतात (३५ किलो/कुटुंब).',
    },
    options: [
      {
        value: 'priority',
        label: {
          en: 'Priority Household (PHH / Pink Card - गुलाबी कार्ड)',
          hi: 'प्राथमिकता परिवार (PHH / गुलाबी राशन कार्ड)',
          mr: 'प्राधान्य कुटुंब (PHH / गुलाबी शिधापत्रिका)',
        },
        iconName: 'Bookmark',
        description: {
          en: '5 kg free food grains per member monthly under NFSA Delhi',
          hi: 'दिल्ली एनएफएसए के तहत प्रति सदस्य 5 किग्रा मुफ्त खाद्यान्न',
          mr: 'दिल्ली एनएफएसए अंतर्गत दरमहा प्रति व्यक्ती ५ किलो मोफत धान्य',
        },
        voiceKeywords: {
          en: ['phh', 'pink card', 'priority', 'gulabi card'],
          hi: ['गुलाबी कार्ड', 'पीएचएच', 'प्राथमिकता'],
          mr: ['गुलाबी कार्ड', 'प्राधान्य'],
        },
      },
      {
        value: 'antyodaya_bpl',
        label: {
          en: 'Antyodaya Anna Yojana (AAY / Yellow Card - पीला कार्ड)',
          hi: 'अंत्योदय अन्न योजना (AAY / पीला राशन कार्ड)',
          mr: 'अंत्योदय अन्न योजना (AAY / पिवळी शिधापत्रिका)',
        },
        iconName: 'Award',
        description: {
          en: '35 kg free food grains monthly for poorest destitute households',
          hi: 'अति निर्धन परिवारों के लिए 35 किग्रा मुफ्त मासिक खाद्यान्न',
          mr: 'अति निर्धन कुटुंबांसाठी दरमहा ३५ किलो मोफत धान्य',
        },
        voiceKeywords: {
          en: ['yellow card', 'aay', 'antyodaya', 'peela card'],
          hi: ['पीला कार्ड', 'अंत्योदय', 'एएवाई'],
          mr: ['पिवळे कार्ड', 'अंत्योदय'],
        },
      },
      {
        value: 'none',
        label: {
          en: 'Non-NFSA / Above Poverty Line / No Card',
          hi: 'गैर-एनएफएसए / एपीएल या कोई कार्ड नहीं',
          mr: 'बिगर-एनएफएसए / एपीएल किंवा रेशन कार्ड नाही',
        },
        iconName: 'FileText',
        description: {
          en: 'General household without food subsidy entitlement in Delhi',
          hi: 'दिल्ली में खाद्य सब्सिडी के बिना सामान्य परिवार',
          mr: 'अन्न अनुदानाशिवाय सर्वसाधारण कुटुंब',
        },
        voiceKeywords: {
          en: ['no card', 'apl', 'non nfsa', 'none'],
          hi: ['कोई कार्ड नहीं', 'एपीएल', 'गैर एनएफएसए'],
          mr: ['कार्ड नाही', 'एपीएल'],
        },
      },
      {
        value: 'unsure',
        label: {
          en: 'Not sure / Need to check',
          hi: 'पता नहीं / देखना पड़ेगा',
          mr: 'माहित नाही / तपासावे लागेल',
        },
        iconName: 'HelpCircle',
        voiceKeywords: {
          en: ['not sure', 'unsure'],
          hi: ['पता नहीं'],
          mr: ['माहित नाही'],
        },
      },
    ],
  },

  // 9. KERALA
  kerala: {
    stateName: 'Kerala',
    aliases: ['kerala', 'kl'],
    helpText: {
      en: 'Kerala Civil Supplies: 4 distinct color cards — Yellow (AAY - poorest), Pink (PHH - priority), Blue (Non-Priority Subsidy), and White (Non-Priority Non-Subsidy).',
      hi: 'केरल नागरिक आपूर्ति: 4 रंग-कोडेड कार्ड — पीला (AAY), गुलाबी (PHH), नीला (गैर-प्राथमिकता सब्सिडी), और सफेद (गैर-सब्सिडी)।',
      mr: 'केरळ नागरी पुरवठा: ४ रंगांची कार्डे — पिवळे (AAY), गुलाबी (PHH), निळे (बिगर-प्राधान्य अनुदान), आणि पांढरे (बिगर-अनुदानित).',
    },
    options: [
      {
        value: 'antyodaya_bpl',
        label: {
          en: 'Yellow Card / Antyodaya (മഞ്ഞ കാർഡ് / AAY)',
          hi: 'पीला कार्ड / अंत्योदय (മഞ്ഞ കാർഡ് / AAY)',
          mr: 'पिवळे कार्ड / अंत्योदय (മഞ്ഞ കാർഡ് / AAY)',
        },
        iconName: 'Award',
        description: {
          en: 'Poorest families; 30-35 kg free food grains monthly per card',
          hi: 'अति निर्धन परिवार; प्रति कार्ड 30-35 किलो मुफ्त खाद्यान्न',
          mr: 'अति निर्धन कुटुंबे; दरमहा ३०-३५ किलो मोफत धान्य',
        },
        voiceKeywords: {
          en: ['yellow card', 'manja card', 'aay', 'antyodaya'],
          hi: ['पीला कार्ड', 'अंत्योदय', 'एएवाई'],
          mr: ['पिवळे कार्ड', 'अंत्योदय'],
        },
      },
      {
        value: 'priority',
        label: {
          en: 'Pink Card / Priority Household (പിങ്ക് കാർഡ് / PHH)',
          hi: 'पिंक कार्ड / प्राथमिकता परिवार (പിങ്ക് കാർഡ് / PHH)',
          mr: 'गुलाबी कार्ड / प्राधान्य कुटुंब (പിങ്ക് കാർഡ് / PHH)',
        },
        iconName: 'Bookmark',
        description: {
          en: 'Priority household card; 4-5 kg free food grains per member monthly',
          hi: 'प्राथमिकता परिवार कार्ड; प्रति सदस्य 4-5 किलो मुफ्त खाद्यान्न',
          mr: 'प्राधान्य कुटुंब कार्ड; दरमहा प्रति व्यक्ती ४-५ किलो मोफत धान्य',
        },
        voiceKeywords: {
          en: ['pink card', 'phh', 'priority'],
          hi: ['पिंक कार्ड', 'गुलाबी कार्ड', 'पीएचएच'],
          mr: ['गुलाबी कार्ड', 'प्राधान्य'],
        },
      },
      {
        value: 'priority',
        label: {
          en: 'Blue Card / Non-Priority Subsidy (നീല കാർഡ്)',
          hi: 'नीला कार्ड / राज्य सब्सिडी कार्ड (നീല കാർഡ്)',
          mr: 'निळे कार्ड / राज्य अनुदानित कार्ड (നീല കാർഡ്)',
        },
        iconName: 'Bookmark',
        description: {
          en: 'State-subsidized food commodities at nominal subsidized rates',
          hi: 'रियायती दरों पर राज्य-सब्सिडी वाली खाद्य वस्तुएं',
          mr: 'सवलतीच्या दरात राज्य अनुदानित अन्नधान्य',
        },
        voiceKeywords: {
          en: ['blue card', 'neela card', 'subsidy'],
          hi: ['नीला कार्ड', 'सब्सिडी कार्ड'],
          mr: ['निळे कार्ड', 'अनुदानित कार्ड'],
        },
      },
      {
        value: 'none',
        label: {
          en: 'White Card / Non-Subsidy (വെള്ള കാർഡ് / General)',
          hi: 'सफेद कार्ड / गैर-सब्सिडी (വെള്ള കാർഡ് / सामान्य)',
          mr: 'पांढरे कार्ड / बिगर-अनुदानित (വെള്ള കാർഡ് / सर्वसाधारण)',
        },
        iconName: 'FileText',
        description: {
          en: 'Above poverty line non-subsidized household card (ID & residency proof)',
          hi: 'गरीबी रेखा से ऊपर गैर-सब्सिडी कार्ड',
          mr: 'दारिद्र्यरेषेवरील बिगर-अनुदानित कार्ड',
        },
        voiceKeywords: {
          en: ['white card', 'vella card', 'general', 'non subsidy'],
          hi: ['सफेद कार्ड', 'गैर सब्सिडी'],
          mr: ['पांढरे कार्ड', 'बिगर अनुदानित'],
        },
      },
      {
        value: 'unsure',
        label: {
          en: 'Not sure / Need to check',
          hi: 'पता नहीं / देखना पड़ेगा',
          mr: 'माहित नाही / तपासावे लागेल',
        },
        iconName: 'HelpCircle',
        voiceKeywords: {
          en: ['not sure', 'unsure'],
          hi: ['पता नहीं'],
          mr: ['माहित नाही'],
        },
      },
    ],
  },

  // 10. GUJARAT
  gujarat: {
    stateName: 'Gujarat',
    aliases: ['gujarat', 'gj'],
    helpText: {
      en: 'Gujarat Civil Supplies: NFSA Barcoded BPL/PHH cards receive subsidized grain & MA Amrutam/PM-JAY health cover; AAY receives 35 kg; APL-1 & APL-2 are general.',
      hi: 'गुजरात नागरिक आपूर्ति: एनएफएसए बारकोडेड बीपीएल/पीएचएच कार्ड रियायती अनाज व मा अमृतम/पीएम-जेएवाई पाते हैं; अंत्योदय को 35 किग्रा मिलता है।',
      mr: 'गुजरात नागरी पुरवठा: एनएफएसए बारकोडेड बीपीएल/पीएचएच कार्डधारक सवलतीचे धान्य आणि मा अमृतम/पीएम-जेएवाय मिळवतात; अंत्योदयला ३५ किलो मिळते.',
    },
    options: [
      {
        value: 'priority',
        label: {
          en: 'NFSA Priority / Barcoded BPL Card (પ્રાથમિકતા કુટુંબ)',
          hi: 'एनएफएसए प्राथमिकता / बारकोडेड बीपीएल कार्ड',
          mr: 'एनएफएसए प्राधान्य / बारकोडेड बीपीएल शिधापत्रिका',
        },
        iconName: 'Bookmark',
        description: {
          en: 'Subsidized food grains & MA Amrutam / Ayushman PM-JAY health coverage',
          hi: 'रियायती खाद्यान्न और मा अमृतम / आयुष्मान भारत स्वास्थ्य लाभ',
          mr: 'सवलतीचे धान्य आणि मा अमृतम / आयुष्यमान भारत आरोग्य कवच',
        },
        voiceKeywords: {
          en: ['bpl', 'phh', 'barcoded', 'nfsa gujarat'],
          hi: ['बीपीएल', 'पीएचएच', 'बारकोडेड'],
          mr: ['बीपीएल', 'बारकोडेड', 'प्राधान्य'],
        },
      },
      {
        value: 'antyodaya_bpl',
        label: {
          en: 'Antyodaya Anna Yojana (AAY Card / અંત્યોદય અન્ન યોજના)',
          hi: 'अंत्योदय अन्न योजना (AAY कार्ड / અંત્યોદય)',
          mr: 'अंत्योदय अन्न योजना (AAY कार्ड / અંત્યોદય)',
        },
        iconName: 'Award',
        description: {
          en: '35 kg free food grains monthly for poorest destitute households',
          hi: 'अति निर्धन परिवारों के लिए 35 किलोग्राम मुफ्त खाद्यान्न',
          mr: 'अति निर्धन कुटुंबांसाठी दरमहा ३५ किलो मोफत धान्य',
        },
        voiceKeywords: {
          en: ['antyodaya', 'aay', '35kg'],
          hi: ['अंत्योदय', 'एएवाई'],
          mr: ['अंत्योदय', 'एएवाय'],
        },
      },
      {
        value: 'none',
        label: {
          en: 'APL Card (APL-1 / APL-2 / સામાન્ય રેશનકાર્ડ)',
          hi: 'एपीएल कार्ड (APL-1 / APL-2 / सामान्य कार्ड)',
          mr: 'एपीएल कार्ड (APL-1 / APL-2 / सर्वसाधारण रेशनकार्ड)',
        },
        iconName: 'FileText',
        description: {
          en: 'Above poverty line card (APL-1 subsidised sugar/oil, APL-2 non-subsidised)',
          hi: 'गरीबी रेखा से ऊपर सामान्य पारिवारिक कार्ड',
          mr: 'दारिद्र्यरेषेवरील सर्वसाधारण कुटुंब कार्ड',
        },
        voiceKeywords: {
          en: ['apl', 'apl-1', 'apl-2', 'general'],
          hi: ['एपीएल', 'सामान्य कार्ड'],
          mr: ['एपीएल', 'सामान्य रेशनकार्ड'],
        },
      },
      {
        value: 'unsure',
        label: {
          en: 'Not sure / Need to check',
          hi: 'पता नहीं / देखना पड़ेगा',
          mr: 'माहित नाही / तपासावे लागेल',
        },
        iconName: 'HelpCircle',
        voiceKeywords: {
          en: ['not sure', 'unsure'],
          hi: ['पता नहीं'],
          mr: ['माहित नाही'],
        },
      },
    ],
  },

  // 11. RAJASTHAN
  rajasthan: {
    stateName: 'Rajasthan',
    aliases: ['rajasthan', 'rj'],
    helpText: {
      en: 'Rajasthan Food & Civil Supplies: BPL / State BPL cardholders receive subsidized food security & eligibility for Mukhyamantri Ayushman Arogya cover; AAY gets 35 kg.',
      hi: 'राजस्थान खाद्य एवं नागरिक आपूर्ति: बीपीएल / स्टेट बीपीएल धारक खाद्य सुरक्षा व मुख्यमंत्री आयुष्मान आरोग्य स्वास्थ्य बीमा हेतु पात्र हैं।',
      mr: 'राजस्थान अन्न व नागरी पुरवठा: बीपीएल / स्टेट बीपीएल धारक अन्न सुरक्षा व मुख्यमंत्री आयुष्यमान आरोग्य योजनेसाठी पात्र आहेत.',
    },
    options: [
      {
        value: 'priority',
        label: {
          en: 'BPL / State BPL Card (बीपीएल / स्टेट बीपीएल कार्ड)',
          hi: 'बीपीएल / राज्य बीपीएल कार्ड (खाद्य सुरक्षा पात्र)',
          mr: 'बीपीएल / स्टेट बीपीएल शिधापत्रिका (अन्न सुरक्षा पात्र)',
        },
        iconName: 'Bookmark',
        description: {
          en: 'Priority food security benefits & Mukhyamantri Ayushman health cover',
          hi: 'प्राथमिकता खाद्य सुरक्षा और मुख्यमंत्री आयुष्मान स्वास्थ्य सुरक्षा',
          mr: 'अन्न सुरक्षा लाभ आणि मुख्यमंत्री आयुष्यमान आरोग्य संरक्षण',
        },
        voiceKeywords: {
          en: ['bpl', 'state bpl', 'phh', 'food security'],
          hi: ['बीपीएल', 'स्टेट बीपीएल', 'खाद्य सुरक्षा'],
          mr: ['बीपीएल', 'स्टेट बीपीएल'],
        },
      },
      {
        value: 'antyodaya_bpl',
        label: {
          en: 'Antyodaya Anna Yojana (AAY Card / अंत्योदय)',
          hi: 'अंत्योदय अन्न योजना (AAY कार्ड / अंत्योदय)',
          mr: 'अंत्योदय अन्न योजना (AAY कार्ड / अंत्योदय)',
        },
        iconName: 'Award',
        description: {
          en: '35 kg free food grains monthly for poorest destitute households',
          hi: 'अति निर्धन परिवारों के लिए 35 किलो मुफ्त खाद्यान्न प्रतिमाह',
          mr: 'अति निर्धन कुटुंबांसाठी दरमहा ३५ किलो मोफत धान्य',
        },
        voiceKeywords: {
          en: ['antyodaya', 'aay', '35kg'],
          hi: ['अंत्योदय', 'एएवाई'],
          mr: ['अंत्योदय', 'एएवाय'],
        },
      },
      {
        value: 'none',
        label: {
          en: 'APL Card (सामान्य / गैर-सब्सिडी राशन कार्ड)',
          hi: 'एपीएल कार्ड (सामान्य / गैर-सब्सिडी)',
          mr: 'एपीएल कार्ड (सर्वसाधारण / बिगर-अनुदानित)',
        },
        iconName: 'FileText',
        description: {
          en: 'Above poverty line general card without food security subsidy',
          hi: 'खाद्य सुरक्षा सब्सिडी के बिना सामान्य पारिवारिक कार्ड',
          mr: 'अन्न सुरक्षा अनुदानाशिवाय सामान्य शिधापत्रिका',
        },
        voiceKeywords: {
          en: ['apl', 'general', 'non subsidy'],
          hi: ['एपीएल', 'सामान्य कार्ड'],
          mr: ['एपीएल', 'सामान्य'],
        },
      },
      {
        value: 'unsure',
        label: {
          en: 'Not sure / Need to check',
          hi: 'पता नहीं / देखना पड़ेगा',
          mr: 'माहित नाही / तपासावे लागेल',
        },
        iconName: 'HelpCircle',
        voiceKeywords: {
          en: ['not sure', 'unsure'],
          hi: ['पता नहीं'],
          mr: ['माहित नाही'],
        },
      },
    ],
  },

  // 12. HARYANA
  haryana: {
    stateName: 'Haryana',
    aliases: ['haryana', 'hr'],
    helpText: {
      en: 'Haryana PDS (PPP Parivar Pehchan Patra linked): Yellow BPL cards for family income < ₹1.80 Lakh; Pink AAY cards for < ₹1 Lakh; OPH cards are general APL.',
      hi: 'हरियाणा पीडीएस (परिवार पहचान पत्र लिंक): ₹1.80 लाख से कम आय पर पीला बीपीएल कार्ड; ₹1 लाख से कम पर गुलाबी अंत्योदय कार्ड; ओपीएच कार्ड सामान्य हैं।',
      mr: 'हरियाणा पीडीएस (परिवार पहचान पत्र संलग्न): ₹१.८० लाखांपेक्षा कमी उत्पन्नावर पिवळे बीपीएल कार्ड; ₹१ लाखापेक्षा कमीवर गुलाबी अंत्योदय कार्ड.',
    },
    options: [
      {
        value: 'priority',
        label: {
          en: 'Yellow BPL Card (पीला राशन कार्ड / PPP Income < ₹1.80L)',
          hi: 'पीला बीपीएल कार्ड (परिवार पहचान पत्र आय < ₹1.80 लाख)',
          mr: 'पिवळे बीपीएल कार्ड (PPP उत्पन्न < ₹१.८० लाख)',
        },
        iconName: 'Bookmark',
        description: {
          en: 'Subsidized rations + qualifies for Chirayu / Ayushman Bharat Haryana health cover',
          hi: 'रियायती राशन + चिरायु / आयुष्मान भारत हरियाणा स्वास्थ्य योजना पात्र',
          mr: 'सवलतीचे रेशन + चिरायू / आयुष्यमान भारत हरियाणा आरोग्य योजना पात्र',
        },
        voiceKeywords: {
          en: ['yellow card', 'bpl', 'ppp', 'peela card', 'chirayu'],
          hi: ['पीला कार्ड', 'बीपीएल', 'परिवार पहचान', 'चिरायु'],
          mr: ['पिवळे कार्ड', 'बीपीएल', 'चिरायू'],
        },
      },
      {
        value: 'antyodaya_bpl',
        label: {
          en: 'Pink AAY Card (गुलाबी अंत्योदय कार्ड / Income < ₹1L)',
          hi: 'गुलाबी अंत्योदय कार्ड (AAY / पारिवारिक आय < ₹1 लाख)',
          mr: 'गुलाबी अंत्योदय कार्ड (AAY / कौटुंबिक उत्पन्न < ₹१ लाख)',
        },
        iconName: 'Award',
        description: {
          en: '35 kg free food grains monthly for poorest destitute households',
          hi: 'अति निर्धन परिवारों के लिए 35 किलोग्राम मुफ्त खाद्यान्न',
          mr: 'अति निर्धन कुटुंबांसाठी दरमहा ३५ किलो मोफत धान्य',
        },
        voiceKeywords: {
          en: ['pink card', 'aay', 'gulabi card', 'antyodaya'],
          hi: ['गुलाबी कार्ड', 'अंत्योदय', 'एएवाई'],
          mr: ['गुलाबी कार्ड', 'अंत्योदय'],
        },
      },
      {
        value: 'none',
        label: {
          en: 'OPH Card (अन्य प्राथमिकता / हरा-खाकी कार्ड / APL)',
          hi: 'ओपीएच कार्ड (हरा-खाकी कार्ड / सामान्य गैर-बीपीएल)',
          mr: 'ओपीएच कार्ड (हिरवे-खाकी कार्ड / सामान्य एपीएल)',
        },
        iconName: 'FileText',
        description: {
          en: 'Other Priority Household / Non-BPL general ration card',
          hi: 'अन्य प्राथमिकता परिवार / गैर-बीपीएल सामान्य राशन कार्ड',
          mr: 'बिगर-बीपीएल सर्वसाधारण शिधापत्रिका',
        },
        voiceKeywords: {
          en: ['oph', 'green card', 'apl', 'non bpl'],
          hi: ['ओपीएच', 'हरा कार्ड', 'एपीएल'],
          mr: ['ओपीएच', 'हिरवे कार्ड', 'एपीएल'],
        },
      },
      {
        value: 'unsure',
        label: {
          en: 'Not sure / Need to check',
          hi: 'पता नहीं / देखना पड़ेगा',
          mr: 'माहित नाही / तपासावे लागेल',
        },
        iconName: 'HelpCircle',
        voiceKeywords: {
          en: ['not sure', 'unsure'],
          hi: ['पता नहीं'],
          mr: ['माहित नाही'],
        },
      },
    ],
  },

  // 13. MADHYA PRADESH
  'madhya-pradesh': {
    stateName: 'Madhya Pradesh',
    aliases: ['madhya pradesh', 'mp'],
    helpText: {
      en: 'MP Food & Samagra Portal: Eligible families hold a Samagra Patrata Parchi (पात्रता पर्ची) for priority grain; Destitute families hold Yellow AAY cards.',
      hi: 'मध्य प्रदेश खाद्य एवं समग्र: पात्र परिवारों के पास प्राथमिकता अनाज हेतु समग्र पात्रता पर्ची होती है; अति निर्धन के पास पीला अंत्योदय कार्ड होता है।',
      mr: 'मध्य प्रदेश अन्न व समग्र: पात्र कुटुंबांकडे प्राधान्य धान्यासाठी समग्र पात्रता पावती असते; अति निर्धन कुटुंबांकडे पिवळे अंत्योदय कार्ड असते.',
    },
    options: [
      {
        value: 'priority',
        label: {
          en: 'Samagra Patrata Parchi (समग्र पात्रता पर्ची / BPL-PHH)',
          hi: 'समग्र पात्रता पर्ची (राशन पात्रता पर्ची / पीएचएच)',
          mr: 'समग्र पात्रता पावती (रेशन पात्रता पावती / PHH)',
        },
        iconName: 'Bookmark',
        description: {
          en: '5 kg free food grains per member monthly via Samagra biometric PDS',
          hi: 'समग्र बायोमेट्रिक पीडीएस के माध्यम से प्रति सदस्य 5 किग्रा मुफ्त अनाज',
          mr: 'समग्र बायोमेट्रिक पीडीएस द्वारे दरमहा प्रति व्यक्ती ५ किलो मोफत धान्य',
        },
        voiceKeywords: {
          en: ['patrata parchi', 'samagra', 'bpl', 'phh', 'parchi'],
          hi: ['पात्रता पर्ची', 'समग्र', 'बीपीएल', 'पर्ची'],
          mr: ['पात्रता पावती', 'समग्र', 'बीपीएल'],
        },
      },
      {
        value: 'antyodaya_bpl',
        label: {
          en: 'Antyodaya Card (पीला राशन कार्ड / AAY)',
          hi: 'अंत्योदय कार्ड (पीला राशन कार्ड / AAY)',
          mr: 'अंत्योदय कार्ड (पिवळी शिधापत्रिका / AAY)',
        },
        iconName: 'Award',
        description: {
          en: '35 kg free food grains monthly for poorest destitute households',
          hi: 'अति निर्धन परिवारों के लिए 35 किग्रा मुफ्त खाद्यान्न',
          mr: 'अति निर्धन कुटुंबांसाठी दरमहा ३५ किलो मोफत धान्य',
        },
        voiceKeywords: {
          en: ['antyodaya', 'aay', 'peela card', 'yellow card'],
          hi: ['अंत्योदय', 'पीला कार्ड', 'एएवाई'],
          mr: ['अंत्योदय', 'पिवळे कार्ड'],
        },
      },
      {
        value: 'none',
        label: {
          en: 'General / Non-Eligible (सामान्य राशन कार्ड / APL)',
          hi: 'सामान्य राशन कार्ड (गैर-सब्सिडी / एपीएल)',
          mr: 'सर्वसाधारण शिधापत्रिका (बिगर-अनुदानित / APL)',
        },
        iconName: 'FileText',
        description: {
          en: 'General household without active Samagra food subsidy slip',
          hi: 'सक्रिय समग्र खाद्य सब्सिडी पर्ची के बिना सामान्य परिवार',
          mr: 'समग्र अन्न अनुदानाशिवाय सामान्य कुटुंब',
        },
        voiceKeywords: {
          en: ['general', 'apl', 'non subsidy'],
          hi: ['सामान्य कार्ड', 'एपीएल'],
          mr: ['सामान्य कार्ड', 'एपीएल'],
        },
      },
      {
        value: 'unsure',
        label: {
          en: 'Not sure / Need to check',
          hi: 'पता नहीं / देखना पड़ेगा',
          mr: 'माहित नाही / तपासावे लागेल',
        },
        iconName: 'HelpCircle',
        voiceKeywords: {
          en: ['not sure', 'unsure'],
          hi: ['पता नहीं'],
          mr: ['माहित नाही'],
        },
      },
    ],
  },

  // 14. BIHAR
  bihar: {
    stateName: 'Bihar',
    aliases: ['bihar', 'br'],
    helpText: {
      en: 'Bihar Food & Consumer Protection: Priority Households hold PHH (Yellow-White cards for 5 kg/member); Antyodaya hold Red cards (35 kg/family).',
      hi: 'बिहार खाद्य एवं उपभोक्ता संरक्षण: प्राथमिकता परिवार पीएचएच कार्ड (पीला-सफेद) रखते हैं; अंत्योदय परिवार लाल कार्ड (35 किग्रा) रखते हैं।',
      mr: 'बिहार अन्न व ग्राहक संरक्षण: प्राधान्य कुटुंबे पीएचएच कार्ड (पिवळे-पांढरे) बाळगतात; अंत्योदय कुटुंबे लाल कार्ड (३५ किलो) बाळगतात.',
    },
    options: [
      {
        value: 'priority',
        label: {
          en: 'Priority Household PHH (पीला-सफेद राशन कार्ड / PHH)',
          hi: 'प्राथमिकता परिवार (पीला-सफेद राशन कार्ड / पीएचएच)',
          mr: 'प्राधान्य कुटुंब (पिवळे-पांढरे शिधापत्रिका / PHH)',
        },
        iconName: 'Bookmark',
        description: {
          en: '5 kg free food grains per member monthly under NFSA Bihar',
          hi: 'बिहार एनएफएसए के तहत प्रति सदस्य 5 किग्रा मुफ्त खाद्यान्न',
          mr: 'बिहार एनएफएसए अंतर्गत दरमहा प्रति व्यक्ती ५ किलो मोफत धान्य',
        },
        voiceKeywords: {
          en: ['phh', 'peela card', 'priority', 'bihar ration'],
          hi: ['पीएचएच', 'पीला कार्ड', 'प्राथमिकता'],
          mr: ['पीएचएच', 'पिवळे कार्ड', 'प्राधान्य'],
        },
      },
      {
        value: 'antyodaya_bpl',
        label: {
          en: 'Antyodaya AAY (लाल राशन कार्ड / Red Card)',
          hi: 'अंत्योदय कार्ड (लाल राशन कार्ड / AAY)',
          mr: 'अंत्योदय कार्ड (लाल शिधापत्रिका / AAY)',
        },
        iconName: 'Award',
        description: {
          en: '35 kg free food grains monthly per card for poorest destitute households',
          hi: 'अति निर्धन परिवारों के लिए 35 किलोग्राम मुफ्त खाद्यान्न प्रतिमाह',
          mr: 'अति निर्धन कुटुंबांसाठी दरमहा ३५ किलो मोफत धान्य',
        },
        voiceKeywords: {
          en: ['laal card', 'red card', 'aay', 'antyodaya'],
          hi: ['लाल कार्ड', 'अंत्योदय', 'रेड कार्ड'],
          mr: ['लाल कार्ड', 'अंत्योदय'],
        },
      },
      {
        value: 'none',
        label: {
          en: 'Non-Subsidized / APL (सफेद या सामान्य कार्ड)',
          hi: 'गैर-सब्सिडी कार्ड (सफेद या सामान्य राशन कार्ड / एपीएल)',
          mr: 'बिगर-अनुदानित कार्ड (पांढरे किंवा सामान्य शिधापत्रिका / APL)',
        },
        iconName: 'FileText',
        description: {
          en: 'Above poverty line non-subsidized household card or no card',
          hi: 'गरीबी रेखा से ऊपर सामान्य पारिवारिक कार्ड',
          mr: 'दारिद्र्यरेषेवरील सर्वसाधारण शिधापत्रिका',
        },
        voiceKeywords: {
          en: ['apl', 'white card', 'non subsidy', 'none'],
          hi: ['सफेद कार्ड', 'एपीएल', 'गैर सब्सिडी'],
          mr: ['पांढरे कार्ड', 'एपीएल'],
        },
      },
      {
        value: 'unsure',
        label: {
          en: 'Not sure / Need to check',
          hi: 'पता नहीं / देखना पड़ेगा',
          mr: 'माहित नाही / तपासावे लागेल',
        },
        iconName: 'HelpCircle',
        voiceKeywords: {
          en: ['not sure', 'unsure'],
          hi: ['पता नहीं'],
          mr: ['माहित नाही'],
        },
      },
    ],
  },

  // 15. ODISHA
  odisha: {
    stateName: 'Odisha',
    aliases: ['odisha', 'orissa', 'od'],
    helpText: {
      en: 'Odisha FS&CW: NFSA cards are PHH & AAY; Odisha also runs SFSS Green Card (State Food Security Scheme) for left-out needy families at ₹1/kg.',
      hi: 'ओडिशा खाद्य आपूर्ति: एनएफएसए कार्ड पीएचएच और एएवाई हैं; छूटे हुए परिवारों हेतु राज्य एसएफएसएस ग्रीन कार्ड चलाता है।',
      mr: 'ओडिशा अन्न पुरवठा: एनएफएसए कार्ड पीएचएच आणि एएवाय आहेत; वंचित कुटुंबांसाठी राज्य एसएफएसएस ग्रीन कार्ड चालवते.',
    },
    options: [
      {
        value: 'priority',
        label: {
          en: 'NFSA Priority Household (PHH Card / ପ୍ରାଥମିକତା କାର୍ଡ)',
          hi: 'एनएफएसए प्राथमिकता परिवार (पीएचएच कार्ड)',
          mr: 'एनएफएसए प्राधान्य कुटुंब (PHH शिधापत्रिका)',
        },
        iconName: 'Bookmark',
        description: {
          en: '5 kg free food grains per member monthly + BSKY / PM-JAY health access',
          hi: '5 किलो मुफ्त अनाज प्रति सदस्य + बीएसकेवाई स्वास्थ्य लाभ',
          mr: 'दरमहा प्रति व्यक्ती ५ किलो मोफत धान्य + बीएसकेवाय आरोग्य लाभ',
        },
        voiceKeywords: {
          en: ['phh', 'priority', 'nfsa card', 'odisha phh'],
          hi: ['पीएचएच', 'प्राथमिकता', 'एनएफएसए कार्ड'],
          mr: ['पीएचएच', 'प्राधान्य कार्ड'],
        },
      },
      {
        value: 'antyodaya_bpl',
        label: {
          en: 'Antyodaya Anna Yojana (AAY Card / ଅନ୍ତ୍ୟୋଦୟ)',
          hi: 'अंत्योदय अन्न योजना (AAY कार्ड / अंत्योदय)',
          mr: 'अंत्योदय अन्न योजना (AAY कार्ड / अंत्योदय)',
        },
        iconName: 'Award',
        description: {
          en: '35 kg free food grains monthly for poorest destitute households',
          hi: 'अति निर्धन परिवारों के लिए 35 किलोग्राम मुफ्त खाद्यान्न',
          mr: 'अति निर्धन कुटुंबांसाठी दरमहा ३५ किलो मोफत धान्य',
        },
        voiceKeywords: {
          en: ['antyodaya', 'aay', '35kg'],
          hi: ['अंत्योदय', 'एएवाई'],
          mr: ['अंत्योदय', 'एएवाय'],
        },
      },
      {
        value: 'priority',
        label: {
          en: 'SFSS Green Card (State Food Security Scheme / ସବୁଜ କାର୍ଡ)',
          hi: 'एसएफएसएस ग्रीन कार्ड (ओडिशा राज्य खाद्य सुरक्षा योजना)',
          mr: 'एसएफएसएस ग्रीन कार्ड (ओडिशा राज्य अन्न सुरक्षा योजना)',
        },
        iconName: 'Bookmark',
        description: {
          en: 'Odisha state-sponsored ₹1/kg rice scheme for left-out needy families',
          hi: 'छूटे हुए जरूरतमंद परिवारों के लिए ओडिशा राज्य प्रायोजित खाद्यान्न',
          mr: 'वंचित गरजू कुटुंबांसाठी ओडिशा राज्य प्रायोजित अन्न योजना',
        },
        voiceKeywords: {
          en: ['sfss', 'green card', 'state scheme', 'sabuja'],
          hi: ['एसएफएसएस', 'ग्रीन कार्ड', 'राज्य योजना'],
          mr: ['एसएफएसएस', 'हिरवे कार्ड', 'राज्य योजना'],
        },
      },
      {
        value: 'none',
        label: {
          en: 'Non-NFSA / General Card (ସାଧାରଣ କାର୍ଡ / APL)',
          hi: 'गैर-एनएफएसए / सामान्य कार्ड (एपीएल)',
          mr: 'बिगर-एनएफएसए / सर्वसाधारण शिधापत्रिका (APL)',
        },
        iconName: 'FileText',
        description: {
          en: 'Above poverty line non-subsidized general family card',
          hi: 'गरीबी रेखा से ऊपर सामान्य पारिवारिक कार्ड',
          mr: 'दारिद्र्यरेषेवरील सर्वसाधारण शिधापत्रिका',
        },
        voiceKeywords: {
          en: ['general', 'non nfsa', 'apl'],
          hi: ['सामान्य कार्ड', 'एपीएल'],
          mr: ['सामान्य कार्ड', 'एपीएल'],
        },
      },
      {
        value: 'unsure',
        label: {
          en: 'Not sure / Need to check',
          hi: 'पता नहीं / देखना पड़ेगा',
          mr: 'माहित नाही / तपासावे लागेल',
        },
        iconName: 'HelpCircle',
        voiceKeywords: {
          en: ['not sure', 'unsure'],
          hi: ['पता नहीं'],
          mr: ['माहित नाही'],
        },
      },
    ],
  },

  // 16. PUNJAB
  punjab: {
    stateName: 'Punjab',
    aliases: ['punjab', 'pb'],
    helpText: {
      en: 'Punjab Food & Civil Supplies: Smart Ration Card (Atta-Dal Scheme) for priority households; Antyodaya for destitute households (35 kg/family).',
      hi: 'पंजाब खाद्य एवं नागरिक आपूर्ति: प्राथमिकता परिवारों हेतु स्मार्ट राशन कार्ड (आटा-दाल योजना); अंत्योदय परिवारों हेतु 35 किग्रा/परिवार।',
      mr: 'पंजाब अन्न व नागरी पुरवठा: प्राधान्य कुटुंबांसाठी स्मार्ट रेशन कार्ड (आटा-डाळ योजना); अंत्योदय कुटुंबांसाठी ३५ किलो धान्य.',
    },
    options: [
      {
        value: 'priority',
        label: {
          en: 'Smart Ration Card (Atta-Dal Scheme / ਸਮਾਰਟ ਰਾਸ਼ਨ ਕਾਰਡ)',
          hi: 'स्मार्ट राशन कार्ड (आटा-दाल योजना / पीएचएच)',
          mr: 'स्मार्ट रेशन कार्ड (आटा-डाळ योजना / PHH)',
        },
        iconName: 'Bookmark',
        description: {
          en: 'Subsidized wheat & dal under Punjab Atta-Dal Scheme via Smart Card',
          hi: 'स्मार्ट कार्ड के माध्यम से रियायती गेहूं और दाल',
          mr: 'स्मार्ट कार्डद्वारे सवलतीचे गहू आणि डाळ वाटप',
        },
        voiceKeywords: {
          en: ['smart ration card', 'atta dal', 'phh', 'punjab ration'],
          hi: ['स्मार्ट राशन कार्ड', 'आटा दाल', 'पीएचएच'],
          mr: ['स्मार्ट रेशन कार्ड', 'आटा डाळ'],
        },
      },
      {
        value: 'antyodaya_bpl',
        label: {
          en: 'Antyodaya Anna Yojana (AAY Card / ਅੰਤੋਦਿਆ)',
          hi: 'अंत्योदय अन्न योजना (AAY कार्ड / अंत्योदय)',
          mr: 'अंत्योदय अन्न योजना (AAY कार्ड / अंत्योदय)',
        },
        iconName: 'Award',
        description: {
          en: '35 kg free food grains monthly for poorest destitute households',
          hi: 'अति निर्धन परिवारों के लिए 35 किलोग्राम मुफ्त खाद्यान्न',
          mr: 'अति निर्धन कुटुंबांसाठी दरमहा ३५ किलो मोफत धान्य',
        },
        voiceKeywords: {
          en: ['antyodaya', 'aay', '35kg'],
          hi: ['अंत्योदय', 'एएवाई'],
          mr: ['अंत्योदय', 'एएवाय'],
        },
      },
      {
        value: 'none',
        label: {
          en: 'Non-NFSA / General Card (ਸਧਾਰਨ ਕਾਰਡ / APL)',
          hi: 'गैर-एनएफएसए / सामान्य कार्ड (एपीएल)',
          mr: 'बिगर-एनएफएसए / सर्वसाधारण शिधापत्रिका (APL)',
        },
        iconName: 'FileText',
        description: {
          en: 'Non-subsidized general family card or no active smart ration card',
          hi: 'बिना सब्सिडी वाला सामान्य पारिवारिक कार्ड',
          mr: 'बिगर-अनुदानित सर्वसाधारण शिधापत्रिका',
        },
        voiceKeywords: {
          en: ['general', 'non nfsa', 'apl'],
          hi: ['सामान्य कार्ड', 'एपीएल'],
          mr: ['सामान्य कार्ड', 'एपीएल'],
        },
      },
      {
        value: 'unsure',
        label: {
          en: 'Not sure / Need to check',
          hi: 'पता नहीं / देखना पड़ेगा',
          mr: 'माहित नाही / तपासावे लागेल',
        },
        iconName: 'HelpCircle',
        voiceKeywords: {
          en: ['not sure', 'unsure'],
          hi: ['पता नहीं'],
          mr: ['माहित नाही'],
        },
      },
    ],
  },
};

/**
 * Normalizes a state name string for key lookup.
 */
function normalizeStateKey(stateName?: string): string {
  if (!stateName) return '';
  return stateName
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/**
 * Returns state-tailored ration card options if available, otherwise returns
 * the national standard NFSA options.
 */
export function getRationCardOptionsForState(stateName?: string): QuestionOption[] {
  if (!stateName || stateName === 'Other State') {
    return DEFAULT_NFSA_RATION_OPTIONS;
  }

  const key = normalizeStateKey(stateName);

  // Direct lookup
  if (STATE_RATION_CARD_MAP[key]) {
    return STATE_RATION_CARD_MAP[key].options;
  }

  // Alias lookup
  for (const config of Object.values(STATE_RATION_CARD_MAP)) {
    if (
      config.aliases.includes(key) ||
      config.stateName.toLowerCase() === stateName.toLowerCase()
    ) {
      return config.options;
    }
  }

  return DEFAULT_NFSA_RATION_OPTIONS;
}

/**
 * Returns state-specific localized help text explaining the local card types, colors, and rules.
 */
export function getRationCardHelpTextForState(stateName?: string): LocalizedString {
  if (!stateName || stateName === 'Other State') {
    return {
      en: 'Helps identify eligibility for Ayushman Bharat (PM-JAY), food subsidies, and welfare benefits.',
      hi: 'आयुष्मान भारत (PM-JAY) और खाद्य सुरक्षा योजनाओं की पात्रता पहचानने में सहायक।',
      mr: 'आयुष्मान भारत (PM-JAY) आणि अन्नधान्य योजनांच्या पात्रतेसाठी उपयुक्त.',
    };
  }

  const key = normalizeStateKey(stateName);
  if (STATE_RATION_CARD_MAP[key]) {
    return STATE_RATION_CARD_MAP[key].helpText;
  }

  for (const config of Object.values(STATE_RATION_CARD_MAP)) {
    if (
      config.aliases.includes(key) ||
      config.stateName.toLowerCase() === stateName.toLowerCase()
    ) {
      return config.helpText;
    }
  }

  return {
    en: `Showing Food Security (NFSA) cards recognized in ${stateName}. Used for PM-JAY and state welfare schemes.`,
    hi: `${stateName} में मान्य राष्ट्रीय खाद्य सुरक्षा (NFSA) राशन कार्ड विकल्प।`,
    mr: `${stateName} मध्ये ग्राह्य धरल्या जाणाऱ्या राष्ट्रीय अन्न सुरक्षा (NFSA) शिधापत्रिका.`,
  };
}

/**
 * Returns whether a state has a custom food security card taxonomy.
 */
export function hasCustomStateRationCards(stateName?: string): boolean {
  if (!stateName || stateName === 'Other State') return false;
  const key = normalizeStateKey(stateName);
  if (STATE_RATION_CARD_MAP[key]) return true;
  for (const config of Object.values(STATE_RATION_CARD_MAP)) {
    if (
      config.aliases.includes(key) ||
      config.stateName.toLowerCase() === stateName.toLowerCase()
    ) {
      return true;
    }
  }
  return false;
}
