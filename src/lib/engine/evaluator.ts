/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Scheme,
  SchemeCriterion,
  UserProfile,
  SchemeEvaluationResult,
  EvaluatedCriterion,
  MatchStatus,
  SupportedLanguage,
  LocalizedString,
} from './types.ts';

// Scale rank mappings for coarse ordinal bands
const AGE_BAND_RANKS: Record<string, number> = {
  '0_17': 1,
  '18_35': 2,
  '36_50': 3,
  '51_59': 4,
  '60_plus': 5,
};

const INCOME_BAND_RANKS: Record<string, number> = {
  below_1lakh: 1,
  '1lakh_2_5lakh': 2,
  '2_5lakh_5lakh': 3,
  above_5lakh: 4,
};

const LAND_RANKS: Record<string, number> = {
  none: 0,
  marginal: 1,
  small: 2,
  medium: 3,
  large: 4,
};

function getRank(field: string, val: any): number | null {
  if (field === 'ageBand' && val in AGE_BAND_RANKS) return AGE_BAND_RANKS[val];
  if (field === 'incomeBand' && val in INCOME_BAND_RANKS) return INCOME_BAND_RANKS[val];
  if (field === 'landHolding' && val in LAND_RANKS) return LAND_RANKS[val];
  return null;
}

/**
 * Checks if a scheme's last_verified date is older than 90 days.
 */
export function isSchemeOutdated(lastVerified: string, referenceDateStr?: string): boolean {
  try {
    const verifiedDate = new Date(lastVerified);
    const referenceDate = referenceDateStr ? new Date(referenceDateStr) : new Date();
    const diffMs = referenceDate.getTime() - verifiedDate.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return diffDays > 90;
  } catch {
    return false;
  }
}

/**
 * Evaluates a single criterion against a user profile
 */
export function evaluateCriterion(
  criterion: SchemeCriterion,
  profile: UserProfile,
  lang: SupportedLanguage = 'en'
): EvaluatedCriterion {
  const userVal = (profile as Record<string, any>)[criterion.field];

  // 1. Check if user value is unknown or unprovided
  const isUnknown =
    userVal === undefined ||
    userVal === null ||
    userVal === 'unsure' ||
    userVal === 'prefer_not_to_say';

  if (isUnknown) {
    return {
      criterion,
      matched: false,
      isUnknown: true,
      userValue: userVal ?? null,
      reason: criterion.explanation[lang] || criterion.explanation.en,
    };
  }

  // 2. Evaluate operator
  let matched = false;
  const op = criterion.operator;
  const target = criterion.value;

  switch (op) {
    case 'eq':
      matched = userVal === target;
      break;

    case 'neq':
      matched = userVal !== target;
      break;

    case 'in':
      if (Array.isArray(target)) {
        matched = target.includes(userVal);
      } else {
        matched = userVal === target;
      }
      break;

    case 'not_in':
      if (Array.isArray(target)) {
        matched = !target.includes(userVal);
      } else {
        matched = userVal !== target;
      }
      break;

    case 'lte': {
      const uRank = getRank(criterion.field, userVal);
      const tRank = getRank(criterion.field, target);
      if (uRank !== null && tRank !== null) {
        matched = uRank <= tRank;
      } else if (typeof userVal === 'number' && typeof target === 'number') {
        matched = userVal <= target;
      }
      break;
    }

    case 'gte': {
      const uRank = getRank(criterion.field, userVal);
      const tRank = getRank(criterion.field, target);
      if (uRank !== null && tRank !== null) {
        matched = uRank >= tRank;
      } else if (typeof userVal === 'number' && typeof target === 'number') {
        matched = userVal >= target;
      }
      break;
    }

    case 'lt': {
      const uRank = getRank(criterion.field, userVal);
      const tRank = getRank(criterion.field, target);
      if (uRank !== null && tRank !== null) {
        matched = uRank < tRank;
      } else if (typeof userVal === 'number' && typeof target === 'number') {
        matched = userVal < target;
      }
      break;
    }

    case 'gt': {
      const uRank = getRank(criterion.field, userVal);
      const tRank = getRank(criterion.field, target);
      if (uRank !== null && tRank !== null) {
        matched = uRank > tRank;
      } else if (typeof userVal === 'number' && typeof target === 'number') {
        matched = userVal > target;
      }
      break;
    }

    case 'between': {
      if (Array.isArray(target) && target.length === 2) {
        const uRank = getRank(criterion.field, userVal);
        const minRank = getRank(criterion.field, target[0]);
        const maxRank = getRank(criterion.field, target[1]);
        if (uRank !== null && minRank !== null && maxRank !== null) {
          matched = uRank >= minRank && uRank <= maxRank;
        } else if (typeof userVal === 'number') {
          matched = userVal >= target[0] && userVal <= target[1];
        }
      }
      break;
    }

    default:
      matched = false;
  }

  return {
    criterion,
    matched,
    isUnknown: false,
    userValue: userVal,
    reason: criterion.explanation[lang] || criterion.explanation.en,
  };
}

