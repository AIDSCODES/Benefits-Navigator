/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Scheme, UserProfile, SupportedLanguage, MatchStatus } from './engine/types.ts';
import { evaluateScheme } from './engine/evaluator.ts';

export interface NewSchemeNotification {
  id: string;
  scheme: Scheme;
  detectedAt: string;
  matchReason: string;
  benefitSummary: string;
  read: boolean;
}

const SEEN_SCHEMES_KEY = 'benefits_navigator_seen_scheme_ids';
const NOTIFICATIONS_STORAGE_KEY = 'benefits_navigator_new_scheme_notifications';

/**
 * Get IDs of schemes the user has already acknowledged or seen
 */
export function getSeenSchemeIds(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(SEEN_SCHEMES_KEY);
    if (raw) {
      return new Set(JSON.parse(raw));
    }
  } catch {}
  return new Set();
}

/**
 * Mark a scheme as seen
 */
export function markSchemeAsSeen(schemeId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const set = getSeenSchemeIds();
    set.add(schemeId);
    localStorage.setItem(SEEN_SCHEMES_KEY, JSON.stringify(Array.from(set)));
  } catch {}
}

/**
 * Evaluates whether a newly arrived scheme is applicable to the user
 */
export function isSchemeApplicableToUser(scheme: Scheme, profile: UserProfile): {
  isApplicable: boolean;
  status: MatchStatus;
  reasons: string[];
} {
  const result = evaluateScheme(scheme, profile);
  const isApplicable = result.status === 'LIKELY_MATCH';
  
  const reasons: string[] = [];
  if (result.matched && result.matched.length > 0) {
    reasons.push(
      ...result.matched.map((c) => c.reason || `${c.criterion.field} matches your profile`)
    );
  }

  return {
    isApplicable,
    status: result.status,
    reasons,
  };
}

/**
 * Generates formatted alert messages suitable for WhatsApp, Email, or SMS
 */
export function formatSchemeAlertMessage(
  scheme: Scheme,
  profile: UserProfile,
  lang: SupportedLanguage = 'en'
): {
  subject: string;
  plainText: string;
  whatsAppText: string;
  htmlBody: string;
} {
  const schemeName = scheme.name[lang] || scheme.name.en;
  const benefit = scheme.benefit_type?.[lang] || scheme.benefit_type?.en || 'Government Welfare Support';
  const summary = scheme.short_summary[lang] || scheme.short_summary.en;
  const portal = scheme.official_url;
  const date = new Date().toLocaleDateString();

  const docs = scheme.documents.map((d) => `• ${d.name[lang] || d.name.en}`).join('\n');

  const subject = `🔔 New Scheme Alert: ${schemeName} is applicable to you!`;

  const plainText = 
`🔔 YOJANA360 — NEW SCHEME ALERT
--------------------------------------------------
A new government welfare scheme matching your profile has arrived:

Scheme: ${schemeName} (${scheme.code})
Benefit: ${benefit}
Category: ${scheme.category.toUpperCase()}

Why it matches you:
Based on your responses (State: ${profile.state || 'All India'}, Occupation: ${profile.occupation || 'Eligible Citizen'}), you qualify for direct benefits.

Summary:
${summary}

Required Documents Checklist:
${docs || '• Aadhaar Card\n• Bank Passbook'}

Official Government Portal:
${portal}

Note: Yojana360 is an open-source public guidance tool. Apply only on official .gov.in portals.
Generated on: ${date}`;

  const whatsAppText = 
`🔔 *New Government Scheme Alert!*
Hello! A new welfare scheme matching your profile has arrived:

🏛️ *${schemeName}* (${scheme.code})
💰 *Benefit*: ${benefit}
📋 *Summary*: ${summary}

📄 *Required Documents*:
${docs || '• Aadhaar Card\n• Bank Account'}

🔗 *Official Portal to Apply*:
${portal}

✅ *Check your complete entitlements*:
${typeof window !== 'undefined' ? window.location.origin : 'https://yojana360.in'}`;

  const htmlBody = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1c1917; background: #ffffff; border: 1px solid #e7e5e4; border-radius: 12px;">
  <div style="background: #166534; padding: 16px; border-radius: 8px; color: #ffffff; margin-bottom: 20px;">
    <h2 style="margin: 0; font-size: 20px;">🔔 New Scheme Alert for You</h2>
    <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.9;">Yojana360 Citizen Entitlement Alert</p>
  </div>
  
  <h3 style="color: #0c0a09; font-size: 18px; margin-bottom: 6px;">${schemeName} (${scheme.code})</h3>
  <p style="background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; padding: 10px 14px; border-radius: 6px; font-weight: bold; font-size: 14px; margin: 12px 0;">
    Benefit: ${benefit}
  </p>

  <p style="font-size: 14px; line-height: 1.5; color: #44403c;">${summary}</p>

  <div style="background: #fafaf9; border: 1px solid #e7e5e4; padding: 14px; border-radius: 8px; margin: 16px 0;">
    <h4 style="margin: 0 0 8px; font-size: 13px; color: #1c1917; text-transform: uppercase; letter-spacing: 0.5px;">Required Documents</h4>
    <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #57534e;">
      ${scheme.documents.map((d) => `<li>${d.name[lang] || d.name.en}</li>`).join('')}
    </ul>
  </div>

  <div style="margin-top: 24px; text-align: center;">
    <a href="${portal}" target="_blank" rel="noopener noreferrer" style="background: #ea580c; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px;">
      Apply on Official Government Portal →
    </a>
  </div>

  <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 24px 0 16px;" />
  <p style="font-size: 11px; color: #78716c; text-align: center; margin: 0;">
    Yojana360 — Open-source decision support. Not affiliated with any government agency. Always verify eligibility on official government portals.
  </p>
</div>`;

  return {
    subject,
    plainText,
    whatsAppText,
    htmlBody,
  };
}

/**
 * Dispatches WhatsApp message with pre-filled scheme alert
 */
export function sendSchemeAlertViaWhatsApp(
  scheme: Scheme,
  profile: UserProfile,
  lang: SupportedLanguage = 'en',
  phoneNumber?: string
): void {
  if (typeof window === 'undefined') return;
  const { whatsAppText } = formatSchemeAlertMessage(scheme, profile, lang);
  const cleanPhone = phoneNumber ? phoneNumber.replace(/\D/g, '') : '';
  const url = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsAppText)}`
    : `https://wa.me/?text=${encodeURIComponent(whatsAppText)}`;
  window.open(url, '_blank');
}

