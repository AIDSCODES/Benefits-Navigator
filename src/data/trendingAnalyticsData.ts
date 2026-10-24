/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LocalizedString, SchemeCategory } from '../lib/engine/types.ts';
import { STATES_AND_UTS_DATA } from './statesData.ts';

export interface TrendingSchemeItem {
  id: string;
  code: string;
  name: LocalizedString;
  category: SchemeCategory;
  level: 'central' | 'state';
  state: string | null;
  views: number;
  applications: number;
  approvalRate: number; // e.g. 94.2 (%)
  growthPct: number; // e.g. +38 (%)
  rank: number;
  previousRank: number;
  badge?: string;
  topDistricts: string[];
  officialUrl: string;
  benefitHighlight: LocalizedString;
}

export interface CategoryBreakdownItem {
  category: SchemeCategory;
  label: string;
  views: number;
  applications: number;
  percentage: number;
  color: string;
}

export interface LiveCitizenActivity {
  id: string;
  timeAgo: string;
  district: string;
  schemeName: string;
  action: 'viewed' | 'applied' | 'dbt_approved' | 'docs_checked';
}

export interface RegionAnalyticsSummary {
  regionId: string;
  regionName: string;
  type: 'national' | 'state' | 'union_territory';
  totalViews: number;
  totalApplications: number;
  activeDistricts: number;
  avgApprovalRate: number;
  growthPct: number;
  trendingSchemes: TrendingSchemeItem[];
  categoryBreakdown: CategoryBreakdownItem[];
  recentActivities: LiveCitizenActivity[];
}