/**
 * Evaluates a scheme against a user profile deterministically.
 * NEVER returns "eligible" - only LIKELY_MATCH, POSSIBLE_NEED_MORE_INFO, NOT_MATCHED.
 */
export function evaluateScheme(
  scheme: Scheme,
  profile: UserProfile,
  referenceDateStr?: string
): SchemeEvaluationResult {
  const matched: EvaluatedCriterion[] = [];
  const failed: EvaluatedCriterion[] = [];
  const unknown: EvaluatedCriterion[] = [];
  const missingInputsSet = new Set<string>();

  // If scheme has state specified and user state is provided but different
  if (scheme.level === 'state' && scheme.state) {
    if (profile.state && profile.state.toLowerCase() !== scheme.state.toLowerCase()) {
      const stateCriterion: SchemeCriterion = {
        id: 'state_restriction',
        field: 'state',
        operator: 'eq',
        value: scheme.state,
        required: true,
        verified: true,
        explanation: {
          en: `Applicable only to residents of ${scheme.state}`,
          hi: `केवल ${scheme.state} के निवासियों के लिए लागू`,
          mr: `फक्त ${scheme.state} च्या रहिवाशांसाठी लागू`,
        },
      };
      failed.push({
        criterion: stateCriterion,
        matched: false,
        isUnknown: false,
        userValue: profile.state,
        reason: stateCriterion.explanation.en,
      });
    } else if (!profile.state) {
      const stateCriterion: SchemeCriterion = {
        id: 'state_restriction',
        field: 'state',
        operator: 'eq',
        value: scheme.state,
        required: true,
        verified: true,
        explanation: {
          en: `State residence information needed (${scheme.state})`,
          hi: `राज्य निवास माहिती आवश्यक (${scheme.state})`,
          mr: `राज्य रहिवासी माहिती आवश्यक (${scheme.state})`,
        },
      };
      unknown.push({
        criterion: stateCriterion,
        matched: false,
        isUnknown: true,
        userValue: null,
        reason: stateCriterion.explanation.en,
      });
      missingInputsSet.add('state');
    }
  }

  // Evaluate each registered criterion
  for (const crit of scheme.criteria) {
    const res = evaluateCriterion(crit, profile, 'en');

    if (res.isUnknown) {
      unknown.push(res);
      if (crit.required) {
        missingInputsSet.add(crit.field);
      }
    } else if (res.matched) {
      matched.push(res);
    } else {
      failed.push(res);
    }
  }

  // Determine overall status
  // Rule 1: Any required criterion failed -> NOT_MATCHED
  const requiredFailed = failed.filter((f) => f.criterion.required);

  let status: MatchStatus = 'NOT_MATCHED';

  if (requiredFailed.length > 0) {
    status = 'NOT_MATCHED';
  } else {
    // If no required criteria failed:
    const requiredUnknown = unknown.filter((u) => u.criterion.required);

    if (requiredUnknown.length > 0) {
      // Missing required information -> POSSIBLE_NEED_MORE_INFO
      status = 'POSSIBLE_NEED_MORE_INFO';
    } else {
      // All required criteria matched!
      // Check if there are non-required failures
      if (failed.length === 0) {
        status = 'LIKELY_MATCH';
      } else {
        // Some non-required criteria didn't match, or optional nuances
        status = 'POSSIBLE_NEED_MORE_INFO';
      }
    }
  }

  const isOutdated = isSchemeOutdated(scheme.last_verified, referenceDateStr);

  const reasons = {
    en: [
      ...matched.map((m) => `Matched: ${m.criterion.explanation.en}`),
      ...failed.map((f) => `Not matched: ${f.criterion.explanation.en}`),
      ...unknown.map((u) => `Need info on ${u.criterion.field}: ${u.criterion.explanation.en}`),
    ],
    hi: [
      ...matched.map((m) => `मेल खाया: ${m.criterion.explanation.hi}`),
      ...failed.map((f) => `मेल नहीं खाया: ${f.criterion.explanation.hi}`),
      ...unknown.map((u) => `जानकारी आवश्यक (${u.criterion.field}): ${u.criterion.explanation.hi}`),
    ],
    mr: [
      ...matched.map((m) => `जुळले: ${m.criterion.explanation.mr}`),
      ...failed.map((f) => `जुळले नाही: ${f.criterion.explanation.mr}`),
      ...unknown.map((u) => `माहिती आवश्यक (${u.criterion.field}): ${u.criterion.explanation.mr}`),
    ],
  };

  return {
    schemeId: scheme.id,
    scheme,
    status,
    matched,
    failed,
    unknown,
    missing_inputs: Array.from(missingInputsSet),
    reasons,
    isOutdated,
  };
}

