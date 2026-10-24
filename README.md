# Benefits Navigator
**Track 1-05: Interoperable Benefits and Entitlement Navigation for Financial Inclusion**

Benefits Navigator is an accessible, privacy-first decision-support web application that helps citizens discover public welfare schemes, understand required documents, and follow official application steps across fragmented information sources.

It operates as the anonymous decision layer of the **PalmPay** financial inclusion ecosystem.

---

## Non-Negotiable Core Principles

1. **No Invented Eligibility**: Eligibility is computed **ONLY** by a pure, deterministic rules engine reading a curated scheme registry. Never by an LLM.
2. **Never Say "You Are Eligible"**: Uses three deterministic states:
   - `LIKELY_MATCH`: All criteria matched.
   - `POSSIBLE_NEED_MORE_INFO`: Missing inputs or unverified factors.
   - `NOT_MATCHED`: One or more mandatory requirements failed.
3. **No Impersonation**: Persistent un-dismissible banner on every page:
   > *"Unofficial guidance tool. Not a government service. Always verify on the official portal."*
   Zero government emblems, seals, or lookalike styling. Never submits applications or requests OTPs.
4. **Data Minimization ("What We Store: Nothing")**: No names, phones, Aadhaar, PAN, emails, exact income, exact addresses, or biometrics. Coarse brackets only.
5. **Source Transparency**: Every scheme links to its official `.gov.in` portal, legal source citation, and a `last_verified` date. If $> 90$ days old, an automated warning is displayed.

---

## Architecture & Features

```
               [ User (Mobile / Desktop) ]
                           │
       ┌───────────────────┼───────────────────┐
       ▼                   ▼                   ▼
 [ English ]          [ हिंदी ]           [ मराठी ]
       │                   │                   │
       └───────────────────┼───────────────────┘
                           │
              [ Guided Question Flow ]
           (Web Speech STT & TTS, Picture Mode)
                           │
                           ▼
          [ Pure TypeScript Rules Engine ]
       (/lib/engine/evaluator.ts - Deterministic)
                           │
       ┌───────────────────┴───────────────────┐
       ▼                                       ▼
[ Curated Scheme Registry ]             [ Interoperable API ]
  - 12 Verified Schemes                   - GET /api/schemes
  - Zod Schema Validation                 - GET /api/schemes/:id
  - Full Citations                        - GET /api/schema
                           │
                           ▼
              [ Results Decision Page ]
   - Grouped into Likely, Possible, Not Matched
   - Consolidated Deduplicated Document Checklist
   - Numbered Application Steps & Exit Warnings
   - Print / Save as PDF Checklist
   - Peer-to-Peer QR Code (URL hash only, no server)
```

---

## Supported Public Schemes (Seed Registry)

1. **PM-KISAN**: Pradhan Mantri Kisan Samman Nidhi (₹6,000/yr direct income support)
2. **Ayushman Bharat PM-JAY**: ₹5,00,000 cashless hospital insurance cover
3. **PMJDY**: Pradhan Mantri Jan Dhan Yojana (Zero-balance basic banking & RuPay card)
4. **PM Ujjwala Yojana 2.0**: Deposit-free LPG connection & first refill for women
5. **PMAY-G**: Pradhan Mantri Awas Yojana - Gramin (Housing assistance for kutcha houses)
6. **National Scholarship Scheme (NSP)**: Post-matric scholarship for SC/ST/OBC students
7. **Atal Pension Yojana (APY)**: Guaranteed monthly pension of ₹1,000 - ₹5,000 for unorganized workers
8. **PMSBY**: Pradhan Mantri Suraksha Bima Yojana (Accidental cover of ₹2 Lakh for ₹20/yr)
9. **PMJJBY**: Pradhan Mantri Jeevan Jyoti Bima Yojana (Life insurance cover of ₹2 Lakh for ₹436/yr)
10. **PM SVANidhi**: Working capital micro-loans of ₹10,000 - ₹50,000 for street vendors
11. **Sukanya Samriddhi Yojana**: 8.2% tax-free savings account for girl children under 10
12. **Sanjay Gandhi Niradhar Anudan Yojana**: ₹1,500/mo destitute & disability pension (Maharashtra)

---

## PalmPay Financial Inclusion Integration

- **Benefits Navigator (Anonymous Front-Door)**: Operates without any biometric hardware or user identification.
- **PalmPay Payouts (Last-Mile Disbursement)**: Future vision where government DBT payments can be safely withdrawn at rural Kirana merchant terminals using contactless infrared palm-vein biometrics—eliminating lost plastic debit cards, forgotten PINs, or stolen smartphones.

---

## Interoperable API (Track 1-05)

- `GET /api/schemes`: Returns list of all schemes (filterable by `?category=...&level=...&state=...`).
- `GET /api/schemes/:id`: Returns single scheme criteria, documents, and application steps.
- `GET /api/schema`: Returns machine-readable JSON Schema (Draft 2020-12).

---

## Testing & Quality Assurance

```bash
# Run 40 automated tests (engine, e2e persona flows, and a11y compliance)
npm test

# Run TypeScript compilation check
npm run lint

# Start full-stack dev server (port 3000)
npm run dev
```

---

## Accessibility (WCAG 2.2 AA)

- Semantic HTML5 structure with visible focus rings (`focus-visible`).
- Interactive touch targets $\ge 44\text{px}$.
- Text resizable to 200% with high-contrast and large-text toggles.
- Voice input via Web Speech API and question read-aloud via SpeechSynthesis.
- Low-literacy "Picture Mode" with prominent icons and minimal text.
