/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LocalizedString } from '../lib/engine/types.ts';

export interface StatePortalInfo {
  name: string;
  url: string;
  department: string;
  badge: string;
  description: LocalizedString;
  keyServices: LocalizedString[];
}

export interface StateDocumentRequirement {
  name: LocalizedString;
  purpose: LocalizedString;
  mandatory: boolean;
}

export interface StateFlagshipScheme {
  id: string;
  code: string;
  name: LocalizedString;
  benefit: string;
  category: string;
  targetGroup: LocalizedString;
  officialUrl: string;
  summary: LocalizedString;
}

export interface StateData {
  id: string;
  code: string; // 2-letter ISO code
  name: string; // canonical name in English
  type: 'state' | 'union_territory';
  capital: string;
  regionalLanguages: string[];
  localizedName: LocalizedString;
  portal: StatePortalInfo;
  keyDocuments: StateDocumentRequirement[];
  flagshipSchemes: StateFlagshipScheme[];
  helpline?: string;
}

export const STATES_AND_UTS_DATA: StateData[] = [
  // 1. Andhra Pradesh
  {
    id: 'andhra-pradesh',
    code: 'AP',
    name: 'Andhra Pradesh',
    type: 'state',
    capital: 'Amaravati',
    regionalLanguages: ['Telugu', 'English'],
    localizedName: {
      en: 'Andhra Pradesh',
      hi: 'आंध्र प्रदेश',
      mr: 'आंध्र प्रदेश',
      te: 'ఆంధ్రప్రదేశ్',
    },
    portal: {
      name: 'MeeSeva Andhra Pradesh',
      url: 'https://meeseva.ap.gov.in',
      department: 'ITE&C Department, Government of Andhra Pradesh',
      badge: 'State Single-Window & Navasakam',
      description: {
        en: 'Official single-window portal providing digital citizen services, Navasakam beneficiary identification, and direct benefit transfers.',
        hi: 'नागरिक सेवाओं, नवसकम लाभार्थी पहचान एवं प्रत्यक्ष लाभ हस्तांतरण हेतु आधिकारिक एकल खिड़की पोर्टल।',
        mr: 'नागरी सेवा, नवसकम लाभार्थी ओळख आणि थेट लाभ हस्तांतरणासाठी अधिकृत राज्य पोर्टल.',
      },
      keyServices: [
        { en: 'Navasakam Scheme Beneficiary Card Search', hi: 'नवसकम योजना लाभार्थी कार्ड खोज', mr: 'नवसकम योजना लाभार्थी कार्ड शोध' },
        { en: 'Integrated Certificate (Caste, Nativity & Date of Birth)', hi: 'एकीकृत प्रमाण पत्र (जाति, निवास एवं जन्म)', mr: 'एकात्मिक दाखला (जात, अधिवास)' },
        { en: 'Adangal & 1B Land Revenue Records', hi: 'अदंगल एवं 1B भू-अभिलेख', mr: 'अदंगल व 1B जमीन महसूल नोंदणी' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Aadhaar Card', hi: 'आधार कार्ड', mr: 'आधार कार्ड' }, purpose: { en: 'Identity and biometric authentication', hi: 'पहचान एवं ई-केवाईसी', mr: 'ओळख पडताळणी' }, mandatory: true },
      { name: { en: 'Rice Card / Smart BPL Card', hi: 'राइस कार्ड / बीपीएल राशन कार्ड', mr: 'राइस कार्ड / बीपीएल रेशन कार्ड' }, purpose: { en: 'Income & welfare qualification', hi: 'आय एवं पात्रता सत्यापन', mr: 'उत्पन्न व कल्याणकारी पात्रता' }, mandatory: true },
      { name: { en: 'Meebhoomi 1B / Adangal Extract', hi: 'मीभूमि अदंगल / 1B भू-अभिलेख', mr: 'मीभूमी अदंगल / 1B जमीन उतारा' }, purpose: { en: 'Agricultural landholding validation', hi: 'कृषि भूमि सत्यापन', mr: 'शेती जमीन पडताळणी' }, mandatory: false },
    ],
    flagshipSchemes: [
      {
        id: 'ap-rythu-bharosa',
        code: 'AP-RB',
        name: { en: 'YSR Rythu Bharosa', hi: 'वाईएसआर रायथू भरोसा', mr: 'वायएसआर रयतू भरोसा' },
        benefit: '₹13,500 / year financial aid for farmers',
        category: 'agriculture',
        targetGroup: { en: 'Small, marginal and tenant farmers', hi: 'छोटे, सीमांत एवं बटाईदार किसान', mr: 'लहान, सीमांत व शेतकरी' },
        officialUrl: 'https://ysrrythubharosa.ap.gov.in',
        summary: { en: 'Input financial support provided in three installments annually to landowning and tenant farmers.', hi: 'भूमि मालिक और बटाईदार किसानों को तीन किस्तों में प्रति वर्ष वित्तीय सहायता।', mr: 'जमीनधारक आणि भाडेकरू शेतकऱ्यांना वर्षाला तीन हप्त्यांत आर्थिक मदत.' },
      },
      {
        id: 'ap-amma-vodi',
        code: 'AP-AV',
        name: { en: 'Jagananna Amma Vodi', hi: 'जगन्ना अम्मा वोडी', mr: 'जगन्ना अम्मा वोडी' },
        benefit: '₹15,000 / year direct bank deposit to mothers',
        category: 'education',
        targetGroup: { en: 'Mothers educating children from Class 1 to 12', hi: 'कक्षा 1 से 12 तक पढ़ाने वाली माताएं', mr: 'पहिली ते बारावी शिकणाऱ्या मुलांच्या माता' },
        officialUrl: 'https://jaganannaammavodi.ap.gov.in',
        summary: { en: 'Direct benefit transfer to BPL mothers to support school education and stop student dropouts.', hi: 'छात्रों को स्कूल भेजने वाली बीपीएल माताओं को ₹15,000 की वार्षिक सहायता।', mr: 'मुलांच्या शालेय शिक्षणाला प्रोत्साहन देण्यासाठी थेट मातांच्या खात्यात ₹१५,००० जमा.' },
      },
    ],
  },

  // 2. Arunachal Pradesh
  {
    id: 'arunachal-pradesh',
    code: 'AR',
    name: 'Arunachal Pradesh',
    type: 'state',
    capital: 'Itanagar',
    regionalLanguages: ['English', 'Hindi'],
    localizedName: { en: 'Arunachal Pradesh', hi: 'अरुणाचल प्रदेश', mr: 'अरुणाचल प्रदेश' },
    portal: {
      name: 'ServicePlus Arunachal Pradesh',
      url: 'https://eservice.arunachal.gov.in',
      department: 'Department of IT & Communication, Government of Arunachal Pradesh',
      badge: 'State e-Services Portal',
      description: {
        en: 'Official state portal for electronic delivery of tribal certificates, domicile, land possession certificates (LPC), and welfare benefits.',
        hi: 'जनजातीय प्रमाण पत्र, निवास, भूमि कब्जा प्रमाण पत्र (एलपीसी) और कल्याणकारी लाभ हेतु आधिकारिक पोर्टल।',
        mr: 'आदिवासी दाखले, अधिवास, जमीन ताबा प्रमाणपत्र (LPC) साठीचे अधिकृत पोर्टल.',
      },
      keyServices: [
        { en: 'Scheduled Tribe (APST) Certificate', hi: 'अरुणाचल प्रदेश एसटी प्रमाण पत्र', mr: 'अनुसूचित जमाती (APST) दाखला' },
        { en: 'Land Possession Certificate (LPC)', hi: 'भूमि कब्जा प्रमाण पत्र (एलपीसी)', mr: 'जमीन ताबा प्रमाणपत्र (LPC)' },
        { en: 'Permanent Residence Certificate (PRC)', hi: 'स्थायी निवास प्रमाण पत्र', mr: 'कायमस्वरूपी रहिवासी दाखला' },
      ],
    },
    keyDocuments: [
      { name: { en: 'APST Certificate', hi: 'एपी जनजातीय प्रमाण पत्र', mr: 'APST दाखला' }, purpose: { en: 'State affirmative rights', hi: 'राज्य आरक्षण लाभ', mr: 'राज्य हक्क पडताळणी' }, mandatory: true },
      { name: { en: 'Permanent Residence Certificate', hi: 'स्थायी निवास प्रमाण पत्र', mr: 'अधिवास दाखला' }, purpose: { en: 'State domicile proof', hi: 'मूल निवास प्रमाण', mr: 'रहिवासी पुरावा' }, mandatory: true },
    ],
    flagshipSchemes: [
      {
        id: 'ar-krishi-rinn',
        code: 'AR-KRY',
        name: { en: "Chief Minister's Krishi Rinn Yojana", hi: 'मुख्यमंत्री कृषि ऋण योजना', mr: 'मुख्यमंत्री कृषी कर्ज योजना' },
        benefit: 'Zero percent interest on crop loans up to ₹3 Lakh',
        category: 'agriculture',
        targetGroup: { en: 'Farmers and Self-Help Groups (SHGs)', hi: 'किसान और स्वयं सहायता समूह', mr: 'शेतकरी आणि महिला बचत गट' },
        officialUrl: 'https://arunachalpradesh.gov.in',
        summary: { en: 'Provides 4% interest subvention on timely repayment of Kisan Credit Card (KCC) loans.', hi: 'केसीसी ऋणों पर समय पर भुगतान करने पर ब्याज छूट।', mr: 'पीक कर्जावर व्याज परतावा आणि शून्य टक्के व्याज लाभ.' },
      },
    ],
  },

  // 3. Assam
  {
    id: 'assam',
    code: 'AS',
    name: 'Assam',
    type: 'state',
    capital: 'Dispur',
    regionalLanguages: ['Assamese', 'Bengali', 'Bodo', 'English'],
    localizedName: { en: 'Assam', hi: 'असम', mr: 'आसाम', bn: 'আসাম' },
    portal: {
      name: 'Sewa Setu Assam',
      url: 'https://sewasetu.assam.gov.in',
      department: 'Administrative Reforms & Grievances Department, Govt of Assam',
      badge: 'Right to Public Services Portal',
      description: {
        en: 'Integrated citizen gateway providing over 500 government-to-citizen services under the Assam Right to Public Services Act.',
        hi: 'असम लोक सेवा अधिकार अधिनियम के तहत 500 से अधिक सेवाओं का एकीकृत नागरिक प्रवेश द्वार।',
        mr: 'आसाम लोकसेवा हमी कायद्यांतर्गत ५०० हून अधिक सेवा पुरवणारे अधिकृत पोर्टल.',
      },
      keyServices: [
        { en: 'Orunodoi 3.0 DBT Application & Status', hi: 'ओरुनोदोई डीबीटी आवेदन व स्थिति', mr: 'ओरुनोदोई थेट लाभ अर्ज व स्थिती' },
        { en: 'Dharitree Jamabandi & Mutation (Mission Basundhara)', hi: 'मिशन वसुंधरा जमाबंदी व नामांतरण', mr: 'मिशन वसुंधरा जमीन फेरफार व जमाबंदी' },
        { en: 'Permanent Resident Certificate (PRC)', hi: 'स्थायी निवास प्रमाण पत्र', mr: 'कायमस्वरूपी रहिवासी प्रमाणपत्र' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Aadhaar Card / Ration Card', hi: 'आधार / राशन कार्ड', mr: 'आधार किंवा रेशन कार्ड' }, purpose: { en: 'Identity and NFSA eligibility', hi: 'पहचान और खाद्य सुरक्षा', mr: 'ओळख आणि अन्न सुरक्षा' }, mandatory: true },
      { name: { en: 'Jamabandi Land Record', hi: 'जमाबंदी भू-अभिलेख', mr: 'जमाबंदी महसूल नोंद' }, purpose: { en: 'Land tenure and farmer verification', hi: 'कृषि भूमि सत्यापन', mr: 'जमीन मालकी पडताळणी' }, mandatory: false },
    ],
    flagshipSchemes: [
      {
        id: 'as-orunodoi',
        code: 'AS-ORUN',
        name: { en: 'Orunodoi 3.0 Scheme', hi: 'ओरुनोदोई 3.0 योजना', mr: 'ओरुनोदोई ३.० योजना' },
        benefit: '₹1,250 / month direct bank transfer to women heads',
        category: 'women_child',
        targetGroup: { en: 'Economically vulnerable women and families', hi: 'आर्थिक रूप से कमजोर परिवारों की महिलाएं', mr: 'आर्थिकदृष्ट्या दुर्बल महिला कुटुंबप्रमुख' },
        officialUrl: 'https://orunodoi.assam.gov.in',
        summary: { en: 'Flagship DBT program empowering female heads of poor households to purchase nutrition and medicine.', hi: 'गरीब परिवारों की महिला मुखिया को पोषण व दवाइयों हेतु ₹1,250 मासिक सहायता।', mr: 'महिलांच्या सक्षमीकरणासाठी पोषण व औषधोपचाराकरिता दरमहा ₹१,२५० थेट बँक खात्यात.' },
      },
    ],
  },

  // 4. Bihar
  {
    id: 'bihar',
    code: 'BR',
    name: 'Bihar',
    type: 'state',
    capital: 'Patna',
    regionalLanguages: ['Hindi', 'Bhojpuri', 'Maithili', 'Magahi', 'Urdu'],
    localizedName: { en: 'Bihar', hi: 'बिहार', mr: 'बिहार' },
    portal: {
      name: 'RTPS Bihar (ServicePlus)',
      url: 'https://serviceonline.bihar.gov.in',
      department: 'General Administration Department, Government of Bihar',
      badge: 'Right to Public Services (RTPS)',
      description: {
        en: 'Official state portal for timely issuance of residential certificates, caste certificates, OBC-NCL, and DBT welfare applications.',
        hi: 'निवास प्रमाण पत्र, जाति प्रमाण पत्र, ईडब्ल्यूएस, और कल्याणकारी योजनाओं हेतु बिहार सरकार का आधिकारिक पोर्टल।',
        mr: 'रहिवासी दाखला, जात प्रमाणपत्र, नॉन-क्रिमिलेअर आणि कल्याणकारी योजनांसाठी बिहारचे अधिकृत पोर्टल.',
      },
      keyServices: [
        { en: 'Caste, Income & Residential Certificates', hi: 'जाति, आय एवं निवास प्रमाण पत्र', mr: 'जात, उत्पन्न व रहिवासी दाखला' },
        { en: 'Non-Creamy Layer (OBC/EBC) Issuance', hi: 'गैर-क्रीमी लेयर प्रमाण पत्र', mr: 'नॉन-क्रिमीलेअर प्रमाणपत्र' },
        { en: 'Kanya Utthan & Student Credit Card Status', hi: 'कन्या उत्थान एवं स्टूडेंट क्रेडिट कार्ड स्थिति', mr: 'कन्या उत्थान व विद्यार्थी क्रेडिट कार्ड स्थिती' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Aadhaar Card', hi: 'आधार कार्ड', mr: 'आधार कार्ड' }, purpose: { en: 'Biometric identity proof', hi: 'पहचान व आधार प्रमाणीकरण', mr: 'ओळख पुरावा' }, mandatory: true },
      { name: { en: 'Ration Card / BPL Certificate', hi: 'राशन कार्ड', mr: 'रेशन कार्ड' }, purpose: { en: 'Socio-economic verification', hi: 'सामाजिक-आर्थिक पात्रता', mr: 'कौटुंबिक उत्पन्न पात्रता' }, mandatory: false },
    ],
    flagshipSchemes: [
      {
        id: 'br-kanya-utthan',
        code: 'BR-MKUY',
        name: { en: 'Mukhyamantri Kanya Utthan Yojana', hi: 'मुख्यमंत्री कन्या उत्थान योजना', mr: 'मुख्यमंत्री कन्या उत्थान योजना' },
        benefit: 'Up to ₹50,000 financial incentive on completing Graduation',
        category: 'education',
        targetGroup: { en: 'Girl students from birth to graduation', hi: 'बालिकाओं के जन्म से लेकर स्नातक तक', mr: 'मुलींच्या जन्मापासून पदवीपर्यंत' },
        officialUrl: 'https://medhasoft.bih.nic.in',
        summary: { en: 'Holistic scholarship and incentive provided to girl students across milestones to prevent child marriage and promote female higher education.', hi: 'बालिकाओं की उच्च शिक्षा को बढ़ावा देने और बाल विवाह रोकने हेतु जन्म से स्नातक तक वित्तीय सहायता।', mr: 'मुलींच्या शिक्षणाला चालना देण्यासाठी जन्मापासून पदवीपर्यंत टप्प्याटप्प्याने ₹५०,००० पर्यंत थेट लाभ.' },
      },
      {
        id: 'br-student-credit-card',
        code: 'BR-BSCC',
        name: { en: 'Bihar Student Credit Card Scheme', hi: 'बिहार स्टूडेंट क्रेडिट कार्ड योजना', mr: 'बिहार विद्यार्थी क्रेडिट कार्ड योजना' },
        benefit: 'Education loan up to ₹4 Lakh at nominal 1% interest for women',
        category: 'education',
        targetGroup: { en: '12th pass youth pursuing higher education', hi: '12वीं पास उच्च शिक्षा प्राप्त करने वाले युवा', mr: 'उच्च शिक्षण घेणारे १२वी उत्तीर्ण विद्यार्थी' },
        officialUrl: 'https://www.7nishchay-yuvaupmission.bihar.gov.in',
        summary: { en: 'Part of 7 Nischay guaranteeing collateral-free low interest education loans for professional colleges.', hi: 'उच्च शिक्षा व तकनीकी संस्थानों में अध्ययन हेतु बिना गारंटी के 4 लाख तक का शिक्षा ऋण।', mr: 'व्यावसायिक व उच्च शिक्षणासाठी विनातारण ₹४ लाखांपर्यंतचे सवलतीच्या दरातील शैक्षणिक कर्ज.' },
      },
    ],
  },

  // 5. Chhattisgarh
  {
    id: 'chhattisgarh',
    code: 'CG',
    name: 'Chhattisgarh',
    type: 'state',
    capital: 'Raipur',
    regionalLanguages: ['Chhattisgarhi', 'Hindi'],
    localizedName: { en: 'Chhattisgarh', hi: 'छत्तीसगढ़', mr: 'छत्तीसगड' },
    portal: {
      name: 'e-District Chhattisgarh',
      url: 'https://edistrict.cgstate.gov.in',
      department: 'Department of Electronics & IT, Government of Chhattisgarh',
      badge: 'Citizen Service Gateway',
      description: {
        en: 'Official gateway for citizen certificates, social security pensions, and Mahtari Vandan Yojana verification.',
        hi: 'नागरिक प्रमाण पत्र, सामाजिक सुरक्षा पेंशन और महतारी वंदन योजना सत्यापन हेतु आधिकारिक पोर्टल।',
        mr: 'प्रमाणपत्रे, सामाजिक पेन्शन आणि महतारी वंदन योजनेसाठीचे अधिकृत शासकीय पोर्टल.',
      },
      keyServices: [
        { en: 'Mahtari Vandan DBT Enrollment', hi: 'महतारी वंदन डीबीटी पंजीयन', mr: 'महतारी वंदन थेट लाभ नोंदणी' },
        { en: 'Bhuiyan B1 / Khasra Land Records', hi: 'भुइयां बी1 / खसरा खतौनी', mr: 'भुइयां बी१ / खसरा जमीन नोंद' },
        { en: 'Social Security Disability & Widow Pension', hi: 'सामाजिक सुरक्षा पेंशन', mr: 'सामाजिक सुरक्षा निवृत्तिवेतन' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Aadhaar Card', hi: 'आधार कार्ड', mr: 'आधार कार्ड' }, purpose: { en: 'Identity verification', hi: 'पहचान सत्यापन', mr: 'ओळख पडताळणी' }, mandatory: true },
      { name: { en: 'B1 Khasra Extract', hi: 'बी1 खसरा नकल', mr: 'बी१ खसरा उतारा' }, purpose: { en: 'Farmer paddy procurement record', hi: 'धान उपार्जन भू-अभिलेख', mr: 'शेतकरी भात खरेदी नोंद' }, mandatory: false },
    ],
    flagshipSchemes: [
      {
        id: 'cg-mahtari-vandan',
        code: 'CG-MVY',
        name: { en: 'Mahtari Vandan Yojana', hi: 'महतारी वंदन योजना', mr: 'महतारी वंदन योजना' },
        benefit: '₹1,000 / month (₹12,000/year) direct cash support',
        category: 'women_child',
        targetGroup: { en: 'Married women residents of Chhattisgarh', hi: 'छत्तीसगढ़ की विवाहित महिलाएं', mr: 'छत्तीसगडमधील विवाहित महिला' },
        officialUrl: 'https://mahtarivandan.cgstate.gov.in',
        summary: { en: 'Direct monthly financial assistance to married women for economic self-reliance and health.', hi: 'विवाहित महिलाओं के पोषण और आर्थिक सशक्तिकरण हेतु ₹1,000 प्रति माह।', mr: 'महिलांच्या आरोग्य आणि स्वावलंबनासाठी दरमहा ₹१,००० ची थेट आर्थिक मदत.' },
      },
    ],
  },

  // 6. Goa
  {
    id: 'goa',
    code: 'GA',
    name: 'Goa',
    type: 'state',
    capital: 'Panaji',
    regionalLanguages: ['Konkani', 'Marathi', 'English'],
    localizedName: { en: 'Goa', hi: 'गोवा', mr: 'गोवा' },
    portal: {
      name: 'Goa Online Portal',
      url: 'https://goaonline.gov.in',
      department: 'Department of Information Technology, Electronics and Communications, Government of Goa',
      badge: 'State Single Window Services',
      description: {
        en: 'Single-sign-on public service delivery portal for Griha Aadhar, Dayanand Social Security, and citizen e-forms.',
        hi: 'गृह आधार, दयानंद सामाजिक सुरक्षा योजना और नागरिक सेवाओं हेतु गोवा का एकल लॉगिन पोर्टल।',
        mr: 'गृह आधार, दयानंद सामाजिक सुरक्षा योजना आणि नागरी सेवांसाठी गोव्याचे अधिकृत पोर्टल.',
      },
      keyServices: [
        { en: 'Griha Aadhar Direct Assistance', hi: 'गृह आधार योजना आवेदन', mr: 'गृह आधार योजना अर्ज' },
        { en: 'Dayanand Social Security Scheme (DSSS)', hi: 'दयानंद सामाजिक सुरक्षा पेंशन', mr: 'दयानंद सामाजिक सुरक्षा पेन्शन' },
        { en: 'Form I & XIV Land Revenue Records', hi: 'फॉर्म I व XIV भू-अभिलेख', mr: 'फॉर्म १ व १४ जमीन महसूल नोंद' },
      ],
    },
    keyDocuments: [
      { name: { en: '15 Years Residence Certificate', hi: '15 वर्ष निवास प्रमाण पत्र', mr: '१५ वर्षांचा अधिवास दाखला' }, purpose: { en: 'Goan domicile mandate', hi: 'गोवा मूल निवासी पात्रता', mr: 'गोवा अधिवास पुरावा' }, mandatory: true },
    ],
    flagshipSchemes: [
      {
        id: 'ga-griha-aadhar',
        code: 'GA-GAA',
        name: { en: 'Griha Aadhar Scheme', hi: 'गृह आधार योजना', mr: 'गृह आधार योजना' },
        benefit: '₹1,500 / month direct assistance to homemakers',
        category: 'women_child',
        targetGroup: { en: 'Housewives from low and middle income families', hi: 'निम्न व मध्यम वर्गीय गृहिणियां', mr: 'कमी व मध्यम उत्पन्न गटातील गृहिणी' },
        officialUrl: 'https://www.goa.gov.in',
        summary: { en: 'Monthly allowance given to homemakers to alleviate the cost of living and support nutrition.', hi: 'रसोई खर्च और पोषण सहायता हेतु गृहिणियों को ₹1,500 प्रति माह।', mr: 'घरखर्च आणि जीवनमान उंचावण्यासाठी गृहिणींना दरमहा ₹१,५०० चे सहाय्य.' },
      },
    ],
  },

  // 7. Gujarat
  {
    id: 'gujarat',
    code: 'GJ',
    name: 'Gujarat',
    type: 'state',
    capital: 'Gandhinagar',
    regionalLanguages: ['Gujarati', 'Hindi', 'English'],
    localizedName: { en: 'Gujarat', hi: 'गुजरात', mr: 'गुजरात', gu: 'ગુજરાત' },
    portal: {
      name: 'Digital Gujarat Portal',
      url: 'https://www.digitalgujarat.gov.in',
      department: 'Department of Science and Technology, Government of Gujarat',
      badge: 'Comprehensive e-Services & DBT',
      description: {
        en: 'Official gateway for digital citizen certificates, farmer assistance, scholarships, and women welfare benefits.',
        hi: 'नागरिक प्रमाण पत्र, किसान सहायता, छात्रवृत्ति और महिला कल्याणकारी योजनाओं हेतु आधिकारिक गुजरात पोर्टल।',
        mr: 'प्रमाणपत्रे, शेतकरी सहाय्य, शिष्यवृत्ती आणि महिला योजनांसाठी गुजरातमधील अधिकृत पोर्टल.',
      },
      keyServices: [
        { en: 'i-Khedut Portal Farmer Subsidies', hi: 'आई-खेड़ूत किसान उपकरण सब्सिडी', mr: 'आय-खेडूत शेती अवजारे अनुदान' },
        { en: 'Vahli Dikri Yojana Application', hi: 'व्हाली डिकरी योजना आवेदन', mr: 'व्हाली डिकरी योजना अर्ज' },
        { en: 'AnyRoR 7/12 & 8A Land Records', hi: 'AnyRoR 7/12 व 8A जमीन नकल', mr: 'AnyRoR ७/१२ आणि ८अ जमीन नोंद' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Aadhaar Card', hi: 'आधार कार्ड', mr: 'आधार कार्ड' }, purpose: { en: 'Universal ID & DBT link', hi: 'पहचान एवं डीबीटी लिंक', mr: 'ओळख व बँक खात्याशी जोडणी' }, mandatory: true },
      { name: { en: 'AnyRoR 7/12 & 8A Copy', hi: '7/12 व 8A खतौनी', mr: '७/१२ व ८अ जमीन उतारा' }, purpose: { en: 'Agricultural subsidy proof', hi: 'कृषि भूमि सत्यापन', mr: 'शेती जमीन पुरावा' }, mandatory: false },
    ],
    flagshipSchemes: [
      {
        id: 'gj-vahli-dikri',
        code: 'GJ-VDY',
        name: { en: 'Vahli Dikri Yojana', hi: 'व्हाली डिकरी योजना', mr: 'व्हाली डिकरी योजना' },
        benefit: 'Up to ₹1,10,000 across educational milestones',
        category: 'women_child',
        targetGroup: { en: 'First and second daughters of families with income < ₹2 Lakh', hi: '2 लाख से कम आय वाले परिवारों की बेटियां', mr: '२ लाखांपेक्षा कमी उत्पन्न असलेल्या कुटुंबातील मुली' },
        officialUrl: 'https://wcd.gujarat.gov.in',
        summary: { en: 'Incentive for girl child education: ₹4,000 on Class 1 admission, ₹6,000 on Class 9, and ₹1 Lakh at age 18.', hi: 'बालिकाओं के जन्म दर सुधार और शिक्षा हेतु ₹1.10 लाख तक की वित्तीय सहायता।', mr: 'मुलींचे शिक्षण आणि सक्षमीकरणासाठी विविध टप्प्यांवर ₹१,१०,००० पर्यंतची मदत.' },
      },
    ],
  },

  // 8. Haryana
  {
    id: 'haryana',
    code: 'HR',
    name: 'Haryana',
    type: 'state',
    capital: 'Chandigarh',
    regionalLanguages: ['Hindi', 'Haryanvi', 'Punjabi'],
    localizedName: { en: 'Haryana', hi: 'हरियाणा', mr: 'हरियाणा' },
    portal: {
      name: 'Antyodaya Saral Haryana & PPP',
      url: 'https://saralharyana.gov.in',
      department: 'Citizen Resources Information Department (CRID), Govt of Haryana',
      badge: 'Parivar Pehchan Patra (PPP) Gateway',
      description: {
        en: 'Integrated citizen service portal powered by Parivar Pehchan Patra (PPP 8-digit Family ID) for proactive automatic benefit sanctions.',
        hi: 'परिवार पहचान पत्र (पीपीपी) पर आधारित एकीकृत नागरिक पोर्टल, जिससे योजनाओं का स्वतः सत्यापन होता है।',
        mr: 'कुटुंब ओळखपत्र (PPP) आधारित एकात्मिक नागरिक पोर्टल, ज्यामुळे थेट पात्रता तपासली जाते.',
      },
      keyServices: [
        { en: 'Parivar Pehchan Patra (Family ID) Updation', hi: 'परिवार पहचान पत्र (पीपीपी) सत्यापन', mr: 'कुटुंब ओळखपत्र (PPP) अद्ययावत करणे' },
        { en: 'Old Age Samman Allowance (Automatic at 60 yrs)', hi: 'वृद्धावस्था सम्मान भत्ता (स्वचालित)', mr: 'वृद्धापकाळ सन्मान पेन्शन (आपोआप ६० व्या वर्षी)' },
        { en: 'Meri Fasal Mera Byora (Paddy & MSP Registration)', hi: 'मेरी फसल मेरा ब्यौरा फसल पंजीयन', mr: 'मेरी फसल मेरा ब्योरा शेती हमीभाव नोंदणी' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Parivar Pehchan Patra (PPP Family ID)', hi: 'परिवार पहचान पत्र (पीपीपी आईडी)', mr: 'कुटुंब ओळखपत्र (PPP ID)' }, purpose: { en: 'Mandatory single family welfare identifier', hi: 'हरियाणा में सभी योजनाओं हेतु अनिवार्य आईडी', mr: 'सर्व योजनांसाठी अनिवार्य कुटुंब आयडी' }, mandatory: true },
      { name: { en: 'Aadhaar Card', hi: 'आधार कार्ड', mr: 'आधार कार्ड' }, purpose: { en: 'Biometric verification', hi: 'पहचान सत्यापन', mr: 'बायोमेट्रिक ओळख' }, mandatory: true },
    ],
    flagshipSchemes: [
      {
        id: 'hr-old-age-pension',
        code: 'HR-OAP',
        name: { en: 'Old Age Samman Allowance', hi: 'वृद्धावस्था सम्मान भत्ता', mr: 'वृद्धापकाळ सन्मान पेन्शन' },
        benefit: '₹3,000 / month direct pension to senior citizens',
        category: 'pension',
        targetGroup: { en: 'Haryana residents aged 60+ with annual family income < ₹3 Lakh', hi: '60 वर्ष से अधिक आयु के वरिष्ठ नागरिक (आय < 3 लाख)', mr: '६० वर्षे पूर्ण झालेले ज्येष्ठ नागरिक (कौटुंबिक उत्पन्न < ३ लाख)' },
        officialUrl: 'https://socialjusticehry.gov.in',
        summary: { en: 'Highest state senior citizen social security pension in India, automatically sanctioned through PPP data.', hi: 'वरिष्ठ नागरिकों को ₹3,000 मासिक सम्मान राशि, पीपीपी द्वारा स्वतः स्वीकृत।', mr: 'भारतातील सर्वाधिक राज्यस्तरीय पेन्शन; दरमहा ₹३,००० थेट बँक खात्यात आपोआप जमा.' },
      },
    ],
  },

  // 9. Himachal Pradesh
  {
    id: 'himachal-pradesh',
    code: 'HP',
    name: 'Himachal Pradesh',
    type: 'state',
    capital: 'Shimla',
    regionalLanguages: ['Hindi', 'Pahari'],
    localizedName: { en: 'Himachal Pradesh', hi: 'हिमाचल प्रदेश', mr: 'हिमाचल प्रदेश' },
    portal: {
      name: 'e-District Himachal Pradesh',
      url: 'https://edistrict.hp.gov.in',
      department: 'Department of Digital Technologies and Governance, Govt of HP',
      badge: 'State e-District Services',
      description: {
        en: 'Official state portal for electronic citizen certifications, Him Parivar family registry, and welfare pensions.',
        hi: 'नागरिक प्रमाण पत्र, हिम परिवार पहचान, और सामाजिक सुरक्षा पेंशन हेतु आधिकारिक हिमाचल पोर्टल।',
        mr: 'दाखले, हिम परिवार ओळख आणि सामाजिक पेन्शनसाठी हिमाचलचे अधिकृत पोर्टल.',
      },
      keyServices: [
        { en: 'Bonafide Himachali Certificate', hi: 'बोनाफाइड हिमाचली प्रमाण पत्र', mr: 'बोनाफाईड हिमाचली अधिवास दाखला' },
        { en: 'Social Security Pension for Widows & Disabled', hi: 'सामाजिक सुरक्षा पेंशन', mr: 'सामाजिक सुरक्षा पेन्शन' },
        { en: 'Himcare Health Card Enrollment', hi: 'हिमकेयर कैशलेस स्वास्थ्य कार्ड', mr: 'हिमकेअर कॅशलेस आरोग्य कार्ड' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Bonafide Himachali Certificate', hi: 'हिमाचली निवास प्रमाण पत्र', mr: 'हिमाचली अधिवास दाखला' }, purpose: { en: 'State domicile right', hi: 'मूल निवास पात्रता', mr: 'अधिवास हक्क' }, mandatory: true },
    ],
    flagshipSchemes: [
      {
        id: 'hp-himcare',
        code: 'HP-HIMCARE',
        name: { en: 'HIMCARE Health Scheme', hi: 'हिमकेयर स्वास्थ्य योजना', mr: 'हिमकेअर आरोग्य योजना' },
        benefit: 'Cashless treatment up to ₹5 Lakh per year per family',
        category: 'health',
        targetGroup: { en: 'Himachal families not covered under Ayushman Bharat', hi: 'आयुष्मान भारत से छूटे हुए हिमाचल के परिवार', mr: 'आयुष्मान भारतबाहेरील हिमाचलमधील सर्व कुटुंबे' },
        officialUrl: 'https://hpsbys.in',
        summary: { en: 'Provides ₹5 Lakh annual cashless hospitalization to all citizens of Himachal Pradesh.', hi: 'हिमाचल के परिवारों को प्रति वर्ष ₹5 लाख तक का कैशलेस इलाज।', mr: 'कुटुंबाला प्रतिवर्षी ₹५ लाखांपर्यंत मोफत व कॅशलेस वैद्यकीय उपचार.' },
      },
    ],
  },

  // 10. Jharkhand
  {
    id: 'jharkhand',
    code: 'JH',
    name: 'Jharkhand',
    type: 'state',
    capital: 'Ranchi',
    regionalLanguages: ['Hindi', 'Santhali', 'Nagpuri', 'Khortha'],
    localizedName: { en: 'Jharkhand', hi: 'झारखंड', mr: 'झारखंड' },
    portal: {
      name: 'Jharsewa Jharkhand',
      url: 'https://jharsewa.jharkhand.gov.in',
      department: 'Department of Personnel & Administrative Reforms, Govt of Jharkhand',
      badge: 'State Public Services Portal',
      description: {
        en: 'Official state portal for citizen certificates, Abua Awas Yojana, and Maiyan Samman DBT verification.',
        hi: 'नागरिक सेवाओं, अबुआ आवास योजना और मईयां सम्मान योजना हेतु आधिकारिक झारखंड पोर्टल।',
        mr: 'प्रमाणपत्रे, अबुआ आवास योजना आणि मैय्या सन्मान योजनेसाठी झारखंडचे अधिकृत पोर्टल.',
      },
      keyServices: [
        { en: 'Mukhyamantri Maiyan Samman Yojana DBT', hi: 'मईयां सम्मान योजना ₹1,000/माह', mr: 'मैय्या सन्मान योजना थेट लाभ' },
        { en: 'Abua Awas 3-Room Housing Status', hi: 'अबुआ आवास 3 कमरा मकान योजना', mr: 'अबुआ आवास ३ खोली घर योजना' },
        { en: 'Jharbhoomi Land Khatiyan & Register II', hi: 'झारभूमि खतियान व रजिस्टर 2', mr: 'झारभूमी खतियान व रजिस्टर २ जमीन नोंद' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Aadhaar Linked Bank Account', hi: 'आधार लिंक बैंक खाता', mr: 'आधार जोडलेले बँक खाते' }, purpose: { en: 'Direct benefit transfer', hi: 'डीबीटी भुगतान', mr: 'थेट लाभ जमा' }, mandatory: true },
      { name: { en: 'Ration Card', hi: 'राशन कार्ड', mr: 'रेशन कार्ड' }, purpose: { en: 'Housing and food support verification', hi: 'आवास व राशन पात्रता', mr: 'घरकुल व अन्न सुरक्षा पात्रता' }, mandatory: false },
    ],
    flagshipSchemes: [
      {
        id: 'jh-maiyan-samman',
        code: 'JH-MMSY',
        name: { en: 'Mukhyamantri Maiyan Samman Yojana', hi: 'मुख्यमंत्री मईयां सम्मान योजना', mr: 'मुख्यमंत्री मैय्या सन्मान योजना' },
        benefit: '₹1,000 / month direct assistance to women aged 18 to 50',
        category: 'women_child',
        targetGroup: { en: 'Women residents of Jharkhand aged 18-50', hi: 'झारखंड की 18 से 50 वर्ष की महिलाएं', mr: 'झारखंडमधील १८ ते ५० वयोगटातील महिला' },
        officialUrl: 'https://mmmsy.jharkhand.gov.in',
        summary: { en: 'Direct monthly DBT credited to bank accounts of adult women across rural and urban Jharkhand.', hi: '18 से 50 वर्ष की महिलाओं को आर्थिक रूप से सशक्त बनाने हेतु ₹1,000 प्रति माह।', mr: 'महिलांच्या पोषण व स्वावलंबनासाठी दरमहा ₹१,००० ची थेट आर्थिक मदत.' },
      },
    ],
  },

  // 11. Karnataka
  {
    id: 'karnataka',
    code: 'KA',
    name: 'Karnataka',
    type: 'state',
    capital: 'Bengaluru',
    regionalLanguages: ['Kannada', 'English'],
    localizedName: { en: 'Karnataka', hi: 'कर्नाटक', mr: 'कर्नाटक', kn: 'ಕರ್ನಾಟಕ' },
    portal: {
      name: 'Seva Sindhu Karnataka',
      url: 'https://sevasindhu.karnataka.gov.in',
      department: 'Department of Personnel & Administrative Reforms (e-Governance), Govt of Karnataka',
      badge: 'Guarantee Schemes & Citizen Gateway',
      description: {
        en: 'Authoritative citizen services platform hosting Karnataka’s landmark 5 Guarantee Schemes (Gruha Lakshmi, Yuva Nidhi, Shakti, Gruha Jyothi, Anna Bhagya).',
        hi: 'कर्नाटक की 5 गारंटी योजनाओं (गृह लक्ष्मी, युवा निधि, गृह ज्योति, अन्न भाग्य, शक्ति) हेतु आधिकारिक राज्य पोर्टल।',
        mr: 'कर्नाटकच्या ५ गॅरंटी योजना (गृहलक्ष्मी, युवा निधी, गृह ज्योती इ.) साठीचे अधिकृत राज्य पोर्टल.',
      },
      keyServices: [
        { en: 'Gruha Lakshmi Direct Cash Transfer (₹2,000/mo)', hi: 'गृह लक्ष्मी योजना ₹2,000/माह डीबीटी', mr: 'गृहलक्ष्मी योजना दरमहा ₹२,०००' },
        { en: 'Yuva Nidhi Graduate Unemployment Allowance', hi: 'युवा निधि बेरोजगारी भत्ता', mr: 'युवा निधी पदवीधर बेरोजगारी भत्ता' },
        { en: 'Bhoomi RTC (Pahani) Land Records', hi: 'भूमि आरटीसी (पाहणी) भू-अभिलेख', mr: 'भूमी आरटीसी (पाहणी) जमीन नोंद' },
        { en: 'Kutumba Single Family ID Verification', hi: 'कुटुंब फैमिली आईडी सत्यापन', mr: 'कुटुंब फॅमिली आयडी पडताळणी' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Aadhaar Card Linked with Bank Account (NPCI Mapped)', hi: 'आधार व बैंक खाता (एनपीसीआई मैप)', mr: 'आधार व बँक खात्याची NPCI जोडणी' }, purpose: { en: 'Direct Benefit Transfer mandate', hi: 'डीबीटी भुगतान सत्यापन', mr: 'थेट लाभ खात्यात जमा' }, mandatory: true },
      { name: { en: 'Ration Card (BPL / APL with Woman Head Name)', hi: 'राशन कार्ड (महिला मुखिया का नाम)', mr: 'रेशन कार्ड (महिला कुटुंबप्रमुख)' }, purpose: { en: 'Gruha Lakshmi eligibility', hi: 'गृह लक्ष्मी पात्रता', mr: 'गृहलक्ष्मी योजना पात्रता' }, mandatory: true },
      { name: { en: 'Bhoomi RTC Pahani', hi: 'भूमि आरटीसी पाहणी', mr: 'भूमी आरटीसी पाहणी उतारा' }, purpose: { en: 'Farmer scheme verification', hi: 'किसान भूमि सत्यापन', mr: 'शेतकरी जमीन पडताळणी' }, mandatory: false },
    ],
    flagshipSchemes: [
      {
        id: 'ka-gruha-lakshmi',
        code: 'KA-GL',
        name: { en: 'Gruha Lakshmi Scheme', hi: 'गृह लक्ष्मी योजना', mr: 'गृहलक्ष्मी योजना' },
        benefit: '₹2,000 / month directly to female head of household',
        category: 'women_child',
        targetGroup: { en: 'Woman head of house listed on Antyodaya/BPL/APL card', hi: 'राशन कार्ड पर दर्ज महिला मुखिया', mr: 'रेशन कार्डावरील प्रमुख महिला' },
        officialUrl: 'https://sevasindhu.karnataka.gov.in',
        summary: { en: 'Direct benefit transfer of ₹2,000 monthly to eligible woman heads of families to counter inflation and support dignity.', hi: 'परिवार की महिला मुखिया को आर्थिक स्वावलंबन हेतु ₹2,000 प्रतिमाह।', mr: 'कुटुंबप्रमुख महिलांच्या सन्मानासाठी आणि आर्थिक आधारासाठी दरमहा ₹२,००० थेट बँक खात्यात.' },
      },
      {
        id: 'ka-yuva-nidhi',
        code: 'KA-YN',
        name: { en: 'Yuva Nidhi Scheme', hi: 'युवा निधि योजना', mr: 'युवा निधी योजना' },
        benefit: '₹3,000/mo for Degree holders & ₹1,500/mo for Diploma holders for up to 2 years',
        category: 'livelihood',
        targetGroup: { en: 'Unemployed graduates and diploma holders passed in recent batches', hi: 'हाल ही में पास हुए बेरोजगार स्नातक व डिप्लोमा धारक', mr: 'नुकतेच उत्तीर्ण झालेले बेरोजगार पदवीधर व पदविकाधारक' },
        officialUrl: 'https://sevasindhuservices.karnataka.gov.in',
        summary: { en: 'Monthly unemployment allowance and skilling support to young graduates while they search for jobs or clear competitive exams.', hi: 'नौकरी खोज रहे युवाओं को 2 साल तक मासिक बेरोजगारी भत्ता।', mr: 'रोजगाराचा शोध घेणाऱ्या तरुणांना २ वर्षांपर्यंत दरमहा ₹३,००० पदवीधरांना व ₹१,५०० डिप्लोमाधारकांना.' },
      },
    ],
  },

  // 12. Kerala
  {
    id: 'kerala',
    code: 'KL',
    name: 'Kerala',
    type: 'state',
    capital: 'Thiruvananthapuram',
    regionalLanguages: ['Malayalam', 'English'],
    localizedName: { en: 'Kerala', hi: 'केरल', mr: 'केरळ', ml: 'കേരളം' },
    portal: {
      name: 'e-District Kerala & Sevana',
      url: 'https://edistrict.kerala.gov.in',
      department: 'Kerala State IT Mission & Local Self Government Department',
      badge: 'Social Security & Citizen Gateway',
      description: {
        en: 'Official portal for citizen delivery, Sevana social security pensions, and Karunya Health Care (KASP).',
        hi: 'नागरिक सेवाओं, सेवना सामाजिक सुरक्षा पेंशन और कारुण्या स्वास्थ्य योजना हेतु आधिकारिक केरल पोर्टल।',
        mr: 'नागरी सेवा, सेवना सामाजिक पेन्शन आणि कारुण्या आरोग्य योजनेसाठी केरळचे अधिकृत पोर्टल.',
      },
      keyServices: [
        { en: 'Sevana Direct Social Security Pension (₹1,600/mo)', hi: 'सेवना सामाजिक पेंशन ₹1,600/माह', mr: 'सेवना सामाजिक पेन्शन दरमहा ₹१,६००' },
        { en: 'Karunya Arogya Suraksha Padhathi (KASP) Card', hi: 'कारुण्या स्वास्थ्य योजना (कास्प) कार्ड', mr: 'कारुण्या आरोग्य सुरक्षा (KASP) कार्ड' },
        { en: 'e-Rekha Digital Land Records (Survey & Resurvey)', hi: 'ई-रेखा डिजिटल भूमि अभिलेख', mr: 'ई-रेखा डिजिटल जमीन नोंद' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Aadhaar Card', hi: 'आधार कार्ड', mr: 'आधार कार्ड' }, purpose: { en: 'Identity proof', hi: 'पहचान सत्यापन', mr: 'ओळख पडताळणी' }, mandatory: true },
      { name: { en: 'Non-Remarriage / Non-Employment Certificate (where applicable)', hi: 'पुनर्विवाह न करने का प्रमाण पत्र', mr: 'पुनर्विवाह न केल्याचा दाखला' }, purpose: { en: 'Social pension continuation', hi: 'पेंशन पात्रता', mr: 'पेन्शन पडताळणी' }, mandatory: false },
    ],
    flagshipSchemes: [
      {
        id: 'kl-social-pension',
        code: 'KL-SSP',
        name: { en: 'Sevana Social Security Pensions', hi: 'सेवना सामाजिक सुरक्षा पेंशन', mr: 'सेवना सामाजिक सुरक्षा पेन्शन' },
        benefit: '₹1,600 / month direct pension to seniors, widows, and agricultural workers',
        category: 'pension',
        targetGroup: { en: 'Seniors, widows, differently abled, unmarried women aged 50+', hi: 'वरिष्ठ नागरिक, विधवा, दिव्यांग व कृषि मजदूर', mr: 'ज्येष्ठ नागरिक, विधवा, दिव्यांग व शेतमजूर' },
        officialUrl: 'https://welfarepension.lsgkerala.gov.in',
        summary: { en: 'Universal decentralized social security pensions delivered directly to bank accounts or home delivery through cooperative banks.', hi: 'केरल के वरिष्ठ नागरिकों और विधवाओं को ₹1,600 मासिक पेंशन।', mr: 'केरळमधील ज्येष्ठ नागरिक व गरजू घटकांना दरमहा ₹१,६०० चे सन्मान पेन्शन.' },
      },
    ],
  },

  // 13. Madhya Pradesh
  {
    id: 'madhya-pradesh',
    code: 'MP',
    name: 'Madhya Pradesh',
    type: 'state',
    capital: 'Bhopal',
    regionalLanguages: ['Hindi'],
    localizedName: { en: 'Madhya Pradesh', hi: 'मध्य प्रदेश', mr: 'मध्य प्रदेश' },
    portal: {
      name: 'MP e-District & Samagra Portal',
      url: 'https://samagra.gov.in',
      department: 'Department of Science and Technology, Govt of Madhya Pradesh',
      badge: 'Samagra Family ID & Citizen Portal',
      description: {
        en: 'Authoritative state portal based on Samagra Single Family ID covering Ladli Behna, Sambal 2.0, and CM Kisan Kalyan.',
        hi: 'समग्र आईडी आधारित आधिकारिक मध्य प्रदेश पोर्टल, जिससे लाड़ली बहना, संबल 2.0 और सीएम किसान कल्याण संचालित होती हैं।',
        mr: 'समग्र फॅमिली आयडीवर आधारित मध्यप्रदेशचे अधिकृत पोर्टल; लाडली बहना, संबल योजना आणि शेतकरी कल्याण.',
      },
      keyServices: [
        { en: 'Mukhyamantri Ladli Behna Yojana DBT (₹1,250/mo)', hi: 'लाड़ली बहना योजना ₹1,250/माह डीबीटी', mr: 'लाडली बहना योजना दरमहा ₹१,२५०' },
        { en: 'Samagra e-KYC and Family Member Linking', hi: 'समग्र ई-केवाईसी और परिवार सदस्य लिंक', mr: 'समग्र ई-केवायसी आणि कुटुंब जोडणी' },
        { en: 'MP Bhulekh Khasra Khatoni Records', hi: 'एमपी भूलेख खसरा खतौनी नकल', mr: 'एमपी भूलेख खसरा खतवणी उतारा' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Samagra Member ID & Family ID (9 digits)', hi: 'समग्र परिवार व सदस्य आईडी', mr: 'समग्र फॅमिली व सदस्य आयडी' }, purpose: { en: 'Universal state welfare eligibility key', hi: 'सभी योजनाओं हेतु अनिवार्य समग्र आईडी', mr: 'सर्व योजनांसाठी अनिवार्य समग्र आयडी' }, mandatory: true },
      { name: { en: 'Aadhaar Card Linked to Bank Account (DBT Active)', hi: 'आधार व बैंक खाता (डीबीटी सक्षम)', mr: 'आधार जोडलेले डीबीटी बँक खाते' }, purpose: { en: 'Monthly payout transfer', hi: 'मासिक किस्त भुगतान', mr: 'मासिक निधी जमा' }, mandatory: true },
    ],
    flagshipSchemes: [
      {
        id: 'mp-ladli-behna',
        code: 'MP-LBY',
        name: { en: 'Mukhyamantri Ladli Behna Yojana', hi: 'मुख्यमंत्री लाड़ली बहना योजना', mr: 'मुख्यमंत्री लाडली बहना योजना' },
        benefit: '₹1,250 / month direct transfer to women aged 21-60',
        category: 'women_child',
        targetGroup: { en: 'Resident married, widowed, divorced women aged 21-60 with family income < ₹2.5 Lakh', hi: '21 से 60 वर्ष की महिलाएं (पारिवारिक आय < 2.5 लाख)', mr: '२१ ते ६० वयोगटातील महिला (कौटुंबिक उत्पन्न < २.५ लाख)' },
        officialUrl: 'https://cmladlibahna.mp.gov.in',
        summary: { en: 'Direct benefit transfer credited on the 10th of every month into bank accounts of eligible women.', hi: 'महिलाओं के स्वास्थ्य व पोषण सुधार हेतु हर माह 10 तारीख को ₹1,250 का प्रत्यक्ष हस्तांतरण।', mr: 'महिलांचे आरोग्य, पोषण आणि स्वावलंबनासाठी दरमहा ₹१,२५० थेट बँक खात्यात.' },
      },
      {
        id: 'mp-kisan-kalyan',
        code: 'MP-CMKKY',
        name: { en: 'Mukhyamantri Kisan Kalyan Yojana', hi: 'मुख्यमंत्री किसान कल्याण योजना', mr: 'मुख्यमंत्री शेतकरी कल्याण योजना' },
        benefit: '₹6,000 / year additional state top-up to PM-KISAN',
        category: 'agriculture',
        targetGroup: { en: 'All PM-KISAN eligible landholding farmers in MP', hi: 'मध्य प्रदेश के सभी पीएम-किसान पात्र किसान', mr: 'मध्यप्रदेशातील सर्व पीएम-किसान पात्र शेतकरी' },
        officialUrl: 'https://saara.mp.gov.in',
        summary: { en: 'Provides ₹6,000 annually in addition to the central ₹6,000, ensuring a total ₹12,000/year to farmers.', hi: 'पीएम-किसान के 6,000 के अतिरिक्त राज्य सरकार द्वारा 6,000, कुल ₹12,000 प्रति वर्ष।', mr: 'केंद्राच्या ₹६,००० शिवाय राज्याकडून अतिरिक्त ₹६,०००, वर्षाला एकूण ₹१२,००० शेतकरी खात्यात.' },
      },
    ],
  },

  // 14. Maharashtra
  {
    id: 'maharashtra',
    code: 'MH',
    name: 'Maharashtra',
    type: 'state',
    capital: 'Mumbai',
    regionalLanguages: ['Marathi', 'English', 'Hindi'],
    localizedName: { en: 'Maharashtra', hi: 'महाराष्ट्र', mr: 'महाराष्ट्र' },
    portal: {
      name: 'MahaDBT & Aaple Sarkar',
      url: 'https://mahadbt.maharashtra.gov.in',
      department: 'Directorate of Information Technology, Government of Maharashtra',
      badge: 'State Flagship DBT & Services',
      description: {
        en: 'Apex direct benefit transfer and citizen services portal of Maharashtra handling Majhi Ladki Bahin, agriculture subsidies, post-matric scholarships, and Sanjay Gandhi pensions.',
        hi: 'महाराष्ट्र का प्रमुख डीबीटी पोर्टल - माझी लाड़की बहिन, कृषि सब्सिडी, छात्रवृत्ति एवं संजय गांधी निराधार योजना।',
        mr: 'महाराष्ट्राचे अधिकृत महाडीबीटी व आपले सरकार पोर्टल - माझी लाडकी बहीण, शेतकरी योजना, शिष्यवृत्ती व संजय गांधी निराधार योजना.',
      },
      keyServices: [
        { en: 'Mukhyamantri Majhi Ladki Bahin Yojana (₹1,500/mo)', hi: 'माझी लाड़की बहिन योजना ₹1,500/माह', mr: 'मुख्यमंत्री माझी लाडकी बहीण योजना दरमहा ₹१,५००' },
        { en: 'Sanjay Gandhi Niradhar Anudan Yojana (Social Pension)', hi: 'संजय गांधी निराधार अनुदान योजना', mr: 'संजय गांधी निराधार अनुदान पेन्शन योजना' },
        { en: 'MahaBhulekh Digital 7/12 & 8A (Mahabhumi)', hi: 'महाभूलेख डिजिटल 7/12 व 8अ उतारा', mr: 'महाभूलेख डिजिटल स्वाक्षरीत ७/१२ आणि ८अ' },
        { en: 'Maitri Single Window for Business & MSME Tenders', hi: 'मैत्री एकल खिडकी उद्योग पोर्टल', mr: 'मैत्री एकल खिडकी उद्योग व परवाने पोर्टल' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Aadhaar Card Linked to Bank Account', hi: 'आधार कार्ड व बैंक खाता', mr: 'आधार कार्ड व बँक खात्याची जोडणी' }, purpose: { en: 'Identity and DBT transfers', hi: 'पहचान एवं डीबीटी भुगतान', mr: 'ओळख आणि थेट निधी हस्तांतरण' }, mandatory: true },
      { name: { en: 'Maharashtra Domicile Certificate / Ration Card issued 15+ yrs', hi: 'अधिवास प्रमाण पत्र / 15 वर्ष पुराना राशन कार्ड', mr: 'महाराष्ट्र अधिवास प्रमाणपत्र / १५ वर्षे जुने रेशन कार्ड' }, purpose: { en: 'Proof of state residence', hi: 'महाराष्ट्र का मूल निवासी प्रमाण', mr: 'महाराष्ट्र रहिवासी पुरावा' }, mandatory: true },
      { name: { en: 'Digital 7/12 & 8A Land Extract', hi: 'डिजिटल 7/12 व 8अ जमीन नकल', mr: 'डिजिटल स्वाक्षरीत ७/१२ व ८अ उतारा' }, purpose: { en: 'Agriculture subsidy verification', hi: 'कृषि योजना सत्यापन', mr: 'शेतकरी योजना पात्रता' }, mandatory: false },
    ],
    flagshipSchemes: [
      {
        id: 'mh-ladki-bahin',
        code: 'MH-MLBY',
        name: { en: 'Majhi Ladki Bahin Yojana', hi: 'मुख्यमंत्री माझी लाड़की बहिन योजना', mr: 'मुख्यमंत्री माझी लाडकी बहीण योजना' },
        benefit: '₹1,500 / month direct bank deposit to women aged 21-65',
        category: 'women_child',
        targetGroup: { en: 'Resident women aged 21 to 65 with family annual income up to ₹2.5 Lakh', hi: '21 से 65 वर्ष की महिलाएं (पारिवारिक आय < 2.5 लाख)', mr: '२१ ते ६५ वयोगटातील महिला (कौटुंबिक वार्षिक उत्पन्न ₹२.५ लाखांपर्यंत)' },
        officialUrl: 'https://ladakibahin.maharashtra.gov.in',
        summary: { en: 'Statewide welfare scheme providing ₹1,500 monthly directly into the bank accounts of economically backward women.', hi: 'महाराष्ट्र की पात्र महिलाओं को ₹1,500 प्रतिमाह प्रत्यक्ष बैंक हस्तांतरण।', mr: 'महाराष्ट्रातील आर्थिकदृष्ट्या दुर्बल घटकातील महिलांच्या खात्यात दरमहा ₹१,५०० ची थेट आर्थिक मदत.' },
      },
      {
        id: 'mh-sanjay-gandhi-niradhar',
        code: 'MH-SGNRY',
        name: { en: 'Sanjay Gandhi Niradhar Anudan Yojana', hi: 'संजय गांधी निराधार अनुदान योजना', mr: 'संजय गांधी निराधार अनुदान योजना' },
        benefit: '₹1,500 / month pension to destitute seniors, widows, and disabled',
        category: 'pension',
        targetGroup: { en: 'Destitute persons aged 65+, widows, divorced women, differently abled with income < ₹21,000/yr', hi: 'निराधार वृद्ध, विधवा, दिव्यांग (आय < 21,000/वर्ष)', mr: 'निराधार वृद्ध, विधवा, परित्यक्त्या, दिव्यांग (उत्पन्न < ₹२१,०००)' },
        officialUrl: 'https://mahadbt.maharashtra.gov.in',
        summary: { en: 'State pension scheme for destitute citizens who have no family source of income or breadwinner.', hi: 'निराधार, असहाय वृद्धों व दिव्यांगों को ₹1,500 मासिक पेंशन।', mr: 'कुटुंबात कोणीही कमावता आधार नसलेल्या निराधार व्यक्तींना दरमहा ₹१,५०० चे निवृत्तिवेतन.' },
      },
    ],
  },

  // 15. Manipur
  {
    id: 'manipur',
    code: 'MN',
    name: 'Manipur',
    type: 'state',
    capital: 'Imphal',
    regionalLanguages: ['Manipuri (Meitei)', 'English'],
    localizedName: { en: 'Manipur', hi: 'मणिपुर', mr: 'मणिपूर' },
    portal: {
      name: 'e-Services Manipur',
      url: 'https://eservicesmanipur.gov.in',
      department: 'Department of Information Technology, Government of Manipur',
      badge: 'State Citizen Delivery',
      description: {
        en: 'Official state portal for CMHT Health Card, tribal certificates, and state scholarship programs.',
        hi: 'सीएमएचटी स्वास्थ्य कार्ड, जनजातीय प्रमाण पत्र और छात्रवृत्ति हेतु आधिकारिक मणिपुर पोर्टल।',
        mr: 'आरोग्य कार्ड, आदिवासी प्रमाणपत्रे आणि नागरी सेवांसाठी मणिपूरचे अधिकृत पोर्टल.',
      },
      keyServices: [
        { en: 'Chief Minister-gi Hakshelgi Tengbang (CMHT) Health Card', hi: 'सीएमएचटी स्वास्थ्य कार्ड पंजीयन', mr: 'सीएमएचटी कॅशलेस आरोग्य कार्ड' },
        { en: 'Permanent Resident & Caste Certificates', hi: 'स्थायी निवास व जाति प्रमाण पत्र', mr: 'अधिवास व जात दाखला' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Aadhaar Card', hi: 'आधार कार्ड', mr: 'आधार कार्ड' }, purpose: { en: 'Identity proof', hi: 'पहचान सत्यापन', mr: 'ओळख पडताळणी' }, mandatory: true },
    ],
    flagshipSchemes: [
      {
        id: 'mn-cmht',
        code: 'MN-CMHT',
        name: { en: 'Chief Minister-gi Hakshelgi Tengbang (CMHT)', hi: 'सीएमएचटी स्वास्थ्य योजना', mr: 'सीएमएचटी आरोग्य योजना' },
        benefit: 'Cashless treatment up to ₹5 Lakh per family per year',
        category: 'health',
        targetGroup: { en: 'Poor and vulnerable families in Manipur', hi: 'मणिपुर के गरीब और कमजोर परिवार', mr: 'मणिपूरमधील गरीब आणि गरजू कुटुंबे' },
        officialUrl: 'https://cmhtmanipur.gov.in',
        summary: { en: 'Comprehensive cashless hospitalization coverage across recognized empanelled hospitals.', hi: 'अस्पतालों में ₹5 लाख तक का कैशलेस इलाज।', mr: 'कुटुंबाला वर्षाला ₹५ लाखांपर्यंत मोफत व कॅशलेस उपचार.' },
      },
    ],
  },

  // 16. Meghalaya
  {
    id: 'meghalaya',
    code: 'ML',
    name: 'Meghalaya',
    type: 'state',
    capital: 'Shillong',
    regionalLanguages: ['English', 'Khasi', 'Garo'],
    localizedName: { en: 'Meghalaya', hi: 'मेघालय', mr: 'मेघालय' },
    portal: {
      name: 'Meghalaya e-District',
      url: 'https://megedistrict.gov.in',
      department: 'Information Technology & Communications Department, Govt of Meghalaya',
      badge: 'State Public Services Portal',
      description: {
        en: 'Official gateway for citizen certificates, MHIS health cards, and farmers producer groups (FOCUS).',
        hi: 'नागरिक प्रमाण पत्र, एमएचआईएस स्वास्थ्य कार्ड और किसान सहायता हेतु आधिकारिक मेघालय पोर्टल।',
        mr: 'नागरी सेवा, एमएचआयएस आरोग्य कार्ड आणि शेतकरी मदतीसाठी मेघालयचे अधिकृत पोर्टल.',
      },
      keyServices: [
        { en: 'Meghalaya Health Insurance Scheme (MHIS)', hi: 'एमएचआईएस स्वास्थ्य बीमा', mr: 'मेघालय आरोग्य विमा योजना' },
        { en: 'ST / Domicile Certificates', hi: 'एसटी / निवास प्रमाण पत्र', mr: 'एसटी / रहिवासी दाखला' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Aadhaar Card / EPIC Voter ID', hi: 'आधार / मतदाता पहचान पत्र', mr: 'आधार किंवा मतदार ओळखपत्र' }, purpose: { en: 'Identity proof', hi: 'पहचान सत्यापन', mr: 'ओळख पुरावा' }, mandatory: true },
    ],
    flagshipSchemes: [
      {
        id: 'ml-mhis',
        code: 'ML-MHIS',
        name: { en: 'Meghalaya Health Insurance Scheme (MHIS)', hi: 'मेघालय स्वास्थ्य बीमा योजना', mr: 'मेघालय आरोग्य विमा योजना' },
        benefit: '₹5,30,000 cashless medical cover per family',
        category: 'health',
        targetGroup: { en: 'All citizen families residing in Meghalaya', hi: 'मेघालय के सभी निवासी परिवार', mr: 'मेघालयातील सर्व नागरिक कुटुंबे' },
        officialUrl: 'https://mhis.org.in',
        summary: { en: 'Universal health insurance covering all residents of Meghalaya irrespective of income criteria.', hi: 'मेघालय के सभी नागरिकों के लिए ₹5.3 लाख तक का यूनिवर्सल कैशलेस स्वास्थ्य कवर।', mr: 'मेघालयातील सर्व नागरिकांसाठी विनाउत्पन्न अट ₹५,३०,००० चा सार्वत्रिक आरोग्य विमा.' },
      },
    ],
  },

  // 17. Mizoram
  {
    id: 'mizoram',
    code: 'MZ',
    name: 'Mizoram',
    type: 'state',
    capital: 'Aizawl',
    regionalLanguages: ['Mizo', 'English'],
    localizedName: { en: 'Mizoram', hi: 'मिजोरम', mr: 'मिझोरम' },
    portal: {
      name: 'Mizoram Citizen e-District',
      url: 'https://edistrict.mizoram.gov.in',
      department: 'Information & Communication Technology Dept, Government of Mizoram',
      badge: 'State Citizen Delivery',
      description: {
        en: 'Official state portal for tribal certificates, residential certificates, and health benefit verifications.',
        hi: 'जनजातीय प्रमाण पत्र, निवास प्रमाण पत्र और स्वास्थ्य सहायता हेतु मिजोरम का आधिकारिक पोर्टल।',
        mr: 'प्रमाणपत्रे आणि आरोग्य योजनांसाठी मिझोरमचे अधिकृत राज्य पोर्टल.',
      },
      keyServices: [
        { en: 'Tribal / Indigenous Certificate', hi: 'जनजातीय प्रमाण पत्र', mr: 'आदिवासी दाखला' },
        { en: 'Mizoram State Health Care Scheme', hi: 'मिजोरम स्वास्थ्य देखभाल योजना', mr: 'मिझोरम राज्य आरोग्य योजना' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Voter ID / Aadhaar Card', hi: 'पहचान पत्र / आधार', mr: 'मतदार ओळखपत्र किंवा आधार' }, purpose: { en: 'Identity confirmation', hi: 'पहचान सत्यापन', mr: 'ओळख पडताळणी' }, mandatory: true },
    ],
    flagshipSchemes: [
      {
        id: 'mz-health-scheme',
        code: 'MZ-MSHCS',
        name: { en: 'Mizoram State Health Care Scheme', hi: 'मिजोरम राज्य स्वास्थ्य देखभाल योजना', mr: 'मिझोरम राज्य आरोग्य योजना' },
        benefit: 'Up to ₹2 Lakh cashless hospitalization assistance',
        category: 'health',
        targetGroup: { en: 'BPL and general families of Mizoram', hi: 'मिजोरम के सभी परिवार', mr: 'मिझोरममधील सर्व रहिवासी कुटुंबे' },
        officialUrl: 'https://mizoram.gov.in',
        summary: { en: 'State government sponsored medical assistance for treatments in state and empanelled refer hospitals.', hi: 'अस्पतालों में उपचार हेतु ₹2 लाख तक की वित्तीय सहायता।', mr: 'सरकारी व नोंदणीकृत रुग्णालयांत उपचारासाठी ₹२ लाखांपर्यंतची वैद्यकीय मदत.' },
      },
    ],
  },

  // 18. Nagaland
  {
    id: 'nagaland',
    code: 'NL',
    name: 'Nagaland',
    type: 'state',
    capital: 'Kohima',
    regionalLanguages: ['English', 'Nagamese'],
    localizedName: { en: 'Nagaland', hi: 'नागालैंड', mr: 'नागालँड' },
    portal: {
      name: 'Nagaland e-District Services',
      url: 'https://edistrict.nagaland.gov.in',
      department: 'Department of Information Technology & Communication, Govt of Nagaland',
      badge: 'State Public Services Portal',
      description: {
        en: 'Official portal for Indigenous Inhabitant Certificates, Scheduled Tribe certificates, and CMHIS health cards.',
        hi: 'मूल निवासी प्रमाण पत्र, जनजातीय प्रमाण पत्र और सीएमएचआईएस स्वास्थ्य कार्ड हेतु आधिकारिक पोर्टल।',
        mr: 'मूळ रहिवासी दाखला, एसटी प्रमाणपत्र आणि आरोग्य विमा सेवेसाठी नागालँडचे अधिकृत पोर्टल.',
      },
      keyServices: [
        { en: 'Chief Minister’s Health Insurance Scheme (CMHIS)', hi: 'सीएमएचआईएस स्वास्थ्य कार्ड', mr: 'सीएमएचआयएस आरोग्य कार्ड' },
        { en: 'Indigenous Inhabitant Certificate (IIC)', hi: 'मूल निवासी प्रमाण पत्र', mr: 'मूळ रहिवासी प्रमाणपत्र' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Indigenous Inhabitant Certificate', hi: 'मूल निवासी प्रमाण पत्र', mr: 'मूळ रहिवासी दाखला' }, purpose: { en: 'State affirmative rights', hi: 'राज्य मूल निवासी अधिकार', mr: 'स्थानिक हक्क पडताळणी' }, mandatory: true },
    ],
    flagshipSchemes: [
      {
        id: 'nl-cmhis',
        code: 'NL-CMHIS',
        name: { en: "Chief Minister's Health Insurance Scheme", hi: 'मुख्यमंत्री स्वास्थ्य बीमा योजना', mr: 'मुख्यमंत्री आरोग्य विमा योजना' },
        benefit: '₹5 Lakh cashless health cover per family per year',
        category: 'health',
        targetGroup: { en: 'All indigenous and permanent residents of Nagaland', hi: 'नागालैंड के सभी स्थायी निवासी', mr: 'नागालँडमधील सर्व मूळ आणि कायमचे रहिवासी' },
        officialUrl: 'https://cmhis.nagaland.gov.in',
        summary: { en: 'Universal cashless healthcare for all Nagaland citizens aligned with Ayushman Bharat benefit packages.', hi: 'नागालैंड के नागरिकों को ₹5 लाख तक का कैशलेस इलाज।', mr: 'सर्व नागरिकांसाठी प्रतिवर्षी ₹५ लाखांपर्यंत मोफत व कॅशलेस उपचार.' },
      },
    ],
  },

  // 19. Odisha
  {
    id: 'odisha',
    code: 'OD',
    name: 'Odisha',
    type: 'state',
    capital: 'Bhubaneswar',
    regionalLanguages: ['Odia', 'English'],
    localizedName: { en: 'Odisha', hi: 'ओडिशा', mr: 'ओडिशा', or: 'ଓଡ଼ିଶା' },
    portal: {
      name: 'Odisha e-District & BSKY Portal',
      url: 'https://edistrict.odisha.gov.in',
      department: 'Electronics & Information Technology Department, Government of Odisha',
      badge: 'State Welfare & Farmer Gateway',
      description: {
        en: 'Authoritative state portal for KALIA farmer assistance, Subhadra Yojana, BSKY health assurance, and citizen certificates.',
        hi: 'कालिया किसान योजना, सुभद्रा योजना, बीएसकेवाई स्वास्थ्य और नागरिक प्रमाण पत्रों हेतु आधिकारिक ओडिशा पोर्टल।',
        mr: 'कालिया शेतकरी योजना, सुभद्रा योजना, बीएसकेवाय आरोग्य आणि नागरी दाखल्यांसाठीचे अधिकृत ओडिशा पोर्टल.',
      },
      keyServices: [
        { en: 'KALIA Scheme Direct Financial Assistance', hi: 'कालिया योजना प्रत्यक्ष किसान सहायता', mr: 'कालिया योजना थेट शेतकरी मदत' },
        { en: 'Subhadra Yojana Women Financial Voucher Scheme', hi: 'सुभद्रा योजना महिला सशक्तिकरण', mr: 'सुभद्रा योजना महिला आर्थिक मदत' },
        { en: 'Bhulekh Odisha RoR Land Record', hi: 'भूलेख ओडिशा खतियान (RoR)', mr: 'भूलेख ओडिशा RoR जमीन नोंद' },
        { en: 'Madhu Babu Pension Yojana (MBPY)', hi: 'मधु बाबू पेंशन योजना', mr: 'मधू बाबू पेन्शन योजना' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Aadhaar Card Linked to Bank Account', hi: 'आधार कार्ड व बैंक खाता', mr: 'आधार व बँक खात्याची जोडणी' }, purpose: { en: 'Direct Benefit Transfer (DBT)', hi: 'डीबीटी भुगतान', mr: 'थेट लाभ जमा' }, mandatory: true },
      { name: { en: 'Bhulekh RoR (Khatiyan Extract)', hi: 'भूलेख RoR खतियान नकल', mr: 'भूलेख RoR जमीन नोंद' }, purpose: { en: 'Farmer eligibility for KALIA', hi: 'कालिया योजना पात्रता', mr: 'कालिया शेतकरी योजना पात्रता' }, mandatory: false },
    ],
    flagshipSchemes: [
      {
        id: 'od-kalia',
        code: 'OD-KALIA',
        name: { en: 'KALIA Scheme', hi: 'कालिया योजना', mr: 'कालिया शेतकरी योजना' },
        benefit: '₹10,000 / year financial aid for cultivators & landless laborers',
        category: 'agriculture',
        targetGroup: { en: 'Small farmers, marginal farmers, and landless agriculture laborers', hi: 'छोटे, सीमांत व भूमिहीन कृषि मजदूर', mr: 'लहान, सीमांत शेतकरी आणि भूमिहीन शेतमजूर' },
        officialUrl: 'https://kalia.odisha.gov.in',
        summary: { en: 'Comprehensive income support package supporting farming inputs and financial grants for landless agricultural households.', hi: 'किसानों और भूमिहीन मजदूरों को ₹10,000 प्रति वर्ष की कृषि सहायता।', mr: 'शेतकरी आणि भूमिहीन शेतमजुरांना बियाणे व खतांसाठी वर्षाला ₹१०,००० ची थेट आर्थिक मदत.' },
      },
      {
        id: 'od-subhadra',
        code: 'OD-SUBHADRA',
        name: { en: 'Subhadra Yojana', hi: 'सुभद्रा योजना', mr: 'सुभद्रा योजना' },
        benefit: '₹50,000 total (₹10,000/year for 5 years) directly to women',
        category: 'women_child',
        targetGroup: { en: 'Eligible women aged 21 to 60 years in Odisha', hi: 'ओडिशा की 21 से 60 वर्ष की महिलाएं', mr: 'ओडिशामधील २१ ते ६० वयोगटातील महिला' },
        officialUrl: 'https://subhadra.odisha.gov.in',
        summary: { en: 'Landmark women empowerment initiative transferring ₹10,000 annually via two ₹5,000 direct bank transfers.', hi: 'महिलाओं को आर्थिक रूप से सशक्त बनाने हेतु 5 वर्षों में ₹50,000 की वित्तीय सहायता।', mr: 'महिलांच्या सक्षमीकरणासाठी ५ वर्षांत प्रत्येकी ₹१०,००० प्रमाणे एकूण ₹५०,००० ची थेट बँक खात्यात मदत.' },
      },
    ],
  },

  // 20. Punjab
  {
    id: 'punjab',
    code: 'PB',
    name: 'Punjab',
    type: 'state',
    capital: 'Chandigarh',
    regionalLanguages: ['Punjabi', 'Hindi', 'English'],
    localizedName: { en: 'Punjab', hi: 'पंजाब', mr: 'पंजाब', pa: 'ਪੰਜਾਬ' },
    portal: {
      name: 'Sewa Kendra Punjab & Connect',
      url: 'https://connect.punjab.gov.in',
      department: 'Department of Governance Reforms, Government of Punjab',
      badge: 'State Citizen Delivery Gateway',
      description: {
        en: 'Official state portal for citizen certificates, Atta-Dal smart cards, Ashirwad wedding assistance, and social security pensions.',
        hi: 'नागरिक सेवाओं, आटा-दाल स्मार्ट कार्ड, आशीर्वाद योजना और सामाजिक सुरक्षा पेंशन हेतु आधिकारिक पंजाब पोर्टल।',
        mr: 'प्रमाणपत्रे, आटा-दाल रेशन कार्ड, आशीर्वाद योजना आणि पेन्शनसाठी पंजाबचे अधिकृत पोर्टल.',
      },
      keyServices: [
        { en: 'Smart Ration Card (Atta-Dal Scheme)', hi: 'स्मार्ट राशन कार्ड (आटा-दाल योजना)', mr: 'स्मार्ट रेशन कार्ड (आटा-दाल योजना)' },
        { en: 'Ashirwad Scheme for Daughter Marriage (₹51,000)', hi: 'आशीर्वाद विवाह सहायता (₹51,000)', mr: 'आशीर्वाद कन्या विवाह मदत (₹५१,०००)' },
        { en: 'PLRS Punjab Land Fard Records', hi: 'पीएलआरएस फर्द जमाबंदी नकल', mr: 'पीएलआरएस फर्द जमाबंदी जमीन नोंद' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Aadhaar Card', hi: 'आधार कार्ड', mr: 'आधार कार्ड' }, purpose: { en: 'Identity proof', hi: 'पहचान सत्यापन', mr: 'ओळख पुरावा' }, mandatory: true },
      { name: { en: 'Caste Certificate (for SC/BC applicants)', hi: 'जाति प्रमाण पत्र', mr: 'जात प्रमाणपत्र' }, purpose: { en: 'Ashirwad grant qualification', hi: 'आशीर्वाद योजना पात्रता', mr: 'आशीर्वाद योजना आरक्षण पात्रता' }, mandatory: false },
    ],
    flagshipSchemes: [
      {
        id: 'pb-atta-dal',
        code: 'PB-ADS',
        name: { en: 'Smart Ration Card (Atta-Dal Scheme)', hi: 'स्मार्ट राशन कार्ड (आटा-दाल योजना)', mr: 'आटा-दाल रेशन योजना' },
        benefit: 'Subsidized wheat flour & pulses at doorstep',
        category: 'housing',
        targetGroup: { en: 'Economically vulnerable families in Punjab', hi: 'पंजाब के गरीब एवं जरूरतमंद परिवार', mr: 'पंजाबमधील गरीब आणि गरजू कुटुंबे' },
        officialUrl: 'https://foodsuppb.gov.in',
        summary: { en: 'State food security scheme distributing food grains to eligible smart ration card beneficiaries.', hi: 'गरीब परिवारों को रियायती दर पर गेहूं व दालें।', mr: 'गरजू कुटुंबांना मोफत व सवलतीच्या दरात गव्हाचे पीठ व डाळींची घरपोच किंवा रेशनद्वारे उपलब्धता.' },
      },
    ],
  },

  // 21. Rajasthan
  {
    id: 'rajasthan',
    code: 'RJ',
    name: 'Rajasthan',
    type: 'state',
    capital: 'Jaipur',
    regionalLanguages: ['Hindi', 'Rajasthani'],
    localizedName: { en: 'Rajasthan', hi: 'राजस्थान', mr: 'राजस्थान' },
    portal: {
      name: 'Jan Soochna & Jan Aadhaar Portal',
      url: 'https://jansoochna.rajasthan.gov.in',
      department: 'Department of Information Technology & Communication, Govt of Rajasthan',
      badge: 'Public Information & Jan Aadhaar Gateway',
      description: {
        en: 'Pioneering open public welfare disclosure portal powered by Jan Aadhaar Card covering Chiranjeevi health, Palanhar, and Social Security Pensions.',
        hi: 'जन आधार आधारित सार्वजनिक कल्याण पोर्टल - चिरंजीवी स्वास्थ्य, पालनहार और सामाजिक सुरक्षा पेंशन।',
        mr: 'जन आधार कार्डावर आधारित राजस्थानचे खुले माहिती पोर्टल; चिरंजीवी आरोग्य, पालनहार व पेन्शन योजना.',
      },
      keyServices: [
        { en: 'Jan Aadhaar Single Family Card Lookup', hi: 'जन आधार कार्ड खोज व सत्यापन', mr: 'जन आधार कार्ड शोध व पडताळणी' },
        { en: 'Mukhyamantri Ayushman Arogya (Chiranjeevi Health)', hi: 'आयुष्मान आरोग्य (चिरंजीवी स्वास्थ्य बीमा)', mr: 'आयुष्मान आरोग्य (चिरंजीवी कॅशलेस आरोग्य)' },
        { en: 'Palanhar Yojana for Orphan & Deprived Children', hi: 'पालनहार योजना आवेदन', mr: 'पालनहार योजना अनाथ व गरजू मुले' },
        { en: 'Apna Khata (Jamabandi & Namantaran)', hi: 'अपना खाता जमाबंदी व नामांतरण', mr: 'अपना खाता जमाबंदी व फेरफार नोंद' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Jan Aadhaar Card (10-digit Family ID)', hi: 'जन आधार कार्ड', mr: 'जन आधार कार्ड' }, purpose: { en: 'Universal mandatory entitlement identifier in Rajasthan', hi: 'राजस्थान में सभी योजनाओं हेतु अनिवार्य कार्ड', mr: 'राजस्थानमधील सर्व योजनांसाठी अनिवार्य आयडी' }, mandatory: true },
      { name: { en: 'Aadhaar Card', hi: 'आधार कार्ड', mr: 'आधार कार्ड' }, purpose: { en: 'Biometric verification', hi: 'पहचान सत्यापन', mr: 'ओळख पडताळणी' }, mandatory: true },
    ],
    flagshipSchemes: [
      {
        id: 'rj-chiranjeevi',
        code: 'RJ-MAAY',
        name: { en: 'Mukhyamantri Ayushman Arogya (Chiranjeevi)', hi: 'मुख्यमंत्री आयुष्मान आरोग्य योजना', mr: 'मुख्यमंत्री आयुष्मान आरोग्य योजना' },
        benefit: 'Cashless treatment up to ₹25 Lakh per family per year',
        category: 'health',
        targetGroup: { en: 'All NFSA, Jan Aadhaar cardholders in Rajasthan', hi: 'राजस्थान के सभी जन आधार धारक परिवार', mr: 'राजस्थानमधील सर्व जन आधारधारक कुटुंबे' },
        officialUrl: 'https://health.rajasthan.gov.in',
        summary: { en: 'Nation’s highest health insurance coverage providing up to ₹25 Lakh cashless hospitalization in public and private network hospitals.', hi: 'अस्पतालों में प्रति वर्ष ₹25 लाख तक का कैशलेस इलाज।', mr: 'भारतातील सर्वात मोठे ₹२५ लाखांपर्यंतचे मोफत व कॅशलेस आरोग्य संरक्षण.' },
      },
      {
        id: 'rj-palanhar',
        code: 'RJ-PALAN',
        name: { en: 'Palanhar Yojana', hi: 'पालनहार योजना', mr: 'पालनहार योजना' },
        benefit: 'Monthly financial allowance up to ₹1,500/child + ₹2,000 annual kit',
        category: 'education',
        targetGroup: { en: 'Orphan, destitute, and children of widowed mothers', hi: 'अनाथ, निराश्रित एवं विधवा माताओं के बच्चे', mr: 'अनाथ, निराधार व विधवा मातांची मुले' },
        officialUrl: 'https://sje.rajasthan.gov.in',
        summary: { en: 'Direct allowance provided to caretakers (palanhar) to ensure education, clothing, and nutrition of vulnerable children.', hi: 'अनाथ बच्चों की शिक्षा व भरण-पोषण हेतु प्रति माह आर्थिक सहायता।', mr: 'अनाथ व गरजू बालकांच्या शिक्षण व संगोपनासाठी काळजीवाहू व्यक्तीला दरमहा थेट मदत.' },
      },
    ],
  },

  // 22. Sikkim
  {
    id: 'sikkim',
    code: 'SK',
    name: 'Sikkim',
    type: 'state',
    capital: 'Gangtok',
    regionalLanguages: ['Nepali', 'Sikkimese', 'Bhutia', 'Lepcha', 'English'],
    localizedName: { en: 'Sikkim', hi: 'सिक्किम', mr: 'सिक्कीम' },
    portal: {
      name: 'Sikkim e-District Services',
      url: 'https://edistrict.sikkim.gov.in',
      department: 'Department of Information Technology, Government of Sikkim',
      badge: 'State Public Services Portal',
      description: {
        en: 'Official portal for Certificate of Identification (COI), Aama Yojana financial aid, and farmer assistance.',
        hi: 'पहचान प्रमाण पत्र (सीओआई), आमा योजना और किसान सहायता हेतु आधिकारिक सिक्किम पोर्टल।',
        mr: 'ओळख प्रमाणपत्र (COI), आमा योजना आणि नागरी सेवांसाठी सिक्कीमचे अधिकृत पोर्टल.',
      },
      keyServices: [
        { en: 'Certificate of Identification (COI)', hi: 'पहचान प्रमाण पत्र (सीओआई)', mr: 'ओळख प्रमाणपत्र (COI)' },
        { en: 'Aama Yojana Direct Assistance to Non-Working Mothers', hi: 'आमा योजना ₹20,000/वर्ष', mr: 'आमा योजना वर्षाला ₹२०,०००' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Certificate of Identification (COI)', hi: 'सीओआई प्रमाण पत्र', mr: 'COI प्रमाणपत्र' }, purpose: { en: 'Sikkim domicile qualification', hi: 'सिक्किम मूल निवासी पहचान', mr: 'सिक्कीम अधिवास पात्रता' }, mandatory: true },
    ],
    flagshipSchemes: [
      {
        id: 'sk-aama',
        code: 'SK-AAMA',
        name: { en: 'Aama Yojana', hi: 'आमा योजना', mr: 'आमा योजना' },
        benefit: '₹20,000 / year direct bank deposit to non-working mothers',
        category: 'women_child',
        targetGroup: { en: 'Unemployed non-working mothers in Sikkim', hi: 'सिक्किम की गैर-कार्यरत माताएं', mr: 'सिक्कीममधील बेरोजगार गृहिणी माता' },
        officialUrl: 'https://sikkim.gov.in',
        summary: { en: 'Direct financial incentive to inculcate the habit of savings and support homemakers without independent income.', hi: 'गैर-कार्यरत माताओं के बैंक खाते में ₹20,000 की वार्षिक सहायता।', mr: 'आर्थिकदृष्ट्या स्वावलंबी बनवण्यासाठी गृहिणी मातांच्या खात्यात वार्षिक ₹२०,००० थेट जमा.' },
      },
    ],
  },

  // 23. Tamil Nadu
  {
    id: 'tamil-nadu',
    code: 'TN',
    name: 'Tamil Nadu',
    type: 'state',
    capital: 'Chennai',
    regionalLanguages: ['Tamil', 'English'],
    localizedName: { en: 'Tamil Nadu', hi: 'तमिलनाडु', mr: 'तमिळनाडू', ta: 'தமிழ்நாடு' },
    portal: {
      name: 'TN e-Sevai & TNeGA Portal',
      url: 'https://www.tnesevai.tn.gov.in',
      department: 'Tamil Nadu e-Governance Agency (TNeGA), Govt of Tamil Nadu',
      badge: 'State Single-Window & Welfare Portal',
      description: {
        en: 'Authoritative citizen services platform for Kalaignar Magalir Urimai Thogai, Pudhumai Penn, Patta/Chitta land records, and CMCHIS health.',
        hi: 'कलैग्नार महिला अधिकार योजना, पुदुमई पेन, पट्टा/चित्ता और मुख्यमंत्री स्वास्थ्य बीमा हेतु आधिकारिक पोर्टल।',
        mr: 'कलैग्नार मगळिर उरिमै (महिला हक्क योजना), पुदुमई पेन आणि पट्टा/चित्ता जमीन नोंदींसाठी तमिळनाडूचे अधिकृत पोर्टल.',
      },
      keyServices: [
        { en: 'Kalaignar Magalir Urimai Thogai (₹1,000/mo)', hi: 'कलैग्नार महिला अधिकार योजना ₹1,000/माह', mr: 'कलैग्नार महिला अधिकार योजना दरमहा ₹१,०००' },
        { en: 'Pudhumai Penn Higher Education Scheme (₹1,000/mo)', hi: 'पुदुमई पेन उच्च शिक्षा योजना', mr: 'पुदुमई पेन उच्च शिक्षण योजना' },
        { en: 'Anywhere Any-time Patta/Chitta Land Records (e-Services)', hi: 'पट्टा / चित्ता भू-अभिलेख', mr: 'पट्टा / चित्ता जमीन महसूल नोंद' },
        { en: 'Chief Minister’s Comprehensive Health Insurance (CMCHIS)', hi: 'मुख्यमंत्री व्यापक स्वास्थ्य बीमा', mr: 'मुख्यमंत्री व्यापक आरोग्य विमा (CMCHIS)' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Aadhaar Card Linked to Bank Account', hi: 'आधार व बैंक खाता', mr: 'आधार व बँक खात्याची जोडणी' }, purpose: { en: 'Direct Benefit Transfer (DBT)', hi: 'डीबीटी भुगतान', mr: 'थेट लाभ जमा' }, mandatory: true },
      { name: { en: 'Smart Family Ration Card', hi: 'स्मार्ट परिवार राशन कार्ड', mr: 'स्मार्ट कौटुंबिक रेशन कार्ड' }, purpose: { en: 'Family verification for welfare entitlements', hi: 'पारिवारिक पात्रता सत्यापन', mr: 'कौटुंबिक पात्रता पडताळणी' }, mandatory: true },
      { name: { en: 'Electricity Consumer Number (TANGEDCO)', hi: 'बिजली उपभोक्ता संख्या', mr: 'वीज ग्राहक क्रमांक' }, purpose: { en: 'Power consumption ceiling check', hi: 'बिजली खपत पात्रता', mr: 'वीज वापर मर्यादा पडताळणी' }, mandatory: false },
    ],
    flagshipSchemes: [
      {
        id: 'tn-magalir-urimai',
        code: 'TN-KMUT',
        name: { en: 'Kalaignar Magalir Urimai Thogai', hi: 'कलैग्नार महिला अधिकार योजना', mr: 'कलैग्नार महिला हक्क योजना' },
        benefit: '₹1,000 / month direct bank deposit to female heads of families',
        category: 'women_child',
        targetGroup: { en: 'Women heads of families with annual income < ₹2.5 Lakh', hi: '2.5 लाख से कम आय वाले परिवारों की महिला मुखिया', mr: '२.५ लाखांपेक्षा कमी उत्पन्न असलेल्या कुटुंबातील महिला प्रमुख' },
        officialUrl: 'https://kmut.tn.gov.in',
        summary: { en: 'Landmark rights-based financial support recognizing the unpaid labor of women and mothers across Tamil Nadu.', hi: 'महिलाओं के अदृश्य श्रम को सम्मान देने हेतु ₹1,000 मासिक प्रत्यक्ष हस्तांतरण।', mr: 'महिलांच्या कौटुंबिक योगदानाचा सन्मान करण्यासाठी दरमहा ₹१,००० थेट बँक खात्यात.' },
      },
      {
        id: 'tn-pudhumai-penn',
        code: 'TN-PPS',
        name: { en: 'Pudhumai Penn Scheme', hi: 'पुदुमई पेन योजना', mr: 'पुदुमई पेन योजना' },
        benefit: '₹1,000 / month during Undergraduate / Diploma education',
        category: 'education',
        targetGroup: { en: 'Girl students from Govt Schools (Class 6-12) pursuing higher education', hi: 'सरकारी स्कूलों से पढ़ीं कॉलेज जाने वाली छात्राएं', mr: 'शासकीय शाळेतून शिकून पदवी/डिप्लोमा करणाऱ्या विद्यार्थिनी' },
        officialUrl: 'https://penkalvi.tn.gov.in',
        summary: { en: 'Monthly scholarship paid directly to girl students until graduation to prevent college dropouts.', hi: 'छात्राओं को स्नातक पूरा होने तक ₹1,000 प्रति माह छात्रवृत्ति।', mr: 'मुलींचे उच्च शिक्षणातील गळतीचे प्रमाण रोखण्यासाठी पदवी पूर्ण होईपर्यंत दरमहा ₹१,००० शिष्यवृत्ती.' },
      },
    ],
  },

  // 24. Telangana
  {
    id: 'telangana',
    code: 'TG',
    name: 'Telangana',
    type: 'state',
    capital: 'Hyderabad',
    regionalLanguages: ['Telugu', 'Urdu', 'English'],
    localizedName: { en: 'Telangana', hi: 'तेलंगाना', mr: 'तेलंगणा', te: 'తెలంగాణ' },
    portal: {
      name: 'MeeSeva Telangana & Dharani',
      url: 'https://meeseva.telangana.gov.in',
      department: 'ITE&C Department, Government of Telangana',
      badge: 'State Single-Window & Citizen Services',
      description: {
        en: 'Official state portal for citizen delivery, Rythu Bharosa input aid, Aasara pensions, and Mahalakshmi guarantees.',
        hi: 'नागरिक सेवाओं, रायथू भरोसा किसान सहायता, आसरा पेंशन और महालक्ष्मी योजना हेतु आधिकारिक तेलंगाना पोर्टल।',
        mr: 'रयतू भरोसा शेतकरी मदत, आसरा पेन्शन आणि महालक्ष्मी योजनांसाठी तेलंगणाचे अधिकृत पोर्टल.',
      },
      keyServices: [
        { en: 'Rythu Bharosa Input Aid for Farmers', hi: 'रायथू भरोसा किसान सहायता', mr: 'रयतू भरोसा शेतकरी आर्थिक मदत' },
        { en: 'Aasara Pension (₹2,016/mo for Seniors & Widows)', hi: 'आसरा पेंशन ₹2,016/माह', mr: 'आसरा पेन्शन दरमहा ₹२,०१६' },
        { en: 'Dharani Integrated Land Record Management', hi: 'धरणी पोर्टल पट्टा पासबुक भू-अभिलेख', mr: 'धरणी पोर्टल जमीन मालकी पासबुक नोंद' },
        { en: 'Mahalakshmi Free Bus Travel & Gas Subsidy', hi: 'महालक्ष्मी योजना निःशुल्क बस व गैस सब्सिडी', mr: 'महालक्ष्मी मोफत बस प्रवास व गॅस अनुदान' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Aadhaar Card', hi: 'आधार कार्ड', mr: 'आधार कार्ड' }, purpose: { en: 'Identity authentication', hi: 'पहचान सत्यापन', mr: 'ओळख पडताळणी' }, mandatory: true },
      { name: { en: 'Food Security Card (FSC Ration Card)', hi: 'फूड सिक्योरिटी राशन कार्ड', mr: 'अन्न सुरक्षा रेशन कार्ड' }, purpose: { en: 'BPL eligibility verification', hi: 'गरीबी रेखा पात्रता', mr: 'दारिद्र्यरेषेखालील पात्रता पुरावा' }, mandatory: true },
      { name: { en: 'Pattadar Passbook (Dharani RoR)', hi: 'पट्टादार पासबुक (धरणी)', mr: 'पट्टादार पासबुक जमीन नोंद' }, purpose: { en: 'Rythu Bharosa farmer validation', hi: 'किसान भूमि सत्यापन', mr: 'शेतकरी जमीन मालकी पुरावा' }, mandatory: false },
    ],
    flagshipSchemes: [
      {
        id: 'tg-rythu-bharosa',
        code: 'TG-RB',
        name: { en: 'Rythu Bharosa (Rythu Bandhu)', hi: 'रायथू भरोसा (रायथू बंधु)', mr: 'रयतू भरोसा (रयतू बंधू)' },
        benefit: '₹15,000 / acre / year agricultural investment support',
        category: 'agriculture',
        targetGroup: { en: 'Landowning farmers and tenant cultivators in Telangana', hi: 'तेलंगाना के भूमि मालिक व काश्तकार किसान', mr: 'तेलंगणातील शेतकरी व कुळ शेतकरी' },
        officialUrl: 'https://rythubandhu.telangana.gov.in',
        summary: { en: 'Pioneering agricultural input financial support credited directly twice a year for Kharif and Rabi seasons.', hi: 'खरीफ और रबी फसलों के लिए प्रति एकड़ ₹15,000 वार्षिक निवेश सहायता।', mr: 'खरीप आणि रब्बी हंगामासाठी बियाणे व खतांकरिता प्रति एकर वर्षाला ₹१५,००० ची थेट गुंतवणूक मदत.' },
      },
      {
        id: 'tg-aasara-pension',
        code: 'TG-AASARA',
        name: { en: 'Aasara Pension Scheme', hi: 'आसरा पेंशन योजना', mr: 'आसरा पेन्शन योजना' },
        benefit: '₹2,016 / month (₹4,016 for disabled)',
        category: 'pension',
        targetGroup: { en: 'Senior citizens aged 57+, widows, weavers, toddy tappers, and disabled', hi: '57+ आयु के वृद्ध, विधवाएं, बुनकर व दिव्यांग', mr: '५७ वर्षे पूर्ण झालेले वृद्ध, विधवा, विणकर व दिव्यांग' },
        officialUrl: 'https://aasara.telangana.gov.in',
        summary: { en: 'Robust social safety net pension securing dignified living for vulnerable demographics in Telangana.', hi: 'वृद्धों, विधवाओं और दिव्यांगों को ₹2,016 से ₹4,016 मासिक पेंशन।', mr: 'ज्येष्ठ नागरिक व गरजूंना सन्मानपूर्वक जगण्यासाठी दरमहा ₹२,०१६ (दिव्यांगांना ₹४,०१६) निवृत्तिवेतन.' },
      },
    ],
  },

  // 25. Tripura
  {
    id: 'tripura',
    code: 'TR',
    name: 'Tripura',
    type: 'state',
    capital: 'Agartala',
    regionalLanguages: ['Bengali', 'Kokborok', 'English'],
    localizedName: { en: 'Tripura', hi: 'त्रिपुरा', mr: 'त्रिपुरा', bn: 'ত্রিপুরা' },
    portal: {
      name: 'e-District Tripura',
      url: 'https://edistrict.tripura.gov.in',
      department: 'Directorate of Information Technology, Government of Tripura',
      badge: 'State Public Services Portal',
      description: {
        en: 'Official state portal for PRTC, caste certificates, and Mukhyamantri Matru Pusti Uphaar benefits.',
        hi: 'स्थायी निवास प्रमाण पत्र, जाति प्रमाण पत्र और मातृ कल्याण योजनाओं हेतु त्रिपुरा का आधिकारिक पोर्टल।',
        mr: 'अधिवास दाखला, जात प्रमाणपत्र आणि माता-बाल कल्याण योजनांसाठी त्रिपुराचे अधिकृत पोर्टल.',
      },
      keyServices: [
        { en: 'Permanent Resident of Tripura Certificate (PRTC)', hi: 'त्रिपुरा स्थायी निवास प्रमाण पत्र (पीआरटीसी)', mr: 'त्रिपुरा कायमस्वरूपी रहिवासी दाखला (PRTC)' },
        { en: 'Mukhyamantri Matru Pusti Uphaar Nutrition Kits', hi: 'मातृ पुष्टि उपहार पोषण किट', mr: 'मातृ पुष्टी उपहार पोषण किट' },
      ],
    },
    keyDocuments: [
      { name: { en: 'PRTC (Permanent Resident Certificate)', hi: 'पीआरटीसी प्रमाण पत्र', mr: 'PRTC दाखला' }, purpose: { en: 'Proof of Tripura residency', hi: 'त्रिपुरा मूल निवासी प्रमाण', mr: 'त्रिपुरा अधिवास पुरावा' }, mandatory: true },
    ],
    flagshipSchemes: [
      {
        id: 'tr-matru-pusti',
        code: 'TR-MMPU',
        name: { en: 'Mukhyamantri Matru Pusti Uphaar', hi: 'मुख्यमंत्री मातृ पुष्टि उपहार', mr: 'मुख्यमंत्री मातृ पुष्टी उपहार' },
        benefit: 'Nutrition kits worth ₹2,000 for pregnant and lactating mothers',
        category: 'health',
        targetGroup: { en: 'Pregnant women registered at Primary Health Centers (PHCs)', hi: 'पीएचसी में पंजीकृत गर्भवती महिलाएं', mr: 'प्राथमिक आरोग्य केंद्रात नोंदणीकृत गरोदर महिला' },
        officialUrl: 'https://tripura.gov.in',
        summary: { en: 'Combatting maternal malnutrition through comprehensive nutrition kits provided during four antenatal checkups.', hi: 'मातृ और शिशु कुपोषण रोकने हेतु 4 एएनसी जांचों पर पोषण किट।', mr: 'माता व बाल कुपोषण रोखण्यासाठी गरोदरपणातील तपासणीदरम्यान मोफत पौष्टिक आहार किट.' },
      },
    ],
  },

  // 26. Uttar Pradesh
  {
    id: 'uttar-pradesh',
    code: 'UP',
    name: 'Uttar Pradesh',
    type: 'state',
    capital: 'Lucknow',
    regionalLanguages: ['Hindi', 'Urdu'],
    localizedName: { en: 'Uttar Pradesh', hi: 'उत्तर प्रदेश', mr: 'उत्तर प्रदेश' },
    portal: {
      name: 'e-District Uttar Pradesh',
      url: 'https://edistrict.up.gov.in',
      department: 'Centre for e-Governance, Government of Uttar Pradesh',
      badge: 'State Flagship Citizen Services',
      description: {
        en: 'Official government portal for caste, domicile, income certificates, Shadi Anudan, and Kanya Sumangala verification across 75 districts.',
        hi: 'उत्तर प्रदेश के 75 जिलों में जाति, निवास, आय प्रमाण पत्र, शादी अनुदान और कन्या सुमंगला योजना हेतु आधिकारिक पोर्टल।',
        mr: 'जात, अधिवास, उत्पन्न दाखला, विवाह अनुदान आणि कन्या सुमंगला योजनेसाठी उत्तर प्रदेशचे अधिकृत पोर्टल.',
      },
      keyServices: [
        { en: 'Mukhyamantri Kanya Sumangala Yojana (₹25,000 in 6 stages)', hi: 'कन्या सुमंगला योजना ₹25,000 सहायता', mr: 'कन्या सुमंगला योजना ₹२५,००० मदत' },
        { en: 'UP Shadi Anudan Yojana (₹51,000 Wedding Aid)', hi: 'शादी अनुदान योजना ₹51,000 सहायता', mr: 'विवाह अनुदान योजना ₹५१,००० मदत' },
        { en: 'UP Bhulekh Khatauni Land Records (upbhulekh.gov.in)', hi: 'यूपी भूलेख खतौनी भू-अभिलेख', mr: 'यूपी भूलेख खतवणी जमीन नोंद' },
        { en: 'UP Social Welfare Old Age, Widow & Divyang Pension', hi: 'वृद्धावस्था, विधवा एवं दिव्यांग पेंशन', mr: 'वृद्धापकाळ, विधवा व दिव्यांग पेन्शन' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Aadhaar Card', hi: 'आधार कार्ड', mr: 'आधार कार्ड' }, purpose: { en: 'Identity & e-KYC', hi: 'पहचान व प्रमाणीकरण', mr: 'ओळख व ई-केवायसी' }, mandatory: true },
      { name: { en: 'Income Certificate issued by Tehsildar (Aay Praman Patra)', hi: 'तहसीलदार द्वारा जारी आय प्रमाण पत्र', mr: 'तहसीलदारांचा अधिकृत उत्पन्न दाखला' }, purpose: { en: 'Income ceiling qualification', hi: 'पारिवारिक आय सीमा सत्यापन', mr: 'कौटुंबिक उत्पन्न पडताळणी' }, mandatory: true },
      { name: { en: 'Khatauni Land Record (for farmers)', hi: 'भूलेख खतौनी नकल', mr: 'भूलेख खतवणी जमीन उतारा' }, purpose: { en: 'Farmer welfare registration', hi: 'कृषि योजना सत्यापन', mr: 'शेतकरी योजना पात्रता' }, mandatory: false },
    ],
    flagshipSchemes: [
      {
        id: 'up-kanya-sumangala',
        code: 'UP-MKSY',
        name: { en: 'Mukhyamantri Kanya Sumangala Yojana', hi: 'मुख्यमंत्री कन्या सुमंगला योजना', mr: 'मुख्यमंत्री कन्या सुमंगला योजना' },
        benefit: '₹25,000 total conditional financial aid across 6 milestones',
        category: 'education',
        targetGroup: { en: 'Daughters of families with annual income < ₹3 Lakh (up to 2 girls/family)', hi: '3 लाख से कम आय वाले परिवारों की बेटियां', mr: '३ लाखांपेक्षा कमी उत्पन्न असलेल्या कुटुंबातील मुली' },
        officialUrl: 'https://mksy.up.gov.in',
        summary: { en: 'Direct transfers from birth, complete immunization, Class 1, Class 6, Class 9 admission through higher education graduation.', hi: 'बालिकाओं के जन्म से लेकर स्नातक तक 6 चरणों में ₹25,000 की वित्तीय सहायता।', mr: 'मुलींच्या जन्मापासून पदवीपर्यंत ६ टप्प्यांत ₹२५,००० ची थेट शैक्षणिक व आर्थिक मदत.' },
      },
      {
        id: 'up-shadi-anudan',
        code: 'UP-SAY',
        name: { en: 'UP Shadi Anudan Yojana', hi: 'उत्तर प्रदेश शादी अनुदान योजना', mr: 'उत्तर प्रदेश विवाह अनुदान योजना' },
        benefit: '₹51,000 financial grant for daughter marriage',
        category: 'women_child',
        targetGroup: { en: 'Poor families (SC/ST/OBC/Minority/General BPL) marrying daughters', hi: 'गरीब व बीपीएल परिवारों की बेटियों के विवाह हेतु', mr: 'गरीब व दारिद्र्यरेषेखालील कुटुंबातील मुलींच्या विवाहासाठी' },
        officialUrl: 'https://shadianudan.upsdc.gov.in',
        summary: { en: 'Direct financial assistance paid to economically backward parents to meet daughter wedding expenses and combat debt traps.', hi: 'गरीब परिवारों की बेटियों के विवाह के लिए ₹51,000 का अनुदान।', mr: 'आर्थिकदृष्ट्या दुर्बल पालकांना मुलीच्या लग्नखर्चासाठी ₹५१,००० चे थेट शासकीय अनुदान.' },
      },
    ],
  },

  // 27. Uttarakhand
  {
    id: 'uttarakhand',
    code: 'UK',
    name: 'Uttarakhand',
    type: 'state',
    capital: 'Dehradun',
    regionalLanguages: ['Hindi', 'Garhwali', 'Kumaoni'],
    localizedName: { en: 'Uttarakhand', hi: 'उत्तराखंड', mr: 'उत्तराखंड' },
    portal: {
      name: 'Apuni Sarkar Uttarakhand (e-Services)',
      url: 'https://eservices.uk.gov.in',
      department: 'Information Technology Development Agency (ITDA), Govt of Uttarakhand',
      badge: 'State Public Services Portal',
      description: {
        en: 'Official single-window portal for domicile, caste, Gaura Devi Kanyadhan, and social pensions in Uttarakhand.',
        hi: 'नागरिक सेवाओं, गौरा देवी कन्याधन और सामाजिक सुरक्षा पेंशन हेतु उत्तराखंड का आधिकारिक पोर्टल।',
        mr: 'दाखले, गौरा देवी कन्याधन आणि सामाजिक पेन्शनसाठी उत्तराखंडचे अधिकृत पोर्टल.',
      },
      keyServices: [
        { en: 'Gaura Devi Kanyadhan / Nanda Gaura Scheme', hi: 'नंदा गौरा कन्याधन योजना', mr: 'नंदा गौरा कन्याधन योजना' },
        { en: 'Bhulekh Uttarakhand Khatauni (bhulekh.uk.gov.in)', hi: 'उत्तराखंड भूलेख खतौनी नकल', mr: 'उत्तराखंड भूलेख खतवणी नोंद' },
        { en: 'Old Age & Widow Social Security Pension', hi: 'वृद्धावस्था व विधवा पेंशन', mr: 'ज्येष्ठ नागरिक व विधवा पेन्शन' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Uttarakhand Permanent Resident Certificate', hi: 'उत्तराखंड मूल निवास प्रमाण पत्र', mr: 'उत्तराखंड कायमस्वरूपी रहिवासी दाखला' }, purpose: { en: 'State domicile proof', hi: 'मूल निवास पात्रता', mr: 'अधिवास पुरावा' }, mandatory: true },
    ],
    flagshipSchemes: [
      {
        id: 'uk-nanda-gaura',
        code: 'UK-NGY',
        name: { en: 'Nanda Gaura Devi Kanyadhan Yojana', hi: 'नंदा गौरा योजना', mr: 'नंदा गौरा योजना' },
        benefit: 'Up to ₹51,000 upon passing Class 12 and birth',
        category: 'education',
        targetGroup: { en: 'Girl children of families with annual income up to ₹72,000', hi: 'गरीब परिवारों की 12वीं पास बेटियां', mr: 'गरीब कुटुंबातील १२वी उत्तीर्ण मुली' },
        officialUrl: 'https://nandagaura.uk.gov.in',
        summary: { en: 'Comprehensive incentive encouraging girl child education and delaying marriage until adulthood.', hi: 'बालिकाओं की उच्च शिक्षा को प्रोत्साहित करने हेतु ₹51,000 तक की सहायता।', mr: 'मुलींचे उच्च शिक्षण आणि सक्षमीकरणासाठी ₹५१,००० चे अनुदान.' },
      },
    ],
  },

  // 28. West Bengal
  {
    id: 'west-bengal',
    code: 'WB',
    name: 'West Bengal',
    type: 'state',
    capital: 'Kolkata',
    regionalLanguages: ['Bengali', 'English'],
    localizedName: { en: 'West Bengal', hi: 'पश्चिम बंगाल', mr: 'पश्चिम बंगाल', bn: 'পশ্চিমবঙ্গ' },
    portal: {
      name: 'Duare Sarkar & Banglarbhumi',
      url: 'https://duaresarkar.wb.gov.in',
      department: 'Government of West Bengal',
      badge: 'Duare Sarkar & State Gateway',
      description: {
        en: 'Authoritative citizen outreach platform organizing doorstep camps for Lakshmir Bhandar, Krishak Bandhu, Kanyashree, and Swasthya Sathi cards.',
        hi: 'लक्ष्मी भंडार, कृषक बंधु, कन्याश्री और स्वास्थ्य साथी हेतु पश्चिम बंगाल का आधिकारिक दुआरे सरकार पोर्टल।',
        mr: 'लक्ष्मी भंडार, कृषक बंधू, कन्याश्री आणि स्वास्थ्य साथीसाठी पश्चिम बंगालचे अधिकृत दुआरे सरकार पोर्टल.',
      },
      keyServices: [
        { en: 'Lakshmir Bhandar Direct Financial Assistance (₹1,000 - ₹1,200/mo)', hi: 'लक्ष्मी भंडार योजना ₹1,000 - ₹1,200/माह', mr: 'लक्ष्मी भंडार योजना दरमहा ₹१,००० ते ₹१,२००' },
        { en: 'Krishak Bandhu (Assured ₹10,000/yr for Farmers)', hi: 'कृषक बंधु योजना ₹10,000/वर्ष', mr: 'कृषक बंधू शेतकरी योजना ₹१०,०००/वर्ष' },
        { en: 'Banglarbhumi Khatian & Plot Information (banglarbhumi.gov.in)', hi: 'बांगलारभूमि खतियान व प्लॉट भू-अभिलेख', mr: 'बांगलारभूमी खतियान व जमीन नोंद' },
        { en: 'Swasthya Sathi Cashless Health Smart Card (₹5 Lakh)', hi: 'स्वास्थ्य साथी कैशलेस स्मार्ट कार्ड', mr: 'स्वास्थ्य साथी कॅशलेस आरोग्य स्मार्ट कार्ड' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Swasthya Sathi Health Card Number', hi: 'स्वास्थ्य साथी कार्ड नंबर', mr: 'स्वास्थ्य साथी कार्ड क्रमांक' }, purpose: { en: 'Mandatory family entitlement link in West Bengal', hi: 'लक्ष्मी भंडार व स्वास्थ्य साथी हेतु अनिवार्य', mr: 'लक्ष्मी भंडार योजनेसाठी अनिवार्य कौटुंबिक कार्ड' }, mandatory: true },
      { name: { en: 'Aadhaar Card Linked to Single Bank Account', hi: 'आधार व बैंक खाता (एकल खाता)', mr: 'आधार व बँक खात्याची जोडणी' }, purpose: { en: 'Direct benefit credit', hi: 'डीबीटी भुगतान', mr: 'थेट लाभ जमा' }, mandatory: true },
      { name: { en: 'Banglarbhumi RoR Khatian Record', hi: 'बांगलारभूमि खतियान पर्चा', mr: 'बांगलारभूमी खतियान जमीन नोंद' }, purpose: { en: 'Krishak Bandhu farmer aid', hi: 'कृषक बंधु योजना पात्रता', mr: 'कृषक बंधू शेतकरी पात्रता' }, mandatory: false },
    ],
    flagshipSchemes: [
      {
        id: 'wb-lakshmir-bhandar',
        code: 'WB-LB',
        name: { en: 'Lakshmir Bhandar Scheme', hi: 'लक्ष्मी भंडार योजना', mr: 'लक्ष्मी भंडार योजना' },
        benefit: '₹1,000 / month (General) & ₹1,200 / month (SC/ST) directly to women',
        category: 'women_child',
        targetGroup: { en: 'Women heads of families aged 25 to 60 residing in West Bengal', hi: '25 से 60 वर्ष की सभी निवासी महिलाएं', mr: '२५ ते ६० वयोगटातील पश्चिम बंगालमधील महिला' },
        officialUrl: 'https://duaresarkar.wb.gov.in',
        summary: { en: 'Universal financial support provided to female homemakers to ensure baseline financial independence.', hi: 'महिलाओं को ₹1,000 से ₹1,200 मासिक वित्तीय संबल।', mr: 'महिलांच्या स्वावलंबनासाठी दरमहा ₹१,००० (एससी/एसटी महिलांना ₹१,२००) थेट बँक खात्यात.' },
      },
      {
        id: 'wb-krishak-bandhu',
        code: 'WB-KB',
        name: { en: 'Krishak Bandhu Scheme', hi: 'कृषक बंधु योजना', mr: 'कृषक बंधू योजना' },
        benefit: '₹10,000 / year (₹5,000 per crop season) + ₹2 Lakh life insurance',
        category: 'agriculture',
        targetGroup: { en: 'All farmers, Bhagchasis (sharecroppers) and landholders in WB', hi: 'पश्चिम बंगाल के सभी किसान और बटाईदार', mr: 'पश्चिम बंगालमधील सर्व शेतकरी व कुळ शेतकरी' },
        officialUrl: 'https://krishakbandhu.wb.gov.in',
        summary: { en: 'Assured seasonal input financial aid to all cultivators irrespective of land size, plus ₹2 Lakh death relief.', hi: 'किसानों को दो किस्तों में ₹10,000 की वार्षिक सहायता एवं ₹2 लाख का बीमा।', mr: 'शेतकऱ्यांना बियाणे व खतांसाठी वर्षाला ₹१०,००० ची मदत आणि ₹२ लाखांचे जीवन विमा संरक्षण.' },
      },
    ],
  },

  // 29. Andaman and Nicobar Islands (UT)
  {
    id: 'andaman-nicobar',
    code: 'AN',
    name: 'Andaman and Nicobar Islands',
    type: 'union_territory',
    capital: 'Port Blair',
    regionalLanguages: ['Hindi', 'Bengali', 'Tamil', 'Telugu', 'English'],
    localizedName: { en: 'Andaman & Nicobar Islands', hi: 'अंडमान और निकोबार द्वीप समूह', mr: 'अंदमान आणि निकोबार बेटे' },
    portal: {
      name: 'e-District Andaman & Nicobar',
      url: 'https://edistrict.andaman.gov.in',
      department: 'Andaman & Nicobar Administration',
      badge: 'UT e-Governance Gateway',
      description: {
        en: 'Official UT portal for local certificates, tribal permits, and social assistance.',
        hi: 'स्थानीय प्रमाण पत्र, जनजातीय परमिट और सामाजिक सुरक्षा हेतु अंडमान का आधिकारिक पोर्टल।',
        mr: 'प्रमाणपत्रे आणि नागरी सेवांसाठी अंदमान प्रशासनाचे अधिकृत पोर्टल.',
      },
      keyServices: [
        { en: 'Local Certificate / Tribal Pass', hi: 'स्थानीय प्रमाण पत्र', mr: 'स्थानिक प्रमाणपत्र' },
        { en: 'Social Security Pension for Widows & Senior Citizens', hi: 'सामाजिक सुरक्षा पेंशन', mr: 'सामाजिक पेन्शन योजना' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Aadhaar Card / Islander Card', hi: 'आधार / आईलैंडर कार्ड', mr: 'आधार किंवा आयलँडर कार्ड' }, purpose: { en: 'UT resident identification', hi: 'निवासी पहचान', mr: 'रहिवासी ओळख' }, mandatory: true },
    ],
    flagshipSchemes: [
      {
        id: 'an-destitute-pension',
        code: 'AN-DPA',
        name: { en: 'Financial Assistance to Destitute & Widows', hi: 'निराश्रित एवं विधवा वित्तीय सहायता', mr: 'निराधार व विधवा आर्थिक सहाय्य योजना' },
        benefit: '₹2,500 / month direct assistance',
        category: 'pension',
        targetGroup: { en: 'Destitute women, widows, and elderly in Andaman & Nicobar', hi: 'अंडमान और निकोबार के निराश्रित नागरिक', mr: 'अंदमान व निकोबारमधील निराधार नागरिक' },
        officialUrl: 'https://edistrict.andaman.gov.in',
        summary: { en: 'Monthly pension of ₹2,500 to destitute women and senior citizens disbursed through Social Welfare Department.', hi: 'अंडमान प्रशासन द्वारा निराश्रित महिलाओं एवं बुजुर्गों को ₹2,500 मासिक पेंशन।', mr: 'अंदमान प्रशासनाकडून निराधार महिला व वृद्धांना दरमहा ₹२,५०० पेन्शन.' },
      },
    ],
  },

  // 30. Chandigarh (UT)
  {
    id: 'chandigarh',
    code: 'CH',
    name: 'Chandigarh',
    type: 'union_territory',
    capital: 'Chandigarh',
    regionalLanguages: ['English', 'Punjabi', 'Hindi'],
    localizedName: { en: 'Chandigarh', hi: 'चंडीगढ़', mr: 'चंदिगढ' },
    portal: {
      name: 'e-District Chandigarh Administration',
      url: 'https://admser.chd.nic.in',
      department: 'Chandigarh Administration',
      badge: 'UT Single Window Services',
      description: {
        en: 'Official portal for municipal services, social security pensions, and citizen certificates.',
        hi: 'नागरिक प्रमाण पत्र, सामाजिक सुरक्षा और नगर निगम सेवाओं हेतु चंडीगढ़ का आधिकारिक पोर्टल।',
        mr: 'नागरी सेवा व सामाजिक पेन्शनसाठी चंदिगढ प्रशासनाचे अधिकृत पोर्टल.',
      },
      keyServices: [
        { en: 'Old Age, Widow and Disability Pension', hi: 'पेंशन योजनाएं', mr: 'पेन्शन योजना' },
        { en: 'Residence and Income Certificates', hi: 'निवास व आय प्रमाण पत्र', mr: 'रहिवासी व उत्पन्न दाखला' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Aadhaar Card', hi: 'आधार कार्ड', mr: 'आधार कार्ड' }, purpose: { en: 'Identity proof', hi: 'पहचान सत्यापन', mr: 'ओळख पुरावा' }, mandatory: true },
    ],
    flagshipSchemes: [
      {
        id: 'ch-social-pension',
        code: 'CH-SSPS',
        name: { en: 'Chandigarh Social Security Pension Scheme', hi: 'चंडीगढ़ सामाजिक सुरक्षा पेंशन योजना', mr: 'चंदिगढ सामाजिक सुरक्षा पेन्शन योजना' },
        benefit: '₹2,000 / month pension for seniors and widows',
        category: 'pension',
        targetGroup: { en: 'Senior citizens aged 60+ and widows in Chandigarh with income < ₹1.5 Lakh', hi: 'चंडीगढ़ के 60+ आयु वाले वरिष्ठ नागरिक एवं विधवाएं', mr: 'चंदिगढमधील ज्येष्ठ नागरिक व विधवा महिला' },
        officialUrl: 'https://admser.chd.nic.in',
        summary: { en: 'Monthly financial pension of ₹2,000 for destitute elderly, widows, and persons with disabilities.', hi: 'चंडीगढ़ प्रशासन द्वारा बुजुर्गों और विधवाओं को ₹2,000 प्रतिमाह पेंशन।', mr: 'चंदिगढ प्रशासनाकडून ज्येष्ठ नागरिक व विधवांना दरमहा ₹२,००० पेन्शन.' },
      },
    ],
  },

  // 31. Dadra and Nagar Haveli and Daman and Diu (UT)
  {
    id: 'dadra-nagar-haveli-daman-diu',
    code: 'DH',
    name: 'Dadra and Nagar Haveli and Daman and Diu',
    type: 'union_territory',
    capital: 'Daman',
    regionalLanguages: ['Gujarati', 'Hindi', 'Marathi', 'English'],
    localizedName: { en: 'Dadra & Nagar Haveli and Daman & Diu', hi: 'दादरा और नगर हवेली एवं दमन और दीव', mr: 'दादरा आणि नगर हवेली आणि दमण आणि दीव' },
    portal: {
      name: 'Daman & Diu Official Administration Portal',
      url: 'https://daman.nic.in',
      department: 'U.T. Administration of Dadra & Nagar Haveli and Daman & Diu',
      badge: 'UT Administration & e-Services',
      description: {
        en: 'Official portal for domicile certificates, tribal welfare schemes, and social security.',
        hi: 'निवास प्रमाण पत्र, जनजातीय योजनाएं और सामाजिक सुरक्षा हेतु केंद्र शासित प्रदेश पोर्टल।',
        mr: 'प्रमाणपत्रे आणि नागरी सेवांसाठीचे अधिकृत केंद्रशासित प्रदेश पोर्टल.',
      },
      keyServices: [
        { en: 'Domicile / Resident Certificate', hi: 'निवास प्रमाण पत्र', mr: 'अधिवास दाखला' },
        { en: 'Social Security Pension Services', hi: 'सामाजिक सुरक्षा पेंशन', mr: 'सामाजिक पेन्शन' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Aadhaar Card', hi: 'आधार कार्ड', mr: 'आधार कार्ड' }, purpose: { en: 'Identity proof', hi: 'पहचान सत्यापन', mr: 'ओळख पुरावा' }, mandatory: true },
    ],
    flagshipSchemes: [
      {
        id: 'dnhdd-tribal-aid',
        code: 'DNHDD-TWS',
        name: { en: 'DNHDD Tribal & Weaker Sections Welfare Scheme', hi: 'दादरा नगर हवेली एवं दमन दीव जनजातीय व कमजोर वर्ग सहायता', mr: 'दादरा नगर हवेली व दमण दीव आदिवासी कल्याण योजना' },
        benefit: 'Direct educational & livelihood grants up to ₹25,000',
        category: 'livelihood',
        targetGroup: { en: 'Tribal communities (ST) and low-income residents in DNHDD', hi: 'डीएनएचडीडी के अनुसूचित जनजाति एवं कमजोर वर्ग परिवार', mr: 'डीएनएचडीडीमधील अनुसूचित जमाती व वंचित कुटुंबे' },
        officialUrl: 'https://daman.nic.in',
        summary: { en: 'Welfare assistance for tribal empowerment, student scholarships, and rural housing grants.', hi: 'जनजातीय परिवारों के उत्थान हेतु वित्तीय सहायता एवं छात्रवृत्ति योजना।', mr: 'आदिवासी व गरजू कुटुंबांच्या विकासासाठी आर्थिक सहाय्य व शिष्यवृत्ती योजना.' },
      },
    ],
  },

  // 32. Delhi (NCT)
  {
    id: 'delhi',
    code: 'DL',
    name: 'Delhi',
    type: 'union_territory',
    capital: 'New Delhi',
    regionalLanguages: ['Hindi', 'English', 'Punjabi', 'Urdu'],
    localizedName: { en: 'Delhi (NCT)', hi: 'दिल्ली (राष्ट्रीय राजधानी क्षेत्र)', mr: 'दिल्ली (राष्ट्रीय राजधानी प्रदेश)' },
    portal: {
      name: 'e-District Delhi',
      url: 'https://edistrict.delhigovt.nic.in',
      department: 'Revenue Department, Government of NCT of Delhi',
      badge: 'NCT Single Window Portal',
      description: {
        en: 'Official portal delivering over 400 citizen services across certificates, Delhi Ladli scheme, Teerth Yatra, and senior citizen pensions.',
        hi: 'दिल्ली लाड़ली योजना, वरिष्ठ नागरिक पेंशन और 400 से अधिक नागरिक सेवाओं हेतु दिल्ली सरकार का आधिकारिक पोर्टल।',
        mr: 'दिल्ली लाडली योजना, ज्येष्ठ नागरिक पेन्शन आणि ४०० हून अधिक नागरी सेवांसाठी दिल्लीचे अधिकृत पोर्टल.',
      },
      keyServices: [
        { en: 'Financial Assistance to Senior Citizens (₹2,500/mo)', hi: 'वरिष्ठ नागरिक पेंशन ₹2,500/माह', mr: 'ज्येष्ठ नागरिक पेन्शन दरमहा ₹२,५००' },
        { en: 'Delhi Ladli Scheme Financial Aid', hi: 'दिल्ली लाड़ली योजना', mr: 'दिल्ली लाडली योजना' },
        { en: 'Mukhyamantri Teerth Yatra Yojana Application', hi: 'मुख्यमंत्री तीर्थ यात्रा योजना', mr: 'मुख्यमंत्री तीर्थयात्रा योजना' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Aadhaar Card', hi: 'आधार कार्ड', mr: 'आधार कार्ड' }, purpose: { en: 'Identity proof', hi: 'पहचान सत्यापन', mr: 'ओळख पडताळणी' }, mandatory: true },
      { name: { en: 'Delhi Voter ID / 3+ Years Proof of Residence', hi: 'दिल्ली मतदाता पहचान पत्र / निवास प्रमाण', mr: 'दिल्ली मतदार ओळखपत्र / ३ वर्षे रहिवासी पुरावा' }, purpose: { en: 'NCT residency mandate', hi: 'दिल्ली मूल निवास पात्रता', mr: 'दिल्ली रहिवासी पुरावा' }, mandatory: true },
    ],
    flagshipSchemes: [
      {
        id: 'dl-senior-pension',
        code: 'DL-OAP',
        name: { en: 'Delhi Senior Citizen Financial Assistance', hi: 'दिल्ली वरिष्ठ नागरिक पेंशन योजना', mr: 'दिल्ली ज्येष्ठ नागरिक पेन्शन योजना' },
        benefit: '₹2,000 - ₹2,500 / month direct pension to seniors',
        category: 'pension',
        targetGroup: { en: 'Senior citizens aged 60+ residing in Delhi for 5+ years with income < ₹1 Lakh', hi: 'दिल्ली के 60+ आयु वाले वरिष्ठ नागरिक (आय < 1 लाख)', mr: 'दिल्लीतील ६० वर्षे पूर्ण झालेले ज्येष्ठ नागरिक (उत्पन्न < ₹१ लाख)' },
        officialUrl: 'https://edistrict.delhigovt.nic.in',
        summary: { en: 'Monthly pension of ₹2,000 (aged 60-69) and ₹2,500 (aged 70+) credited directly into bank accounts.', hi: 'वरिष्ठ नागरिकों को ₹2,000 से ₹2,500 प्रतिमाह प्रत्यक्ष आर्थिक सहायता।', mr: 'ज्येष्ठ नागरिकांना दरमहा ₹२,००० ते ₹२,५०० थेट बँक खात्यात पेन्शन.' },
      },
    ],
  },

  // 33. Jammu and Kashmir (UT)
  {
    id: 'jammu-kashmir',
    code: 'JK',
    name: 'Jammu and Kashmir',
    type: 'union_territory',
    capital: 'Srinagar (Summer), Jammu (Winter)',
    regionalLanguages: ['Kashmiri', 'Dogri', 'Urdu', 'Hindi', 'English'],
    localizedName: { en: 'Jammu & Kashmir', hi: 'जम्मू और कश्मीर', mr: 'जम्मू आणि काश्मीर' },
    portal: {
      name: 'e-UNNAT Jammu & Kashmir',
      url: 'https://eunnat.jk.gov.in',
      department: 'Information Technology Department, Government of J&K',
      badge: 'Unified Digital Service Delivery',
      description: {
        en: 'Official single-window portal providing Domicile certificates, PM-JAY SEHAT Golden Cards, and Ladli Beti scheme.',
        hi: 'मूल निवास प्रमाण पत्र, पीएम-जय सेहत गोल्डन कार्ड और लाडली बेटी योजना हेतु जम्मू-कश्मीर का आधिकारिक पोर्टल।',
        mr: 'अधिवास दाखला, सेहत गोल्डन कार्ड आणि लाडली बेटी योजनेसाठी जम्मू-काश्मीरचे अधिकृत पोर्टल.',
      },
      keyServices: [
        { en: 'J&K Domicile Certificate', hi: 'जम्मू-कश्मीर मूल निवास प्रमाण पत्र', mr: 'जम्मू-काश्मीर अधिवास दाखला' },
        { en: 'Ayushman Bharat PM-JAY SEHAT Golden Card (Universal ₹5 Lakh)', hi: 'सेहत गोल्डन कार्ड ₹5 लाख कैशलेस इलाज', mr: 'सेहत गोल्डन कार्ड ₹५ लाख कॅशलेस उपचार' },
        { en: 'Ladli Beti Financial Security Scheme', hi: 'लाडली बेटी वित्तीय सुरक्षा योजना', mr: 'लाडली बेटी योजना' },
      ],
    },
    keyDocuments: [
      { name: { en: 'J&K Domicile Certificate', hi: 'अधिवास प्रमाण पत्र', mr: 'अधिवास दाखला' }, purpose: { en: 'State/UT right confirmation', hi: 'मूल निवास पात्रता', mr: 'स्थानिक रहिवासी पुरावा' }, mandatory: true },
      { name: { en: 'Aadhaar Card', hi: 'आधार कार्ड', mr: 'आधार कार्ड' }, purpose: { en: 'Biometric identity proof', hi: 'पहचान सत्यापन', mr: 'ओळख पडताळणी' }, mandatory: true },
    ],
    flagshipSchemes: [
      {
        id: 'jk-sehat',
        code: 'JK-SEHAT',
        name: { en: 'AB-PMJAY SEHAT Scheme', hi: 'आयुष्मान भारत सेहत योजना', mr: 'आयुष्मान भारत सेहत योजना' },
        benefit: 'Universal ₹5 Lakh cashless health cover per family per year',
        category: 'health',
        targetGroup: { en: 'All residents of Jammu and Kashmir without income ceiling', hi: 'जम्मू-कश्मीर के सभी निवासी परिवार', mr: 'जम्मू-काश्मीरमधील सर्व रहिवासी कुटुंबे' },
        officialUrl: 'https://sehat.jk.gov.in',
        summary: { en: 'Universal healthcare scheme providing ₹5 Lakh annual cashless treatment for all citizens of J&K.', hi: 'जम्मू-कश्मीर के सभी परिवारों के लिए ₹5 लाख का कैशलेस स्वास्थ्य कवर।', mr: 'जम्मू-काश्मीरमधील प्रत्येक कुटुंबासाठी ₹५ लाखांचे मोफत व कॅशलेस आरोग्य संरक्षण.' },
      },
    ],
  },

  // 34. Ladakh (UT)
  {
    id: 'ladakh',
    code: 'LA',
    name: 'Ladakh',
    type: 'union_territory',
    capital: 'Leh',
    regionalLanguages: ['Ladakhi', 'Hindi', 'English'],
    localizedName: { en: 'Ladakh', hi: 'लद्दाख', mr: 'लडाख' },
    portal: {
      name: 'Ladakh e-District Portal',
      url: 'https://edistrict.ladakh.gov.in',
      department: 'Information Technology Department, Administration of UT of Ladakh',
      badge: 'UT Citizen Services',
      description: {
        en: 'Official UT portal for Resident Certificates, Scheduled Tribe certificates, and local hill development council welfare.',
        hi: 'लद्दाख निवासी प्रमाण पत्र, जनजातीय प्रमाण पत्र और कल्याणकारी सेवाओं हेतु आधिकारिक पोर्टल।',
        mr: 'रहिवासी दाखले आणि आदिवासी कल्याण योजनांसाठी लडाखचे अधिकृत पोर्टल.',
      },
      keyServices: [
        { en: 'Resident Certificate of Ladakh', hi: 'लद्दाख निवासी प्रमाण पत्र', mr: 'लडाख रहिवासी प्रमाणपत्र' },
        { en: 'Social Welfare Pension Schemes', hi: 'सामाजिक कल्याण पेंशन', mr: 'सामाजिक पेन्शन' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Resident Certificate of Ladakh', hi: 'लद्दाख निवासी प्रमाण पत्र', mr: 'लडाख रहिवासी दाखला' }, purpose: { en: 'UT domicile qualification', hi: 'मूल निवास पात्रता', mr: 'अधिवास पुरावा' }, mandatory: true },
    ],
    flagshipSchemes: [
      {
        id: 'la-kunsnyoms',
        code: 'LA-KUNS',
        name: { en: 'LAHDC Kunsnyoms Scheme', hi: 'लद्दाख कुन्सन्योम्स योजना', mr: 'लडाख कुन्सन्योम्स योजना' },
        benefit: 'Assistive devices, student laptops & financial aid',
        category: 'education',
        targetGroup: { en: 'PwDs, students, and farming families of Leh and Kargil', hi: 'लद्दाख के दिव्यांगजन, छात्र एवं कृषक परिवार', mr: 'लडाखमधील दिव्यांग, विद्यार्थी आणि शेतकरी' },
        officialUrl: 'https://edistrict.ladakh.gov.in',
        summary: { en: 'Autonomous Hill Development Council welfare providing educational aids and assistive tech to disadvantaged residents.', hi: 'पहाड़ी विकास परिषद द्वारा जरूरतमंद छात्रों एवं दिव्यांगजनों को सहायता योजना।', mr: 'गरजू विद्यार्थी व दिव्यांगांना शैक्षणिक व तांत्रिक सहाय्य देणारी योजना.' },
      },
    ],
  },

  // 35. Lakshadweep (UT)
  {
    id: 'lakshadweep',
    code: 'LD',
    name: 'Lakshadweep',
    type: 'union_territory',
    capital: 'Kavaratti',
    regionalLanguages: ['Malayalam', 'English'],
    localizedName: { en: 'Lakshadweep', hi: 'लक्षद्वीप', mr: 'लक्षद्वीप' },
    portal: {
      name: 'Lakshadweep Official Services',
      url: 'https://lakshadweep.gov.in',
      department: 'UT Administration of Lakshadweep',
      badge: 'UT Administration Portal',
      description: {
        en: 'Official portal for islander permits, coconut farmers subsidies, and social pensions.',
        hi: 'स्थानीय निवासी प्रमाण पत्र, नारियल किसान सब्सिडी और सामाजिक सुरक्षा हेतु आधिकारिक पोर्टल।',
        mr: 'स्थानिक दाखले आणि शेतकरी मदतीसाठी लक्षद्वीपचे अधिकृत पोर्टल.',
      },
      keyServices: [
        { en: 'Islander Certificate & Entry Permits', hi: 'आईलैंडर प्रमाण पत्र व प्रवेश परमिट', mr: 'स्थानिक रहिवासी व प्रवेश परवाना' },
        { en: 'Fishermen and Coconut Farmer Welfare Grants', hi: 'मछुआरा व किसान कल्याण सहायता', mr: 'मच्छीमार व शेतकरी सहाय्य' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Islander Identity Card', hi: 'आईलैंडर कार्ड', mr: 'स्थानिक ओळखपत्र' }, purpose: { en: 'Island residency proof', hi: 'द्वीप निवासी पहचान', mr: 'रहिवासी पुरावा' }, mandatory: true },
    ],
    flagshipSchemes: [
      {
        id: 'ld-fishermen-grant',
        code: 'LD-FWG',
        name: { en: 'Lakshadweep Fishermen Welfare Subsidy', hi: 'लक्षद्वीप मछुआरा कल्याण सब्सिडी योजना', mr: 'लक्षद्वीप मच्छीमार कल्याण अनुदान योजना' },
        benefit: 'Up to 50% subsidy on fishing gear & safety kits',
        category: 'livelihood',
        targetGroup: { en: 'Registered traditional island fishermen in Lakshadweep', hi: 'लक्षद्वीप के पारंपरिक पंजीकृत मछुआरे', mr: 'लक्षद्वीपमधील नोंदणीकृत स्थानिक मच्छीमार' },
        officialUrl: 'https://lakshadweep.gov.in',
        summary: { en: 'Financial subsidy on outboard motors, fishing nets, and safety communication equipment for islanders.', hi: 'द्वीप के मछुआरों को नाव की मोटर, जाल और सुरक्षा किट पर अनुदान।', mr: 'स्थानिक मच्छीमारांना उपकरणे व सुरक्षेसाठी थेट अनुदान योजना.' },
      },
    ],
  },

  // 36. Puducherry (UT)
  {
    id: 'puducherry',
    code: 'PY',
    name: 'Puducherry',
    type: 'union_territory',
    capital: 'Puducherry',
    regionalLanguages: ['Tamil', 'French', 'Telugu', 'Malayalam', 'English'],
    localizedName: { en: 'Puducherry', hi: 'पुडुचेरी', mr: 'पुद्दुचेरी', ta: 'புதுச்சேரி' },
    portal: {
      name: 'e-District Puducherry',
      url: 'https://edistrict.py.gov.in',
      department: 'Department of Revenue & Disaster Management, Govt of Puducherry',
      badge: 'UT Single Window Services',
      description: {
        en: 'Official portal for nationality/residence certificates, welfare pensions, and women financial support.',
        hi: 'निवास प्रमाण पत्र, सामाजिक पेंशन और महिला कल्याणकारी योजनाओं हेतु पुडुचेरी का आधिकारिक पोर्टल।',
        mr: 'अधिवास दाखले आणि सामाजिक सुरक्षा योजनांसाठी पुद्दुचेरीचे अधिकृत पोर्टल.',
      },
      keyServices: [
        { en: 'Nationality / Residence / Caste Certificates', hi: 'निवास एवं जाति प्रमाण पत्र', mr: 'अधिवास व जात दाखला' },
        { en: 'Old Age, Widow and Destitute Pension', hi: 'पेंशन योजनाएं', mr: 'पेन्शन योजना' },
      ],
    },
    keyDocuments: [
      { name: { en: 'Aadhaar Card', hi: 'आधार कार्ड', mr: 'आधार कार्ड' }, purpose: { en: 'Identity proof', hi: 'पहचान सत्यापन', mr: 'ओळख पडताळणी' }, mandatory: true },
      { name: { en: 'Residence Certificate (5+ Years)', hi: 'निवास प्रमाण पत्र', mr: 'रहिवासी दाखला' }, purpose: { en: 'UT domicile qualification', hi: 'मूल निवास पात्रता', mr: 'अधिवास पुरावा' }, mandatory: true },
    ],
    flagshipSchemes: [
      {
        id: 'py-magalir-urimai',
        code: 'PY-MFW',
        name: { en: 'Puducherry Financial Assistance to Women (Magalir)', hi: 'पुडुचेरी महिला आर्थिक सहायता योजना', mr: 'पुद्दुचेरी महिला आर्थिक सहाय्य योजना' },
        benefit: '₹1,000 / month direct assistance to women heads of family',
        category: 'women_child',
        targetGroup: { en: 'Women heads of BPL families in Puducherry aged 21-55', hi: 'पुडुचेरी की बीपीएल परिवार की महिला मुखिया', mr: 'पुद्दुचेरीतील दारिद्र्यरेषेखालील महिला कुटुंबप्रमुख' },
        officialUrl: 'https://edistrict.py.gov.in',
        summary: { en: 'Direct monthly cash assistance of ₹1,000 credited to female heads of disadvantaged households.', hi: 'गरीब परिवारों की महिला मुखिया को ₹1,000 प्रतिमाह प्रत्यक्ष आर्थिक सहायता।', mr: 'गरजू कुटुंबांतील महिला प्रमुखांना दरमहा ₹१,००० ची थेट आर्थिक मदत.' },
      },
    ],
  },
];

/**
 * Helper to get state by canonical name or ID
 */
export function getStateData(stateNameOrId: string): StateData | undefined {
  const query = stateNameOrId.trim().toLowerCase();
  return STATES_AND_UTS_DATA.find(
    (s) =>
      s.name.toLowerCase() === query ||
      s.id.toLowerCase() === query ||
      s.code.toLowerCase() === query ||
      s.localizedName.hi?.toLowerCase() === query ||
      s.localizedName.mr?.toLowerCase() === query
  );
}
