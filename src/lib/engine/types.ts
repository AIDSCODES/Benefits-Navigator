/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SupportedLanguage =
  | 'en'
  | 'hi'
  | 'mr'
  | 'bn'
  | 'te'
  | 'ta'
  | 'gu'
  | 'kn'
  | 'ml'
  | 'pa'
  | 'or';

export type SchemeLevel = 'central' | 'state';

export type SchemeCategory =
  | 'agriculture'
  | 'health'
  | 'banking'
  | 'livelihood'
  | 'housing'
  | 'education'
  | 'pension'
  | 'insurance'
  | 'women_child';

export type CriterionOperator =
  | 'eq'
  | 'neq'
  | 'in'
  | 'not_in'
  | 'lt'
  | 'lte'
  | 'gt'
  | 'gte'
  | 'between';

export interface LocalizedString {
  en: string;
  hi: string;
  mr: string;
  bn?: string;
  te?: string;
  ta?: string;
  gu?: string;
  kn?: string;
  ml?: string;
  pa?: string;
  or?: string;
  [key: string]: string | undefined;
}

export interface SchemeCriterion {
  id: string;
  field: string;
  operator: CriterionOperator;
  value: any;
  required: boolean;
  verified: boolean;
  explanation: LocalizedString;
}

export interface SchemeDocument {
  id: string;
  name: LocalizedString;
  description?: LocalizedString;
  mandatory: boolean;
  alternative?: LocalizedString;
}

export interface ApplicationStep {
  step_number: number;
  title: LocalizedString;
  instruction: LocalizedString;
  location_type?: 'online' | 'csc_kendra' | 'bank_branch' | 'post_office' | 'tehsil_office';
}

export interface Scheme {
  id: string;
  code: string;
  name: LocalizedString;
  short_summary: LocalizedString;
  description: LocalizedString;
  level: SchemeLevel;
  state: string | null; // e.g., 'Maharashtra' or null for central
  category: SchemeCategory;
  criteria: SchemeCriterion[];
  documents: SchemeDocument[];
  steps: ApplicationStep[];
  official_url: string;
  application_mode: 'online' | 'offline' | 'both';
  source_citation: string;
  last_verified: string; // ISO date format YYYY-MM-DD
  version: string;
  is_verified_fact: boolean;
  benefit_type?: LocalizedString;
}

export interface UserProfile {
  state?: string;
  ageBand?: '0_17' | '18_35' | '36_50' | '51_59' | '60_plus';
  gender?: 'male' | 'female' | 'transgender' | 'prefer_not_to_say';
  incomeBand?: 'below_1lakh' | '1lakh_2_5lakh' | '2_5lakh_5lakh' | 'above_5lakh';
  occupation?:
    | 'farmer'
    | 'daily_wage'
    | 'street_vendor'
    | 'student'
    | 'homemaker'
    | 'salaried'
    | 'unemployed';
  socialCategory?: 'general' | 'obc' | 'sc' | 'st' | 'minority' | 'prefer_not_to_say';
  disability?: 'yes' | 'no' | 'prefer_not_to_say';
  familySizeBand?: '1_2' | '3_4' | '5_plus';
  landHolding?: 'marginal' | 'small' | 'medium' | 'large' | 'none';
  rationCardStatus?: 'antyodaya_bpl' | 'priority' | 'none' | 'unsure';
  hasBankAcc?: 'yes' | 'no' | 'unsure';
  hasLPG?: 'yes' | 'no' | 'unsure';
  housingType?: 'kutcha_temporary' | 'pucca_permanent' | 'homeless';
  hasGirlChild?: 'yes' | 'no';
}

export type MatchStatus = 'LIKELY_MATCH' | 'POSSIBLE_NEED_MORE_INFO' | 'NOT_MATCHED';

export interface EvaluatedCriterion {
  criterion: SchemeCriterion;
  matched: boolean;
  isUnknown: boolean;
  userValue: any;
  reason: string;
}

export interface SchemeEvaluationResult {
  schemeId: string;
  scheme: Scheme;
  status: MatchStatus;
  matched: EvaluatedCriterion[];
  failed: EvaluatedCriterion[];
  unknown: EvaluatedCriterion[];
  missing_inputs: string[];
  reasons: {
    en: string[];
    hi: string[];
    mr: string[];
  };
  isOutdated: boolean; // if last_verified older than 90 days
}
