# Scheme Registry Contribution Guide (Data Layer)

This directory contains the interoperable scheme definitions for **Benefits Navigator**.
Every scheme is validated against a strict Zod schema (`src/lib/engine/schema.ts`) and exposed as open public data at `/api/schemes` and `/api/schema`.

---

## 1. Principles for Adding Schemes

1. **100% Attributable Facts Only**
   - Every scheme must cite an official government Gazette, Ministry operational guidelines, or published Government Resolution (GR).
   - If an eligibility threshold is ambiguous or unverified, you **MUST** mark `"verified": false`. Never guess.

2. **No Invented Eligibility**
   - Rules must be deterministic and inspectable by citizens and auditors.
   - LLMs or AI agents are prohibited from modifying or determining criteria.

3. **Multi-lingual Support (Trilingual)**
   - All titles, summaries, explanations, documents, and steps must be provided in **English (`en`)**, **Hindi (`hi`)**, and **Marathi (`mr`)**.

---

## 2. Scheme JSON Structure

```json
{
  "id": "unique-kebab-case-id",
  "code": "OFFICIAL-ACRONYM",
  "name": {
    "en": "Official English Name",
    "hi": "आधिकारिक हिंदी नाम",
    "mr": "अधिकृत मराठी नाव"
  },
  "short_summary": {
    "en": "One-line plain-language summary for citizens",
    "hi": "एक पंक्ति का सरल विवरण",
    "mr": "एका ओळीत सोपा सारांश"
  },
  "description": {
    "en": "Full descriptive paragraph...",
    "hi": "विस्तृत विवरण...",
    "mr": "सविस्तर माहिती..."
  },
  "level": "central", // "central" | "state"
  "state": null,      // "Maharashtra" or null
  "category": "agriculture", // "agriculture" | "health" | "banking" | "livelihood" | "housing" | "education" | "pension" | "insurance" | "women_child"
  "official_url": "https://official-portal.gov.in",
  "application_mode": "both", // "online" | "offline" | "both"
  "source_citation": "Ministry / Department Name, Operational Guidelines 2026",
  "last_verified": "YYYY-MM-DD",
  "version": "2026.1",
  "is_verified_fact": true,
  "criteria": [
    {
      "id": "crit_1",
      "field": "occupation",
      "operator": "eq",
      "value": "farmer",
      "required": true,
      "verified": true,
      "explanation": {
        "en": "Must be engaged in farming",
        "hi": "कृषि कार्य से जुड़ा होना चाहिए",
        "mr": "शेती व्यवसायात असणे आवश्यक"
      }
    }
  ],
  "documents": [
    {
      "id": "doc_aadhaar",
      "name": {
        "en": "Aadhaar Card",
        "hi": "आधार कार्ड",
        "mr": "आधार कार्ड"
      },
      "mandatory": true
    }
  ],
  "steps": [
    {
      "step_number": 1,
      "title": { "en": "Step Title", "hi": "शीर्षक", "mr": "शीर्षक" },
      "instruction": { "en": "Details...", "hi": "विवरण...", "mr": "तपशील..." },
      "location_type": "csc_kendra" // "online" | "csc_kendra" | "bank_branch" | "post_office" | "tehsil_office"
    }
  ]
}
```

---

## 3. Supported Operators

| Operator | Meaning | Example |
| :--- | :--- | :--- |
| `eq` | User value equals target value | `occupation eq "farmer"` |
| `neq` | User value does not equal target value | `hasLPG neq "yes"` |
| `in` | User value is one of array elements | `socialCategory in ["sc", "st"]` |
| `not_in` | User value is excluded | `incomeBand not_in ["above_5lakh"]` |
| `lte` | User value $\le$ target band rank | `incomeBand lte "1lakh_2_5lakh"` |
| `gte` | User value $\ge$ target band rank | `ageBand gte "18_35"` |
| `between` | User value between two band ranks | `ageBand between ["18_35", "51_59"]` |

---

## 4. Submitting Changes

1. Add your scheme object to `src/data/schemes.ts`.
2. Run `npm test` to verify that the Zod schema validation passes and unit tests succeed.
3. Submit a pull request with an official URL reference in the PR description.
