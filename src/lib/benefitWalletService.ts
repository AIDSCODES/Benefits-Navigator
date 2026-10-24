/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Scheme, SchemeDocument, UserProfile } from './engine/types.ts';

export type WalletDocumentType =
  | 'aadhaar'
  | 'ration_card'
  | 'income_cert'
  | 'caste_cert'
  | 'domicile_cert'
  | 'land_record'
  | 'bank_passbook'
  | 'disability_cert'
  | 'education_marksheet'
  | 'other';

export interface WalletDocument {
  id: string;
  type: WalletDocumentType;
  title: string;
  documentNumberMasked: string; // e.g. "•••• •••• 4519"
  documentNumberPlain?: string; // Unlocked in memory
  holderName: string;
  issueDate?: string;
  expiryDate?: string;
  issuingAuthority?: string;
  fileName?: string;
  fileSizeFormatted?: string;
  fileType?: string;
  isVerified: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BenefitVault {
  version: number;
  isLocked: boolean;
  pinHash?: string;
  documents: WalletDocument[];
  autoFillProfile?: {
    fullName?: string;
    aadhaarMasked?: string;
    annualIncome?: number;
    socialCategory?: string;
    rationCardStatus?: string;
    state?: string;
    district?: string;
    bankAccountMasked?: string;
    ifscCode?: string;
    landRecordNumber?: string;
  };
  lastBackupTimestamp?: string;
}

const VAULT_STORAGE_KEY = 'yojana360_benefit_wallet_vault_v1';

// In-memory fallback for non-browser or test execution
let memoryVaultStore: BenefitVault | null = null;

/**
 * Standard document type metadata with official issuing authorities & badges
 */
export const DOCUMENT_TYPE_METADATA: Record<
  WalletDocumentType,
  {
    label: string;
    code: string;
    icon: string;
    badgeColor: string;
    defaultAuthority: string;
    matchedKeywords: string[];
  }
> = {
  aadhaar: {
    label: 'Aadhaar Card / VID',
    code: 'DOC_AADHAAR',
    icon: '🪪',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    defaultAuthority: 'Unique Identification Authority of India (UIDAI)',
    matchedKeywords: ['aadhaar', 'uid', 'identity', 'vid'],
  },
  ration_card: {
    label: 'NFSA Ration Card',
    code: 'DOC_RATION',
    icon: '🍚',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    defaultAuthority: 'Department of Food, Civil Supplies and Consumer Affairs',
    matchedKeywords: ['ration', 'nfsa', 'food', 'aay', 'phh'],
  },
  income_cert: {
    label: 'Income Certificate',
    code: 'DOC_INCOME',
    icon: '📜',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    defaultAuthority: 'Revenue Department / Tahsildar / Sub-Divisional Magistrate',
    matchedKeywords: ['income', 'salary', 'annual', 'earnings'],
  },
  caste_cert: {
    label: 'Caste / Community Certificate',
    code: 'DOC_CASTE',
    icon: '🏛️',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    defaultAuthority: 'Competent Revenue Officer / District Welfare Officer',
    matchedKeywords: ['caste', 'category', 'sc', 'st', 'obc', 'ews'],
  },
  domicile_cert: {
    label: 'Domicile / Residence Certificate',
    code: 'DOC_DOMICILE',
    icon: '🏠',
    badgeColor: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
    defaultAuthority: 'State Revenue Department / District Collectorate',
    matchedKeywords: ['domicile', 'residence', 'resident', 'local', 'niwas'],
  },
  land_record: {
    label: 'Land Record (7/12 Extract / RoR)',
    code: 'DOC_LAND',
    icon: '🌾',
    badgeColor: 'bg-lime-100 text-lime-800 dark:bg-lime-950/60 dark:text-lime-300 border-lime-200 dark:border-lime-800',
    defaultAuthority: 'State Land Records / Bhulekh / MahaDBT / Bhoomi Portal',
    matchedKeywords: ['land', '7/12', 'ror', 'khasra', 'khatauni', 'jamabandi'],
  },
  bank_passbook: {
    label: 'Aadhaar-Linked Bank Passbook',
    code: 'DOC_BANK',
    icon: '🏦',
    badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200 dark:border-teal-800',
    defaultAuthority: 'Scheduled Commercial Bank / NPCI DBT Mandate',
    matchedKeywords: ['bank', 'passbook', 'account', 'statement', 'cheque', 'dbt'],
  },
  disability_cert: {
    label: 'Disability Certificate (UDID)',
    code: 'DOC_DISABILITY',
    icon: '♿',
    badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    defaultAuthority: 'Department of Empowerment of Persons with Disabilities',
    matchedKeywords: ['disability', 'udid', 'pwd', 'divyang'],
  },
  education_marksheet: {
    label: 'Academic Marksheet / Bonafide',
    code: 'DOC_EDUCATION',
    icon: '🎓',
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    defaultAuthority: 'Recognized Board / University / Institute Registrar',
    matchedKeywords: ['marksheet', 'degree', 'diploma', 'bonafide', 'student', 'transcript'],
  },
  other: {
    label: 'Other Supporting Document',
    code: 'DOC_OTHER',
    icon: '📁',
    badgeColor: 'bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-300 border-stone-200 dark:border-stone-700',
    defaultAuthority: 'Authorized Issuing Office',
    matchedKeywords: ['certificate', 'document', 'proof'],
  },
};

/**
 * Creates default initial empty vault
 */
export function createInitialVault(): BenefitVault {
  return {
    version: 1,
    isLocked: false,
    documents: [],
    autoFillProfile: {},
  };
}

/**
 * Reads vault from persistent client storage with memory fallback
 */
export function getStoredVault(): BenefitVault {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(VAULT_STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {}
  }
  if (!memoryVaultStore) {
    memoryVaultStore = createInitialVault();
  }
  return memoryVaultStore;
}

/**
 * Saves vault to persistent client storage with memory fallback
 */
export function saveVault(vault: BenefitVault): void {
  vault.lastBackupTimestamp = new Date().toISOString();
  memoryVaultStore = vault;
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(vault));
    } catch {}
  }
}

