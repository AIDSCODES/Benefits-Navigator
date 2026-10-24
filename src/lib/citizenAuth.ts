/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserProfile } from './engine/types.ts';

export interface CitizenUser {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  state?: string;
  occupation?: string;
  role?: 'citizen' | 'volunteer' | 'csc_operator';
  authProvider: 'email' | 'phone' | 'google' | 'demo' | 'guest';
  avatarUrl?: string;
  savedSchemes: string[];
  loginTimestamp: string;
  presetProfile?: Partial<UserProfile>;
}

export interface DemoCitizenProfile {
  id: string;
  name: string;
  tagline: string;
  state: string;
  occupation: string;
  avatar: string;
  preset: Partial<UserProfile>;
  topSchemes: string[];
}

export const DEMO_PROFILES: DemoCitizenProfile[] = [
  {
    id: 'ramesh-kisan',
    name: 'Ramesh Kisan',
    tagline: 'Smallholder Farmer · Nashik, Maharashtra',
    state: 'Maharashtra',
    occupation: 'farmer',
    avatar: '🌾',
    preset: {
      state: 'Maharashtra',
      occupation: 'farmer',
      ageBand: '36_50',
      gender: 'male',
      socialCategory: 'obc',
      incomeBand: 'below_1lakh',
      landHolding: 'small',
      rationCardStatus: 'priority',
      hasLPG: 'yes',
    },
    topSchemes: ['pm-kisan', 'pm-jay', 'mahadbt-farmer'],
  },
  {
    id: 'sunita-devi',
    name: 'Sunita Devi',
    tagline: 'Rural Artisan & Self-Help Group Leader · Varanasi, UP',
    state: 'Uttar Pradesh',
    occupation: 'daily_wage',
    avatar: '🧵',
    preset: {
      state: 'Uttar Pradesh',
      occupation: 'daily_wage',
      ageBand: '36_50',
      gender: 'female',
      socialCategory: 'sc',
      incomeBand: 'below_1lakh',
      rationCardStatus: 'priority',
      hasGirlChild: 'yes',
      hasLPG: 'no',
    },
    topSchemes: ['pm-ujjwala', 'ssy', 'up-kanya-sumangala'],
  },
  {
    id: 'ananya-rao',
    name: 'Ananya Rao',
    tagline: 'Graduate Engineering Student · Bengaluru, Karnataka',
    state: 'Karnataka',
    occupation: 'student',
    avatar: '🎓',
    preset: {
      state: 'Karnataka',
      occupation: 'student',
      ageBand: '18_35',
      gender: 'female',
      socialCategory: 'general',
      incomeBand: '1lakh_2_5lakh',
      rationCardStatus: 'priority',
    },
    topSchemes: ['ka-yuva-nidhi', 'ka-gruha-lakshmi', 'nsp-post-matric'],
  },
  {
    id: 'vikram-singh',
    name: 'Vikram Singh',
    tagline: 'App-Based Delivery Partner & Street Vendor · New Delhi',
    state: 'Delhi',
    occupation: 'street_vendor',
    avatar: '🛵',
    preset: {
      state: 'Delhi',
      occupation: 'street_vendor',
      ageBand: '18_35',
      gender: 'male',
      socialCategory: 'general',
      incomeBand: '1lakh_2_5lakh',
      rationCardStatus: 'none',
    },
    topSchemes: ['pm-svanidhi', 'pm-jay', 'apy'],
  },
];

const AUTH_STORAGE_KEY = 'yojana360_authenticated_citizen_user';
const REMEMBER_KEY = 'yojana360_auth_remember';

// In-memory fallback for SSR and test execution
let memoryStore: {
  session?: string;
  local?: string;
} = {};

/**
 * Retrieves the currently signed-in citizen, checking sessionStorage first then localStorage.
 */
export function getStoredCitizen(): CitizenUser | null {
  try {
    let sessionData: string | null = null;
    let localData: string | null = null;

    if (typeof window !== 'undefined') {
      sessionData = sessionStorage.getItem(AUTH_STORAGE_KEY);
      localData = localStorage.getItem(AUTH_STORAGE_KEY);
    } else {
      sessionData = memoryStore.session || null;
      localData = memoryStore.local || null;
    }

    if (sessionData) return JSON.parse(sessionData);
    if (localData) return JSON.parse(localData);
  } catch {
    // Ignore parse errors
  }
  return null;
}

/**
 * Saves authenticated citizen session to storage and broadcasts update event.
 */
export function saveCitizenSession(user: CitizenUser, remember = false): void {
  try {
    const serialized = JSON.stringify(user);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(AUTH_STORAGE_KEY, serialized);
      if (remember) {
        localStorage.setItem(AUTH_STORAGE_KEY, serialized);
        localStorage.setItem(REMEMBER_KEY, 'true');
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        localStorage.removeItem(REMEMBER_KEY);
      }
      window.dispatchEvent(new CustomEvent('yojana360_auth_change', { detail: user }));
    } else {
      memoryStore.session = serialized;
      if (remember) {
        memoryStore.local = serialized;
      } else {
        delete memoryStore.local;
      }
    }
  } catch {
    // Storage unavailable
  }
}

/**
 * Clears citizen session from all storages and broadcasts sign-out event.
 */
export function clearCitizenSession(): void {
  try {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(REMEMBER_KEY);
      window.dispatchEvent(new CustomEvent('yojana360_auth_change', { detail: null }));
    } else {
      memoryStore = {};
    }
  } catch {}
}

/**
 * Toggles a saved/bookmarked scheme for the active user.
 */
export function toggleBookmarkedScheme(schemeId: string): string[] {
  const current = getStoredCitizen();
  if (!current) return [];

  const exists = current.savedSchemes.includes(schemeId);
  const updatedSchemes = exists
    ? current.savedSchemes.filter((id) => id !== schemeId)
    : [...current.savedSchemes, schemeId];

  const updatedUser: CitizenUser = {
    ...current,
    savedSchemes: updatedSchemes,
  };

  const isRemembered =
    typeof localStorage !== 'undefined'
      ? localStorage.getItem(REMEMBER_KEY) === 'true'
      : Boolean(memoryStore.local);
  saveCitizenSession(updatedUser, isRemembered);
  return updatedSchemes;
}

/**
 * Signs in using demo citizen profile for immediate frictionless preview.
 */
export function signInWithDemoCitizen(demoId: string): CitizenUser {
  const profile = DEMO_PROFILES.find((p) => p.id === demoId) || DEMO_PROFILES[0];
  const user: CitizenUser = {
    id: `demo-${profile.id}`,
    name: profile.name,
    email: `${profile.id}@citizen.yojana360.org`,
    state: profile.state,
    occupation: profile.occupation,
    authProvider: 'demo',
    avatarUrl: profile.avatar,
    savedSchemes: profile.topSchemes,
    loginTimestamp: new Date().toISOString(),
    presetProfile: profile.preset,
  };
  saveCitizenSession(user, false);
  return user;
}

/**
 * Signs in as Guest Citizen (Private anonymous session).
 */
export function signInAsGuest(): CitizenUser {
  const user: CitizenUser = {
    id: `guest-${Math.random().toString(36).substring(2, 9)}`,
    name: 'Guest Citizen',
    authProvider: 'guest',
    avatarUrl: '👤',
    savedSchemes: [],
    loginTimestamp: new Date().toISOString(),
  };
  saveCitizenSession(user, false);
  return user;
}