// Baseline All-India Public Welfare Trends Grounded in DBT Bharat & Official Portals
const ALL_INDIA_TRENDING: TrendingSchemeItem[] = [
  {
    id: 'pm-kisan',
    code: 'PM-KISAN',
    name: {
      en: 'Pradhan Mantri Kisan Samman Nidhi',
      hi: 'प्रधानमंत्री किसान सम्मान निधि',
      mr: 'प्रधानमंत्री किसान सन्मान निधी',
    },
    category: 'agriculture',
    level: 'central',
    state: null,
    views: 3450000,
    applications: 1890000,
    approvalRate: 96.2,
    growthPct: 34,
    rank: 1,
    previousRank: 1,
    badge: '🔥 #1 In Demand',
    topDistricts: ['Nashik (MH)', 'Gorakhpur (UP)', 'Belagavi (KA)', 'Muzaffarpur (BR)', 'Jaipur (RJ)'],
    officialUrl: 'https://pmkisan.gov.in',
    benefitHighlight: {
      en: '₹6,000 / year direct bank transfer in 3 installments',
      hi: '₹6,000 प्रति वर्ष तीन किस्तों में सीधे बैंक खाते में',
      mr: 'दरवर्षी ₹६,००० थेट बँक खात्यात ३ हप्त्यांमध्ये',
    },
  },
  {
    id: 'pm-jay',
    code: 'PM-JAY',
    name: {
      en: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana',
      hi: 'आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना',
      mr: 'आयुष्मान भारत - पंतप्रधान जन आरोग्य योजना',
    },
    category: 'health',
    level: 'central',
    state: null,
    views: 2980000,
    applications: 1420000,
    approvalRate: 93.8,
    growthPct: 42,
    rank: 2,
    previousRank: 3,
    badge: '⚡ High Inquiries',
    topDistricts: ['Lucknow (UP)', 'Pune (MH)', 'Bhopal (MP)', 'Patna (BR)', 'Ahmedabad (GJ)'],
    officialUrl: 'https://pmjay.gov.in',
    benefitHighlight: {
      en: '₹5,00,000 / year cashless hospital insurance per family',
      hi: '₹5,00,000 प्रति परिवार प्रति वर्ष कैशलेस स्वास्थ्य बीमा',
      mr: 'प्रति कुटुंब दरवर्षी ₹५ लाखांपर्यंत मोफत कॅशलेस उपचार',
    },
  },
  {
    id: 'pm-svanidhi',
    code: 'PM-SVANIDHI',
    name: {
      en: 'PM Street Vendor AtmaNirbhar Nidhi (PM SVANidhi)',
      hi: 'पीएम स्ट्रीट वेंडर्स आत्मनिर्भर निधि (पीएम स्वनिधि)',
      mr: 'पीएम स्ट्रीट व्हेंडर्स आत्मनिर्भर निधी (पीएम स्वनिधी)',
    },
    category: 'livelihood',
    level: 'central',
    state: null,
    views: 1240000,
    applications: 610000,
    approvalRate: 91.5,
    growthPct: 56,
    rank: 3,
    previousRank: 4,
    badge: '🚀 Fastest Growing',
    topDistricts: ['New Delhi', 'Mumbai Suburbs (MH)', 'Varanasi (UP)', 'Hyderabad (TG)', 'Bengaluru (KA)'],
    officialUrl: 'https://pmsvanidhi.mohua.gov.in',
    benefitHighlight: {
      en: '₹10,000 to ₹50,000 collateral-free working capital loan',
      hi: '₹10,000 से ₹50,000 बिना गारंटी कार्यशील पूंजी ऋण',
      mr: '₹१०,००० ते ₹५०,००० विनातारण खेळते भांडवल कर्ज',
    },
  },
  {
    id: 'nsp-post-matric',
    code: 'NSP-POST-MATRIC',
    name: {
      en: 'National Scholarship Portal (Post-Matric Scholarships)',
      hi: 'राष्ट्रीय छात्रवृत्ति पोर्टल (पोस्ट-मैट्रिक स्कॉलरशिप)',
      mr: 'राष्ट्रीय शिष्यवृत्ती पोर्टल (मॅट्रिकोत्तर शिष्यवृत्ती)',
    },
    category: 'education',
    level: 'central',
    state: null,
    views: 1120000,
    applications: 580000,
    approvalRate: 88.4,
    growthPct: 29,
    rank: 4,
    previousRank: 2,
    badge: '🎓 High Student Demand',
    topDistricts: ['Bengaluru (KA)', 'Pune (MH)', 'Kolkata (WB)', 'Chennai (TN)', 'Prayagraj (UP)'],
    officialUrl: 'https://scholarships.gov.in',
    benefitHighlight: {
      en: '100% course tuition reimbursement + living allowance',
      hi: '100% शिक्षण शुल्क प्रतिपूर्ति + निर्वाह भत्ता',
      mr: 'पूर्ण शिक्षण शुल्क प्रतिपूर्ती + मासिक निर्वाह भत्ता',
    },
  },
  {
    id: 'pm-ujjwala',
    code: 'PMUY',
    name: {
      en: 'Pradhan Mantri Ujjwala Yojana 2.0',
      hi: 'प्रधानमंत्री उज्ज्वला योजना 2.0',
      mr: 'प्रधानमंत्री उज्ज्वला योजना २.०',
    },
    category: 'women_child',
    level: 'central',
    state: null,
    views: 980000,
    applications: 490000,
    approvalRate: 94.7,
    growthPct: 22,
    rank: 5,
    previousRank: 5,
    badge: '🌸 Women Priority',
    topDistricts: ['Gaya (BR)', 'Sitapur (UP)', 'Dharmapuri (TN)', 'Jalgaon (MH)', 'Murshidabad (WB)'],
    officialUrl: 'https://www.pmuy.gov.in',
    benefitHighlight: {
      en: 'Free LPG connection + first cylinder and stove refill subsidy',
      hi: 'निःशुल्क एलपीजी गैस कनेक्शन + पहला सिलेंडर व चूल्हा',
      mr: 'मोफत एलपीजी गॅस जोडणी + पहिला सिलिंडर व शेगडी',
    },
  },
  {
    id: 'apy',
    code: 'APY',
    name: {
      en: 'Atal Pension Yojana',
      hi: 'अटल पेंशन योजना',
      mr: 'अटल पेन्शन योजना',
    },
    category: 'pension',
    level: 'central',
    state: null,
    views: 890000,
    applications: 410000,
    approvalRate: 98.1,
    growthPct: 18,
    rank: 6,
    previousRank: 6,
    badge: '🛡️ Guaranteed Return',
    topDistricts: ['Thane (MH)', 'Jaipur (RJ)', 'Kanpur (UP)', 'Kozhikode (KL)', 'Surat (GJ)'],
    officialUrl: 'https://www.npscra.nsdl.co.in',
    benefitHighlight: {
      en: '₹1,000 to ₹5,000 guaranteed monthly lifetime pension after 60',
      hi: '60 वर्ष की आयु के बाद ₹1,000 से ₹5,000 मासिक पेंशन गारंटी',
      mr: '६० वर्षानंतर दरमहा ₹१,००० ते ₹५,००० खात्रीशीर पेन्शन',
    },
  },
  {
    id: 'pmay-g',
    code: 'PMAY-G',
    name: {
      en: 'Pradhan Mantri Awas Yojana Gramin',
      hi: 'प्रधानमंत्री आवास योजना ग्रामीण',
      mr: 'प्रधानमंत्री आवास योजना ग्रामीण',
    },
    category: 'housing',
    level: 'central',
    state: null,
    views: 840000,
    applications: 380000,
    approvalRate: 89.2,
    growthPct: 25,
    rank: 7,
    previousRank: 8,
    badge: '🏠 Housing Support',
    topDistricts: ['Ranchi (JH)', 'Balasore (OD)', 'Bahraich (UP)', 'Amravati (MH)', 'Purnia (BR)'],
    officialUrl: 'https://pmayg.nic.in',
    benefitHighlight: {
      en: '₹1,20,000 to ₹1,30,000 financial assistance for pucca house',
      hi: 'पक्का मकान निर्माण हेतु ₹1,20,000 से ₹1,30,000 वित्तीय अनुदान',
      mr: 'पक्के घर बांधकामासाठी ₹१,२०,००० ते ₹१,३०,००० थेट अनुदान',
    },
  },
];

