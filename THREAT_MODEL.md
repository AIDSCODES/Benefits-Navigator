# Threat Model & Risk Mitigations (Benefits Navigator)
**Track 1-05: Interoperable Benefits & Entitlement Navigation**

---

## 1. Impersonation Risk (Government Mimicry / Phishing)

### The Threat
Citizens, especially from vulnerable or low-literacy backgrounds, frequently mistake third-party apps for official government portals. Bad actors frequently create lookalike websites that deceive users into paying bogus "processing fees" or submitting Aadhaar credentials and OTPs.

### Mitigations Built-in
1. **Persistent Visual Disclaimer**: An un-dismissible high-contrast banner on every page explicitly declares:
   > *"Unofficial guidance tool. Not a government service. Always verify on the official portal."*
2. **Zero Emblems or Lookalikes**: The interface uses modern sans typography (Plus Jakarta Sans & Noto Sans Devanagari) with neutral stone tones and clean emerald/amber cues. No national seals, state emblems, or government logos are used.
3. **External Exit Interstitial**: When a citizen clicks an official portal link, the application intercepts the navigation with a prominent modal warning: *"You are now leaving Benefits Navigator to visit an external government website. This tool does not accept applications or OTPs."*
4. **No Form Submissions**: The tool strictly guides and prepares checklists; it does not feature any "Submit Application" button.

---

## 2. Data Leakage & Surveillance Risk

### The Threat
Commercial brokers and predatory lenders build fake welfare calculators to harvest mobile numbers, Aadhaar numbers, and family records for profiling or targeted spam.

### Mitigations Built-in
1. **Coarse Input Bands Only**:
   - Age is collected as broad intervals (`18_35`, `36_50`), not exact birthdates.
   - Income is collected in wide brackets (`below_1lakh`), not salary figures.
   - Landholding is categorized as `marginal`, `small`, or `none`, without survey or Gat numbers.
2. **Strict Identity Blacklist**: The codebase does not contain fields for Name, Phone, Aadhaar, PAN, Email, or Biometrics.
3. **Zero Server Persistence**: No database, no user accounts, and no backend logging of profile answers.
4. **Hash-Only Peer Sharing**: The QR code export encodes answers strictly in the client-side URL fragment (`#profile=...`). Fragments are never sent to the web server in HTTP GET requests.
5. **No Third-Party Trackers**: Zero telemetry, no Google Analytics, no Facebook pixels, and no external ad trackers.

---

## 3. Wrong-Eligibility & "Hallucinated Entitlement" Risk

### The Threat
When generative AI models are asked "Am I eligible for PM-KISAN?", they frequently hallucinate or invent criteria, leading citizens to travel hours to government offices only to be rejected.

### Mitigations Built-in
1. **Banned LLM Eligibility**: Eligibility is computed **ONLY** by a pure, deterministic TypeScript rules engine (`/lib/engine/evaluator.ts`).
2. **The "Never Say Eligible" Rule**: The engine never states *"You are eligible."* Results are strictly categorized into:
   - `LIKELY_MATCH`: All known criteria match documented requirements.
   - `POSSIBLE_NEED_MORE_INFO`: Critical fields are unknown or missing.
   - `NOT_MATCHED`: One or more mandatory criteria failed.
3. **Full Criteria Explainability**: Every matched, failed, and unknown rule is surfaced with a plain-language explanation in the user's selected language.
4. **Missing Info Never Silently Passes**: If an input is omitted, the scheme is downgraded to `POSSIBLE_NEED_MORE_INFO` and the missing field is highlighted.

---

## 4. Outdated Data & Regulatory Drift Risk

### The Threat
Government welfare schemes frequently adjust income ceilings, land caps, and premium rates (e.g., PMSBY premium changed from ₹12 to ₹20; APY excluded income taxpayers in October 2022). Outdated tools mislead applicants.

### Mitigations Built-in
1. **90-Day Freshness Monitor**: Every scheme in the registry records an ISO `last_verified` date. If a scheme has not been reviewed within 90 days of the current date, the system automatically surfaces a visible warning:
   > *"Data may be outdated (>90 days since last review). Always confirm on the official portal."*
2. **Official Source Citations**: Every scheme records its legal source citation (e.g., Gazette, Ministry Operational Guidelines, or Government Resolution number).
3. **Open Interoperable Registry**: A machine-readable API (`/api/schemes` and `/api/schema`) enables civic tech communities to audit, test, and contribute pull requests.

---

## 5. Security & Privacy Summary Matrix

| Risk Category | Severity | Technical Control | Verification Test |
| :--- | :--- | :--- | :--- |
| **Impersonation** | High | Persistent banner, exit modal, no government emblems | `src/tests/a11y.test.ts` |
| **PII Data Leakage** | Critical | Memory/SessionStorage only, coarse inputs, hash-based QR | `src/tests/a11y.test.ts` |
| **Hallucinated Eligibility** | Critical | Deterministic Zod-validated pure engine, no LLM logic | `src/tests/engine.test.ts` (34 tests) |
| **Outdated Rules** | Medium | Automated >90 day flag, source citations on all schemes | `src/tests/engine.test.ts` |
| **Exclusion of Low-Literacy** | High | Web Speech voice recognition, audio read-aloud, picture mode | Manual + UI testing |