/**
 * Evaluates entire registry against profile and groups by status
 */
export function evaluateAllSchemes(
  schemes: Scheme[],
  profile: UserProfile,
  referenceDateStr?: string
): {
  likelyMatch: SchemeEvaluationResult[];
  needMoreInfo: SchemeEvaluationResult[];
  notMatched: SchemeEvaluationResult[];
  consolidatedDocuments: {
    name: LocalizedString;
    schemes: { id: string; name: string }[];
    mandatory: boolean;
    alternative?: LocalizedString;
  }[];
} {
  const likelyMatch: SchemeEvaluationResult[] = [];
  const needMoreInfo: SchemeEvaluationResult[] = [];
  const notMatched: SchemeEvaluationResult[] = [];

  for (const scheme of schemes) {
    const res = evaluateScheme(scheme, profile, referenceDateStr);
    if (res.status === 'LIKELY_MATCH') {
      likelyMatch.push(res);
    } else if (res.status === 'POSSIBLE_NEED_MORE_INFO') {
      needMoreInfo.push(res);
    } else {
      notMatched.push(res);
    }
  }

  // Consolidated documents across LIKELY_MATCH and POSSIBLE_NEED_MORE_INFO
  const relevantResults = [...likelyMatch, ...needMoreInfo];
  const docMap = new Map<
    string,
    {
      name: { en: string; hi: string; mr: string };
      schemes: { id: string; name: string }[];
      mandatory: boolean;
      alternative?: { en: string; hi: string; mr: string };
    }
  >();

  for (const res of relevantResults) {
    for (const doc of res.scheme.documents) {
      // Group by canonical doc id or english name
      const key = doc.id.toLowerCase().trim();
      const existing = docMap.get(key);
      if (existing) {
        if (!existing.schemes.some((s) => s.id === res.scheme.id)) {
          existing.schemes.push({
            id: res.scheme.id,
            name: res.scheme.name.en,
          });
        }
        if (doc.mandatory) {
          existing.mandatory = true;
        }
      } else {
        docMap.set(key, {
          name: doc.name,
          schemes: [{ id: res.scheme.id, name: res.scheme.name.en }],
          mandatory: doc.mandatory,
          alternative: doc.alternative,
        });
      }
    }
  }

  return {
    likelyMatch,
    needMoreInfo,
    notMatched,
    consolidatedDocuments: Array.from(docMap.values()),
  };
}
