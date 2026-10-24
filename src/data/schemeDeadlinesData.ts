/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LocalizedString, SchemeCategory } from '../lib/engine/types.ts';
import { STATES_AND_UTS_DATA } from './statesData.ts';

export type DeadlineEventType =
  | 'closing_date'
  | 'renewal_period'
  | 'disbursement'
  | 'ekyc_deadline';

export interface SchemeDeadlineEvent {
  id: string;
  schemeId: string;
  schemeName: string;
  schemeCode: string;
  title: LocalizedString;
  category: SchemeCategory;
  eventType: DeadlineEventType;
  date: string; // ISO YYYY-MM-DD
  endDate?: string; // Optional end date for multi-day periods/windows
  state: string | 'all_india';
  frequency: 'one_time' | 'monthly' | 'quarterly' | 'annual' | 'triannual';
  amountOrBenefit?: string;
  description: LocalizedString;
  actionRequired: LocalizedString;
  officialUrl: string;
  isUrgent?: boolean;
  targetAudience?: string;
}

export interface FiscalQuarterTimeline {
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  period: string; // e.g. "Apr - Jun"
  fiscalYear: string; // e.g. "2026-27"
  majorDisbursements: {
    schemeName: string;
    description: string;
    expectedDate: string;
    amount: string;
  }[];
}

/**
 * Baseline Curated Welfare Deadlines, Renewal Periods & DBT Disbursements
 */
