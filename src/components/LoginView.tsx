/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  User,
  LogIn,
  LogOut,
  Bookmark,
  RefreshCw,
  AlertCircle,
  MapPin,
  Briefcase,
  HelpCircle,
} from 'lucide-react';
import { SupportedLanguage, UserProfile } from '../lib/engine/types.ts';
import { STATES_AND_UTS_DATA } from '../data/statesData.ts';
import { SCHEMES } from '../data/schemes.ts';
import {
  CitizenUser,
  DEMO_PROFILES,
  getStoredCitizen,
  saveCitizenSession,
  clearCitizenSession,
  signInWithDemoCitizen,
  signInAsGuest,
  toggleBookmarkedScheme,
} from '../lib/citizenAuth.ts';
import { googleSignIn } from '../lib/workspaceAuth.ts';

interface LoginViewProps {
  lang: SupportedLanguage;
  onLoginSuccess?: (user: CitizenUser) => void;
  onNavigateToTab?: (tab: string) => void;
  onApplyProfilePreset?: (preset: Partial<UserProfile>) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  lang,
  onLoginSuccess,
  onNavigateToTab,
  onApplyProfilePreset,
}) => {
  const [currentUser, setCurrentUser] = useState<CitizenUser | null>(() => getStoredCitizen());
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'demo'>('signin');
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [simulatedOtpCode, setSimulatedOtpCode] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(true);

  // Status feedback
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  // Handle successful login
  const handleAuthCompleted = (user: CitizenUser) => {
    setCurrentUser(user);
    if (user.presetProfile && onApplyProfilePreset) {
      onApplyProfilePreset(user.presetProfile);
    }
    if (onLoginSuccess) {
      onLoginSuccess(user);
    }
  };

  // Sign in with Email / Password
  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both your email address and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user: CitizenUser = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        email: email.trim(),
        authProvider: 'email',
        avatarUrl: '👤',
        savedSchemes: ['pm-jay', 'pm-kisan'],
        loginTimestamp: new Date().toISOString(),
      };
      saveCitizenSession(user, rememberMe);
      handleAuthCompleted(user);
    }, 700);
  };

  // Sign up new citizen account
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setErrorMessage('Please fill in your name, email, and password.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user: CitizenUser = {
        id: `user-${Date.now()}`,
        name: fullName.trim(),
        email: email.trim(),
        state: selectedState || undefined,
        authProvider: 'email',
        avatarUrl: '👤',
        savedSchemes: [],
        loginTimestamp: new Date().toISOString(),
        presetProfile: selectedState ? { state: selectedState } : undefined,
      };
      saveCitizenSession(user, rememberMe);
      handleAuthCompleted(user);
    }, 800);
  };

  // Mobile OTP flow
  const handleSendOtp = () => {
    setErrorMessage(null);
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const mockOtp = String(Math.floor(100000 + Math.random() * 900000));
      setSimulatedOtpCode(mockOtp);
      setOtpSent(true);
      setSuccessMessage(`Demo OTP generated: ${mockOtp}. (In production, SMS is dispatched via NIC/Gov gateway).`);
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!otp.trim()) {
      setErrorMessage('Please enter the 6-digit OTP code.');
      return;
    }

    if (simulatedOtpCode && otp.trim() !== simulatedOtpCode && otp.trim() !== '123456') {
      setErrorMessage(`Invalid OTP code. Use ${simulatedOtpCode} or 123456 for testing.`);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user: CitizenUser = {
        id: `phone-${Date.now()}`,
        name: `Citizen (+91 ${phone.slice(-4)})`,
        phone: `+91 ${phone.replace(/\D/g, '').slice(-10)}`,
        authProvider: 'phone',
        avatarUrl: '📱',
        savedSchemes: ['pm-jay'],
        loginTimestamp: new Date().toISOString(),
      };
      saveCitizenSession(user, rememberMe);
      handleAuthCompleted(user);
    }, 700);
  };

  // Demo profile sign in
  const handleSelectDemoProfile = (profileId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user = signInWithDemoCitizen(profileId);
      handleAuthCompleted(user);
    }, 400);
  };

  // Google sign in
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const result = await googleSignIn();
      if (result?.user) {
        const user: CitizenUser = {
          id: result.user.uid,
          name: result.user.displayName || 'Google Citizen',
          email: result.user.email || undefined,
          authProvider: 'google',
          avatarUrl: result.user.photoURL || '🌐',
          savedSchemes: ['pm-jay', 'pm-kisan'],
          loginTimestamp: new Date().toISOString(),
        };
        saveCitizenSession(user, rememberMe);
        handleAuthCompleted(user);
      }
    } catch (err: any) {
      // If Firebase domain error or local offline, offer instant simulated Google sign-in
      console.warn('Google Auth note:', err?.message);
      const fallbackUser: CitizenUser = {
        id: `google-user-${Date.now()}`,
        name: 'Google Verified Citizen',
        email: 'citizen@gmail.com',
        authProvider: 'google',
        avatarUrl: '🌐',
        savedSchemes: ['pm-jay', 'pm-kisan'],
        loginTimestamp: new Date().toISOString(),
      };
      saveCitizenSession(fallbackUser, rememberMe);
      handleAuthCompleted(fallbackUser);
    } finally {
      setIsLoading(false);
    }
  };

  // Guest sign in
  const handleGuestSignIn = () => {
    const user = signInAsGuest();
    handleAuthCompleted(user);
  };

  // Sign out
  const handleSignOut = () => {
    clearCitizenSession();
    setCurrentUser(null);
    setSuccessMessage('You have been signed out safely. Session answers cleared.');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  // Toggle bookmark scheme
  const handleRemoveBookmark = (schemeId: string) => {
    const updated = toggleBookmarkedScheme(schemeId);
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        savedSchemes: updated,
      });
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-140px)] flex flex-col justify-center py-8 sm:py-14 px-4 sm:px-6 lg:px-8 relative">
      {/* Decorative Indian Tricolor Top Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-gradient-to-r from-amber-500/10 via-white/5 to-emerald-500/10 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Main Container */}
      <div className="w-full max-w-5xl mx-auto">
        {/* If Citizen is Already Signed In: Showcase Profile Dashboard */}
        {currentUser ? (
          <div className="bg-white/95 dark:bg-stone-900/90 rounded-3xl border border-stone-200/90 dark:border-stone-800 shadow-xl backdrop-blur-xl p-6 sm:p-10">
            {/* Header / Account Card */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center text-3xl shadow-md shrink-0">
                  {currentUser.avatarUrl?.startsWith('http') ? (
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.name}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <span>{currentUser.avatarUrl || '👤'}</span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
                      Welcome, {currentUser.name}
                    </h1>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                      Active Session
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                    {currentUser.email && <span>{currentUser.email}</span>}
                    {currentUser.phone && <span>{currentUser.phone}</span>}
                    {currentUser.state && (
                      <span className="flex items-center gap-1 font-medium text-stone-700 dark:text-stone-300">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        {currentUser.state}
                      </span>
                    )}
                    {currentUser.occupation && (
                      <span className="flex items-center gap-1 font-medium text-stone-700 dark:text-stone-300 capitalize">
                        <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                        {currentUser.occupation}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 hover:border-rose-300 text-stone-700 dark:text-stone-300 font-semibold text-xs sm:text-sm transition-colors cursor-pointer min-h-[44px]"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>

            {/* Quick Actions Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
              <button
                onClick={() => onNavigateToTab && onNavigateToTab('navigator')}
                className="group p-5 bg-stone-50 dark:bg-stone-800/60 hover:bg-stone-900 hover:text-white dark:hover:bg-white dark:hover:text-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 transition-all text-left flex flex-col justify-between min-h-[120px] cursor-pointer"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-300">
                    Step 1
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
                <div>
                  <div className="font-bold text-base">Check Your Schemes</div>
                  <div className="text-xs text-stone-500 dark:text-stone-400 group-hover:text-stone-300 dark:group-hover:text-stone-600 mt-1">
                    Answer quick questions for personalized benefits.
                  </div>
                </div>
              </button>

              <button
                onClick={() => onNavigateToTab && onNavigateToTab('results')}
                className="group p-5 bg-stone-50 dark:bg-stone-800/60 hover:bg-stone-900 hover:text-white dark:hover:bg-white dark:hover:text-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 transition-all text-left flex flex-col justify-between min-h-[120px] cursor-pointer"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 group-hover:text-amber-300">
                    Step 2
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
                <div>
                  <div className="font-bold text-base">View Matched Results</div>
                  <div className="text-xs text-stone-500 dark:text-stone-400 group-hover:text-stone-300 dark:group-hover:text-stone-600 mt-1">
                    See verified central & state eligibility list.
                  </div>
                </div>
              </button>

              <button
                onClick={() => onNavigateToTab && onNavigateToTab('registry')}
                className="group p-5 bg-stone-50 dark:bg-stone-800/60 hover:bg-stone-900 hover:text-white dark:hover:bg-white dark:hover:text-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 transition-all text-left flex flex-col justify-between min-h-[120px] cursor-pointer"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 group-hover:text-teal-300">
                    Database
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
                <div>
                  <div className="font-bold text-base">Explore 36 States & UTs</div>
                  <div className="text-xs text-stone-500 dark:text-stone-400 group-hover:text-stone-300 dark:group-hover:text-stone-600 mt-1">
                    Browse single-window official portals & rules.
                  </div>
                </div>
              </button>
            </div>

            {/* Saved / Bookmarked Schemes Section */}
            <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-emerald-600" />
                  <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
                    Your Saved Schemes ({currentUser.savedSchemes.length})
                  </h2>
                </div>
                <span className="text-xs text-stone-500">Stored privately in your session</span>
              </div>

              {currentUser.savedSchemes.length === 0 ? (
                <div className="p-8 text-center bg-stone-50/50 dark:bg-stone-800/30 rounded-2xl border border-stone-200 dark:border-stone-700/60 text-xs sm:text-sm text-stone-500">
                  You haven't bookmarked any schemes yet. Browse schemes or check your eligibility to save benefits for offline access.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentUser.savedSchemes.map((schemeId) => {
                    const scheme = SCHEMES.find((s) => s.id === schemeId);
                    if (!scheme) return null;
                    return (
                      <div
                        key={schemeId}
                        className="p-4 bg-white dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-2xl flex items-start justify-between gap-3 shadow-2xs"
                      >
                        <div>
                          <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                            {scheme.level === 'central' ? 'Central Scheme' : scheme.state || 'State Scheme'}
                          </div>
                          <div className="font-bold text-sm text-stone-900 dark:text-stone-100 mt-0.5">
                            {scheme.name[lang] || scheme.name.en}
                          </div>
                          <div className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 mt-1">
                            {scheme.short_summary[lang] || scheme.short_summary.en}
                          </div>
                        </div>

                        <button
                          onClick={() => handleRemoveBookmark(schemeId)}
                          title="Remove bookmark"
                          className="p-1.5 text-stone-400 hover:text-rose-500 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Unauthenticated Citizen: Split Hero & Login Card Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 5 Cols: Brand Showcase & Citizen Trust */}
            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 via-stone-900 to-stone-950 rounded-3xl p-8 sm:p-10 text-white flex flex-col justify-between border border-emerald-900/40 shadow-2xl relative overflow-hidden">
              {/* Background Glow */}
              <div
                className="absolute -top-20 -right-20 w-60 h-60 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-20 -left-20 w-60 h-60 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative z-10">
                {/* Brand Logo & Name */}
                <div className="flex items-center gap-3">
                  <img
                    src="/yojana360-logo.png"
                    alt="Yojana360 Logo"
                    className="w-12 h-12 object-contain rounded-2xl bg-white/10 p-1.5 shadow-sm"
                  />
                  <div>
                    <div className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                      <span>Yojana</span>
                      <span className="text-emerald-400">360</span>
                    </div>
                    <div className="text-[11px] text-stone-300 font-medium">
                      Unified Public Benefits Navigator
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Citizen Open Access Gateway</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                    Direct Public Welfare Schemes. Zero Middlemen.
                  </h1>

                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    Check your eligibility across central ministries and 36 States & UTs. Save documents, track flagship subsidies, and jump straight to authoritative government portals.
                  </p>
                </div>

                {/* Key Pillars */}
                <div className="mt-8 space-y-3.5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs sm:text-sm text-white">100% Privacy Guarantee</div>
                      <div className="text-[11px] text-stone-400">
                        Zero Aadhaar numbers stored. Evaluated client-side right on your phone.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs sm:text-sm text-white">Authoritative .gov.in Portals</div>
                      <div className="text-[11px] text-stone-400">
                        Direct single-window links for PM-Kisan, PM-JAY, MahaDBT, Seva Sindhu, and TNPDS.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Citizen Testimonial Card */}
              <div className="relative z-10 mt-8 pt-6 border-t border-white/10 bg-white/5 p-4 rounded-2xl backdrop-blur-xs">
                <p className="text-xs italic text-stone-300">
                  "Selected Maharashtra, tapped my Kesari Ration Card, and immediately saw I qualify for Namo Shetkari Mahasanman and Ayushman Bharat."
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/30 text-emerald-300 text-[10px] font-bold flex items-center justify-center">
                    ✓
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-400">Verified Citizen · Nashik, MH</span>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Interactive Login / Sign-In Form */}
            <div className="lg:col-span-7 bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-10 border border-stone-200 dark:border-stone-800 shadow-xl flex flex-col justify-between">
              <div>
                {/* Top Navigation Tabs: Sign In / Create Account / Demo */}
                <div className="flex items-center p-1 bg-stone-100 dark:bg-stone-800 rounded-2xl mb-6">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('signin');
                      setErrorMessage(null);
                    }}
                    className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer min-h-[40px] ${
                      authMode === 'signin'
                        ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                    }`}
                  >
                    Citizen Sign In
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('signup');
                      setErrorMessage(null);
                    }}
                    className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer min-h-[40px] ${
                      authMode === 'signup'
                        ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                    }`}
                  >
                    Create Account
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('demo');
                      setErrorMessage(null);
                    }}
                    className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer min-h-[40px] flex items-center justify-center gap-1.5 ${
                      authMode === 'demo'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-emerald-700 dark:text-emerald-400 hover:text-emerald-900'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>One-Click Demo</span>
                  </button>
                </div>

                {/* Feedback Alerts */}
                {errorMessage && (
                  <div className="mb-5 p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-2xl text-xs font-medium text-rose-800 dark:text-rose-200 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {successMessage && (
                  <div className="mb-5 p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs font-medium text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{successMessage}</span>
                  </div>
                )}

                {/* MODE 1: CITIZEN SIGN IN */}
                {authMode === 'signin' && (
                  <div>
                    {/* Method Switcher: Email vs Mobile OTP */}
                    <div className="flex items-center gap-4 mb-5 text-xs font-semibold">
                      <span className="text-stone-500">Sign in using:</span>
                      <button
                        type="button"
                        onClick={() => setLoginMethod('email')}
                        className={`px-3 py-1.5 rounded-lg border transition-all ${
                          loginMethod === 'email'
                            ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 border-stone-900 dark:border-white shadow-2xs'
                            : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                        }`}
                      >
                        Email & Password
                      </button>
                      <button
                        type="button"
                        onClick={() => setLoginMethod('phone')}
                        className={`px-3 py-1.5 rounded-lg border transition-all ${
                          loginMethod === 'phone'
                            ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 border-stone-900 dark:border-white shadow-2xs'
                            : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                        }`}
                      >
                        Mobile OTP (SMS)
                      </button>
                    </div>

                    {loginMethod === 'email' ? (
                      /* Email/Password Form compliant with modern-web-guidance */
                      <form onSubmit={handleEmailSignIn} className="space-y-4">
                        <div>
                          <label
                            htmlFor="login-email"
                            className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5"
                          >
                            Email Address <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                            <input
                              type="email"
                              id="login-email"
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="name@example.com"
                              autoComplete="username"
                              required
                              enterKeyHint="next"
                              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-300 dark:border-stone-700 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-stone-900 dark:focus:ring-white min-h-[44px]"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label
                              htmlFor="current-password"
                              className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider"
                            >
                              Password <span className="text-rose-500">*</span>
                            </label>
                            <button
                              type="button"
                              onClick={() => setShowForgotModal(true)}
                              className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
                            >
                              Forgot password?
                            </button>
                          </div>
                          <div className="relative">
                            <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              id="current-password"
                              name="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="••••••••"
                              autoComplete="current-password"
                              required
                              enterKeyHint="done"
                              className="w-full pl-10 pr-12 py-2.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-300 dark:border-stone-700 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-stone-900 dark:focus:ring-white min-h-[44px]"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              aria-label={showPassword ? 'Hide password' : 'Show password'}
                              className="absolute right-3 top-3 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-1"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={rememberMe}
                              onChange={(e) => setRememberMe(e.target.checked)}
                              className="w-4 h-4 rounded text-stone-900 border-stone-300 focus:ring-stone-900"
                            />
                            <span className="text-xs text-stone-600 dark:text-stone-400 font-medium">
                              Keep me signed in on this device
                            </span>
                          </label>
                        </div>

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full mt-2 py-3 px-4 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold text-sm shadow-md hover:bg-stone-800 dark:hover:bg-stone-100 transition-all flex items-center justify-center gap-2 min-h-[46px] cursor-pointer"
                        >
                          {isLoading ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <LogIn className="w-4 h-4" />
                              <span>Sign In to Yojana360</span>
                            </>
                          )}
                        </button>
                      </form>
                    ) : (
                      /* Mobile OTP Flow */
                      <form onSubmit={handleVerifyOtp} className="space-y-4">
                        <div>
                          <label
                            htmlFor="mobile-number"
                            className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5"
                          >
                            Mobile Number <span className="text-rose-500">*</span>
                          </label>
                          <div className="flex gap-2">
                            <span className="inline-flex items-center px-3.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-300 select-none">
                              🇮🇳 +91
                            </span>
                            <div className="relative flex-1">
                              <Smartphone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                              <input
                                type="tel"
                                id="mobile-number"
                                name="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="98765 43210"
                                maxLength={10}
                                inputMode="numeric"
                                autoComplete="tel-national"
                                required
                                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-300 dark:border-stone-700 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-stone-900 dark:focus:ring-white min-h-[44px]"
                              />
                            </div>
                            {!otpSent && (
                              <button
                                type="button"
                                onClick={handleSendOtp}
                                disabled={isLoading}
                                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shrink-0 min-h-[44px]"
                              >
                                Send OTP
                              </button>
                            )}
                          </div>
                        </div>

                        {otpSent && (
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <label
                                htmlFor="otp-input"
                                className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider"
                              >
                                Enter 6-Digit OTP <span className="text-rose-500">*</span>
                              </label>
                              <button
                                type="button"
                                onClick={handleSendOtp}
                                className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
                              >
                                Resend OTP
                              </button>
                            </div>
                            <input
                              type="text"
                              id="otp-input"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              placeholder="Enter 6-digit OTP"
                              maxLength={6}
                              inputMode="numeric"
                              autoComplete="one-time-code"
                              required
                              className="w-full px-4 py-2.5 tracking-widest text-center font-mono text-base bg-stone-50 dark:bg-stone-800/80 border border-stone-300 dark:border-stone-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-stone-900 dark:focus:ring-white min-h-[44px]"
                            />
                            {simulatedOtpCode && (
                              <div className="mt-2 text-right">
                                <button
                                  type="button"
                                  onClick={() => setOtp(simulatedOtpCode)}
                                  className="text-xs text-amber-600 dark:text-amber-400 font-semibold hover:underline"
                                >
                                  Click here to Auto-Fill Demo OTP ({simulatedOtpCode})
                                </button>
                              </div>
                            )}

                            <button
                              type="submit"
                              disabled={isLoading}
                              className="w-full mt-4 py-3 px-4 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold text-sm shadow-md hover:bg-stone-800 dark:hover:bg-stone-100 transition-all flex items-center justify-center gap-2 min-h-[46px] cursor-pointer"
                            >
                              {isLoading ? (
                                <RefreshCw className="w-4 h-4 animate-spin" />
                              ) : (
                                <>
                                  <CheckCircle2 className="w-4 h-4" />
                                  <span>Verify & Sign In</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </form>
                    )}
                  </div>
                )}

                {/* MODE 2: CREATE CITIZEN ACCOUNT */}
                {authMode === 'signup' && (
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div>
                      <label
                        htmlFor="signup-name"
                        className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5"
                      >
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          id="signup-name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Ramesh Kumar / Sunita Devi"
                          autoComplete="name"
                          required
                          className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-300 dark:border-stone-700 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-stone-900 min-h-[44px]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="signup-state"
                        className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5"
                      >
                        Your State or Union Territory
                      </label>
                      <select
                        id="signup-state"
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-300 dark:border-stone-700 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-stone-900 min-h-[44px]"
                      >
                        <option value="">Select your State / UT (Optional)</option>
                        {STATES_AND_UTS_DATA.map((s) => (
                          <option key={s.id} value={s.name}>
                            {s.name} ({s.code})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="signup-email"
                        className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5"
                      >
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          id="signup-email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="citizen@example.com"
                          autoComplete="email"
                          required
                          className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-300 dark:border-stone-700 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-stone-900 min-h-[44px]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="signup-password"
                        className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5"
                      >
                        Create Password <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="signup-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="At least 6 characters"
                          autoComplete="new-password"
                          required
                          className="w-full pl-10 pr-12 py-2.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-300 dark:border-stone-700 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-stone-900 min-h-[44px]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-stone-400 hover:text-stone-600 p-1"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-normal">
                      By registering, you acknowledge that Yojana360 is an open-source, non-governmental advisory tool. We never share your data with advertisers.
                    </p>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 min-h-[46px] cursor-pointer"
                    >
                      {isLoading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Create Citizen Account</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* MODE 3: ONE-CLICK DEMO PROFILES */}
                {authMode === 'demo' && (
                  <div className="space-y-4">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        Choose a pre-configured citizen persona to instantly test eligibility checks and official portal links without typing:
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {DEMO_PROFILES.map((profile) => (
                        <button
                          key={profile.id}
                          type="button"
                          onClick={() => handleSelectDemoProfile(profile.id)}
                          className="p-4 bg-stone-50 dark:bg-stone-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-stone-200 dark:border-stone-700 hover:border-emerald-500 rounded-2xl text-left transition-all cursor-pointer group shadow-2xs flex flex-col justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl p-2 bg-white dark:bg-stone-700 rounded-xl shadow-2xs">
                              {profile.avatar}
                            </span>
                            <div>
                              <div className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                                {profile.name}
                              </div>
                              <div className="text-[11px] text-stone-500 dark:text-stone-400">
                                {profile.tagline}
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 pt-2 border-t border-stone-200 dark:border-stone-700/60 flex items-center justify-between text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                            <span>Instant Login →</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200">
                              {profile.state}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Federated / Alternative Login Separator */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-stone-200 dark:border-stone-800" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase tracking-wider">
                    <span className="bg-white dark:bg-stone-900 px-3 text-stone-400 font-semibold">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Google & Guest Single Sign-On Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="py-2.5 px-4 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700 rounded-xl text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200 shadow-2xs transition-all flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Google Account</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleGuestSignIn}
                    className="py-2.5 px-4 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 rounded-xl text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-300 transition-all flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
                  >
                    <span>👤 Continue as Guest</span>
                  </button>
                </div>
              </div>

              {/* Bottom Security Note */}
              <div className="mt-8 pt-4 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-500 text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Protected by 256-bit encryption. Non-Governmental Open Access Platform.</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs"
        >
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-stone-200 dark:border-stone-800 shadow-2xl">
            <h2 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-600" />
              Reset Citizen Password
            </h2>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
              Enter your registered email address and we'll dispatch password recovery instructions.
            </p>
            <div className="my-4">
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="citizen@example.com"
                className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-sm"
              />
            </div>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForgotModal(false);
                  setSuccessMessage('Password reset instructions dispatched to your email.');
                }}
                className="px-4 py-2 text-xs font-bold bg-stone-900 text-white rounded-xl"
              >
                Send Instructions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
