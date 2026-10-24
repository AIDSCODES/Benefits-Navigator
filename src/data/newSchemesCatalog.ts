/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Scheme } from '../lib/engine/types.ts';

export const SIMULATION_NEW_SCHEMES: Scheme[] = [
  {
    id: 'pm-surya-ghar',
    code: 'PMSURYA',
    name: {
      en: 'PM Surya Ghar: Muft Bijli Yojana (Rooftop Solar)',
      hi: 'पीएम सूर्य घर: मुफ्त बिजली योजना',
      mr: 'पीएम सूर्य घर: मोफत वीज योजना',
    },
    short_summary: {
      en: 'Provides up to 300 units of free electricity every month and up to ₹78,000 direct subsidy for rooftop solar installation.',
      hi: 'हर महीने 300 यूनिट तक मुफ्त बिजली और सोलर पैनल लगवाने के लिए ₹78,000 तक की प्रत्यक्ष सब्सिडी।',
      mr: 'दरमहा ३०० युनिटपर्यंत मोफत वीज आणि छतावरील सोलरसाठी ₹७८,००० पर्यंत थेट सबसिडी.',
    },
    description: {
      en: 'A flagship national program to light up 1 crore households across India with clean solar energy. Families get subsidized solar rooftop setups that reduce electricity bills to zero and enable earning through net-metering.',
      hi: '1 करोड़ घरों को सौर ऊर्जा से रोशन करने और बिजली बिल शून्य करने की राष्ट्रीय योजना।',
      mr: '१ कोटी कुटुंबांना स्वच्छ सौर ऊर्जेने प्रकाशमान करून वीज बिल शून्य करणारी केंद्र सरकारची योजना.',
    },
    level: 'central',
    state: null,
    category: 'housing',
    official_url: 'https://pmsuryaghar.gov.in',
    application_mode: 'online',
    source_citation: 'Ministry of New & Renewable Energy, Operational Guidelines 2024',
    last_verified: '2026-10-01',
    version: '2026.2',
    is_verified_fact: true,
    benefit_type: {
      en: '₹78,000 Capital Subsidy + 300 units Free Power/mo',
      hi: '₹78,000 पूंजीगत सब्सिडी + 300 यूनिट मुफ्त बिजली/माह',
      mr: '₹७८,००० सबसिडी + दरमहा ३०० युनिट मोफत वीज',
    },
    criteria: [
      {
        id: 'pms_age',
        field: 'ageBand',
        operator: 'in',
        value: ['18_35', '36_50', '51_59', '60_plus'],
        required: true,
        verified: true,
        explanation: {
          en: 'Applicant must be an adult Indian citizen (18+ years)',
          hi: 'आवेदक वयस्क भारतीय नागरिक (18+ वर्ष) होना चाहिए',
          mr: 'अर्जदार सज्ञान भारतीय नागरिक (१८+ वर्षे) असणे आवश्यक आहे',
        },
      },
    ],
    documents: [
      {
        id: 'pms_doc_elec',
        name: {
          en: 'Recent Electricity Bill (Showing Consumer CA Number)',
          hi: 'नवीनतम बिजली बिल (उपभोक्ता संख्या सहित)',
          mr: 'अलिकडील वीज बिल (ग्राहक क्रमांक असलेले)',
        },
        mandatory: true,
      },
      {
        id: 'pms_doc_bank',
        name: {
          en: 'Bank Passbook / Cancelled Cheque (for direct subsidy transfer)',
          hi: 'बैंक पासबुक / रद्द चेक (प्रत्यक्ष सब्सिडी अंतरण हेतु)',
          mr: 'बँक पासबुक / रद्द केलेला धनादेश (थेट सबसिडी जमा करण्यासाठी)',
        },
        mandatory: true,
      },
      {
        id: 'pms_doc_roof',
        name: {
          en: 'Proof of House/Roof Ownership or Long-term Tenancy',
          hi: 'छत / मकान स्वामित्व प्रमाण या सहमति पत्र',
          mr: 'घराचे / छताचे मालकी प्रमाणपत्र किंवा संमतीपत्र',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Register on National Portal',
          hi: 'राष्ट्रीय पोर्टल पर पंजीकरण',
          mr: 'राष्ट्रीय पोर्टलवर नोंदणी करा',
        },
        instruction: {
          en: 'Visit pmsuryaghar.gov.in, select your State & Electricity Distribution Company (DISCOM), and enter your consumer number.',
          hi: 'pmsuryaghar.gov.in पर जाकर अपने राज्य व विद्युत वितरण कंपनी (DISCOM) का चयन करें।',
          mr: 'pmsuryaghar.gov.in वर जाऊन तुमचे राज्य आणि वीज वितरण कंपनी निवडून ग्राहक क्रमांक टाका.',
        },
        location_type: 'online',
      },
      {
        step_number: 2,
        title: {
          en: 'Submit Application & Get Feasibility Approval',
          hi: 'आवेदन जमा करें और तकनीकी स्वीकृति पाएं',
          mr: 'अर्ज सादर करा आणि व्यवहार्यता मंजुरी मिळवा',
        },
        instruction: {
          en: 'Apply for solar rooftop system. DISCOM will inspect roof feasibility and approve within 15 days.',
          hi: 'छत पर सोलर लगाने हेतु आवेदन करें, डिस्कॉम 15 दिनों में तकनीकी स्वीकृति देगा।',
          mr: 'सोलर सिस्टीमसाठी अर्ज करा, महावितरण १५ दिवसांत तांत्रिक मंजुरी देईल.',
        },
        location_type: 'online',
      },
      {
        step_number: 3,
        title: {
          en: 'Net Metering & Direct Subsidy in Bank Account',
          hi: 'नेट मीटरिंग और बैंक खाते में प्रत्यक्ष सब्सिडी',
          mr: 'नेट मीटरिंग आणि बँक खात्यात थेट सबसिडी जमा',
        },
        instruction: {
          en: 'Once installed and inspected, DISCOM installs a net meter. Subsidy of ₹78,000 is directly credited to your bank account within 30 days.',
          hi: 'नेट मीटर लगने के 30 दिनों के भीतर ₹78,000 की सब्सिडी सीधे आपके बैंक खाते में भेजी जाएगी।',
          mr: 'नेट मीटर बसवल्यानंतर ३० दिवसांत ₹७८,००० थेट तुमच्या बँक खात्यात जमा होतील.',
        },
        location_type: 'online',
      },
    ],
  },
  {
    id: 'pm-vishwakarma',
    code: 'PM-VISHWAKARMA',
    name: {
      en: 'PM Vishwakarma Scheme (Artisans & Craftsmen)',
      hi: 'पीएम विश्वकर्मा योजना (कारीगर एवं शिल्पकार)',
      mr: 'पीएम विश्वकर्मा योजना (कारागीर आणि शिल्पकार)',
    },
    short_summary: {
      en: 'Provides ID card, ₹15,000 toolkit voucher, skill training with ₹500/day stipend, and collateral-free loans up to ₹3,00,000 at 5% interest.',
      hi: 'पारंपरिक कारीगरों को पहचान पत्र, ₹15,000 टूलकिट अनुदान, ₹500/दिन प्रशिक्षण और ₹3 लाख तक बिना गारंटी सस्ता ऋण।',
      mr: 'पारंपारिक कारागिरांना ओळखपत्र, ₹१५,००० टूलकिट, ₹५००/दिवस प्रशिक्षण आणि ५% दराने ₹३ लाखांपर्यंत हमीमुक्त कर्ज.',
    },
    description: {
      en: 'A central sector scheme dedicated to uplifting 18 traditional trades (carpenters, blacksmiths, goldsmiths, potters, sculptors, cobblers, tailors, boat builders, weavers) with end-to-end recognition, capital, and modern market access.',
      hi: '18 पारंपरिक व्यवसायों से जुड़े शिल्पकारों और कारीगरों के समग्र विकास के लिए केंद्रीय योजना।',
      mr: '१८ पारंपारिक व्यवसायांतील कारागिरांना आर्थिक व तांत्रिक बळ देणारी केंद्र शासनाची विशेष योजना.',
    },
    level: 'central',
    state: null,
    category: 'livelihood',
    official_url: 'https://pmvishwakarma.gov.in',
    application_mode: 'both',
    source_citation: 'Ministry of MSME, Scheme Guidelines 2023-24',
    last_verified: '2026-10-01',
    version: '2026.2',
    is_verified_fact: true,
    benefit_type: {
      en: '₹15,000 Toolkit + ₹3 Lakh Loan @ 5% + ₹500/day Stipend',
      hi: '₹15,000 टूलकिट + ₹3 लाख ऋण (5% ब्याज) + ₹500/दिन वजीफा',
      mr: '₹१५,००० टूलकिट + ५% दराने ₹३ लाख कर्ज + ₹५००/दिवस भत्ता',
    },
    criteria: [
      {
        id: 'pmv_occ',
        field: 'occupation',
        operator: 'in',
        value: ['artisan', 'informal_worker', 'farmer'],
        required: true,
        verified: true,
        explanation: {
          en: 'Applicant must be engaged in one of the 18 traditional crafts, artisan work, or informal skilled trades',
          hi: 'आवेदक 18 पारंपरिक शिल्प, कारीगरी या अनौपचारिक कुशल कार्य से जुड़ा होना चाहिए',
          mr: 'अर्जदार १८ पारंपारिक हस्तकला किंवा कुशल कारागिरीच्या कामात गुंतलेला असावा',
        },
      },
    ],
    documents: [
      {
        id: 'pmv_doc_aadhaar',
        name: {
          en: 'Aadhaar Card (Linked to Mobile Number)',
          hi: 'आधार कार्ड (मोबाइल से लिंक)',
          mr: 'आधार कार्ड (मोबाईल लिंक असलेले)',
        },
        mandatory: true,
      },
      {
        id: 'pmv_doc_bank',
        name: {
          en: 'Bank Passbook / Account Details',
          hi: 'बैंक पासबुक / खाता विवरण',
          mr: 'बँक पासबुक / खाते तपशील',
        },
        mandatory: true,
      },
      {
        id: 'pmv_doc_trade',
        name: {
          en: 'Self-Declaration / Gram Panchayat Certificate of Trade Practice',
          hi: 'पारंपरिक व्यवसाय का स्व-घोषणा पत्र / ग्राम पंचायत प्रमाण',
          mr: 'पारंपारिक व्यवसायाचे स्व-घोषणापत्र / ग्रामपंचायत प्रमाणपत्र',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'CSC Biometric Registration',
          hi: 'सीएससी केंद्र पर बायोमेट्रिक पंजीकरण',
          mr: 'सीएससी केंद्रावर बायोमेट्रिक नोंदणी',
        },
        instruction: {
          en: 'Visit your nearest Common Services Center (CSC Kendra) with Aadhaar and bank details for free biometric verification.',
          hi: 'नजदीकी सीएससी केंद्र पर जाकर बायोमेट्रिक सत्यापन के साथ निःशुल्क पंजीकरण कराएं।',
          mr: 'जवळच्या सीएससी केंद्रात जाऊन मोफत बायोमेट्रिक पडताळणीसह नोंदणी करा.',
        },
        location_type: 'csc_kendra',
      },
      {
        step_number: 2,
        title: {
          en: 'Gram Panchayat & District Committee Verification',
          hi: 'ग्राम पंचायत एवं जिला समिति सत्यापन',
          mr: 'ग्रामपंचायत व जिल्हा समिती पडताळणी',
        },
        instruction: {
          en: 'Your application is verified online by the Village Sarpanch or Urban Local Body, followed by District Screening.',
          hi: 'ग्राम प्रधान / नगर निकाय एवं जिला समिति द्वारा ऑनलाइन सत्यापन किया जाता है।',
          mr: 'ग्रामपंचायत किंवा नगरपालिकेद्वारे अर्जाची ऑनलाइन पडताळणी केली जाते.',
        },
        location_type: 'online',
      },
      {
        step_number: 3,
        title: {
          en: 'Receive PM Vishwakarma Certificate & Toolkit Grant',
          hi: 'प्रमाणपत्र एवं टूलकिट ई-वाउचर प्राप्त करें',
          mr: 'प्रमाणपत्र आणि टूलकिट ई-व्हाउचर मिळवा',
        },
        instruction: {
          en: 'Download your PM Vishwakarma Digital ID, attend 5 days basic training (₹500/day allowance), and receive ₹15,000 for modern tools.',
          hi: 'डिजिटल प्रमाण पत्र प्राप्त करें, 5 दिन का प्रशिक्षण पूरा कर ₹15,000 का टूलकिट ई-वाउचर पाएं।',
          mr: 'डिजिटल प्रमाणपत्र मिळवा, ५ दिवसांचे प्रशिक्षण घेऊन ₹१५,००० चे टूलकिट व्हाउचर मिळवा.',
        },
        location_type: 'bank_branch',
      },
    ],
  },
  {
    id: 'lakhpati-didi',
    code: 'LAKHPATI-DIDI',
    name: {
      en: 'Lakhpati Didi Initiative (Women SHGs)',
      hi: 'लखपति दीदी योजना (महिला स्वयं सहायता समूह)',
      mr: 'लखपती दीदी उपक्रम (महिला बचत गट)',
    },
    short_summary: {
      en: 'Empowers rural women in Self-Help Groups (SHGs) with technical training, micro-enterprise loans, and market linkage to earn ₹1,00,000+ per year.',
      hi: 'स्वयं सहायता समूह की महिलाओं को कौशल प्रशिक्षण, व्यवसाय ऋण और बाजार संपर्क देकर सालाना ₹1 लाख से अधिक आय का लक्ष्य।',
      mr: 'बचत गटातील महिलांना व्यवसाय प्रशिक्षण, बिनव्याजी भांडवल आणि बाजारपेठ उपलब्ध करून वार्षिक ₹१ लाखाहून अधिक उत्पन्न मिळवून देणे.',
    },
    description: {
      en: 'A nation-building initiative aiming to create 3 crore Lakhpati Didis across rural India. Women members receive comprehensive entrepreneurship development, financial literacy, agricultural value-chain training, and subsidized credit through SHG federations.',
      hi: 'देश भर की 3 करोड़ ग्रामीण महिलाओं को आर्थिक रूप से आत्मनिर्भर और लखपति बनाने की योजना।',
      mr: 'ग्रामीण भारतातील ३ कोटी महिलांना आर्थिकदृष्ट्या सक्षम आणि लखपती बनवण्याची राष्ट्रीय मोहीम.',
    },
    level: 'central',
    state: null,
    category: 'women_child',
    official_url: 'https://nrlm.gov.in',
    application_mode: 'both',
    source_citation: 'Ministry of Rural Development, Deendayal Antyodaya Yojana - NRLM Guidelines',
    last_verified: '2026-10-01',
    version: '2026.2',
    is_verified_fact: true,
    benefit_type: {
      en: '₹1-5 Lakh Enterprise Loan + Skill Training + Market Linkage',
      hi: '₹1-5 लाख व्यवसाय ऋण + कौशल्य प्रशिक्षण + बाजार संपर्क',
      mr: '₹१-५ लाख व्यवसाय कर्ज + कौशल्य प्रशिक्षण + बाजारपेठ जोडणी',
    },
    criteria: [
      {
        id: 'lkd_gender',
        field: 'gender',
        operator: 'eq',
        value: 'female',
        required: true,
        verified: true,
        explanation: {
          en: 'Applicant must be a woman residing in India',
          hi: 'आवेदक महिला होनी चाहिए',
          mr: 'अर्जदार महिला असणे आवश्यक आहे',
        },
      },
    ],
    documents: [
      {
        id: 'lkd_doc_aadhaar',
        name: {
          en: 'Aadhaar Card',
          hi: 'आधार कार्ड',
          mr: 'आधार कार्ड',
        },
        mandatory: true,
      },
      {
        id: 'lkd_doc_shg',
        name: {
          en: 'Self-Help Group (SHG) Membership Passbook / Resolution',
          hi: 'स्वयं सहायता समूह सदस्यता पासबुक / प्रस्ताव',
          mr: 'महिला बचत गट सदस्यत्व पासबुक / ठराव पत्र',
        },
        mandatory: true,
      },
      {
        id: 'lkd_doc_bank',
        name: {
          en: 'Individual Bank Account Linked with Aadhaar',
          hi: 'आधार लिंक बैंक खाता पासबुक',
          mr: 'आधार लिंक केलेले वैयक्तिक बँक पासबुक',
        },
        mandatory: true,
      },
    ],
    steps: [
      {
        step_number: 1,
        title: {
          en: 'Connect with Village SHG / Cluster Level Federation',
          hi: 'ग्राम संगठन / संकुल स्तरीय महासंघ से संपर्क',
          mr: 'ग्रामसंघ किंवा प्रभाग समन्वयकाशी संपर्क साधा',
        },
        instruction: {
          en: 'Inform your Self-Help Group leader or Community Resource Person (CRP) about your chosen micro-enterprise activity.',
          hi: 'अपने स्वयं सहायता समूह की बैठक में अपनी आजीविका योजना का प्रस्ताव रखें।',
          mr: 'आपल्या बचत गट बैठकीत व्यवसाय योजनेचा ठराव मांडून मंजुरी घ्या.',
        },
        location_type: 'tehsil_office',
      },
      {
        step_number: 2,
        title: {
          en: 'Skill & Entrepreneurship Training',
          hi: 'कौशल एवं व्यवसाय प्रबंधन प्रशिक्षण',
          mr: 'कौशल्य व व्यवसाय व्यवस्थापन प्रशिक्षण',
        },
        instruction: {
          en: 'Attend dedicated training organized by RSETI or NRLM in food processing, drone piloting, organic farming, or tailoring.',
          hi: 'आरसेटी या एनआरएलएम द्वारा आयोजित निःशुल्क कौशल प्रशिक्षण में भाग लें।',
          mr: 'आरसेटी किंवा एनआरएलएम आयोजित मोफत कौशल्य प्रशिक्षण पूर्ण करा.',
        },
        location_type: 'online',
      },
      {
        step_number: 3,
        title: {
          en: 'Access Capital & Market Linkages',
          hi: 'ऋण राशि प्राप्त करें और उत्पाद बेचें',
          mr: 'कर्ज निधी मिळवून उत्पादन विक्री सुरू करा',
        },
        instruction: {
          en: 'Receive Community Investment Fund (CIF) loan or bank credit to launch your business and sell on GeM portal or Saras fairs.',
          hi: 'बैंक या ग्राम संगठन से आसान किस्तों पर ऋण लेकर अपना काम शुरू करें।',
          mr: 'बँकेकडून किंवा ग्रामसंघाकडून सुलभरित्या भांडवल घेऊन व्यवसाय सुरू करा.',
        },
        location_type: 'bank_branch',
      },
    ],
  },
];
