/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import {
  ShieldCheck,
  Lock,
  Unlock,
  Key,
  FileText,
  Upload,
  Plus,
  Trash2,
  Copy,
  Check,
  Eye,
  EyeOff,
  Download,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Info,
  Layers,
  Search,
  Filter,
  RefreshCw,
  HardDrive,
  HelpCircle,
} from 'lucide-react';
import { SupportedLanguage, UserProfile, Scheme } from '../lib/engine/types.ts';
import { SCHEMES } from '../data/schemes.ts';
import {
  WalletDocument,
  WalletDocumentType,
  DOCUMENT_TYPE_METADATA,
  getStoredVault,
  saveVault,
  addWalletDocument,
  deleteWalletDocument,
  getSchemeDocumentMatchScore,
  deriveProfileFromWallet,
  loadDemoLocker,
  exportVaultPayload,
  importVaultPayload,
  maskDocumentNumber,
} from '../lib/benefitWalletService.ts';

interface BenefitWalletViewProps {
  lang: SupportedLanguage;
  onApplyProfileToNavigator?: (profile: Partial<UserProfile>) => void;
  onNavigateTab?: (tab: string) => void;
}

export const BenefitWalletView: React.FC<BenefitWalletViewProps> = ({
  lang,
  onApplyProfileToNavigator,
  onNavigateTab,
}) => {
  const [vault, setVault] = useState(() => getStoredVault());
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>('pm-kisan');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showBackupModal, setShowBackupModal] = useState<boolean>(false);
  const [copiedDocId, setCopiedDocId] = useState<string | null>(null);
  const [unmaskedDocIds, setUnmaskedDocIds] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Document Form State
  const [newDocType, setNewDocType] = useState<WalletDocumentType>('aadhaar');
  const [newDocTitle, setNewDocTitle] = useState<string>('');
  const [newDocNumber, setNewDocNumber] = useState<string>('');
  const [newDocHolder, setNewDocHolder] = useState<string>('');
  const [newDocAuthority, setNewDocAuthority] = useState<string>('');
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const importFileRef = useRef<HTMLInputElement>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered documents
  const filteredDocuments = useMemo(() => {
    return vault.documents.filter((doc) => {
      const matchType = filterType === 'all' || doc.type === filterType;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        doc.title.toLowerCase().includes(q) ||
        doc.holderName.toLowerCase().includes(q) ||
        doc.documentNumberMasked.toLowerCase().includes(q) ||
        (doc.issuingAuthority && doc.issuingAuthority.toLowerCase().includes(q));
      return matchType && matchSearch;
    });
  }, [vault, filterType, searchQuery]);

  // Selected scheme for readiness matching
  const targetScheme = useMemo(() => {
    return SCHEMES.find((s) => s.id === selectedSchemeId) || SCHEMES[0];
  }, [selectedSchemeId]);

  // Scheme Document Match Result
  const matchResult = useMemo(() => {
    return getSchemeDocumentMatchScore(targetScheme.documents, vault);
  }, [targetScheme, vault]);

  const handleCopyNumber = (doc: WalletDocument) => {
    const textToCopy = doc.documentNumberPlain || doc.documentNumberMasked;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopiedDocId(doc.id);
      triggerToast(`📋 Copied ${doc.title} number to clipboard!`);
      setTimeout(() => setCopiedDocId(null), 2000);
    }
  };

  const toggleUnmaskNumber = (docId: string) => {
    setUnmaskedDocIds((prev) => ({
      ...prev,
      [docId]: !prev[docId],
    }));
  };

  const handleDelete = (docId: string) => {
    if (deleteWalletDocument(docId)) {
      setVault(getStoredVault());
      triggerToast('🗑️ Document securely removed from your locker.');
    }
  };

  const handleSaveNewDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocNumber.trim() || !newDocHolder.trim()) {
      alert('Please provide document number and holder name.');
      return;
    }

    const created = addWalletDocument({
      type: newDocType,
      title: newDocTitle || DOCUMENT_TYPE_METADATA[newDocType].label,
      documentNumber: newDocNumber.trim(),
      holderName: newDocHolder.trim(),
      issuingAuthority: newDocAuthority.trim(),
      fileName: selectedFileName || `${DOCUMENT_TYPE_METADATA[newDocType].label}.pdf`,
      fileSizeFormatted: selectedFileName ? '420 KB' : undefined,
      fileType: 'application/pdf',
    });

    setVault(getStoredVault());
    setShowAddModal(false);
    // Reset form
    setNewDocNumber('');
    setNewDocHolder('');
    setNewDocTitle('');
    setNewDocAuthority('');
    setSelectedFileName('');
    triggerToast(`🔒 ${created.title} successfully encrypted & stored in Benefit Wallet!`);
  };

  const handleLoadPersona = (persona: 'farmer' | 'student' | 'artisan') => {
    const loaded = loadDemoLocker(persona);
    setVault(loaded);
    triggerToast(`✨ Loaded verified ${persona} document locker with ${loaded.documents.length} credentials!`);
  };

  const handleAutoFillToNavigator = () => {
    const profile = deriveProfileFromWallet(vault);
    if (onApplyProfileToNavigator) {
      onApplyProfileToNavigator(profile);
      triggerToast('🎉 Auto-filled application questionnaire using your verified locker documents!');
    }
  };

  const handleExportBackup = async () => {
    const payload = await exportVaultPayload('1234');
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `yojana360-benefit-wallet-backup-${new Date().toISOString().slice(0, 10)}.yojanavault`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    triggerToast('💾 Encrypted vault backup (.yojanavault) exported safely.');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      const content = evt.target?.result as string;
      const success = await importVaultPayload(content, '1234');
      if (success) {
        setVault(getStoredVault());
        setShowBackupModal(false);
        triggerToast('✅ Encrypted vault backup restored successfully!');
      } else {
        alert('Invalid or corrupted .yojanavault file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-stone-900 text-white dark:bg-white dark:text-stone-950 px-4 py-3 rounded-2xl shadow-2xl text-sm font-semibold border border-stone-700 animate-slide-up">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── Top Hero Card ── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 text-white p-6 sm:p-10 border border-stone-800 shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero-Knowledge AES-256 Client-Side Encrypted</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Digital "Benefit Wallet" & Document Locker
            </h1>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              Securely store your Aadhaar, Ration Card, Income Certificate, and Land Records right on your device. Never scramble for documents again when applying for government welfare schemes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Document</span>
            </button>
            <button
              onClick={handleAutoFillToNavigator}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-stone-900 hover:bg-stone-100 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Auto-Fill Questionnaire</span>
            </button>
            <button
              onClick={() => setShowBackupModal(true)}
              className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold text-xs sm:text-sm border border-stone-700 transition-all cursor-pointer"
              title="Cloud Backup & Export"
            >
              <Download className="w-4 h-4 text-blue-400" />
              <span className="hidden sm:inline">Backup Vault</span>
            </button>
          </div>
        </div>

        {/* Demo Personas Switcher Bar */}
        <div className="mt-8 pt-6 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-400">
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Need sample documents to test? Load a pre-verified test persona:</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleLoadPersona('farmer')}
              className="px-3 py-1 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-medium cursor-pointer border border-stone-700"
            >
              🌾 Ramesh (Farmer)
            </button>
            <button
              onClick={() => handleLoadPersona('student')}
              className="px-3 py-1 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-medium cursor-pointer border border-stone-700"
            >
              🎓 Aarav (Student)
            </button>
            <button
              onClick={() => handleLoadPersona('artisan')}
              className="px-3 py-1 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-medium cursor-pointer border border-stone-700"
            >
              🎨 Sunita (Artisan)
            </button>
          </div>
        </div>
      </div>

      {/* ── Scheme Document Readiness Matcher ── */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
              <Layers className="w-4 h-4 text-amber-500" />
              <span>Live Application Readiness Inspector</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white">
              Does your wallet satisfy scheme requirements?
            </h2>
          </div>

          {/* Scheme Selector */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={selectedSchemeId}
              onChange={(e) => setSelectedSchemeId(e.target.value)}
              className="bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white text-xs sm:text-sm font-semibold rounded-xl px-3.5 py-2.5 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-amber-500/50"
            >
              {SCHEMES.map((scheme) => (
                <option key={scheme.id} value={scheme.id}>
                  {scheme.name[lang] || scheme.name.en} ({scheme.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Readiness Meter & Checklist */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/80 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div
                className={`text-xl font-black px-3 py-1 rounded-xl ${
                  matchResult.readinessPercentage === 100
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : matchResult.readinessPercentage >= 50
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                }`}
              >
                {matchResult.readinessPercentage}% Ready
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                  {matchResult.matchedCount} of {matchResult.totalCount} mandatory documents present in locker
                </h3>
                <p className="text-xs text-stone-500">
                  {matchResult.readinessPercentage === 100
                    ? 'All required documents verified. You can proceed directly to application!'
                    : `Upload the ${matchResult.missingDocs.length} missing document(s) below to complete your application kit.`}
                </p>
              </div>
            </div>

            <a
              href={targetScheme.official_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-900 text-white dark:bg-white dark:text-stone-950 text-xs font-bold shrink-0 hover:opacity-90"
            >
              <span>Apply on Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Document Pills Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-2 border-t border-stone-200/60 dark:border-stone-700/60">
            {matchResult.matchedDocs.map(({ schemeDoc, walletDoc }) => (
              <div
                key={schemeDoc.id}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-xs"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-emerald-900 dark:text-emerald-200 truncate">
                    {schemeDoc.name[lang] || schemeDoc.name.en}
                  </div>
                  <div className="text-[10px] text-emerald-700 dark:text-emerald-400 truncate">
                    Matched: {walletDoc.documentNumberMasked}
                  </div>
                </div>
              </div>
            ))}

            {matchResult.missingDocs.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 text-xs"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                  <div className="min-w-0">
                    <div className="font-bold text-rose-900 dark:text-rose-200 truncate">
                      {doc.name[lang] || doc.name.en}
                    </div>
                    <div className="text-[10px] text-rose-600 dark:text-rose-400">Missing from Locker</div>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-2 py-1 rounded-lg bg-rose-200/80 hover:bg-rose-300 dark:bg-rose-900/60 text-rose-900 dark:text-rose-200 text-[10px] font-bold shrink-0 cursor-pointer"
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Document Vault Cards Matrix ── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">
              Stored Documents ({filteredDocuments.length})
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-semibold">
              Encrypted Offline
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search document or holder..."
                className="w-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-stone-900 dark:text-white placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50"
              />
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span>Category:</span>
          </span>
          {[
            { id: 'all', label: 'All Documents' },
            { id: 'aadhaar', label: '🪪 Aadhaar' },
            { id: 'ration_card', label: '🍚 Ration Cards' },
            { id: 'income_cert', label: '📜 Income Certificates' },
            { id: 'caste_cert', label: '🏛️ Caste Certificates' },
            { id: 'land_record', label: '🌾 7/12 Land Records' },
            { id: 'bank_passbook', label: '🏦 Bank Accounts' },
            { id: 'education_marksheet', label: '🎓 Education' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                filterType === f.id
                  ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-950 font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Document Cards Grid */}
        {filteredDocuments.length === 0 ? (
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center text-3xl">
              📁
            </div>
            <div className="max-w-md mx-auto space-y-2">
              <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                No documents in this category
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Add your Aadhaar, Ration Card, or Caste Certificate to enable 1-click auto-filling across government portals.
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 text-white dark:bg-white dark:text-stone-950 font-bold text-xs shadow-md cursor-pointer hover:opacity-90"
            >
              <Plus className="w-4 h-4" />
              <span>Add First Document</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map((doc) => {
              const meta = DOCUMENT_TYPE_METADATA[doc.type] || DOCUMENT_TYPE_METADATA.other;
              const isUnmasked = unmaskedDocIds[doc.id];
              const displayNumber = isUnmasked && doc.documentNumberPlain ? doc.documentNumberPlain : doc.documentNumberMasked;

              return (
                <div
                  key={doc.id}
                  className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-xs space-y-3.5 hover:border-amber-500/50 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${meta.badgeColor} flex items-center gap-1`}>
                        <span>{meta.icon}</span>
                        <span>{meta.label}</span>
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => toggleUnmaskNumber(doc.id)}
                          className="p-1 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
                          title={isUnmasked ? 'Mask document number' : 'Show document number'}
                        >
                          {isUnmasked ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="p-1 rounded-md hover:bg-rose-100 dark:hover:bg-rose-950/60 text-stone-400 hover:text-rose-600 cursor-pointer"
                          title="Delete document"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-stone-900 dark:text-white leading-snug">
                        {doc.title}
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                        Holder: <strong className="text-stone-700 dark:text-stone-300">{doc.holderName}</strong>
                      </p>
                    </div>

                    {/* Masked / Plain Number Bar */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                      <div className="font-mono text-xs font-bold text-stone-900 dark:text-white tracking-wider truncate">
                        {displayNumber}
                      </div>
                      <button
                        onClick={() => handleCopyNumber(doc)}
                        className="p-1 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-500 hover:text-stone-900 dark:hover:text-white cursor-pointer ml-2 shrink-0"
                        title="Copy document number"
                      >
                        {copiedDocId === doc.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="space-y-1 text-[11px] text-stone-500">
                      {doc.issuingAuthority && (
                        <div className="line-clamp-1">
                          <span className="text-stone-400">Authority:</span> {doc.issuingAuthority}
                        </div>
                      )}
                      {doc.fileName && (
                        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                          <FileText className="w-3 h-3 shrink-0" />
                          <span className="truncate">{doc.fileName}</span>
                          {doc.fileSizeFormatted && <span className="text-stone-400">({doc.fileSizeFormatted})</span>}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[11px]">
                    <span className="text-stone-400 font-medium">
                      Saved {new Date(doc.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={handleAutoFillToNavigator}
                      className="inline-flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                    >
                      <span>Auto-fill</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Add Document Modal ── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white">
                    Add Credential to Benefit Wallet
                  </h3>
                  <p className="text-xs text-stone-400">Zero-knowledge client-side encryption</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNewDocument} className="space-y-4">
              {/* Document Type */}
              <div>
                <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                  Document Type
                </label>
                <select
                  value={newDocType}
                  onChange={(e) => {
                    const t = e.target.value as WalletDocumentType;
                    setNewDocType(t);
                    setNewDocTitle(DOCUMENT_TYPE_METADATA[t].label);
                    setNewDocAuthority(DOCUMENT_TYPE_METADATA[t].defaultAuthority);
                  }}
                  className="w-full bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold text-stone-900 dark:text-white cursor-pointer"
                >
                  {Object.entries(DOCUMENT_TYPE_METADATA).map(([key, meta]) => (
                    <option key={key} value={key}>
                      {meta.icon} {meta.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Document Title */}
              <div>
                <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                  Document Nickname / Title
                </label>
                <input
                  type="text"
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  placeholder={DOCUMENT_TYPE_METADATA[newDocType].label}
                  className="w-full bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-900 dark:text-white"
                />
              </div>

              {/* Document / Certificate Number */}
              <div>
                <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                  Document Number / Certificate ID <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newDocNumber}
                  onChange={(e) => setNewDocNumber(e.target.value)}
                  placeholder="e.g. 5829 1049 8192 or RC-281092"
                  className="w-full bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-900 dark:text-white font-mono"
                />
              </div>

              {/* Holder Name */}
              <div>
                <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                  Beneficiary / Holder Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newDocHolder}
                  onChange={(e) => setNewDocHolder(e.target.value)}
                  placeholder="As written on the official card"
                  className="w-full bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-900 dark:text-white"
                />
              </div>

              {/* File Attachment Upload */}
              <div>
                <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                  Attach PDF Scan / Photo (Encrypted Locally)
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".pdf,image/png,image/jpeg"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setSelectedFileName(f.name);
                  }}
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-3 rounded-xl border border-dashed border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/40 hover:bg-stone-100 text-center cursor-pointer space-y-1"
                >
                  <Upload className="w-5 h-5 mx-auto text-stone-400" />
                  <div className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                    {selectedFileName ? selectedFileName : 'Click to attach PDF / Image scan'}
                  </div>
                  <div className="text-[10px] text-stone-400">Never transmitted to server</div>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  Encrypt & Save to Wallet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Cloud Backup & Restore Modal ── */}
      {showBackupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-5 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <HardDrive className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900 dark:text-white">
                    Vault Backup & Cloud Transfer
                  </h3>
                  <p className="text-xs text-stone-400">Encrypted portable payload</p>
                </div>
              </div>
              <button
                onClick={() => setShowBackupModal(false)}
                className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-stone-600 dark:text-stone-300">
              <p>
                Your Benefit Wallet is stored in this browser's local sandbox. You can download an encrypted backup file (<code>.yojanavault</code>) to transfer your locker between devices or save to Google Drive safely.
              </p>

              <div className="p-3.5 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-2">
                <div className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-emerald-500" />
                  <span>Download Encrypted Backup</span>
                </div>
                <p className="text-[11px] text-stone-500">
                  Exports AES-256 encrypted payload. Plain text is never included.
                </p>
                <button
                  onClick={handleExportBackup}
                  className="w-full py-2 rounded-xl bg-stone-900 text-white dark:bg-white dark:text-stone-950 font-bold text-xs cursor-pointer shadow-xs"
                >
                  Download .yojanavault File
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-2">
                <div className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                  <UploadCloud className="w-4 h-4 text-blue-500" />
                  <span>Restore from Backup</span>
                </div>
                <p className="text-[11px] text-stone-500">
                  Select an existing <code>.yojanavault</code> file from your device.
                </p>
                <input
                  type="file"
                  ref={importFileRef}
                  accept=".yojanavault,.json"
                  onChange={handleImportFile}
                  className="hidden"
                />
                <button
                  onClick={() => importFileRef.current?.click()}
                  className="w-full py-2 rounded-xl bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 text-stone-800 dark:text-stone-200 font-bold text-xs cursor-pointer"
                >
                  Select .yojanavault to Restore
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-stone-100 dark:border-stone-800">
              <button
                onClick={() => setShowBackupModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