/**
 * Simple client-side mask for ID numbers (e.g. 1234 5678 9012 -> •••• •••• 9012)
 */
export function maskDocumentNumber(rawNumber: string): string {
  const clean = (rawNumber || '').trim().replace(/\s+/g, '');
  if (!clean) return '••••';
  if (clean.length <= 4) return clean;
  const lastFour = clean.slice(-4);
  const prefixLength = Math.max(0, clean.length - 4);
  const bulletGroups = Math.ceil(prefixLength / 4);
  const bullets = Array(bulletGroups).fill('••••').join(' ');
  return `${bullets} ${lastFour}`.trim();
}

/**
 * Client-side cryptographic helper: Derives SHA-256 hash or fallback hash
 */
export async function hashPassphrase(pin: string): Promise<string> {
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.subtle) {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(pin + '_yojana360_salt');
      const hashBuffer = await globalThis.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    } catch {}
  }
  // Fallback hash for test/restricted environments
  let hash = 0;
  for (let i = 0; i < pin.length; i++) {
    hash = (hash << 5) - hash + pin.charCodeAt(i);
    hash |= 0;
  }
  return 'fb_' + Math.abs(hash).toString(16);
}

/**
 * Client-Side Encrypt string data using AES-GCM (256-bit) with fallback
 */
export async function encryptData(plainText: string, pin: string): Promise<string> {
  if (!plainText) return '';
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.subtle) {
    try {
      const encoder = new TextEncoder();
      const pinKey = await globalThis.crypto.subtle.importKey(
        'raw',
        encoder.encode(pin.padEnd(32, '0').slice(0, 32)),
        { name: 'AES-GCM' },
        false,
        ['encrypt']
      );
      const iv = globalThis.crypto.getRandomValues(new Uint8Array(12));
      const encrypted = await globalThis.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        pinKey,
        encoder.encode(plainText)
      );
      const ivHex = Array.from(iv)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
      const dataHex = Array.from(new Uint8Array(encrypted))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
      return `${ivHex}:${dataHex}`;
    } catch {}
  }
  // Reversible fallback obfuscation for non-crypto sandboxes
  return 'enc_' + Buffer.from(plainText).toString('base64');
}

/**
 * Client-Side Decrypt string data using AES-GCM (256-bit) with fallback
 */
export async function decryptData(cipherText: string, pin: string): Promise<string> {
  if (!cipherText) return '';
  if (cipherText.startsWith('enc_')) {
    return Buffer.from(cipherText.slice(4), 'base64').toString('utf8');
  }
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.subtle && cipherText.includes(':')) {
    try {
      const [ivHex, dataHex] = cipherText.split(':');
      const iv = new Uint8Array(ivHex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)));
      const encrypted = new Uint8Array(dataHex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)));
      const encoder = new TextEncoder();
      const pinKey = await globalThis.crypto.subtle.importKey(
        'raw',
        encoder.encode(pin.padEnd(32, '0').slice(0, 32)),
        { name: 'AES-GCM' },
        false,
        ['decrypt']
      );
      const decrypted = await globalThis.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        pinKey,
        encrypted
      );
      return new TextDecoder().decode(decrypted);
    } catch {}
  }
  return cipherText;
}

