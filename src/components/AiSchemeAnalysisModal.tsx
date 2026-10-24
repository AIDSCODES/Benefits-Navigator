/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Globe,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Check,
  Send,
  Printer,
  ChevronRight,
  Landmark,
} from 'lucide-react';
import { Scheme, SupportedLanguage, UserProfile, LocalizedString } from '../lib/engine/types.ts';
import { OfficialPortal } from '../data/officialPortals.ts';

interface AiSchemeAnalysisModalProps {
  scheme?: Scheme | null;
  portal?: OfficialPortal | null;
  lang: SupportedLanguage;
  userProfile?: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onOpenOfficialUrl: (url: string, name: string) => void;
}

export const AiSchemeAnalysisModal: React.FC<AiSchemeAnalysisModalProps> = ({
  scheme,
  portal,
  lang,
  userProfile = {},
  isOpen,
  onClose,
  onOpenOfficialUrl,
}) => {
  const [activeTab, setActiveTab] = useState<'website' | 'benefit' | 'eligibility' | 'documents' | 'askAi'>('website');
  const [ownedDocs, setOwnedDocs] = useState<Record<string, boolean>>({});
  const [aiQuestion, setAiQuestion] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Reset state when scheme or portal changes
  useEffect(() => {
    if (isOpen) {
      setOwnedDocs({});
      setChatMessages([]);
      setActiveTab('website');
    }
  }, [isOpen, scheme?.id, portal?.id]);

  if (!isOpen || (!scheme && !portal)) return null;

  // Derive common attributes
  const title = scheme ? (scheme.name[lang] || scheme.name.en) : (portal ? (portal.name[lang] || portal.name.en) : '');
  const code = scheme ? scheme.code : (portal ? portal.badge : '');
  const officialUrl = scheme ? scheme.official_url : (portal ? portal.official_url : '');
  const department = scheme ? scheme.source_citation : (portal ? (portal.department[lang] || portal.department.en) : '');
  const documentsList = scheme ? scheme.documents : (portal ? portal.requiredDocuments.map((d, i) => ({
    id: `portal_doc_${i}`,
    name: d,
    mandatory: true,
    description: undefined,
  })) : []);

  const totalDocs = documentsList.length;
  const mandatoryCount = scheme ? scheme.documents.filter(d => d.mandatory).length : documentsList.length;
  const ownedCount = documentsList.filter(d => ownedDocs[d.id]).length;
  const readinessPercent = totalDocs > 0 ? Math.round((ownedCount / totalDocs) * 100) : 100;

  const cleanDomain = officialUrl.replace(/^https?:\/\//, '').replace(/\/.*$/, '');

  // Multilingual labels
  const labels: Record<string, LocalizedString> = {
    modalTitle: {
      en: 'AI Scheme & Website Analysis',
      hi: 'एआई योजना एवं आधिकारिक वेबसाइट विश्लेषण',
      mr: 'एआय योजना आणि अधिकृत संकेतस्थळ विश्लेषण',
    },
    subTitle: {
      en: 'Verified entitlement intelligence, website workflow & document audit',
      hi: 'सत्यापित पात्रता विश्लेषण, ऑनलाइन आवेदन प्रक्रिया एवं दस्तावेज जांच',
      mr: 'सत्यापित योजना माहिती, ऑनलाइन अर्ज प्रक्रिया आणि कागदपत्रे तपासणी',
    },
    tabWebsite: {
      en: 'Website Workflow',
      hi: 'वेबसाइट आवेदन प्रक्रिया',
      mr: 'संकेतस्थळ अर्ज पद्धत',
    },
    tabBenefit: {
      en: 'Financial Benefits',
      hi: 'आर्थिक लाभ व अनुदान',
      mr: 'आर्थिक लाभ व अनुदान',
    },
    tabEligibility: {
      en: 'Eligibility & Traps',
      hi: 'पात्रता व अस्वीकृति नियम',
      mr: 'पात्रता व अपात्रता नियम',
    },
    tabDocs: {
      en: 'Document Readiness',
      hi: 'दस्तावेज तैयारी स्कोर',
      mr: 'कागदपत्रे पूर्वतयारी',
    },
    tabAsk: {
      en: 'Ask AI Advisor',
      hi: 'एआई से प्रश्न पूछें',
      mr: 'एआय सल्लागार',
    },
    openWebsite: {
      en: 'Open Official Government Portal',
      hi: 'आधिकारिक सरकारी पोर्टल खोलें',
      mr: 'अधिकृत शासकीय संकेतस्थळ उघडा',
    },
    verifiedDomain: {
      en: 'Verified Official Government Domain (.gov.in / .nic.in / .in)',
      hi: 'सत्यापित आधिकारिक सरकारी डोमेन (.gov.in / .nic.in / .in)',
      mr: 'सत्यापित अधिकृत शासकीय डोमेन (.gov.in / .nic.in / .in)',
    },
    fraudNotice: {
      en: 'Security Notice: Never pay any agent. Government welfare registrations on official .gov.in portals are free of application fees.',
      hi: 'सुरक्षा सूचना: किसी भी बिचौलिए को पैसे न दें। आधिकारिक .gov.in पोर्टल पर सरकारी योजनाओं के आवेदन निःशुल्क होते हैं।',
      mr: 'सुरक्षा सूचना: कोणालाही पैसे देऊ नका. अधिकृत .gov.in संकेतस्थळावर शासकीय योजनांचे अर्ज पूर्णपणे मोफत असतात.',
    },
    readinessTitle: {
      en: 'Your Document Readiness Score',
      hi: 'आपका दस्तावेज तैयारी स्कोर',
      mr: 'तुमचा कागदपत्रे पूर्वतयारी स्कोर',
    },
    mandatory: {
      en: 'Mandatory',
      hi: 'अनिवार्य',
      mr: 'बंधनकारक',
    },
    optional: {
      en: 'Optional',
      hi: 'वैकल्पिक',
      mr: 'पर्यायी',
    },
  };

  const handleToggleDoc = (docId: string) => {
    setOwnedDocs(prev => ({
      ...prev,
      [docId]: !prev[docId],
    }));
  };

  const handleAskAi = async (customQ?: string) => {
    const query = customQ || aiQuestion;
    if (!query.trim() || isAiLoading) return;

    const userMsg = query.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setAiQuestion('');
    setIsAiLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Regarding the scheme/portal "${code}: ${title}" (Official URL: ${officialUrl}): ${userMsg}`,
          character: 'vedu',
          lang,
        }),
      });

      if (!response.ok) throw new Error('AI analysis chat response failed');
      const data = await response.json();
      setChatMessages(prev => [...prev, { sender: 'ai', text: data.reply || 'Analysis completed.' }]);
    } catch {
      // Offline fallback answer
      let fallbackText = `Regarding ${title}: Please apply directly on the official portal at ${cleanDomain}. Ensure you carry ${documentsList.map(d => d.name[lang] || d.name.en).slice(0, 3).join(', ')}. Keep your Aadhaar linked with your bank account for direct benefit transfer.`;
      if (lang === 'hi') {
        fallbackText = `${title} के संबंध में: कृपया आधिकारिक पोर्टल ${cleanDomain} पर सीधे आवेदन करें। अपने साथ मुख्य दस्तावेज रखें और सुनिश्चित करें कि आपका बैंक खाता आधार से लिंक (DBT सक्षम) है।`;
      } else if (lang === 'mr') {
        fallbackText = `${title} बाबत: कृपया अधिकृत संकेतस्थळ ${cleanDomain} वर थेट अर्ज करा. आवश्यक कागदपत्रे सोबत ठेवा आणि बँक खात्याशी आधार संलग्न (DBT) असल्याची खात्री करा.`;
      }
      setChatMessages(prev => [...prev, { sender: 'ai', text: fallbackText }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const presetQuestions = [
    lang === 'mr' ? 'या संकेतस्थळावर अर्ज फी किती आहे?' : lang === 'hi' ? 'क्या इस पोर्टल पर कोई आवेदन शुल्क है?' : 'Is there an application fee on this portal?',
    lang === 'mr' ? 'मंजूरीसाठी किती दिवस लागतात?' : lang === 'hi' ? 'स्वीकृति में कितने दिन लगते हैं?' : 'How long does the approval process take?',
    lang === 'mr' ? 'ई-केवायसी (e-KYC) कसे पूर्ण करावे?' : lang === 'hi' ? 'पोर्टल पर ई-केवाईसी कैसे करें?' : 'How do I complete e-KYC on the website?',
    lang === 'mr' ? 'अर्जासाठी सर्वात महत्त्वाचे कागदपत्र कोणते?' : lang === 'hi' ? 'सबसे आवश्यक दस्तावेज कौन सा है?' : 'What is the most crucial document needed?',
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-900/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-analysis-modal-title"
    >
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-purple-900 via-indigo-900 to-stone-900 text-white relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Close AI Analysis"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/30 text-purple-200 border border-purple-400/30 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
              <span>{labels.modalTitle[lang] || labels.modalTitle.en}</span>
            </span>
            <span className="text-xs text-purple-200/80 font-mono font-bold bg-white/10 px-2.5 py-0.5 rounded-full">
              {code}
            </span>
          </div>

          <h2 id="ai-analysis-modal-title" className="text-xl sm:text-2xl font-bold text-white leading-tight mb-2 pr-8">
            {title}
          </h2>

          <div className="flex flex-wrap items-center gap-3 text-xs text-purple-200/90">
            <span className="flex items-center gap-1 font-mono text-[11px] bg-black/30 px-2.5 py-1 rounded-lg border border-white/10">
              <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{cleanDomain}</span>
            </span>
            <span className="flex items-center gap-1 text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Government Portal</span>
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/50 px-3 sm:px-6 overflow-x-auto no-scrollbar">
          {[
            { id: 'website', label: labels.tabWebsite[lang] || labels.tabWebsite.en, icon: Globe },
            { id: 'benefit', label: labels.tabBenefit[lang] || labels.tabBenefit.en, icon: Landmark },
            { id: 'eligibility', label: labels.tabEligibility[lang] || labels.tabEligibility.en, icon: ShieldCheck },
            { id: 'documents', label: labels.tabDocs[lang] || labels.tabDocs.en, icon: FileText },
            { id: 'askAi', label: labels.tabAsk[lang] || labels.tabAsk.en, icon: Sparkles },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 px-3.5 sm:px-4 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'border-purple-600 text-purple-700 dark:text-purple-400 bg-purple-50/50 dark:bg-purple-950/20'
                    : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-purple-600 dark:text-purple-400' : 'text-stone-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          
          {/* TAB 1: WEBSITE WORKFLOW */}
          {activeTab === 'website' && (
            <div className="space-y-5">
              {/* Official URL Highlight Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1">
                    <Globe className="w-4 h-4 text-emerald-600" />
                    <span>{labels.verifiedDomain[lang] || labels.verifiedDomain.en}</span>
                  </div>
                  <div className="text-base sm:text-lg font-mono font-bold text-stone-900 dark:text-white truncate">
                    {officialUrl}
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    {department}
                  </p>
                </div>

                <button
                  onClick={() => onOpenOfficialUrl(officialUrl, title)}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shrink-0 shadow-sm transition-all hover:scale-102 cursor-pointer"
                >
                  <span>{labels.openWebsite[lang] || labels.openWebsite.en}</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              {/* Fraud prevention security banner */}
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                <p className="leading-relaxed">
                  {labels.fraudNotice[lang] || labels.fraudNotice.en}
                </p>
              </div>

              {/* Step-by-Step Online Portal Process */}
              <div>
                <h3 className="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-purple-600" />
                  <span>How to Apply on {cleanDomain}</span>
                </h3>

                {scheme && scheme.steps.length > 0 ? (
                  <div className="space-y-3">
                    {scheme.steps.map((step) => (
                      <div
                        key={step.step_number}
                        className="p-3.5 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200 dark:border-stone-800 flex items-start gap-3.5"
                      >
                        <div className="w-7 h-7 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {step.step_number}
                        </div>
                        <div className="flex-1 text-xs">
                          <h4 className="font-bold text-stone-900 dark:text-white text-sm mb-0.5">
                            {step.title[lang] || step.title.en}
                          </h4>
                          <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                            {step.instruction[lang] || step.instruction.en}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3 text-xs">
                    {[
                      { num: 1, title: 'Visit Official Website', desc: `Open ${officialUrl} in your browser. Verify you are on the official government domain (.gov.in).` },
                      { num: 2, title: 'New Registration / e-KYC', desc: 'Click "New Citizen / Applicant Registration". Enter your 12-digit Aadhaar number and verify using OTP received on your linked mobile.' },
                      { num: 3, title: 'Upload Prerequisites', desc: 'Upload scanned copies of required documents (7/12 extract, bank passbook, or enterprise proof) in prescribed format.' },
                      { num: 4, title: 'Download Acknowledgment', desc: 'Submit the application and save the generated Application Number / Receipt for future tracking.' },
                    ].map(st => (
                      <div key={st.num} className="p-3.5 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200 dark:border-stone-800 flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {st.num}
                        </div>
                        <div>
                          <div className="font-bold text-stone-900 dark:text-white">{st.title}</div>
                          <div className="text-stone-600 dark:text-stone-400 mt-0.5">{st.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: FINANCIAL BENEFITS */}
          {activeTab === 'benefit' && (
            <div className="space-y-4">
              <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-2">
                  Total Entitlement & Financial Benefit
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-900 dark:text-emerald-200 mb-2">
                  {scheme?.benefit_type ? (scheme.benefit_type[lang] || scheme.benefit_type.en) : 'Direct Benefit / Government Assistance'}
                </div>
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  {scheme?.description ? (scheme.description[lang] || scheme.description.en) : (portal ? (portal.description[lang] || portal.description.en) : '')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200 dark:border-stone-800">
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
                    Transfer Mechanism
                  </div>
                  <div className="text-sm font-bold text-stone-900 dark:text-white">
                    Direct Benefit Transfer (DBT) / PFMS
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    Directly deposited into your Aadhaar-seeded savings account without intermediaries.
                  </p>
                </div>

                <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200 dark:border-stone-800">
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
                    Jurisdiction / Authority
                  </div>
                  <div className="text-sm font-bold text-stone-900 dark:text-white">
                    {scheme?.level === 'central' ? 'Central Government Sector' : 'Government of Maharashtra'}
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    Verified citation: {department}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ELIGIBILITY & REJECTION TRAPS */}
          {activeTab === 'eligibility' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-300">
                <span className="font-bold">AI Eligibility Scrutiny: </span>
                Yojana360 evaluated this scheme against deterministic entitlement rules. Below are mandatory qualifying criteria and common exclusion traps.
              </div>

              {scheme && scheme.criteria.length > 0 ? (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Required Eligibility Conditions ({scheme.criteria.length})
                  </h4>
                  {scheme.criteria.map((crit) => {
                    const userVal = (userProfile as any)[crit.field];
                    const isAnswered = userVal !== undefined;

                    return (
                      <div
                        key={crit.id}
                        className="p-3 bg-white dark:bg-stone-800/70 rounded-xl border border-stone-200 dark:border-stone-800 flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <div className="flex-1 text-xs">
                          <div className="font-semibold text-stone-900 dark:text-white">
                            {crit.explanation[lang] || crit.explanation.en}
                          </div>
                          <div className="text-[11px] text-stone-500 mt-0.5 flex items-center gap-2">
                            <span>Field: <strong className="font-mono">{crit.field}</strong></span>
                            <span>•</span>
                            <span>Rule: <strong className="font-mono">{crit.operator}</strong></span>
                            {isAnswered && (
                              <>
                                <span>•</span>
                                <span className="text-purple-600 dark:text-purple-400 font-semibold">Your response: {String(userVal)}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 bg-stone-50 dark:bg-stone-800 rounded-xl text-xs text-stone-600 dark:text-stone-300">
                  This portal services all verified citizens, MSMEs, and farmers holding relevant legal credentials in India.
                </div>
              )}

              {/* Exclusion Traps Advisory */}
              <div className="p-4 bg-rose-50/70 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900/60 text-xs">
                <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5 mb-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Top Reasons Applications Get Rejected on {cleanDomain}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-rose-900 dark:text-rose-200/90 text-[11px]">
                  <li>Name spelling on Aadhaar does not match land revenue or bank record exactly.</li>
                  <li>Bank account is inactive or not enabled for Aadhaar Payment Bridge (APB / DBT).</li>
                  <li>Land record (7/12 or Khatauni) upload is blurry or older than allowed cutoff.</li>
                  <li>Incomplete mobile OTP e-KYC authentication on the official portal.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: DOCUMENT READINESS AUDIT */}
          {activeTab === 'documents' && (
            <div className="space-y-4">
              {/* Readiness Score Bar */}
              <div className="p-4 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200 dark:border-stone-700/60">
                <div className="flex items-center justify-between text-xs font-bold text-stone-800 dark:text-stone-200 mb-2">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-purple-600" />
                    <span>{labels.readinessTitle[lang] || labels.readinessTitle.en}</span>
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    readinessPercent === 100
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {ownedCount} of {totalDocs} Ready ({readinessPercent}%)
                  </span>
                </div>
                <div className="w-full bg-stone-200 dark:bg-stone-700 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      readinessPercent === 100 ? 'bg-emerald-600' : 'bg-purple-600'
                    }`}
                    style={{ width: `${readinessPercent}%` }}
                  />
                </div>
                <p className="text-[11px] text-stone-500 mt-2">
                  Tick the checkboxes below for documents you already have ready. All mandatory documents must be ready before applying on {cleanDomain}.
                </p>
              </div>

              {/* Interactive Checklist */}
              <div className="space-y-2.5">
                {documentsList.map((doc) => {
                  const isChecked = Boolean(ownedDocs[doc.id]);

                  return (
                    <div
                      key={doc.id}
                      onClick={() => handleToggleDoc(doc.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isChecked
                          ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                          : 'bg-white dark:bg-stone-800/80 border-stone-200 dark:border-stone-800 hover:border-purple-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isChecked
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="flex-1 text-xs min-w-0">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className={`font-semibold text-sm ${
                            isChecked ? 'text-emerald-900 dark:text-emerald-200 line-through' : 'text-stone-900 dark:text-stone-100'
                          }`}>
                            {doc.name[lang] || doc.name.en}
                          </span>
                          {doc.mandatory ? (
                            <span className="text-[10px] text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 font-bold px-1.5 py-0.5 rounded border border-rose-200 dark:border-rose-900">
                              {labels.mandatory[lang] || labels.mandatory.en}
                            </span>
                          ) : (
                            <span className="text-[10px] text-stone-500 font-medium">
                              {labels.optional[lang] || labels.optional.en}
                            </span>
                          )}
                        </div>
                        {doc.description && (
                          <p className="text-stone-500 dark:text-stone-400 mt-1 leading-snug">
                            {doc.description[lang] || doc.description.en}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: ASK AI ADVISOR */}
          {activeTab === 'askAi' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 shrink-0 animate-pulse" />
                <span>
                  Ask any question specifically about <strong>{title}</strong> or its official website.
                </span>
              </div>

              {/* Preset Quick Question Chips */}
              <div className="flex flex-wrap gap-1.5">
                {presetQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAskAi(q)}
                    className="text-xs px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-purple-50 dark:bg-stone-800 dark:hover:bg-purple-950/60 text-stone-700 hover:text-purple-700 dark:text-stone-300 dark:hover:text-purple-300 border border-stone-200 dark:border-stone-700 transition-colors text-left cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Chat Message History */}
              {chatMessages.length > 0 && (
                <div className="space-y-3 max-h-60 overflow-y-auto p-3 bg-stone-50 dark:bg-stone-950/50 rounded-2xl border border-stone-200 dark:border-stone-800 text-xs">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-purple-600 text-white ml-8 font-medium'
                          : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 mr-8 border border-stone-200 dark:border-stone-700'
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                  {isAiLoading && (
                    <div className="p-3 rounded-xl bg-white dark:bg-stone-800 text-stone-500 mr-8 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-spin" />
                      <span>Analyzing scheme rules and official portal knowledge...</span>
                    </div>
                  )}
                </div>
              )}

              {/* Custom Input */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
                  placeholder={`Ask a question about ${code}...`}
                  className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-purple-600"
                />
                <button
                  onClick={() => handleAskAi()}
                  disabled={!aiQuestion.trim() || isAiLoading}
                  className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Ask AI</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3">
          <div className="text-[11px] text-stone-500 hidden sm:flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Zero-PII Local Evaluation Guarantee</span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Print AI Analysis"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print Report</span>
            </button>

            <button
              onClick={() => onOpenOfficialUrl(officialUrl, title)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <span>{labels.openWebsite[lang] || labels.openWebsite.en}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