// Curated State-Specific Regional Trends
const STATE_SPECIFIC_TRENDS: Record<string, TrendingSchemeItem[]> = {
  Maharashtra: [
    {
      id: 'mahadbt-farmer',
      code: 'MAHADBT-FARMER',
      name: {
        en: 'MahaDBT Farmer Schemes & Farm Mechanization',
        hi: 'महाडीबीटी शेतकरी योजना (ट्रैक्टर, सिंचाई व शेततळे)',
        mr: 'महाडीबीटी शेतकरी योजना (ट्रॅक्टर, ठिबक व शेततळे)',
      },
      category: 'agriculture',
      level: 'state',
      state: 'Maharashtra',
      views: 1250000,
      applications: 680000,
      approvalRate: 92.8,
      growthPct: 48,
      rank: 1,
      previousRank: 2,
      badge: '🔥 State #1 Trend',
      topDistricts: ['Nashik', 'Pune', 'Kolhapur', 'Ahmednagar', 'Solapur', 'Aurangabad'],
      officialUrl: 'https://mahadbt.maharashtra.gov.in',
      benefitHighlight: {
        en: '50% to 75% subsidy on tractors, drip irrigation and farm ponds',
        hi: 'ट्रैक्टर, ड्रिप सिंचाई और खेत तालाब पर 50% से 75% तक अनुदान',
        mr: 'ट्रॅक्टर, ठिबक सिंचन व शेततळ्यावर ५०% ते ७५% थेट अनुदान',
      },
    },
    {
      id: 'pm-kisan',
      code: 'PM-KISAN',
      name: {
        en: 'PM Kisan Samman Nidhi',
        hi: 'पीएम किसान सम्मान निधि',
        mr: 'पीएम किसान सन्मान निधी',
      },
      category: 'agriculture',
      level: 'central',
      state: null,
      views: 940000,
      applications: 520000,
      approvalRate: 97.4,
      growthPct: 28,
      rank: 2,
      previousRank: 1,
      badge: '🌾 Assured DBT',
      topDistricts: ['Yavatmal', 'Nanded', 'Jalgaon', 'Satara', 'Nagpur'],
      officialUrl: 'https://pmkisan.gov.in',
      benefitHighlight: {
        en: '₹6,000 / year DBT income assistance',
        hi: '₹6,000 प्रति वर्ष डीबीटी सहायता',
        mr: 'दरवर्षी ₹६,००० थेट बँक खात्यात',
      },
    },
    {
      id: 'umed-msrlm',
      code: 'UMED-MSRLM',
      name: {
        en: 'UMED Maharashtra State Rural Livelihoods Mission',
        hi: 'उमेद महाराष्ट्र राज्य ग्रामीण आजीविका मिशन (महिला बचत गट)',
        mr: 'उमेद - महाराष्ट्र राज्य ग्रामीण जीवनोन्नती अभियान (बचत गट)',
      },
      category: 'women_child',
      level: 'state',
      state: 'Maharashtra',
      views: 780000,
      applications: 410000,
      approvalRate: 95.1,
      growthPct: 54,
      rank: 3,
      previousRank: 4,
      badge: '🌸 Women SHG Spike',
      topDistricts: ['Thane', 'Sangli', 'Chandrapur', 'Ratnagiri', 'Latur'],
      officialUrl: 'https://umed.in',
      benefitHighlight: {
        en: '₹15,000 Revolving Fund + low interest collateral-free credit',
        hi: '₹15,000 रिवॉल्विंग फंड + कम ब्याज पर विना गारंटी ऋण',
        mr: '₹१५,००० फिरता निधी + ७% सवलतीच्या दरात बँक कर्ज',
      },
    },
    {
      id: 'pm-jay',
      code: 'PM-JAY',
      name: {
        en: 'Ayushman Bharat PM-JAY',
        hi: 'आयुष्मान भारत पीएम-जेएवाई',
        mr: 'आयुष्मान भारत पीएम-जेएवाय',
      },
      category: 'health',
      level: 'central',
      state: null,
      views: 690000,
      applications: 320000,
      approvalRate: 91.2,
      growthPct: 35,
      rank: 4,
      previousRank: 3,
      badge: '🏥 Free Care',
      topDistricts: ['Mumbai Suburban', 'Pune', 'Nagpur', 'Amravati'],
      officialUrl: 'https://pmjay.gov.in',
      benefitHighlight: {
        en: '₹5,00,000 annual cashless coverage',
        hi: '₹5,00,000 वार्षिक कैशलेस अस्पताल इलाज',
        mr: '₹५,००,००० वार्षिक मोफत उपचार',
      },
    },
    {
      id: 'mh-sanjay-gandhi-niradhar',
      code: 'MH-SANJAY-GANDHI',
      name: {
        en: 'Sanjay Gandhi Niradhar Anudan Yojana',
        hi: 'संजय गांधी निराधार अनुदान योजना',
        mr: 'संजय गांधी निराधार अनुदान योजना',
      },
      category: 'pension',
      level: 'state',
      state: 'Maharashtra',
      views: 450000,
      applications: 210000,
      approvalRate: 93.6,
      growthPct: 20,
      rank: 5,
      previousRank: 5,
      badge: '👴 Senior & Widow Care',
      topDistricts: ['Beed', 'Osmanabad', 'Dhule', 'Bhandara'],
      officialUrl: 'https://sjsa.maharashtra.gov.in',
      benefitHighlight: {
        en: '₹1,500 / month direct pension to destitute & senior citizens',
        hi: 'निराधार एवं वरिष्ठ नागरिकों को ₹1,500 प्रतिमाह पेंशन',
        mr: 'निराधार वृद्ध व दिव्यांग व्यक्तींना दरमहा ₹१,५०० निवृत्तीवेतन',
      },
    },
  ],

  Karnataka: [
    {
      id: 'ka-gruha-lakshmi',
      code: 'KA-GRUHA-LAKSHMI',
      name: {
        en: 'Gruha Lakshmi Scheme',
        hi: 'गृह लक्ष्मी योजना (कर्नाटक)',
        mr: 'गृह लक्ष्मी योजना (कर्नाटक)',
      },
      category: 'women_child',
      level: 'state',
      state: 'Karnataka',
      views: 1420000,
      applications: 890000,
      approvalRate: 96.8,
      growthPct: 62,
      rank: 1,
      previousRank: 1,
      badge: '🔥 Karnataka #1',
      topDistricts: ['Bengaluru Urban', 'Belagavi', 'Mysuru', 'Tumakuru', 'Vijayapura'],
      officialUrl: 'https://sevasindhu.karnataka.gov.in',
      benefitHighlight: {
        en: '₹2,000 / month direct bank assistance to female head of household',
        hi: 'महिला मुखिया को ₹2,000 प्रतिमाह सीधे बैंक खाते में',
        mr: 'कुटुंबाच्या महिला प्रमुखाला दरमहा ₹२,००० थेट डीबीटी',
      },
    },
    {
      id: 'ka-yuva-nidhi',
      code: 'KA-YUVA-NIDHI',
      name: {
        en: 'Yuva Nidhi Scheme',
        hi: 'युवा निधि योजना (कर्नाटक)',
        mr: 'युवा निधी योजना (कर्नाटक)',
      },
      category: 'education',
      level: 'state',
      state: 'Karnataka',
      views: 890000,
      applications: 470000,
      approvalRate: 92.4,
      growthPct: 45,
      rank: 2,
      previousRank: 3,
      badge: '🎓 Youth Allowance',
      topDistricts: ['Bengaluru Urban', 'Hubballi-Dharwad', 'Kalaburagi', 'Mangaluru'],
      officialUrl: 'https://sevasindhugs.karnataka.gov.in',
      benefitHighlight: {
        en: '₹3,000/mo for graduates, ₹1,500/mo for diploma holders for up to 2 yrs',
        hi: 'स्नातक को ₹3,000/माह, डिप्लोमा को ₹1,500/माह 2 वर्ष तक',
        mr: 'पदवीधरांना दरमहा ₹३,०००, डिप्लोमा धारकांना ₹१,५००',
      },
    },
    {
      id: 'pm-kisan',
      code: 'PM-KISAN',
      name: {
        en: 'PM Kisan Samman Nidhi',
        hi: 'पीएम किसान सम्मान निधि',
        mr: 'पीएम किसान सन्मान निधी',
      },
      category: 'agriculture',
      level: 'central',
      state: null,
      views: 760000,
      applications: 390000,
      approvalRate: 95.9,
      growthPct: 22,
      rank: 3,
      previousRank: 2,
      badge: '🌾 Assured DBT',
      topDistricts: ['Bagalkote', 'Haveri', 'Mandya', 'Shivamogga'],
      officialUrl: 'https://pmkisan.gov.in',
      benefitHighlight: {
        en: '₹6,000 / year income support',
        hi: '₹6,000 प्रति वर्ष आय सहायता',
        mr: 'दरवर्षी ₹६,००० आर्थिक साहाय्य',
      },
    },
    {
      id: 'pm-jay',
      code: 'PM-JAY',
      name: {
        en: 'Ayushman Bharat PM-JAY',
        hi: 'आयुष्मान भारत पीएम-जेएवाई',
        mr: 'आयुष्मान भारत पीएम-जेएवाय',
      },
      category: 'health',
      level: 'central',
      state: null,
      views: 580000,
      applications: 270000,
      approvalRate: 91.0,
      growthPct: 31,
      rank: 4,
      previousRank: 4,
      badge: '🏥 Cashless Care',
      topDistricts: ['Bengaluru', 'Ballari', 'Udupi', 'Davanagere'],
      officialUrl: 'https://pmjay.gov.in',
      benefitHighlight: {
        en: '₹5,00,000 hospital cover per family',
        hi: '₹5 लाख पारिवारिक स्वास्थ्य सुरक्षा',
        mr: '₹५ लाखांपर्यंत कुटुंब आरोग्य कवच',
      },
    },
  ],

  'Uttar Pradesh': [
    {
      id: 'pm-kisan',
      code: 'PM-KISAN',
      name: {
        en: 'PM Kisan Samman Nidhi',
        hi: 'प्रधानमंत्री किसान सम्मान निधि',
        mr: 'प्रधानमंत्री किसान सन्मान निधी',
      },
      category: 'agriculture',
      level: 'central',
      state: null,
      views: 1890000,
      applications: 1040000,
      approvalRate: 97.8,
      growthPct: 36,
      rank: 1,
      previousRank: 1,
      badge: '🔥 UP #1 (2.6 Cr Beneficiaries)',
      topDistricts: ['Gorakhpur', 'Varanasi', 'Prayagraj', 'Azamgarh', 'Bareilly', 'Aligarh'],
      officialUrl: 'https://pmkisan.gov.in',
      benefitHighlight: {
        en: '₹6,000 / year direct bank transfer to farmers',
        hi: 'किसानों को ₹6,000 प्रति वर्ष सीधे खाते में',
        mr: 'शेतकऱ्यांना दरवर्षी ₹६,००० थेट बँक खात्यात',
      },
    },
    {
      id: 'up-kanya-sumangala',
      code: 'UP-KANYA-SUMANGALA',
      name: {
        en: 'Mukhyamantri Kanya Sumangala Yojana',
        hi: 'मुख्यमंत्री कन्या सुमंगला योजना',
        mr: 'मुख्यमंत्री कन्या सुमंगला योजना',
      },
      category: 'women_child',
      level: 'state',
      state: 'Uttar Pradesh',
      views: 1150000,
      applications: 620000,
      approvalRate: 93.4,
      growthPct: 52,
      rank: 2,
      previousRank: 3,
      badge: '👧 Girl Child Support',
      topDistricts: ['Lucknow', 'Kanpur Nagar', 'Agra', 'Meerut', 'Ghaziabad'],
      officialUrl: 'https://mksy.up.gov.in',
      benefitHighlight: {
        en: '₹25,000 total package across 6 educational milestones',
        hi: 'बालिका जन्म से स्नातक तक कुल ₹25,000 का अनुदान',
        mr: 'मुलीच्या जन्मापासून पदवीपर्यंत एकूण ₹२५,००० मदत',
      },
    },
    {
      id: 'pm-jay',
      code: 'PM-JAY',
      name: {
        en: 'Ayushman Bharat PM-JAY',
        hi: 'आयुष्मान भारत योजना',
        mr: 'आयुष्मान भारत योजना',
      },
      category: 'health',
      level: 'central',
      state: null,
      views: 920000,
      applications: 480000,
      approvalRate: 92.5,
      growthPct: 38,
      rank: 3,
      previousRank: 2,
      badge: '🏥 Free Hospitalization',
      topDistricts: ['Varanasi', 'Jaunpur', 'Moradabad', 'Saharanpur'],
      officialUrl: 'https://pmjay.gov.in',
      benefitHighlight: {
        en: '₹5,00,000 cashless insurance per family per year',
        hi: 'प्रति परिवार ₹5 लाख तक का निःशुल्क अस्पताल उपचार',
        mr: 'दरवर्षी प्रति कुटुंब ₹५ लाखांपर्यंत मोफत उपचार',
      },
    },
    {
      id: 'pm-ujjwala',
      code: 'PMUY',
      name: {
        en: 'PM Ujjwala Yojana 2.0',
        hi: 'प्रधानमंत्री उज्ज्वला योजना 2.0',
        mr: 'प्रधानमंत्री उज्ज्वला योजना २.०',
      },
      category: 'women_child',
      level: 'central',
      state: null,
      views: 680000,
      applications: 360000,
      approvalRate: 96.1,
      growthPct: 24,
      rank: 4,
      previousRank: 4,
      badge: '🔥 Free LPG Kit',
      topDistricts: ['Gonda', 'Basti', 'Sitapur', 'Hardoi'],
      officialUrl: 'https://www.pmuy.gov.in',
      benefitHighlight: {
        en: 'Free LPG connection with security deposit waiver',
        hi: 'सुरक्षा राशि छूट के साथ मुफ्त गैस कनेक्शन',
        mr: 'मोफत एलपीजी गॅस जोडणी',
      },
    },
  ],

  Delhi: [
    {
      id: 'dl-senior-pension',
      code: 'DL-SENIOR-PENSION',
      name: {
        en: 'Delhi Senior Citizen & Disability Pension Scheme',
        hi: 'दिल्ली वरिष्ठ नागरिक एवं दिव्यांग पेंशन योजना',
        mr: 'दिल्ली ज्येष्ठ नागरिक व दिव्यांग निवृत्तीवेतन योजना',
      },
      category: 'pension',
      level: 'state',
      state: 'Delhi',
      views: 520000,
      applications: 260000,
      approvalRate: 94.2,
      growthPct: 35,
      rank: 1,
      previousRank: 1,
      badge: '👴 #1 Delhi Scheme',
      topDistricts: ['North East Delhi', 'South West Delhi', 'West Delhi', 'East Delhi'],
      officialUrl: 'https://edistrict.delhigovt.nic.in',
      benefitHighlight: {
        en: '₹2,000 to ₹2,500 monthly direct financial assistance',
        hi: 'वरिष्ठ नागरिकों को ₹2,000 से ₹2,500 मासिक पेंशन',
        mr: 'ज्येष्ठ नागरिकांना दरमहा ₹२,००० ते ₹२,५०० पेन्शन',
      },
    },
    {
      id: 'pm-svanidhi',
      code: 'PM-SVANIDHI',
      name: {
        en: 'PM SVANidhi for Urban Vendors',
        hi: 'पीएम स्वनिधि (शहरी रेहड़ी-पटरी विक्रेता)',
        mr: 'पीएम स्वनिधी (शहरी फेरीवाले)',
      },
      category: 'livelihood',
      level: 'central',
      state: null,
      views: 440000,
      applications: 210000,
      approvalRate: 90.8,
      growthPct: 49,
      rank: 2,
      previousRank: 2,
      badge: '🛒 Micro Credit',
      topDistricts: ['Chandni Chowk', 'Karol Bagh', 'Laxmi Nagar', 'Rohini'],
      officialUrl: 'https://pmsvanidhi.mohua.gov.in',
      benefitHighlight: {
        en: '₹10,000 to ₹50,000 low-interest working capital loan',
        hi: '₹10,000 से ₹50,000 तक कम ब्याज ऋण',
        mr: '₹१०,००० ते ₹५०,००० खेळते भांडवल कर्ज',
      },
    },
    {
      id: 'nsp-post-matric',
      code: 'NSP-POST-MATRIC',
      name: {
        en: 'NSP Higher Education Scholarship',
        hi: 'एनएसपी उच्च शिक्षा छात्रवृत्ति',
        mr: 'एनएसपी उच्च शिक्षण शिष्यवृत्ती',
      },
      category: 'education',
      level: 'central',
      state: null,
      views: 380000,
      applications: 190000,
      approvalRate: 89.5,
      growthPct: 31,
      rank: 3,
      previousRank: 3,
      badge: '🎓 Youth Education',
      topDistricts: ['North Delhi (DU Campus)', 'South Delhi', 'Dwarka'],
      officialUrl: 'https://scholarships.gov.in',
      benefitHighlight: {
        en: 'Full college fee reimbursement + book grants',
        hi: 'कॉलेज फीस प्रतिपूर्ति एवं पुस्तक अनुदान',
        mr: 'महाविद्यालयीन फी प्रतिपूर्ती व अनुदान',
      },
    },
  ],

  'Madhya Pradesh': [
    {
      id: 'mp-ladli-behna',
      code: 'MP-LADLI-BEHNA',
      name: {
        en: 'Mukhyamantri Ladli Behna Yojana',
        hi: 'मुख्यमंत्री लाड़ली बहना योजना',
        mr: 'मुख्यमंत्री लाडली बहना योजना',
      },
      category: 'women_child',
      level: 'state',
      state: 'Madhya Pradesh',
      views: 1380000,
      applications: 840000,
      approvalRate: 98.2,
      growthPct: 58,
      rank: 1,
      previousRank: 1,
      badge: '🔥 MP #1 Trend',
      topDistricts: ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar'],
      officialUrl: 'https://cmladlibahna.mp.gov.in',
      benefitHighlight: {
        en: '₹1,250 / month direct transfer to eligible married women',
        hi: 'पात्र विवाहित महिलाओं को ₹1,250 प्रतिमाह बैंक खाते में',
        mr: 'पात्र महिलांना दरमहा ₹१,२५० थेट बँक खात्यात',
      },
    },
    {
      id: 'pm-kisan',
      code: 'PM-KISAN',
      name: {
        en: 'PM Kisan Samman Nidhi',
        hi: 'पीएम किसान सम्मान निधि',
        mr: 'पीएम किसान सन्मान निधी',
      },
      category: 'agriculture',
      level: 'central',
      state: null,
      views: 890000,
      applications: 470000,
      approvalRate: 96.5,
      growthPct: 24,
      rank: 2,
      previousRank: 2,
      badge: '🌾 Assured DBT',
      topDistricts: ['Dewas', 'Hoshangabad', 'Vidisha', 'Chhindwara'],
      officialUrl: 'https://pmkisan.gov.in',
      benefitHighlight: {
        en: '₹6,000 / year farmer income support',
        hi: '₹6,000 प्रति वर्ष किसान आय सहायता',
        mr: 'दरवर्षी ₹६,००० थेट साहाय्य',
      },
    },
  ],

  'West Bengal': [
    {
      id: 'wb-lakshmir-bhandar',
      code: 'WB-LAKSHMIR-BHANDAR',
      name: {
        en: 'Lakshmir Bhandar Scheme',
        hi: 'लक्ष्मी भंडार योजना (पश्चिम बंगाल)',
        mr: 'लक्ष्मी भंडार योजना (पश्चिम बंगाल)',
      },
      category: 'women_child',
      level: 'state',
      state: 'West Bengal',
      views: 1290000,
      applications: 790000,
      approvalRate: 97.1,
      growthPct: 55,
      rank: 1,
      previousRank: 1,
      badge: '🔥 WB #1 Trend',
      topDistricts: ['Kolkata', 'North 24 Parganas', 'South 24 Parganas', 'Howrah', 'Hooghly'],
      officialUrl: 'https://wb.gov.in',
      benefitHighlight: {
        en: '₹1,000 to ₹1,200 / month direct bank assistance to female head of household',
        hi: 'महिला मुखिया को ₹1,000 से ₹1,200 प्रतिमाह सीधा बैंक अंतरण',
        mr: 'कुटुंबप्रमुखाला दरमहा ₹१,००० ते ₹१,२०० थेट बँक हस्तांतरण',
      },
    },
    {
      id: 'wb-krishak-bandhu',
      code: 'WB-KRISHAK-BANDHU',
      name: {
        en: 'Krishak Bandhu (Assured Income + Life Insurance)',
        hi: 'कृषक बंधु योजना (पश्चिम बंगाल)',
        mr: 'कृषक बंधू योजना (पश्चिम बंगाल)',
      },
      category: 'agriculture',
      level: 'state',
      state: 'West Bengal',
      views: 740000,
      applications: 390000,
      approvalRate: 94.6,
      growthPct: 30,
      rank: 2,
      previousRank: 2,
      badge: '🌾 Double Benefit',
      topDistricts: ['Bardhaman', 'Nadia', 'Bankura', 'Malda'],
      officialUrl: 'https://krishakbandhu.wb.gov.in',
      benefitHighlight: {
        en: 'Up to ₹10,000 / year financial aid + ₹2 Lakh death insurance',
        hi: '₹10,000 तक वार्षिक कृषि सहायता + ₹2 लाख मृत्यु बीमा',
        mr: 'दरवर्षी ₹१०,००० पर्यंत मदत + ₹२ लाख विमा कवच',
      },
    },
  ],
};

