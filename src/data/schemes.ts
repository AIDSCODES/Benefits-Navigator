/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Scheme } from '../lib/engine/types.ts';
import { SchemeRegistrySchema } from '../lib/engine/schema.ts';

export const SCHEMES: Scheme[] = [
  {
    id: 'pm-kisan',
    code: 'PM-KISAN',
    name: {
      en: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
      hi: 'प्रधानमंत्री किसान सम्मान निधि (पीएम-किसान)',
      mr: 'प्रधानमंत्री किसान सन्मान निधी (पीएम-किसान)',
    },
    short_summary: {
      en: 'Direct income support of ₹6,000 per year in 3 equal installments for farmer families.',
      hi: 'भूमिधारक किसान परिवारों को ₹6,000 प्रति वर्ष तीन किस्तों में प्रत्यक्ष आय सहायता।',
      mr: 'जमीनधारक शेतकरी कुटुंबांना दरवर्षी ₹६,००० तीन हप्त्यांमध्ये थेट बँक खात्यात.',
    },
    description: {
      en: 'A central sector scheme providing income support of ₹6,000 per year to all landholding farmer families across India having cultivable land in their names, subject to certain exclusion criteria (institutional landholders, high-income taxpayers).',
      hi: 'सभी भूमिधारक किसान परिवारों को वित्तीय सहायता प्रदान करने वाली केंद्रीय योजना।',
      mr: 'सर्व पात्र शेतकरी कुटुंबांना आर्थिक मदत देणारी केंद्र सरकारची कल्याणकारी योजना.',
    },
    level: 'central',
    state: null,
    category: 'agriculture',
    official_url: 'https://pmkisan.gov.in',
    application_mode: 'both',
    source_citation: 'Ministry of Agriculture & Farmers Welfare, Operational Guidelines 2019 (pmkisan.gov.in)',
    last_verified: '2026-09-15',
    version: '2026.1',
    is_verified_fact: true,
    benefit_type: {
      en: '₹6,000 / year DBT transfer',
      hi: '₹6,000 / वर्ष डीबीटी अंतरण',
      mr: '₹६,००० / वर्ष डीबीटी हस्तांतरण',
    },
    criteria: [
      {
        id: 'pmk_occ',
        field: 'occupation',
        operator: 'eq',
        value: 'farmer',
        required: true,
        verified: true,
        explanation: {
          en: 'Applicant or household must be engaged in farming / agriculture',
          hi: 'आवेदक या परिवार कृषि/खेती कार्य से जुड़ा होना चाहिए',
          mr: 'अर्जदार किंवा कुटुंब शेती व्यवसायात गुंतलेले असणे आवश्यक आहे',
        },
      },
      {
        id: 'pmk_land',
        field: 'landHolding',
        operator: 'in',
        value: ['marginal', 'small', 'medium', 'large'],
        required: true,
        verified: true,
        explanation: {
          en: 'Family must hold cultivable agricultural land registered in land records',
          hi: 'परिवार के पास भूमि रिकॉर्ड में दर्ज खेती योग्य जमीन होनी चाहिए',
          mr: 'कुटुंबाच्या नावावर सातबारा/जमीन महसूल नोंदीमध्ये शेतजमीन असावी',
        },
      },
      {
        id: 'pmk_inc',
        field: 'incomeBand',
        operator: 'not_in',
        value: ['above_5lakh'],
        required: false,
        verified: true,
        explanation: {
          en: 'Higher income taxpayers and institutional landholders are excluded',
          hi: 'उच्च आय करदाता और संस्थागत भूमिधारक इस योजना से बाहर हैं',
          mr: 'उच्च उत्पन्न करदाते आणि संस्थात्मक जमीनधारक वगळलेले आहेत',
        },
      },
    ],
    documents: [
      {
        id: 'doc_land_record',
        name: {
          en: 'Land Ownership Document (7/12 extract / Khatauni / Jamabandi)',
          hi: 'भूमि स्वामित्व दस्तावेज (खतौनी / जमाबंदी)',
          mr: 'जमीन मालकी पुरावा (७/१२ उतारा / खातेवाटप)',
        },
        description: {
          en: 'Record of rights showing landholding in applicant’s or ancestor’s name',
          hi: 'आवेदक के नाम पर जमीन की खतौनी या राजस्व नकल',
          mr: 'अर्जदाराच्या नावावरील अद्ययावत ७/१२ व ८-अ उतारा',
        },
        mandatory: true,
      },
      {
        id: 'doc_aadhaar',
        name: {
          en: 'Aadhaar Card',
          hi: 'आधार कार्ड',
          mr: 'आधार कार्ड',
        },
        description: {
          en: 'For biometric / OTP authentication at portal or CSC Kendra',
          hi: 'पहचान और बायोमेट्रिक सत्यापन के लिए',
          mr: 'ओळख पडताळणी आणि ई-केवायसी साठी',
        },
        mandatory: true,
      },
      {
        id: 'doc_bank_passbook',
        name: {
          en: 'Bank Account Passbook / Cancelled Cheque',
          hi: 'बैंक पासबुक / रद्द चेक',
          mr: 'बँक पासबुक / रद्द केलेला धनादेश',
        },
        description: {
          en: 'Account linked with Aadhaar for Direct Benefit Transfer (DBT)',
          hi: 'डीबीटी सक्षम आधार लिंक्ड सक्रिय बैंक खाता',
          mr: 'डीबीटी सुरू असलेले आधारशी जोडलेले बँक खाते',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Check Land Records & Name Spelling',
          hi: 'जमीन रिकॉर्ड और नाम की जांच करें',
          mr: 'जमीन नोंद आणि नावाचे स्पेलिंग तपासा',
        },
        instruction: {
          en: 'Ensure your name on Aadhaar matches your state revenue land record (7/12 or Jamabandi).',
          hi: 'सुनिश्चित करें कि आधार पर आपका नाम राज्य भू-राजस्व रिकॉर्ड से मेल खाता है।',
          mr: 'तुमच्या आधारवरील नाव आणि महसूल नोंदीतील (७/१२) नाव जुळत असल्याची खात्री करा.',
        },
        location_type: 'tehsil_office',
      },
      {
        step_number: 2,
        title: {
          en: 'Self-Register or Visit CSC Center',
          hi: 'पोर्टल पर स्वयं पंजीकरण करें या सीएससी केंद्र जाएं',
          mr: 'ऑनलाइन स्वतः नोंदणी करा किंवा सीएससी केंद्रात जा',
        },
        instruction: {
          en: 'Go to pmkisan.gov.in > "Farmers Corner" > "New Farmer Registration" or visit your nearest Common Service Center (CSC).',
          hi: 'pmkisan.gov.in पर "नया किसान पंजीकरण" पर क्लिक करें अथवा नजदीकी सीएससी केंद्र जाएं।',
          mr: 'pmkisan.gov.in वरील "New Farmer Registration" वर क्लिक करा किंवा जवळच्या महा-ई-सेवा / सीएससी केंद्रात जा.',
        },
        location_type: 'csc_kendra',
      },
      {
        step_number: 3,
        title: {
          en: 'Complete e-KYC & Seed Bank Account with NPCI',
          hi: 'ई-केवाईसी पूरी करें और बैंक खाते को एनपीसीआई से लिंक करें',
          mr: 'ई-केवायसी पूर्ण करा आणि बँक खात्याला एनपीसीआय मॅपिंग करा',
        },
        instruction: {
          en: 'Install PM-KISAN App for facial e-KYC or do OTP verification, and ensure Aadhaar-NPCI mapping at your bank branch.',
          hi: 'मोबाइल ऐप से फेस ई-केवाईसी या बैंक जाकर एनपीसीआई आधार सीडिंग कराएं।',
          mr: 'मोबाईल ॲपद्वारे किंवा सीएससी केंद्रावर ई-केवायसी करा आणि बँक खात्याशी आधार मॅपिंग तपासा.',
        },
        location_type: 'bank_branch',
      },
    ],
  },

  {
    id: 'pm-jay',
    code: 'PM-JAY',
    name: {
      en: 'Ayushman Bharat PM-JAY',
      hi: 'आयुष्मान भारत प्रधानमंत्री जन आरोग्य योजना',
      mr: 'आयुष्मान भारत प्रधानमंत्री जन आरोग्य योजना (पीएम-जय)',
    },
    short_summary: {
      en: 'Cashless health insurance cover up to ₹5,00,000 per family per year for secondary & tertiary hospitalisation.',
      hi: 'पात्र परिवारों के लिए माध्यमिक और तृतीयक अस्पताल में भर्ती के लिए ₹5,00,000 का निःशुल्क स्वास्थ्य बीमा।',
      mr: 'रुग्णालयात उपचारांसाठी प्रति कुटुंब दरवर्षी ₹५,००,००० पर्यंत मोफत कॅशलेस आरोग्य संरक्षण.',
    },
    description: {
      en: 'World’s largest government-funded healthcare assurance scheme, covering pre-existing conditions, hospitalization, day care surgeries, and follow-up medications at empanelled public and private hospitals.',
      hi: 'द्वितीयक और तृतीयक स्तर पर अस्पताल में भर्ती के खर्च के लिए प्रति परिवार ₹5 लाख तक का कैशलैस कवर।',
      mr: 'सूचीबद्ध खाजगी व सरकारी रुग्णालयांमध्ये ५ लाखांपर्यंत मोफत व कॅशलेस उपचार.',
    },
    level: 'central',
    state: null,
    category: 'health',
    official_url: 'https://nha.gov.in',
    application_mode: 'both',
    source_citation: 'National Health Authority (NHA), Beneficiary Identification System Guidelines (beneficiary.nha.gov.in)',
    last_verified: '2026-10-01',
    version: '2026.2',
    is_verified_fact: true,
    benefit_type: {
      en: '₹5,00,000 / year Cashless Hospitalization',
      hi: '₹5,00,000 / वर्ष कैशलैस अस्पताल उपचार',
      mr: '₹५,००,००० / वर्ष कॅशलेस वैद्यकीय उपचार',
    },
    criteria: [
      {
        id: 'pmjay_income',
        field: 'incomeBand',
        operator: 'in',
        value: ['below_1lakh', '1lakh_2_5lakh'],
        required: true,
        verified: true,
        explanation: {
          en: 'Targeted to bottom 40% income households identified in SECC / NFSA databases',
          hi: 'एसईसीसी या राष्ट्रीय खाद्य सुरक्षा अधिनियम (एनएफएसए) के तहत चिह्नित आर्थिक रूप से कमजोर परिवार',
          mr: 'सामाजिक-आर्थिक जात गणना (SECC) किंवा रेशनकार्ड यादीतील पात्र वंचित कुटुंबे',
        },
      },
      {
        id: 'pmjay_ration',
        field: 'rationCardStatus',
        operator: 'in',
        value: ['antyodaya_bpl', 'priority'],
        required: false,
        verified: true,
        explanation: {
          en: 'Families holding Antyodaya (AAY) or Priority Household (PHH) ration cards are prioritized',
          hi: 'अंत्योदय या प्राथमिकता राशन कार्ड धारकों को प्राथमिकता दी जाती है',
          mr: 'अंत्योदय किंवा प्राधान्य कुटुंब शिधापत्रिका धारकांना थेट प्राधान्य',
        },
      },
    ],
    documents: [
      {
        id: 'doc_aadhaar',
        name: {
          en: 'Aadhaar Card',
          hi: 'आधार कार्ड',
          mr: 'आधार कार्ड',
        },
        mandatory: true,
      },
      {
        id: 'doc_ration_card',
        name: {
          en: 'Ration Card / NFSA Family ID',
          hi: 'राशन कार्ड / परिवार समग्र आईडी',
          mr: 'शिधापत्रिका (रेशन कार्ड)',
        },
        description: {
          en: 'Valid ration card showing applicant and family members names',
          hi: 'परिवार के सभी सदस्यों के नाम वाला वैध राशन कार्ड',
          mr: 'कुटुंबातील सदस्यांची नावे असलेले वैध रेशन कार्ड',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Verify Family Inclusion on Beneficiary Portal',
          hi: 'पोर्टल पर परिवार की पात्रता जांचें',
          mr: 'लाभार्थी पोर्टलवर नाव तपासा',
        },
        instruction: {
          en: 'Visit beneficiary.nha.gov.in and login using your mobile number with OTP. Search by Ration Card number or Aadhaar.',
          hi: 'beneficiary.nha.gov.in पर मोबाइल नंबर से लॉगिन करें और राशन कार्ड नंबर से खोजें।',
          mr: 'beneficiary.nha.gov.in वर मोबाईल नंबर टाकून रेशन कार्ड किंवा आधार नंबरने नाव शोधा.',
        },
        location_type: 'online',
      },
      {
        step_number: 2,
        title: {
          en: 'Submit e-KYC',
          hi: 'ई-केवाईसी पूर्ण करें',
          mr: 'ई-केवायसी करा',
        },
        instruction: {
          en: 'Capture your face or submit Aadhaar OTP to verify your identity on the portal or via Ayushman App.',
          hi: 'आयुष्मान ऐप में फेस ऑथेंटिकेशन या आधार ओटीपी द्वारा केवाईसी पूरा करें।',
          mr: 'आयुष्मान ॲपद्वारे किंवा सीएससी केंद्रावर फेस ऑथेंटिकेशन किंवा ओटीपीने केवायसी करा.',
        },
        location_type: 'online',
      },
      {
        step_number: 3,
        title: {
          en: 'Download Ayushman Card (Golden Card)',
          hi: 'आयुष्मान कार्ड डाउनलोड करें',
          mr: 'आयुष्मान गोल्डन कार्ड डाउनलोड करा',
        },
        instruction: {
          en: 'Once approved, download the PVC/digital Ayushman card to show during admission at any empanelled hospital.',
          hi: 'अनुमोदन के बाद कार्ड डाउनलोड करें और अस्पताल में भर्ती के समय दिखाएं।',
          mr: 'मंजुरीनंतर कार्ड डाउनलोड करा आणि रुग्णालयात भरती होताना मोफत उपचारांसाठी सादर करा.',
        },
        location_type: 'online',
      },
    ],
  },

  {
    id: 'pmjdy',
    code: 'PMJDY',
    name: {
      en: 'Pradhan Mantri Jan Dhan Yojana',
      hi: 'प्रधानमंत्री जन धन योजना',
      mr: 'प्रधानमंत्री जन धन योजना',
    },
    short_summary: {
      en: 'Zero-balance savings bank account with free RuPay debit card and built-in accidental insurance.',
      hi: 'शून्य शेष बचत खाता, मुफ्त रुपे डेबिट कार्ड और दुर्घटना बीमा कवर।',
      mr: 'झिरो-बॅलन्स बँक बचत खाते, मोफत रुपे डेबिट कार्ड आणि अंगभूत अपघात विमा संरक्षण.',
    },
    description: {
      en: 'National mission for financial inclusion ensuring access to financial services, namely basic savings bank accounts, need-based credit, remittances, insurance, and pension.',
      hi: 'बैंकिंग सुविधाओं से वंचित प्रत्येक वयस्क के लिए बुनियादी बचत बैंक खाता योजना।',
      mr: 'प्रत्येक प्रौढ व्यक्तीसाठी विनाशुल्क झिरो-बॅलन्स बँक खाते उघडण्याची राष्ट्रीय योजना.',
    },
    level: 'central',
    state: null,
    category: 'banking',
    official_url: 'https://pmjdy.gov.in',
    application_mode: 'offline',
    source_citation: 'Department of Financial Services, Ministry of Finance (pmjdy.gov.in/scheme)',
    last_verified: '2026-08-20',
    version: '2026.1',
    is_verified_fact: true,
    benefit_type: {
      en: 'Zero Minimum Balance + RuPay Card + ₹2 Lakh Accident Cover',
      hi: 'शून्य न्यूनतम शेष + रुपे कार्ड + ₹2 लाख दुर्घटना कवर',
      mr: 'झिरो बॅलन्स खाते + रुपे कार्ड + ₹२ लाख अपघात विमा',
    },
    criteria: [
      {
        id: 'pmjdy_age',
        field: 'ageBand',
        operator: 'in',
        value: ['18_35', '36_50', '51_59', '60_plus'],
        required: true,
        verified: true,
        explanation: {
          en: 'Applicant must be an Indian citizen aged 10 years or above (independent adult account at 18+)',
          hi: 'आवेदक की आयु 10 वर्ष या उससे अधिक होनी चाहिए (18+ पर स्वतंत्र वयस्क खाता)',
          mr: 'अर्जदाराचे वय १० वर्षे किंवा त्याहून अधिक असणे आवश्यक (१८+ वर स्वतंत्र खाते)',
        },
      },
      {
        id: 'pmjdy_acc',
        field: 'hasBankAcc',
        operator: 'neq',
        value: 'yes',
        required: false,
        verified: true,
        explanation: {
          en: 'Intended for individuals who do not already have an active bank account',
          hi: 'यह उन लोगों के लिए विशेष है जिनका पहले से कोई बैंक खाता नहीं है',
          mr: 'ज्यांचे आधी कोणतेही बँक खाते नाही अशा व्यक्तींसाठी प्राधान्य',
        },
      },
    ],
    documents: [
      {
        id: 'doc_aadhaar',
        name: {
          en: 'Aadhaar Card (or Voter ID / NREGA Job Card)',
          hi: 'आधार कार्ड (या वोटर आईडी / नरेगा जॉब कार्ड)',
          mr: 'आधार कार्ड (किंवा मतदार ओळखपत्र / नरेगा जॉब कार्ड)',
        },
        mandatory: true,
      },
      {
        id: 'doc_photo',
        name: {
          en: 'Passport Size Photograph (2 copies)',
          hi: 'पासपोर्ट आकार की 2 फोटो',
          mr: 'पासपोर्ट आकाराचे २ फोटो',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Visit Any Bank Branch or Bank Mitra (CSP)',
          hi: 'नजदीकी बैंक शाखा या बैंक मित्र केंद्र जाएं',
          mr: 'जवळच्या बँक शाखेत किंवा बँक मित्र केंद्रात जा',
        },
        instruction: {
          en: 'Walk into any public sector bank, regional rural bank, or Customer Service Point (Bank Mitra). Ask for the PMJDY account opening form.',
          hi: 'किसी भी सरकारी बैंक शाखा या ग्राहक सेवा केंद्र पर जाकर जन धन खाता खोलने का फॉर्म मांगें।',
          mr: 'कोणत्याही राष्ट्रीयीकृत बँकेत किंवा ग्राहक सेवा केंद्रात जाऊन जन धन खाते उघडण्याचा फॉर्म घ्या.',
        },
        location_type: 'bank_branch',
      },
      {
        step_number: 2,
        title: {
          en: 'Submit KYC Documents with Biometric Authentication',
          hi: 'केवाईसी दस्तावेज और बायोमेट्रिक सत्यापन जमा करें',
          mr: 'केवायसी कागदपत्रे आणि अंगठ्याचा ठसा द्या',
        },
        instruction: {
          en: 'Provide Aadhaar number and perform e-KYC (fingerprint scan). No initial deposit is required.',
          hi: 'आधार कार्ड दें और बायोमेट्रिक सत्यापन कराएं। किसी भी प्रारंभिक जमा राशि की आवश्यकता नहीं है।',
          mr: 'आधार कार्ड द्या आणि फिंगरप्रिंटद्वारे ई-केवायसी करा. सुरुवातीला एकही रुपया भरण्याची गरज नाही.',
        },
        location_type: 'bank_branch',
      },
      {
        step_number: 3,
        title: {
          en: 'Collect Passbook and RuPay Debit Card',
          hi: 'पासबुक और रुपे कार्ड प्राप्त करें',
          mr: 'पासबुक आणि रुपे कार्ड मिळवा',
        },
        instruction: {
          en: 'Receive your account passbook and RuPay card. Use the card at least once every 90 days to keep the built-in accident insurance active.',
          hi: 'पासबुक और कार्ड प्राप्त करें। दुर्घटना बीमा चालू रखने हेतु 90 दिनों में कम से कम एक बार लेनदेन अवश्य करें।',
          mr: 'पासबुक आणि रुपे कार्ड घ्या. विमा चालू राहण्यासाठी दर ९० दिवसांत किमान एकदा कार्ड वापरा.',
        },
        location_type: 'bank_branch',
      },
    ],
  },

  {
    id: 'pm-ujjwala',
    code: 'PMUY',
    name: {
      en: 'Pradhan Mantri Ujjwala Yojana 2.0',
      hi: 'प्रधानमंत्री उज्ज्वला योजना 2.0',
      mr: 'प्रधानमंत्री उज्ज्वला योजना २.०',
    },
    short_summary: {
      en: 'Deposit-free LPG connection, first refill, and stove for adult women in low-income households.',
      hi: 'कम आय वाले परिवारों की वयस्क महिलाओं के लिए निःशुल्क एलपीजी गैस कनेक्शन और पहला भरा हुआ सिलेंडर।',
      mr: 'कमी उत्पन्न कुटुंबातील प्रौढ महिलांसाठी मोफत गॅस कनेक्शन, शेगडी आणि पहिला सिलिंडर.',
    },
    description: {
      en: 'Provides clean cooking fuel (LPG) to women from economically disadvantaged households with no security deposit, free first refill, and free hotplate (stove).',
      hi: 'गरीब परिवारों की महिलाओं को स्वच्छ रसोई ईंधन उपलब्ध कराने हेतु निःशुल्क गैस कनेक्शन।',
      mr: 'गरीब घरांतील महिलांच्या नावावर मोफत एलपीजी सिलिंडर व शेगडी देण्याची केंद्र सरकारची योजना.',
    },
    level: 'central',
    state: null,
    category: 'livelihood',
    official_url: 'https://pmuy.gov.in',
    application_mode: 'both',
    source_citation: 'Ministry of Petroleum and Natural Gas, Ujjwala 2.0 Operational Guidelines (pmuy.gov.in)',
    last_verified: '2026-09-01',
    version: '2026.2',
    is_verified_fact: true,
    benefit_type: {
      en: 'Deposit-free LPG connection + Free 1st Refill + Stove',
      hi: 'निःशुल्क गैस कनेक्शन + पहला भरा सिलेंडर + चूल्हा',
      mr: 'मोफत गॅस कनेक्शन + पहिला भरलेला सिलिंडर + मोफत शेगडी',
    },
    criteria: [
      {
        id: 'pmuy_gender',
        field: 'gender',
        operator: 'eq',
        value: 'female',
        required: true,
        verified: true,
        explanation: {
          en: 'LPG connection must be released in the name of an adult woman of the household (18+)',
          hi: 'कनेक्शन परिवार की वयस्क महिला (18 वर्ष या अधिक) के नाम पर ही जारी किया जाता है',
          mr: 'गॅस जोडणी घरातील प्रौढ महिलेच्या (१८ वर्षांवरील) नावावरच दिली जाते',
        },
      },
      {
        id: 'pmuy_age',
        field: 'ageBand',
        operator: 'in',
        value: ['18_35', '36_50', '51_59', '60_plus'],
        required: true,
        verified: true,
        explanation: {
          en: 'Applicant woman must be 18 years of age or older',
          hi: 'आवेदक महिला की आयु 18 वर्ष या उससे अधिक होनी चाहिए',
          mr: 'अर्जदार महिलेचे वय किमान १८ वर्षे पूर्ण असावे',
        },
      },
      {
        id: 'pmuy_income',
        field: 'incomeBand',
        operator: 'in',
        value: ['below_1lakh', '1lakh_2_5lakh'],
        required: true,
        verified: true,
        explanation: {
          en: 'Targeted to low-income / BPL / SC-ST / PM-Awas / Antyodaya households',
          hi: 'कम आय / गरीबी रेखा के नीचे के परिवारों के लिए लक्षित',
          mr: 'अल्प उत्पन्न किंवा दारिद्र्यरेषेखालील कुटुंबांसाठी राखीव',
        },
      },
      {
        id: 'pmuy_existing_lpg',
        field: 'hasLPG',
        operator: 'neq',
        value: 'yes',
        required: true,
        verified: true,
        explanation: {
          en: 'There should be no existing LPG connection in the same household',
          hi: 'आवेदक के घर में पहले से कोई एलपीजी गैस कनेक्शन नहीं होना चाहिए',
          mr: 'कुटुंबात आधीपासून कोणताही इतर एलपीजी गॅस जोडणी नसणे बंधनकारक',
        },
      },
    ],
    documents: [
      {
        id: 'doc_aadhaar',
        name: {
          en: 'Aadhaar Card of Applicant Woman',
          hi: 'आवेदक महिला का आधार कार्ड',
          mr: 'अर्जदार महिलेचे आधार कार्ड',
        },
        mandatory: true,
      },
      {
        id: 'doc_ration_card',
        name: {
          en: 'Ration Card / Family Composition Document',
          hi: 'राशन कार्ड या परिवार संरचना प्रमाण',
          mr: 'रेशन कार्ड किंवा कुटुंबाचा दाखला',
        },
        description: {
          en: 'To prove family composition and verify no other connection exists',
          hi: 'परिवार के सदस्यों की सूची प्रमाणित करने के लिए',
          mr: 'कुटुंबातील सर्व सदस्यांची खातरजमा करण्यासाठी',
        },
        mandatory: true,
      },
      {
        id: 'doc_bank_passbook',
        name: {
          en: 'Bank Account Passbook (Aadhaar Linked)',
          hi: 'बैंक पासबुक (आधार लिंक)',
          mr: 'बँक पासबुक (आधार जोडलेले)',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Collect Application Form (Annexure 1 & 14-Point Declaration)',
          hi: 'आवेदन पत्र और 14-सूत्रीय घोषणा पत्र प्राप्त करें',
          mr: 'अर्जाचा नमुना व १४ कलमी हमीपत्र घ्या',
        },
        instruction: {
          en: 'Download from pmuy.gov.in or collect free of cost from nearest Indane / Bharat Gas / HP Gas distributor.',
          hi: 'pmuy.gov.in से डाउनलोड करें या नजदीकी एलपीजी गैस एजेंसी से निःशुल्क प्राप्त करें।',
          mr: 'pmuy.gov.in वरून डाउनलोड करा किंवा जवळच्या गॅस एजन्सीकडून मोफत मिळवा.',
        },
        location_type: 'online',
      },
      {
        step_number: 2,
        title: {
          en: 'Submit Documents to Nearest LPG Distributor',
          hi: 'दस्तावेज नजदीकी गैस वितरक के पास जमा करें',
          mr: 'कागदपत्रे जवळच्या गॅस वितरकाकडे सादर करा',
        },
        instruction: {
          en: 'Submit completed form with Aadhaar copies of all adult family members and bank details.',
          hi: 'परिवार के सभी वयस्क सदस्यों के आधार की प्रतिलिपि के साथ फॉर्म वितरक को दें।',
          mr: 'कुटुंबातील सर्व प्रौढ सदस्यांच्या आधार प्रतींसह अर्ज वितरकाकडे जमा करा.',
        },
        location_type: 'csc_kendra',
      },
      {
        step_number: 3,
        title: {
          en: 'Receive LPG Cylinder, Regulator, and Stove',
          hi: 'सिलेंडर, रेगुलेटर और गैस चूल्हा प्राप्त करें',
          mr: 'गॅस सिलिंडर, रेग्युलेटर आणि शेगडी मिळवा',
        },
        instruction: {
          en: 'Once de-duplication clears, the agency installs the connection without asking for any upfront security deposit.',
          hi: 'सत्यापन के बाद गैस एजेंसी बिना किसी अग्रिम जमानत के कनेक्शन प्रदान करती है।',
          mr: 'पडताळणीनंतर एजन्सी कोणतीही अनामत रक्कम न घेता नवीन जोडणी देते.',
        },
        location_type: 'csc_kendra',
      },
    ],
  },

  {
    id: 'pmay-g',
    code: 'PMAY-G',
    name: {
      en: 'Pradhan Mantri Awas Yojana - Gramin',
      hi: 'प्रधानमंत्री आवास योजना - ग्रामीण',
      mr: 'प्रधानमंत्री आवास योजना - ग्रामीण',
    },
    short_summary: {
      en: 'Financial assistance of ₹1,20,000 to ₹1,30,000 for construction of a permanent pucca house with toilet.',
      hi: 'बेघर और कच्चे घरों में रहने वाले ग्रामीण परिवारों को पक्के मकान निर्माण हेतु ₹1.20 लाख से ₹1.30 लाख की सहायता।',
      mr: 'ग्रामीण भागातील कच्च्या घरात राहणाऱ्या कुटुंबांना पक्के घर बांधण्यासाठी ₹१.२० ते ₹१.३० लाखांचे अनुदान.',
    },
    description: {
      en: 'Flagship rural housing scheme aiming to provide a pucca house with basic amenities to all houseless households and those living in kutcha and dilapidated houses.',
      hi: 'ग्रामीण भारत में बेघर और कच्चे मकान में रहने वाले वंचित परिवारों को पक्का घर उपलब्ध कराने की योजना।',
      mr: 'ग्रामीण भागात राहणाऱ्या वंचित कुटुंबांना पक्के घर बांधून देण्याची केंद्र सरकारची महत्त्वाकांक्षी योजना.',
    },
    level: 'central',
    state: null,
    category: 'housing',
    official_url: 'https://pmayg.nic.in',
    application_mode: 'both',
    source_citation: 'Ministry of Rural Development, PMAY-G Framework for Implementation (pmayg.nic.in)',
    last_verified: '2026-09-20',
    version: '2026.1',
    is_verified_fact: true,
    benefit_type: {
      en: '₹1.20 Lakh (Plains) / ₹1.30 Lakh (Hilly/NE) Grant + 90 days MGNREGA wages',
      hi: '₹1.20 लाख सहायता + 90 दिन मनरेगा मजदूरी',
      mr: '₹१.२० लाख अनुदान + ९० दिवस मनरेगा मजुरी',
    },
    criteria: [
      {
        id: 'pmay_housing',
        field: 'housingType',
        operator: 'in',
        value: ['kutcha_temporary', 'homeless'],
        required: true,
        verified: true,
        explanation: {
          en: 'Household must not own a permanent pucca house anywhere in India',
          hi: 'परिवार के पास भारत में कहीं भी पक्का मकान नहीं होना चाहिए',
          mr: 'कुटुंबाच्या मालकीचे भारतात कुठेही पक्के घर नसावे',
        },
      },
      {
        id: 'pmay_income',
        field: 'incomeBand',
        operator: 'in',
        value: ['below_1lakh', '1lakh_2_5lakh'],
        required: true,
        verified: true,
        explanation: {
          en: 'Applicant family must fall within the low-income / BPL / SECC deprivation criteria',
          hi: 'आवेदक परिवार कम आय या एसईसीसी वंचना सूची में होना चाहिए',
          mr: 'अर्जदार कुटुंब अल्प उत्पन्न किंवा ग्रामपंचायत आवास यादीत पात्र असणे आवश्यक',
        },
      },
    ],
    documents: [
      {
        id: 'doc_aadhaar',
        name: {
          en: 'Aadhaar Card of Family Members',
          hi: 'परिवार के सदस्यों का आधार कार्ड',
          mr: 'कुटुंबातील सदस्यांचे आधार कार्ड',
        },
        mandatory: true,
      },
      {
        id: 'doc_bank_passbook',
        name: {
          en: 'Bank Account Passbook (Direct Benefit Transfer)',
          hi: 'बैंक पासबुक (डीबीटी लिंक्ड)',
          mr: 'बँक पासबुक (आधार जोडलेले)',
        },
        mandatory: true,
      },
      {
        id: 'doc_job_card',
        name: {
          en: 'MGNREGA Job Card Number (if available)',
          hi: 'मनरेगा जॉब कार्ड नंबर',
          mr: 'मनरेगा जॉब कार्ड क्रमांक',
        },
        mandatory: false,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Verify Inclusion in Gram Panchayat Awas List',
          hi: 'ग्राम पंचायत आवास सूची में नाम सत्यापित करें',
          mr: 'ग्रामपंचायत आवास प्लस यादीत नाव तपासा',
        },
        instruction: {
          en: 'Check with your Village Gram Sevak / Panchayat Secretary or check the PMAYG portal report for your village.',
          hi: 'अपने ग्राम प्रधान, पंचायत सचिव या ग्राम रोजगार सेवक से सूची में नाम जांचें।',
          mr: 'ग्रामसेवक किंवा पंचायत समिती कार्यालयात जाऊन आवास प्लस यादीतील क्रम तपासा.',
        },
        location_type: 'tehsil_office',
      },
      {
        step_number: 2,
        title: {
          en: 'Geotagging of Old Kutcha House',
          hi: 'पुराने कच्चे मकान की जियोटैगिंग कराएं',
          mr: 'सध्याच्या कच्च्या घराचे जिओ-टॅगिंग करून घ्या',
        },
        instruction: {
          en: 'Gram Sevak inspects the site and captures geotagged photos using the AwaasApp to sanction the 1st installment.',
          hi: 'पंचायत अधिकारी आवास ऐप से वर्तमान स्थल की फोटो खींचकर जियोटैग करता है।',
          mr: 'ग्रामसेवक किंवा संबंधित अधिकारी जागेवर येऊन आवास ॲपद्वारे फोटो घेतात.',
        },
        location_type: 'tehsil_office',
      },
      {
        step_number: 3,
        title: {
          en: 'Receive Staged DBT Installments on Construction Milestones',
          hi: 'निर्माण के चरणों के अनुसार बैंक खाते में किस्तें प्राप्त करें',
          mr: 'बांधकामाच्या टप्प्यांनुसार थेट खात्यात हप्ते मिळवा',
        },
        instruction: {
          en: 'Payments are disbursed in 3-4 installments directly into your bank account as plinth, lintel, and roof are completed.',
          hi: 'कुर्सी, छत और पूर्णता के आधार पर सीधे बैंक खाते में सहायता राशि आती है।',
          mr: 'जोते, खिडकी लेव्हल आणि छत पूर्ण झाल्यावर टप्प्याटप्प्याने पैसे खात्यात जमा होतात.',
        },
        location_type: 'bank_branch',
      },
    ],
  },

  {
    id: 'nsp-post-matric',
    code: 'NSP-PMSC',
    name: {
      en: 'National Post-Matric Scholarship Scheme',
      hi: 'राष्ट्रीय पोस्ट-मैट्रिक छात्रवृत्ति योजना',
      mr: 'राष्ट्रीय पोस्ट-मॅट्रिक शिष्यवृत्ती योजना',
    },
    short_summary: {
      en: 'Tuition fee reimbursement and monthly maintenance allowance for students studying in class 11 and above.',
      hi: '11वीं कक्षा और उससे ऊपर अध्ययनरत कमजोर वर्ग के छात्रों हेतु शिक्षण शुल्क प्रतिपूर्ति एवं निर्वाह भत्ता।',
      mr: 'इयत्ता ११ वी व त्यापुढील उच्च शिक्षणासाठी शिक्षण शुल्क माफी व मासिक निर्वाह भत्ता.',
    },
    description: {
      en: 'Centrally sponsored scholarship scheme providing financial assistance to eligible students from SC, ST, OBC, EBC, and minority communities to complete higher education.',
      hi: 'अनुसूचित जाति/जनजाति/अन्य पिछड़े वर्ग के छात्रों को उच्च शिक्षा पूर्ण करने हेतु वित्तीय सहायता।',
      mr: 'मागासवर्गीय व अल्पसंख्याक प्रवर्गातील विद्यार्थ्यांना पदवी/पदविका शिक्षणासाठी आर्थिक साहाय्य.',
    },
    level: 'central',
    state: null,
    category: 'education',
    official_url: 'https://scholarships.gov.in',
    application_mode: 'online',
    source_citation: 'Ministry of Social Justice & Empowerment / Ministry of Education (scholarships.gov.in)',
    last_verified: '2026-09-10',
    version: '2026.1',
    is_verified_fact: true,
    benefit_type: {
      en: 'Full Tuition Fee waiver + Monthly Maintenance Allowance',
      hi: 'पूर्ण शिक्षण शुल्क छूट + मासिक भत्ता',
      mr: 'पूर्ण शिक्षण शुल्क माफी + मासिक निर्वाह भत्ता',
    },
    criteria: [
      {
        id: 'nsp_occ',
        field: 'occupation',
        operator: 'eq',
        value: 'student',
        required: true,
        verified: true,
        explanation: {
          en: 'Applicant must be an actively enrolled student in a recognized post-matric course (Class 11, 12, ITI, Diploma, Degree, PG)',
          hi: 'आवेदक मान्यता प्राप्त कॉलेज या संस्थान में 11वीं या उच्च कक्षा का छात्र होना चाहिए',
          mr: 'अर्जदार मान्यताप्राप्त कॉलेजमध्ये ११ वी किंवा त्यापुढील अभ्यासक्रमात शिकत असलेला विद्यार्थी असावा',
        },
      },
      {
        id: 'nsp_cat',
        field: 'socialCategory',
        operator: 'in',
        value: ['sc', 'st', 'obc', 'minority'],
        required: true,
        verified: true,
        explanation: {
          en: 'Scheme covers SC, ST, OBC, EBC, DNT, and Minority students',
          hi: 'यह छात्रवृत्ति एससी, एसटी, ओबीसी और अल्पसंख्यक वर्ग के विद्यार्थियों के लिए है',
          mr: 'ही शिष्यवृत्ती अनुसूचित जाती, जमाती, इतर मागास आणि अल्पसंख्याक प्रवर्गासाठी आहे',
        },
      },
      {
        id: 'nsp_inc',
        field: 'incomeBand',
        operator: 'in',
        value: ['below_1lakh', '1lakh_2_5lakh'],
        required: true,
        verified: true,
        explanation: {
          en: 'Annual family income from all sources must not exceed ₹2,50,000 per year',
          hi: 'परिवार की कुल वार्षिक आय ₹2.5 लाख से अधिक नहीं होनी चाहिए',
          mr: 'कुटुंबाचे वार्षिक उत्पन्न ₹२,५०,००० पेक्षा कमी असणे आवश्यक',
        },
      },
    ],
    documents: [
      {
        id: 'doc_income_cert',
        name: {
          en: 'Competent Authority Income Certificate',
          hi: 'सक्षम अधिकारी द्वारा जारी आय प्रमाण पत्र (तहसीलदार / एसडीएम)',
          mr: 'तहसीलदारांचा अधिकृत उत्पन्नाचा दाखला',
        },
        mandatory: true,
      },
      {
        id: 'doc_caste_cert',
        name: {
          en: 'Caste Certificate (SC/ST/OBC)',
          hi: 'जाति प्रमाण पत्र',
          mr: 'जातीचा दाखला (Caste Certificate)',
        },
        mandatory: true,
      },
      {
        id: 'doc_marksheets',
        name: {
          en: 'Previous Year Marksheet & College Admission Receipt',
          hi: 'पिछली कक्षा की अंकतालिका एवं कॉलेज प्रवेश रसीद',
          mr: 'मागील वर्षाचे गुणपत्रक व कॉलेज प्रवेश पावती',
        },
        mandatory: true,
      },
      {
        id: 'doc_aadhaar',
        name: {
          en: 'Student Aadhaar Card (linked to DBT bank account)',
          hi: 'विद्यार्थी का आधार कार्ड (बैंक से लिंक)',
          mr: 'विद्यार्थ्याचे आधार कार्ड (बँकेशी जोडलेले)',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Generate One-Time Registration (OTR) on NSP',
          hi: 'राष्ट्रीय छात्रवृत्ति पोर्टल (एनएसपी) पर ओटीआर बनाएं',
          mr: 'NSP पोर्टलवर वन-टाईम रजिस्ट्रेशन (OTR) करा',
        },
        instruction: {
          en: 'Download NSP OTR App, authenticate using Aadhaar Face RD, and get your unique 14-digit OTR number.',
          hi: 'scholarships.gov.in पर जाकर आधार फेस वेरिफिकेशन से अपना ओटीआर बनाएं।',
          mr: 'scholarships.gov.in किंवा ॲपवर आधार फेस ऑथेंटिकेशन करून १४ अंकी OTR क्रमांक मिळवा.',
        },
        location_type: 'online',
      },
      {
        step_number: 2,
        title: {
          en: 'Fill Scholarship Application & Upload Documents',
          hi: 'आवेदन पत्र भरें और दस्तावेज अपलोड करें',
          mr: 'अर्ज भरा आणि कागदपत्रे अपलोड करा',
        },
        instruction: {
          en: 'Select your institution, course, upload income and caste certificates, and submit before state deadline.',
          hi: 'संस्थान चुनें, कोर्स विवरण भरें और आय व जाति प्रमाण पत्र अपलोड कर सबमिट करें।',
          mr: 'महाविद्यालयाचे नाव, कोर्स निवडून उत्पन्नाचा व जातीचा दाखला अपलोड करा.',
        },
        location_type: 'online',
      },
      {
        step_number: 3,
        title: {
          en: 'Institute & District Verification',
          hi: 'कॉलेज और जिला नोडल अधिकारी से सत्यापन',
          mr: 'महाविद्यालय व जिल्हा स्तरावर पडताळणी',
        },
        instruction: {
          en: 'Submit physical printout to your college nodal officer for institutional sign-off and state DBT release.',
          hi: 'अपने कॉलेज के छात्रवृत्ति काउंटर पर हार्ड कॉपी जमा कर सत्यापन करवाएं।',
          mr: 'अर्जाची प्रिंट कॉलेजच्या शिष्यवृत्ती विभागाकडे जमा करून खात्री करा.',
        },
        location_type: 'csc_kendra',
      },
    ],
  },

  {
    id: 'apy',
    code: 'APY',
    name: {
      en: 'Atal Pension Yojana',
      hi: 'अटल पेंशन योजना',
      mr: 'अटल पेन्शन योजना',
    },
    short_summary: {
      en: 'Guaranteed lifetime monthly pension of ₹1,000 to ₹5,000 from age 60 for unorganized workers.',
      hi: 'असंगठित क्षेत्र के कामगारों के लिए 60 वर्ष की आयु के बाद ₹1,000 से ₹5,000 की मासिक गारंटीकृत पेंशन।',
      mr: 'असंघटित कामगारांसाठी वयाच्या ६० वर्षानंतर दरमहा ₹१,००० ते ₹५,००० ची खात्रीशीर पेन्शन.',
    },
    description: {
      en: 'A government-backed pension scheme focused on workers in the unorganized sector. Subscribers contribute a modest amount monthly between ages 18-40 to receive a fixed guaranteed pension after 60.',
      hi: 'असंगठित श्रमिकों को बुढ़ापे में सामाजिक सुरक्षा देने हेतु सरकार की गारंटीकृत पेंशन योजना।',
      mr: 'कष्टकरी आणि असंघटित कामगारांना वृद्धापकाळात निश्चित पेन्शन देणारी सुरक्षित सरकारी योजना.',
    },
    level: 'central',
    state: null,
    category: 'pension',
    official_url: 'https://www.npscra.nsdl.co.in',
    application_mode: 'both',
    source_citation: 'Pension Fund Regulatory and Development Authority (PFRDA), APY Circulars & FAQ (pfrda.org.in)',
    last_verified: '2026-08-15',
    version: '2026.1',
    is_verified_fact: true,
    benefit_type: {
      en: 'Guaranteed ₹1,000 - ₹5,000 / month lifetime pension',
      hi: 'आजीवन ₹1,000 से ₹5,000 प्रति माह गारंटीकृत पेंशन',
      mr: 'आयुष्यभर दरमहा ₹१,००० ते ₹५,००० खात्रीशीर पेन्शन',
    },
    criteria: [
      {
        id: 'apy_age',
        field: 'ageBand',
        operator: 'in',
        value: ['18_35', '36_50'],
        required: true,
        verified: true,
        explanation: {
          en: 'Entry age must be between 18 and 40 years',
          hi: 'योजना में शामिल होने के लिए आयु 18 से 40 वर्ष के बीच होनी चाहिए',
          mr: 'योजनेत प्रवेशासाठी वय १८ ते ४० वर्षांच्या दरम्यान असणे आवश्यक',
        },
      },
      {
        id: 'apy_income',
        field: 'incomeBand',
        operator: 'not_in',
        value: ['above_5lakh'],
        required: true,
        verified: true,
        explanation: {
          en: 'Income taxpayers are excluded from opening new APY accounts as per PFRDA rule since Oct 2022',
          hi: 'अक्टूबर 2022 के नियमों के अनुसार आयकर दाता अटल पेंशन खाता नहीं खोल सकते',
          mr: 'ऑक्टोबर २०२२ च्या नियमांनुसार आयकर भरणारे नागरिक या योजनेस अपात्र आहेत',
        },
      },
    ],
    documents: [
      {
        id: 'doc_aadhaar',
        name: {
          en: 'Aadhaar Card',
          hi: 'आधार कार्ड',
          mr: 'आधार कार्ड',
        },
        mandatory: true,
      },
      {
        id: 'doc_bank_passbook',
        name: {
          en: 'Active Savings Bank Account Passbook',
          hi: 'सक्रिय बचत बैंक खाता पासबुक',
          mr: 'बँक बचत खाते पासबुक',
        },
        description: {
          en: 'Account must have auto-debit facility enabled for monthly contributions',
          hi: 'मासिक योगदान हेतु ऑटो-डेबिट सक्षम बैंक खाता',
          mr: 'दरमहा रक्कम वजा होण्यासाठी ऑटो-डेबिट सुविधा असलेले बँक खाते',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Choose Desired Pension Tier (₹1,000 to ₹5,000)',
          hi: 'अपनी इच्छित पेंशन राशि चुनें (₹1,000 से ₹5,000)',
          mr: 'हवी असलेली पेन्शन रक्कम निवडा (₹१,००० ते ₹५,०००)',
        },
        instruction: {
          en: 'Select the monthly pension amount and check the corresponding monthly premium for your entry age.',
          hi: 'अपनी आयु के अनुसार मासिक अंशदान की तालिका देखकर पेंशन स्लैब चुनें।',
          mr: 'तुमच्या वयानुसार दरमहा भरावयाचा हप्ता आणि पेन्शन रक्कम ठरवा.',
        },
        location_type: 'bank_branch',
      },
      {
        step_number: 2,
        title: {
          en: 'Submit APY Subscriber Form to Your Bank',
          hi: 'अपनी बैंक शाखा में एपीवाई फॉर्म जमा करें',
          mr: 'आपल्या बँकेत एपीवाय अर्ज सादर करा',
        },
        instruction: {
          en: 'Fill in nominee details, sign the auto-debit mandate, and submit to your bank branch or via NetBanking.',
          hi: 'नॉमिनी का नाम भरें और ऑटो-डेबिट सहमति के साथ बैंक में जमा करें।',
          mr: 'वारसदाराचे नाव नोंदवून ऑटो-डेबिट फॉर्म बँकेत जमा करा किंवा नेट बँकिंगद्वारे सुरू करा.',
        },
        location_type: 'bank_branch',
      },
      {
        step_number: 3,
        title: {
          en: 'Receive PRAN (Permanent Retirement Account Number)',
          hi: 'प्रान (PRAN) नंबर और कार्ड प्राप्त करें',
          mr: 'PRAN नंबर मिळवा',
        },
        instruction: {
          en: 'You will receive an SMS with your PRAN. Download e-PRAN from the NSDL CRA portal.',
          hi: 'आपको एसएमएस पर प्रान नंबर प्राप्त होगा। एनएसडीएल पोर्टल से ई-प्रान डाउनलोड करें।',
          mr: 'एसएमएसद्वारे मिळालेल्या PRAN क्रमांकाद्वारे ऑनलाइन पेन्शन कार्ड डाउनलोड करा.',
        },
        location_type: 'online',
      },
    ],
  },

  {
    id: 'pmsby',
    code: 'PMSBY',
    name: {
      en: 'Pradhan Mantri Suraksha Bima Yojana',
      hi: 'प्रधानमंत्री सुरक्षा बीमा योजना',
      mr: 'प्रधानमंत्री सुरक्षा विमा योजना',
    },
    short_summary: {
      en: 'Accidental death and permanent disability cover of ₹2,00,000 for an annual premium of just ₹20.',
      hi: 'मात्र ₹20 प्रति वर्ष के प्रीमियम पर ₹2,00,000 का आकस्मिक मृत्यु और स्थायी दिव्यांगता बीमा।',
      mr: 'फक्त ₹२० वार्षिक हप्त्यामध्ये ₹२,००,००० चे अपघाती मृत्यू व अपंगत्व विमा संरक्षण.',
    },
    description: {
      en: 'An affordable accident insurance scheme for individuals between 18 and 70 years with a bank account. Covers ₹2 Lakh for accidental death or permanent full disability, and ₹1 Lakh for partial permanent disability.',
      hi: 'सभी बैंक खाताधारकों के लिए अत्यंत कम खर्च में उपलब्ध दुर्घटना बीमा योजना।',
      mr: 'अपघातात होणाऱ्या अनपेक्षित नुकसानीपासून कुटुंबाला आर्थिक आधार देणारी स्वस्त विमा योजना.',
    },
    level: 'central',
    state: null,
    category: 'insurance',
    official_url: 'https://financialservices.gov.in',
    application_mode: 'both',
    source_citation: 'Department of Financial Services, Ministry of Finance, PMSBY Rules (jansuraksha.gov.in)',
    last_verified: '2026-09-05',
    version: '2026.1',
    is_verified_fact: true,
    benefit_type: {
      en: '₹2,00,000 Accidental Cover for ₹20 / year',
      hi: '₹2,00,000 दुर्घटना कवर सिर्फ ₹20 / वर्ष में',
      mr: '₹२,००,००० अपघात विमा फक्त ₹२० / वर्ष',
    },
    criteria: [
      {
        id: 'pmsby_age',
        field: 'ageBand',
        operator: 'in',
        value: ['18_35', '36_50', '51_59', '60_plus'],
        required: true,
        verified: true,
        explanation: {
          en: 'Individual must be aged between 18 and 70 years',
          hi: 'व्यक्ति की आयु 18 से 70 वर्ष के बीच होनी चाहिए',
          mr: 'व्यक्तीचे वय १८ ते ७० वर्षांच्या दरम्यान असणे आवश्यक',
        },
      },
    ],
    documents: [
      {
        id: 'doc_aadhaar',
        name: {
          en: 'Aadhaar Card',
          hi: 'आधार कार्ड',
          mr: 'आधार कार्ड',
        },
        mandatory: true,
      },
      {
        id: 'doc_bank_passbook',
        name: {
          en: 'Bank Account Passbook (Auto-Debit Mandate)',
          hi: 'बैंक बचत खाता विवरण',
          mr: 'बँक खाते पासबुक',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Consent for Annual Auto-Debit of ₹20',
          hi: '₹20 के वार्षिक ऑटो-डेबिट हेतु सहमति दें',
          mr: 'वार्षिक ₹२० ऑटो-डेबिट साठी बँकेला संमती द्या',
        },
        instruction: {
          en: 'Submit PMSBY enrollment form at your bank, post office, or enable directly through NetBanking/Mobile Banking app.',
          hi: 'बैंक शाखा, डाकघर या मोबाइल बैंकिंग ऐप से नामांकन सहमति पत्र सबमिट करें।',
          mr: 'बँकेत जाऊन किंवा मोबाईल बँकिंग ॲपवरून ₹२० ऑटो-डेबिटचा पर्याय चालू करा.',
        },
        location_type: 'bank_branch',
      },
      {
        step_number: 2,
        title: {
          en: 'Annual Renewal Check Every May',
          hi: 'हर वर्ष मई में खाते में पर्याप्त शेष रखें',
          mr: 'दरवर्षी मे महिन्यात खात्यात किमान शिल्लक ठेवा',
        },
        instruction: {
          en: 'Keep at least ₹20 in your account before May 31st each year so the premium deducts smoothly and cover continues.',
          hi: '31 मई से पहले खाते में ₹20 रखें ताकि अगली अवधि के लिए बीमा स्वतः नवीनीकृत हो सके।',
          mr: '३१ मे पूर्वी खात्यात ₹२० ठेवा जेणेकरून विमा खंडित न होता आपोआप नूतनीकरण होईल.',
        },
        location_type: 'bank_branch',
      },
    ],
  },

  {
    id: 'pmjjby',
    code: 'PMJJBY',
    name: {
      en: 'Pradhan Mantri Jeevan Jyoti Bima Yojana',
      hi: 'प्रधानमंत्री जीवन ज्योति बीमा योजना',
      mr: 'प्रधानमंत्री जीवन ज्योती विमा योजना',
    },
    short_summary: {
      en: 'Life insurance cover of ₹2,00,000 for death due to any cause, for an annual premium of ₹436.',
      hi: 'किसी भी कारण से मृत्यु होने पर ₹2,00,000 का जीवन बीमा कवर, केवल ₹436 वार्षिक प्रीमियम पर।',
      mr: 'कोणत्याही कारणाने मृत्यू झाल्यास कुटुंबाला ₹२,००,००० चे जीवन विमा संरक्षण, वर्षाला फक्त ₹४३६ हप्ता.',
    },
    description: {
      en: 'A one-year life insurance scheme renewable from year to year offering coverage for death due to any cause. Available to people in the age group 18 to 50 years having a bank account.',
      hi: 'सभी बैंक खाताधारकों के लिए उपलब्ध सरल और किफायती जीवन बीमा सुरक्षा।',
      mr: 'अकाली निधनानंतर कुटुंबाला त्वरित आर्थिक आधार मिळवून देणारी स्वस्त जीवन विमा योजना.',
    },
    level: 'central',
    state: null,
    category: 'insurance',
    official_url: 'https://financialservices.gov.in',
    application_mode: 'both',
    source_citation: 'Department of Financial Services, PMJJBY Scheme Guidelines (jansuraksha.gov.in)',
    last_verified: '2026-09-05',
    version: '2026.1',
    is_verified_fact: true,
    benefit_type: {
      en: '₹2,00,000 Life Insurance Cover for ₹436 / year',
      hi: '₹2,00,000 जीवन बीमा मात्र ₹436 / वर्ष में',
      mr: '₹२,००,००० जीवन विमा फक्त ₹४३६ / वर्ष',
    },
    criteria: [
      {
        id: 'pmjjby_age',
        field: 'ageBand',
        operator: 'in',
        value: ['18_35', '36_50'],
        required: true,
        verified: true,
        explanation: {
          en: 'Individual must be aged between 18 and 50 years (coverage extends up to age 55 subject to annual renewal)',
          hi: 'योजना में शामिल होने के लिए आयु 18 से 50 वर्ष के बीच होनी चाहिए',
          mr: 'योजनेत नोंदणीसाठी वय १८ ते ५० वर्षांच्या दरम्यान असणे आवश्यक',
        },
      },
    ],
    documents: [
      {
        id: 'doc_aadhaar',
        name: {
          en: 'Aadhaar Card',
          hi: 'आधार कार्ड',
          mr: 'आधार कार्ड',
        },
        mandatory: true,
      },
      {
        id: 'doc_bank_passbook',
        name: {
          en: 'Bank Account Passbook (Auto-Debit Mandate)',
          hi: 'बैंक बचत खाता',
          mr: 'बँक खाते पासबुक',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Submit PMJJBY Enrollment Form & Nominee Declaration',
          hi: 'पीएमजेजेबीवाई नामांकन फॉर्म और नॉमिनी विवरण भरें',
          mr: 'विमा अर्ज आणि वारसदाराचा तपशील बँकेत द्या',
        },
        instruction: {
          en: 'Enroll at your bank or post office, provide good health declaration and nominee name for family protection.',
          hi: 'बैंक शाखा में नामांकन फॉर्म भरें और नॉमिनी का नाम दर्ज कराएं।',
          mr: 'बँकेत किंवा पोस्टात फॉर्म भरून वारसदाराचे नाव अचूक नोंदवा.',
        },
        location_type: 'bank_branch',
      },
      {
        step_number: 2,
        title: {
          en: 'Auto-Debit Deduction of ₹436 Annually',
          hi: 'खाते से वार्षिक ₹436 की ऑटो-कटौती',
          mr: 'खात्यातून वार्षिक ₹४३६ आपोआप जमा होणे',
        },
        instruction: {
          en: 'Ensure your account has ₹436 in May each year to keep the life cover active seamlessly.',
          hi: 'मई माह में बैंक खाते में पर्याप्त राशि रखें ताकि जीवन सुरक्षा निरंतर बनी रहे।',
          mr: 'मे महिन्यात खात्यात किमान ₹४३६ शिल्लक ठेवा म्हणजे विमा चालू राहील.',
        },
        location_type: 'bank_branch',
      },
    ],
  },

  {
    id: 'pm-svanidhi',
    code: 'PM-SVANIDHI',
    name: {
      en: "PM Street Vendor's AtmaNirbhar Nidhi (PM SVANidhi)",
      hi: 'पीएम स्वनिधि (स्ट्रीट वेंडर आत्मनिर्भर निधि)',
      mr: 'पीएम स्वनिधी (फेरीवाला आत्मनिर्भर निधी)',
    },
    short_summary: {
      en: 'Collateral-free working capital micro-loans of ₹10,000, ₹20,000, and ₹50,000 with 7% interest subsidy for street vendors.',
      hi: 'रेहड़ी-पटरी और फेरीवालों को बिना गारंटी ₹10,000 से ₹50,000 तक का सस्ता कार्यशील ऋण एवं 7% ब्याज सब्सिडी।',
      mr: 'हातगाडी व फेरीवाल्यांसाठी विनातारण ₹१०,००० ते ₹५०,००० पर्यंतचे खेळते भांडवल कर्ज आणि ७% व्याज परतावा.',
    },
    description: {
      en: 'Special micro-credit facility for street vendors, hawkers, and informal sellers in urban, peri-urban, and rural areas to resume and expand livelihoods.',
      hi: 'शहरी और ग्रामीण क्षेत्रों के रेहड़ी-पटरी विक्रेताओं के लिए संपार्श्विक-मुक्त सूक्ष्म ऋण योजना।',
      mr: 'शहरी व ग्रामीण भागातील रस्त्यावरील विक्रेत्यांना स्वस्त दरात भांडवल उपलब्ध करून देणारी योजना.',
    },
    level: 'central',
    state: null,
    category: 'livelihood',
    official_url: 'https://pmsvanidhi.mohua.gov.in',
    application_mode: 'both',
    source_citation: 'Ministry of Housing and Urban Affairs (MoHUA), PM SVANidhi Guidelines (pmsvanidhi.mohua.gov.in)',
    last_verified: '2026-09-18',
    version: '2026.1',
    is_verified_fact: true,
    benefit_type: {
      en: '₹10,000 - ₹50,000 Collateral-Free Loan + 7% Interest Subsidy',
      hi: '₹10,000 से ₹50,000 तक बिना गारंटी ऋण + 7% ब्याज सब्सिडी',
      mr: '₹१०,००० ते ₹५०,००० विनातारण कर्ज + ७% व्याज अनुदान',
    },
    criteria: [
      {
        id: 'svanidhi_occ',
        field: 'occupation',
        operator: 'in',
        value: ['street_vendor', 'daily_wage'],
        required: true,
        verified: true,
        explanation: {
          en: 'Applicant must be an active street vendor, hawker, thela-puller, or petty informal seller',
          hi: 'आवेदक रेहड़ी-पटरी, ठेला, खोमचा लगाने वाला या छोटा विक्रेता होना चाहिए',
          mr: 'अर्जदार रस्त्यावरील फेरीवाला, हातगाडी चालक किंवा छोटा व्यवसायिक असावा',
        },
      },
      {
        id: 'svanidhi_age',
        field: 'ageBand',
        operator: 'in',
        value: ['18_35', '36_50', '51_59', '60_plus'],
        required: true,
        verified: true,
        explanation: {
          en: 'Vendor must be an adult aged 18 years or older',
          hi: 'आवेदक की आयु 18 वर्ष या उससे अधिक होनी चाहिए',
          mr: 'अर्जदाराचे वय १८ वर्षे किंवा त्याहून अधिक असणे आवश्यक',
        },
      },
    ],
    documents: [
      {
        id: 'doc_aadhaar',
        name: {
          en: 'Aadhaar Card',
          hi: 'आधार कार्ड',
          mr: 'आधार कार्ड',
        },
        mandatory: true,
      },
      {
        id: 'doc_vending_id',
        name: {
          en: 'Vending Certificate / Identity Card / Letter of Recommendation (LoR)',
          hi: 'वेंडिंग प्रमाण पत्र / पहचान पत्र / नगर निगम से सिफारिश पत्र (LoR)',
          mr: 'फेरीवाला प्रमाणपत्र (Vending Certificate) किंवा पालिकेचे शिफारस पत्र (LoR)',
        },
        description: {
          en: 'Issued by Urban Local Body (ULB) / Town Vending Committee (TVC), or apply for LoR online',
          hi: 'नगर पालिका / नगर निगम या टाउन वेंडिंग कमेटी द्वारा जारी',
          mr: 'महानगरपालिका किंवा नगरपरिषदेने दिलेला फेरीवाला दाखला किंवा LoR',
        },
        mandatory: true,
      },
      {
        id: 'doc_bank_passbook',
        name: {
          en: 'Bank Account Passbook (for loan disbursement)',
          hi: 'बैंक बचत खाता विवरण',
          mr: 'बँक खाते पासबुक',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Check Vending Status / Apply for Letter of Recommendation (LoR)',
          hi: 'वेंडिंग स्टेटस चेक करें या सिफारिश पत्र (LoR) हेतु आवेदन करें',
          mr: 'फेरीवाला नोंदणी तपासा किंवा LoR साठी अर्ज करा',
        },
        instruction: {
          en: 'Visit pmsvanidhi.mohua.gov.in. If you do not have a vending ID, apply for LoR with proof of vending.',
          hi: 'पोर्टल पर अपना मोबाइल नंबर दर्ज करें और यदि वेंडिंग आईडी नहीं है तो LoR का अनुरोध करें।',
          mr: 'pmsvanidhi पोर्टलवर फेरीवाला असल्याचे पुरावे जोडून LoR मिळवण्यासाठी अर्ज करा.',
        },
        location_type: 'online',
      },
      {
        step_number: 2,
        title: {
          en: 'Apply for 1st Tranche Loan (₹10,000)',
          hi: 'पहले चरण के ऋण (₹10,000) के लिए आवेदन करें',
          mr: 'पहिल्या टप्प्यातील ₹१०,००० कर्जासाठी अर्ज करा',
        },
        instruction: {
          en: 'Submit online form choosing your preferred lending bank. No guarantor or collateral needed.',
          hi: 'अपनी पसंद का बैंक चुनें और बिना किसी जमानतदार के ऋण आवेदन सबमिट करें।',
          mr: 'आपल्या पसंतीची बँक निवडून विनातारण कर्जाचा अर्ज ऑनलाईन दाखल करा.',
        },
        location_type: 'online',
      },
      {
        step_number: 3,
        title: {
          en: 'Repay Regularly to Unlock Higher Tranches (₹20,000 & ₹50,000)',
          hi: 'समय पर भुगतान कर ₹20,000 और ₹50,000 का बड़ा ऋण प्राप्त करें',
          mr: 'हप्ते वेळेत भरून पुढील ₹२०,००० व ₹५०,००० चे मोठे कर्ज मिळवा',
        },
        instruction: {
          en: 'Prompt digital repayment earns cashback up to ₹1,200/year and 7% interest subsidy directly credited to your account.',
          hi: 'डिजिटल लेनदेन करने पर मासिक कैशबैक और 7% ब्याज सब्सिडी प्राप्त होती है।',
          mr: 'डिजिटल पेमेंट स्वीकारल्यास कॅशबॅक आणि ७% व्याज परतावा थेट खात्यात जमा होतो.',
        },
        location_type: 'bank_branch',
      },
    ],
  },

  {
    id: 'ssy',
    code: 'SSY',
    name: {
      en: 'Sukanya Samriddhi Yojana',
      hi: 'सुकन्या समृद्धि योजना',
      mr: 'सुकन्या समृद्धी योजना',
    },
    short_summary: {
      en: 'High-interest small deposit savings scheme for girl child with tax exemption under Section 80C.',
      hi: 'बालिकाओं के उज्ज्वल भविष्य और उच्च शिक्षा हेतु उच्च ब्याज दर वाली सुरक्षित बचत योजना।',
      mr: 'मुलींच्या उच्च शिक्षण आणि भविष्यासाठी सर्वाधिक व्याज देणारी केंद्र सरकारची सुरक्षित बचत योजना.',
    },
    description: {
      en: 'Government of India backed savings scheme targeted at the parents of girl children to build a fund for future education and marriage expenses.',
      hi: 'बेटी बचाओ बेटी पढ़ाओ अभियान के तहत बालिकाओं के नाम पर खोला जाने वाला विशेष बचत खाता।',
      mr: 'मुलीच्या नावाने पोस्टात किंवा बँकेत उघडता येणारे आकर्षक व्याजदराचे विशेष बचत खाते.',
    },
    level: 'central',
    state: null,
    category: 'women_child',
    official_url: 'https://www.indiapost.gov.in',
    application_mode: 'offline',
    source_citation: 'National Savings Institute / India Post, Sukanya Samriddhi Account Rules 2019 (nsiindia.gov.in)',
    last_verified: '2026-08-30',
    version: '2026.1',
    is_verified_fact: true,
    benefit_type: {
      en: '8.2% Compound Interest + Tax-Free Returns',
      hi: '8.2% चक्रवृद्धि ब्याज + कर-मुक्त रिटर्न',
      mr: '८.२% चक्रवाढ व्याज + करमुक्त परतावा',
    },
    criteria: [
      {
        id: 'ssy_child',
        field: 'hasGirlChild',
        operator: 'eq',
        value: 'yes',
        required: true,
        verified: true,
        explanation: {
          en: 'Account must be opened by parents or legal guardians in the name of a girl child below 10 years',
          hi: 'खाता 10 वर्ष से कम आयु की बालिका के नाम पर माता-पिता या अभिभावक द्वारा खोला जा सकता है',
          mr: '१० वर्षांखालील मुलीच्या नावाने पालकांना हे खाते उघडता येते',
        },
      },
    ],
    documents: [
      {
        id: 'doc_birth_cert',
        name: {
          en: 'Birth Certificate of the Girl Child',
          hi: 'बालिका का जन्म प्रमाण पत्र',
          mr: 'मुलीचा अधिकृत जन्म दाखला',
        },
        description: {
          en: 'Issued by hospital or Municipal Corporation / Gram Panchayat',
          hi: 'नगर निगम या ग्राम पंचायत द्वारा जारी मूल जन्म प्रमाण पत्र',
          mr: 'ग्रामपंचायत किंवा नगरपालिकेचा जन्म नोंदणी दाखला',
        },
        mandatory: true,
      },
      {
        id: 'doc_parent_id',
        name: {
          en: 'Parent / Legal Guardian Aadhaar Card & PAN',
          hi: 'माता-पिता / अभिभावक का आधार कार्ड व पैन',
          mr: 'पालकांचे आधार कार्ड आणि पॅन कार्ड',
        },
        mandatory: true,
      },
      {
        id: 'doc_photo',
        name: {
          en: 'Photographs of Child and Parent',
          hi: 'बच्ची और माता-पिता की पासपोर्ट फोटो',
          mr: 'मुलगी आणि पालकांचे पासपोर्ट फोटो',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Collect SSY Account Opening Form (Form-1)',
          hi: 'सुकन्या समृद्धि खाता खोलने का फॉर्म (फॉर्म-1) लें',
          mr: 'सुकन्या समृद्धी खाते उघडण्याचा फॉर्म मिळवा',
        },
        instruction: {
          en: 'Visit any Post Office branch or authorized public/private commercial bank branch.',
          hi: 'किसी भी डाकघर या अधिकृत बैंक शाखा से फॉर्म प्राप्त करें।',
          mr: 'कोणत्याही पोस्ट ऑफिसमध्ये किंवा राष्ट्रीयीकृत बँकेत जाऊन फॉर्म घ्या.',
        },
        location_type: 'post_office',
      },
      {
        step_number: 2,
        title: {
          en: 'Submit Documents with Minimum Initial Deposit of ₹250',
          hi: 'न्यूनतम ₹250 जमा राशि के साथ दस्तावेज जमा करें',
          mr: 'किमान ₹२५० भरून कागदपत्रे जमा करा',
        },
        instruction: {
          en: 'Submit child’s birth certificate, parents KYC and initial cash or cheque deposit of ₹250 or more.',
          hi: 'जन्म प्रमाण पत्र, माता-पिता का आधार और कम से कम ₹250 जमा कराएं।',
          mr: 'मुलीचा जन्म दाखला, पालकांचे आधार व किमान ₹२५० भरून खाते सुरू करा.',
        },
        location_type: 'post_office',
      },
      {
        step_number: 3,
        title: {
          en: 'Maintain Annual Deposit (Min ₹250, Max ₹1.5 Lakh)',
          hi: 'प्रति वर्ष न्यूनतम ₹250 अवश्य जमा करते रहें',
          mr: 'दरवर्षी किमान ₹२५० नियमित जमा करा',
        },
        instruction: {
          en: 'Deposit for 15 years from date of opening; matures when the girl turns 21 or on marriage after age 18.',
          hi: '15 वर्ष तक नियमित जमा करें; खाता 21 वर्ष की आयु पर परिपक्व होता है।',
          mr: '१५ वर्षे नियमित रक्कम भरा; मुलगी २१ वर्षांची झाल्यावर संपूर्ण रक्कम व्याजासह मिळते.',
        },
        location_type: 'post_office',
      },
    ],
  },

  {
    id: 'mh-sanjay-gandhi-niradhar',
    code: 'MH-SGNRY',
    name: {
      en: 'Sanjay Gandhi Niradhar Anudan Yojana (Maharashtra)',
      hi: 'संजय गांधी निराधार अनुदान योजना (महाराष्ट्र)',
      mr: 'संजय गांधी निराधार अनुदान योजना (महाराष्ट्र शासन)',
    },
    short_summary: {
      en: 'Monthly financial assistance of ₹1,500 for destitute persons, widows, and severely disabled residents of Maharashtra.',
      hi: 'महाराष्ट्र के निराधार व्यक्तियों, विधवाओं और गंभीर रूप से दिव्यांग जनों को ₹1,500 प्रति माह की आर्थिक सहायता।',
      mr: 'महाराष्ट्रातील निराधार व्यक्ती, विधवा महिला आणि दिव्यांग बांधवांना दरमहा ₹१,५०० चे आर्थिक साहाय्य.',
    },
    description: {
      en: 'Social justice pension scheme of Government of Maharashtra providing regular monthly subsistence allowance to destitute elderly, widows, orphans, and persons with 40%+ disability living below poverty thresholds.',
      hi: 'महाराष्ट्र सरकार की सामाजिक सुरक्षा योजना जिसके तहत निराधार और अक्षम नागरिकों को मासिक पेंशन दी जाती है।',
      mr: 'महाराष्ट्र शासनाची सामाजिक न्याय विभागाची योजना, ज्याद्वारे उपजीविकेचे साधन नसलेल्या निराधार नागरिकांना दरमहा निवृत्तिवेतन दिले जाते.',
    },
    level: 'state',
    state: 'Maharashtra',
    category: 'pension',
    official_url: 'https://sjsa.maharashtra.gov.in',
    application_mode: 'both',
    source_citation: 'Social Justice & Special Assistance Department, Govt of Maharashtra, GR No. SGN-2019/C.R. (sjsa.maharashtra.gov.in)',
    last_verified: '2026-08-10',
    version: '2026.1',
    is_verified_fact: true,
    benefit_type: {
      en: '₹1,500 / month Direct Pension Support',
      hi: '₹1,500 / माह पेंशन सहायता',
      mr: '₹१,५०० / दरमहा निवृत्तिवेतन',
    },
    criteria: [
      {
        id: 'sgnry_inc',
        field: 'incomeBand',
        operator: 'in',
        value: ['below_1lakh'],
        required: true,
        verified: true,
        explanation: {
          en: 'Family annual income must not exceed ₹21,000 per year (or ₹50,000 for families with disability)',
          hi: 'परिवार की वार्षिक आय ₹21,000 प्रति वर्ष से अधिक नहीं होनी चाहिए (दिव्यांगों हेतु ₹50,000)',
          mr: 'कुटुंबाचे वार्षिक उत्पन्न ₹२१,००० पेक्षा जास्त नसावे (दिव्यांग व्यक्तींसाठी ₹५०,००० पर्यंत मर्यादा)',
        },
      },
      {
        id: 'sgnry_occ',
        field: 'occupation',
        operator: 'in',
        value: ['unemployed', 'daily_wage', 'homemaker'],
        required: false,
        verified: true,
        explanation: {
          en: 'Intended for destitute individuals with no continuous formal employment',
          hi: 'योजना उन लोगों के लिए है जिनके पास आजीविका का कोई नियमित साधन नहीं है',
          mr: 'उपजीविकेचे कोणतेही कायमस्वरूपी साधन नसलेल्या व्यक्तींसाठी',
        },
      },
    ],
    documents: [
      {
        id: 'doc_domicile_cert',
        name: {
          en: 'Maharashtra Domicile / 15-Year Residence Proof',
          hi: 'महाराष्ट्र अधिवास प्रमाण पत्र (15 वर्ष निवास)',
          mr: 'किमान १५ वर्षे महाराष्ट्रात राहिल्याचा अधिवास दाखला (Domicile)',
        },
        mandatory: true,
      },
      {
        id: 'doc_income_cert',
        name: {
          en: 'Income Certificate issued by Tehsildar',
          hi: 'तहसीलदार द्वारा जारी आय प्रमाण पत्र',
          mr: 'तहसीलदारांचा अधिकृत उत्पन्नाचा दाखला',
        },
        mandatory: true,
      },
      {
        id: 'doc_disability_or_death_cert',
        name: {
          en: 'Civil Surgeon Disability Certificate (40%+) or Husband’s Death Certificate (for widows)',
          hi: 'सिविल सर्जन दिव्यांग प्रमाण पत्र (40%+) अथवा पति का मृत्यु प्रमाण पत्र',
          mr: 'जिल्हा शल्यचिकित्सकांचे दिव्यांग प्रमाणपत्र (किमान ४०%) किंवा पतीचा मृत्यू दाखला',
        },
        mandatory: false,
      },
      {
        id: 'doc_bank_passbook',
        name: {
          en: 'Bank Account Passbook (Aadhaar Seeded)',
          hi: 'बैंक पासबुक (आधार सीडेड)',
          mr: 'बँक पासबुक (आधार जोडलेले)',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Obtain Income and Domicile Certificates from Tehsil Office',
          hi: 'तहसील कार्यालय या सेतु केंद्र से आय एवं निवास प्रमाण पत्र बनवाएं',
          mr: 'तहसील कार्यालय किंवा सेतू केंद्रातून उत्पन्नाचा व अधिवास दाखला काढा',
        },
        instruction: {
          en: 'Apply through Aaple Sarkar portal (aaplesarkar.mahaonline.gov.in) or visit nearest Maha e-Seva Kendra.',
          hi: 'आपले सरकार पोर्टल या सेतु केंद्र से आवश्यक प्रमाण पत्र प्राप्त करें।',
          mr: 'आपले सरकार पोर्टलवरून किंवा जवळच्या महा-ई-सेवा केंद्रातून दाखले प्राप्त करा.',
        },
        location_type: 'tehsil_office',
      },
      {
        step_number: 2,
        title: {
          en: 'Submit Application to Sanjay Gandhi Yojana Committee at Tehsil',
          hi: 'तहसील में संजय गांधी योजना समिति को आवेदन प्रस्तुत करें',
          mr: 'तहसील कार्यालयातील संजय गांधी योजना समितीकडे अर्ज सादर करा',
        },
        instruction: {
          en: 'Submit form along with medical/widow certificate to the Nayab Tehsildar (Sanjay Gandhi Yojana desk).',
          hi: 'सभी संलग्नकों के साथ आवेदन नायब तहसीलदार कार्यालय में जमा करें।',
          mr: 'नायब तहसीलदार (संजय गांधी शाखा) यांच्याकडे कागदपत्रांसह अर्ज दाखल करा.',
        },
        location_type: 'tehsil_office',
      },
      {
        step_number: 3,
        title: {
          en: 'Approval by Committee & Monthly Bank Credit',
          hi: 'समिति की मंजूरी के बाद मासिक बैंक अंतरण',
          mr: 'समितीच्या मंजुरीनंतर दरमहा खात्यात पेन्शन सुरू',
        },
        instruction: {
          en: 'The committee meets monthly to sanction cases; approved pensioners receive ₹1,500 directly in bank accounts.',
          hi: 'समिति की बैठक में स्वीकृति के बाद प्रति माह ₹1,500 सीधे बैंक में अंतरित होते हैं।',
          mr: 'समितीच्या मासिक बैठकीत मंजुरी मिळाल्यावर दरमहा थेट बँक खात्यात ₹१,५०० जमा होतात.',
        },
        location_type: 'bank_branch',
      },
    ],
  },
  {
    id: 'pmfby',
    code: 'PMFBY',
    name: {
      en: 'Pradhan Mantri Fasal Bima Yojana (Crop Insurance)',
      hi: 'प्रधानमंत्री फसल बीमा योजना (पीएमएफबीवाई)',
      mr: 'प्रधानमंत्री पीक विमा योजना (पीएमएफबीवाय)',
    },
    short_summary: {
      en: 'Comprehensive crop insurance covering natural calamities, pests, and post-harvest losses at only 1.5% to 2% farmer premium.',
      hi: 'प्राकृतिक आपदाओं, कीटों और कटाई उपरांत नुकसान से केवल 1.5% से 2% प्रीमियम पर व्यापक फसल बीमा सुरक्षा।',
      mr: 'नैसर्गिक आपत्ती व कीडरोगांपासून पिकांच्या नुकसानीसाठी अवघ्या १.५% ते २% हप्त्यात सर्वसमावेशक पीक विमा संरक्षण.',
    },
    description: {
      en: 'A unified national crop insurance scheme providing financial support to farmers suffering crop loss or damage arising out of non-preventable natural risks, stabilizing farmer incomes and encouraging modern agricultural practices.',
      hi: 'फसल नुकसान की स्थिति में किसानों को त्वरित वित्तीय मुआवजा प्रदान करने वाली राष्ट्रीय योजना।',
      mr: 'अनैसर्गिक आपत्तीमुळे पिकांचे नुकसान झाल्यास शेतकऱ्यांना थेट आर्थिक भरपाई देणारी केंद्र सरकारची योजना.',
    },
    level: 'central',
    state: null,
    category: 'insurance',
    official_url: 'https://pmfby.gov.in',
    application_mode: 'both',
    source_citation: 'Ministry of Agriculture & Farmers Welfare, Revised PMFBY Operational Guidelines (pmfby.gov.in)',
    last_verified: '2026-10-15',
    version: '2026.2',
    is_verified_fact: true,
    benefit_type: {
      en: 'Up to 100% Sum Insured for Crop Loss (Premium only 1.5%-2%)',
      hi: 'फसल नुकसान पर 100% तक बीमा राशि (प्रीमियम मात्र 1.5%-2%)',
      mr: 'पीक नुकसानीवर १००% पर्यंत भरपाई (शेतकरी हिस्सा फक्त १.५%-२%)',
    },
    criteria: [
      {
        id: 'pmfby_occ',
        field: 'occupation',
        operator: 'eq',
        value: 'farmer',
        required: true,
        verified: true,
        explanation: {
          en: 'Applicant must be a farmer growing notified crops in notified areas (loanee or non-loanee)',
          hi: 'आवेदक किसान होना चाहिए जो अधिसूचित क्षेत्र में अधिसूचित फसल उगा रहा हो',
          mr: 'अर्जदार शेतकरी अधिसूचित भागात अधिसूचित पिके घेणारा असावा',
        },
      },
    ],
    documents: [
      {
        id: 'pmfby_doc_aadhaar',
        name: {
          en: 'Aadhaar Card',
          hi: 'आधार कार्ड',
          mr: 'आधार कार्ड',
        },
        mandatory: true,
      },
      {
        id: 'pmfby_doc_land',
        name: {
          en: 'Land Records (7/12 Extract / Khatauni / Land Possession Certificate)',
          hi: 'भूमि अभिलेख (7/12 खतौनी / भू-स्वामित्व प्रमाण)',
          mr: 'जमिनीचा ७/१२ उतारा व ८-अ दाखला',
        },
        mandatory: true,
      },
      {
        id: 'pmfby_doc_sowing',
        name: {
          en: 'Crop Sowing Certificate / Self-Declaration of Sowing',
          hi: 'फसल बुवाई प्रमाण पत्र / स्व-घोषणा पत्र',
          mr: 'पीक पेरा स्वयंघोषणापत्र किंवा तलाठी दाखला',
        },
        mandatory: true,
      },
      {
        id: 'pmfby_doc_bank',
        name: {
          en: 'Active Bank Passbook showing IFSC code and Account Number',
          hi: 'बैंक पासबुक (आईएफएससी कोड एवं खाता संख्या सहित)',
          mr: 'बँक पासबुक (आयएफएससी कोड व खाते क्रमांक असलेले)',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Apply Online or via CSC Kendra / Bank',
          hi: 'ऑनलाइन या नजदीकी सीएससी/बैंक शाखा से आवेदन करें',
          mr: 'ऑनलाइन किंवा जवळच्या सीएससी/बँक शाखेत अर्ज करा',
        },
        instruction: {
          en: 'Visit pmfby.gov.in or your local CSC Kendra / bank branch before the cutoff date for Kharif or Rabi season.',
          hi: 'खरीफ या रबी मौसम की अंतिम तिथि से पूर्व pmfby.gov.in या सीएससी पर पंजीकरण करें।',
          mr: 'खरीप किंवा रब्बी हंगामाच्या अंतिम मुदतीपूर्वी pmfby.gov.in किंवा सीएससीवर नोंदणी करा.',
        },
        location_type: 'online',
      },
      {
        step_number: 2,
        title: {
          en: 'Pay Subsidized Farmer Premium',
          hi: 'रियायती किसान प्रीमियम का भुगतान करें',
          mr: 'सवलतीच्या दरातील शेतकरी विमा हप्ता भरा',
        },
        instruction: {
          en: 'Pay nominal premium (2% for Kharif, 1.5% for Rabi, 5% for commercial/horticultural crops). Balance premium is funded by Govt.',
          hi: 'मात्र 1.5% से 2% प्रीमियम जमा करें। शेष राशि सरकार वहन करती है।',
          mr: 'फक्त १.५% ते २% हप्ता भरा; उर्वरित रक्कम शासन अनुदान म्हणून जमा करते.',
        },
        location_type: 'online',
      },
      {
        step_number: 3,
        title: {
          en: 'Direct Compensation via DBT in case of Crop Damage',
          hi: 'फसल क्षति की स्थिति में डीबीटी द्वारा सीधे खाते में मुआवजा',
          mr: 'नुकसान झाल्यास थेट बँक खात्यात विमा भरपाई जमा',
        },
        instruction: {
          en: 'In case of localized loss, intimate within 72 hours via Crop Insurance App or portal. Claims are settled directly into bank account.',
          hi: 'फसल क्षति की सूचना 72 घंटे में दें, क्लेम राशि सीधे बैंक खाते में भेजी जाती है।',
          mr: 'स्थानिक आपत्तीची माहिती ७२ तासांत ॲपवर द्या; भरपाई थेट खात्यात जमा होते.',
        },
        location_type: 'bank_branch',
      },
    ],
  },
  {
    id: 'mahadbt-farmer',
    code: 'MAHADBT-AGRI',
    name: {
      en: 'MahaDBT Maharashtra Farmer Welfare & Mechanization Portal',
      hi: 'महाडीबीटी महाराष्ट्र शेतकरी कल्याण एवं यंत्रीकरण योजना',
      mr: 'महाडीबीटी महाराष्ट्र शेतकरी कल्याण व कृषी यांत्रिकीकरण योजना',
    },
    short_summary: {
      en: 'Up to 50% capital subsidy for Maharashtra farmers on tractors, rotavators, drip irrigation, micro-irrigation, and farm ponds.',
      hi: 'महाराष्ट्र के किसानों को ट्रैक्टर, रोटावेटर, ड्रिप सिंचाई और शेततले पर 50% तक प्रत्यक्ष पूंजीगत अनुदान।',
      mr: 'महाराष्ट्रातील शेतकऱ्यांना ट्रॅक्टर, कृषी अवजारे, ठिबक सिंचन आणि शेततळ्यावर ५०% पर्यंत थेट अनुदान.',
    },
    description: {
      en: 'A state single-window portal by Government of Maharashtra offering a basket of agricultural welfare schemes under one application, including Farm Mechanization, Micro Irrigation, National Food Security Mission, and Birsa Munda Krishi Kranti Yojana.',
      hi: 'महाराष्ट्र शासन द्वारा किसानों के लिए कृषि यंत्र, सिंचाई और बागवानी योजनाओं का एकल डिजिटल मंच।',
      mr: 'महाराष्ट्र शासनाच्या कृषी विभागाचे एकाच अर्जावर सर्व कृषी योजनांचा लाभ मिळवून देणारे अधिकृत पोर्टल.',
    },
    level: 'state',
    state: 'Maharashtra',
    category: 'agriculture',
    official_url: 'https://mahadbt.maharashtra.gov.in/Farmer/AgriLogin/AgriLogin',
    application_mode: 'online',
    source_citation: 'Department of Agriculture, Government of Maharashtra (mahadbt.maharashtra.gov.in)',
    last_verified: '2026-10-15',
    version: '2026.2',
    is_verified_fact: true,
    benefit_type: {
      en: 'Up to ₹1.25 Lakh (40-50% Equipment & Irrigation Subsidy)',
      hi: '₹1.25 लाख तक (40-50% उपकरण एवं सिंचाई सब्सिडी)',
      mr: '₹१.२५ लाखांपर्यंत (४०-५०% अवजारे व सिंचन अनुदान)',
    },
    criteria: [
      {
        id: 'mdbt_state',
        field: 'state',
        operator: 'eq',
        value: 'Maharashtra',
        required: true,
        verified: true,
        explanation: {
          en: 'Applicant must be a resident farmer of Maharashtra state',
          hi: 'आवेदक महाराष्ट्र राज्य का निवासी किसान होना चाहिए',
          mr: 'अर्जदार महाराष्ट्र राज्यातील शेतकरी असणे आवश्यक आहे',
        },
      },
      {
        id: 'mdbt_occ',
        field: 'occupation',
        operator: 'eq',
        value: 'farmer',
        required: true,
        verified: true,
        explanation: {
          en: 'Applicant or family must own cultivable agricultural land in Maharashtra',
          hi: 'आवेदक के पास महाराष्ट्र में कृषि भूमि का स्वामित्व होना चाहिए',
          mr: 'अर्जदाराच्या नावावर शेतजमीन (७/१२ उतारा) असणे आवश्यक आहे',
        },
      },
    ],
    documents: [
      {
        id: 'mdbt_doc_712',
        name: {
          en: 'Digital 7/12 & 8-A Land Extract (digitally signed)',
          hi: 'डिजिटल 7/12 एवं 8-अ भू-अभिलेख',
          mr: 'डिजिटल स्वाक्षरीत ७/१२ व ८-अ उतारा',
        },
        mandatory: true,
      },
      {
        id: 'mdbt_doc_aadhaar',
        name: {
          en: 'Aadhaar Card Linked to Bank Account (DBT Enabled)',
          hi: 'आधार कार्ड (बैंक खाते से लिंक)',
          mr: 'आधार कार्ड (बँक खात्याशी संलग्न)',
        },
        mandatory: true,
      },
      {
        id: 'mdbt_doc_caste',
        name: {
          en: 'Caste Certificate (For SC/ST farmers to claim enhanced 50% subsidy)',
          hi: 'जाति प्रमाण पत्र (एससी/एसटी हेतु अतिरिक्त सब्सिडी)',
          mr: 'जात प्रमाणपत्र (अनुसूचित जाती/जमातीसाठी अधिक अनुदान)',
        },
        mandatory: false,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Create Profile on MahaDBT Farmer Portal',
          hi: 'महाडीबीटी किसान पोर्टल पर प्रोफाइल बनाएं',
          mr: 'महाडीबीटी शेतकरी पोर्टलवर नोंदणी करा',
        },
        instruction: {
          en: 'Visit mahadbt.maharashtra.gov.in, authenticate with Aadhaar OTP, and enter land holding details.',
          hi: 'mahadbt.maharashtra.gov.in पर आधार ओटीपी से लॉगिन कर जमीन का विवरण दर्ज करें।',
          mr: 'mahadbt.maharashtra.gov.in वर आधार पडताळणी करून शेतीची माहिती भरा.',
        },
        location_type: 'online',
      },
      {
        step_number: 2,
        title: {
          en: 'Select Agricultural Component & Participate in Lottery',
          hi: 'कृषि घटक चुनें और ऑनलाइन लॉटरी में भाग लें',
          mr: 'हवी असलेली योजना निवडा आणि ऑनलाइन सोडतीत भाग घ्या',
        },
        instruction: {
          en: 'Choose schemes like Tractor, Rotavator, Drip Irrigation, or Farm Pond. Selection is done transparently via computer lottery.',
          hi: 'ट्रैक्टर, रोटावेटर या ड्रिप में से चयन करें; कम्प्यूटरीकृत लॉटरी द्वारा चयन होता है।',
          mr: 'ट्रॅक्टर किंवा ठिबक सिंचन घटक निवडा; संगणकीय सोडतीद्वारे पारदर्शक निवड होते.',
        },
        location_type: 'online',
      },
      {
        step_number: 3,
        title: {
          en: 'Upload Quotation & Receive DBT Subsidy',
          hi: 'कोटेशन अपलोड करें और बैंक में सब्सिडी प्राप्त करें',
          mr: 'कोटेशन अपलोड करा व थेट बँक खात्यात अनुदान मिळवा',
        },
        instruction: {
          en: 'After selection, purchase equipment from authorized dealer, upload bill, and subsidy is transferred directly via DBT.',
          hi: 'चयन के बाद उपकरण खरीदकर बिल अपलोड करें; सब्सिडी राशि सीधे बैंक में भेजी जाती है।',
          mr: 'निवड झाल्यावर अधिकृत विक्रेत्याकडून साहित्य घेऊन बिल अपलोड करा; अनुदान थेट खात्यात जमा होईल.',
        },
        location_type: 'online',
      },
    ],
  },
  {
    id: 'mudra',
    code: 'PMMY-MUDRA',
    name: {
      en: 'Pradhan Mantri MUDRA Yojana (PMMY Loans)',
      hi: 'प्रधानमंत्री मुद्रा योजना (पीएमएमवाई ऋण)',
      mr: 'प्रधानमंत्री मुद्रा योजना (हमीमुक्त व्यवसाय कर्ज)',
    },
    short_summary: {
      en: 'Collateral-free institutional business loans up to ₹10-20 Lakhs across Shishu, Kishore, and Tarun categories for non-corporate small enterprises.',
      hi: 'गैर-कॉर्पोरेट छोटे व्यवसायों, दुकानदारों एवं कारीगरों को ₹10 से ₹20 लाख तक बिना किसी गारंटी के संस्थागत बैंक ऋण।',
      mr: 'लहान व्यावसायिक, दुकानदार आणि कारागिरांना हमीशिवाय ₹१० ते ₹२० लाखांपर्यंत सुलभ मुद्रा कर्ज.',
    },
    description: {
      en: 'A flagship scheme launched by the Prime Minister to fund the unfunded by bringing micro-enterprises into the formal financial system, providing collateral-free loans for manufacturing, processing, trading, and services.',
      hi: 'छोटे कारोबारियों को वित्तीय सुरक्षा और ऋण सहायता देने वाली राष्ट्रीय योजना।',
      mr: 'सूक्ष्म व लघू व्यावसायिकांना व्यवसाय सुरू करण्यासाठी किंवा वाढवण्यासाठी विनातारण कर्ज देणारी केंद्र सरकारची योजना.',
    },
    level: 'central',
    state: null,
    category: 'banking',
    official_url: 'https://www.mudra.org.in',
    application_mode: 'both',
    source_citation: 'Department of Financial Services, Ministry of Finance (mudra.org.in)',
    last_verified: '2026-10-15',
    version: '2026.2',
    is_verified_fact: true,
    benefit_type: {
      en: 'Collateral-Free Loan up to ₹10-20 Lakhs (Zero Processing Fee for Shishu)',
      hi: '₹10-20 लाख तक बिना गारंटी ऋण (शिशु श्रेणी में शून्य प्रोसेसिंग फीस)',
      mr: 'विनातारण ₹१०-२० लाखांपर्यंत व्यवसाय कर्ज (शिशूसाठी शून्य प्रक्रिया शुल्क)',
    },
    criteria: [
      {
        id: 'mudra_age',
        field: 'ageBand',
        operator: 'in',
        value: ['18_35', '36_50', '51_59', '60_plus'],
        required: true,
        verified: true,
        explanation: {
          en: 'Applicant must be an adult Indian citizen (18+ years) intending to run a non-farm micro enterprise',
          hi: 'आवेदक वयस्क भारतीय नागरिक (18+ वर्ष) होना चाहिए जो गैर-कृषि व्यवसाय चला रहा हो',
          mr: 'अर्जदार सज्ञान भारतीय नागरिक (१८+ वर्षे) असावा',
        },
      },
    ],
    documents: [
      {
        id: 'mudra_doc_kyc',
        name: {
          en: 'Proof of Identity & Address (Aadhaar / Voter ID / PAN Card)',
          hi: 'पहचान एवं निवास प्रमाण (आधार / पैन / वोटर आईडी)',
          mr: 'ओळख व पत्त्याचा पुरावा (आधार / पॅन / मतदान कार्ड)',
        },
        mandatory: true,
      },
      {
        id: 'mudra_doc_bank',
        name: {
          en: 'Bank Statement of Last 6 Months',
          hi: 'पिछले 6 माह का बैंक खाता विवरण',
          mr: 'मागील ६ महिन्यांचे बँक स्टेटमेंट',
        },
        mandatory: true,
      },
      {
        id: 'mudra_doc_prop',
        name: {
          en: 'Business Proposal / Quotation for Machinery / Tools',
          hi: 'व्यवसाय प्रस्ताव / मशीनरी एवं उपकरण का कोटेशन',
          mr: 'व्यवसाय प्रकल्प अहवाल / मशिनरीचे कोटेशन',
        },
        mandatory: false,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Select Loan Category & Prepare Proposal',
          hi: 'ऋण श्रेणी (शिशु/किशोर/तरुण) चुनें और प्रस्ताव तैयार करें',
          mr: 'कर्ज प्रकार (शिशू/किशोर/तरुण) निवडा आणि योजना तयार करा',
        },
        instruction: {
          en: 'Determine your loan requirement: Shishu (up to ₹50k), Kishore (₹50k-₹5L), or Tarun (₹5L-₹20L).',
          hi: 'अपनी आवश्यकता अनुसार शिशु (₹50 हजार), किशोर (₹5 लाख) या तरुण (₹20 लाख) का चयन करें।',
          mr: 'आपल्या गरजेनुसार शिशू (₹५० हजार), किशोर (₹५ लाख) किंवा तरुण (₹२० लाख) श्रेणी निवडा.',
        },
        location_type: 'online',
      },
      {
        step_number: 2,
        title: {
          en: 'Apply Online via Udyamimitra or at any Commercial Bank',
          hi: 'उद्यमीमित्र पोर्टल या किसी भी नजदीकी बैंक शाखा में आवेदन करें',
          mr: 'उद्यमीमित्र पोर्टलवर किंवा कोणत्याही बँकेत अर्ज सादर करा',
        },
        instruction: {
          en: 'Submit online at udyamimitra.in or walk into any Public/Private/Regional Rural Bank or Microfinance Institution.',
          hi: 'udyamimitra.in पर ऑनलाइन आवेदन करें या नजदीकी बैंक शाखा में फॉर्म जमा करें।',
          mr: 'udyamimitra.in वर अर्ज करा किंवा कोणत्याही राष्ट्रीयीकृत/ग्रामीण बँकेत भेट द्या.',
        },
        location_type: 'bank_branch',
      },
      {
        step_number: 3,
        title: {
          en: 'Loan Sanction & Issuance of MUDRA Debit Card',
          hi: 'ऋण स्वीकृति एवं मुद्रा डेबिट कार्ड प्राप्ति',
          mr: 'कर्ज मंजुरी आणि मुद्रा डेबिट कार्ड मिळणे',
        },
        instruction: {
          en: 'Upon approval, receive loan disbursement and a MUDRA RuPay Card for working capital withdrawals.',
          hi: 'स्वीकृति के उपरांत ऋण राशि और कार्यशील पूंजी हेतु मुद्रा रूपे कार्ड प्राप्त करें।',
          mr: 'मंजुरीनंतर व्यवसायासाठी खेळत्या भांडवलाचे मुद्रा रुपे कार्ड मिळते.',
        },
        location_type: 'bank_branch',
      },
    ],
  },
  {
    id: 'standup-india',
    code: 'STANDUP-INDIA',
    name: {
      en: 'Stand-Up India Scheme for Women and SC/ST Entrepreneurs',
      hi: 'महिला एवं एससी/एसटी उद्यमियों हेतु स्टैंड-अप इंडिया योजना',
      mr: 'महिला व अनुसूचित जाती/जमातीसाठी स्टँड-अप इंडिया योजना',
    },
    short_summary: {
      en: 'Facilitates bank loans between ₹10 Lakh and ₹1 Crore to at least one SC or ST borrower and at least one woman borrower per bank branch.',
      hi: 'प्रत्येक बैंक शाखा से कम से कम एक एससी/एसटी और एक महिला उद्यमी को नए उद्यम हेतु ₹10 लाख से ₹1 करोड़ का बैंक ऋण।',
      mr: 'प्रत्येक बँक शाखेतून किमान एक महिला व एक अनुसूचित जाती/जमाती उद्योजकाला नवीन उद्योगासाठी ₹१० लाख ते ₹१ कोटी कर्ज.',
    },
    description: {
      en: 'A central initiative to promote entrepreneurship among women and SC/ST communities for setting up greenfield enterprises in manufacturing, services, agri-allied activities, or the trading sector.',
      hi: 'महिला और वंचित वर्गों में नए उद्यम की स्थापना के लिए वित्तीय सहायता योजना।',
      mr: 'महिला आणि वंचित घटकांना स्वतःचा उद्योग सुरू करण्यासाठी भरघोस अर्थसाहाय्य देणारी योजना.',
    },
    level: 'central',
    state: null,
    category: 'livelihood',
    official_url: 'https://www.standupmitra.in',
    application_mode: 'both',
    source_citation: 'Department of Financial Services, Ministry of Finance (standupmitra.in)',
    last_verified: '2026-10-15',
    version: '2026.2',
    is_verified_fact: true,
    benefit_type: {
      en: 'Bank Loan from ₹10 Lakh to ₹1 Crore (Composite Term Loan + Working Capital)',
      hi: '₹10 लाख से ₹1 करोड़ तक बैंक ऋण (सावधि ऋण एवं कार्यशील पूंजी)',
      mr: '₹१० लाख ते ₹१ कोटी बँक कर्ज (मुदत कर्ज व खेळते भांडवल)',
    },
    criteria: [
      {
        id: 'su_age',
        field: 'ageBand',
        operator: 'in',
        value: ['18_35', '36_50', '51_59', '60_plus'],
        required: true,
        verified: true,
        explanation: {
          en: 'Applicant must be an adult Indian citizen (18+ years)',
          hi: 'आवेदक वयस्क नागरिक (18+ वर्ष) होना चाहिए',
          mr: 'अर्जदार सज्ञान नागरिक (१८+ वर्षे) असावा',
        },
      },
    ],
    documents: [
      {
        id: 'su_doc_kyc',
        name: {
          en: 'Aadhaar, PAN Card, and Residence Proof',
          hi: 'आधार कार्ड, पैन कार्ड एवं निवास प्रमाण',
          mr: 'आधार कार्ड, पॅन कार्ड आणि रहिवासी दाखला',
        },
        mandatory: true,
      },
      {
        id: 'su_doc_caste',
        name: {
          en: 'Caste Certificate (If applying under SC / ST category)',
          hi: 'जाति प्रमाण पत्र (यदि एससी/एसटी श्रेणी में आवेदन हो)',
          mr: 'जात प्रमाणपत्र (अनुसूचित जाती/जमाती प्रवर्गासाठी)',
        },
        mandatory: false,
      },
      {
        id: 'su_doc_dpr',
        name: {
          en: 'Detailed Project Report (DPR) for Greenfield Enterprise',
          hi: 'विस्तृत व्यवसाय परियोजना रिपोर्ट (DPR)',
          mr: 'नवीन उद्योगाचा सविस्तर प्रकल्प अहवाल (DPR)',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Register on StandUpMitra Portal',
          hi: 'स्टैंडअपमित्रा पोर्टल पर पंजीकरण करें',
          mr: 'स्टँडअपमित्रा पोर्टलवर नोंदणी करा',
        },
        instruction: {
          en: 'Visit standupmitra.in and choose between Trainee Borrower (handholding needed) or Ready Borrower.',
          hi: 'standupmitra.in पर पंजीकरण करें और मार्गदर्शन सहायता चुनें।',
          mr: 'standupmitra.in वर नोंदणी करून व्यवसाय माहिती भरा.',
        },
        location_type: 'online',
      },
      {
        step_number: 2,
        title: {
          en: 'Application Routing & Bank Processing',
          hi: 'बैंक शाखा चयन एवं आवेदन अग्रेषण',
          mr: 'बँक शाखा निवड व अर्जाची छाननी',
        },
        instruction: {
          en: 'Your application is routed directly to the selected bank branch or Lead District Manager (LDM).',
          hi: 'आपका आवेदन संबंधित बैंक शाखा को सीधे भेजा जाता है।',
          mr: 'आपला अर्ज थेट संबंधित बँकेकडे मंजुरीसाठी पाठवला जातो.',
        },
        location_type: 'bank_branch',
      },
      {
        step_number: 3,
        title: {
          en: 'Loan Sanction & Credit Guarantee Scheme Coverage',
          hi: 'ऋण स्वीकृति एवं क्रेडिट गारंटी सुरक्षा',
          mr: 'कर्ज मंजुरी व क्रेडिट गॅरंटी संरक्षण',
        },
        instruction: {
          en: 'Loan is sanctioned with coverage under National Credit Guarantee Trustee Company (NCGTC).',
          hi: 'स्वीकृति के बाद एनसीजीटीसी सुरक्षा के साथ ऋण जारी किया जाता है।',
          mr: 'शासकीय हमीसह कर्ज वाटप पूर्ण होते.',
        },
        location_type: 'bank_branch',
      },
    ],
  },
  {
    id: 'startup-india',
    code: 'STARTUP-INDIA',
    name: {
      en: 'Startup India Seed Fund & Tax Exemption Scheme',
      hi: 'स्टार्टअप इंडिया सीड फंड एवं कर छूट योजना',
      mr: 'स्टार्टअप इंडिया सीड फंड व कर सवलत योजना',
    },
    short_summary: {
      en: 'DPIIT official recognition, up to ₹50 Lakh seed funding, 3-year income tax exemption (Section 80-IAC), and 80% patent fee rebate.',
      hi: 'डीपीआईआईटी आधिकारिक मान्यता, ₹50 लाख तक सीड फंड, 3 वर्ष आयकर छूट और 80% पेटेंट शुल्क छूट।',
      mr: 'डीपीआयआयटी अधिकृत मान्यता, ₹५० लाखांपर्यंत सीड फंड, ३ वर्षे आयकर सवलत आणि पेटंट शुल्कात ८०% सूट.',
    },
    description: {
      en: 'A flagship initiative of the Government of India intended to catalyze startup culture and build a strong and inclusive ecosystem for innovation and entrepreneurship in India.',
      hi: 'भारत में नवोन्मेष और उद्यमिता को बढ़ावा देने वाली राष्ट्रीय स्टार्टअप योजना।',
      mr: 'भारतात नवउद्योजकतेला चालना देण्यासाठी केंद्र सरकारचा प्रमुख उपक्रम.',
    },
    level: 'central',
    state: null,
    category: 'livelihood',
    official_url: 'https://www.startupindia.gov.in',
    application_mode: 'online',
    source_citation: 'DPIIT, Ministry of Commerce and Industry (startupindia.gov.in)',
    last_verified: '2026-10-15',
    version: '2026.2',
    is_verified_fact: true,
    benefit_type: {
      en: 'Up to ₹50 Lakh Seed Grant/Debt + 100% Tax Exemption for 3 Years',
      hi: '₹50 लाख तक सीड सहायता + 3 वर्ष 100% आयकर छूट',
      mr: '₹५० लाखांपर्यंत सीड फंड + सलग ३ वर्षे १००% आयकर सवलत',
    },
    criteria: [
      {
        id: 'su_ind_age',
        field: 'ageBand',
        operator: 'in',
        value: ['18_35', '36_50', '51_59', '60_plus'],
        required: true,
        verified: true,
        explanation: {
          en: 'Founder must be an adult Indian citizen running an innovative entity incorporated within the past 10 years',
          hi: 'संस्थापक वयस्क भारतीय नागरिक होना चाहिए जिसकी इकाई पिछले 10 वर्षों में पंजीकृत हो',
          mr: 'संस्थापक सज्ञान भारतीय नागरिक असावा व संस्था मागील १० वर्षांत स्थापन झालेली असावी',
        },
      },
    ],
    documents: [
      {
        id: 'su_doc_inc',
        name: {
          en: 'Certificate of Incorporation / Partnership Deed',
          hi: 'निगमन प्रमाण पत्र / पार्टनरशिप डीड',
          mr: 'कंपनी नोंदणी प्रमाणपत्र (ROC) / भागीदारी करार',
        },
        mandatory: true,
      },
      {
        id: 'su_doc_pan',
        name: {
          en: 'Entity PAN Card & Aadhaar of Directors',
          hi: 'संस्था का पैन कार्ड एवं निदेशकों का आधार',
          mr: 'कंपनीचे पॅन कार्ड व संचालकांचे आधार कार्ड',
        },
        mandatory: true,
      },
      {
        id: 'su_doc_pitch',
        name: {
          en: 'Pitch Deck / Proof of Innovation or Scalable Business Model',
          hi: 'पिच डेक / नवाचार एवं व्यापार मॉडल विवरण',
          mr: 'व्यवसाय मॉडेल व इनोव्हेशनचे सादरीकरण (Pitch Deck)',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Incorporate Entity & Register on StartupIndia.gov.in',
          hi: 'कंपनी पंजीकृत करें और startupindia.gov.in पर प्रोफाइल बनाएं',
          mr: 'कंपनी नोंदणी करून startupindia.gov.in वर प्रोफाईल तयार करा',
        },
        instruction: {
          en: 'Incorporate your business as a Private Limited Company, LLP, or Registered Partnership and register on the national portal.',
          hi: 'startupindia.gov.in पर जाकर अपने स्टार्टअप का निशुल्क पंजीकरण करें।',
          mr: 'startupindia.gov.in वर जाऊन मोफत नोंदणी पूर्ण करा.',
        },
        location_type: 'online',
      },
      {
        step_number: 2,
        title: {
          en: 'Apply for DPIIT Recognition Certificate',
          hi: 'डीपीआईआईटी मान्यता प्रमाण पत्र हेतु ऑनलाइन आवेदन करें',
          mr: 'डीपीआयआयटी मान्यतेसाठी ऑनलाइन अर्ज करा',
        },
        instruction: {
          en: 'Submit details of innovation, scalability, and job creation potential to receive official DPIIT recognition number.',
          hi: 'नवाचार का विवरण प्रस्तुत कर आधिकारिक डीपीआईआईटी प्रमाण पत्र प्राप्त करें।',
          mr: 'इनोव्हेशनची माहिती भरून अधिकृत डीपीआयआयटी प्रमाणपत्र मिळवा.',
        },
        location_type: 'online',
      },
      {
        step_number: 3,
        title: {
          en: 'Access Seed Fund & Tax Exemption Benefits',
          hi: 'सीड फंड (SISFS) एवं 80-आईएसी आयकर छूट प्राप्त करें',
          mr: 'सीड फंड (SISFS) आणि कलम ८०-आयएसी कर सवलतीचा लाभ घ्या',
        },
        instruction: {
          en: 'Apply for Startup India Seed Fund Scheme (SISFS) through approved incubators and claim 80-IAC tax exemption via Inter-Ministerial Board.',
          hi: 'मान्यता प्राप्त इनक्यूबेटर के माध्यम से सीड फंड और कर छूट का लाभ लें।',
          mr: 'मान्यताप्राप्त इनक्युबेटरद्वारे सीड फंड आणि कर सवलतीचा लाभ मिळवा.',
        },
        location_type: 'online',
      },
    ],
  },
  {
    id: 'udyam-registration',
    code: 'UDYAM-MSME',
    name: {
      en: 'Udyam Official MSME Registration & Priority Lending',
      hi: 'उद्यम आधिकारिक एमएसएमई पंजीकरण एवं प्राथमिकता ऋण',
      mr: 'उद्यम अधिकृत सूक्ष्म, लघु व मध्यम उद्योग नोंदणी',
    },
    short_summary: {
      en: 'Free Government of India digital certificate for MSMEs granting priority sector bank credit, collateral-free loans (CGTMSE), and 50% trademark discount.',
      hi: 'निःशुल्क आधिकारिक डिजिटल एमएसएमई प्रमाण पत्र जो प्राथमिकता बैंक ऋण, बिना गारंटी पूंजी और ट्रेडमार्क छूट प्रदान करता है।',
      mr: 'मोफत अधिकृत केंद्र शासकीय उद्यम प्रमाणपत्र; प्राधान्य बँक कर्ज, हमीमुक्त भांडवल आणि ट्रेडमार्क शुल्कात ५०% सूट.',
    },
    description: {
      en: 'The sole official Government of India portal for paperless registration of Micro, Small and Medium Enterprises under the MSMED Act, integrating Income Tax and GSTIN databases with zero paperwork.',
      hi: 'भारत सरकार द्वारा एमएसएमई के लिए एकमात्र वैध एवं पूर्णतः निःशुल्क पेपरलेस पंजीकरण पोर्टल।',
      mr: 'केंद्र शासनाच्या एमएसएमई मंत्रालयाचे पूर्णपणे मोफत आणि कागदपत्रविरहित अधिकृत नोंदणी पोर्टल.',
    },
    level: 'central',
    state: null,
    category: 'livelihood',
    official_url: 'https://udyamregistration.gov.in',
    application_mode: 'online',
    source_citation: 'Ministry of MSME, Gazette Notification S.O. 2119(E) (udyamregistration.gov.in)',
    last_verified: '2026-10-15',
    version: '2026.2',
    is_verified_fact: true,
    benefit_type: {
      en: 'Permanent Official MSME Certificate + Priority Bank Lending + 50% IP Rebate',
      hi: 'स्थायी एमएसएमई प्रमाण पत्र + प्राथमिकता बैंक ऋण + 50% आईपीआर छूट',
      mr: 'कायमस्वरूपी अधिकृत उद्यम प्रमाणपत्र + प्राधान्य बँक कर्ज + ५०% शुल्क सवलत',
    },
    criteria: [
      {
        id: 'udyam_age',
        field: 'ageBand',
        operator: 'in',
        value: ['18_35', '36_50', '51_59', '60_plus'],
        required: true,
        verified: true,
        explanation: {
          en: 'Proprietor, partner, or director must be an adult Indian citizen',
          hi: 'उद्यमी वयस्क भारतीय नागरिक होना चाहिए',
          mr: 'उद्योजक सज्ञान भारतीय नागरिक असणे आवश्यक आहे',
        },
      },
    ],
    documents: [
      {
        id: 'udyam_doc_aadhaar',
        name: {
          en: 'Aadhaar Card of Proprietor / Managing Partner / Karta',
          hi: 'स्वामी / मुख्य भागीदार का आधार कार्ड',
          mr: 'मालक / भागीदार यांचे आधार कार्ड',
        },
        mandatory: true,
      },
      {
        id: 'udyam_doc_pan',
        name: {
          en: 'PAN Card of Enterprise / Individual',
          hi: 'संस्था या स्वामी का पैन कार्ड',
          mr: 'उद्योगाचे किंवा मालकाचे पॅन कार्ड',
        },
        mandatory: true,
      },
      {
        id: 'udyam_doc_bank',
        name: {
          en: 'Bank Account Number & IFSC Code',
          hi: 'बैंक खाता संख्या एवं आईएफएससी कोड',
          mr: 'बँक खाते क्रमांक आणि आयएफएससी कोड',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Visit Official Udyam Registration Portal',
          hi: 'आधिकारिक उद्यम पंजीकरण पोर्टल पर जाएं',
          mr: 'अधिकृत udyamregistration.gov.in पोर्टलवर जा',
        },
        instruction: {
          en: 'Go to udyamregistration.gov.in (Note: Registration is 100% free; beware of fake fee-charging portals).',
          hi: 'udyamregistration.gov.in पर जाएं। ध्यान दें: सरकारी पंजीकरण पूर्णतः निःशुल्क है।',
          mr: 'udyamregistration.gov.in वर जा; नोंदणी पूर्णपणे विनामूल्य आहे.',
        },
        location_type: 'online',
      },
      {
        step_number: 2,
        title: {
          en: 'Authenticate with Aadhaar & Enter PAN Details',
          hi: 'आधार ओटीपी से सत्यापन करें और पैन विवरण भरें',
          mr: 'आधार ओटीपीने पडताळणी करा आणि पॅन तपशील जोडा',
        },
        instruction: {
          en: 'Enter 12-digit Aadhaar, complete OTP authentication, and system automatically pulls investment and turnover from Income Tax data.',
          hi: 'आधार ओटीपी द्वारा सत्यापन करें, आईटीआर डेटा से निवेश एवं टर्नओवर स्वतः सत्यापित होता है।',
          mr: 'आधार ओटीपी टाकून व्यवसाय प्रकार निवडा; माहिती आपोआप पडताळली जाते.',
        },
        location_type: 'online',
      },
      {
        step_number: 3,
        title: {
          en: 'Instant Download of Udyam Registration Certificate',
          hi: 'उद्यम पंजीकरण प्रमाण पत्र तुरंत डाउनलोड करें',
          mr: 'उद्यम नोंदणी प्रमाणपत्र त्वरित डाउनलोड करा',
        },
        instruction: {
          en: 'Receive permanent Udyam Registration Number (URN) with dynamic QR code; valid for lifetime across India.',
          hi: 'क्यूआर कोड युक्त स्थायी उद्यम प्रमाण पत्र प्राप्त करें, जो आजीवन मान्य है।',
          mr: 'क्यूआर कोड असलेले कायमस्वरूपी उद्यम प्रमाणपत्र डाउनलोड करा.',
        },
        location_type: 'online',
      },
    ],
  },
  {
    id: 'mse-procurement-gem',
    code: 'MSE-PROCUREMENT-GEM',
    name: {
      en: 'Public Procurement Policy for MSEs (GeM & Tender Benefits)',
      hi: 'सूक्ष्म एवं लघु उद्यम सार्वजनिक खरीद नीति (GeM एवं ई-निविदा लाभ)',
      mr: 'सूक्ष्म व लघू उद्योग सार्वजनिक खरेदी धोरण (GeM व शासकीय टेंडर सवलती)',
    },
    short_summary: {
      en: 'Mandatory 25% annual procurement by all Central Ministries & CPSEs from MSEs, 100% free tender documents, Earnest Money Deposit (EMD) exemption, and purchase preference.',
      hi: 'सभी केंद्रीय मंत्रालयों और सीपीएसई द्वारा सूक्ष्म एवं लघु उद्योगों से 25% वार्षिक खरीद की अनिवार्यता, निःशुल्क टेंडर फॉर्म एवं बयाना राशि (EMD) छूट।',
      mr: 'सर्व केंद्रीय मंत्रालये व सीपीएसई द्वारे एमएसएमईकडून २५% वार्षिक खरेदीचे बंधन, विनामूल्य टेंडर फॉर्म, अनामत रक्कम (EMD) सवलत व खरेदी प्राधान्य.',
    },
    description: {
      en: 'A central statutory policy under Section 11 of the MSMED Act, 2006. Mandates 25% annual government procurement from Micro and Small Enterprises (including 4% from SC/ST and 3% from Women entrepreneurs), complete exemption from tender document costs and Earnest Money Deposits (EMD) across Central Government tenders on CPPP, MahaTenders, and GeM.',
      hi: 'एमएसएमई विकास अधिनियम, 2006 की धारा 11 के तहत वैधानिक नीति। इसके तहत सभी केंद्रीय मंत्रालयों और सीपीएसई में 25% अनिवार्य खरीद, टेंडर फॉर्म शुल्क माफी और ईएमडी से पूर्ण छूट प्रदान की जाती है।',
      mr: 'एमएसएमई विकास कायदा, २००६ च्या कलम ११ अंतर्गत वैधानिक धोरण. केंद्र सरकारची सर्व मंत्रालये आणि सार्वजनिक उपक्रमांना २५% खरेदी लघू उद्योगांकडून करणे बंधनकारक असून टेंडर फी व ईएमडी अनामत रक्कमेतून १००% सवलत मिळते.',
    },
    level: 'central',
    state: null,
    category: 'livelihood',
    official_url: 'https://gem.gov.in',
    application_mode: 'online',
    source_citation: 'Ministry of MSME & Department of Expenditure, Public Procurement Policy Order (gem.gov.in & eprocure.gov.in)',
    last_verified: '2026-10-20',
    version: '2026.2',
    is_verified_fact: true,
    benefit_type: {
      en: '25% Procurement Quota + 100% Free Tender Docs + EMD Waiver',
      hi: '25% खरीद कोटा + निःशुल्क टेंडर दस्तावेज + ईएमडी छूट',
      mr: '२५% खरेदी कोटा + विनामूल्य टेंडर + ईएमडी अनामत सवलत',
    },
    criteria: [
      {
        id: 'gem_age',
        field: 'ageBand',
        operator: 'in',
        value: ['18_35', '36_50', '51_59', '60_plus'],
        required: true,
        verified: true,
        explanation: {
          en: 'Applicant must be an adult Indian citizen running or setting up an enterprise / business',
          hi: 'आवेदक वयस्क नागरिक (18+ वर्ष) होना चाहिए जो उद्यम या व्यवसाय संचालित कर रहा हो',
          mr: 'अर्जदार सज्ञान नागरिक (१८+ वर्षे) असावा जो व्यवसाय किंवा उद्योग चालवत आहे',
        },
      },
    ],
    documents: [
      {
        id: 'gem_doc_udyam',
        name: {
          en: 'Udyam Registration Certificate (Micro or Small Enterprise)',
          hi: 'उद्यम पंजीकरण प्रमाण पत्र (सूक्ष्म या लघु उद्यम)',
          mr: 'उद्यम नोंदणी प्रमाणपत्र (सूक्ष्म किंवा लघू उद्योग)',
        },
        mandatory: true,
      },
      {
        id: 'gem_doc_pan',
        name: {
          en: 'Permanent Account Number (PAN Card)',
          hi: 'पैन कार्ड (व्यवसाय या स्वामी का)',
          mr: 'पॅन कार्ड (उद्योग किंवा मालकाचे)',
        },
        mandatory: true,
      },
      {
        id: 'gem_doc_bank',
        name: {
          en: 'Active Bank Account with IFSC Code & Cancelled Cheque',
          hi: 'सक्रिय बैंक खाता विवरण एवं रद्द चेक',
          mr: 'सक्रिय बँक खाते तपशील आणि कॅन्सल्ड चेक',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Obtain Udyam MSME Registration',
          hi: 'निःशुल्क उद्यम पंजीकरण प्राप्त करें',
          mr: 'मोफत उद्यम नोंदणी पूर्ण करा',
        },
        instruction: {
          en: 'Register your business on udyamregistration.gov.in for free to receive the official URN required for all tender exemptions.',
          hi: 'udyamregistration.gov.in पर निःशुल्क पंजीकरण कर उद्यम नंबर (URN) प्राप्त करें।',
          mr: 'udyamregistration.gov.in वर मोफत नोंदणी करून उद्यम क्रमांक (URN) मिळवा.',
        },
        location_type: 'online',
      },
      {
        step_number: 2,
        title: {
          en: 'Register as Primary Seller on GeM & CPPP',
          hi: 'GeM और CPPP पर विक्रेता खाता बनाएं',
          mr: 'GeM आणि CPPP पोर्टलवर विक्रेता नोंदणी करा',
        },
        instruction: {
          en: 'Create your primary seller account on Government e-Marketplace (gem.gov.in) and CPPP eProcure (eprocure.gov.in) with your Aadhaar and PAN.',
          hi: 'gem.gov.in और eprocure.gov.in पर अपने आधार और पैन द्वारा विक्रेता खाता पंजीकृत करें।',
          mr: 'gem.gov.in आणि eprocure.gov.in वर आधार व पॅनद्वारे विक्रेता खाते तयार करा.',
        },
        location_type: 'online',
      },
      {
        step_number: 3,
        title: {
          en: 'Participate in Tenders with Automatic EMD Waiver',
          hi: 'ईएमडी और टेंडर शुल्क छूट के साथ बोली लगाएं',
          mr: 'ईएमडी अनामत रक्कम सवलतीसह टेंडरमध्ये भाग घ्या',
        },
        instruction: {
          en: 'Bid for Central and State tenders; enter your Udyam URN to automatically waive tender document fee and Earnest Money Deposit (EMD).',
          hi: 'सरकारी टेंडर में बोली लगाएं; उद्यम यूआरएन दर्ज करते ही टेंडर फीस और ईएमडी स्वतः माफ हो जाती है।',
          mr: 'टेंडर भरताना उद्यम क्रमांक नोंदवा; टेंडर फी व ईएमडी अनामत रक्कम आपोआप माफ होईल.',
        },
        location_type: 'online',
      },
    ],
  },
  {
    id: 'lakhpati-didi',
    code: 'LAKHPATI-DIDI',
    name: {
      en: 'Lakhpati Didi (SHG Financial Support & Livelihood Mission)',
      hi: 'लखपति दीदी योजना (महिला स्वयं सहायता समूह आजीविका संवर्धन)',
      mr: 'लखपती दीदी योजना (महिला बचत गट आर्थिक सबलीकरण)',
    },
    short_summary: {
      en: 'Enables rural women in Self-Help Groups (SHGs) to earn a sustainable income of at least ₹1 Lakh per year through credit access, skill training, and market support.',
      hi: 'स्वयं सहायता समूहों की ग्रामीण महिलाओं को प्रति वर्ष न्यूनतम ₹1 लाख की स्थायी आय अर्जित कराने हेतु ऋण, कौशल और बाजार सहायता।',
      mr: 'ग्रामीण भागातील महिला बचत गटांना कौशल्य विकास, विनातारण कर्ज व बाजारपेठ जोडून दरवर्षी किमान ₹१ लाख उत्पन्न मिळवून देणारी योजना.',
    },
    description: {
      en: 'A flagship national initiative by the Ministry of Rural Development under DAY-NRLM. It aims to create 3 Crore "Lakhpati Didis" across rural India by providing credit linkage at 7% subsidized interest, enterprise incubation, drone pilot training, and market onboarding on GeM and ONDC.',
      hi: 'ग्रामीण विकास मंत्रालय, भारत सरकार का राष्ट्रीय अभियान। इसका उद्देश्य महिला बचत समूहों की 3 करोड़ बहनों को कृषि, पशुपालन, ड्रोन संचालन एवं कुटीर उद्योग द्वारा सालाना ₹1 लाख से अधिक की स्थायी आय सुनिश्चित कराना है।',
      mr: 'केंद्र शासनाचा महत्त्वाकांक्षी उपक्रम. महिला बचत गटांतील ३ कोटी महिलांना शेती, दुग्धव्यवसाय, ड्रोन संचालन व हस्तकलेद्वारे दरवर्षी ₹१ लाखांपेक्षा जास्त खात्रीशीर उत्पन्न मिळवून देण्यासाठी सवलतीचे कर्ज व तांत्रिक पाठबळ दिले जाते.',
    },
    level: 'central',
    state: null,
    category: 'women_child',
    official_url: 'https://lakhpatididi.gov.in',
    application_mode: 'both',
    source_citation: 'Ministry of Rural Development, DAY-NRLM Lakhpati Didi Guidelines (lakhpatididi.gov.in)',
    last_verified: '2026-10-20',
    version: '2026.2',
    is_verified_fact: true,
    benefit_type: {
      en: '₹1 Lakh+ Annual Sustainable Income & Collateral-Free Loans at 7% Interest',
      hi: '₹1 लाख+ वार्षिक स्थायी आय एवं 7% ब्याज पर बिना गारंटी बैंक ऋण',
      mr: 'दरवर्षी ₹१ लाख+ उत्पन्न व ७% सवलतीच्या व्याजाने विनातारण बँक कर्ज',
    },
    criteria: [
      {
        id: 'ld_gender',
        field: 'gender',
        operator: 'eq',
        value: 'female',
        required: true,
        verified: true,
        explanation: {
          en: 'Applicant must be a female citizen belonging to a registered Self-Help Group (SHG)',
          hi: 'आवेदक महिला नागरिक होनी चाहिए जो पंजीकृत स्वयं सहायता समूह (बचत गट) की सदस्य हो',
          mr: 'अर्जदार महिला नोंदणीकृत बचत गटाची सदस्य असणे आवश्यक आहे',
        },
      },
      {
        id: 'ld_age',
        field: 'ageBand',
        operator: 'in',
        value: ['18_35', '36_50', '51_59', '60_plus'],
        required: true,
        verified: true,
        explanation: {
          en: 'Applicant must be an adult rural woman (18+ years of age)',
          hi: 'आवेदक वयस्क ग्रामीण महिला (18 वर्ष या अधिक) होनी चाहिए',
          mr: 'अर्जदार सज्ञान महिला (वय १८ वर्षे किंवा अधिक) असणे आवश्यक आहे',
        },
      },
    ],
    documents: [
      {
        id: 'ld_doc_aadhaar',
        name: {
          en: 'Aadhaar Card of Applicant',
          hi: 'आवेदिका का आधार कार्ड',
          mr: 'अर्जदार महिलेचे आधार कार्ड',
        },
        mandatory: true,
      },
      {
        id: 'ld_doc_bank',
        name: {
          en: 'Active Bank Passbook (Linked to Aadhaar for DBT)',
          hi: 'बैंक पासबुक (डीबीटी हेतु आधार से लिंक)',
          mr: 'बँक पासबुक (आधार लिंक असलेले)',
        },
        mandatory: true,
      },
      {
        id: 'ld_doc_shg',
        name: {
          en: 'SHG Membership Passbook & Gram Sangha Resolution Copy',
          hi: 'स्वयं सहायता समूह पासबुक एवं ग्राम संगठन का प्रस्ताव',
          mr: 'बचत गट पासबुक व ग्राम संघाचा ठराव प्रत',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Join or Form a Women SHG under DAY-NRLM',
          hi: 'DAY-NRLM के तहत महिला स्वयं सहायता समूह से जुड़ें',
          mr: 'गावात महिला बचत गटाची स्थापना करा किंवा सहभागी व्हा',
        },
        instruction: {
          en: 'Contact your Village Organization (VO) or Cluster Coordinator to join an active SHG practicing regular savings and Panchasutri.',
          hi: 'अपने ग्राम संगठन या संकुल समन्वयक से संपर्क कर बचत समूह में शामिल हों।',
          mr: 'गावातील ग्राम संघ किंवा प्रेरकांशी संपर्क साधून नियमित बचत सुरू करा.',
        },
        location_type: 'online',
      },
      {
        step_number: 2,
        title: {
          en: 'Prepare Micro-Investment Plan & Undergo Skill Training',
          hi: 'आजीविका योजना बनाएं और कौशल प्रशिक्षण प्राप्त करें',
          mr: 'उपजीविका सूक्ष्म आराखडा तयार करा व कौशल्य प्रशिक्षण घ्या',
        },
        instruction: {
          en: 'Choose an enterprise (agriculture, dairy, processing, Namo Drone Didi) and receive free skill development support.',
          hi: 'डेयरी, कृषि प्रसंस्करण या ड्रोन संचालन जैसे क्षेत्रों में निःशुल्क प्रशिक्षण प्राप्त करें।',
          mr: 'शेतीपूरक उद्योग, दुग्धव्यवसाय किंवा ड्रोन संचलनाचे विनामूल्य प्रशिक्षण घ्या.',
        },
        location_type: 'csc_kendra',
      },
      {
        step_number: 3,
        title: {
          en: 'Avail Subsidized Bank Loan & Market Access',
          hi: 'रियायती बैंक ऋण एवं बाजार मंच का लाभ लें',
          mr: 'कमी व्याजात बँक कर्ज मिळवून उत्पादनाची विक्री करा',
        },
        instruction: {
          en: 'Access credit linkage with 7% interest subvention and sell products through SARAS fairs, GeM, and ONDC.',
          hi: '7% रियायती ब्याज दर पर बैंक ऋण प्राप्त करें और सरस मेलों एवं GeM पर उत्पाद बेचें।',
          mr: 'बँकेकडून सवलतीचे कर्ज मिळवून सरस प्रदर्शन व ई-कॉमर्सद्वारे उत्पन्न वाढवा.',
        },
        location_type: 'bank_branch',
      },
    ],
  },
  {
    id: 'umed-msrlm',
    code: 'UMED-MSRLM',
    name: {
      en: 'UMED – Maharashtra State Rural Livelihoods Mission',
      hi: 'उमेद – महाराष्ट्र राज्य ग्रामीण जीवनोन्नती अभियान (MSRLM)',
      mr: 'उमेद – महाराष्ट्र राज्य ग्रामीण जीवनोन्नती अभियान (MSRLM)',
    },
    short_summary: {
      en: 'Provides ₹15,000 Revolving Fund (RF) and up to ₹1.5 Lakh Community Investment Fund (CIF) for women Self-Help Groups in Maharashtra.',
      hi: 'महाराष्ट्र में महिला स्वयं सहायता समूहों को ₹15,000 परिक्रामी निधि और ₹1.5 लाख तक सामुदायिक निवेश निधि (CIF) सहायता।',
      mr: 'महाराष्ट्रातील महिला बचत गटांना ₹१५,००० फिरता निधी व ₹१.५ लाखांपर्यंत समुदाय गुंतवणूक निधी (CIF) थेट अनुदान.',
    },
    description: {
      en: 'An autonomous mission under the Rural Development & Panchayati Raj Department, Government of Maharashtra. Aims to alleviate rural poverty by mobilizing women into SHGs, providing institutional micro-finance, livelihood enhancement, and backward-forward market linkages across all districts of Maharashtra.',
      hi: 'ग्राम विकास एवं पंचायती राज विभाग, महाराष्ट्र शासन द्वारा संचालित मिशन। इसके तहत महिलाओं को बचत समूहों में संगठित कर परिक्रामी निधि (RF), समुदाय निवेश निधि (CIF) और बैंक लिंकेज के माध्यम से आत्मनिर्भर बनाया जाता है।',
      mr: 'ग्रामविकास व पंचायतराज विभाग, महाराष्ट्र शासनाचा महत्त्वाचा उपक्रम. राज्यातील ग्रामीण भागातील दारिद्र्य निर्मूलनासाठी महिलांना बचत गटात संघटित करून फिरता निधी, समुदाय गुंतवणूक निधी आणि बँक कर्जाद्वारे कायमस्वरूपी उपजीविका मिळवून दिली जाते.',
    },
    level: 'state',
    state: 'Maharashtra',
    category: 'women_child',
    official_url: 'https://umed.in',
    application_mode: 'both',
    source_citation: 'Rural Development & Panchayati Raj Department, Govt. of Maharashtra (umed.in)',
    last_verified: '2026-10-20',
    version: '2026.2',
    is_verified_fact: true,
    benefit_type: {
      en: '₹15,000 Revolving Fund + ₹1.5 Lakh Community Investment Fund (CIF)',
      hi: '₹15,000 परिक्रामी निधि + ₹1.5 लाख समुदाय निवेश निधि (CIF)',
      mr: '₹१५,००० फिरता निधी + ₹१.५ लाख समुदाय गुंतवणूक निधी (CIF)',
    },
    criteria: [
      {
        id: 'umed_state',
        field: 'state',
        operator: 'eq',
        value: 'Maharashtra',
        required: true,
        verified: true,
        explanation: {
          en: 'Applicant must be a resident of Maharashtra state',
          hi: 'आवेदक महाराष्ट्र राज्य का निवासी होना चाहिए',
          mr: 'अर्जदार महिला महाराष्ट्र राज्यातील रहिवासी असणे आवश्यक आहे',
        },
      },
      {
        id: 'umed_gender',
        field: 'gender',
        operator: 'eq',
        value: 'female',
        required: true,
        verified: true,
        explanation: {
          en: 'Applicant must be a female member of a registered Self-Help Group (बचत गट)',
          hi: 'आवेदक महिला स्वयं सहायता समूह (बचत गट) की सदस्य होनी चाहिए',
          mr: 'अर्जदार नोंदणीकृत महिला बचत गटाची सदस्य असणे आवश्यक आहे',
        },
      },
    ],
    documents: [
      {
        id: 'umed_doc_aadhaar',
        name: {
          en: 'Aadhaar Card of Member',
          hi: 'महिला सदस्य का आधार कार्ड',
          mr: 'बचत गट सदस्याचे आधार कार्ड',
        },
        mandatory: true,
      },
      {
        id: 'umed_doc_shg',
        name: {
          en: 'SHG Registration, Bank Account Passbook & Panchasutri Register',
          hi: 'बचत समूह पंजीकरण, बैंक पासबुक एवं पंचसूत्री रजिस्टर',
          mr: 'बचत गट नोंदणी, बँक पासबुक व पंचसूत्री रजिस्टर प्रत',
        },
        mandatory: true,
      },
      {
        id: 'umed_doc_residence',
        name: {
          en: 'Domicile / Ration Card / Proof of Residence in Maharashtra',
          hi: 'महाराष्ट्र निवास प्रमाण / राशन कार्ड',
          mr: 'महाराष्ट्रातील रहिवासी दाखला / शिधापत्रिका (रेशन कार्ड)',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Form SHG & Practice Panchasutri for 3 Months',
          hi: 'बचत समूह बनाएं और 3 महीने पंचसूत्री का पालन करें',
          mr: 'महिला बचत गट स्थापन करा व ३ महिने नियमित पंचसूत्रीचे पालन करा',
        },
        instruction: {
          en: 'Hold weekly meetings, regular internal lending, and prompt repayments to qualify for official UMED grading.',
          hi: 'नियमित साप्ताहिक बैठक, बचत और आंतरिक लेन-देन करें ताकि उमेद ग्रेडिंग में पात्र हो सकें।',
          mr: 'साप्ताहिक बैठक, नियमित बचत आणि वेळेत कर्जफेड करून उमेद मूल्यांकन पूर्ण करा.',
        },
        location_type: 'online',
      },
      {
        step_number: 2,
        title: {
          en: 'Receive ₹15,000 Revolving Fund (RF) & Open Savings Bank Account',
          hi: '₹15,000 परिक्रामी निधि (RF) प्राप्त करें और बैंक खाता खोलें',
          mr: 'बचत गटाला ₹१५,००० फिरता निधी मिळवा व राष्ट्रीयीकृत बँकेत खाते उघडा',
        },
        instruction: {
          en: 'After positive grading, government sanctions ₹15,000 Revolving Fund directly into the SHG bank account.',
          hi: 'प्रथम श्रेणी मूल्यांकन के बाद ₹15,000 की परिक्रामी निधि सीधे बचत समूह के खाते में जमा होती है।',
          mr: 'पहिल्या श्रेणी मूल्यांकनानंतर शासनाचा ₹१५,००० फिरता निधी थेट बचत गटाच्या खात्यात जमा होतो.',
        },
        location_type: 'bank_branch',
      },
      {
        step_number: 3,
        title: {
          en: 'Access Community Investment Fund (CIF) up to ₹1.5 Lakh & Bank Linkage',
          hi: 'समुदाय निवेश निधि (CIF) ₹1.5 लाख एवं बैंक लिंकेज ऋण प्राप्त करें',
          mr: 'समुदाय गुंतवणूक निधी (CIF) ₹१.५ लाखांपर्यंत व बँक कर्ज मिळवा',
        },
        instruction: {
          en: 'Submit Micro-Credit Plan through Village Organization (VO) to receive CIF and subsidized bank credit up to ₹10 Lakhs.',
          hi: 'ग्राम संगठन के माध्यम से सीआईएफ और कम ब्याज दर पर ₹10 लाख तक बैंक ऋण प्राप्त करें।',
          mr: 'ग्रामसंघाकडे सूक्ष्म पत आराखडा सादर करून व्यवसाय विस्तारासाठी भरघोस भांडवल मिळवा.',
        },
        location_type: 'bank_branch',
      },
    ],
  },

  // ==========================================
  // STATE FLAGSHIP WELFARE SCHEMES (PAN-INDIA)
  // ==========================================

  // 1. Karnataka: Gruha Lakshmi Scheme
  {
    id: 'ka-gruha-lakshmi',
    code: 'KA-GLS',
    name: {
      en: 'Gruha Lakshmi Scheme (Karnataka)',
      hi: 'गृह लक्ष्मी योजना (कर्नाटक)',
      mr: 'गृह लक्ष्मी योजना (कर्नाटक)',
    },
    short_summary: {
      en: 'Direct monthly financial assistance of ₹2,000 to woman head of family.',
      hi: 'परिवार की महिला मुखिया को ₹2,000 प्रतिमाह प्रत्यक्ष वित्तीय सहायता।',
      mr: 'कुटुंबातील महिला प्रमुखाला दरमहा ₹२,००० थेट बँक खात्यात आर्थिक मदत.',
    },
    description: {
      en: 'A flagship Karnataka guarantee providing monthly cash support of ₹2,000 via Aadhaar-enabled DBT to female heads of household possessing an Antyodaya, BPL, or APL ration card.',
      hi: 'कर्नाटक सरकार द्वारा बीपीएल/अंत्योदय राशन कार्ड धारक परिवारों की महिला मुखिया को ₹2,000 प्रति माह की आर्थिक सहायता।',
      mr: 'कर्नाटक शासनाची अंत्योदय व बीपीएल शिधापत्रिकाधारक कुटुंबातील महिला प्रमुखांना ₹२,००० प्रतिमहिना डीबीटी सहाय्य देणारी योजना.',
    },
    level: 'state',
    state: 'Karnataka',
    category: 'women_child',
    official_url: 'https://sevasindhu.karnataka.gov.in',
    application_mode: 'both',
    source_citation: 'Department of Women & Child Development, Government of Karnataka (sevasindhu.karnataka.gov.in)',
    last_verified: '2026-09-15',
    version: '2026.1',
    is_verified_fact: true,
    benefit_type: {
      en: '₹2,000 / month DBT cash transfer',
      hi: '₹2,000 / माह डीबीटी नकद अंतरण',
      mr: '₹२,००० / महिना डीबीटी बँक खात्यात',
    },
    criteria: [
      {
        id: 'kagl_gen',
        field: 'gender',
        operator: 'eq',
        value: 'female',
        required: true,
        verified: true,
        explanation: {
          en: 'Beneficiary must be a female head of family recognized on the ration card',
          hi: 'राशन कार्ड पर दर्ज परिवार की महिला मुखिया पात्र हैं',
          mr: 'शिधापत्रिकेवर महिला कुटुंबप्रमुख असणे आवश्यक आहे',
        },
      },
      {
        id: 'kagl_inc',
        field: 'incomeBand',
        operator: 'in',
        value: ['below_1lakh', '1lakh_2_5lakh'],
        required: true,
        verified: true,
        explanation: {
          en: 'Beneficiary or spouse must not be income tax or GST payers',
          hi: 'आवेदक अथवा पति आयकरदाता या जीएसटी पंजीकृत नहीं होने चाहिए',
          mr: 'अर्जदार महिला किंवा पती आयकरदाता अथवा जीएसटी करदाता नसावेत',
        },
      },
    ],
    documents: [
      {
        id: 'kagl_doc_rc',
        name: {
          en: 'Karnataka Ration Card (BPL / Antyodaya / APL with woman as head)',
          hi: 'कर्नाटक राशन कार्ड (महिला मुखिया के नाम दर्ज)',
          mr: 'कर्नाटक रेशन कार्ड (महिला प्रमुख नोंद असलेले)',
        },
        mandatory: true,
      },
      {
        id: 'kagl_doc_aadhaar',
        name: {
          en: 'Aadhaar Card linked to Bank Account (NPCI Active)',
          hi: 'आधार कार्ड (बैंक खाते व एनपीसीआई से जुड़ा हुआ)',
          mr: 'आधार कार्ड (बँक खात्याशी संलग्न व एनपीसीआय मॅपिंगसह)',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Visit Seva Sindhu or Grama One / Karnataka One Center',
          hi: 'सेवा सिंधु पोर्टल या ग्राम वन / कर्नाटक वन केंद्र पर जाएं',
          mr: 'सेवा सिंधू पोर्टल किंवा ग्राम वन केंद्रावर जा',
        },
        instruction: {
          en: 'Apply online through Seva Sindhu portal or visit nearest Grama One/Bapuji Seva Kendra with Ration card and Aadhaar.',
          hi: 'राशन कार्ड और आधार कार्ड लेकर नजदीकी ग्राम वन केंद्र पर जाएं या ऑनलाइन आवेदन करें।',
          mr: 'राशन कार्ड व आधार कार्ड घेऊन जवळच्या ग्राम वन केंद्रावर जाऊन अर्ज सादर करा.',
        },
        location_type: 'online',
      },
      {
        step_number: 2,
        title: {
          en: 'Verify Aadhaar Biometric / OTP & Bank Linkage',
          hi: 'आधार बायोमेट्रिक/ओटीपी सत्यापन और बैंक लिंकेज करें',
          mr: 'आधार बायोमेट्रिक/ओटीपी पडताळणी व बँक खाते जोडणी करा',
        },
        instruction: {
          en: 'Complete e-KYC and ensure active Aadhaar seeding with the bank account for smooth direct benefit transfer.',
          hi: 'ई-केवाईसी पूर्ण करें और खाते में आधार डीबीटी सक्रिय होना सुनिश्चित करें।',
          mr: 'ई-केवायसी पूर्ण करा आणि थेट खात्यात रक्कम येण्यासाठी आधार सीडिंग खात्री करा.',
        },
        location_type: 'csc_kendra',
      },
    ],
  },

  // 2. Karnataka: Yuva Nidhi Scheme
  {
    id: 'ka-yuva-nidhi',
    code: 'KA-YNS',
    name: {
      en: 'Yuva Nidhi Scheme (Karnataka)',
      hi: 'युवा निधि योजना (कर्नाटक)',
      mr: 'युवा निधी योजना (कर्नाटक)',
    },
    short_summary: {
      en: 'Monthly unemployment allowance of ₹3,000 for graduates and ₹1,500 for diploma holders for up to 2 years.',
      hi: 'बेरोजगार स्नातकों को ₹3,000 और डिप्लोमा धारकों को ₹1,500 प्रति माह बेरोजगारी भत्ता।',
      mr: 'बेरोजगार पदवीधरांना दरमहा ₹३,००० व पदविका धारकांना ₹१,५०० भत्ता (२ वर्षांसाठी).',
    },
    description: {
      en: 'Unemployment financial cushion by Karnataka Government for youth who completed their degree/diploma and remain unemployed after 6 months of course completion.',
      hi: 'कर्नाटक के डिग्री एवं डिप्लोमा उत्तीर्ण युवाओं के लिए बेरोजगारी सहायता योजना।',
      mr: 'कर्नाटकातील पदवीधर व डिप्लोमा उत्तीर्ण बेरोजगार तरुणांसाठी आर्थिक सहाय्य योजना.',
    },
    level: 'state',
    state: 'Karnataka',
    category: 'livelihood',
    official_url: 'https://sevasindhuservices.karnataka.gov.in',
    application_mode: 'online',
    source_citation: 'Department of Skill Development & Livelihood, Karnataka (sevasindhu.karnataka.gov.in)',
    last_verified: '2026-09-15',
    version: '2026.1',
    is_verified_fact: true,
    benefit_type: {
      en: '₹3,000/mo (Degree) / ₹1,500/mo (Diploma)',
      hi: '₹3,000/माह (डिग्री) / ₹1,500/माह (डिप्लोमा)',
      mr: '₹३,०००/महिना (पदवी) / ₹१,५००/महिना (डिप्लोमा)',
    },
    criteria: [
      {
        id: 'kayn_age',
        field: 'ageBand',
        operator: 'in',
        value: ['18_35'],
        required: true,
        verified: true,
        explanation: {
          en: 'Applicable to youth aged 18 to 35 who passed out within eligible academic years',
          hi: '18 से 35 वर्ष के डिग्री/डिप्लोमा उत्तीर्ण युवा पात्र हैं',
          mr: '१८ ते ३५ वर्षे वयोगटातील पदवीधर किंवा डिप्लोमाधारक तरुण पात्र आहेत',
        },
      },
      {
        id: 'kayn_occ',
        field: 'occupation',
        operator: 'in',
        value: ['unemployed', 'student'],
        required: true,
        verified: true,
        explanation: {
          en: 'Applicant must not be employed in government or formal private sector',
          hi: 'आवेदक सरकारी या औपचारिक निजी नौकरी में कार्यरत नहीं होना चाहिए',
          mr: 'अर्जदार शासकीय अथवा औपचारिक खाजगी सेवेत नोकरीवर नसावा',
        },
      },
    ],
    documents: [
      {
        id: 'kayn_doc_degree',
        name: {
          en: 'Degree or Diploma Marks Card / Convocation Certificate',
          hi: 'डिग्री या डिप्लोमा अंकपत्र / उपाधि प्रमाण पत्र',
          mr: 'पदवी किंवा डिप्लोमा गुणपत्रिका / प्रमाणपत्र',
        },
        mandatory: true,
      },
      {
        id: 'kayn_doc_domicile',
        name: {
          en: 'Karnataka Domicile Certificate / Resident proof (studied 6+ years in KA)',
          hi: 'कर्नाटक निवास प्रमाण पत्र',
          mr: 'कर्नाटक अधिवास दाखला (किमान ६ वर्षे शिक्षण)',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Register on Seva Sindhu Yuva Nidhi Portal',
          hi: 'सेवा सिंधु युवा निधि पोर्टल पर पंजीकरण करें',
          mr: 'सेवा सिंधू युवा निधी पोर्टलवर नोंदणी करा',
        },
        instruction: {
          en: 'Authenticate with Aadhaar and enter university degree registration number to fetch credentials from National Academic Depository (NAD).',
          hi: 'आधार प्रमाणीकरण करें और एनएडी डेटाबेस से सत्यापन हेतु डिग्री रोल नंबर दर्ज करें।',
          mr: 'आधार ऑथेंटिकेशन करून पदवी नोंदणी क्रमांक टाका आणि ई-पडताळणी करा.',
        },
        location_type: 'online',
      },
    ],
  },

  // 3. West Bengal: Lakshmir Bhandar Scheme
  {
    id: 'wb-lakshmir-bhandar',
    code: 'WB-LBS',
    name: {
      en: "Lakshmir Bhandar Scheme (West Bengal)",
      hi: 'लक्ष्मी भंडार योजना (पश्चिम बंगाल)',
      mr: 'लक्ष्मी भंडार योजना (पश्चिम बंगाल)',
    },
    short_summary: {
      en: 'Direct monthly financial support of ₹1,000 for general and ₹1,200 for SC/ST women aged 25-60.',
      hi: '25-60 वर्ष की सामान्य वर्ग की महिलाओं को ₹1,000 एवं अनुसूचित जाति/जनजाति को ₹1,200 प्रतिमाह।',
      mr: '२५-६० वयोगटातील सामान्य महिलांना दरमहा ₹१,००० व एससी/एसटी महिलांना ₹१,२०० थेट मदत.',
    },
    description: {
      en: "West Bengal government's landmark universal basic income guarantee providing regular monthly DBT cash support into bank accounts of female heads of household across the state.",
      hi: 'पश्चिम बंगाल सरकार द्वारा महिलाओं के आर्थिक सशक्तिकरण हेतु मासिक आर्थिक सहायता योजना।',
      mr: 'पश्चिम बंगाल शासनाची महिलांना दरमहा बँक खात्यात थेट अनुदान देणारी कल्याणकारी योजना.',
    },
    level: 'state',
    state: 'West Bengal',
    category: 'women_child',
    official_url: 'https://socialsecurity.wb.gov.in',
    application_mode: 'both',
    source_citation: 'Department of Women & Child Development and Social Welfare, West Bengal (socialsecurity.wb.gov.in)',
    last_verified: '2026-09-15',
    version: '2026.1',
    is_verified_fact: true,
    benefit_type: {
      en: '₹1,000 - ₹1,200 / month DBT cash',
      hi: '₹1,000 - ₹1,200 / माह डीबीटी नकद',
      mr: '₹१,००० - ₹१,२०० / महिना बँक खात्यात',
    },
    criteria: [
      {
        id: 'wblb_gen',
        field: 'gender',
        operator: 'eq',
        value: 'female',
        required: true,
        verified: true,
        explanation: {
          en: 'Beneficiary must be a female resident of West Bengal',
          hi: 'आवेदक पश्चिम बंगाल की महिला निवासी होनी चाहिए',
          mr: 'अर्जदार पश्चिम बंगालमधील महिला रहिवासी असणे आवश्यक आहे',
        },
      },
      {
        id: 'wblb_age',
        field: 'ageBand',
        operator: 'in',
        value: ['18_35', '36_50', '51_59'],
        required: true,
        verified: true,
        explanation: {
          en: 'Women between 25 and 60 years of age qualify for the scheme',
          hi: '25 से 60 वर्ष की आयु की महिलाएं इस योजना के लिए पात्र हैं',
          mr: '२५ ते ६० वर्षे वयोगटातील महिला या योजनेसाठी पात्र आहेत',
        },
      },
    ],
    documents: [
      {
        id: 'wblb_doc_swasthya',
        name: {
          en: 'Swasthya Sathi Card / Health Card',
          hi: 'स्वास्थ्य साथी कार्ड',
          mr: 'स्वास्थ्य साथी आरोग्य कार्ड',
        },
        mandatory: true,
      },
      {
        id: 'wblb_doc_bank',
        name: {
          en: 'Aadhaar-seeded Single Bank Account Passbook',
          hi: 'आधार-लिंक्ड बैंक खाता पासबुक',
          mr: 'आधार जोडलेले वैयक्तिक बँक पासबुक',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Apply at Duare Sarkar Camp or BDO / Municipality Office',
          hi: 'दुआरे सरकार कैंप या बीडीओ/नगरपालिका कार्यालय में आवेदन करें',
          mr: 'द्वारे सरकार शिबिर किंवा बीडीओ कार्यालयात अर्ज करा',
        },
        instruction: {
          en: 'Collect and submit free Lakshmir Bhandar application form at Duare Sarkar camp along with Swasthya Sathi and Aadhaar copies.',
          hi: 'दुआरे सरकार शिविर में निःशुल्क फॉर्म भरकर स्वास्थ्य साथी और आधार की प्रति संलग्न करें।',
          mr: 'द्वारे सरकार शिबिरात मोफत फॉर्म भरून स्वास्थ्य साथी व आधार कार्डासह सादर करा.',
        },
        location_type: 'tehsil_office',
      },
    ],
  },

  // 4. West Bengal: Krishak Bandhu Scheme
  {
    id: 'wb-krishak-bandhu',
    code: 'WB-KBS',
    name: {
      en: 'Krishak Bandhu Scheme (West Bengal)',
      hi: 'कृषक बंधु योजना (पश्चिम बंगाल)',
      mr: 'कृषक बंधू योजना (पश्चिम बंगाल)',
    },
    short_summary: {
      en: 'Up to ₹10,000 per year financial grant for farmers + ₹2 Lakh death insurance for farmer families.',
      hi: 'किसानों को प्रति वर्ष ₹10,000 तक वित्तीय सहायता एवं ₹2 लाख का किसान मृत्यु बीमा।',
      mr: 'शेतकऱ्यांना दरवर्षी ₹१०,००० पर्यंत अनुदान व ₹२ लाख शेतकरी मृत्यू विमा.',
    },
    description: {
      en: 'Flagship agriculture welfare scheme by West Bengal providing ₹10,000/year (minimum ₹4,000/year) in two crop seasons (Kharif and Rabi) along with ₹2,00,000 death compensation for farmers aged 18-60.',
      hi: 'पश्चिम बंगाल के किसानों को खरीफ और रबी फसलों के लिए प्रति वर्ष दो किस्तों में आर्थिक अनुदान।',
      mr: 'पश्चिम बंगाल शासनाची खरीप व रब्बी हंगामात शेतकऱ्यांना आर्थिक सहाय्य व जीवन विमा देणारी योजना.',
    },
    level: 'state',
    state: 'West Bengal',
    category: 'agriculture',
    official_url: 'https://krishakbandhu.wb.gov.in',
    application_mode: 'both',
    source_citation: 'Department of Agriculture, Government of West Bengal (krishakbandhu.wb.gov.in)',
    last_verified: '2026-09-15',
    version: '2026.1',
    is_verified_fact: true,
    benefit_type: {
      en: '₹10,000 / year + ₹2 Lakh insurance',
      hi: '₹10,000 / वर्ष + ₹2 लाख बीमा',
      mr: '₹१०,००० / वर्ष + ₹२ लाख विमा',
    },
    criteria: [
      {
        id: 'wbkb_occ',
        field: 'occupation',
        operator: 'eq',
        value: 'farmer',
        required: true,
        verified: true,
        explanation: {
          en: 'Beneficiary must be a farmer owning agricultural land or recorded bhagchasi (sharecropper)',
          hi: 'आवेदक के पास पश्चिम बंगाल में कृषि भूमि या दर्ज बटाईदार (भागचाषी) होना चाहिए',
          mr: 'अर्जदाराकडे पश्चिम बंगालमध्ये शेतजमीन किंवा नोंदणीकृत कूळ (बटाईदार) असणे आवश्यक आहे',
        },
      },
    ],
    documents: [
      {
        id: 'wbkb_doc_ror',
        name: {
          en: 'RoR (Record of Rights / Porcha / Khatian) of Cultivable Land',
          hi: 'खतियान / पर्चा (भूमि अधिकार अभिलेख)',
          mr: 'शेतजमिनीचा अधिकार अभिलेख (खतियान / पर्चा)',
        },
        mandatory: true,
      },
      {
        id: 'wbkb_doc_bank',
        name: {
          en: 'Aadhaar Card and Bank Passbook with IFSC',
          hi: 'आधार कार्ड एवं बैंक पासबुक',
          mr: 'आधार कार्ड व बँक पासबुक',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Submit Application at Assistant Director of Agriculture (ADA) Office',
          hi: 'सहायक कृषि निदेशक (ADA) कार्यालय में आवेदन जमा करें',
          mr: 'सहायक कृषी संचालक कार्यालयात अर्ज सादर करा',
        },
        instruction: {
          en: 'Submit hardcopy application with self-attested land Porcha and Aadhaar to the block ADA office or at Duare Sarkar camp.',
          hi: 'जमीन के पर्चा और आधार के साथ ब्लॉक कृषि कार्यालय में आवेदन जमा करें।',
          mr: 'जमिनीच्या पर्चासह गट कृषी कार्यालयात किंवा द्वारे सरकार शिबिरात अर्ज द्या.',
        },
        location_type: 'tehsil_office',
      },
    ],
  },

  // 5. Uttar Pradesh: Mukhyamantri Kanya Sumangala Yojana
  {
    id: 'up-kanya-sumangala',
    code: 'UP-MKSY',
    name: {
      en: 'Mukhyamantri Kanya Sumangala Yojana (Uttar Pradesh)',
      hi: 'मुख्यमंत्री कन्या सुमंगला योजना (उत्तर प्रदेश)',
      mr: 'मुख्यमंत्री कन्या सुमंगला योजना (उत्तर प्रदेश)',
    },
    short_summary: {
      en: 'Financial grant of ₹25,000 in 6 stages from birth to college graduation for girl children.',
      hi: 'बालिकाओं के जन्म से स्नातक प्रवेश तक 6 चरणों में ₹25,000 की वित्तीय सहायता।',
      mr: 'मुलींच्या जन्मापासून ते पदवी प्रवेशापर्यंत ६ टप्प्यांत ₹२५,००० ची आर्थिक मदत.',
    },
    description: {
      en: 'Flagship UP initiative providing conditional cash transfers totaling ₹25,000 across key milestones (birth, complete vaccination, class 1, class 6, class 9, and degree/diploma entry) to eliminate female foeticide and promote girls education.',
      hi: 'उत्तर प्रदेश सरकार द्वारा बालिकाओं के स्वास्थ्य, शिक्षा और स्वावलंबन हेतु 6 चरणों में दी जाने वाली वित्तीय सहायता।',
      mr: 'उत्तर प्रदेश शासनाची मुलींच्या शिक्षण व आरोग्यासाठी ६ टप्प्यांत ₹२५,००० अनुदान देणारी योजना.',
    },
    level: 'state',
    state: 'Uttar Pradesh',
    category: 'education',
    official_url: 'https://mksy.up.gov.in',
    application_mode: 'online',
    source_citation: 'Department of Women & Child Development, Uttar Pradesh (mksy.up.gov.in)',
    last_verified: '2026-09-15',
    version: '2026.1',
    is_verified_fact: true,
    benefit_type: {
      en: '₹25,000 total staged grant',
      hi: '₹25,000 कुल चरणबद्ध अनुदान',
      mr: '₹२५,००० एकूण टप्प्याटप्प्याने अनुदान',
    },
    criteria: [
      {
        id: 'upks_inc',
        field: 'incomeBand',
        operator: 'in',
        value: ['below_1lakh', '1lakh_2_5lakh'],
        required: true,
        verified: true,
        explanation: {
          en: 'Family annual income must not exceed ₹3 Lakh',
          hi: 'परिवार की वार्षिक आय ₹3 लाख से कम होनी चाहिए',
          mr: 'कुटुंबाचे वार्षिक उत्पन्न ₹३ लाखांपेक्षा कमी असणे आवश्यक आहे',
        },
      },
    ],
    documents: [
      {
        id: 'upks_doc_birth',
        name: {
          en: 'Birth Certificate of Girl Child & School Enrollment Certificate',
          hi: 'बालिका का जन्म प्रमाण पत्र एवं विद्यालय प्रवेश प्रमाण',
          mr: 'मुलीचा जन्म दाखला व शाळेचे प्रवेश प्रमाणपत्र',
        },
        mandatory: true,
      },
      {
        id: 'upks_doc_domicile',
        name: {
          en: 'Uttar Pradesh Domicile / Residence Certificate (Niwas Praman Patra)',
          hi: 'उत्तर प्रदेश निवास प्रमाण पत्र',
          mr: 'उत्तर प्रदेश रहिवासी प्रमाणपत्र',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Apply Online on MKSY UP Portal',
          hi: 'एमकेएसवाई यूपी पोर्टल पर ऑनलाइन आवेदन करें',
          mr: 'एमकेएसवाय यूपी पोर्टलवर ऑनलाईन अर्ज करा',
        },
        instruction: {
          en: 'Register citizen login on mksy.up.gov.in, select the applicable stage, upload certificates and submit.',
          hi: 'mksy.up.gov.in पर नागरिक खाता बनाएं, उपयुक्त चरण चुनें और दस्तावेज अपलोड करें।',
          mr: 'mksy.up.gov.in वर खाते तयार करून योग्य टप्पा निवडा व अर्ज पूर्ण करा.',
        },
        location_type: 'online',
      },
    ],
  },

  // 6. Tamil Nadu: Kalaignar Magalir Urimai Thittam
  {
    id: 'tn-magalir-urimai',
    code: 'TN-KMUT',
    name: {
      en: 'Kalaignar Magalir Urimai Thittam (Tamil Nadu)',
      hi: 'कलैग्नार मगलिर उरिमई थित्तम (तमिलनाडु)',
      mr: 'कलैगनार मगलिर उरिमई योजना (तामिळनाडू)',
    },
    short_summary: {
      en: 'Universal basic income of ₹1,000 per month for women heads of families in Tamil Nadu.',
      hi: 'तमिलनाडु में परिवार की पात्र महिला मुखिया को ₹1,000 प्रति माह अधिकार सहायता राशि।',
      mr: 'तामिळनाडूमधील पात्र महिला कुटुंबप्रमुखांना दरमहा ₹१,००० ची थेट आर्थिक मदत.',
    },
    description: {
      en: 'Historic social justice entitlement by Government of Tamil Nadu providing monthly ₹1,000 direct bank transfer to recognized female household heads with annual income below ₹2.5 Lakh.',
      hi: 'तमिलनाडु सरकार की प्रमुख योजना जिसके तहत गरीब व मध्यम वर्ग की महिला मुखियाओं को मासिक ₹1,000 बैंक खाते में दिए जाते हैं।',
      mr: 'तामिळनाडू शासनाची महिला सबलीकरणासाठी दरमहा ₹१,००० थेट बँक खात्यात देणारी ऐतिहासिक योजना.',
    },
    level: 'state',
    state: 'Tamil Nadu',
    category: 'women_child',
    official_url: 'https://kmut.tn.gov.in',
    application_mode: 'both',
    source_citation: 'Special Programme Implementation Department, Tamil Nadu (kmut.tn.gov.in)',
    last_verified: '2026-09-15',
    version: '2026.1',
    is_verified_fact: true,
    benefit_type: {
      en: '₹1,000 / month direct transfer',
      hi: '₹1,000 / माह प्रत्यक्ष अंतरण',
      mr: '₹१,००० / महिना बँक खात्यात',
    },
    criteria: [
      {
        id: 'tnmu_gen',
        field: 'gender',
        operator: 'eq',
        value: 'female',
        required: true,
        verified: true,
        explanation: {
          en: 'Beneficiary must be a female head of family listed in smart ration card',
          hi: 'आवेदक स्मार्ट राशन कार्ड में दर्ज महिला मुखिया होनी चाहिए',
          mr: 'स्मार्ट रेशन कार्डवर महिला कुटुंबप्रमुख नोंद असणे आवश्यक आहे',
        },
      },
      {
        id: 'tnmu_inc',
        field: 'incomeBand',
        operator: 'in',
        value: ['below_1lakh', '1lakh_2_5lakh'],
        required: true,
        verified: true,
        explanation: {
          en: 'Family annual income must be below ₹2.5 Lakh with domestic electricity consumption under 3,600 units/year',
          hi: 'पारिवारिक वार्षिक आय ₹2.5 लाख से कम होनी चाहिए',
          mr: 'कुटुंबाचे वार्षिक उत्पन्न ₹२.५ लाखांपेक्षा कमी असणे आवश्यक आहे',
        },
      },
    ],
    documents: [
      {
        id: 'tnmu_doc_rc',
        name: {
          en: 'Tamil Nadu Smart Family Card (Ration Card)',
          hi: 'तमिलनाडु स्मार्ट परिवार राशन कार्ड',
          mr: 'तामिळनाडू स्मार्ट रेशन कार्ड',
        },
        mandatory: true,
      },
      {
        id: 'tnmu_doc_aadhaar',
        name: {
          en: 'Aadhaar Card and Bank Account seeded with Aadhaar',
          hi: 'आधार कार्ड एवं आधार-सीडेड बैंक खाता',
          mr: 'आधार कार्ड व आधार संलग्न बँक खाते',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Biometric Verification at Ration Shop / Special Camp',
          hi: 'उचित मूल्य की दुकान या विशेष शिविर में बायोमेट्रिक सत्यापन',
          mr: 'रेशन दुकानातील किंवा विशेष शिबिरातील बायोमेट्रिक पडताळणी',
        },
        instruction: {
          en: 'Carry smart ration card, Aadhaar card, and bank passbook to the designated e-Seva camp for digital registration.',
          hi: 'स्मार्ट कार्ड और आधार के साथ नजदीकी ई-सेवा शिविर में जाकर डिजिटल पंजीकरण करवाएं।',
          mr: 'स्मार्ट कार्ड व आधार कार्ड घेऊन जवळच्या ई-सेवा शिबिरात नोंदणी पूर्ण करा.',
        },
        location_type: 'tehsil_office',
      },
    ],
  },

  // 7. Telangana: Rythu Bharosa Scheme
  {
    id: 'tg-rythu-bharosa',
    code: 'TG-RBS',
    name: {
      en: 'Rythu Bharosa Scheme (Telangana)',
      hi: 'रायथु भरोसा योजना (तेलंगाना)',
      mr: 'रयतु भरोसा योजना (तेलंगणा)',
    },
    short_summary: {
      en: 'Investment financial support of ₹15,000 per acre per year for farmers and tenant farmers in Telangana.',
      hi: 'किसानों एवं काश्तकारों को ₹15,000 प्रति एकड़ प्रति वर्ष कृषि निवेश सहायता।',
      mr: 'शेतकरी व कुळांना दरवर्षी प्रति एकर ₹१५,००० शेती गुंतवणूक सहाय्य.',
    },
    description: {
      en: 'Agricultural investment support scheme by Government of Telangana providing ₹15,000 per acre annually in two installments to support seed, fertilizer, and input costs for cultivable lands.',
      hi: 'तेलंगाना सरकार द्वारा किसानों को खेती की लागत में सहायता हेतु प्रति वर्ष प्रति एकड़ ₹15,000 की वित्तीय सहायता।',
      mr: 'तेलंगणा शासनाची बियाणे व खत खरेदीसाठी शेतकऱ्यांना दरवर्षी एकरी ₹१५,००० अनुदान देणारी योजना.',
    },
    level: 'state',
    state: 'Telangana',
    category: 'agriculture',
    official_url: 'https://rythubandhu.telangana.gov.in',
    application_mode: 'both',
    source_citation: 'Department of Agriculture, Government of Telangana (rythubandhu.telangana.gov.in)',
    last_verified: '2026-09-15',
    version: '2026.1',
    is_verified_fact: true,
    benefit_type: {
      en: '₹15,000 / acre per year DBT',
      hi: '₹15,000 / एकड़ / वर्ष डीबीटी',
      mr: '₹१५,००० / एकर / वर्ष बँक खात्यात',
    },
    criteria: [
      {
        id: 'tgrb_occ',
        field: 'occupation',
        operator: 'eq',
        value: 'farmer',
        required: true,
        verified: true,
        explanation: {
          en: 'Beneficiary must be a farmer possessing Dharani Pattadar Passbook in Telangana',
          hi: 'आवेदक धरणी पोर्टल पर पंजीकृत पट्टादार किसान होना चाहिए',
          mr: 'अर्जदार धरणी पोर्टलवर नोंद असलेला शेतकरी पट्टादार असणे आवश्यक आहे',
        },
      },
    ],
    documents: [
      {
        id: 'tgrb_doc_passbook',
        name: {
          en: 'Dharani Pattadar Passbook / Land Ownership Title Deed',
          hi: 'धरणी पट्टादार पासबुक / भूमि स्वामित्व अभिलेख',
          mr: 'धरणी पट्टादार पासबुक / जमीन मालकी हक्क दाखला',
        },
        mandatory: true,
      },
      {
        id: 'tgrb_doc_bank',
        name: {
          en: 'Bank Account Passbook seeded with Aadhaar',
          hi: 'आधार से जुड़ा बैंक पासबुक',
          mr: 'आधार संलग्न बँक पासबुक',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Register Land Details via Agriculture Extension Officer (AEO)',
          hi: 'कृषि विस्तार अधिकारी (AEO) के माध्यम से भूमि विवरण दर्ज करें',
          mr: 'कृषी विस्तार अधिकाऱ्याकडे (AEO) जमीन नोंदणी तपासा',
        },
        instruction: {
          en: 'Verify land ownership records on Dharani portal and submit bank IFSC to village AEO for automated DBT release.',
          hi: 'धरणी पोर्टल पर रिकॉर्ड की पुष्टि करें और ग्राम कृषि विस्तार अधिकारी को खाता विवरण दें।',
          mr: 'धरणी पोर्टलवर नोंदी तपासून ग्राम कृषी विस्तार अधिकाऱ्याकडे बँक तपशील जमा करा.',
        },
        location_type: 'tehsil_office',
      },
    ],
  },

  // 8. Madhya Pradesh: Mukhyamantri Ladli Behna Yojana
  {
    id: 'mp-ladli-behna',
    code: 'MP-MLBY',
    name: {
      en: 'Mukhyamantri Ladli Behna Yojana (Madhya Pradesh)',
      hi: 'मुख्यमंत्री लाड़ली बहना योजना (मध्य प्रदेश)',
      mr: 'मुख्यमंत्री लाडली बहना योजना (मध्य प्रदेश)',
    },
    short_summary: {
      en: 'Direct financial assistance of ₹1,250 per month into bank accounts of women aged 21-60.',
      hi: '21 से 60 वर्ष की पात्र महिलाओं को ₹1,250 प्रतिमाह सीधे बैंक खाते में आर्थिक सहायता।',
      mr: '२१ ते ६० वयोगटातील पात्र महिलांना दरमहा ₹१,२५० थेट बँक खात्यात आर्थिक सहाय्य.',
    },
    description: {
      en: 'Empowerment initiative by Madhya Pradesh government giving ₹1,250 every month via DBT to married, widowed, divorced, or abandoned women from families having annual income under ₹2.5 Lakh and land below 5 acres.',
      hi: 'मध्य प्रदेश की गरीब एवं मध्यम वर्गीय महिलाओं को आर्थिक रूप से स्वावलंबी बनाने हेतु मासिक ₹1,250 का अनुदान।',
      mr: 'मध्य प्रदेश शासनाची महिलांच्या आर्थिक स्वावलंबनासाठी दरमहा ₹१,२५० देणारी प्रमुख योजना.',
    },
    level: 'state',
    state: 'Madhya Pradesh',
    category: 'women_child',
    official_url: 'https://cmladlibahna.mp.gov.in',
    application_mode: 'both',
    source_citation: 'Women and Child Development Department, Madhya Pradesh (cmladlibahna.mp.gov.in)',
    last_verified: '2026-09-15',
    version: '2026.1',
    is_verified_fact: true,
    benefit_type: {
      en: '₹1,250 / month DBT cash',
      hi: '₹1,250 / माह डीबीटी नकद',
      mr: '₹१,२५० / महिना बँक खात्यात',
    },
    criteria: [
      {
        id: 'mplb_gen',
        field: 'gender',
        operator: 'eq',
        value: 'female',
        required: true,
        verified: true,
        explanation: {
          en: 'Beneficiary must be a female resident of MP aged 21 to 60',
          hi: 'आवेदक मध्य प्रदेश की 21 से 60 वर्ष की महिला होनी चाहिए',
          mr: 'अर्जदार मध्य प्रदेशातील २१ ते ६० वर्षे वयोगटातील महिला असणे आवश्यक आहे',
        },
      },
      {
        id: 'mplb_inc',
        field: 'incomeBand',
        operator: 'in',
        value: ['below_1lakh', '1lakh_2_5lakh'],
        required: true,
        verified: true,
        explanation: {
          en: 'Family annual income must be below ₹2.5 Lakh with no family member in government job or paying income tax',
          hi: 'परिवार की वार्षिक आय ₹2.5 लाख से कम होनी चाहिए',
          mr: 'कुटुंबाचे वार्षिक उत्पन्न ₹२.५ लाखांपेक्षा कमी असणे आवश्यक आहे',
        },
      },
    ],
    documents: [
      {
        id: 'mplb_doc_samagra',
        name: {
          en: 'Samagra Family ID & Member ID (e-KYC Completed)',
          hi: 'समग्र परिवार आईडी एवं सदस्य आईडी (ई-केवाईसी पूर्ण)',
          mr: 'समग्र कुटुंब आयडी व सदस्य आयडी (ई-केवायसी पूर्ण)',
        },
        mandatory: true,
      },
      {
        id: 'mplb_doc_bank',
        name: {
          en: 'Individual Bank Account (Aadhaar linked and DBT active)',
          hi: 'व्यक्तिगत बैंक खाता (आधार लिंक्ड एवं डीबीटी सक्रिय)',
          mr: 'वैयक्तिक बँक खाते (आधार संलग्न व डीबीटी सुरू असलेले)',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Complete Samagra e-KYC and Visit Gram Panchayat / Ward Camp',
          hi: 'समग्र ई-केवाईसी पूर्ण करें और ग्राम पंचायत शिविर में जाएं',
          mr: 'समग्र ई-केवायसी पूर्ण करून ग्रामपंचायत शिबिरात जा',
        },
        instruction: {
          en: 'Ensure Aadhaar is linked to Samagra ID and attend the ward/panchayat camp for photographic and biometric registration.',
          hi: 'समग्र पोर्टल पर आधार लिंक कराएं और शिविर में जाकर बायोमेट्रिक आवेदन दर्ज कराएं।',
          mr: 'समग्र आयडीला आधार जोडून पंचायत शिबिरात प्रत्यक्ष हजर राहून अर्ज भरा.',
        },
        location_type: 'tehsil_office',
      },
    ],
  },

  // 9. Rajasthan: Mukhyamantri Ayushman / Chiranjeevi Swasthya Bima
  {
    id: 'rj-chiranjeevi',
    code: 'RJ-MASBY',
    name: {
      en: 'Mukhyamantri Ayushman Swasthya Bima (Rajasthan)',
      hi: 'मुख्यमंत्री आयुष्मान / चिरंजीवी स्वास्थ्य बीमा योजना (राजस्थान)',
      mr: 'मुख्यमंत्री आयुष्मान आरोग्य विमा योजना (राजस्थान)',
    },
    short_summary: {
      en: 'Universal cashless medical treatment coverage up to ₹25 Lakh per family per year in empanelled hospitals.',
      hi: 'संबद्ध अस्पतालों में प्रति परिवार प्रति वर्ष ₹25 लाख तक का निःशुल्क कैशलेस इलाज।',
      mr: 'नोंदणीकृत रुग्णालयांमध्ये प्रति कुटुंब दरवर्षी ₹२५ लाखांपर्यंत मोफत कॅशलेस उपचार.',
    },
    description: {
      en: "Comprehensive health insurance program of Rajasthan covering secondary and tertiary care hospitalization up to ₹25 Lakhs per family, free for NFSA, SECC, small farmers and contractual workers.",
      hi: 'राजस्थान सरकार की सार्वभौमिक कैशलेस स्वास्थ्य सुरक्षा योजना जिसके तहत ₹25 लाख तक का इलाज मिलता है।',
      mr: 'राजस्थान शासनाची कुटुंबाला दरवर्षी ₹२५ लाखांपर्यंत कॅशलेस आरोग्य संरक्षण देणारी महत्त्वाकांक्षी योजना.',
    },
    level: 'state',
    state: 'Rajasthan',
    category: 'health',
    official_url: 'https://chiranjeevi.rajasthan.gov.in',
    application_mode: 'both',
    source_citation: 'State Health Assurance Agency, Rajasthan (chiranjeevi.rajasthan.gov.in)',
    last_verified: '2026-09-15',
    version: '2026.1',
    is_verified_fact: true,
    benefit_type: {
      en: '₹25 Lakh cashless hospital cover',
      hi: '₹25 लाख कैशलेस अस्पताल इलाज',
      mr: '₹२५ लाख कॅशलेस रुग्णालय उपचार',
    },
    criteria: [
      {
        id: 'rjch_state',
        field: 'state',
        operator: 'eq',
        value: 'Rajasthan',
        required: true,
        verified: true,
        explanation: {
          en: 'Must be a resident of Rajasthan holding Jan Aadhaar Card',
          hi: 'आवेदक राजस्थान का निवासी और जन आधार कार्ड धारक होना चाहिए',
          mr: 'अर्जदार राजस्थानचा रहिवासी आणि जन आधार कार्डधारक असणे आवश्यक आहे',
        },
      },
    ],
    documents: [
      {
        id: 'rjch_doc_janaadhaar',
        name: {
          en: 'Jan Aadhaar Card / Jan Aadhaar Acknowledgment Receipt',
          hi: 'जन आधार कार्ड / जन आधार रसीद',
          mr: 'जन आधार कार्ड / नोंदणी पावती',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Check Enrollment or Register on Jan Aadhaar / SSO Portal',
          hi: 'जन आधार या एसएसओ पोर्टल पर पंजीयन की जांच करें',
          mr: 'जन आधार किंवा एसएसओ पोर्टलवर नोंदणी तपासा',
        },
        instruction: {
          en: 'NFSA beneficiaries are auto-enrolled. Others can pay subsidized premium of ₹850/year on SSO Rajasthan or e-Mitra.',
          hi: 'एनएफएसए परिवार स्वतः पंजीकृत हैं, अन्य परिवार ई-मित्र से ₹850/वर्ष प्रीमियम देकर जुड़ सकते हैं।',
          mr: 'एनएफएसए लाभार्थी आपोआप पात्र आहेत, इतर कुटुंबे ई-मित्र केंद्रावरून नोंदणी करू शकतात.',
        },
        location_type: 'online',
      },
    ],
  },

  // 10. Bihar: Mukhyamantri Kanya Utthan Yojana
  {
    id: 'br-kanya-utthan',
    code: 'BR-MKUY',
    name: {
      en: 'Mukhyamantri Kanya Utthan Yojana (Bihar)',
      hi: 'मुख्यमंत्री कन्या उत्थान योजना (बिहार)',
      mr: 'मुख्यमंत्री कन्या उत्थान योजना (बिहार)',
    },
    short_summary: {
      en: 'Cumulative financial grant of up to ₹50,000 for girl students upon passing graduation in Bihar.',
      hi: 'बिहार में स्नातक (ग्रेजुएशन) उत्तीर्ण छात्राओं को ₹50,000 की एकमुश्त प्रोत्साहन राशि।',
      mr: 'बिहारमधील पदवीधर (ग्रेजुएट) उत्तीर्ण विद्यार्थिनींना ₹५०,००० चे एकरकमी अनुदान.',
    },
    description: {
      en: 'Flagship Bihar education incentive providing ₹50,000 directly into the bank account of every girl student who graduates from recognized universities in Bihar, encouraging women higher education.',
      hi: 'बिहार की मान्यता प्राप्त यूनिवर्सिटी से ग्रेजुएशन पास करने वाली प्रत्येक अविवाहित/विवाहित छात्रा को ₹50,000 की सहायता।',
      mr: 'बिहारमधील पदवी पूर्ण करणाऱ्या विद्यार्थिनींना पुढील शिक्षण व स्वावलंबनासाठी ₹५०,००० ची थेट मदत.',
    },
    level: 'state',
    state: 'Bihar',
    category: 'education',
    official_url: 'https://medhasoft.bih.nic.in',
    application_mode: 'online',
    source_citation: 'Education Department, Government of Bihar (medhasoft.bih.nic.in)',
    last_verified: '2026-09-15',
    version: '2026.1',
    is_verified_fact: true,
    benefit_type: {
      en: '₹50,000 graduation incentive',
      hi: '₹50,000 स्नातक प्रोत्साहन राशि',
      mr: '₹५०,००० पदवी प्रोत्साहन अनुदान',
    },
    criteria: [
      {
        id: 'brku_gen',
        field: 'gender',
        operator: 'eq',
        value: 'female',
        required: true,
        verified: true,
        explanation: {
          en: 'Beneficiary must be a female student graduating from a recognized university in Bihar',
          hi: 'छात्रा बिहार के मान्यता प्राप्त विश्वविद्यालय से स्नातक उत्तीर्ण होनी चाहिए',
          mr: 'विद्यार्थिनी बिहारमधील विद्यापीठातून पदवीधर उत्तीर्ण असणे आवश्यक आहे',
        },
      },
    ],
    documents: [
      {
        id: 'brku_doc_marksheet',
        name: {
          en: 'Graduation Final Year Marksheet & Registration Number',
          hi: 'स्नातक अंतिम वर्ष की अंकसूची एवं रोल नंबर',
          mr: 'पदवी अंतिम वर्ष गुणपत्रिका व नोंदणी क्रमांक',
        },
        mandatory: true,
      },
      {
        id: 'brku_doc_domicile',
        name: {
          en: 'Bihar Residential / Domicile Certificate',
          hi: 'बिहार निवास प्रमाण पत्र',
          mr: 'बिहार रहिवासी दाखला',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Apply Online on Medhasoft Bihar Portal',
          hi: 'मेधासॉफ्ट बिहार पोर्टल पर ऑनलाइन आवेदन करें',
          mr: 'मेधासॉफ्ट बिहार पोर्टलवर ऑनलाईन अर्ज करा',
        },
        instruction: {
          en: 'Visit medhasoft.bih.nic.in, select Mukhyamantri Kanya Utthan (Snatak), verify roll number and Aadhaar, and submit bank details.',
          hi: 'medhasoft.bih.nic.in पर जाकर रोल नंबर और आधार का सत्यापन करें व बैंक खाता सबमिट करें।',
          mr: 'medhasoft.bih.nic.in वर जाऊन रोल नंबर व आधार पडताळणी करा आणि बँक तपशील भरा.',
        },
        location_type: 'online',
      },
    ],
  },

  // 11. Odisha: Subhadra Yojana
  {
    id: 'od-subhadra',
    code: 'OD-SUBHADRA',
    name: {
      en: 'Subhadra Yojana (Odisha)',
      hi: 'सुभद्रा योजना (ओडिशा)',
      mr: 'सुभद्रा योजना (ओडिशा)',
    },
    short_summary: {
      en: 'Financial assistance of ₹10,000 per year (₹50,000 total over 5 years) for women aged 21-60 in Odisha.',
      hi: 'ओडिशा में 21 से 60 वर्ष की महिलाओं को प्रति वर्ष ₹10,000 (5 वर्षों में ₹50,000) की वित्तीय सहायता।',
      mr: 'ओडिशामधील २१ ते ६० वयोगटातील महिलांना दरवर्षी ₹१०,००० (५ वर्षांत एकूण ₹५०,०००) सहाय्य.',
    },
    description: {
      en: 'Flagship women welfare initiative launched by Government of Odisha transferring ₹10,000 per year directly to eligible female beneficiaries in two equal installments on Raksha Bandhan and International Women Day.',
      hi: 'ओडिशा सरकार द्वारा महिलाओं के सामाजिक-आर्थिक उत्थान हेतु प्रति वर्ष दो किस्तों में ₹10,000 की सीधी सहायता।',
      mr: 'ओडिशा शासनाची महिलांना दरवर्षी ₹१०,००० चे दोन हप्त्यांत थेट बँक अनुदान देणारी योजना.',
    },
    level: 'state',
    state: 'Odisha',
    category: 'women_child',
    official_url: 'https://subhadra.odisha.gov.in',
    application_mode: 'both',
    source_citation: 'Department of Women & Child Development, Odisha (subhadra.odisha.gov.in)',
    last_verified: '2026-09-15',
    version: '2026.1',
    is_verified_fact: true,
    benefit_type: {
      en: '₹10,000 / year (₹50,000 over 5 yrs)',
      hi: '₹10,000 / वर्ष (5 वर्षों में ₹50,000)',
      mr: '₹१०,००० / वर्ष (५ वर्षांत ₹५०,०००)',
    },
    criteria: [
      {
        id: 'odsu_gen',
        field: 'gender',
        operator: 'eq',
        value: 'female',
        required: true,
        verified: true,
        explanation: {
          en: 'Beneficiary must be a female resident of Odisha aged 21 to 60',
          hi: 'आवेदक ओडिशा की 21 से 60 वर्ष आयु वर्ग की महिला होनी चाहिए',
          mr: 'अर्जदार ओडिशामधील २१ ते ६० वयोगटातील महिला असणे आवश्यक आहे',
        },
      },
    ],
    documents: [
      {
        id: 'odsu_doc_aadhaar',
        name: {
          en: 'Aadhaar Card linked to Mobile and Aadhaar-seeded Bank Account',
          hi: 'आधार कार्ड एवं मोबाइल व आधार-सीडेड बैंक खाता',
          mr: 'आधार कार्ड व आधार संलग्न बँक खाते',
        },
        mandatory: true,
      },
      {
        id: 'odsu_doc_ration',
        name: {
          en: 'National Food Security Act (NFSA) / State Food Security Card',
          hi: 'राशन कार्ड (एनएफएसए / एसएफएसएस)',
          mr: 'रेशन कार्ड (एनएफएसए / राज्य अन्न सुरक्षा)',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Apply Online via Subhadra Portal or at Mo Seva Kendra',
          hi: 'सुभद्रा पोर्टल या मो सेवा केंद्र पर आवेदन करें',
          mr: 'सुभद्रा पोर्टल किंवा मो सेवा केंद्रावर अर्ज सादर करा',
        },
        instruction: {
          en: 'Submit online application with Aadhaar e-KYC on subhadra.odisha.gov.in or free of charge at nearest Mo Seva Kendra / Anganwadi centre.',
          hi: 'subhadra.odisha.gov.in पर या आंगनवाड़ी/मो सेवा केंद्र पर जाकर निःशुल्क फॉर्म भरें।',
          mr: 'subhadra.odisha.gov.in वर किंवा जवळच्या मो सेवा केंद्रात मोफत अर्ज भरा.',
        },
        location_type: 'online',
      },
    ],
  },

  // 12. Haryana: Old Age Samman Allowance
  {
    id: 'hr-old-age-pension',
    code: 'HR-OASA',
    name: {
      en: 'Old Age Samman Allowance (Haryana)',
      hi: 'वृद्धावस्था सम्मान भत्ता (हरियाणा)',
      mr: 'वृद्धापकाळ सन्मान भत्ता (हरियाणा)',
    },
    short_summary: {
      en: 'Monthly social security pension of ₹3,000 for senior citizens aged 60+ in Haryana.',
      hi: 'हरियाणा में 60 वर्ष या उससे अधिक आयु के वरिष्ठ नागरिकों को ₹3,000 प्रतिमाह वृद्धावस्था पेंशन।',
      mr: 'हरियाणामधील ६० वर्षे व त्यावरील ज्येष्ठ नागरिकांना दरमहा ₹३,००० वृद्धापकाळ पेन्शन.',
    },
    description: {
      en: 'Social security allowance scheme by Haryana government providing monthly ₹3,000 cash allowance to senior citizens residing in Haryana having family income under ₹3 Lakh per year.',
      hi: 'हरियाणा सरकार द्वारा वृद्ध नागरिकों के सम्मानपूर्वक जीवन यापन हेतु मासिक ₹3,000 की पेंशन।',
      mr: 'हरियाणा शासनाची ज्येष्ठ नागरिकांसाठी दरमहा ₹३,००० पेन्शन देणारी सामाजिक सुरक्षा योजना.',
    },
    level: 'state',
    state: 'Haryana',
    category: 'pension',
    official_url: 'https://socialjusticehry.gov.in',
    application_mode: 'both',
    source_citation: 'Department of Social Justice and Empowerment, Haryana (socialjusticehry.gov.in)',
    last_verified: '2026-09-15',
    version: '2026.1',
    is_verified_fact: true,
    benefit_type: {
      en: '₹3,000 / month pension',
      hi: '₹3,000 / माह पेंशन',
      mr: '₹३,००० / महिना पेन्शन',
    },
    criteria: [
      {
        id: 'hroa_age',
        field: 'ageBand',
        operator: 'in',
        value: ['60_plus'],
        required: true,
        verified: true,
        explanation: {
          en: 'Applicant must be 60 years of age or older verified via Parivar Pehchan Patra (PPP)',
          hi: 'परिवार पहचान पत्र (PPP) में आवेदक की आयु 60 वर्ष या अधिक होनी चाहिए',
          mr: 'कुटुंब ओळखपत्रात (पीपीपी) वय ६० वर्षे किंवा अधिक असणे आवश्यक आहे',
        },
      },
      {
        id: 'hroa_inc',
        field: 'incomeBand',
        operator: 'in',
        value: ['below_1lakh', '1lakh_2_5lakh'],
        required: true,
        verified: true,
        explanation: {
          en: 'Total annual household income must not exceed ₹3 Lakh',
          hi: 'परिवार की वार्षिक आय ₹3 लाख से अधिक नहीं होनी चाहिए',
          mr: 'कुटुंबाचे वार्षिक उत्पन्न ₹३ लाखांपेक्षा जास्त नसावे',
        },
      },
    ],
    documents: [
      {
        id: 'hroa_doc_ppp',
        name: {
          en: 'Parivar Pehchan Patra (Family ID / PPP)',
          hi: 'परिवार पहचान पत्र (फैमिली आईडी / PPP)',
          mr: 'कुटुंब ओळखपत्र (फॅमिली आयडी / PPP)',
        },
        mandatory: true,
      },
      {
        id: 'hroa_doc_bank',
        name: {
          en: 'Aadhaar-seeded Bank Account Passbook',
          hi: 'आधार-लिंक्ड बैंक खाता',
          mr: 'आधार जोडलेले बँक खाते',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Proactive Pension Creation via Parivar Pehchan Patra (PPP)',
          hi: 'परिवार पहचान पत्र (PPP) द्वारा स्वतः पेंशन निर्माण',
          mr: 'परिवार ओळखपत्राद्वारे स्वयंचलित पेन्शन मंजुरी',
        },
        instruction: {
          en: 'Haryana automatically initiates pension verification upon reaching 60 in PPP; verify consent with local CSC / Saral Kendra.',
          hi: 'पीपीपी में 60 वर्ष पूरे होने पर विभाग स्वतः सत्यापन करता है, सरल केंद्र से सहमति दें।',
          mr: 'पीपीपीमध्ये ६० वर्षे पूर्ण झाल्यावर विभाग पडताळणी करतो, सरल केंद्रात संमती द्या.',
        },
        location_type: 'csc_kendra',
      },
    ],
  },

  // 13. Delhi: Financial Assistance to Senior Citizens
  {
    id: 'dl-senior-pension',
    code: 'DL-FASC',
    name: {
      en: 'Delhi Senior Citizen Pension Scheme',
      hi: 'दिल्ली वरिष्ठ नागरिक पेंशन योजना',
      mr: 'दिल्ली ज्येष्ठ नागरिक पेन्शन योजना',
    },
    short_summary: {
      en: 'Monthly financial assistance of ₹2,000 to ₹2,500 for senior citizens residing in Delhi.',
      hi: 'दिल्ली के वरिष्ठ नागरिकों को ₹2,000 से ₹2,500 प्रतिमाह वित्तीय पेंशन।',
      mr: 'दिल्लीतील ज्येष्ठ नागरिकांना दरमहा ₹२,००० ते ₹२,५०० मासिक पेन्शन.',
    },
    description: {
      en: 'Social security assistance by Government of NCT of Delhi giving ₹2,000/month (age 60-69) and ₹2,500/month (age 70+) to needy elderly citizens who have resided in Delhi for at least 5 years.',
      hi: 'दिल्ली सरकार द्वारा बुजुर्ग नागरिकों को सम्मानजनक आजीविका हेतु मासिक पेंशन योजना।',
      mr: 'दिल्ली शासनाची गरजू ज्येष्ठ नागरिकांना दरमहा ₹२,००० ते ₹२,५०० सहाय्य देणारी योजना.',
    },
    level: 'state',
    state: 'Delhi',
    category: 'pension',
    official_url: 'https://edistrict.delhigovt.nic.in',
    application_mode: 'online',
    source_citation: 'Department of Social Welfare, Government of NCT of Delhi (edistrict.delhigovt.nic.in)',
    last_verified: '2026-09-15',
    version: '2026.1',
    is_verified_fact: true,
    benefit_type: {
      en: '₹2,000 - ₹2,500 / month pension',
      hi: '₹2,000 - ₹2,500 / माह पेंशन',
      mr: '₹२,००० - ₹२,५०० / महिना पेन्शन',
    },
    criteria: [
      {
        id: 'dlsc_age',
        field: 'ageBand',
        operator: 'in',
        value: ['60_plus'],
        required: true,
        verified: true,
        explanation: {
          en: 'Beneficiary must be 60 years or older',
          hi: 'लाभार्थी की आयु 60 वर्ष या उससे अधिक होनी चाहिए',
          mr: 'लाभार्थ्याचे वय ६० वर्षे किंवा अधिक असणे आवश्यक आहे',
        },
      },
      {
        id: 'dlsc_inc',
        field: 'incomeBand',
        operator: 'in',
        value: ['below_1lakh'],
        required: true,
        verified: true,
        explanation: {
          en: 'Annual family income must not exceed ₹1 Lakh',
          hi: 'पारिवारिक वार्षिक आय ₹1 लाख से अधिक नहीं होनी चाहिए',
          mr: 'कुटुंबाचे वार्षिक उत्पन्न ₹१ लाखांपेक्षा जास्त नसावे',
        },
      },
    ],
    documents: [
      {
        id: 'dlsc_doc_residence',
        name: {
          en: 'Proof of 5 Years Residence in Delhi (Voter ID / Ration Card / Electricity Bill)',
          hi: 'दिल्ली में 5 वर्ष का निवास प्रमाण (वोटर आईडी / बिजली बिल)',
          mr: 'दिल्लीतील ५ वर्षे वास्तव्याचा पुरावा (मतदार ओळखपत्र / वीज बिल)',
        },
        mandatory: true,
      },
      {
        id: 'dlsc_doc_bank',
        name: {
          en: 'Bank Account in Delhi linked with Aadhaar',
          hi: 'दिल्ली में स्थित बैंक शाखा का आधार लिंक्ड खाता',
          mr: 'दिल्लीतील बँकेचे आधार संलग्न खाते',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Apply Online via e-District Delhi Portal',
          hi: 'ई-डिस्ट्रिक्ट दिल्ली पोर्टल पर ऑनलाइन आवेदन करें',
          mr: 'ई-डिस्ट्रिक्ट दिल्ली पोर्टलवर ऑनलाईन अर्ज करा',
        },
        instruction: {
          en: 'Register on edistrict.delhigovt.nic.in, select Financial Assistance to Senior Citizens, upload age and residence proofs.',
          hi: 'edistrict.delhigovt.nic.in पर नागरिक आईडी बनाकर वरिष्ठ नागरिक पेंशन विकल्प चुनकर आवेदन करें।',
          mr: 'edistrict.delhigovt.nic.in वर नोंदणी करून आवश्यक कागदपत्रांसह अर्ज सादर करा.',
        },
        location_type: 'online',
      },
    ],
  },

  // 14. Assam: Orunodoi Scheme
  {
    id: 'as-orunodoi',
    code: 'AS-ORUNODOI',
    name: {
      en: 'Orunodoi 3.0 Scheme (Assam)',
      hi: 'ओरुनोदोई 3.0 योजना (असम)',
      mr: 'ओरुनोदोई ३.० योजना (आसाम)',
    },
    short_summary: {
      en: 'Monthly DBT transfer of ₹1,250 directly to the nominated female head of underprivileged households.',
      hi: 'वंचित परिवारों की नामित महिला मुखिया को ₹1,250 प्रतिमाह प्रत्यक्ष डीबीटी सहायता।',
      mr: 'वंचित कुटुंबांतील महिला प्रमुखाला दरमहा ₹१,२५० थेट बँक खात्यात आर्थिक सहाय्य.',
    },
    description: {
      en: 'Major direct benefit transfer welfare scheme by Government of Assam providing monthly assistance of ₹1,250 for nutritional and healthcare needs to over 27 lakh low-income families through female nomination.',
      hi: 'असम सरकार द्वारा 27 लाख से अधिक गरीब परिवारों की महिलाओं को पोषण एवं दवाइयों हेतु मासिक ₹1,250 की सहायता।',
      mr: 'आसाम शासनाची गरीब कुटुंबांतील महिलांना औषधोपचार व पोषणासाठी दरमहा ₹१,२५० देणारी प्रमुख योजना.',
    },
    level: 'state',
    state: 'Assam',
    category: 'women_child',
    official_url: 'https://orunodoi.assam.gov.in',
    application_mode: 'both',
    source_citation: 'Finance Department, Government of Assam (orunodoi.assam.gov.in)',
    last_verified: '2026-09-15',
    version: '2026.1',
    is_verified_fact: true,
    benefit_type: {
      en: '₹1,250 / month DBT cash',
      hi: '₹1,250 / माह डीबीटी नकद',
      mr: '₹१,२५० / महिना बँक खात्यात',
    },
    criteria: [
      {
        id: 'asor_gen',
        field: 'gender',
        operator: 'eq',
        value: 'female',
        required: true,
        verified: true,
        explanation: {
          en: 'Beneficiary must be a nominated female member of the household residing in Assam',
          hi: 'आवेदक असम में रहने वाले परिवार की नामित महिला सदस्य होनी चाहिए',
          mr: 'अर्जदार आसाममधील कुटुंबाची नामनिर्देशित महिला सदस्य असणे आवश्यक आहे',
        },
      },
      {
        id: 'asor_inc',
        field: 'incomeBand',
        operator: 'in',
        value: ['below_1lakh', '1lakh_2_5lakh'],
        required: true,
        verified: true,
        explanation: {
          en: 'Annual household income must be below ₹2 Lakh with preference to widow, divorced, or PwD households',
          hi: 'पारिवारिक वार्षिक आय ₹2 लाख से कम होनी चाहिए (विधवा, दिव्यांग परिवारों को प्राथमिकता)',
          mr: 'कुटुंबाचे वार्षिक उत्पन्न ₹२ लाखांपेक्षा कमी असणे आवश्यक आहे',
        },
      },
    ],
    documents: [
      {
        id: 'asor_doc_ration',
        name: {
          en: 'Assam NFSA Ration Card',
          hi: 'असम एनएफएसए राशन कार्ड',
          mr: 'आसाम एनएफएसए रेशन कार्ड',
        },
        mandatory: true,
      },
      {
        id: 'asor_doc_bank',
        name: {
          en: 'Aadhaar Card and Single Account Bank Passbook',
          hi: 'आधार कार्ड एवं महिला का एकल बैंक खाता पासबुक',
          mr: 'आधार कार्ड व महिलेचे वैयक्तिक बँक पासबुक',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Application and Verification via Gaon Panchayat / VCDC',
          hi: 'गांव पंचायत / वीसीडीसी के माध्यम से आवेदन व सत्यापन',
          mr: 'गाव पंचायत / व्हीसीडीसी द्वारे अर्ज व पडताळणी',
        },
        instruction: {
          en: 'Submit Orunodoi application form at the Gaon Panchayat or VCDC office; verified digitally on orunodoi.assam.gov.in.',
          hi: 'गांव पंचायत कार्यालय में फॉर्म जमा करें, जिसकी डिजिटल जांच के बाद खाते में राशि अंतरित होती है।',
          mr: 'गाव पंचायत कार्यालयात फॉर्म जमा करा, पडताळणीनंतर थेट बँक खात्यात रक्कम वर्ग केली जाते.',
        },
        location_type: 'tehsil_office',
      },
    ],
  },
];

// Validate all schemes using Zod at load time
SchemeRegistrySchema.parse(SCHEMES);
