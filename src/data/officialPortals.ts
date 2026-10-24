/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LocalizedString } from '../lib/engine/types.ts';

export interface OfficialPortal {
  id: string;
  name: LocalizedString;
  category: 'agriculture' | 'enterprise' | 'national_directory' | 'state_gateway' | 'procurement_tenders';
  description: LocalizedString;
  official_url: string;
  department: LocalizedString;
  badge: string;
  keyServices: LocalizedString[];
  requiredDocuments: LocalizedString[];
}

export const OFFICIAL_PORTALS: OfficialPortal[] = [
  {
    id: 'pm-kisan-portal',
    name: {
      en: 'PM-KISAN Official Portal',
      hi: 'पीएम-किसान आधिकारिक पोर्टल',
      mr: 'पीएम-किसान अधिकृत पोर्टल',
    },
    category: 'agriculture',
    description: {
      en: 'Central sector scheme portal for direct income support of ₹6,000/year to landholding farmer families across India.',
      hi: 'देश भर के भूमिधारक किसान परिवारों को ₹6,000 वार्षिक प्रत्यक्ष आय सहायता हेतु केंद्रीय पोर्टल।',
      mr: 'देशातील शेतकरी कुटुंबांना दरवर्षी ₹६,००० थेट बँक खात्यात मिळण्यासाठीचे अधिकृत पोर्टल.',
    },
    official_url: 'https://pmkisan.gov.in',
    department: {
      en: 'Ministry of Agriculture & Farmers Welfare, GoI',
      hi: 'कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार',
      mr: 'कृषी आणि शेतकरी कल्याण मंत्रालय, भारत सरकार',
    },
    badge: 'Direct Benefit Transfer (DBT)',
    keyServices: [
      {
        en: 'Beneficiary Status Check & e-KYC',
        hi: 'लाभार्थी स्थिति जांच एवं ई-केवाईसी',
        mr: 'लाभार्थी स्थिती तपासणी आणि ई-केवायसी',
      },
      {
        en: 'New Farmer Registration & Aadhaar Updation',
        hi: 'नवीन किसान पंजीकरण एवं आधार सुधार',
        mr: 'नवीन शेतकरी नोंदणी आणि आधार दुरुस्ती',
      },
    ],
    requiredDocuments: [
          {
                "en": "Aadhaar Card (Biometric / OTP Authentication)",
                "hi": "आधार कार्ड (पहचान एवं ई-केवाईसी सत्यापन)",
                "mr": "आधार कार्ड (ओळख पडताळणी व ई-केवायसी)"
          },
          {
                "en": "Updated 7/12 Extract / Khatauni / Jamabandi Land Record",
                "hi": "अद्यतन भूमि स्वामित्व नकल (खतौनी / जमाबंदी)",
                "mr": "अद्ययावत ७/१२ व ८-अ शेतजमीन उतारा"
          },
          {
                "en": "Aadhaar-seeded Active Bank Account Passbook",
                "hi": "आधार से जुड़ा सक्रिय बैंक खाता पासबुक (डीबीटी हेतु)",
                "mr": "आधारशी जोडलेले सक्रिय बँक खाते पासबुक (डीबीटीसाठी)"
          },
          {
                "en": "Mobile Number linked with Aadhaar for OTP verification",
                "hi": "ई-केवाईसी हेतु आधार से जुड़ा सक्रिय मोबाइल नंबर",
                "mr": "ई-केवायसीसाठी आधार लिंक असलेला चालू मोबाईल क्रमांक"
          }
    ],
  },
  {
    id: 'mahadbt-farmer-portal',
    name: {
      en: 'MahaDBT Farmer Portal (Maharashtra)',
      hi: 'महाडीबीटी शेतकरी पोर्टल (महाराष्ट्र)',
      mr: 'महाडीबीटी शेतकरी योजना पोर्टल (महाराष्ट्र)',
    },
    category: 'agriculture',
    description: {
      en: 'Maharashtra State single window portal for farm mechanization, drip irrigation, seeds, and farm pond subsidies.',
      hi: 'कृषि यंत्रीकरण, ड्रिप सिंचाई, बीज और शेततले सब्सिडी हेतु महाराष्ट्र सरकार का एकीकृत पोर्टल।',
      mr: 'कृषी यांत्रिकीकरण, ठिबक सिंचन, बियाणे आणि शेततळे अनुदानासाठी महाराष्ट्र शासनाचे एकत्रित पोर्टल.',
    },
    official_url: 'https://mahadbt.maharashtra.gov.in/Farmer/AgriLogin/AgriLogin',
    department: {
      en: 'Department of Agriculture, Government of Maharashtra',
      hi: 'कृषि विभाग, महाराष्ट्र शासन',
      mr: 'कृषी विभाग, महाराष्ट्र शासन',
    },
    badge: 'Maharashtra State Single Window',
    keyServices: [
      {
        en: 'Tractor & Farm Equipment Subsidy',
        hi: 'ट्रैक्टर एवं कृषि यंत्र सब्सिडी',
        mr: 'ट्रॅक्टर व कृषी अवजारे अनुदान योजना',
      },
      {
        en: 'Micro-Irrigation (Drip & Sprinkler) Grants',
        hi: 'सूक्ष्म सिंचाई (ड्रिप व स्प्रिंकलर) अनुदान',
        mr: 'ठिबक व तुषार सिंचन अनुदान योजना',
      },
      {
        en: 'Magel Tyala Shettale (Farm Pond Scheme)',
        hi: 'मागेल त्याला शेततळे योजना',
        mr: 'मागेल त्याला शेततळे योजना अर्ज',
      },
    ],
    requiredDocuments: [
          {
                "en": "Updated 7/12 & 8-A Land Record Extracts",
                "hi": "अद्यतन 7/12 एवं 8A भूमि रिकॉर्ड नकल",
                "mr": "अद्ययावत ७/१२ व ८-अ शेतजमीन उतारा"
          },
          {
                "en": "Aadhaar Card of the Farmer",
                "hi": "किसान का आधार कार्ड",
                "mr": "शेतकऱ्याचे आधार कार्ड"
          },
          {
                "en": "Active Bank Account Passbook or Cancelled Cheque",
                "hi": "बैंक पासबुक अथवा रद्द चेक (IFSC सहित)",
                "mr": "बँक पासबुक किंवा रद्द केलेला धनादेश"
          },
          {
                "en": "Caste Certificate (if claiming SC/ST/OBC subsidy rates)",
                "hi": "जाति प्रमाण पत्र (यदि आरक्षित वर्ग सब्सिडी हेतु लागू हो)",
                "mr": "जात प्रमाणपत्र (मागासवर्गीय सवलतींसाठी लागू असल्यास)"
          },
          {
                "en": "Crop Sowing Declaration / e-Pik Pahani Entry",
                "hi": "फसल बुवाई स्व-घोषणा पत्र / ई-पीक पाहणी",
                "mr": "ई-पीक पाहणी नोंद किंवा पीक पेरणी स्वयंघोषणापत्र"
          }
    ],
  },
  {
    id: 'pmfby-portal',
    name: {
      en: 'PM Fasal Bima Yojana (PMFBY)',
      hi: 'प्रधानमंत्री फसल बीमा योजना (पीएमएफबीवाई)',
      mr: 'प्रधानमंत्री पीक विमा योजना (पीएमएफबीवाय)',
    },
    category: 'agriculture',
    description: {
      en: 'National comprehensive crop insurance portal protecting farmers against localized natural calamities, pest attacks, and post-harvest losses.',
      hi: 'प्राकृतिक आपदाओं, कीट प्रकोप और कटाई उपरांत नुकसान से किसानों को व्यापक सुरक्षा देने वाला राष्ट्रीय फसल बीमा पोर्टल।',
      mr: 'नैसर्गिक आपत्ती आणि पिकांच्या नुकसानीपासून शेतकऱ्यांना संरक्षण देणारे राष्ट्रीय पीक विमा पोर्टल.',
    },
    official_url: 'https://pmfby.gov.in',
    department: {
      en: 'Ministry of Agriculture & Farmers Welfare, GoI',
      hi: 'कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार',
      mr: 'कृषी आणि शेतकरी कल्याण मंत्रालय, भारत सरकार',
    },
    badge: 'National Crop Insurance',
    keyServices: [
      {
        en: 'Online Crop Insurance Application & Premium Calculator',
        hi: 'ऑनलाइन फसल बीमा आवेदन एवं प्रीमियम गणना',
        mr: 'ऑनलाइन पीक विमा अर्ज आणि हप्ता गणना',
      },
      {
        en: 'Claim Status Tracking & Local Calamity Intimation',
        hi: 'दावा स्थिति ट्रैकिंग एवं स्थानीय आपदा सूचना',
        mr: 'विमा भरपाई स्थिती आणि पीक नुकसान पूर्वसूचना',
      },
    ],
    requiredDocuments: [
          {
                "en": "Aadhaar Card of Landholder or Tenant Farmer",
                "hi": "किसान अथवा काश्तकार का आधार कार्ड",
                "mr": "शेतकरी किंवा कुळाचे आधार कार्ड"
          },
          {
                "en": "Land Ownership Record (7/12 / Khatauni) or Registered Tenancy Agreement",
                "hi": "भूमि स्वामित्व नकल (7/12 / पट्टा) अथवा बटाईदार अनुबंध पत्र",
                "mr": "जमीन मालकी पुरावा (७/१२ उतारा) किंवा भाडेपट्टा करारनामा"
          },
          {
                "en": "Crop Sowing Certificate / Self-Declaration of Sown Acreage",
                "hi": "फसल बुवाई प्रमाण पत्र / बोई गई भूमि का स्व-घोषणा पत्र",
                "mr": "पीक पेरणी स्वयंघोषणापत्र किंवा तलाठी पीक पेरा दाखला"
          },
          {
                "en": "Bank Account Passbook showing Account Number & IFSC",
                "hi": "आईएफएससी कोड सहित सक्रिय बैंक खाता पासबुक",
                "mr": "आयएफएससी कोड असलेले चालू बँक खाते पासबुक"
          }
    ],
  },
  {
    id: 'india-gov-schemes',
    name: {
      en: 'National Portal of India — Schemes Directory',
      hi: 'भारत का राष्ट्रीय पोर्टल — सरकारी योजनाएं',
      mr: 'भारताचे राष्ट्रीय पोर्टल — शासकीय योजना निर्देशिका',
    },
    category: 'national_directory',
    description: {
      en: 'The apex single-source directory of all Central and State government welfare schemes and citizen services across India.',
      hi: 'भारत भर की सभी केंद्रीय एवं राज्य स्तरीय जनकल्याणकारी योजनाओं और नागरिक सेवाओं की आधिकारिक निर्देशिका।',
      mr: 'भारतातील सर्व केंद्र व राज्य शासनाच्या कल्याणकारी योजनांची अधिकृत मध्यवर्ती निर्देशिका.',
    },
    official_url: 'https://www.india.gov.in/my-government/schemes',
    department: {
      en: 'National Informatics Centre (NIC), MeitY, GoI',
      hi: 'राष्ट्रीय सूचना विज्ञान केंद्र (NIC), इलेक्ट्रॉनिकी एवं सूचना प्रौद्योगिकी मंत्रालय',
      mr: 'राष्ट्रीय सूचना विज्ञान केंद्र (NIC), भारत सरकार',
    },
    badge: 'Apex National Directory',
    keyServices: [
      {
        en: 'Consolidated Directory of Central & State Schemes',
        hi: 'केंद्रीय एवं राज्य योजनाओं की समेकित निर्देशिका',
        mr: 'सर्व शासकीय योजनांची एकत्रित माहिती',
      },
      {
        en: 'Access to All Ministry Portals & Gazettes',
        hi: 'सभी मंत्रालयों के पोर्टल एवं राजपत्र लिंक',
        mr: 'सर्व मंत्रालय व राजपत्रांचे थेट दुवे',
      },
    ],
    requiredDocuments: [
          {
                "en": "Aadhaar Card or Jan Parichay (National SSO) Credentials",
                "hi": "आधार कार्ड अथवा जन परिचय (राष्ट्रीय एसएसओ) लॉगिन",
                "mr": "आधार कार्ड किंवा जन परिचय (राष्ट्रीय एसएसओ) लॉगिन"
          },
          {
                "en": "Mobile Number registered with Aadhaar for OTP Login",
                "hi": "ओटीपी सत्यापन हेतु आधार लिंक मोबाइल नंबर",
                "mr": "ओटीपी पडताळणीसाठी आधारशी जोडलेला मोबाईल क्रमांक"
          },
          {
                "en": "Scheme-specific Proofs (Income, Land, Domicile or Category)",
                "hi": "संबंधित योजना अनुसार आवश्यक पात्रता दस्तावेज (आय, निवास, भूमि)",
                "mr": "संबंधित योजनेनुसार आवश्यक कागदपत्रे (उत्पन्न, रहिवासी, जात)"
          }
    ],
  },
  {
    id: 'startup-india-portal',
    name: {
      en: 'Startup India Portal',
      hi: 'स्टार्टअप इंडिया पोर्टल',
      mr: 'स्टार्टअप इंडिया अधिकृत पोर्टल',
    },
    category: 'enterprise',
    description: {
      en: 'Flagship initiative portal to build a strong ecosystem for nurturing innovation, providing DPIIT recognition, tax exemptions, and seed funds.',
      hi: 'नवाचार को बढ़ावा देने, डीपीआईआईटी मान्यता, 3 वर्ष आयकर छूट और सीड फंड सहायता हेतु राष्ट्रीय पोर्टल।',
      mr: 'नवउद्योजक, डीपीआयआयटी मान्यता, कर सवलत आणि सीड फंडासाठी केंद्र सरकारचा उपक्रम.',
    },
    official_url: 'https://www.startupindia.gov.in',
    department: {
      en: 'DPIIT, Ministry of Commerce and Industry, GoI',
      hi: 'डीपीआईआईटी, वाणिज्य एवं उद्योग मंत्रालय, भारत सरकार',
      mr: 'उद्योग आणि अंतर्गत व्यापार संवर्धन विभाग (DPIIT)',
    },
    badge: 'Innovation & Seed Capital',
    keyServices: [
      {
        en: 'DPIIT Startup Recognition & Certificate',
        hi: 'डीपीआईआईटी स्टार्टअप मान्यता प्रमाण पत्र',
        mr: 'डीपीआयआयटी स्टार्टअप मान्यता व प्रमाणपत्र',
      },
      {
        en: 'Startup India Seed Fund Scheme (SISFS) up to ₹50 Lakh',
        hi: 'स्टार्टअप इंडिया सीड फंड योजना (₹50 लाख तक)',
        mr: 'स्टार्टअप इंडिया सीड फंड योजना (₹५० लाखांपर्यंत)',
      },
      {
        en: 'Section 80-IAC 3-Year Income Tax Exemption',
        hi: 'धारा 80-आईएसी अंतर्गत 3 वर्ष आयकर छूट',
        mr: 'कलम ८०-आयएसी अंतर्गत ३ वर्षे आयकर सवलत',
      },
    ],
    requiredDocuments: [
          {
                "en": "Certificate of Incorporation (MCA) or Registered Partnership Deed",
                "hi": "कंपनी निगमन प्रमाण पत्र (MCA) अथवा पंजीकृत भागीदारी डीड",
                "mr": "कंपनी नोंदणी प्रमाणपत्र (MCA) किंवा भागीदारी करारनामा"
          },
          {
                "en": "Permanent Account Number (PAN) Card of the Entity",
                "hi": "व्यावसायिक इकाई/स्टार्टअप का स्थायी खाता संख्या (पैन)",
                "mr": "स्टार्टअप किंवा व्यावसायिक संस्थेचे पॅन कार्ड"
          },
          {
                "en": "Pitch Deck / Proof of Concept / Innovation & Scalability Note",
                "hi": "नवाचार एवं व्यापार विस्तार योजना (पिच डेक/प्रूफ ऑफ कॉन्सेप्ट)",
                "mr": "नवकल्पना, स्केलेबिलिटी व व्यवसाय योजना (पिच डेक/प्रकल्प आराखडा)"
          },
          {
                "en": "Letter of Authorization / Board Resolution for Signatory",
                "hi": "अधिकृत हस्ताक्षरकर्ता हेतु प्राधिकार पत्र / बोर्ड प्रस्ताव",
                "mr": "अधिकृत प्रतिनिधीसाठी प्राधिकार पत्र किंवा संचालक मंडळाचा ठराव"
          },
          {
                "en": "Patent / Trademark Filing Certificates (if applicable)",
                "hi": "पेटेंट अथवा ट्रेडमार्क आवेदन प्रमाण पत्र (यदि उपलब्ध हो)",
                "mr": "पेटंट किंवा ट्रेडमार्क नोंदणी प्रमाणपत्र (लागू असल्यास)"
          }
    ],
  },
  {
    id: 'udyam-registration-portal',
    name: {
      en: 'Udyam Registration Portal (MSME)',
      hi: 'उद्यम पंजीकरण पोर्टल (एमएसएमई)',
      mr: 'उद्यम नोंदणी पोर्टल (सूक्ष्म, लघु व मध्यम उद्योग)',
    },
    category: 'enterprise',
    description: {
      en: 'The only official, zero-fee Government of India portal for paperless MSME registration and permanent digital certificate generation.',
      hi: 'कागज रहित निःशुल्क आधिकारिक एमएसएमई पंजीकरण और डिजिटल प्रमाण पत्र हेतु भारत सरकार का अधिकृत पोर्टल।',
      mr: 'सूक्ष्म, लघु आणि मध्यम उद्योगांसाठी मोफत व कागदपत्रविरहित अधिकृत केंद्र शासकीय नोंदणी पोर्टल.',
    },
    official_url: 'https://udyamregistration.gov.in',
    department: {
      en: 'Ministry of Micro, Small & Medium Enterprises, GoI',
      hi: 'सूक्ष्म, लघु एवं मध्यम उद्यम मंत्रालय, भारत सरकार',
      mr: 'सूक्ष्म, लघू आणि मध्यम उद्योग मंत्रालय, भारत सरकार',
    },
    badge: 'Official MSME Certification',
    keyServices: [
      {
        en: 'Free Online MSME Udyam Registration (Zero Cost)',
        hi: 'निःशुल्क ऑनलाइन उद्यम पंजीकरण (शून्य शुल्क)',
        mr: 'मोफत ऑनलाइन उद्यम नोंदणी (शून्य शुल्क)',
      },
      {
        en: 'Priority Sector Bank Lending & Collateral Free Credit',
        hi: 'प्राथमिकता क्षेत्र बैंक ऋण एवं बिना गारंटी पूंजी',
        mr: 'प्राधान्य क्षेत्रातील सुलभ बँक कर्ज व हमीमुक्त भांडवल',
      },
      {
        en: 'MSME Samadhaan Protection against Delayed Payments',
        hi: 'विलंबित भुगतान के विरुद्ध एमएसएमई समाधान संरक्षण',
        mr: 'थकीत बिलांविरोधात एमएसएमई समाधान निवारण',
      },
    ],
    requiredDocuments: [
          {
                "en": "Aadhaar Card of Proprietor, Managing Partner, or Director",
                "hi": "मालिक, प्रबंध भागीदार अथवा अधिकृत निदेशक का आधार कार्ड",
                "mr": "मालक, भागीदार किंवा अधिकृत संचालकाचे आधार कार्ड"
          },
          {
                "en": "PAN Card of Enterprise and Business Owner",
                "hi": "उद्यम एवं व्यवसाय मालिक का पैन कार्ड",
                "mr": "उद्योग आणि व्यवसाय मालकाचे पॅन कार्ड"
          },
          {
                "en": "Active Business Bank Account Number and IFSC Code",
                "hi": "सक्रिय व्यावसायिक बैंक खाता संख्या एवं आईएफएससी कोड",
                "mr": "सक्रिय व्यावसायिक बँक खाते क्रमांक व आयएफएससी कोड"
          },
          {
                "en": "GSTIN Registration Details (if mandated under GST Law)",
                "hi": "जीएसटी पंजीकरण संख्या (यदि वस्तु एवं सेवा कर नियमानुसार लागू हो)",
                "mr": "जीएसटी नोंदणी क्रमांक (जीएसटी कायद्यानुसार लागू असल्यास)"
          }
    ],
  },
  {
    id: 'sidbi-portal',
    name: {
      en: 'SIDBI — Small Industries Development Bank of India',
      hi: 'सिडबी — भारतीय लघु उद्योग विकास बैंक',
      mr: 'सिडबी — भारतीय लघु उद्योग विकास बँक',
    },
    category: 'enterprise',
    description: {
      en: 'The principal financial institution for promotion, financing, and development of Micro, Small and Medium Enterprises (MSMEs) in India.',
      hi: 'भारत में सूक्ष्म, लघु और मध्यम उद्यमों (एमएसएमई) के वित्तपोषण, संवर्धन और विकास का सर्वोच्च वित्तीय संस्थान।',
      mr: 'भारतातील लघू आणि मध्यम उद्योगांना कर्जपुरवठा करणारी शिखर वित्तीय संस्था.',
    },
    official_url: 'https://www.sidbi.in/en',
    department: {
      en: 'Statutory Body under Ministry of Finance, GoI',
      hi: 'वित्त मंत्रालय के अंतर्गत संविधिक निकाय, भारत सरकार',
      mr: 'वित्त मंत्रालय, भारत सरकार अंतर्गत वैधानिक संस्था',
    },
    badge: 'MSME Apex Bank & Venture Capital',
    keyServices: [
      {
        en: 'Direct Term Loans for Machinery & Business Expansion',
        hi: 'मशीनरी एवं व्यवसाय विस्तार हेतु प्रत्यक्ष मियादी ऋण',
        mr: 'मशिनरी खरेदी व व्यवसाय विस्तारासाठी थेट कर्ज',
      },
      {
        en: 'Green Finance & Energy Efficiency Lending',
        hi: 'हरित वित्तपोषण एवं ऊर्जा दक्षता ऋण',
        mr: 'सौर ऊर्जा व पर्यावरणपूरक उद्योगांसाठी विशेष कर्ज',
      },
      {
        en: 'Venture Capital Fund-of-Funds for Startups',
        hi: 'स्टार्टअप्स के लिए वेंचर कैपिटल फंड-ऑफ-फंड्स',
        mr: 'स्टार्टअप उद्योगांसाठी व्हेंचर कॅपिटल गुंतवणूक निधी',
      },
    ],
    requiredDocuments: [
          {
                "en": "Detailed Project Report (DPR) with Financial Model & Capital Outlay",
                "hi": "वित्तीय मॉडल एवं पूंजीगत लागत सहित विस्तृत परियोजना रिपोर्ट (डीपीआर)",
                "mr": "सविस्तर प्रकल्प अहवाल (DPR), तांत्रिक व्यवहार्यता व भांडवली खर्च"
          },
          {
                "en": "Audited Financial Statements (Balance Sheet & P&L) for past 2-3 years",
                "hi": "विगत 2-3 वर्षों की सीए ऑडिटेड बैलेंस शीट एवं लाभ-हानि विवरण",
                "mr": "मागील २-३ वर्षांचे सीए प्रमाणित ताळेबंद व नफा-तोटा पत्रक"
          },
          {
                "en": "Promoter & Director KYC (PAN, Aadhaar & Residence Proof)",
                "hi": "प्रवर्तकों एवं निदेशकों के केवाईसी दस्तावेज (पैन, आधार व निवास)",
                "mr": "प्रवर्तक व संचालकांचे केवायसी (पॅन, आधार व निवास पुरावा)"
          },
          {
                "en": "Primary Operating Bank Statements for the past 6 to 12 months",
                "hi": "प्राथमिक परिचालन बैंक खाते का विगत 6 से 12 माह का विवरण",
                "mr": "मागील ६ ते १२ महिन्यांचे मुख्य बँक खाते स्टेटमेंट"
          },
          {
                "en": "Collateral / Security Property Title Documents (where applicable)",
                "hi": "बंधक / संपार्श्विक संपत्ति के स्वामित्व विलेख (यदि लागू हो)",
                "mr": "तारण मालमत्तेचे मालकी हक्क कागदपत्रे (लागू असल्यास)"
          }
    ],
  },
  {
    id: 'mudra-portal',
    name: {
      en: 'Pradhan Mantri MUDRA Yojana (PMMY)',
      hi: 'प्रधानमंत्री मुद्रा योजना (पीएमएमवाई)',
      mr: 'प्रधानमंत्री मुद्रा योजना (पीएमएमवाय)',
    },
    category: 'enterprise',
    description: {
      en: 'Provides collateral-free institutional loans up to ₹10-20 Lakhs across Shishu, Kishore, and Tarun categories for non-corporate small businesses.',
      hi: 'गैर-कॉर्पोरेट छोटे व्यवसायों को शिशु, किशोर और तरुण श्रेणियों में ₹10 से ₹20 लाख तक बिना गारंटी संस्थागत ऋण।',
      mr: 'लहान व्यवसाय, दुकानदार आणि कारागिरांना हमीशिवाय ₹१० ते ₹२० लाखांपर्यंत सुलभ मुद्रा कर्ज.',
    },
    official_url: 'https://www.mudra.org.in',
    department: {
      en: 'Department of Financial Services, Ministry of Finance, GoI',
      hi: 'वित्तीय सेवाएं विभाग, वित्त मंत्रालय, भारत सरकार',
      mr: 'वित्तीय सेवा विभाग, वित्त मंत्रालय, भारत सरकार',
    },
    badge: 'Collateral-Free Micro Credit',
    keyServices: [
      {
        en: 'Shishu Loan: Up to ₹50,000 for New Ventures',
        hi: 'शिशु ऋण: नए व्यवसायों हेतु ₹50,000 तक',
        mr: 'शिशू कर्ज: नवीन व्यवसायासाठी ₹५०,००० पर्यंत',
      },
      {
        en: 'Kishore Loan: ₹50,000 to ₹5,00,000 for Established Units',
        hi: 'किशोर ऋण: स्थापित इकाइयों हेतु ₹50,000 से ₹5 लाख तक',
        mr: 'किशोर कर्ज: चालू व्यवसायासाठी ₹५०,००० ते ₹५ लाख',
      },
      {
        en: 'Tarun Loan: ₹5,00,000 to ₹20,00,000 for Business Expansion',
        hi: 'तरुण ऋण: व्यवसाय विस्तार हेतु ₹5 लाख से ₹20 लाख तक',
        mr: 'तरुण कर्ज: व्यवसाय विस्तारासाठी ₹५ लाख ते ₹२० लाख',
      },
    ],
    requiredDocuments: [
          {
                "en": "Identity Proof (Aadhaar Card / Voter ID / Driving License / Passport)",
                "hi": "पहचान प्रमाण (आधार कार्ड / मतदाता पहचान पत्र / ड्राइविंग लाइसेंस)",
                "mr": "ओळख पुरावा (आधार कार्ड / मतदार ओळखपत्र / वाहन परवाना)"
          },
          {
                "en": "Address Proof (Aadhaar / Recent Electricity Bill / Ration Card)",
                "hi": "निवास प्रमाण (आधार कार्ड / बिजली बिल / राशन कार्ड)",
                "mr": "पत्ता पुरावा (आधार कार्ड / चालू वीज बिल / रेशन कार्ड)"
          },
          {
                "en": "Proof of Business Enterprise (Udyam Registration / Shop Act License / Trade Proof)",
                "hi": "व्यवसाय प्रमाण (उद्यम पंजीकरण / शॉप एक्ट / व्यापार स्थापना प्रमाण)",
                "mr": "व्यवसाय पुरावा (उद्यम नोंदणी / गुमास्ता - शॉप ॲक्ट परवाना)"
          },
          {
                "en": "Quotation / Proforma Invoice of Machinery or Equipment to be purchased",
                "hi": "खरीदी जाने वाली मशीनरी, उपकरण या माल का कोटेशन / प्रोफार्मा इनवॉयस",
                "mr": "खरेदी करावयाच्या यंत्रसामग्री किंवा मालाचे अधिकृत कोटेशन"
          },
          {
                "en": "Bank Account Statement of existing account for the last 6 months",
                "hi": "विद्यमान खाते का विगत 6 माह का बैंक खाता विवरण",
                "mr": "मागील ६ महिन्यांचे बँक खाते स्टेटमेंट"
          }
    ],
  },
  {
    id: 'standup-india-portal',
    name: {
      en: 'Stand-Up India Scheme Portal',
      hi: 'स्टैंड-अप इंडिया योजना पोर्टल',
      mr: 'स्टँड-अप इंडिया योजना पोर्टल',
    },
    category: 'enterprise',
    description: {
      en: 'Facilitates bank loans between ₹10 Lakh and ₹1 Crore to at least one SC or ST borrower and at least one woman borrower per bank branch.',
      hi: 'प्रत्येक बैंक शाखा द्वारा कम से कम एक एससी/एसटी और एक महिला उद्यमी को ₹10 लाख से ₹1 करोड़ तक का बैंक ऋण उपलब्ध कराना।',
      mr: 'प्रत्येक बँक शाखेद्वारे किमान एक महिला आणि एक अनुसूचित जाती/जमाती उद्योजकाला ₹१० लाख ते ₹१ कोटी कर्ज.',
    },
    official_url: 'https://www.standupmitra.in',
    department: {
      en: 'Department of Financial Services, Ministry of Finance, GoI',
      hi: 'वित्तीय सेवाएं विभाग, वित्त मंत्रालय, भारत सरकार',
      mr: 'वित्तीय सेवा विभाग, वित्त मंत्रालय, भारत सरकार',
    },
    badge: 'Women & SC/ST Enterprise Lending',
    keyServices: [
      {
        en: 'Greenfield Enterprise Loans (₹10 Lakh - ₹1 Crore)',
        hi: 'ग्रीनफील्ड नए व्यवसाय ऋण (₹10 लाख से ₹1 करोड़)',
        mr: 'नवीन उद्योग सुरू करण्यासाठी ₹१० लाख ते ₹१ कोटी कर्ज',
      },
      {
        en: 'Handholding Support & Credit Guarantee Coverage',
        hi: 'मार्गदर्शन सहायता एवं क्रेडिट गारंटी सुरक्षा',
        mr: 'तांत्रिक मार्गदर्शन आणि क्रेडिट हमी संरक्षण',
      },
    ],
    requiredDocuments: [
          {
                "en": "Identity & Address Proof of Primary Applicant (Aadhaar / Voter ID)",
                "hi": "मुख्य आवेदक का पहचान एवं निवास प्रमाण पत्र (आधार / वोटर आईडी)",
                "mr": "मुख्य अर्जदाराचा ओळख व पत्ता पुरावा (आधार / मतदार ओळखपत्र)"
          },
          {
                "en": "SC / ST Caste Certificate OR Proof of 51%+ Woman Shareholding",
                "hi": "अनुसूचित जाति/जनजाति प्रमाण पत्र अथवा 51%+ महिला स्वामित्व हिस्सेदारी प्रमाण",
                "mr": "अनुसूचित जाती/जमाती प्रमाणपत्र किंवा ५१%+ महिला मालकी पुरावा"
          },
          {
                "en": "Detailed Business Project Report (DPR) for Greenfield Enterprise",
                "hi": "नए ग्रीनफील्ड उद्योग हेतु विस्तृत परियोजना रिपोर्ट (डीपीआर)",
                "mr": "नवीन ग्रीनफील्ड उद्योगासाठी सविस्तर प्रकल्प अहवाल (DPR)"
          },
          {
                "en": "PAN Card, Promoter Profile, and Last 6 Months Bank Statements",
                "hi": "पैन कार्ड, प्रमोटर प्रोफाइल एवं विगत 6 माह का बैंक स्टेटमेंट",
                "mr": "पॅन कार्ड, प्रवर्तक माहिती आणि मागील ६ महिन्यांचे बँक स्टेटमेंट"
          },
          {
                "en": "Pollution Board / Municipal NOC & Factory License (if applicable)",
                "hi": "प्रदूषण नियंत्रण बोर्ड एवं स्थानीय निकाय अनापत्ति प्रमाण पत्र (NOC)",
                "mr": "प्रदूषण नियंत्रण मंडळ व स्थानिक स्वराज्य संस्था एनओसी (लागू असल्यास)"
          }
    ],
  },
  {
    id: 'maharashtra-maitri-portal',
    name: {
      en: 'Maharashtra MAITRI Portal',
      hi: 'महाराष्ट्र मैत्री पोर्टल (एकल खिड़की)',
      mr: 'महाराष्ट्र मैत्री कक्ष (एकल खिडकी योजना)',
    },
    category: 'state_gateway',
    description: {
      en: 'Maharashtra Industry, Trade and Investment Facilitation Cell — The official single-window clearance portal for establishing enterprises in Maharashtra.',
      hi: 'महाराष्ट्र में उद्योग और निवेश स्थापना हेतु 119 से अधिक सरकारी अनुमतियों के लिए आधिकारिक एकल खिड़की पोर्टल।',
      mr: 'महाराष्ट्रात नवीन उद्योग सुरू करण्यासाठी सर्व शासकीय परवानग्या एकाच ठिकाणी देणारे एकल खिडकी पोर्टल.',
    },
    official_url: 'https://maitri.mahaonline.gov.in',
    department: {
      en: 'Industries Department, Government of Maharashtra',
      hi: 'उद्योग विभाग, महाराष्ट्र शासन',
      mr: 'उद्योग संचालनालय, महाराष्ट्र शासन',
    },
    badge: 'Maharashtra Industrial Single Window',
    keyServices: [
      {
        en: 'Combined Application Form (CAF) for 119+ Approvals',
        hi: '119+ सरकारी अनुमतियों हेतु एकीकृत आवेदन पत्र (CAF)',
        mr: '११९ पेक्षा जास्त शासकीय परवानग्यांसाठी एकच अर्ज (CAF)',
      },
      {
        en: 'Time-bound Industrial Clearances under RTS Act',
        hi: 'सेवा का अधिकार अधिनियम अंतर्गत समयबद्ध स्वीकृतियां',
        mr: 'लोकसेवा हक्क कायद्यांतर्गत मुदतीत परवानग्यांची हमी',
      },
      {
        en: 'Incentives & Package Scheme of Incentives (PSI) Approvals',
        hi: 'औद्योगिक प्रोत्साहन एवं अनुदान दावा स्वीकृति',
        mr: 'औद्योगिक प्रोत्साहन योजना (PSI) अंतर्गत अनुदान मंजुरी',
      },
    ],
    requiredDocuments: [
          {
                "en": "Company / Firm Registration (CIN / LLPIN / Partnership Deed / Shop Act)",
                "hi": "कंपनी अथवा फर्म पंजीकरण प्रमाण पत्र (CIN / LLPIN / पार्टनरशिप डीड)",
                "mr": "कंपनी किंवा फर्म नोंदणी प्रमाणपत्र (CIN / LLPIN / शॉप ॲक्ट)"
          },
          {
                "en": "Industrial Land Title Deed / MIDC Allotment Letter / Registered Lease",
                "hi": "औद्योगिक भूमि स्वामित्व विलेख / एमआईडीसी आवंटन पत्र / पंजीकृत लीज डीड",
                "mr": "औद्योगिक जागा मालकी कागदपत्रे / एमआयडीसी वाटप पत्र / नोंदणीकृत भाडेकरार"
          },
          {
                "en": "PAN Card & Aadhaar of all Directors / Designated Partners",
                "hi": "सभी निदेशकों एवं भागीदारों का पैन कार्ड तथा आधार कार्ड",
                "mr": "सर्व संचालक किंवा भागीदारांचे पॅन कार्ड व आधार कार्ड"
          },
          {
                "en": "Detailed Project Report (DPR) with Capital Investment & Power Requirements",
                "hi": "पूंजी निवेश, बिजली एवं पानी की आवश्यकता सहित परियोजना रिपोर्ट",
                "mr": "भांडवली गुंतवणूक, वीज व पाणी गरजेसह सविस्तर प्रकल्प अहवाल"
          },
          {
                "en": "Architect-Approved Factory Layout Plan & Machinery Line Diagram",
                "hi": "वास्तुकार द्वारा अनुमोदित फैक्ट्री लेआउट प्लान एवं मशीनरी का नक्शा",
                "mr": "वास्तुविशारद प्रमाणित कारखाना आराखडा व यंत्रसामग्री मांडणी नकाशा"
          }
    ],
  },
  {
    id: 'nsws-portal',
    name: {
      en: 'National Single Window System (NSWS)',
      hi: 'राष्ट्रीय एकल खिड़की प्रणाली (एनएसडब्ल्यूएस)',
      mr: 'राष्ट्रीय एकल खिडकी प्रणाली (NSWS)',
    },
    category: 'national_directory',
    description: {
      en: 'Government of India national digital platform serving as a one-stop-shop for investors and businesses to obtain Central and State clearances.',
      hi: 'निवेशकों और व्यवसायों के लिए केंद्र एवं राज्य स्तरीय सभी स्वीकृतियां प्राप्त करने हेतु भारत सरकार का एक ही राष्ट्रीय मंच।',
      mr: 'देशातील सर्व केंद्रीय व राज्यस्तरीय परवानग्या एकाच छताखाली मिळवून देणारे केंद्र सरकारचे डिजिटल व्यासपीठ.',
    },
    official_url: 'https://www.nsws.gov.in',
    department: {
      en: 'Invest India, DPIIT, Ministry of Commerce and Industry, GoI',
      hi: 'इन्वेस्ट इंडिया, डीपीआईआईटी, भारत सरकार',
      mr: 'इन्व्हेस्ट इंडिया आणि डीपीआयआयटी, भारत सरकार',
    },
    badge: 'Pan-India Single Window Clearance',
    keyServices: [
      {
        en: 'Know Your Approvals (KYA) Smart Clearance Identifier',
        hi: 'स्वीकृति पहचान मॉड्यूल (Know Your Approvals)',
        mr: 'उद्योगासाठी लागणाऱ्या परवानग्या शोधण्याचे साधन (KYA)',
      },
      {
        en: 'Unified Common Registration Form for 32+ Central Ministries',
        hi: '32 से अधिक केंद्रीय मंत्रालयों के लिए एकीकृत साझा पंजीकरण',
        mr: '३२ हून अधिक केंद्रीय मंत्रालयांचे एकत्रित मंजुरी अर्ज',
      },
      {
        en: 'State-Level Single Window Clearance Integration',
        hi: 'राज्य स्तरीय एकल खिड़की प्रणालियों का राष्ट्रीय एकीकरण',
        mr: 'सर्व राज्यांच्या एकल खिडकी प्रणालीचे केंद्रीय जोडणी',
      },
    ],
    requiredDocuments: [
          {
                "en": "Permanent Account Number (PAN) Card of the Business Entity",
                "hi": "व्यावसायिक इकाई का स्थायी खाता संख्या (पैन कार्ड)",
                "mr": "व्यावसायिक संस्थेचे पॅन कार्ड (PAN Card)"
          },
          {
                "en": "Class-3 Digital Signature Certificate (DSC) or Aadhaar for e-Sign",
                "hi": "क्लास-3 डिजिटल हस्ताक्षर प्रमाण पत्र (डीएससी) अथवा आधार ई-साइन",
                "mr": "वर्ग-३ डिजिटल सिग्नेचर सर्टिफिकेट (DSC) किंवा आधार ई-साइन"
          },
          {
                "en": "Certificate of Incorporation (MCA) / Registered Business Deed",
                "hi": "कंपनी निगमन प्रमाण पत्र (MCA) अथवा पंजीकृत व्यवसाय डीड",
                "mr": "कंपनी नोंदणी प्रमाणपत्र (MCA) किंवा नोंदणीकृत व्यवसाय डीड"
          },
          {
                "en": "Registered Office Address Proof (Utility Bill / Rent Agreement)",
                "hi": "पंजीकृत कार्यालय का पता प्रमाण (बिजली बिल / किराया अनुबंध)",
                "mr": "नोंदणीकृत कार्यालयाचा पत्ता पुरावा (वीज बिल / भाडेकरार)"
          }
    ],
  },
  {
    id: 'mahatenders-portal',
    name: {
      en: 'Maharashtra Government Tenders (MahaTenders)',
      hi: 'महाराष्ट्र सरकार ई-निविदा पोर्टल (महाटेंडर्स)',
      mr: 'महाराष्ट्र शासन ई-निविदा पोर्टल (महाटेंडर्स)',
    },
    category: 'procurement_tenders',
    description: {
      en: 'The official e-procurement portal of the Government of Maharashtra for all state department tenders, municipal works, contractor bidding, and online auctions.',
      hi: 'महाराष्ट्र सरकार के सभी विभागों, नगरपालिकाओं और सार्वजनिक निर्माण कार्यों की ऑनलाइन निविदा (टेंडर) और बोली प्रक्रिया हेतु आधिकारिक पोर्टल।',
      mr: 'महाराष्ट्र शासनाचे सर्व शासकीय विभाग, महामंडळे व स्थानिक संस्थांच्या कामांच्या ऑनलाइन निविदा (टेंडर) व कंत्राटदार नोंदणीसाठीचे अधिकृत पोर्टल.',
    },
    official_url: 'https://mahatenders.gov.in',
    department: {
      en: 'Finance & Planning Department, Government of Maharashtra',
      hi: 'वित्त एवं योजना विभाग, महाराष्ट्र शासन',
      mr: 'वित्त व नियोजन विभाग, महाराष्ट्र शासन',
    },
    badge: 'Maharashtra State e-Procurement',
    keyServices: [
      {
        en: 'Online Tender Search by Department, Location & Estimated Value',
        hi: 'विभाग, स्थान एवं अनुमानित मूल्य अनुसार ऑनलाइन निविदा खोज',
        mr: 'विभाग, जिल्हा व अंदाजित रक्कमेनुसार शासकीय टेंडर शोध',
      },
      {
        en: 'Contractor & Vendor Bid Submission with Class-3 DSC',
        hi: 'क्लास-3 डिजिटल हस्ताक्षर (डीएससी) द्वारा निविदा बोली जमा करना',
        mr: 'क्लास-३ डिजिटल स्वाक्षरीने ऑनलाइन टेंडर भरण्याची सुविधा',
      },
      {
        en: 'Corrigendum Updates, Technical Bid Opening & Award of Contract Details',
        hi: 'शुद्धिपत्रक सूचना, तकनीकी बोली मूल्यांकन एवं ठेका आवंटन परिणाम',
        mr: 'शुद्धिपत्रक, तांत्रिक छाननी आणि टेंडर वाटप निकाल तपासणी',
      },
    ],
    requiredDocuments: [
          {
                "en": "Class-3 Digital Signature Certificate (DSC) with Signing & Encryption",
                "hi": "साइनिंग एवं एन्क्रिप्शन युक्त क्लास-3 डिजिटल हस्ताक्षर प्रमाण पत्र (DSC)",
                "mr": "स्वाक्षरी व एन्क्रिप्शन असलेले वर्ग-३ डिजिटल सिग्नेचर सर्टिफिकेट (DSC)"
          },
          {
                "en": "Permanent Account Number (PAN) Card of Bidder / Contracting Firm",
                "hi": "बोलीदाता फर्म अथवा ठेकेदार का आयकर पैन कार्ड",
                "mr": "निविदाकार फर्म किंवा कंत्राटदाराचे आयकर पॅन कार्ड"
          },
          {
                "en": "Goods & Services Tax Registration Certificate (GSTIN)",
                "hi": "माल एवं सेवा कर पंजीकरण प्रमाण पत्र (जीएसटीआईएन)",
                "mr": "वस्तू व सेवा कर नोंदणी प्रमाणपत्र (GSTIN)"
          },
          {
                "en": "Bank Account Details & Cancelled Cheque for EMD / Security Deposit Refund",
                "hi": "ईएमडी एवं सुरक्षा जमा वापसी हेतु बैंक विवरण तथा रद्द चेक",
                "mr": "ईएमडी व सुरक्षा ठेव परताव्यासाठी बँक तपशील व रद्द धनादेश"
          },
          {
                "en": "Contractor Registration Certificate (PWD / ZP / Municipal Corporation)",
                "hi": "सार्वजनिक निर्माण (पीडब्ल्यूडी) / जिला परिषद / नगर निगम ठेकेदार पंजीकरण",
                "mr": "सार्वजनिक बांधकाम (PWD) / जिल्हा परिषद / महानगरपालिका कंत्राटदार नोंदणी"
          }
    ],
  },
  {
    id: 'cppp-central-tenders-portal',
    name: {
      en: 'Central Government Tenders — CPPP (eProcure)',
      hi: 'केंद्रीय सरकार ई-निविदा पोर्टल — सीपीपीपी (eProcure)',
      mr: 'केंद्रीय शासन ई-निविदा पोर्टल — सीपीपीपी (eProcure)',
    },
    category: 'procurement_tenders',
    description: {
      en: 'The primary central e-procurement portal facilitating all Central Ministries, Departments, and Central Public Sector Enterprises (CPSEs) to publish, manage, and award electronic tenders.',
      hi: 'सभी केंद्रीय मंत्रालयों, विभागों और केंद्रीय सार्वजनिक उपक्रमों (सीपीएसई) द्वारा इलेक्ट्रॉनिक निविदाएं आमंत्रित और प्रबंधित करने हेतु प्राथमिक केंद्रीय पोर्टल।',
      mr: 'केंद्र सरकारच्या सर्व मंत्रालये, विभाग आणि सार्वजनिक क्षेत्रातील कंपन्यांच्या (CPSE) ऑनलाइन निविदा प्रसिद्ध आणि व्यवस्थापित करणारे मुख्य पोर्टल.',
    },
    official_url: 'https://eprocure.gov.in/eprocure/app',
    department: {
      en: 'Department of Expenditure, Ministry of Finance, GoI',
      hi: 'व्यय विभाग, वित्त मंत्रालय, भारत सरकार',
      mr: 'खर्च विभाग, वित्त मंत्रालय, भारत सरकार',
    },
    badge: 'Central Ministries e-Procurement',
    keyServices: [
      {
        en: 'Pan-India Central Ministry, Defense & CPSE Tender Notifications',
        hi: 'अखिल भारतीय केंद्रीय मंत्रालय, रक्षा एवं सीपीएसई निविदा अधिसूचनाएं',
        mr: 'देशभरातील केंद्रीय मंत्रालये, संरक्षण आणि सार्वजनिक उपक्रम निविदा',
      },
      {
        en: 'Electronic Tender Fee Waiver & EMD Exemption for Registered MSEs',
        hi: 'पंजीकृत सूक्ष्म व लघु उद्यमों हेतु टेंडर शुल्क एवं ईएमडी छूट',
        mr: 'नोंदणीकृत एमएसएमईसाठी विनामूल्य टेंडर फॉर्म व अनामत रक्कम सवलत',
      },
      {
        en: 'Two-Stage Bidding, Reverse Auction & Financial Bid Comparison',
        hi: 'द्वि-चरणीय बोली, रिवर्स नीलामी एवं वित्तीय बोली तुलना',
        mr: 'दोन टप्प्यांची ई-निविदा, रिव्हर्स ऑक्शन व आर्थिक बोली तुलना',
      },
    ],
    requiredDocuments: [
          {
                "en": "Class-3 Digital Signature Certificate (DSC) of Authorized Bidding Signatory",
                "hi": "अधिकृत बोली हस्ताक्षरकर्ता का क्लास-3 डिजिटल हस्ताक्षर प्रमाण पत्र",
                "mr": "अधिकृत निविदा स्वाक्षरीकर्त्याचे वर्ग-३ डिजिटल सिग्नेचर सर्टिफिकेट"
          },
          {
                "en": "GSTIN Registration Certificate and Company PAN Card",
                "hi": "जीएसटी पंजीकरण प्रमाण पत्र एवं कंपनी का पैन कार्ड",
                "mr": "जीएसटी नोंदणी प्रमाणपत्र आणि कंपनीचे पॅन कार्ड"
          },
          {
                "en": "Company Incorporation Certificate or Registered Partnership Deed",
                "hi": "कंपनी निगमन प्रमाण पत्र अथवा पंजीकृत भागीदारी अनुबंध",
                "mr": "कंपनी नोंदणी प्रमाणपत्र किंवा भागीदारी करारनामा"
          },
          {
                "en": "CA-Certified Annual Turnover & Past Work Experience / Performance Proofs",
                "hi": "सीए प्रमाणित वार्षिक टर्नओवर एवं विगत कार्य अनुभव प्रमाण पत्र",
                "mr": "सीए प्रमाणित वार्षिक उलाढाल व मागील कामाचे अनुभव प्रमाणपत्र"
          },
          {
                "en": "Udyam / NSIC Certificate (if claiming EMD / Tender Fee Exemption)",
                "hi": "ईएमडी एवं टेंडर फीस छूट हेतु उद्यम अथवा एनएसआईसी प्रमाण पत्र",
                "mr": "ईएमडी व टेंडर फी सवलतीसाठी उद्यम किंवा एनएसआयसी प्रमाणपत्र"
          }
    ],
  },
  {
    id: 'gem-portal',
    name: {
      en: 'Government e-Marketplace (GeM)',
      hi: 'गवर्नमेंट ई-मार्केटप्लेस (जीईएम - GeM)',
      mr: 'गव्हर्नमेंट ई-मार्केटप्लेस (जीईएम - GeM)',
    },
    category: 'procurement_tenders',
    description: {
      en: 'The dedicated National Public Procurement Portal for transparent online purchase of common use Goods & Services by Central and State Government departments, organizations, and PSUs.',
      hi: 'केंद्रीय और राज्य सरकारी विभागों द्वारा वस्तुओं और सेवाओं की पारदर्शी ऑनलाइन खरीद हेतु भारत सरकार का राष्ट्रीय सार्वजनिक खरीद पोर्टल।',
      mr: 'केंद्र व राज्य शासकीय विभागांसाठी वस्तू आणि सेवांची पारदर्शक खरेदी करण्यासाठी केंद्र सरकारचे राष्ट्रीय सार्वजनिक खरेदी ई-बाजारपेठ पोर्टल.',
    },
    official_url: 'https://gem.gov.in',
    department: {
      en: 'Department of Commerce, Ministry of Commerce and Industry, GoI',
      hi: 'वाणिज्य विभाग, वाणिज्य एवं उद्योग मंत्रालय, भारत सरकार',
      mr: 'वाणिज्य विभाग, वाणिज्य आणि उद्योग मंत्रालय, भारत सरकार',
    },
    badge: 'National Procurement Marketplace',
    keyServices: [
      {
        en: 'Direct Purchase up to ₹25,000 & L1 Bidding for Registered Sellers',
        hi: 'पंजीकृत विक्रेताओं से ₹25,000 तक प्रत्यक्ष खरीद एवं एल1 प्रतिस्पर्धी बोली',
        mr: 'नोंदणीकृत विक्रेत्यांकडून ₹२५,००० पर्यंत थेट खरेदी व एल१ स्पर्धात्मक बोली',
      },
      {
        en: 'Mandatory 25% Procurement Quota Benefits for MSMEs & Women Entrepreneurs',
        hi: 'एमएसएमई और महिला उद्यमियों के लिए 25% अनिवार्य खरीद कोटा लाभ',
        mr: 'एमएसएमई आणि महिला उद्योजकांसाठी २५% अनिवार्य खरेदी आरक्षण लाभ',
      },
      {
        en: 'Seamless Udyam & PAN Linkage with Direct Bank Account Settlement',
        hi: 'उद्यम एवं पैन का स्वतः सत्यापन तथा सीधे बैंक खाते में भुगतान',
        mr: 'उद्यम व पॅनचे थेट एकत्रीकरण आणि थेट बँक खात्यात वेळेवर पैसे जमा',
      },
    ],
    requiredDocuments: [
          {
                "en": "Aadhaar Card of Primary Seller / Authorized Key Person",
                "hi": "प्राथमिक विक्रेता अथवा अधिकृत प्रमुख व्यक्ति का आधार कार्ड",
                "mr": "मुख्य विक्रेता किंवा अधिकृत व्यक्तीचे आधार कार्ड"
          },
          {
                "en": "Permanent Account Number (PAN) Card of Business Entity",
                "hi": "व्यावसायिक इकाई अथवा कंपनी का पैन कार्ड",
                "mr": "व्यावसायिक संस्थेचे किंवा कंपनीचे पॅन कार्ड"
          },
          {
                "en": "GSTIN Registration Certificate (or Declaration if exempt)",
                "hi": "जीएसटी पंजीकरण प्रमाण पत्र (अथवा छूट की स्थिति में घोषणा पत्र)",
                "mr": "जीएसटी नोंदणी प्रमाणपत्र (किंवा सूट असल्यास स्वयंघोषणापत्र)"
          },
          {
                "en": "Active Bank Account Details & Cancelled Cheque with printed entity name",
                "hi": "मुद्रित नाम सहित सक्रिय बैंक खाते का विवरण एवं रद्द चेक",
                "mr": "मुद्रित नावाचा चालू बँक खाते तपशील व रद्द धनादेश"
          },
          {
                "en": "Income Tax Return (ITR) Acknowledgement for last 3 financial years",
                "hi": "विगत 3 वित्तीय वर्षों का आयकर रिटर्न (आईटीआर) रसीद विवरण",
                "mr": "मागील ३ आर्थिक वर्षांचे प्राप्तिकर विवरणपत्र (ITR) पोहोच पावती"
          }
    ],
  },
  {
    id: 'cppp-tender-search-portal',
    name: {
      en: 'Government Tender Search (Central Public Procurement Portal)',
      hi: 'सरकारी निविदा खोज (केंद्रीय सार्वजनिक खरीद पोर्टल)',
      mr: 'शासकीय निविदा शोध (केंद्रीय सार्वजनिक खरेदी पोर्टल)',
    },
    category: 'procurement_tenders',
    description: {
      en: 'Unified search engine to discover all active government tenders, expressions of interest (EOI), and auction notices published across India by central, state, and defense bodies.',
      hi: 'भारत भर में केंद्र, राज्य, रेलवे और रक्षा संगठनों द्वारा जारी सभी सक्रिय सरकारी निविदाओं, रुचि की अभिव्यक्ति (ईओआई) और नीलामी सूचनाओं को खोजने हेतु एकीकृत खोज मंच।',
      mr: 'देशभरातील केंद्र, राज्य, रेल्वे आणि संरक्षण विभागांनी प्रसिद्ध केलेल्या सर्व चालू निविदा, ईओआय व लिलाव शोधण्यासाठीचे एकत्रित शोध इंजिन.',
    },
    official_url: 'https://eprocure.gov.in/cppp',
    department: {
      en: 'National Informatics Centre (NIC), Ministry of Finance, GoI',
      hi: 'राष्ट्रीय सूचना विज्ञान केंद्र (NIC), वित्त मंत्रालय, भारत सरकार',
      mr: 'राष्ट्रीय सूचना विज्ञान केंद्र (NIC), वित्त मंत्रालय, भारत सरकार',
    },
    badge: 'Pan-India Live Tender Search',
    keyServices: [
      {
        en: 'Search Tenders by Organization, Classification, Region, or PIN Code',
        hi: 'संगठन, वर्गीकरण, राज्य या पिन कोड द्वारा सरकारी निविदा खोज',
        mr: 'संस्था, प्रकार, राज्य किंवा पिन कोडनुसार थेट टेंडर शोध',
      },
      {
        en: 'Advanced Filtering by Tender Value, EMD Exemption & Bid Due Date',
        hi: 'निविदा मूल्य, ईएमडी छूट पात्रता एवं बोली की अंतिम तिथि अनुसार फिल्टर',
        mr: 'टेंडर रक्कम, ईएमडी सवलत व अंतिम मुदतीनुसार सविस्तर वर्गीकरण',
      },
      {
        en: 'Archive of Awarded Contracts & Technical Evaluation Summaries',
        hi: 'स्वीकृत अनुबंधों एवं तकनीकी मूल्यांकन परिणामों का ऐतिहासिक संग्रह',
        mr: 'मंजूर झालेले कंत्राट व तांत्रिक छाननी अहवाल पाहण्याची सोय',
      },
    ],
    requiredDocuments: [
          {
                "en": "Class-3 Digital Signature Certificate (DSC) for secure tender participation",
                "hi": "सुरक्षित निविदा भागीदारी हेतु क्लास-3 डीएससी प्रमाण पत्र",
                "mr": "सुरक्षित टेंडर सहभागासाठी वर्ग-३ डिजिटल सिग्नेचर (DSC)"
          },
          {
                "en": "CPPP Vendor Registration Login ID and Profile Credentials",
                "hi": "सीपीपीपी पोर्टल विक्रेता लॉगिन आईडी एवं क्रेडेंशियल",
                "mr": "सीपीपीपी पोर्टल विक्रेता लॉगिन आयडी व प्रोफाईल"
          },
          {
                "en": "Tender-specific Technical Compliance Sheets & Certifications",
                "hi": "विशिष्ट निविदा अनुसार तकनीकी अनुपालन एवं गुणवत्ता प्रमाण पत्र",
                "mr": "विशिष्ट निविदेनुसार तांत्रिक पात्रता व गुणवत्ता प्रमाणपत्रे"
          },
          {
                "en": "Price Bid / Bill of Quantities (BoQ) digitally encrypted document",
                "hi": "डिजिटल रूप से एन्क्रिप्टेड वित्तीय बोली (BoQ) दस्तावेज",
                "mr": "डिजिटलरीत्या सांकेतिक आर्थिक निविदा (BoQ) दस्तऐवज"
          }
    ],
  },
  {
    id: 'umed-msrlm-portal',
    name: {
      en: 'UMED – Maharashtra State Rural Livelihoods Mission',
      hi: 'उमेद – महाराष्ट्र राज्य ग्रामीण जीवनोन्नती अभियान',
      mr: 'उमेद – महाराष्ट्र राज्य ग्रामीण जीवनोन्नती अभियान (MSRLM)',
    },
    category: 'state_gateway',
    description: {
      en: 'Flagship mission under Rural Development & Panchayati Raj Department, Govt. of Maharashtra, empowering rural women through Self-Help Groups (SHGs), revolving funds, community investment, and rural micro-enterprises.',
      hi: 'महाराष्ट्र शासन के ग्रामविकास व पंचायतराज विभाग द्वारा संचालित प्रमुख मिशन, जो महिला स्वयं सहायता समूहों (बचत गट), परिक्रामी निधि एवं आजीविका संवर्धन से ग्रामीण परिवारों को सशक्त बनाता है।',
      mr: 'ग्रामविकास व पंचायतराज विभाग, महाराष्ट्र शासन अंतर्गत महिला बचत गट (SHG), फिरता निधी, समुदाय गुंतवणूक निधी (CIF) व ग्रामीण उपजीविका विकासासाठीचे अधिकृत पोर्टल.',
    },
    official_url: 'https://umed.in',
    department: {
      en: 'Rural Development & Panchayati Raj Department, Govt. of Maharashtra',
      hi: 'ग्राम विकास एवं पंचायती राज विभाग, महाराष्ट्र शासन',
      mr: 'ग्रामविकास व पंचायतराज विभाग, महाराष्ट्र शासन',
    },
    badge: 'Maharashtra Women SHG Mission',
    keyServices: [
      {
        en: 'Self-Help Group (SHG) Formation, Registration & Bank Credit Linkage',
        hi: 'स्वयं सहायता समूह (बचत गट) गठन, पंजीकरण एवं बैंक क्रेडिट लिंकेज',
        mr: 'महिला बचत गट स्थापना, नोंदणी व थेट बँक कर्ज जोडणी',
      },
      {
        en: 'Revolving Fund (₹15,000) & Community Investment Fund (CIF up to ₹1.5 Lakh)',
        hi: 'परिक्रामी निधि (₹15,000) एवं समुदाय निवेश निधि (CIF ₹1.5 लाख तक)',
        mr: 'फिरता निधी (₹१५,०००) व समुदाय गुंतवणूक निधी (CIF ₹१.५ लाखांपर्यंत)',
      },
      {
        en: 'MSRLM SARAS Exhibitions & E-Commerce Marketing for Women Artisans',
        hi: 'सरस प्रदर्शनी एवं महिला कारीगरों के उत्पादों का डिजिटल विपणन',
        mr: 'सरस प्रदर्शन आणि महिला बचत गटांच्या उत्पादनांची ऑनलाइन बाजारपेठ',
      },
    ],
    requiredDocuments: [
          {
                "en": "Aadhaar Card of Woman Self-Help Group (SHG) Member",
                "hi": "महिला स्वयं सहायता समूह (बचत गट) सदस्या का आधार कार्ड",
                "mr": "महिला बचत गट सदस्याचे आधार कार्ड"
          },
          {
                "en": "Self-Help Group (SHG) Member Passbook / Membership ID",
                "hi": "स्वयं सहायता समूह सदस्यता पासबुक अथवा सदस्य आईडी",
                "mr": "महिला बचत गट सदस्य पासबुक किंवा ओळखपत्र"
          },
          {
                "en": "SHG Savings Bank Account Passbook & Group Meeting Resolution Copy",
                "hi": "बचत समूह का सक्रिय बैंक पासबुक एवं मासिक बैठक प्रस्ताव प्रति",
                "mr": "बचत गट बँक पासबुक आणि सभेतील मंजुरी ठरावाची प्रत"
          },
          {
                "en": "Ration Card / Family Annual Income Certificate from Tehsildar",
                "hi": "तहसीलदार द्वारा जारी राशन कार्ड अथवा पारिवारिक वार्षिक आय प्रमाण पत्र",
                "mr": "तहसीलदार प्रमाणित रेशन कार्ड किंवा वार्षिक कौटुंबिक उत्पन्न दाखला"
          },
          {
                "en": "Caste Certificate (if applying for SC/ST specific revolving grants)",
                "hi": "जाति प्रमाण पत्र (यदि अनुसूचित जाति/जनजाति विशेष अनुदान हेतु लागू हो)",
                "mr": "जात प्रमाणपत्र (मागासवर्गीय विशेष अनुदान लाभासाठी लागू असल्यास)"
          }
    ],
  },
  {
    id: 'lakhpati-didi-portal',
    name: {
      en: 'Lakhpati Didi — SHG Financial Support & Livelihood Portal',
      hi: 'लखपति दीदी — महिला स्वयं सहायता समूह वित्तीय सहायता पोर्टल',
      mr: 'लखपती दीदी — महिला बचत गट आर्थिक सहाय्य व उपजीविका पोर्टल',
    },
    category: 'enterprise',
    description: {
      en: 'National flagship initiative under DAY-NRLM to empower 3 Crore rural women in Self-Help Groups to earn a sustainable income of at least ₹1 Lakh per year through credit access, skill training, and market integration.',
      hi: 'ग्रामीण विकास मंत्रालय, भारत सरकार का राष्ट्रीय अभियान, जिसका लक्ष्य स्वयं सहायता समूहों की 3 करोड़ महिलाओं को प्रति वर्ष न्यूनतम ₹1 लाख की स्थायी आय अर्जित कराने हेतु ऋण, प्रशिक्षण और बाजार सहायता प्रदान करना है।',
      mr: 'दीनदयाळ अंत्योदय योजना - राष्ट्रीय ग्रामीण जीवनोन्नती अभियानांतर्गत (DAY-NRLM) महिला बचत गटांतील ३ कोटी महिलांना दरवर्षी किमान ₹१ लाख उत्पन्न मिळवून देणारा राष्ट्रीय उपक्रम.',
    },
    official_url: 'https://lakhpatididi.gov.in',
    department: {
      en: 'Ministry of Rural Development, Government of India',
      hi: 'ग्रामीण विकास मंत्रालय, भारत सरकार',
      mr: 'ग्रामीण विकास मंत्रालय, भारत सरकार',
    },
    badge: 'National Women SHG Livelihood Initiative',
    keyServices: [
      {
        en: 'Collateral-Free Bank Loans for SHGs with 7% Interest Subvention',
        hi: '7% रियायती ब्याज दर पर स्वयं सहायता समूहों को बिना गारंटी बैंक ऋण',
        mr: '७% सवलतीच्या व्याजदरात महिला बचत गटांना विनातारण बँक कर्ज',
      },
      {
        en: 'Namo Drone Didi, Agri-Nutri Garden & Enterprise Incubation Training',
        hi: 'नमो ड्रोन दीदी, कृषि मूल्य श्रृंखला एवं सूक्ष्म उद्यम इनक्यूबेशन प्रशिक्षण',
        mr: 'नमो ड्रोन दीदी, कृषी प्रक्रिया व सूक्ष्म व्यवसाय कौशल्य प्रशिक्षण',
      },
      {
        en: 'Direct Market Onboarding on Government e-Marketplace (GeM) & ONDC',
        hi: 'गवर्नमेंट ई-मार्केटप्लेस (GeM) और ओएनडीसी पर उत्पादों की सीधी बिक्री',
        mr: 'GeM व ओएनडीसी ई-कॉमर्स पोर्टलवर बचत गटांच्या मालाची विक्री',
      },
    ],
    requiredDocuments: [
          {
                "en": "Aadhaar Card of Woman SHG Member",
                "hi": "महिला स्वयं सहायता समूह सदस्या का आधार कार्ड",
                "mr": "महिला बचत गट सदस्याचे आधार कार्ड"
          },
          {
                "en": "NRLM MIS SHG Membership Registration ID / Identity Card",
                "hi": "एनआरएलएम एमआईएस बचत समूह सदस्यता पहचान पत्र / पंजीकरण संख्या",
                "mr": "एनआरएलएम एमआयएस बचत गट नोंदणी ओळखपत्र किंवा क्रमांक"
          },
          {
                "en": "Active Aadhaar-seeded Bank Account Passbook with IFSC",
                "hi": "आधार से जुड़ा सक्रिय बैंक खाता पासबुक एवं आईएफएससी विवरण",
                "mr": "आधार संलग्न असलेले सक्रिय बँक खाते पासबुक व आयएफएससी कोड"
          },
          {
                "en": "Micro-Livelihood Enterprise Plan (Agri, Dairy, Poultry or Micro-Enterprise)",
                "hi": "सूक्ष्म आजीविका व्यवसाय योजना (कृषि, डेयरी, बकरी पालन या कुटीर उद्योग)",
                "mr": "उपजीविका सूक्ष्म व्यवसाय कृती आराखडा (शेती, दुग्धव्यवसाय, शेळीपालन किंवा लघुउद्योग)"
          },
          {
                "en": "SHG Recommendation Letter and Village Organization (VO) Resolution",
                "hi": "बचत समूह का अनुशंसा पत्र एवं ग्राम संगठन (VO) का पारित प्रस्ताव",
                "mr": "बचत गटाचे शिफारस पत्र व ग्रामसंघाचा (VO) संमत ठराव"
          }
    ],
  },
];