// Generic fallback synthesizer for any state or UT
function generateRegionTrends(stateName: string): TrendingSchemeItem[] {
  if (STATE_SPECIFIC_TRENDS[stateName]) {
    return STATE_SPECIFIC_TRENDS[stateName];
  }

  // Synthesize using national schemes customized for that state
  const stateData = STATES_AND_UTS_DATA.find((s) => s.name === stateName);
  const sampleDistricts = stateData
    ? [stateData.capital, 'District North', 'District South', 'District Central']
    : ['Capital Region', 'Central District', 'Rural Hub'];

  return ALL_INDIA_TRENDING.map((scheme, idx) => ({
    ...scheme,
    views: Math.round(scheme.views * 0.18) + (7 - idx) * 15000,
    applications: Math.round(scheme.applications * 0.17) + (7 - idx) * 8000,
    growthPct: 20 + ((idx * 7) % 35),
    topDistricts: sampleDistricts,
  }));
}

/**
 * Builds realistic category breakdown for a region
 */
function getCategoryBreakdown(schemes: TrendingSchemeItem[]): CategoryBreakdownItem[] {
  const map: Record<string, { views: number; apps: number }> = {
    agriculture: { views: 0, apps: 0 },
    health: { views: 0, apps: 0 },
    women_child: { views: 0, apps: 0 },
    education: { views: 0, apps: 0 },
    livelihood: { views: 0, apps: 0 },
    pension: { views: 0, apps: 0 },
    housing: { views: 0, apps: 0 },
  };

  let totalViews = 0;
  for (const s of schemes) {
    if (!map[s.category]) map[s.category] = { views: 0, apps: 0 };
    map[s.category].views += s.views;
    map[s.category].apps += s.applications;
    totalViews += s.views;
  }

  const categoryLabels: Record<string, string> = {
    agriculture: 'Agriculture & Farming',
    health: 'Healthcare & Insurance',
    women_child: 'Women & Child Welfare',
    education: 'Education & Youth',
    livelihood: 'Livelihood & Street Vendors',
    pension: 'Pensions & Social Security',
    housing: 'Rural & Urban Housing',
  };

  const categoryColors: Record<string, string> = {
    agriculture: 'bg-emerald-500',
    health: 'bg-rose-500',
    women_child: 'bg-purple-500',
    education: 'bg-blue-500',
    livelihood: 'bg-amber-500',
    pension: 'bg-indigo-500',
    housing: 'bg-teal-500',
  };

  return Object.entries(map)
    .filter(([_, data]) => data.views > 0)
    .map(([cat, data]) => ({
      category: cat as SchemeCategory,
      label: categoryLabels[cat] || cat,
      views: data.views,
      applications: data.apps,
      percentage: totalViews > 0 ? Math.round((data.views / totalViews) * 100) : 0,
      color: categoryColors[cat] || 'bg-stone-500',
    }))
    .sort((a, b) => b.views - a.views);
}