export const BASELINE_DEADLINES: SchemeDeadlineEvent[] = [
  // ── November 2026 Deadlines ──
  {
    id: 'dl-pm-kisan-ekyc-2026-11',
    schemeId: 'pm-kisan',
    schemeName: 'PM-KISAN Samman Nidhi',
    schemeCode: 'PM-KISAN',
    title: {
      en: 'PM-KISAN Biometric e-KYC & Land Seeding Verification Window',
      hi: 'पीएम-किसान बायोमेट्रिक ई-केवाईसी व भूलेख अंकन अंतिम तिथि',
      mr: 'पीएम-किसान ई-केवायसी व भूमी अभिलेख पडताळणी मुदत',
    },
    category: 'agriculture',
    eventType: 'ekyc_deadline',
    date: '2026-11-10',
    state: 'all_india',
    frequency: 'triannual',
    amountOrBenefit: 'Prerequisite for ₹2,000 Installment',
    description: {
      en: 'Mandatory Aadhaar OTP or CSC biometric verification to release the 19th installment.',
      hi: '19वीं किस्त प्राप्त करने के लिए आधार ओटीपी अथवा सीएससी बायोमेट्रिक ई-केवाईसी अनिवार्य है।',
      mr: '१९ वा हप्ता मिळवण्यासाठी आधार ओटीपी किंवा सीएससी केंद्रावर बायोमेट्रिक ई-केवायसी बंधनकारक आहे.',
    },
    actionRequired: {
      en: 'Complete online OTP e-KYC on pmkisan.gov.in or visit your nearest CSC kiosk with Aadhaar.',
      hi: 'pmkisan.gov.in पर जाकर तुरंत ओटीपी आधारित ई-केवाईसी पूर्ण करें अथवा नजदीकी सीएससी जाएं।',
      mr: 'pmkisan.gov.in वर जाऊन ओटीपी ई-केवायसी करा किंवा जवळच्या सीएससी केंद्रात बायोमेट्रिक पडताळणी करा.',
    },
    officialUrl: 'https://pmkisan.gov.in',
    isUrgent: true,
    targetAudience: 'All registered small and marginal landholding farmers',
  },
  {
    id: 'dl-nsp-higher-edu-2026-11',
    schemeId: 'nsp-post-matric',
    schemeName: 'National Scholarship Portal (NSP)',
    schemeCode: 'NSP-POST-MATRIC',
    title: {
      en: 'NSP Post-Matric & Higher Education Scholarships Application Closing',
      hi: 'एनएसपी पोस्ट-मैट्रिक व उच्च शिक्षा छात्रवृत्ति आवेदन अंतिम तिथि',
      mr: 'एनएसपी मॅट्रिकोत्तर व उच्च शिक्षण शिष्यवृत्ती अर्ज अंतिम मुदत',
    },
    category: 'education',
    eventType: 'closing_date',
    date: '2026-11-30',
    state: 'all_india',
    frequency: 'annual',
    amountOrBenefit: '₹12,000 - ₹50,000 Annual Fee Reimbursement',
    description: {
      en: 'Final deadline for fresh applications and renewals for Central and State post-matric education scholarships.',
      hi: 'केंद्रीय एवं राज्य पोस्ट-मैट्रिक छात्रवृत्तियों के नए एवं नवीनीकरण आवेदनों की अंतिम समय सीमा।',
      mr: 'केंद्र व राज्य मॅट्रिकोत्तर शिष्यवृत्तीच्या नवीन व नूतनीकरणाच्या अर्जांची अंतिम तारीख.',
    },
    actionRequired: {
      en: 'Submit online application with income certificate, caste certificate, and academic marksheets before 11:59 PM.',
      hi: 'आय प्रमाण पत्र, जाति प्रमाण पत्र व अंकतालिका सहित पोर्टल पर 11:59 बजे से पहले ऑनलाइन आवेदन सबमिट करें।',
      mr: 'उत्पन्न दाखला, जात प्रमाणपत्र आणि गुणपत्रिकेसह पोर्टलवर रात्री ११:५९ पूर्वी अर्ज सादर करा.',
    },
    officialUrl: 'https://scholarships.gov.in',
    isUrgent: true,
    targetAudience: 'College, university, ITI, and diploma students',
  },
  {
    id: 'dl-pm-kisan-disbursement-19',
    schemeId: 'pm-kisan',
    schemeName: 'PM-KISAN Samman Nidhi',
    schemeCode: 'PM-KISAN',
    title: {
      en: 'PM-KISAN 19th Tranche Direct Bank Transfer (DBT) Release',
      hi: 'पीएम-किसान 19वीं किस्त सीधा बैंक खाता अंतरण (डीबीटी)',
      mr: 'पीएम-किसान १९ वा हप्ता थेट बँक हस्तांतरण (डीबीटी)',
    },
    category: 'agriculture',
    eventType: 'disbursement',
    date: '2026-11-15',
    state: 'all_india',
    frequency: 'triannual',
    amountOrBenefit: '₹2,000 directly credited to Aadhaar-linked bank accounts',
    description: {
      en: 'Nationwide disbursement of ₹2,000 income support to over 9.5 Crore verified farmer bank accounts.',
      hi: 'देश भर के 9.5 करोड़ से अधिक सत्यापित किसान बैंक खातों में ₹2,000 की किस्त का अंतरण।',
      mr: 'देशभरातील ९.५ कोटींहून अधिक पात्र शेतकरी खात्यात ₹२,००० थेट वर्ग केले जातील.',
    },
    actionRequired: {
      en: 'Verify Aadhaar-NPCI bank mapping status and check beneficiary status on the PM-KISAN portal.',
      hi: 'अपने बैंक खाते में एनपीसीआई डीबीटी मैपिंग सक्रिय रखें और पोर्टल पर लाभार्थी स्थिति जांचें।',
      mr: 'आपल्या बँकेत आधार-एनपीसीआय मॅपिंग चालू असल्याची खात्री करा आणि पोर्टलवर स्थिती तपासा.',
    },
    officialUrl: 'https://pmkisan.gov.in',
    isUrgent: false,
    targetAudience: 'Verified farmers with active NPCI DBT mandate',
  },
  {
    id: 'dl-jeevan-pramaan-2026-11',
    schemeId: 'apy',
    schemeName: 'Jeevan Pramaan (Digital Life Certificate)',
    schemeCode: 'DLC-PENSION',
    title: {
      en: 'Annual Digital Life Certificate (DLC) Submission Window for Pensioners',
      hi: 'पेंशनभोगियों हेतु वार्षिक डिजिटल जीवन प्रमाण पत्र जमा करने की अंतिम तिथि',
      mr: 'पेन्शनधारकांसाठी वार्षिक डिजिटल जीवन प्रमाणपत्र सादर करण्याची अंतिम मुदत',
    },
    category: 'pension',
    eventType: 'renewal_period',
    date: '2026-11-30',
    endDate: '2026-11-30',
    state: 'all_india',
    frequency: 'annual',
    amountOrBenefit: 'Uninterrupted Monthly Pension Credit',
    description: {
      en: 'All central, state, and defense pensioners must submit annual life certificate to prevent pension stoppage.',
      hi: 'पेंशन का निरंतर भुगतान सुनिश्चित करने हेतु सभी पेंशनरों को जीवन प्रमाण पत्र जमा करना अनिवार्य है।',
      mr: 'पेन्शन अखंडित चालू राहण्यासाठी सर्व पेन्शनधारकांनी वार्षिक हयातीचा दाखला देणे बंधनकारक आहे.',
    },
    actionRequired: {
      en: 'Submit via Jeevan Pramaan Face App from smartphone or visit designated bank branch / post office with Aadhaar.',
      hi: 'जीवन प्रमाण मोबाइल फेस ऑथेंटिकेशन ऐप से घर बैठे अथवा डाकघर/बैंक जाकर बायोमेट्रिक दें।',
      mr: 'जीवन प्रमाण फेस ऑथेंटिकेशन ॲपद्वारे मोबाईलवरून किंवा जवळच्या पोस्ट ऑफिस/बँकेत हजेरी नोंदवा.',
    },
    officialUrl: 'https://jeevanpramaan.gov.in',
    isUrgent: true,
    targetAudience: 'Senior citizen pensioners, retired employees, family pension holders',
  },
  {
    id: 'dl-mahadbt-farmer-lottery-2026-11',
    schemeId: 'mahadbt-farmer',
    schemeName: 'MahaDBT Farmer Mechanization Subsidy',
    schemeCode: 'MAHADBT-FARMER',
    title: {
      en: 'MahaDBT Agricultural Machinery & Drip Irrigation Application Close',
      hi: 'महाडीबीटी कृषि यंत्र व ड्रिप सिंचाई लॉटरी आवेदन अंतिम तिथि',
      mr: 'महाडीबीटी कृषी यांत्रिकीकरण व ठिबक सिंचन अर्ज अंतिम मुदत',
    },
    category: 'agriculture',
    eventType: 'closing_date',
    date: '2026-11-15',
    state: 'Maharashtra',
    frequency: 'quarterly',
    amountOrBenefit: '50% to 75% subsidy (up to ₹1.25 Lakh on tractors & implements)',
    description: {
      en: 'Maharashtra state lottery window for tractors, power tillers, rotavators, and drip irrigation subsidies.',
      hi: 'ट्रैक्टर, रोटावेटर और ड्रिप सिंचाई पर 50% से 75% अनुदान हेतु महाराष्ट्र सरकार का लॉटरी चक्र।',
      mr: 'ट्रॅक्टर, रोटाव्हेटर, ठिबक सिंचन अनुदानासाठी महाडीबीटी पोर्टलवरील चालू लॉटरी फेरीची अंतिम मुदत.',
    },
    actionRequired: {
      en: 'Complete application on mahadbt.maharashtra.gov.in with 7/12 extract and 8-A land holding certificate.',
      hi: '7/12 व 8-अ उतारों के साथ महाडीबीटी पोर्टल पर ऑनलाइन चयन विकल्प लॉक करें।',
      mr: '७/१२ आणि ८-अ उताऱ्यासह महाडीबीटी पोर्टलवर योजना निवडून ऑनलाइन शुल्क भरून अर्ज लॉक करा.',
    },
    officialUrl: 'https://mahadbt.maharashtra.gov.in',
    isUrgent: true,
    targetAudience: 'Maharashtra farmers with land records in 7/12',
  },
  {
    id: 'dl-ka-yuva-nidhi-2026-11',
    schemeId: 'ka-yuva-nidhi',
    schemeName: 'Karnataka Yuva Nidhi Scheme',
    schemeCode: 'KA-YUVA-NIDHI',
    title: {
      en: 'Karnataka Yuva Nidhi Graduate Allowance Registration Cycle',
      hi: 'कर्नाटक युवा निधि स्नातक बेरोजगारी भत्ता पंजीकरण चक्र',
      mr: 'कर्नाटक युवा निधी पदवीधर बेरोजगारी भत्ता नोंदणी फेरी',
    },
    category: 'education',
    eventType: 'closing_date',
    date: '2026-11-25',
    state: 'Karnataka',
    frequency: 'monthly',
    amountOrBenefit: '₹3,000/month for Graduates, ₹1,500/month for Diploma holders',
    description: {
      en: 'Monthly window for unemployed graduates of recent academic years residing in Karnataka.',
      hi: 'कर्नाटक के हालिया उत्तीर्ण बेरोजगार स्नातकों व डिप्लोमा धारकों हेतु मासिक पंजीकरण चक्र।',
      mr: 'कर्नाटकातील पदवीधर व डिप्लोमा धारक बेरोजगारांसाठी मासिक भत्ता नोंदणी फेरी.',
    },
    actionRequired: {
      en: 'Apply on Seva Sindhu Guarantee Scheme portal with degree registration number and Aadhaar-seeded bank account.',
      hi: 'सेवा सिंधु पोर्टल पर डिग्री नंबर और आधार लिंक बैंक विवरण के साथ आवेदन सबमिट करें।',
      mr: 'सेवा सिंधू पोर्टलवर पदवी नोंदणी क्रमांक व आधार संलग्न बँक खात्यासह अर्ज पूर्ण करा.',
    },
    officialUrl: 'https://sevasindhugs.karnataka.gov.in',
    isUrgent: false,
    targetAudience: 'Recent graduates and diploma holders seeking employment in Karnataka',
  },

  // ── December 2026 Deadlines ──
  {
    id: 'dl-mp-ladli-behna-2026-12',
    schemeId: 'mp-ladli-behna',
    schemeName: 'Mukhyamantri Ladli Behna Yojana',
    schemeCode: 'MP-LADLI-BEHNA',
    title: {
      en: 'Ladli Behna Monthly Direct Benefit Transfer (DBT)',
      hi: 'मुख्यमंत्री लाड़ली बहना योजना मासिक किस्त भुगतान',
      mr: 'लाडली बहना योजना मासिक डीबीटी हप्ता वितरण',
    },
    category: 'women_child',
    eventType: 'disbursement',
    date: '2026-12-10',
    state: 'Madhya Pradesh',
    frequency: 'monthly',
    amountOrBenefit: '₹1,250 direct cash credit to eligible women',
    description: {
      en: 'Regular 10th-of-the-month direct cash assistance transfer to over 1.29 Crore eligible married women across MP.',
      hi: 'मध्य प्रदेश की 1.29 करोड़ से अधिक पात्र बहनों के खाते में प्रतिमाह 10 तारीख को ₹1,250 का अंतरण।',
      mr: 'मध्य प्रदेशातील पात्र महिलांच्या बँक खात्यात दरमहा १० तारखेला ₹१,२५० थेट जमा केले जातात.',
    },
    actionRequired: {
      en: 'Ensure Aadhaar-DBT active status in your designated bank account.',
      hi: 'अपने बैंक खाते में आधार-डीबीटी सक्रिय स्थिति बनाए रखें।',
      mr: 'आपल्या बँक खात्यात आधार डीबीटी सक्रिय असल्याची खात्री ठेवा.',
    },
    officialUrl: 'https://cmladlibahna.mp.gov.in',
    isUrgent: false,
    targetAudience: 'Married women aged 21-60 with family income below ₹2.5 Lakh',
  },
  {
    id: 'dl-ka-gruha-lakshmi-2026-12',
    schemeId: 'ka-gruha-lakshmi',
    schemeName: 'Karnataka Gruha Lakshmi Scheme',
    schemeCode: 'KA-GRUHA-LAKSHMI',
    title: {
      en: 'Gruha Lakshmi Monthly Entitlement Disbursement',
      hi: 'गृह लक्ष्मी योजना मासिक वित्तीय सहायता अंतरण',
      mr: 'गृह लक्ष्मी योजना मासिक आर्थिक मदत वितरण',
    },
    category: 'women_child',
    eventType: 'disbursement',
    date: '2026-12-15',
    state: 'Karnataka',
    frequency: 'monthly',
    amountOrBenefit: '₹2,000 / month to female head of household',
    description: {
      en: 'Direct benefit credit to bank accounts of female heads listed on BPL, Antyodaya, or APL ration cards.',
      hi: 'राशन कार्ड में दर्ज परिवार की महिला मुखिया के बैंक खाते में ₹2,000 की मासिक सहायता।',
      mr: 'रेशन कार्डवरील महिला कुटुंब प्रमुखाला दरमहा ₹२,००० थेट खात्यात वर्ग केले जातात.',
    },
    actionRequired: {
      en: 'Check SMS alert or Seva Sindhu DBT status for bank reference number.',
      hi: 'अपने बैंक एसएमएस अथवा सेवा सिंधु डीबीटी पोर्टल पर यूटीआर संख्या जांचें।',
      mr: 'आपल्या बँकेचा एसएमएस तपासा किंवा सेवा सिंधू पोर्टलवर डीबीटी स्थिती पाहा.',
    },
    officialUrl: 'https://sevasindhu.karnataka.gov.in',
    isUrgent: false,
    targetAudience: 'Female head of household registered on valid Karnataka ration card',
  },
  {
    id: 'dl-ration-aadhaar-seeding-2026-12',
    schemeId: 'pm-jay',
    schemeName: 'NFSA Public Distribution System',
    schemeCode: 'NFSA-RATION-KYC',
    title: {
      en: 'Ration Card Aadhaar Seeding & Biometric e-KYC Final Deadline',
      hi: 'राशन कार्ड आधार सीडिंग एवं बायोमेट्रिक ई-केवाईसी अंतिम समय सीमा',
      mr: 'रेशन कार्ड आधार लिंकिंग व बायोमेट्रिक ई-केवायसी अंतिम मुदत',
    },
    category: 'health',
    eventType: 'ekyc_deadline',
    date: '2026-12-31',
    state: 'all_india',
    frequency: 'one_time',
    amountOrBenefit: 'Prerequisite for monthly subsidized food grains under PMGKAY',
    description: {
      en: 'All family members listed on NFSA and State Ration Cards must complete PoS biometric e-KYC to retain benefits.',
      hi: 'राशन कार्ड में शामिल सभी सदस्यों का उचित मूल्य दुकान (एफपीएस) पर बायोमेट्रिक ई-केवाईसी कराना अनिवार्य है।',
      mr: 'रेशन कार्डवरील सर्व सदस्यांनी स्वस्त धान्य दुकानातील पॉस मशिनवर जाऊन बायोमेट्रिक पडताळणी करणे बंधनकारक आहे.',
    },
    actionRequired: {
      en: 'Visit your Fair Price Shop (FPS) dealer with Aadhaar and give biometric authentication on the e-PoS machine.',
      hi: 'अपने निकटतम राशन डीलर के पास जाकर ई-पॉस मशीन पर अंगूठा लगाकर ई-केवाईसी कराएं।',
      mr: 'रेशन दुकानदाराकडे जाऊन ई-पॉस मशिनवर अंगठा देऊन प्रत्येक सदस्याचे ई-केवायसी पूर्ण करा.',
    },
    officialUrl: 'https://nfsa.gov.in',
    isUrgent: true,
    targetAudience: 'All NFSA Priority Household (PHH) and Antyodaya (AAY) beneficiaries',
  },
  {
    id: 'dl-pm-surya-ghar-2026-12',
    schemeId: 'pm-surya-ghar',
    schemeName: 'PM Surya Ghar Muft Bijli Yojana',
    schemeCode: 'PM-SURYA-GHAR',
    title: {
      en: 'Rooftop Solar Phase 2 DISCOM Subsidy Claim & Inspection Deadline',
      hi: 'पीएम सूर्य घर रूफटॉप सोलर डिस्कॉम निरीक्षण एवं अनुदान दावा अंतिम तिथि',
      mr: 'पीएम सूर्य घर छतावरील सौर ऊर्जा तपासणी व अनुदान दावा मुदत',
    },
    category: 'housing',
    eventType: 'closing_date',
    date: '2026-12-31',
    state: 'all_india',
    frequency: 'quarterly',
    amountOrBenefit: '₹30,000 to ₹78,000 Central Direct Subsidy into Bank Account',
    description: {
      en: 'Households that completed solar installation in Q3 must submit DISCOM net metering certificate for subsidy release.',
      hi: 'सोलर पैनल स्थापना करा चुके उपभोक्ताओं को नेट-मीटर प्रमाण पत्र अपलोड कर सीधे खाते में ₹78,000 तक अनुदान मिलता है।',
      mr: 'सोलर बसवलेल्या ग्राहकांनी डिस्कॉम नेट मीटर प्रमाणपत्र अपलोड करून थेट खात्यात ₹७८,००० पर्यंत अनुदान मिळवावे.',
    },
    actionRequired: {
      en: 'Upload commissioning report and net meter certificate on pmsuryaghar.gov.in to initiate DBT subsidy within 30 days.',
      hi: 'pmsuryaghar.gov.in पोर्टल पर कमिशनिंग रिपोर्ट और नेट मीटर सर्टिफिकेट अपलोड करें।',
      mr: 'pmsuryaghar.gov.in पोर्टलवर कमिशनिंग अहवाल अपलोड करा, ३० दिवसांत थेट खात्यात अनुदान जमा होते.',
    },
    officialUrl: 'https://pmsuryaghar.gov.in',
    isUrgent: false,
    targetAudience: 'Residential electricity consumers with rooftop solar systems',
  },
  {
    id: 'dl-pmay-g-survey-2026-12',
    schemeId: 'pmay-g',
    schemeName: 'Pradhan Mantri Awaas Yojana - Gramin',
    schemeCode: 'PMAY-G',
    title: {
      en: 'PMAY-G Rural Kutcha House Survey & Gram Sabha Geo-Tag Verification Close',
      hi: 'पीएम आवास योजना ग्रामीण सर्वेक्षण एवं ग्राम सभा जियो-टैग सत्यापन समापन',
      mr: 'पीएम आवास योजना ग्रामीण सर्वेक्षण व ग्रामसभा जिओ-टॅगिंग पडताळणी मुदत',
    },
    category: 'housing',
    eventType: 'closing_date',
    date: '2026-12-20',
    state: 'all_india',
    frequency: 'annual',
    amountOrBenefit: '₹1.20 Lakh to ₹1.30 Lakh + 95 days MGNREGA wages',
    description: {
      en: 'Panchayat-level geo-tagging and inclusion round for eligible rural households without pucca housing.',
      hi: 'कच्चे घरों में रहने वाले ग्रामीण परिवारों हेतु ग्राम पंचायत जियो-टैगिंग एवं पात्रता सूची पुनरीक्षण चक्र।',
      mr: 'कच्च्या घरात राहणाऱ्या ग्रामीण कुटुंबांसाठी ग्रामपंचायत स्तरावरील जिओ-टॅगिंग व नवीन नाव नोंदणी फेरी.',
    },
    actionRequired: {
      en: 'Verify your name with your Gram Panchayat Secretary or check AwaasSoft beneficiary inclusion list.',
      hi: 'अपनी ग्राम पंचायत में ग्राम विकास अधिकारी से संपर्क करें अथवा आवाससॉफ्ट पोर्टल पर नाम जांचें।',
      mr: 'आपल्या ग्रामपंचायत कार्यालयात ग्रामसेवकांशी संपर्क साधा किंवा आवाससॉफ्ट पोर्टलवर यादी तपासा.',
    },
    officialUrl: 'https://pmayg.nic.in',
    isUrgent: false,
    targetAudience: 'Houseless families or households living in zero, one, or two-room kutcha houses',
  },

  // ── January 2027 Deadlines ──
  {
    id: 'dl-ayushman-pmjay-ekyc-2027-01',
    schemeId: 'pm-jay',
    schemeName: 'Ayushman Bharat (PM-JAY)',
    schemeCode: 'PM-JAY',
    title: {
      en: 'Ayushman Card e-KYC & Senior Citizen (70+) Enrolment Drive',
      hi: 'आयुष्मान कार्ड ई-केवाईसी एवं 70+ वरिष्ठ नागरिक निःशुल्क स्वास्थ्य कार्ड अभियान',
      mr: 'आयुष्मान कार्ड ई-केवायसी व ७०+ ज्येष्ठ नागरिक मोफत आरोग्य कार्ड मोहीम',
    },
    category: 'health',
    eventType: 'renewal_period',
    date: '2027-01-31',
    state: 'all_india',
    frequency: 'annual',
    amountOrBenefit: '₹5 Lakh Annual Free Hospitalization Cover (Cashless)',
    description: {
      en: 'All citizens aged 70 and above, regardless of income, can enrol for dedicated ₹5 Lakh health cover.',
      hi: '70 वर्ष या उससे अधिक आयु के सभी वरिष्ठ नागरिक आय सीमा से परे ₹5 लाख के मुफ्त इलाज कार्ड हेतु पात्र हैं।',
      mr: '७० वर्षे किंवा त्याहून अधिक वयाच्या सर्व ज्येष्ठ नागरिकांना उत्पन्नाची अट न ठेवता ₹५ लाखांचे मोफत कार्ड दिले जाते.',
    },
    actionRequired: {
      en: 'Download Ayushman App on mobile, enter Aadhaar, and complete instant face-authentication e-KYC.',
      hi: 'आयुष्मान ऐप डाउनलोड करें, आधार नंबर दर्ज कर फेस-ऑथेंटिकेशन द्वारा 2 मिनट में कार्ड डाउनलोड करें।',
      mr: 'मोबाईलवर आयुष्मान ॲप डाऊनलोड करा, आधार नंबर टाकून फेस-ऑथेंटिकेशनद्वारे त्वरित कार्ड मिळवा.',
    },
    officialUrl: 'https://beneficiary.nha.gov.in',
    isUrgent: false,
    targetAudience: 'All senior citizens aged 70+ and existing SECC/NFSA families',
  },
  {
    id: 'dl-pm-vishwakarma-batch-2027-01',
    schemeId: 'pm-vishwakarma',
    schemeName: 'PM Vishwakarma Scheme',
    schemeCode: 'PM-VISHWAKARMA',
    title: {
      en: 'PM Vishwakarma Artisan Toolkit Grant & Skill Training Batch 4',
      hi: 'पीएम विश्वकर्मा शिल्पकार टूलकिट अनुदान एवं कौशल प्रशिक्षण बैच 4',
      mr: 'पीएम विश्वकर्मा कारागीर टूलकिट अनुदान व कौशल्य प्रशिक्षण फेरी ४',
    },
    category: 'livelihood',
    eventType: 'closing_date',
    date: '2027-01-15',
    state: 'all_india',
    frequency: 'quarterly',
    amountOrBenefit: '₹15,000 Free Modern Toolkit e-Voucher + ₹3 Lakh Collateral-Free Loan at 5%',
    description: {
      en: 'Quarterly training batch registration for 18 traditional trade artisans (carpenters, blacksmiths, tailors, sculptors, etc.).',
      hi: '18 पारंपरिक शिल्पकलाओं में काम करने वाले कारीगरों हेतु ₹15,000 का मुफ्त टूलकिट अनुदान व ऋण सुविधा।',
      mr: 'सुतार, लोहार, शिंपी, कुंभार यांसारख्या १८ पारंपारिक व्यवसायातील कारागिरांसाठी ₹१५,००० टूलकिट व्हाउचर.',
    },
    actionRequired: {
      en: 'Register with biometric verification at nearest CSC or on pmvishwakarma.gov.in with trade certificate/self-declaration.',
      hi: 'नजदीकी सीएससी पर जाकर बायोमेट्रिक प्रमाणीकरण कराएं और ट्रेड स्व-घोषणा पत्र जमा करें।',
      mr: 'जवळच्या सीएससी केंद्रात जाऊन बायोमेट्रिक पडताळणीसह नोंदणी करा.',
    },
    officialUrl: 'https://pmvishwakarma.gov.in',
    isUrgent: false,
    targetAudience: 'Traditional artisans and craftsmen across 18 approved trades',
  },

  // ── February 2027 Deadlines ──
  {
    id: 'dl-pm-kisan-disbursement-20',
    schemeId: 'pm-kisan',
    schemeName: 'PM-KISAN Samman Nidhi',
    schemeCode: 'PM-KISAN',
    title: {
      en: 'PM-KISAN 20th Tranche Direct Bank Transfer (DBT)',
      hi: 'पीएम-किसान 20वीं किस्त सीधा बैंक खाता अंतरण (डीबीटी)',
      mr: 'पीएम-किसान २० वा हप्ता थेट बँक हस्तांतरण (डीबीटी)',
    },
    category: 'agriculture',
    eventType: 'disbursement',
    date: '2027-02-28',
    state: 'all_india',
    frequency: 'triannual',
    amountOrBenefit: '₹2,000 credited directly to verified bank accounts',
    description: {
      en: 'End of fiscal winter installment for small and marginal landholding farmers across all states and UTs.',
      hi: 'शीतकालीन फसल सहायता हेतु सभी राज्यों एवं केंद्र शासित प्रदेशों के पात्र किसानों को ₹2,000 की किस्त।',
      mr: 'सर्व राज्ये आणि केंद्रशासित प्रदेशांमधील पात्र शेतकऱ्यांना रब्बी हंगामासाठी ₹२,००० थेट साहाय्य.',
    },
    actionRequired: {
      en: 'Ensure physical land verification and e-KYC are active on the PM-KISAN portal.',
      hi: 'पोर्टल पर अपना लाभार्थी स्टेटस और आधार बैंक लिंकिंग सुनिश्चित रखें।',
      mr: 'पोर्टलवर आपली लाभार्थी स्थिती तपासा आणि बँक खाते आधारशी लिंक असल्याची खात्री ठेवा.',
    },
    officialUrl: 'https://pmkisan.gov.in',
    isUrgent: false,
    targetAudience: 'All verified PM-KISAN beneficiaries',
  },
];

