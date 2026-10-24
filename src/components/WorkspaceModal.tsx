/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  X,
  HardDrive,
  Mail,
  Send,
  Upload,
  ExternalLink,
  Check,
  AlertTriangle,
  LogOut,
  FileText,
  Search,
  Download,
  ArrowRight,
  Globe,
  Sparkles,
} from 'lucide-react';
import { User } from 'firebase/auth';
import {
  googleSignIn,
  signInWithDemoMode,
  logout,
  getAccessToken,
  initAuth,
} from '../lib/workspaceAuth.ts';
import { uploadReportToDrive, listDriveFiles, DriveFile } from '../lib/driveService.ts';
import {
  sendEmailViaGmail,
  listRecentGmailMessages,
  GmailMessageSummary,
} from '../lib/gmailService.ts';
import { GoogleSignInButton } from './GoogleSignInButton.tsx';
import { SchemeEvaluationResult } from '../lib/engine/types.ts';

interface WorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportContentHtml: string;
  reportContentText: string;
  likelyMatch: SchemeEvaluationResult[];
  consolidatedDocs: { name: { en: string } }[];
}

export const WorkspaceModal: React.FC<WorkspaceModalProps> = ({
  isOpen,
  onClose,
  reportContentHtml,
  reportContentText,
  likelyMatch,
  consolidatedDocs,
}) => {
  const [activeTab, setActiveTab] = useState<'drive' | 'gmail'>('drive');
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [unauthorizedDomainInfo, setUnauthorizedDomainInfo] = useState<{ hostname: string; isLoopbackIp: boolean } | null>(null);


  // Drive state
  const [driveFiles, setDriveFiles] = useState<DriveFile[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [uploadSuccessUrl, setUploadSuccessUrl] = useState<string | null>(null);

  // Gmail state
  const [recipientEmail, setRecipientEmail] = useState('');
  const [emailSubject, setEmailSubject] = useState(
    'Yojana360: My Public Welfare Guidance & Document Checklist'
  );
  const [gmailMessages, setGmailMessages] = useState<GmailMessageSummary[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [showSendConfirmation, setShowSendConfirmation] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        if (currentUser.email && !recipientEmail) {
          setRecipientEmail(currentUser.email);
        }
      },
      () => {
        setUser(null);
        setToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch Drive files when user is authenticated and on drive tab
  useEffect(() => {
    if (token && activeTab === 'drive') {
      loadDriveFiles();
    } else if (token && activeTab === 'gmail') {
      loadGmailMessages();
    }
  }, [token, activeTab]);

  const loadDriveFiles = async () => {
    if (!token) return;
    setLoadingFiles(true);
    try {
      const files = await listDriveFiles(token);
      setDriveFiles(files);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoadingFiles(false);
    }
  };

  const loadGmailMessages = async () => {
    if (!token) return;
    setLoadingMessages(true);
    try {
      const msgs = await listRecentGmailMessages(token);
      setGmailMessages(msgs);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleSignIn = async () => {
    setLoading(true);
    setStatusMessage(null);
    setUnauthorizedDomainInfo(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
        if (res.user.email) setRecipientEmail(res.user.email);
        setStatusMessage({ type: 'success', text: `Connected as ${res.user.displayName || res.user.email}` });
      }
    } catch (err: any) {
      if (err?.code === 'auth/unauthorized-domain' || err?.message?.includes('unauthorized-domain')) {
        const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'current domain';
        setUnauthorizedDomainInfo({
          hostname: currentHost,
          isLoopbackIp: currentHost === '127.0.0.1',
        });
        setStatusMessage({
          type: 'error',
          text: currentHost === '127.0.0.1'
            ? 'Firebase blocked "127.0.0.1". Switch to "http://localhost:3000" or add domain to Firebase.'
            : `Firebase Error: Domain "${currentHost}" is not in the Firebase Authorized Domains list.`,
        });
      } else {
        setStatusMessage({ type: 'error', text: err?.message || 'Sign in failed' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSignIn = () => {
    const res = signInWithDemoMode();
    setUser(res.user);
    setToken(res.accessToken);
    setRecipientEmail('citizen@gmail.com');
    setUnauthorizedDomainInfo(null);
    setStatusMessage({
      type: 'success',
      text: 'Connected in Demo Mode! You can now test saving to Drive or sending via Gmail.',
    });
  };

  const handleDownloadReportLocally = () => {
    if (typeof window === 'undefined') return;
    const filename = `Benefits_Navigator_Report_${new Date().toISOString().split('T')[0]}.html`;
    const blob = new Blob([reportContentHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatusMessage({
      type: 'success',
      text: `Report saved to your computer as "${filename}".`,
    });
  };

  const handleOpenDirectGmail = () => {
    if (typeof window === 'undefined') return;
    const textBody = reportContentText;
    const targetEmail = recipientEmail || user?.email || '';
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(textBody)}`;
    window.open(gmailUrl, '_blank');
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setToken(null);
    setStatusMessage(null);
    setUnauthorizedDomainInfo(null);
  };

  // Upload report to Google Drive
  const handleSaveToDrive = async () => {
    if (!token) return;
    setLoading(true);
    setStatusMessage(null);
    setUploadSuccessUrl(null);
    try {
      const filename = `Benefits_Navigator_Report_${new Date().toISOString().split('T')[0]}.html`;
      const uploaded = await uploadReportToDrive(token, filename, reportContentHtml, 'text/html');
      setUploadSuccessUrl(uploaded.webViewLink || null);
      setStatusMessage({
        type: 'success',
        text: `Report saved to Google Drive as "${filename}".`,
      });
      loadDriveFiles();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err?.message || 'Failed to save to Drive' });
    } finally {
      setLoading(false);
    }
  };

  // Send Email via Gmail (Requires user confirmation dialog)
  const handleConfirmSendEmail = async () => {
    if (!token || !recipientEmail) return;
    setShowSendConfirmation(false);
    setLoading(true);
    setStatusMessage(null);
    try {
      await sendEmailViaGmail(token, recipientEmail, emailSubject, reportContentHtml);
      setStatusMessage({
        type: 'success',
        text: `Checklist email sent to ${recipientEmail} via Gmail.`,
      });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err?.message || 'Failed to send email' });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="workspace-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-900 dark:text-white">
              {activeTab === 'drive' ? <HardDrive className="w-5 h-5 text-amber-500" /> : <Mail className="w-5 h-5 text-rose-500" />}
            </div>
            <div>
              <h3 id="workspace-modal-title" className="text-lg font-bold text-stone-900 dark:text-white">
                Google Workspace Integration
              </h3>
              <p className="text-xs text-stone-500">
                Save checklists to Google Drive or email via Gmail
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-xl min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers & Auth status */}
        <div className="px-6 py-3 bg-stone-50 dark:bg-stone-950/60 border-b border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('drive')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                activeTab === 'drive'
                  ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <HardDrive className="w-3.5 h-3.5" />
              <span>Google Drive</span>
            </button>
            <button
              onClick={() => setActiveTab('gmail')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                activeTab === 'gmail'
                  ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Gmail</span>
            </button>
          </div>

          {user ? (
            <div className="flex items-center gap-2 text-stone-700 dark:text-stone-300 font-medium">
              <span className="truncate max-w-[180px]">{user.displayName || user.email}</span>
              <button
                onClick={handleLogout}
                title="Disconnect"
                className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <span className="text-stone-500">Not connected</span>
          )}
        </div>

        {/* Status Toast */}
        {statusMessage && (
          <div
            className={`mx-6 mt-4 p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300'
                : 'bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300'
            }`}
          >
            {statusMessage.type === 'success' ? <Check className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
            <span className="flex-1">{statusMessage.text}</span>
            {uploadSuccessUrl && (
              <a
                href={uploadSuccessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline ml-2 flex items-center gap-1 shrink-0"
              >
                <span>Open in Drive</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!user ? (
            <div className="py-8 text-center max-w-md mx-auto space-y-4">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300">
                {activeTab === 'drive' ? <HardDrive className="w-6 h-6 text-amber-500" /> : <Mail className="w-6 h-6 text-rose-500" />}
              </div>
              <h4 className="text-base font-bold text-stone-900 dark:text-white">
                Connect your Google Account
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Connect with permission from your account to save reports to Google Drive or send entitlement checklists via Gmail.
              </p>
              <div className="pt-2 flex flex-col items-center gap-3">
                <GoogleSignInButton onClick={handleSignIn} disabled={loading} />

                {/* Unauthorized Domain Resolution Card */}
                {unauthorizedDomainInfo && (
                  <div className="w-full text-left p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/60 space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-200">
                      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span>Firebase Unauthorized Domain (auth/unauthorized-domain)</span>
                    </div>

                    <p className="text-xs text-amber-800 dark:text-amber-300/90 leading-relaxed">
                      Firebase Authentication requires domains to be whitelisted. Your current origin{' '}
                      <code className="px-1.5 py-0.5 rounded-sm bg-amber-200/60 dark:bg-amber-900/50 font-mono font-bold">
                        {unauthorizedDomainInfo.hostname}
                      </code>{' '}
                      is not registered in project <code className="font-mono font-semibold">gen-lang-client-0605213320</code>.
                    </p>

                    {/* Action 1: Switch from 127.0.0.1 to localhost */}
                    {unauthorizedDomainInfo.isLoopbackIp && (
                      <div className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-amber-200 dark:border-amber-800/80">
                        <div className="text-xs font-bold text-stone-900 dark:text-white mb-1">
                          Recommended Quick Fix:
                        </div>
                        <p className="text-[11px] text-stone-600 dark:text-stone-400 mb-2">
                          Firebase allows <code className="font-bold">localhost</code> by default, but blocks <code className="font-bold">127.0.0.1</code>.
                        </p>
                        <button
                          onClick={() => {
                            window.location.href = window.location.href.replace('127.0.0.1', 'localhost');
                          }}
                          className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                        >
                          <span>Switch to http://localhost:3000</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {/* Action 2: Add domain in Firebase Console */}
                    <div className="text-[11px] text-stone-600 dark:text-stone-400">
                      <span>To authorize this domain permanently: </span>
                      <a
                        href="https://console.firebase.google.com/project/gen-lang-client-0605213320/authentication/settings"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 font-bold underline"
                      >
                        <span>Open Firebase Console Settings</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <span className="block mt-0.5 text-stone-500">
                        → Go to "Authorized domains" → click "Add domain" → enter <code className="font-mono font-bold">{unauthorizedDomainInfo.hostname}</code>
                      </span>
                    </div>

                    {/* Action 3: Instant No-Block Alternatives */}
                    <div className="pt-2 border-t border-amber-200 dark:border-amber-800/60 flex flex-wrap gap-2">
                      <button
                        onClick={handleDemoSignIn}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Continue in Demo Mode</span>
                      </button>

                      {activeTab === 'gmail' && (
                        <button
                          onClick={handleOpenDirectGmail}
                          className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-100 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5 text-rose-400" />
                          <span>Open Draft in Gmail Web App</span>
                        </button>
                      )}

                      <button
                        onClick={handleDownloadReportLocally}
                        className="px-3 py-1.5 rounded-xl bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Report (HTML)</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Subtitle Fallback when no error yet */}
                {!unauthorizedDomainInfo && (
                  <div className="flex items-center gap-2 text-xs text-stone-500 pt-1">
                    <span>Or use without Google sign-in:</span>
                    <button
                      onClick={handleDemoSignIn}
                      className="font-semibold text-amber-600 dark:text-amber-400 underline hover:text-amber-700"
                    >
                      Demo Mode
                    </button>
                    <span>•</span>
                    <button
                      onClick={handleDownloadReportLocally}
                      className="font-semibold text-stone-600 dark:text-stone-300 underline hover:text-stone-900"
                    >
                      Download HTML
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* TAB 1: GOOGLE DRIVE */}
              {activeTab === 'drive' && (
                <div className="space-y-6">
                  {/* Save Report Card */}
                  <div className="p-5 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-200 dark:border-stone-800">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h4 className="text-sm font-bold text-stone-900 dark:text-white">
                          Save Report to Google Drive
                        </h4>
                        <p className="text-xs text-stone-500 mt-0.5">
                          Uploads an HTML document with your {likelyMatch.length} matched schemes and {consolidatedDocs.length} required documents.
                        </p>
                      </div>
                      <button
                        onClick={handleSaveToDrive}
                        disabled={loading}
                        className="px-4 py-2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 hover:bg-stone-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 min-h-[40px] disabled:opacity-50"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{loading ? 'Uploading...' : 'Save to Drive'}</span>
                      </button>
                    </div>

                    <div className="text-[11px] font-mono text-stone-600 dark:text-stone-400 bg-white dark:bg-stone-900 p-2.5 rounded-lg border border-stone-200 dark:border-stone-700 truncate">
                      Filename: Benefits_Navigator_Report_{new Date().toISOString().split('T')[0]}.html
                    </div>
                  </div>

                  {/* Recent Files from Drive */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                        Recent Google Drive Files
                      </h4>
                      <button
                        onClick={loadDriveFiles}
                        disabled={loadingFiles}
                        className="text-xs text-stone-600 hover:underline"
                      >
                        {loadingFiles ? 'Refreshing...' : 'Refresh'}
                      </button>
                    </div>

                    {loadingFiles ? (
                      <div className="text-center py-6 text-xs text-stone-400">Loading Drive files...</div>
                    ) : driveFiles.length === 0 ? (
                      <div className="text-center py-6 text-xs text-stone-500 bg-stone-50 dark:bg-stone-800/40 rounded-xl">
                        No recent files found.
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {driveFiles.map((file) => (
                          <div
                            key={file.id}
                            className="p-3 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <FileText className="w-4 h-4 text-stone-400 shrink-0" />
                              <span className="font-medium text-stone-800 dark:text-stone-200 truncate">
                                {file.name}
                              </span>
                            </div>
                            {file.webViewLink && (
                              <a
                                href={file.webViewLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-stone-500 hover:text-stone-900 dark:hover:text-white shrink-0 p-1"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: GMAIL */}
              {activeTab === 'gmail' && (
                <div className="space-y-6">
                  {/* Email Composer Form */}
                  <div className="p-5 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3">
                    <h4 className="text-sm font-bold text-stone-900 dark:text-white">
                      Email Entitlement Report & Checklist
                    </h4>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                        Recipient Email Address:
                      </label>
                      <input
                        type="email"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        placeholder="recipient@example.com"
                        className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-stone-900 min-h-[40px]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                        Subject:
                      </label>
                      <input
                        type="text"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-stone-900 min-h-[40px]"
                      />
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => setShowSendConfirmation(true)}
                        disabled={loading || !recipientEmail}
                        className="px-5 py-2.5 bg-stone-900 dark:bg-white text-white dark:text-stone-900 hover:bg-stone-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors min-h-[40px] disabled:opacity-50"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Email via Gmail</span>
                      </button>
                    </div>
                  </div>

                  {/* Recent Welfare Emails */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                        Recent Scheme / Welfare Emails in Gmail
                      </h4>
                      <button
                        onClick={loadGmailMessages}
                        disabled={loadingMessages}
                        className="text-xs text-stone-600 hover:underline"
                      >
                        {loadingMessages ? 'Searching...' : 'Refresh'}
                      </button>
                    </div>

                    {loadingMessages ? (
                      <div className="text-center py-6 text-xs text-stone-400">Searching Gmail...</div>
                    ) : gmailMessages.length === 0 ? (
                      <div className="text-center py-6 text-xs text-stone-500 bg-stone-50 dark:bg-stone-800/40 rounded-xl">
                        No recent scheme or subsidy messages found in your inbox.
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {gmailMessages.map((msg) => (
                          <div
                            key={msg.id}
                            className="p-3 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 text-xs space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-stone-900 dark:text-white truncate">
                                {msg.subject}
                              </span>
                              <span className="text-[10px] text-stone-400 shrink-0 font-mono">{msg.date}</span>
                            </div>
                            <div className="text-[11px] text-stone-500 line-clamp-1">{msg.snippet}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-200 rounded-xl min-h-[40px]"
          >
            Close
          </button>
        </div>
      </div>

      {/* Mandatory User Confirmation Dialog Before Sending Email (Destructive/Mutating Operation Rule) */}
      {showSendConfirmation && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md p-6 bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 space-y-4">
            <div className="flex items-center gap-3 text-amber-600">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h4 className="text-base font-bold text-stone-900 dark:text-white">
                Confirm Sending Email via Gmail
              </h4>
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Are you sure you want to send this Yojana360 report to <strong>{recipientEmail}</strong> using your connected Gmail account?
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSendConfirmation(false)}
                className="px-4 py-2 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 rounded-xl min-h-[40px]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSendEmail}
                className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl min-h-[40px]"
              >
                Confirm & Send Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
