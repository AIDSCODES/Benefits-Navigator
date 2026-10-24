/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserProfile, SupportedLanguage } from '../lib/engine/types.ts';

export interface QuestionOption {
  value: string;
  label: Record<string, string | undefined> & { en: string; hi: string; mr: string };
  iconName: string;
  description?: Record<string, string | undefined> & { en: string; hi: string; mr: string };
  voiceKeywords: Record<string, string[] | undefined> & { en: string[]; hi: string[]; mr: string[] };
}

export interface QuestionConfig {
  id: keyof UserProfile;
  field: keyof UserProfile;
  title: Record<string, string | undefined> & { en: string; hi: string; mr: string };
  helpText?: Record<string, string | undefined> & { en: string; hi: string; mr: string };
  isOptional: boolean;
  options: QuestionOption[];
}

import { STATES_AND_UTS_DATA } from './statesData.ts';

export const QUESTIONS: QuestionConfig[] = [
  {
    id: 'state',
    field: 'state',
    title: {
      en: 'What state do you live in?',
      hi: 'आप किस राज्य में रहते हैं?',
      mr: 'आपण कोणत्या राज्यात राहता?',
    },
    helpText: {
      en: 'Choose your state to discover state-sponsored benefits and citizen portal services across all 28 states & 8 UTs.',
      hi: 'सभी 28 राज्यों व 8 केंद्र शासित प्रदेशों की राज्य-स्तरीय योजनाओं के लिए अपना राज्य चुनें।',
      mr: 'सर्व २८ राज्ये आणि ८ केंद्रशासित प्रदेशांमधील राज्यस्तरीय योजना व पोर्टल शोधण्यासाठी आपले राज्य निवडा.',
    },
    isOptional: false,
    options: [
      ...STATES_AND_UTS_DATA.map((state) => ({
        value: state.name,
        label: {
          ...state.localizedName,
          en: state.localizedName.en || state.name,
          hi: state.localizedName.hi || state.name,
          mr: state.localizedName.mr || state.name,
        },
        iconName: 'MapPin',
        description: {
          en: `${state.type === 'union_territory' ? 'UT' : 'State'} · ${state.portal.name}`,
          hi: `${state.type === 'union_territory' ? 'केंद्र शासित' : 'राज्य'} · ${state.portal.name}`,
          mr: `${state.type === 'union_territory' ? 'केंद्रशासित' : 'राज्य'} · ${state.portal.name}`,
        },
        voiceKeywords: {
          en: [
            state.name.toLowerCase(),
            state.code.toLowerCase(),
            state.capital.toLowerCase(),
          ],
          hi: [state.localizedName.hi?.toLowerCase() || state.name.toLowerCase()],
          mr: [state.localizedName.mr?.toLowerCase() || state.name.toLowerCase()],
        },
      })),
      {
        value: 'Other State',
        label: { en: 'Other State / UT', hi: 'अन्य राज्य / केंद्र शासित', mr: 'इतर राज्य / केंद्रशासित प्रदेश' },
        iconName: 'Compass',
        voiceKeywords: {
          en: ['other', 'elsewhere'],
          hi: ['अन्य', 'दूसरा'],
          mr: ['इतर'],
        },
      },
    ],
  },

  {
    id: 'occupation',
    field: 'occupation',
    title: {
      en: 'What is your primary livelihood or daily work?',
      hi: 'आपकी मुख्य आजीविका या दैनिक काम क्या है?',
      mr: 'आपला मुख्य व्यवसाय किंवा दैनंदिन काम कोणते?',
    },
    helpText: {
      en: 'Helps find occupation-tailored schemes like PM-KISAN, PM SVANidhi, or student scholarships.',
      hi: 'यह किसान, रेहड़ी-पटरी या छात्र योजनाओं का पता लगाने में मदद करता है।',
      mr: 'शेतकरी, फेरीवाला किंवा विद्यार्थी योजना शोधण्यासाठी मदत होते.',
    },
    isOptional: false,
    options: [
      {
        value: 'farmer',
        label: {
          en: 'Farmer / Agricultural Worker',
          hi: 'किसान / कृषि कार्य',
          mr: 'शेतकरी / शेती काम',
        },
        iconName: 'Sprout',
        description: {
          en: 'Cultivating own land or tenant agricultural labor',
          hi: 'अपनी जमीन पर खेती या बटाईदारी',
          mr: 'स्वतःच्या शेतात किंवा शेतमजुरी',
        },
        voiceKeywords: {
          en: ['farmer', 'farming', 'kisan', 'agriculture'],
          hi: ['किसान', 'खेती', 'कृषि'],
          mr: ['शेतकरी', 'शेती', 'कृषी'],
        },
      },
      {
        value: 'street_vendor',
        label: {
          en: 'Street Vendor / Hawker / Cart Puller',
          hi: 'रेहड़ी-पटरी / फेरीवाला / ठेला चालक',
          mr: 'रस्त्यावरील फेरीवाला / हातगाडी चालक',
        },
        iconName: 'ShoppingBag',
        description: {
          en: 'Selling vegetables, fruits, tea, snacks, or wares',
          hi: 'फल, सब्जी, चाय, नाश्ता या फेरी लगाकर सामान बेचना',
          mr: 'भाजीपाला, फळे, चहा किंवा हातगाडीवर विक्री',
        },
        voiceKeywords: {
          en: ['street vendor', 'hawker', 'thela', 'vendor', 'cart'],
          hi: ['रेहड़ी', 'पटरी', 'ठेला', 'फेरीवाला', 'दुकानदार'],
          mr: ['फेरीवाला', 'हातगाडी', 'विक्रेता'],
        },
      },
      {
        value: 'daily_wage',
        label: {
          en: 'Daily Wage / Construction / Informal Labor',
          hi: 'दिहाड़ी मजदूर / निर्माण श्रमिक / असंगठित काम',
          mr: 'दैनिक मजुरी / बांधकाम कामगार / असंघटित श्रम',
        },
        iconName: 'Hammer',
        description: {
          en: 'Earning daily or weekly through physical labor',
          hi: 'दैनिक या साप्ताहिक पारिश्रमिक पर मजदूरी',
          mr: 'रोजंदारीवर किंवा कंत्राटी पद्धतीने काम करणारे',
        },
        voiceKeywords: {
          en: ['daily wage', 'labor', 'mazdoor', 'construction'],
          hi: ['मजदूर', 'दिहाड़ी', 'श्रमिक'],
          mr: ['मजूर', 'रोजंदारी', 'कामगार'],
        },
      },
      {
        value: 'student',
        label: {
          en: 'Student (School, College, Degree)',
          hi: 'विद्यार्थी (स्कूल, कॉलेज, उच्च शिक्षा)',
          mr: 'विद्यार्थी (शाळा, कॉलेज, पदवी शिक्षण)',
        },
        iconName: 'GraduationCap',
        description: {
          en: 'Actively studying in Class 10+, ITI, Diploma, or College',
          hi: 'कक्षा 11वीं, आईटीआई, कॉलेज या डिग्री में अध्ययनरत',
          mr: 'इयत्ता ११ वी, आयटीआय, पदविका किंवा महाविद्यालयात शिकत असलेले',
        },
        voiceKeywords: {
          en: ['student', 'studying', 'college', 'school'],
          hi: ['विद्यार्थी', 'छात्र', 'पढ़ाई', 'कॉलेज'],
          mr: ['विद्यार्थी', 'शिक्षण', 'कॉलेज'],
        },
      },
      {
        value: 'homemaker',
        label: {
          en: 'Homemaker (Managing Home & Care)',
          hi: 'गृहणी (घर और परिवार की देखभाल)',
          mr: 'गृहिणी (घरकाम व कुटुंब सांभाळणे)',
        },
        iconName: 'Home',
        description: {
          en: 'Managing household tasks and domestic care',
          hi: 'घर और बच्चों की जिम्मेदारी',
          mr: 'घरातील कामकाज व कुटुंब सांभाळणे',
        },
        voiceKeywords: {
          en: ['homemaker', 'housewife'],
          hi: ['गृहणी', 'घर'],
          mr: ['गृहिणी', 'घरकाम'],
        },
      },
      {
        value: 'unemployed',
        label: {
          en: 'Unemployed / Seeking Work / Destitute',
          hi: 'बेरोजगार / काम की तलाश / निराधार',
          mr: 'बेरोजगार / कामाच्या शोधात / निराधार',
        },
        iconName: 'UserX',
        description: {
          en: 'No regular income source or destitute condition',
          hi: 'वर्तमान में कोई नियमित आमदनी का साधन नहीं',
          mr: 'सध्या उत्पन्नाचे कोणतेही साधन नाही',
        },
        voiceKeywords: {
          en: ['unemployed', 'no job', 'destitute', 'seeking work'],
          hi: ['बेरोजगार', 'काम नहीं', 'निराधार'],
          mr: ['बेरोजगार', 'काम नाही', 'निराधार'],
        },
      },
      {
        value: 'salaried',
        label: {
          en: 'Salaried / Formal Employee',
          hi: 'वेतनभोगी / स्थायी कर्मचारी',
          mr: 'पगारदार / नोकरदार कर्मचारी',
        },
        iconName: 'Briefcase',
        description: {
          en: 'Regular monthly salary with formal employer',
          hi: 'मासिक वेतन वाली नियमित नौकरी',
          mr: 'दरमहा निश्चित पगार असलेली नोकरी',
        },
        voiceKeywords: {
          en: ['salaried', 'job', 'employee', 'office'],
          hi: ['नौकरी', 'वेतन', 'सैलरी'],
          mr: ['नोकरी', 'पगारदार'],
        },
      },
    ],
  },

  {
    id: 'ageBand',
    field: 'ageBand',
    title: {
      en: 'What is your age band?',
      hi: 'आपकी आयु किस वर्ग में आती है?',
      mr: 'आपले वय कोणत्या वयोगटात येते?',
    },
    helpText: {
      en: 'We ask for age bands rather than exact birthdates to safeguard your privacy.',
      hi: 'हम आपकी गोपनीयता की रक्षा के लिए सटीक जन्म तिथि नहीं पूछते।',
      mr: 'गोपनीयतेसाठी आम्ही जन्मदिनांक न विचारता केवळ वयोगट विचारतो.',
    },
    isOptional: false,
    options: [
      {
        value: '0_17',
        label: { en: 'Under 18 years', hi: '18 वर्ष से कम', mr: '१८ वर्षांखालील' },
        iconName: 'Baby',
        description: { en: 'Child or adolescent', hi: 'नाबालिग', mr: 'अज्ञान / अल्पवयीन' },
        voiceKeywords: {
          en: ['minor', 'under eighteen', 'child'],
          hi: ['अठारह से कम', 'बच्चा', 'नाबालिग'],
          mr: ['अठरापेक्षा कमी', 'लहान'],
        },
      },
      {
        value: '18_35',
        label: { en: '18 – 35 years', hi: '18 से 35 वर्ष', mr: '१८ ते ३५ वर्षे' },
        iconName: 'User',
        description: { en: 'Young adult', hi: 'युवा वर्ग', mr: 'तरुण वर्ग' },
        voiceKeywords: {
          en: ['young', 'eighteen to thirty-five', 'twenty', 'thirty'],
          hi: ['अठारह से पैंतीस', 'युवा', 'जवान'],
          mr: ['अठरा ते पस्तीस', 'तरुण'],
        },
      },
      {
        value: '36_50',
        label: { en: '36 – 50 years', hi: '36 से 50 वर्ष', mr: '३६ ते ५० वर्षे' },
        iconName: 'UserCheck',
        description: { en: 'Middle age', hi: 'मध्यम आयु', mr: 'मध्यमवयीन' },
        voiceKeywords: {
          en: ['thirty-six to fifty', 'forty'],
          hi: ['छत्तीस से पचास', 'चालीस'],
          mr: ['छत्तीस ते पन्नास', 'चाळीस'],
        },
      },
      {
        value: '51_59',
        label: { en: '51 – 59 years', hi: '51 से 59 वर्ष', mr: '५१ ते ५९ वर्षे' },
        iconName: 'UserPlus',
        description: { en: 'Pre-retirement', hi: 'प्रौढ़ आयु', mr: 'ज्येष्ठ पूर्व' },
        voiceKeywords: {
          en: ['fifty-one to fifty-nine', 'fifty'],
          hi: ['इक्यावन से उनसठ', 'पचास'],
          mr: ['एक्कावन्न ते एकोणसाठ'],
        },
      },
      {
        value: '60_plus',
        label: { en: '60 years or above', hi: '60 वर्ष या अधिक', mr: '६० वर्षे किंवा अधिक' },
        iconName: 'Smile',
        description: { en: 'Senior citizen', hi: 'वरिष्ठ नागरिक', mr: 'ज्येष्ठ नागरिक' },
        voiceKeywords: {
          en: ['sixty plus', 'senior citizen', 'old'],
          hi: ['साठ से अधिक', 'बुजुर्ग', 'वरिष्ठ'],
          mr: ['साठ पेक्षा जास्त', 'ज्येष्ठ'],
        },
      },
    ],
  },

  {
    id: 'incomeBand',
    field: 'incomeBand',
    title: {
      en: 'What is your approximate annual household income band?',
      hi: 'आपके परिवार की अनुमानित वार्षिक आय सीमा क्या है?',
      mr: 'आपल्या कुटुंबाचे अंदाजे वार्षिक उत्पन्न किती?',
    },
    helpText: {
      en: 'Coarse brackets only. No salary slips or tax documents required here.',
      hi: 'केवल अनुमानित वर्ग। किसी भी वेतन पर्ची या दस्तावेज की आवश्यकता नहीं है।',
      mr: 'फक्त ढोबळ अंदाज. कोणत्याही पुराव्याची येथे गरज नाही.',
    },
    isOptional: false,
    options: [
      {
        value: 'below_1lakh',
        label: { en: 'Below ₹1,00,000 / year', hi: '₹1 लाख प्रति वर्ष से कम', mr: 'दरवर्षी ₹१ लाखापेक्षा कमी' },
        iconName: 'Coins',
        description: { en: 'Under ₹8,000 / month', hi: 'लगभग ₹8,000 प्रति माह से कम', mr: 'साधारण ₹८,००० दरमहापेक्षा कमी' },
        voiceKeywords: {
          en: ['below one lakh', 'less than one lakh', 'poor', 'low income'],
          hi: ['एक लाख से कम', 'आठ हजार'],
          mr: ['एक लाखापेक्षा कमी', 'कमी उत्पन्न'],
        },
      },
      {
        value: '1lakh_2_5lakh',
        label: { en: '₹1,00,000 – ₹2,50,000 / year', hi: '₹1 लाख से ₹2.5 लाख प्रति वर्ष', mr: '₹१ लाख ते ₹२.५ लाख प्रति वर्ष' },
        iconName: 'Wallet',
        description: { en: '₹8,000 – ₹20,000 / month', hi: 'लगभग ₹8,000 से ₹20,000 प्रति माह', mr: 'साधारण ₹८,००० ते ₹२०,००० दरमहा' },
        voiceKeywords: {
          en: ['one to two point five lakh', 'two lakh'],
          hi: ['एक से ढाई लाख', 'दो लाख'],
          mr: ['एक ते अडीच लाख', 'दोन लाख'],
        },
      },
      {
        value: '2_5lakh_5lakh',
        label: { en: '₹2,50,000 – ₹5,00,000 / year', hi: '₹2.5 लाख से ₹5 लाख प्रति वर्ष', mr: '₹२.५ लाख ते ₹५ लाख प्रति वर्ष' },
        iconName: 'Banknote',
        description: { en: '₹20,000 – ₹42,000 / month', hi: 'लगभग ₹20,000 से ₹42,000 प्रति माह', mr: 'साधारण ₹२०,००० ते ₹४२,००० दरमहा' },
        voiceKeywords: {
          en: ['two point five to five lakh', 'three lakh', 'four lakh'],
          hi: ['ढाई से पांच लाख', 'तीन लाख', 'चार लाख'],
          mr: ['अडीच ते पाच लाख'],
        },
      },
      {
        value: 'above_5lakh',
        label: { en: 'Above ₹5,00,000 / year', hi: '₹5 लाख प्रति वर्ष से अधिक', mr: '₹५ लाखापेक्षा जास्त' },
        iconName: 'Building',
        description: { en: 'Over ₹42,000 / month (Taxpayers)', hi: 'आयकर दाता वर्ग', mr: 'आयकर भरणारा वर्ग' },
        voiceKeywords: {
          en: ['above five lakh', 'more than five lakh', 'taxpayer'],
          hi: ['पांच लाख से अधिक', 'टैक्स'],
          mr: ['पाच लाखांपेक्षा जास्त'],
        },
      },
    ],
  },

  {
    id: 'gender',
    field: 'gender',
    title: {
      en: 'What is your gender? (Optional)',
      hi: 'आपका लिंग क्या है? (वैकल्पिक)',
      mr: 'आपले लिंग काय आहे? (ऐच्छिक)',
    },
    helpText: {
      en: 'Certain schemes like PM Ujjwala are designated exclusively for women of the household.',
      hi: 'उज्ज्वला जैसी कुछ योजनाएं विशेष रूप से महिलाओं के लिए हैं।',
      mr: 'उज्ज्वला योजना प्रामुख्याने घरातील महिलांसाठी राखीव आहे.',
    },
    isOptional: true,
    options: [
      {
        value: 'female',
        label: { en: 'Female', hi: 'महिला / स्त्री', mr: 'महिला / स्त्री' },
        iconName: 'User',
        voiceKeywords: {
          en: ['female', 'woman', 'girl'],
          hi: ['महिला', 'स्त्री', 'औरत'],
          mr: ['महिला', 'स्त्री'],
        },
      },
      {
        value: 'male',
        label: { en: 'Male', hi: 'पुरुष', mr: 'पुरुष' },
        iconName: 'User',
        voiceKeywords: {
          en: ['male', 'man', 'boy'],
          hi: ['पुरुष', 'आदमी'],
          mr: ['पुरुष'],
        },
      },
      {
        value: 'transgender',
        label: { en: 'Transgender / Non-binary', hi: 'ट्रांसजेंडर / अन्य', mr: 'तृतीयपंथी / इतर' },
        iconName: 'Users',
        voiceKeywords: {
          en: ['transgender', 'other'],
          hi: ['ट्रांसजेंडर'],
          mr: ['तृतीयपंथी'],
        },
      },
      {
        value: 'prefer_not_to_say',
        label: { en: 'Prefer not to say', hi: 'बताना नहीं चाहते', mr: 'सांगू इच्छित नाही' },
        iconName: 'EyeOff',
        voiceKeywords: {
          en: ['skip', 'pass', 'prefer not to say'],
          hi: ['नहीं बताना', 'स्किप'],
          mr: ['सांगायचे नाही'],
        },
      },
    ],
  },

  {
    id: 'socialCategory',
    field: 'socialCategory',
    title: {
      en: 'What is your social category? (Optional)',
      hi: 'आपका सामाजिक वर्ग क्या है? (वैकल्पिक)',
      mr: 'आपला सामाजिक प्रवर्ग कोणता? (ऐच्छिक)',
    },
    helpText: {
      en: 'Scholarships and welfare grants have affirmative criteria for SC, ST, OBC, and minority categories.',
      hi: 'छात्रवृत्ति और अनुदान में आरक्षित वर्गों के लिए विशेष छूट होती है।',
      mr: 'शिष्यवृत्ती योजनांमध्ये विविध प्रवर्गांसाठी विशेष सवलती असतात.',
    },
    isOptional: true,
    options: [
      {
        value: 'general',
        label: { en: 'General / Open', hi: 'सामान्य (General)', mr: 'खुला प्रवर्ग (Open)' },
        iconName: 'Circle',
        voiceKeywords: { en: ['general', 'open'], hi: ['सामान्य'], mr: ['खुला', 'जनरल'] },
      },
      {
        value: 'obc',
        label: { en: 'OBC (Other Backward Class)', hi: 'ओबीसी (अन्य पिछड़ा वर्ग)', mr: 'इतर मागास वर्ग (OBC)' },
        iconName: 'CheckCircle',
        voiceKeywords: { en: ['obc'], hi: ['ओबीसी', 'पिछड़ा'], mr: ['ओबीसी'] },
      },
      {
        value: 'sc',
        label: { en: 'SC (Scheduled Caste)', hi: 'अनुसूचित जाति (SC)', mr: 'अनुसूचित जाती (SC)' },
        iconName: 'Shield',
        voiceKeywords: { en: ['sc', 'scheduled caste'], hi: ['एससी', 'अनुसूचित जाति'], mr: ['एससी', 'अनुसूचित जाती'] },
      },
      {
        value: 'st',
        label: { en: 'ST (Scheduled Tribe)', hi: 'अनुसूचित जनजाति (ST)', mr: 'अनुसूचित जमाती (ST)' },
        iconName: 'Feather',
        voiceKeywords: { en: ['st', 'scheduled tribe', 'adivasi'], hi: ['एसटी', 'जनजाति', 'आदिवासी'], mr: ['एसटी', 'आदिवासी'] },
      },
      {
        value: 'minority',
        label: { en: 'Minority Communities', hi: 'अल्पसंख्यक समुदाय', mr: 'अल्पसंख्याक समुदाय' },
        iconName: 'Heart',
        voiceKeywords: { en: ['minority', 'muslim', 'christian', 'buddhist', 'jain'], hi: ['अल्पसंख्यक'], mr: ['अल्पसंख्याक'] },
      },
      {
        value: 'prefer_not_to_say',
        label: { en: 'Prefer not to say', hi: 'बताना नहीं चाहते', mr: 'सांगू इच्छित नाही' },
        iconName: 'EyeOff',
        voiceKeywords: { en: ['skip', 'pass'], hi: ['नहीं बताना'], mr: ['सांगायचे नाही'] },
      },
    ],
  },

  {
    id: 'landHolding',
    field: 'landHolding',
    title: {
      en: 'Does your family own cultivable agricultural land?',
      hi: 'क्या आपके परिवार के नाम पर खेती योग्य जमीन है?',
      mr: 'आपल्या कुटुंबाच्या नावावर शेतजमीन आहे का?',
    },
    helpText: {
      en: 'Crucial for PM-KISAN which requires revenue land ownership records.',
      hi: 'पीएम-किसान योजना के लिए जमीन का स्वामित्व आवश्यक है।',
      mr: 'पीएम-किसान योजनेसाठी ७/१२ वर शेतजमीन असणे आवश्यक असते.',
    },
    isOptional: false,
    options: [
      {
        value: 'none',
        label: { en: 'No land / Landless labor', hi: 'कोई जमीन नहीं / भूमिहीन', mr: 'जमीन नाही / भूमिहीन मजूर' },
        iconName: 'Slash',
        voiceKeywords: { en: ['no land', 'landless', 'none'], hi: ['जमीन नहीं', 'भूमिहीन'], mr: ['जमीन नाही', 'भूमिहीन'] },
      },
      {
        value: 'marginal',
        label: { en: 'Marginal (< 1 Hectare / < 2.5 Acres)', hi: 'सीमांत किसान (< 1 हेक्टेयर)', mr: 'अत्यल्प भूधारक (< १ हेक्टर)' },
        iconName: 'Sprout',
        voiceKeywords: { en: ['marginal', 'small land', 'one hectare'], hi: ['सीमांत', 'कम जमीन', 'एक हेक्टेयर'], mr: ['अत्यल्प', 'एक हेक्टर'] },
      },
      {
        value: 'small',
        label: { en: 'Small (1 – 2 Hectares / 2.5 – 5 Acres)', hi: 'लघु किसान (1 से 2 हेक्टेयर)', mr: 'अल्प भूधारक (१ ते २ हेक्टर)' },
        iconName: 'Layers',
        voiceKeywords: { en: ['small', 'two hectare'], hi: ['छोटा किसान', 'दो हेक्टेयर'], mr: ['अल्प', 'दोन हेक्टर'] },
      },
      {
        value: 'medium',
        label: { en: 'Medium or Large (> 2 Hectares / > 5 Acres)', hi: 'मध्यम या बड़े किसान (> 2 हेक्टेयर)', mr: 'मोठा भूधारक (> २ हेक्टर)' },
        iconName: 'Grid',
        voiceKeywords: { en: ['medium', 'large', 'big farmer'], hi: ['बड़ा किसान', 'पांच एकड़'], mr: ['मोठा शेतकरी'] },
      },
    ],
  },

  {
    id: 'housingType',
    field: 'housingType',
    title: {
      en: 'What type of house does your family currently live in?',
      hi: 'वर्तमान में आपका परिवार किस प्रकार के मकान में रहता है?',
      mr: 'सध्या आपले कुटुंब कोणत्या प्रकारच्या घरात राहते?',
    },
    helpText: {
      en: 'PMAY-G housing assistance is specifically for households living in kutcha or makeshift dwellings.',
      hi: 'प्रधानमंत्री आवास योजना कच्चे या अस्थाई मकान वालों के लिए है।',
      mr: 'आवास योजना कच्च्या किंवा पत्र्याच्या घरात राहणाऱ्या कुटुंबांसाठी आहे.',
    },
    isOptional: false,
    options: [
      {
        value: 'kutcha_temporary',
        label: {
          en: 'Kutcha / Mud / Thatch / Makeshift Tin Shed',
          hi: 'कच्चा मकान / मिट्टी / घास-फूस / टिन शेड',
          mr: 'कच्चे घर / मातीचे / गवताचे / पत्र्याचे शेड',
        },
        iconName: 'Warehouse',
        voiceKeywords: { en: ['kutcha', 'mud', 'temporary', 'tin'], hi: ['कच्चा', 'मिट्टी', 'टिन'], mr: ['कच्चे', 'मातीचे', 'पत्रा'] },
      },
      {
        value: 'pucca_permanent',
        label: {
          en: 'Permanent Pucca / Concrete / Brick House',
          hi: 'पक्का मकान / कंक्रीट / ईंट का मकान',
          mr: 'पक्के घर / आरसीसी / विटांचे पक्के घर',
        },
        iconName: 'Building2',
        voiceKeywords: { en: ['pucca', 'concrete', 'brick', 'permanent'], hi: ['पक्का', 'ईंट', 'सीमेंट'], mr: ['पक्के', 'आरसीसी'] },
      },
      {
        value: 'homeless',
        label: {
          en: 'Houseless / Destitute / Shelter Home',
          hi: 'बेघर / रैन बसेरा / कोई छत नहीं',
          mr: 'बेघर / स्वतःचे कोणतेही घर नाही',
        },
        iconName: 'AlertCircle',
        voiceKeywords: { en: ['homeless', 'no home', 'shelter'], hi: ['बेघर', 'रैन बसेरा'], mr: ['बेघर'] },
      },
    ],
  },

  {
    id: 'hasLPG',
    field: 'hasLPG',
    title: {
      en: 'Does your household already have an active LPG gas connection?',
      hi: 'क्या आपके घर में पहले से कोई एलपीजी गैस कनेक्शन है?',
      mr: 'आपल्या घरात आधीपासून एलपीजी गॅस जोडणी आहे का?',
    },
    helpText: {
      en: 'PM Ujjwala Yojana 2.0 provides deposit-free stoves and cylinders only to households with no existing connection.',
      hi: 'उज्ज्वला योजना उन घरों के लिए है जहां पहले से गैस कनेक्शन नहीं है।',
      mr: 'उज्ज्वला योजना अशा घरांसाठी आहे जिथे पूर्वी कोणताही गॅस सिलिंडर नव्हता.',
    },
    isOptional: false,
    options: [
      {
        value: 'no',
        label: { en: 'No, we do not have an LPG connection', hi: 'नहीं, हमारे पास गैस कनेक्शन नहीं है', mr: 'नाही, आमच्याकडे गॅस कनेक्शन नाही' },
        iconName: 'Flame',
        voiceKeywords: { en: ['no gas', 'no connection', 'no lpg'], hi: ['नहीं है', 'गैस नहीं'], mr: ['नाही', 'गॅस नाही'] },
      },
      {
        value: 'yes',
        label: { en: 'Yes, we already have an active gas cylinder', hi: 'हां, पहले से गैस कनेक्शन मौजूद है', mr: 'होय, आधीपासून गॅस सिलिंडर आहे' },
        iconName: 'CheckCircle2',
        voiceKeywords: { en: ['yes gas', 'have gas', 'already have'], hi: ['हां है', 'गैस है'], mr: ['होय', 'गॅस आहे'] },
      },
    ],
  },

  {
    id: 'hasGirlChild',
    field: 'hasGirlChild',
    title: {
      en: 'Do you have a daughter / girl child under 10 years of age?',
      hi: 'क्या आपके परिवार में 10 वर्ष से कम आयु की कोई बेटी है?',
      mr: 'आपल्या कुटुंबात १० वर्षांखालील मुलगी आहे का?',
    },
    helpText: {
      en: 'Relevant for Sukanya Samriddhi Yojana (high-interest small savings account).',
      hi: 'सुकन्या समृद्धि योजना हेतु विशेष रूप से उपयोगी।',
      mr: 'सुकन्या समृद्धी योजना खाते उघडण्यासाठी आवश्यक.',
    },
    isOptional: false,
    options: [
      {
        value: 'yes',
        label: { en: 'Yes, girl child below 10 years', hi: 'हां, 10 वर्ष से कम आयु की बेटी है', mr: 'होय, १० वर्षांखालील मुलगी आहे' },
        iconName: 'Heart',
        voiceKeywords: { en: ['yes', 'daughter', 'girl child'], hi: ['हां', 'बेटी है', 'लड़की'], mr: ['होय', 'मुलगी आहे'] },
      },
      {
        value: 'no',
        label: { en: 'No / None in this age group', hi: 'नहीं / इस उम्र की कोई बालिका नहीं', mr: 'नाही / या वयोगटातील मुलगी नाही' },
        iconName: 'XCircle',
        voiceKeywords: { en: ['no', 'none'], hi: ['नहीं', 'कोई नहीं'], mr: ['नाही'] },
      },
    ],
  },

  {
    id: 'rationCardStatus',
    field: 'rationCardStatus',
    title: {
      en: 'What kind of Ration Card / NFSA food security card do you hold?',
      hi: 'आपके पास किस प्रकार का राशन कार्ड है?',
      mr: 'आपल्याकडे कोणत्या प्रकारचे शिधापत्रिका (रेशन कार्ड) आहे?',
    },
    helpText: {
      en: 'Helps identify eligibility for Ayushman Bharat (PM-JAY) and targeted food subsidies.',
      hi: 'आयुष्मान भारत और मुफ्त खाद्यान्न योजनाओं की पहचान में सहायक।',
      mr: 'आयुष्मान भारत आणि मोफत धान्य योजनांसाठी उपयुक्त.',
    },
    isOptional: true,
    options: [
      {
        value: 'antyodaya_bpl',
        label: {
          en: 'Antyodaya (AAY) / BPL / Yellow Card',
          hi: 'अंत्योदय (AAY) / बीपीएल / पीला कार्ड',
          mr: 'अंत्योदय (AAY) / बीपीएल / पिवळे कार्ड',
        },
        iconName: 'Award',
        description: { en: 'Poorest of the poor families', hi: 'अति निर्धन परिवार', mr: 'अति दारिद्र्यरेषेखालील कुटुंबे' },
        voiceKeywords: { en: ['antyodaya', 'bpl', 'yellow card'], hi: ['अंत्योदय', 'बीपीएल', 'पीला कार्ड'], mr: ['अंत्योदय', 'बीपीएल', 'पिवळे कार्ड'] },
      },
      {
        value: 'priority',
        label: {
          en: 'Priority Household (PHH) / Orange / Pink Card',
          hi: 'प्राथमिकता परिवार (PHH) / गुलाबी / नारंगी कार्ड',
          mr: 'प्राधान्य कुटुंब (PHH) / केशरी शिधापत्रिका',
        },
        iconName: 'Bookmark',
        description: { en: 'Subsidized food grain card', hi: 'सब्सिडी राशन कार्ड', mr: 'सवलतीचे धान्य मिळणारे कुटुंब' },
        voiceKeywords: { en: ['priority', 'phh', 'orange card'], hi: ['प्राथमिकता', 'नारंगी'], mr: ['प्राधान्य', 'केशरी'] },
      },
      {
        value: 'none',
        label: {
          en: 'White Card (Non-Subsidized) or No Card',
          hi: 'सफेद कार्ड (गैर-सब्सिडी) या कोई कार्ड नहीं',
          mr: 'पांढरी शिधापत्रिका किंवा रेशन कार्ड नाही',
        },
        iconName: 'FileText',
        voiceKeywords: { en: ['white card', 'no card'], hi: ['सफेद कार्ड', 'कार्ड नहीं'], mr: ['पांढरे कार्ड', 'कार्ड नाही'] },
      },
      {
        value: 'unsure',
        label: {
          en: 'Not sure / Need to check',
          hi: 'पता नहीं / देखना पड़ेगा',
          mr: 'माहित नाही / तपासावे लागेल',
        },
        iconName: 'HelpCircle',
        voiceKeywords: { en: ['not sure', 'unsure'], hi: ['पता नहीं'], mr: ['माहित नाही'] },
      },
    ],
  },
];