/**
 * Filter and query deadlines
 */
export function getAllDeadlines(filter?: {
  state?: string;
  eventType?: string;
  month?: string; // YYYY-MM
  searchQuery?: string;
}): SchemeDeadlineEvent[] {
  let list = [...BASELINE_DEADLINES];

  if (filter?.state && filter.state !== 'all_india' && filter.state !== 'All India') {
    const sName = filter.state.toLowerCase();
    list = list.filter(
      (e) =>
        e.state === 'all_india' ||
        e.state.toLowerCase() === sName ||
        e.state.toLowerCase().replace(/\s+/g, '_') === sName
    );
  }

  if (filter?.eventType && filter.eventType !== 'all') {
    list = list.filter((e) => e.eventType === filter.eventType);
  }

  if (filter?.month) {
    list = list.filter((e) => e.date.startsWith(filter.month!));
  }

  if (filter?.searchQuery && filter.searchQuery.trim()) {
    const q = filter.searchQuery.toLowerCase().trim();
    list = list.filter(
      (e) =>
        e.schemeName.toLowerCase().includes(q) ||
        e.schemeCode.toLowerCase().includes(q) ||
        (e.title.en && e.title.en.toLowerCase().includes(q)) ||
        (e.title.hi && e.title.hi.toLowerCase().includes(q)) ||
        (e.description.en && e.description.en.toLowerCase().includes(q))
    );
  }

  // Sort chronologically by date
  return list.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

/**
 * Returns deadlines for a specific month and year
 */
export function getEventsForMonth(
  year: number,
  month: number, // 1-12
  state?: string
): SchemeDeadlineEvent[] {
  const monthStr = `${year}-${String(month).padStart(2, '0')}`;
  return getAllDeadlines({ state, month: monthStr });
}

/**
 * Returns events for a specific calendar date (YYYY-MM-DD)
 */
export function getEventsForDate(dateStr: string, state?: string): SchemeDeadlineEvent[] {
  const list = getAllDeadlines({ state });
  return list.filter((e) => {
    if (e.date === dateStr) return true;
    if (e.endDate && e.date <= dateStr && dateStr <= e.endDate) return true;
    return false;
  });
}

/**
 * Returns upcoming events marked as urgent or closing soon
 */
export function getUpcomingUrgentEvents(limit: number = 4, state?: string): SchemeDeadlineEvent[] {
  const all = getAllDeadlines({ state });
  const urgent = all.filter((e) => e.isUrgent || e.eventType === 'closing_date' || e.eventType === 'ekyc_deadline');
  return urgent.slice(0, limit);
}

/**
 * Calculates days remaining until a deadline date string
 */
export function getDaysRemaining(targetDateStr: string, fromDateStr?: string): number {
  const target = new Date(targetDateStr + 'T23:59:59');
  const base = fromDateStr ? new Date(fromDateStr) : new Date();
  const diffTime = target.getTime() - base.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Generates an RFC 5545 standard .ics iCalendar file string for 1-click import into Google/Apple/Outlook Calendar.
 */
export function generateIcsCalendarContent(event: SchemeDeadlineEvent): { filename: string; icsContent: string } {
  // Format dates: YYYYMMDD
  const cleanDate = event.date.replace(/-/g, '');
  const endDateFormatted = event.endDate ? event.endDate.replace(/-/g, '') : cleanDate;
  
  // DTSTAMP
  const now = new Date();
  const dtstamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const title = event.title.en || event.schemeName;
  const description = `${event.description.en || ''}\n\nAction Required: ${event.actionRequired.en || ''}\n\nOfficial Portal: ${event.officialUrl}\n\nGenerated by Yojana360 Public Welfare Navigator`;

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Yojana360//Benefits Navigator Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:yojana360-${event.id}@benefits-navigator.org`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;VALUE=DATE:${cleanDate}`,
    `DTEND;VALUE=DATE:${endDateFormatted}`,
    `SUMMARY:${title.replace(/\n/g, ' ')}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `URL:${event.officialUrl}`,
    `LOCATION:${event.state === 'all_india' ? 'All India (National)' : event.state}`,
    'STATUS:CONFIRMED',
    'TRANSP:TRANSPARENT',
    'BEGIN:VALARM',
    'TRIGGER:-P2D', // Alert 2 days before
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: ${title.replace(/\n/g, ' ')} deadline approaching`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  const filename = `${event.schemeCode.toLowerCase()}-deadline.ics`;
  return {
    filename,
    icsContent: icsLines.join('\r\n'),
  };
}

/**
 * Download helper for browser
 */
export function downloadIcsFile(event: SchemeDeadlineEvent): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  const { filename, icsContent } = generateIcsCalendarContent(event);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Returns India's Government Fiscal Year Quarter Timelines
 */
export function getFiscalYearSchedule(year: number = 2026): FiscalQuarterTimeline[] {
  const nextYear = year + 1;
  const fyLabel = `${year}-${String(nextYear).slice(2)}`;

  return [
    {
      quarter: 'Q1',
      period: 'Apr - Jun',
      fiscalYear: fyLabel,
      majorDisbursements: [
        {
          schemeName: 'PM-KISAN 17th Tranche',
          description: 'Kharif season crop input support',
          expectedDate: `${year}-06-18`,
          amount: '₹2,000 / farmer',
        },
        {
          schemeName: 'PMSBY & PMJJBY Insurance Auto-Debit',
          description: 'Annual premium renewal for ₹2L accidental & life cover',
          expectedDate: `${year}-05-31`,
          amount: '₹20 + ₹436',
        },
      ],
    },
    {
      quarter: 'Q2',
      period: 'Jul - Sep',
      fiscalYear: fyLabel,
      majorDisbursements: [
        {
          schemeName: 'NSP School & Pre-Matric Scholarships',
          description: 'School academic year start enrollment window',
          expectedDate: `${year}-08-15`,
          amount: '₹4,000 - ₹10,000',
        },
        {
          schemeName: 'Karnataka Gruha Lakshmi & MP Ladli Behna',
          description: 'Monthly direct assistance to female household heads',
          expectedDate: `${year}-09-10`,
          amount: '₹1,250 - ₹2,000',
        },
      ],
    },
    {
      quarter: 'Q3',
      period: 'Oct - Dec',
      fiscalYear: fyLabel,
      majorDisbursements: [
        {
          schemeName: 'PM-KISAN 19th Tranche',
          description: 'Rabi crop pre-sowing income support',
          expectedDate: `${year}-11-15`,
          amount: '₹2,000 / farmer',
        },
        {
          schemeName: 'Jeevan Pramaan Digital Life Certificate Window',
          description: 'Annual mandatory life certificate submission for pensions',
          expectedDate: `${year}-11-30`,
          amount: 'Monthly Pension Continuity',
        },
        {
          schemeName: 'IGNOAPS Old Age & Widow Pension Q3 Disbursal',
          description: 'State & Central combined quarterly social security credit',
          expectedDate: `${year}-12-10`,
          amount: '₹1,500 - ₹3,000',
        },
      ],
    },
    {
      quarter: 'Q4',
      period: 'Jan - Mar',
      fiscalYear: fyLabel,
      majorDisbursements: [
        {
          schemeName: 'PM-KISAN 20th Tranche',
          description: 'Fiscal year-end agricultural installment',
          expectedDate: `${nextYear}-02-28`,
          amount: '₹2,000 / farmer',
        },
        {
          schemeName: 'NSP College Fee Reimbursements Final Batch',
          description: 'Direct university fee disbursement to student bank accounts',
          expectedDate: `${nextYear}-03-15`,
          amount: 'Up to ₹50,000',
        },
        {
          schemeName: 'PMAY-G Final House Completion Installment',
          description: '3rd construction stage milestone release',
          expectedDate: `${nextYear}-03-25`,
          amount: '₹40,000',
        },
      ],
    },
  ];
}
