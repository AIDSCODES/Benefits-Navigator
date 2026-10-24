/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime?: string;
  webViewLink?: string;
  size?: string;
}

/**
 * Creates or uploads a text/HTML report to Google Drive.
 */
export async function uploadReportToDrive(
  accessToken: string,
  filename: string,
  content: string,
  mimeType: string = 'text/plain'
): Promise<DriveFile> {
  // If demo token, trigger a real browser file download and return a mock file
  if (accessToken === 'demo-access-token') {
    if (typeof window !== 'undefined') {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
    return {
      id: 'demo-drive-file-' + Date.now(),
      name: filename,
      mimeType: mimeType,
      modifiedTime: new Date().toISOString(),
      webViewLink: 'https://drive.google.com/drive/my-drive',
      size: String(content.length),
    };
  }

  const metadata = {
    name: filename,
    mimeType: mimeType,
    description: 'Benefits Navigator public welfare guidance checklist & matched entitlements report.',
  };


  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    `Content-Type: ${mimeType}\r\n\r\n` +
    content +
    closeDelimiter;

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,webViewLink', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
    },
    body: multipartRequestBody,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to upload file to Google Drive (status ${res.status})`);
  }

  return await res.json();
}

/**
 * Lists or searches files in Google Drive.
 */
export async function listDriveFiles(
  accessToken: string,
  query?: string
): Promise<DriveFile[]> {
  if (accessToken === 'demo-access-token') {
    return [
      {
        id: 'demo-file-1',
        name: 'Benefits_Navigator_Report_Offline_Checklist.html',
        mimeType: 'text/html',
        modifiedTime: new Date().toISOString(),
        webViewLink: 'https://drive.google.com/drive/my-drive',
        size: '14250',
      },
    ];
  }

  let url = 'https://www.googleapis.com/drive/v3/files?pageSize=20&fields=files(id,name,mimeType,modifiedTime,webViewLink,size)&orderBy=modifiedTime desc';

  if (query) {
    url += `&q=${encodeURIComponent(query)}`;
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to fetch Google Drive files (status ${res.status})`);
  }

  const data = await res.json();
  return data.files || [];
}