/**
 * Adds a new document to the benefit wallet locker
 */
export function addWalletDocument(
  docData: {
    type: WalletDocumentType;
    title: string;
    documentNumber: string;
    holderName: string;
    issueDate?: string;
    expiryDate?: string;
    issuingAuthority?: string;
    fileName?: string;
    fileSizeFormatted?: string;
    fileType?: string;
    tags?: string[];
  }
): WalletDocument {
  const vault = getStoredVault();
  const id = `doc-${docData.type}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
  const meta = DOCUMENT_TYPE_METADATA[docData.type];

  const newDoc: WalletDocument = {
    id,
    type: docData.type,
    title: docData.title || meta.label,
    documentNumberMasked: maskDocumentNumber(docData.documentNumber),
    documentNumberPlain: docData.documentNumber,
    holderName: docData.holderName,
    issueDate: docData.issueDate,
    expiryDate: docData.expiryDate,
    issuingAuthority: docData.issuingAuthority || meta.defaultAuthority,
    fileName: docData.fileName,
    fileSizeFormatted: docData.fileSizeFormatted,
    fileType: docData.fileType,
    isVerified: true,
    tags: docData.tags || meta.matchedKeywords,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  vault.documents.unshift(newDoc);

  // Sync to auto-fill profile
  if (!vault.autoFillProfile) vault.autoFillProfile = {};
  if (docData.type === 'aadhaar' && !vault.autoFillProfile.aadhaarMasked) {
    vault.autoFillProfile.aadhaarMasked = newDoc.documentNumberMasked;
    vault.autoFillProfile.fullName = docData.holderName;
  }
  if (docData.type === 'ration_card') {
    vault.autoFillProfile.rationCardStatus = 'priority';
  }

  saveVault(vault);
  return newDoc;
}

/**
 * Deletes a document from the locker
 */
export function deleteWalletDocument(docId: string): boolean {
  const vault = getStoredVault();
  const initialCount = vault.documents.length;
  vault.documents = vault.documents.filter((d) => d.id !== docId);
  if (vault.documents.length !== initialCount) {
    saveVault(vault);
    return true;
  }
  return false;
}

/**
 * Matches user's locker documents against a scheme's required documents
 */
export function getSchemeDocumentMatchScore(
  schemeDocuments: SchemeDocument[],
  vault: BenefitVault
): {
  matchedCount: number;
  totalCount: number;
  readinessPercentage: number;
  matchedDocs: { schemeDoc: SchemeDocument; walletDoc: WalletDocument }[];
  missingDocs: SchemeDocument[];
} {
  if (!schemeDocuments || schemeDocuments.length === 0) {
    return {
      matchedCount: 0,
      totalCount: 0,
      readinessPercentage: 100,
      matchedDocs: [],
      missingDocs: [],
    };
  }

  const matchedDocs: { schemeDoc: SchemeDocument; walletDoc: WalletDocument }[] = [];
  const missingDocs: SchemeDocument[] = [];

  for (const sDoc of schemeDocuments) {
    const sDocNameLower = (sDoc.name.en || '').toLowerCase();
    const sDocId = (sDoc.id || '').toLowerCase();

    // Find best matching document in wallet
    const found = vault.documents.find((wDoc) => {
      const meta = DOCUMENT_TYPE_METADATA[wDoc.type];
      const keywords = meta ? meta.matchedKeywords : [];

      // Direct keyword or type match
      if (sDocId.includes(wDoc.type)) return true;
      if (keywords.some((kw) => sDocNameLower.includes(kw) || sDocId.includes(kw))) return true;
      if (wDoc.tags.some((tag) => sDocNameLower.includes(tag.toLowerCase()))) return true;
      return false;
    });

    if (found) {
      matchedDocs.push({ schemeDoc: sDoc, walletDoc: found });
    } else {
      missingDocs.push(sDoc);
    }
  }

  const matchedCount = matchedDocs.length;
  const totalCount = schemeDocuments.length;
  const readinessPercentage = Math.round((matchedCount / totalCount) * 100);

  return {
    matchedCount,
    totalCount,
    readinessPercentage,
    matchedDocs,
    missingDocs,
  };
}

/**
 * Derives answers for the benefit recommendation questionnaire from the wallet
 */
export function deriveProfileFromWallet(vault: BenefitVault): Partial<UserProfile> {
  const profile: Partial<UserProfile> = {};

  const hasAadhaar = vault.documents.some((d) => d.type === 'aadhaar');
  const hasLand = vault.documents.some((d) => d.type === 'land_record');
  const hasRation = vault.documents.some((d) => d.type === 'ration_card');
  const hasDisability = vault.documents.some((d) => d.type === 'disability_cert');
  const hasStudent = vault.documents.some((d) => d.type === 'education_marksheet');
  const casteDoc = vault.documents.find((d) => d.type === 'caste_cert');

  if (hasLand) {
    profile.occupation = 'farmer';
    profile.landHolding = 'small';
  } else if (hasStudent) {
    profile.occupation = 'student';
    profile.ageBand = '18_35';
  }

  if (hasRation) {
    profile.rationCardStatus = 'priority';
  }

  if (hasDisability) {
    profile.disability = 'yes';
  }

  if (casteDoc) {
    const titleLower = casteDoc.title.toLowerCase();
    if (titleLower.includes('sc') || titleLower.includes('scheduled caste')) {
      profile.socialCategory = 'sc';
    } else if (titleLower.includes('st') || titleLower.includes('scheduled tribe')) {
      profile.socialCategory = 'st';
    } else if (titleLower.includes('obc')) {
      profile.socialCategory = 'obc';
    }
  }

  return profile;
}

/**
 * Loads a pre-verified demonstration locker for testing and walk-throughs
 */
export function loadDemoLocker(persona: 'farmer' | 'student' | 'artisan'): BenefitVault {
  let docs: WalletDocument[] = [];

  if (persona === 'farmer') {
    docs = [
      {
        id: 'doc-demo-aadhaar-1',
        type: 'aadhaar',
        title: 'Aadhaar Card (UIDAI Verified)',
        documentNumberMasked: '•••• •••• 8192',
        documentNumberPlain: '4928 1029 8192',
        holderName: 'Ramesh Digambar Patil',
        issuingAuthority: 'Unique Identification Authority of India (UIDAI)',
        issueDate: '2014-06-12',
        fileName: 'Aadhaar_Ramesh_Patil.pdf',
        fileSizeFormatted: '482 KB',
        fileType: 'application/pdf',
        isVerified: true,
        tags: ['aadhaar', 'uid', 'identity', 'vid'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'doc-demo-land-1',
        type: 'land_record',
        title: '7/12 Land Record Extract (MahaBhulekh)',
        documentNumberMasked: 'Gat No. •••• 142',
        documentNumberPlain: 'Gat No. 142/A (1.8 Ha)',
        holderName: 'Ramesh Digambar Patil',
        issuingAuthority: 'Revenue Dept, Govt of Maharashtra (Nashik Tahsil)',
        issueDate: '2025-08-20',
        fileName: '7_12_Extract_Gat_142.pdf',
        fileSizeFormatted: '1.2 MB',
        fileType: 'application/pdf',
        isVerified: true,
        tags: ['land', '7/12', 'ror', 'khasra'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'doc-demo-ration-1',
        type: 'ration_card',
        title: 'NFSA Kesari / Priority Ration Card',
        documentNumberMasked: 'RC-•••• •••• 9210',
        documentNumberPlain: 'RC-2708 9201 9210',
        holderName: 'Ramesh Digambar Patil',
        issuingAuthority: 'Food & Civil Supplies Dept, Maharashtra',
        issueDate: '2019-03-10',
        fileName: 'NFSA_Ration_Card_Family.jpg',
        fileSizeFormatted: '640 KB',
        fileType: 'image/jpeg',
        isVerified: true,
        tags: ['ration', 'nfsa', 'food', 'phh'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'doc-demo-bank-1',
        type: 'bank_passbook',
        title: 'Bank of Maharashtra (NPCI DBT Linked)',
        documentNumberMasked: 'A/c •••• •••• 4018',
        documentNumberPlain: 'A/c 6029 4810 4018',
        holderName: 'Ramesh Digambar Patil',
        issuingAuthority: 'Bank of Maharashtra (IFSC: MAHB0000182)',
        issueDate: '2021-01-15',
        fileName: 'Bank_Passbook_Page1.png',
        fileSizeFormatted: '790 KB',
        fileType: 'image/png',
        isVerified: true,
        tags: ['bank', 'passbook', 'dbt', 'account'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  } else if (persona === 'student') {
    docs = [
      {
        id: 'doc-demo-aadhaar-2',
        type: 'aadhaar',
        title: 'Aadhaar Card (UIDAI Verified)',
        documentNumberMasked: '•••• •••• 3049',
        documentNumberPlain: '8910 2341 3049',
        holderName: 'Aarav Sharma',
        issuingAuthority: 'Unique Identification Authority of India (UIDAI)',
        issueDate: '2018-02-14',
        fileName: 'Aadhaar_Aarav.pdf',
        fileSizeFormatted: '390 KB',
        fileType: 'application/pdf',
        isVerified: true,
        tags: ['aadhaar', 'uid', 'identity'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'doc-demo-income-1',
        type: 'income_cert',
        title: 'Annual Family Income Certificate (Below ₹1.5L)',
        documentNumberMasked: 'INC-•••• •••• 7192',
        documentNumberPlain: 'INC-2026-8192-7192',
        holderName: 'Aarav Sharma (Parent: Rajesh Sharma)',
        issuingAuthority: 'Tahsildar Office, Lucknow, Uttar Pradesh',
        issueDate: '2026-04-18',
        fileName: 'Income_Certificate_2026.pdf',
        fileSizeFormatted: '512 KB',
        fileType: 'application/pdf',
        isVerified: true,
        tags: ['income', 'salary', 'annual'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'doc-demo-edu-1',
        type: 'education_marksheet',
        title: 'B.Tech 2nd Year Marksheet & College ID',
        documentNumberMasked: 'Roll No: •••• 084',
        documentNumberPlain: 'Roll No: 220910084',
        holderName: 'Aarav Sharma',
        issuingAuthority: 'State Technical University Registrar',
        issueDate: '2026-07-22',
        fileName: 'Marksheet_Semester_4.pdf',
        fileSizeFormatted: '920 KB',
        fileType: 'application/pdf',
        isVerified: true,
        tags: ['marksheet', 'education', 'student'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  } else {
    docs = [
      {
        id: 'doc-demo-aadhaar-3',
        type: 'aadhaar',
        title: 'Aadhaar Card (UIDAI Verified)',
        documentNumberMasked: '•••• •••• 6520',
        documentNumberPlain: '7102 9381 6520',
        holderName: 'Sunita Devi',
        issuingAuthority: 'Unique Identification Authority of India (UIDAI)',
        issueDate: '2016-11-05',
        fileName: 'Aadhaar_Sunita_Devi.pdf',
        fileSizeFormatted: '410 KB',
        fileType: 'application/pdf',
        isVerified: true,
        tags: ['aadhaar', 'uid'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'doc-demo-caste-1',
        type: 'caste_cert',
        title: 'OBC Community Caste Certificate',
        documentNumberMasked: 'CC-•••• •••• 4401',
        documentNumberPlain: 'CC-UP-VAR-4401',
        holderName: 'Sunita Devi',
        issuingAuthority: 'Sub-Divisional Magistrate, Varanasi, UP',
        issueDate: '2020-09-15',
        fileName: 'OBC_Certificate_Sunita.pdf',
        fileSizeFormatted: '620 KB',
        fileType: 'application/pdf',
        isVerified: true,
        tags: ['caste', 'obc', 'category'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  const vault: BenefitVault = {
    version: 1,
    isLocked: false,
    documents: docs,
    autoFillProfile: {
      fullName: docs[0]?.holderName,
      aadhaarMasked: docs[0]?.documentNumberMasked,
      rationCardStatus: persona === 'farmer' ? 'priority' : undefined,
    },
    lastBackupTimestamp: new Date().toISOString(),
  };

  saveVault(vault);
  return vault;
}

/**
 * Exports client vault as an encrypted `.yojanavault` JSON string
 */
export async function exportVaultPayload(pin: string = '1234'): Promise<string> {
  const vault = getStoredVault();
  const serialized = JSON.stringify(vault);
  const encrypted = await encryptData(serialized, pin);
  const payload = {
    app: 'Yojana360',
    type: 'benefit_wallet_vault',
    version: 1,
    timestamp: new Date().toISOString(),
    encryptedData: encrypted,
  };
  return JSON.stringify(payload, null, 2);
}

/**
 * Imports and restores vault from `.yojanavault` JSON string
 */
export async function importVaultPayload(jsonStr: string, pin: string = '1234'): Promise<boolean> {
  try {
    const parsed = JSON.parse(jsonStr);
    if (parsed.app !== 'Yojana360' || !parsed.encryptedData) {
      return false;
    }
    const decrypted = await decryptData(parsed.encryptedData, pin);
    const restoredVault: BenefitVault = JSON.parse(decrypted);
    if (Array.isArray(restoredVault.documents)) {
      saveVault(restoredVault);
      return true;
    }
  } catch {}
  return false;
}
