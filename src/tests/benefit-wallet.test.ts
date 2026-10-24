/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  maskDocumentNumber,
  encryptData,
  decryptData,
  addWalletDocument,
  deleteWalletDocument,
  getStoredVault,
  loadDemoLocker,
  getSchemeDocumentMatchScore,
  deriveProfileFromWallet,
  exportVaultPayload,
  importVaultPayload,
  createInitialVault,
  saveVault,
} from '../lib/benefitWalletService.ts';
import { SchemeDocument } from '../lib/engine/types.ts';

describe('Digital Benefit Wallet (Locker) Service', () => {
  beforeEach(() => {
    // Reset vault to clean slate before each test
    saveVault(createInitialVault());
  });

  it('1. Correctly masks sensitive citizen identification numbers', () => {
    expect(maskDocumentNumber('492810298192')).toBe('•••• •••• 8192');
    expect(maskDocumentNumber('RC-MH-2026-9210')).toBe('•••• •••• •••• 9210');
    expect(maskDocumentNumber('1234')).toBe('1234');
    expect(maskDocumentNumber('')).toBe('••••');
  });

  it('2. Encrypts and decrypts sensitive document numbers and payload safely', async () => {
    const plain = 'Aadhaar: 4928 1029 8192 | IFSC: MAHB0000182';
    const pin = '5829';

    const encrypted = await encryptData(plain, pin);
    expect(encrypted).not.toBe(plain);
    expect(encrypted.length).toBeGreaterThan(0);

    const decrypted = await decryptData(encrypted, pin);
    expect(decrypted).toBe(plain);
  });

  it('3. Adds, persists, and retrieves new documents in the vault locker', () => {
    const added = addWalletDocument({
      type: 'income_cert',
      title: 'Annual Income Certificate 2026',
      documentNumber: 'INC-2026-88192',
      holderName: 'Sunita Devi',
      issuingAuthority: 'Tahsildar Office, Varanasi',
      fileName: 'Income_Cert.pdf',
    });

    expect(added.id).toBeDefined();
    expect(added.type).toBe('income_cert');
    expect(added.documentNumberMasked).toBe('•••• •••• •••• 8192');
    expect(added.isVerified).toBe(true);

    const vault = getStoredVault();
    expect(vault.documents.length).toBe(1);
    expect(vault.documents[0].id).toBe(added.id);
  });

  it('4. Successfully removes documents from the locker', () => {
    const doc1 = addWalletDocument({
      type: 'aadhaar',
      title: 'Aadhaar Card',
      documentNumber: '111122223333',
      holderName: 'Citizen One',
    });
    const doc2 = addWalletDocument({
      type: 'ration_card',
      title: 'Ration Card',
      documentNumber: 'RC998877',
      holderName: 'Citizen One',
    });

    expect(getStoredVault().documents.length).toBe(2);

    const deleted = deleteWalletDocument(doc1.id);
    expect(deleted).toBe(true);

    const remaining = getStoredVault().documents;
    expect(remaining.length).toBe(1);
    expect(remaining[0].id).toBe(doc2.id);
  });

  it('5. Loads pre-verified demonstration lockers for testing (Farmer, Student, Artisan)', () => {
    const farmerVault = loadDemoLocker('farmer');
    expect(farmerVault.documents.length).toBeGreaterThanOrEqual(3);
    expect(farmerVault.documents.some((d) => d.type === 'aadhaar')).toBe(true);
    expect(farmerVault.documents.some((d) => d.type === 'land_record')).toBe(true);
    expect(farmerVault.documents.some((d) => d.type === 'ration_card')).toBe(true);
    expect(farmerVault.documents.some((d) => d.type === 'bank_passbook')).toBe(true);

    const studentVault = loadDemoLocker('student');
    expect(studentVault.documents.some((d) => d.type === 'education_marksheet')).toBe(true);
  });

  it('6. Accurately matches scheme required documents against stored locker documents', () => {
    loadDemoLocker('farmer');
    const vault = getStoredVault();

    // Scheme requiring Aadhaar + Land Record (like PM-KISAN)
    const schemeDocs: SchemeDocument[] = [
      {
        id: 'doc_aadhaar',
        name: { en: 'Aadhaar Card', hi: 'आधार कार्ड', mr: 'आधार कार्ड' },
        mandatory: true,
      },
      {
        id: 'doc_land_record',
        name: { en: 'Land Ownership Document (7/12 Extract / RoR)', hi: 'भूलेख', mr: '७/१२ उतारा' },
        mandatory: true,
      },
    ];

    const match = getSchemeDocumentMatchScore(schemeDocs, vault);
    expect(match.totalCount).toBe(2);
    expect(match.matchedCount).toBe(2);
    expect(match.readinessPercentage).toBe(100);
    expect(match.missingDocs.length).toBe(0);

    // If an Income certificate is also required
    const schemeDocsWithIncome: SchemeDocument[] = [
      ...schemeDocs,
      {
        id: 'doc_income_cert',
        name: { en: 'Income Certificate', hi: 'आय प्रमाण पत्र', mr: 'उत्पन्न दाखला' },
        mandatory: true,
      },
    ];

    const match2 = getSchemeDocumentMatchScore(schemeDocsWithIncome, vault);
    expect(match2.totalCount).toBe(3);
    expect(match2.matchedCount).toBe(2);
    expect(match2.readinessPercentage).toBe(67);
    expect(match2.missingDocs.length).toBe(1);
    expect(match2.missingDocs[0].id).toBe('doc_income_cert');
  });

  it('7. Automatically derives user application profile parameters from verified wallet documents', () => {
    loadDemoLocker('farmer');
    const vault = getStoredVault();

    const derived = deriveProfileFromWallet(vault);
    expect(derived.occupation).toBe('farmer');
    expect(derived.landHolding).toBe('small');
    expect(derived.rationCardStatus).toBe('priority');
  });

  it('8. Supports encrypted vault export and roundtrip restore (.yojanavault payload)', async () => {
    loadDemoLocker('student');
    const originalDocs = getStoredVault().documents;

    const exportedJson = await exportVaultPayload('9988');
    expect(exportedJson).toContain('Yojana360');
    expect(exportedJson).toContain('benefit_wallet_vault');

    // Wipe vault
    saveVault(createInitialVault());
    expect(getStoredVault().documents.length).toBe(0);

    // Restore from exported payload
    const restored = await importVaultPayload(exportedJson, '9988');
    expect(restored).toBe(true);

    const afterVault = getStoredVault();
    expect(afterVault.documents.length).toBe(originalDocs.length);
    expect(afterVault.documents[0].title).toBe(originalDocs[0].title);
  });
});
