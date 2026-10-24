/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GmailMessageSummary {
  id: string;
  threadId: string;
  snippet?: string;
  from?: string;
  subject?: string;
  date?: string;
}

function base64UrlEncode(str: string): string {
  // UTF-8 safe base64 url encoding
  const utf8Bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < utf8Bytes.length; i++) {
    binary += String.fromCharCode(utf8Bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Sends an email via Gmail API
 */
export async function sendEmailViaGmail(
  accessToken: string,
  toEmail: string,
  subject: string,
  bodyHtml: string
): Promise<{ id: string; threadId: string }> {
  if (accessToken === 'demo-access-token') {
    if (typeof window !== 'undefined') {
      const textBody = bodyHtml.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(toEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(textBody)}`;
      window.open(gmailUrl, '_blank');
    }
    return {
      id: 'demo-msg-' + Date.now(),
      threadId: 'demo-thread-' + Date.now(),
    };
  }

  const rfc822 = [

    `To: ${toEmail}`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    '',
    bodyHtml,
  ].join('\r\n');

  const raw = base64UrlEncode(rfc822);

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to send email via Gmail (status ${res.status})`);
  }

  return await res.json();
}

/**
 * Creates a draft in Gmail
 */
export async function createGmailDraft(
  accessToken: string,
  toEmail: string,
  subject: string,
  bodyHtml: string
): Promise<{ id: string; message: { id: string } }> {
  const rfc822 = [
    `To: ${toEmail}`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    '',
    bodyHtml,
  ].join('\r\n');

  const raw = base64UrlEncode(rfc822);

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/drafts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: { raw } }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to create draft in Gmail (status ${res.status})`);
  }

  return await res.json();
}

/**
 * Lists recent welfare notices or government scheme emails in Gmail
 */
export async function listRecentGmailMessages(
  accessToken: string,
  query: string = 'subject:(yojana OR scheme OR subsidy OR kisan OR ayushman OR dbt)'
): Promise<GmailMessageSummary[]> {
  if (accessToken === 'demo-access-token') {
    return [
      {
        id: 'demo-gmail-1',
        threadId: 'demo-thread-1',
        subject: 'PM-Kisan Samman Nidhi: Beneficiary Status Update',
        from: 'no-reply@pmkisan.gov.in',
        date: new Date().toLocaleDateString(),
        snippet: 'Your installment has been verified and credited via Direct Benefit Transfer...',
      },
    ];
  }

  const listRes = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10&q=${encodeURIComponent(query)}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!listRes.ok) {
    const errorData = await listRes.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to fetch messages from Gmail (status ${listRes.status})`);
  }

  const listData = await listRes.json();
  const messages: GmailMessageSummary[] = [];

  if (Array.isArray(listData.messages)) {
    for (const msg of listData.messages.slice(0, 8)) {
      try {
        const detailRes = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=Date`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (detailRes.ok) {
          const detailData = await detailRes.json();
          const headers = detailData.payload?.headers || [];
          const subject = headers.find((h: any) => h.name.toLowerCase() === 'subject')?.value || '(No Subject)';
          const from = headers.find((h: any) => h.name.toLowerCase() === 'from')?.value || '';
          const date = headers.find((h: any) => h.name.toLowerCase() === 'date')?.value || '';
          messages.push({
            id: detailData.id,
            threadId: detailData.threadId,
            snippet: detailData.snippet,
            subject,
            from,
            date,
          });
        }
      } catch {}
    }
  }

  return messages;
}
