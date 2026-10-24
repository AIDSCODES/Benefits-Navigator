/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { z } from 'zod';

export const LocalizedStringSchema = z.object({
  en: z.string().min(1),
  hi: z.string().min(1),
  mr: z.string().min(1),
});

export const SchemeCriterionSchema = z.object({
  id: z.string(),
  field: z.string(),
  operator: z.enum(['eq', 'neq', 'in', 'not_in', 'lt', 'lte', 'gt', 'gte', 'between']),
  value: z.any(),
  required: z.boolean(),
  verified: z.boolean(),
  explanation: LocalizedStringSchema,
});

export const SchemeDocumentSchema = z.object({
  id: z.string(),
  name: LocalizedStringSchema,
  description: LocalizedStringSchema.optional(),
  mandatory: z.boolean(),
  alternative: LocalizedStringSchema.optional(),
});

export const ApplicationStepSchema = z.object({
  step_number: z.number().int().positive(),
  title: LocalizedStringSchema,
  instruction: LocalizedStringSchema,
  location_type: z.enum(['online', 'csc_kendra', 'bank_branch', 'post_office', 'tehsil_office']).optional(),
});

export const SchemeSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: LocalizedStringSchema,
  short_summary: LocalizedStringSchema,
  description: LocalizedStringSchema,
  level: z.enum(['central', 'state']),
  state: z.string().nullable(),
  category: z.enum([
    'agriculture',
    'health',
    'banking',
    'livelihood',
    'housing',
    'education',
    'pension',
    'insurance',
    'women_child',
  ]),
  criteria: z.array(SchemeCriterionSchema),
  documents: z.array(SchemeDocumentSchema),
  steps: z.array(ApplicationStepSchema),
  official_url: z.string().url(),
  application_mode: z.enum(['online', 'offline', 'both']),
  source_citation: z.string().min(3),
  last_verified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  version: z.string(),
  is_verified_fact: z.boolean(),
  benefit_type: LocalizedStringSchema.optional(),
});

export const SchemeRegistrySchema = z.array(SchemeSchema);

export type SchemeValidated = z.infer<typeof SchemeSchema>;