/**
 * Dispatches Email / Gmail with formatted scheme alert
 */
export function sendSchemeAlertViaEmail(
  scheme: Scheme,
  profile: UserProfile,
  lang: SupportedLanguage = 'en',
  recipientEmail?: string
): void {
  if (typeof window !== 'undefined') {
    const { subject, plainText } = formatSchemeAlertMessage(scheme, profile, lang);
    const to = recipientEmail ? encodeURIComponent(recipientEmail) : '';
    // Prefer web Gmail composer for 100% reliable cross-device dispatch
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(plainText)}`;
    window.open(gmailUrl, '_blank');
  }
}

/**
 * Dispatches SMS with pre-filled text
 */
export function sendSchemeAlertViaSMS(
  scheme: Scheme,
  profile: UserProfile,
  lang: SupportedLanguage = 'en',
  phoneNumber?: string
): void {
  if (typeof window === 'undefined') return;
  const { whatsAppText } = formatSchemeAlertMessage(scheme, profile, lang);
  const target = phoneNumber ? `sms:${phoneNumber}?body=` : 'sms:?body=';
  window.open(target + encodeURIComponent(whatsAppText), '_self');
}

/**
 * Requests browser Web Notification permission
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'denied';
  }
  if (Notification.permission === 'granted') {
    return 'granted';
  }
  try {
    return await Notification.requestPermission();
  } catch {
    return 'denied';
  }
}

/**
 * Triggers native OS Desktop / Mobile browser notification
 */
export function triggerBrowserNotification(
  scheme: Scheme,
  lang: SupportedLanguage = 'en',
  onClickCallback?: () => void
): boolean {
  if (typeof window === 'undefined' || !('Notification' in window)) return false;
  if (Notification.permission !== 'granted') return false;

  try {
    const title = `🔔 New Scheme for You: ${scheme.name[lang] || scheme.name.en}`;
    const benefit = scheme.benefit_type?.[lang] || scheme.benefit_type?.en || 'Welfare benefit';
    const notif = new Notification(title, {
      body: `${benefit}. Tap to view document checklist and apply online.`,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
    });

    notif.onclick = () => {
      window.focus();
      if (onClickCallback) onClickCallback();
      notif.close();
    };

    return true;
  } catch (err) {
    console.warn('Browser notification failed:', err);
    return false;
  }
}