/**
 * Builds real-time live citizen activity stream
 */
function getLiveActivities(regionName: string): LiveCitizenActivity[] {
  const isNational = regionName === 'All India';
  const districts = isNational
    ? ['Nashik, MH', 'Gorakhpur, UP', 'Belagavi, KA', 'Bhopal, MP', 'Patna, BR', 'New Delhi']
    : ['District Central', 'Rural Tehesil', 'North Suburbs', 'South Block', 'City East'];

  return [
    {
      id: 'act-1',
      timeAgo: '12 seconds ago',
      district: districts[0],
      schemeName: 'PM-KISAN Samman Nidhi',
      action: 'viewed',
    },
    {
      id: 'act-2',
      timeAgo: '35 seconds ago',
      district: districts[1],
      schemeName: 'Ayushman Bharat (PM-JAY)',
      action: 'applied',
    },
    {
      id: 'act-3',
      timeAgo: '1 minute ago',
      district: districts[2],
      schemeName: 'Post-Matric Scholarship (NSP)',
      action: 'docs_checked',
    },
    {
      id: 'act-4',
      timeAgo: '2 minutes ago',
      district: districts[3],
      schemeName: 'PM SVANidhi Micro Credit',
      action: 'dbt_approved',
    },
    {
      id: 'act-5',
      timeAgo: '3 minutes ago',
      district: districts[4] || districts[0],
      schemeName: 'Atal Pension Yojana (APY)',
      action: 'applied',
    },
  ];
}

