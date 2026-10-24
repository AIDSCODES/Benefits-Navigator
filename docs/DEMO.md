# Benefits Navigator — 3-Minute Demo Script
**Track 1-05: Interoperable Benefits & Entitlement Navigation for Financial Inclusion**

---

## Demo Overview (3 Minutes Total)

| Timestamp | Phase | What to Show |
| :--- | :--- | :--- |
| **0:00 – 0:40** | **Interactive AI Tutor Video Tour** | First-time visitor compulsory orientation covering non-government advisory mandate, strict zero-storage privacy, accessibility modes, and PalmPay payouts. Subsequent visits show skip option. |
| **0:40 – 1:10** | **The Problem & Privacy Mandate** | Persistent disclaimer banner, zero-PII commitment, and language switcher. |
| **1:10 – 1:50** | **Persona 1: Small Farmer in Maharashtra** | Guided question flow with voice input & read-aloud. Matched results for PM-KISAN, PMSBY, PMJJBY. Consolidated document checklist. |
| **1:50 – 2:25** | **Persona 2: Female SC Student** | Editing answers. Instant re-evaluation to NSP Post-Matric Scholarship and Ayushman Bharat (PM-JAY). Low-literacy picture mode. |
| **2:25 – 2:45** | **Export, Google Drive/Gmail & PalmPay Payouts** | QR code hash reopening (no server storage), 1-page printable checklist, Google Drive & Gmail backup, and PalmPay inclusion roadmap. |
| **2:45 – 3:00** | **Interoperable Open API** | Live query to `/api/schemes` and `/api/schema`. |

---

## Persona 1: Tukaram (Small Farmer in Maharashtra)

- **Profile**:
  - **State**: Maharashtra
  - **Occupation**: Farmer / Agricultural Worker
  - **Age**: 42 (Band: `36_50`)
  - **Income**: Below ₹1,00,000 / year
  - **Landholding**: Small (1–2 Hectares)
  - **House Type**: Kutcha temporary roof

### Flow Steps:
1. Open the app on mobile or desktop view.
2. Select language: **मराठी (Marathi)** or **English**.
3. Point out the yellow top disclaimer: *"Unofficial guidance tool. Not a government service. Always verify on the official portal."*
4. Click **"Check Schemes"**.
5. Tap or use microphone voice answering to answer:
   - State: *Maharashtra*
   - Occupation: *Farmer*
   - Age: *36–50*
   - Income: *Below ₹1 Lakh*
   - Land: *Small (1–2 Hectares)*
   - Housing: *Kutcha temporary*
6. Click **"Show Potential Matches"**.
7. **Highlight the Output**:
   - **Status**: `LIKELY_MATCH` for **PM-KISAN** (₹6,000/yr DBT) and **PMSBY** (₹2 Lakh cover for ₹20/yr).
   - **Reason strings**: Transparent breakdown of why every single criterion matched.
   - **Consolidated Paperwork Checklist**: Shows *7/12 land extract, Aadhaar, and Bank Passbook* combined into one box so the farmer doesn't have to visit the Tehsil office three times.
8. Click **"Official Portal"** button: Demonstrate the **External Link Notice** modal clearly alerting the user before redirecting.

---

## Persona 2: Sunita (Female Student from SC Family)

- **Profile**:
  - **State**: Uttar Pradesh / Maharashtra
  - **Occupation**: Student (College)
  - **Gender**: Female
  - **Social Category**: SC (Scheduled Caste)
  - **Income**: ₹1,00,000 – ₹2,50,000
  - **Ration Card**: Antyodaya / BPL
  - **Girl Child / LPG**: Optional / Not applicable

### Flow Steps:
1. Click **"Edit Answers"** or **"Picture Mode"** (Low Literacy).
2. Show large intuitive icons for Student, Female, and BPL card.
3. Skip sensitive/optional questions using the **"Skip this question"** button to prove the app never forces disclosure.
4. **Highlight the Output**:
   - Instant re-evaluation without any network roundtrip!
   - `LIKELY_MATCH` for **National Post-Matric Scholarship Scheme (NSP)** and **Ayushman Bharat PM-JAY**.
   - Consolidated checklist updates to show: *Caste Certificate, Income Certificate by Tehsildar, and Marksheets*.

---

## Slide: "What We Do NOT Store"

```
+--------------------------------------------------------------------+
|                WHAT WE STORE: ABSOLUTELY NOTHING                   |
+--------------------------------------------------------------------+
|  ❌ No Name               ❌ No Phone Number       ❌ No OTPs      |
|  ❌ No Aadhaar Number     ❌ No PAN Card           ❌ No Email     |
|  ❌ No Exact Address      ❌ No Biometrics         ❌ No Cookies   |
|  ❌ No Server Database    ❌ No User Profiles      ❌ No Trackers  |
+--------------------------------------------------------------------+
|  ✅ Stored in Browser RAM & Session Only                           |
|  ✅ Disappears when tab is closed                                  |
|  ✅ "Clear My Answers" one-click wipe                              |
|  ✅ QR code stores data strictly in client-side URL hash           |
+--------------------------------------------------------------------+
```

---

## PalmPay Integration Talking Track

> "Benefits Navigator is the anonymous, zero-data front door to welfare discovery. Once a citizen knows what they qualify for and enrolls at their local government center, PalmPay acts as the last-mile biometric disbursement layer. In rural areas where debit cards are easily lost and feature phones don't support modern banking apps, beneficiaries can withdraw approved DBT benefits at local Kirana merchants using contactless palm-vein biometrics. Discovery remains completely anonymous; disbursement remains completely fraud-proof."