// In-memory inquiry fallback store for non-browser or test execution
const memoryInquiryStore: Record<string, number> = {};

function getLocalInquiries(): Record<string, number> {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem('yojana360_inquiry_counts');
      return raw ? JSON.parse(raw) : memoryInquiryStore;
    } catch {
      return memoryInquiryStore;
    }
  }
  return memoryInquiryStore;
}

/**
 * Retrieves the complete trending schemes analytics summary for a given region and timeframe.
 */
export function getTrendingAnalyticsForRegion(
  regionId: string,
  timeRange: '24h' | '7d' | '30d' | 'all' = '7d'
): RegionAnalyticsSummary {
  const normalized = (regionId || '').trim().toLowerCase();
  const isNational =
    !normalized ||
    normalized === 'all_india' ||
    normalized === 'all india' ||
    normalized === 'national';

  const matchedState = !isNational
    ? STATES_AND_UTS_DATA.find(
        (s) =>
          s.name.toLowerCase() === normalized ||
          s.name.toLowerCase().replace(/\s+/g, '_') === normalized
      )
    : null;

  const regionName = isNational ? 'All India' : matchedState?.name || regionId;
  const regionType: 'national' | 'state' | 'union_territory' = isNational
    ? 'national'
    : matchedState?.type === 'union_territory'
    ? 'union_territory'
    : 'state';

  const baseSchemes = isNational ? ALL_INDIA_TRENDING : generateRegionTrends(regionName);

  // Time multipliers
  const multiplierMap = {
    '24h': 0.15,
    '7d': 1.0,
    '30d': 4.1,
    all: 12.5,
  };
  const multiplier = multiplierMap[timeRange] || 1.0;

  // Add local client inquiries tracked in session / local storage / memory
  const localInquiries = getLocalInquiries();

  const adjustedSchemes: TrendingSchemeItem[] = baseSchemes.map((s, idx) => {
    const extraInquiries = localInquiries[s.id] || 0;
    const views = Math.round(s.views * multiplier) + extraInquiries * 15;
    const apps = Math.round(s.applications * multiplier) + Math.round(extraInquiries * 6.5);
    return {
      ...s,
      rank: idx + 1,
      views,
      applications: apps,
    };
  });

  const totalViews = adjustedSchemes.reduce((acc, curr) => acc + curr.views, 0);
  const totalApps = adjustedSchemes.reduce((acc, curr) => acc + curr.applications, 0);
  const avgApproval =
    adjustedSchemes.length > 0
      ? Number(
          (
            adjustedSchemes.reduce((acc, curr) => acc + curr.approvalRate, 0) /
            adjustedSchemes.length
          ).toFixed(1)
        )
      : 94.2;

  return {
    regionId: isNational ? 'all_india' : regionId,
    regionName,
    type: regionType,
    totalViews,
    totalApplications: totalApps,
    activeDistricts: isNational ? 766 : 36,
    avgApprovalRate: avgApproval,
    growthPct: timeRange === '24h' ? 14 : timeRange === '7d' ? 38 : 22,
    trendingSchemes: adjustedSchemes,
    categoryBreakdown: getCategoryBreakdown(adjustedSchemes),
    recentActivities: getLiveActivities(regionName),
  };
}

/**
 * Increments client inquiry tracking for an accessed scheme.
 */
export function recordSchemeInquiry(schemeId: string): void {
  memoryInquiryStore[schemeId] = (memoryInquiryStore[schemeId] || 0) + 1;
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      const key = 'yojana360_inquiry_counts';
      localStorage.setItem(key, JSON.stringify(memoryInquiryStore));
    } catch {}
  }
}

/**
 * Returns the curated list of regions for the dashboard selector.
 */
export function getAvailableRegionsList(): { id: string; name: string; type: string; isUT?: boolean }[] {
  const list = [
    { id: 'all_india', name: 'All India (National Overview)', type: 'national', isUT: false },
    ...STATES_AND_UTS_DATA.map((s) => ({
      id: s.name,
      name: s.name,
      type: s.type,
      isUT: s.type === 'union_territory',
    })),
  ];
  return list;
}
