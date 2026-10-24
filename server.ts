/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { SCHEMES } from './src/data/schemes.ts';
import { OFFICIAL_PORTALS } from './src/data/officialPortals.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Interoperable CORS headers for public open data
  app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

  // 1. GET /api/schemes - Interoperable Registry API
  app.get('/api/schemes', (req: Request, res: Response) => {
    const { category, level, state } = req.query;

    let results = SCHEMES;

    if (typeof category === 'string' && category) {
      results = results.filter((s) => s.category === category);
    }

    if (typeof level === 'string' && level) {
      results = results.filter((s) => s.level === level);
    }

    if (typeof state === 'string' && state) {
      results = results.filter((s) => s.state?.toLowerCase() === state.toLowerCase() || s.level === 'central');
    }

    res.json({
      meta: {
        total: results.length,
        version: '2026.1',
        disclaimer: 'Unofficial guidance data layer. Always verify on official portals.',
        standards: 'Interoperable Public Entitlement Schema v1.0',
      },
      data: results,
    });
  });

  // 1b. GET /api/portals - Authoritative Official Government Gateways API (11 Portals)
  app.get('/api/portals', (req: Request, res: Response) => {
    const { category } = req.query;
    let results = OFFICIAL_PORTALS;

    if (typeof category === 'string' && category) {
      results = results.filter((p) => p.category === category);
    }

    res.json({
      meta: {
        total: results.length,
        disclaimer: 'Authoritative Official Government Portals directory (.gov.in).',
      },
      data: results,
    });
  });

  // 2. GET /api/schemes/:id - Single scheme endpoint
  app.get('/api/schemes/:id', (req: Request, res: Response) => {
    const scheme = SCHEMES.find((s) => s.id === req.params.id || s.code.toLowerCase() === req.params.id.toLowerCase());

    if (!scheme) {
      res.status(404).json({
        error: 'Scheme not found',
        message: `No public entitlement scheme found with ID: ${req.params.id}`,
      });
      return;
    }

    res.json({
      meta: {
        disclaimer: 'Unofficial guidance data. Always verify on official portal.',
        official_url: scheme.official_url,
        last_verified: scheme.last_verified,
      },
      data: scheme,
    });
  });

  // 3. GET /api/schema - Public JSON Schema specification
  app.get('/api/schema', (_req: Request, res: Response) => {
    res.json({
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      title: 'InteroperablePublicScheme',
      description: 'Specification schema for public welfare schemes and deterministic entitlement rules',
      type: 'object',
      required: [
        'id',
        'code',
        'name',
        'short_summary',
        'description',
        'level',
        'category',
        'criteria',
        'documents',
        'steps',
        'official_url',
        'source_citation',
        'last_verified',
      ],
      properties: {
        id: { type: 'string', pattern: '^[a-z0-9-]+$' },
        code: { type: 'string' },
        name: {
          type: 'object',
          properties: {
            en: { type: 'string' },
            hi: { type: 'string' },
            mr: { type: 'string' },
          },
          required: ['en', 'hi', 'mr'],
        },
        level: { type: 'string', enum: ['central', 'state'] },
        state: { type: ['string', 'null'] },
        category: {
          type: 'string',
          enum: [
            'agriculture',
            'health',
            'banking',
            'livelihood',
            'housing',
            'education',
            'pension',
            'insurance',
            'women_child',
          ],
        },
        criteria: {
          type: 'array',
          items: {
            type: 'object',
            required: ['id', 'field', 'operator', 'value', 'required', 'verified', 'explanation'],
            properties: {
              id: { type: 'string' },
              field: { type: 'string' },
              operator: { type: 'string', enum: ['eq', 'neq', 'in', 'not_in', 'lt', 'lte', 'gt', 'gte', 'between'] },
              value: {},
              required: { type: 'boolean' },
              verified: { type: 'boolean' },
              explanation: {
                type: 'object',
                properties: { en: { type: 'string' }, hi: { type: 'string' }, mr: { type: 'string' } },
              },
            },
          },
        },
        documents: {
          type: 'array',
          items: {
            type: 'object',
            required: ['id', 'name', 'mandatory'],
            properties: {
              id: { type: 'string' },
              name: { type: 'object' },
              mandatory: { type: 'boolean' },
            },
          },
        },
        official_url: { type: 'string', format: 'uri' },
        last_verified: { type: 'string', format: 'date' },
        source_citation: { type: 'string' },
      },
    });
  });

  // 4. Optional AI Explainer endpoint (Feature-flagged, NO PII, only scheme text simplification)
  app.post('/api/ai/simplify', async (req: Request, res: Response) => {
    // Check if AI explainer is enabled
    const aiEnabled = process.env.ENABLE_AI_EXPLAINER === 'true' || process.env.VITE_ENABLE_AI_EXPLAINER === 'true';
    if (!aiEnabled) {
      res.status(403).json({
        enabled: false,
        error: 'AI Explainer feature flag is disabled by default.',
      });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      res.status(503).json({
        error: 'Gemini API key not configured',
      });
      return;
    }

    const { schemeId, text, targetLang } = req.body;
    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Text is required for simplification' });
      return;
    }

    try {
      const ai = new GoogleGenAI();
      const langName = targetLang === 'hi' ? 'Hindi (हिंदी)' : targetLang === 'mr' ? 'Marathi (मराठी)' : 'simple English';

      const prompt = `You are a public benefit plain-language specialist for rural and unorganized workers in India.
Task: Rephrase and simplify the following public scheme benefit into 1-2 ultra-simple, reassuring, jargon-free sentences in ${langName}.
Constraint: DO NOT decide or evaluate eligibility. DO NOT ask for personal data. Strictly preserve factual accuracy.

Original text: "${text}"

Output only the simplified explanation text.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      res.json({
        simplifiedText: response.text?.trim() || text,
        disclaimer: 'AI-simplified, verify with the official source',
        schemeId,
      });
    } catch (err: any) {
      console.error('AI simplification error:', err?.message || err);
      res.status(500).json({
        error: 'Simplification service unavailable',
        fallback: text,
      });
    }
  });

  // 4b. AI Scheme & Official Website Analysis Endpoint
  app.post('/api/ai/analyze-scheme', async (req: Request, res: Response) => {
    const { schemeCode, schemeId, lang = 'en' } = req.body;
    const scheme = SCHEMES.find(
      (s) => s.code.toLowerCase() === (schemeCode || '').toLowerCase() || s.id === schemeId
    );
    const portal = OFFICIAL_PORTALS.find((p) => p.id === schemeId);

    if (!scheme && !portal) {
      res.status(404).json({ error: 'Scheme or portal not found' });
      return;
    }

    const title = scheme ? (scheme.name[lang as 'en'] || scheme.name.en) : (portal?.name[lang as 'en'] || portal?.name.en || '');
    const officialUrl = scheme ? scheme.official_url : (portal?.official_url || '');

    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      try {
        const ai = new GoogleGenAI();
        const langName = lang === 'hi' ? 'Hindi (हिंदी)' : lang === 'mr' ? 'Marathi (मराठी)' : 'English';
        const prompt = `You are a Senior Welfare & Public Administration Specialist for Benefits Navigator in India.
Provide a concise, highly practical AI analysis for the scheme/portal "${title}" (${officialUrl}).
Respond in ${langName}.
Analyze:
1. Executive summary of financial benefits & timeline.
2. Official website walkthrough: exact steps to apply safely on ${officialUrl}.
3. Top eligibility traps and why applications get rejected.
4. Mandatory documents scrutiny.
Keep the advice empowering, accurate, jargon-free, and remind citizens never to pay intermediaries.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        res.json({
          analysis: response.text?.trim(),
          source: 'gemini-2.5-flash',
          official_url: officialUrl,
          schemeCode: scheme?.code || portal?.id,
        });
        return;
      } catch (err: any) {
        console.warn('Gemini analyze-scheme error, using local welfare rule analysis:', err?.message || err);
      }
    }

    // Deterministic rule-based analysis
    res.json({
      analysis: scheme
        ? `Scheme Analysis for ${scheme.name.en}: Verified government program under ${scheme.source_citation}. Apply directly on ${scheme.official_url}. Benefit: ${scheme.benefit_type?.en || 'Direct Welfare Support'}. Mandatory documents: ${scheme.documents.filter(d => d.mandatory).map(d => d.name.en).join(', ')}.`
        : `Portal Analysis for ${portal?.name.en}: Official apex platform (${portal?.official_url}) maintained by ${portal?.department.en}. Key prerequisites: ${portal?.requiredDocuments.map(d => d.en).join(', ')}.`,
      source: 'welfare-rule-engine',
      official_url: officialUrl,
      schemeCode: scheme?.code || portal?.id,
    });
  });

  // 5. Interactive AI Assistant / Chatbot endpoint
  app.post('/api/ai/chat', async (req: Request, res: Response) => {
    const { message, character = 'asha', lang = 'en' } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // 1. Try Gemini Generative AI if key is present
    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      try {
        const ai = new GoogleGenAI();
        const characterName = character === 'mitra' ? 'Mitra (AI Smart Assistant)' : 'Asha (AI Welfare Guide)';
        const langInstruction = lang === 'hi' ? 'Respond in Hindi (हिंदी)' : lang === 'mr' ? 'Respond in Marathi (मराठी)' : `Respond in the user's language (${lang})`;

        const prompt = `You are ${characterName} for the Benefits Navigator open-source public welfare platform in India.
${langInstruction}.
Answer the citizen's question clearly, warmly, and helpfully.
Your scope:
- Indian public welfare schemes (PM-Kisan, Ayushman Bharat, PMAY, Pensions, Sukanya Samriddhi, DBT, e-Shram, Ladli Behna, etc.).
- Explaining required documents and eligibility requirements.
- Guiding the user on how to use Benefits Navigator step-by-step.
- Always cite verified .gov.in websites where citizens can safely apply.
- Note that Benefits Navigator is a free, non-governmental decision support tool that never asks for passwords, Aadhaar, or fees.

Citizen's Question: "${message}"`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        const reply = response.text?.trim();
        if (reply) {
          res.json({
            reply,
            source: 'gemini-ai',
            character,
          });
          return;
        }
      } catch (geminiErr: any) {
        console.warn('Gemini chat error, falling back to local welfare knowledge engine:', geminiErr?.message || geminiErr);
      }
    }

    // 2. Fallback: Local Welfare Knowledge Engine
    const lower = message.toLowerCase();
    const isFarmer = lower.includes('kisan') || lower.includes('farmer') || lower.includes('fasal') || lower.includes('bima') || lower.includes('mahadbt') || lower.includes('कृषि') || lower.includes('किसान') || lower.includes('खेती');
    const isWomenSHG = lower.includes('umed') || lower.includes('msrlm') || lower.includes('lakhpati') || lower.includes('shg') || lower.includes('bachat') || lower.includes('बचत') || lower.includes('लखपति') || lower.includes('उमेद') || lower.includes('महिला') || lower.includes('women');
    const isTender = lower.includes('tender') || lower.includes('gem') || lower.includes('procure') || lower.includes('mahatender') || lower.includes('cppp') || lower.includes('bid') || lower.includes('auction') || lower.includes('निविदा') || lower.includes('टेंडर') || lower.includes('बोली');
    const isEnterprise = lower.includes('startup') || lower.includes('udyam') || lower.includes('msme') || lower.includes('mudra') || lower.includes('standup') || lower.includes('stand-up') || lower.includes('loan') || lower.includes('sidbi') || lower.includes('maitri') || lower.includes('nsws') || lower.includes('business') || lower.includes('उद्योग') || lower.includes('लोन') || lower.includes('ऋण');
    const isHealth = lower.includes('health') || lower.includes('swasthya') || lower.includes('ayushman') || lower.includes('अस्पताल') || lower.includes('स्वास्थ्य') || lower.includes('इलाज');
    const isDocQuery = lower.includes('document') || lower.includes('paper') || lower.includes('proof') || lower.includes('certificate') || lower.includes('aadhaar') || lower.includes('दस्तावेज') || lower.includes('कागजात') || lower.includes('कागज');
    const isWebsiteQuery = lower.includes('how to use') || lower.includes('how do i use') || lower.includes('website') || lower.includes('step') || lower.includes('help') || lower.includes('वेबसाइट') || lower.includes('उपयोग') || lower.includes('इस्तेमाल');
    const isPortalSearch = lower.includes('portal') || lower.includes('link') || lower.includes('gateway') || lower.includes('single window') || lower.includes('directory') || lower.includes('पोर्टल') || isTender || isWomenSHG;

    // Matched official portals
    const matchedPortals = OFFICIAL_PORTALS.filter((p) => {
      const nameEn = p.name.en.toLowerCase();
      const descEn = p.description.en.toLowerCase();
      const deptEn = p.department.en.toLowerCase();
      const code = p.id.toLowerCase();
      if (isWomenSHG && (code.includes('umed') || code.includes('lakhpati') || descEn.includes('shg') || descEn.includes('women'))) return true;
      if (isTender && (p.category === 'procurement_tenders' || code.includes('tender') || code.includes('gem') || code.includes('cppp') || code.includes('mahatender'))) return true;
      if (isFarmer && (p.category === 'agriculture' || code.includes('kisan') || code.includes('pmfby') || code.includes('mahadbt'))) return true;
      if (isEnterprise && (p.category === 'enterprise' || p.category === 'state_gateway' || code.includes('startup') || code.includes('udyam') || code.includes('mudra') || code.includes('sidbi') || code.includes('standup') || code.includes('maitri') || code.includes('nsws'))) return true;
      return lower.split(/\s+/).some((term) =>
        term.length > 2 && (nameEn.includes(term) || descEn.includes(term) || deptEn.includes(term) || code.includes(term))
      );
    }).slice(0, 4);

    const matchedSchemes = SCHEMES.filter((s) => {
      if (isWomenSHG && (s.code.includes('LAKHPATI') || s.code.includes('UMED') || s.code.includes('LADLI') || s.category === 'women_child')) return true;
      if (isTender && (s.code.includes('PROCUREMENT') || s.code.includes('GEM') || s.code.includes('UDYAM'))) return true;
      if (isFarmer && (s.category === 'agriculture' || s.code.includes('KISAN') || s.code.includes('PMFBY') || s.code.includes('MAHADBT'))) return true;
      if (isEnterprise && (s.category === 'livelihood' || s.category === 'banking' || s.code.includes('MUDRA') || s.code.includes('STARTUP') || s.code.includes('UDYAM') || s.code.includes('STANDUP'))) return true;
      if (isHealth && (s.category === 'health' || s.code.includes('PM-JAY'))) return true;
      const nameEn = s.name.en.toLowerCase();
      const nameHi = (s.name.hi || '').toLowerCase();
      const cat = s.category.toLowerCase();
      const descEn = s.description.en.toLowerCase();
      const descHi = (s.description.hi || '').toLowerCase();
      const code = s.code.toLowerCase();
      return lower.split(/\s+/).some((term) =>
        term.length > 2 && (nameEn.includes(term) || nameHi.includes(term) || cat.includes(term) || descEn.includes(term) || descHi.includes(term) || code.includes(term))
      );
    }).slice(0, 3);

    let reply = '';
    if (isWebsiteQuery) {
      reply = `To use Benefits Navigator in 5 easy steps:\n\n1. **Language & Modes**: Choose your language (11 Indian languages) or enable Picture Mode at the top.\n2. **Answer Quick Questions**: Tap 'Start Navigator' and select basic details like State, Age, and Occupation. No Aadhaar or phone number is ever asked!\n3. **Explore Matches**: View your matched schemes categorized into Likely Match 🟢 and More Info Needed 🟡.\n4. **Official Portals Directory**: Browse 17 apex government portals (UMED MSRLM, Lakhpati Didi, MahaTenders, CPPP, GeM, PM-KISAN, MahaDBT, PMFBY, MUDRA, Udyam, NSWS, Startup India, etc.) with verified .gov.in links.\n5. **Documents Tab**: Check your deduplicated one-trip paperwork checklist so you only visit the service center once.\n6. **Export & Apply**: Download as PDF, share via offline QR code, or tap the official .gov.in links to apply safely.`;
    } else if (matchedPortals.length > 0 && (isPortalSearch || isTender || isWomenSHG)) {
      reply = `Here are official government portals and single-window gateways for your request:\n\n` +
        matchedPortals.map((p, idx) => {
          const services = p.keyServices.map(k => k.en).join('; ');
          return `${idx + 1}. **${p.name.en}** (${p.badge})\n- **Ministry / Dept**: ${p.department.en}\n- **Overview**: ${p.description.en}\n- **Key Services**: ${services}\n- **Direct Official Portal**: [${p.official_url}](${p.official_url})`;
        }).join('\n\n') +
        (isTender ? `\n\n💡 *MSE Benefit Tip: Micro & Small Enterprises with Udyam Registration get 100% free tender documents and Earnest Money Deposit (EMD) exemptions on GeM and CPPP!*` : '') +
        `\n\n🛡️ *Note: Benefits Navigator provides advisory support only. Tap the links above to access the authoritative .gov.in websites safely.*`;
    } else if (matchedSchemes.length > 0) {
      reply = `Here are verified government schemes matching your inquiry:\n\n` +
        matchedSchemes.map((s, idx) => {
          const docs = s.documents.map(d => d.name.en).join(', ');
          const benefit = s.benefit_type?.en || 'Direct Welfare / Subsidy Support';
          return `${idx + 1}. **${s.name.en}** (${s.code})\n- **Benefit**: ${benefit}\n- **Summary**: ${s.short_summary.en}\n- **Required Documents**: ${docs || 'Aadhaar, Bank Passbook'}\n- **Official Portal**: [${s.official_url}](${s.official_url})`;
        }).join('\n\n') +
        (matchedPortals.length > 0 ? `\n\n🌐 **Related Government Portals**:\n` + matchedPortals.map(p => `• [${p.name.en}](${p.official_url}) — ${p.department.en}`).join('\n') : '') +
        `\n\n💡 *Tip: Answer the quick questions on the homepage to calculate your personalized eligibility!*`;
    } else if (isDocQuery) {
      reply = `Common documents needed for most Indian public welfare schemes:\n\n1. **Aadhaar Card** (Linked to your active Bank Account for DBT transfers)\n2. **Bank Passbook / Account Statement** with IFSC code\n3. **Income Certificate / Ration Card** (BPL / Antyodaya if applicable)\n4. **Land Ownership Records** (Khatauni / RoR / 7/12 extract for farmer schemes like PM-Kisan & MahaDBT)\n5. **Age & Address Proof** (Voter ID, School certificate, or Domicile)\n\nOur 'Documents' tab automatically combines all needed papers into a single trip checklist!`;
    } else {
      reply = `Namaste! I am your AI Welfare Assistant. You can ask me:\n\n- "What schemes and portals are available for farmers? (PM-KISAN, PMFBY, MahaDBT)"\n- "How do I get MUDRA loan, Udyam MSME certificate, or Startup India seed fund?"\n- "What is National Single Window System (NSWS) and Maharashtra MAITRI?"\n- "How do I use this website step-by-step?"\n\nWhat would you like to explore today?`;
    }

    res.json({
      reply,
      source: 'local-knowledge-engine',
      character,
      schemes: matchedSchemes.map((s) => ({ id: s.id, name: s.name.en, url: s.official_url })),
      portals: matchedPortals.map((p) => ({ id: p.id, name: p.name.en, url: p.official_url })),
    });
  });

  /**
   * POST /api/notifications/whatsapp
   * Automated WhatsApp message dispatch endpoint with API Key integration and direct fallback
   */
  app.post('/api/notifications/whatsapp', async (req, res) => {
    const { phone, message, schemeName } = req.body;
    const apiKey = req.body.apiKey || process.env.WHATSAPP_API_KEY || 'LlanIPOMu47tkS0I4sEqmbNTRnT98gn64imkUFyZ416e2450';

    if (!message) {
      res.status(400).json({ error: 'Message content is required.' });
      return;
    }

    const cleanPhone = phone ? String(phone).replace(/\D/g, '') : '';
    const formattedPhone = cleanPhone.startsWith('91') || cleanPhone.length > 10 ? cleanPhone : (cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone);
    const directWebUrl = formattedPhone 
      ? `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;

    let sentSuccess = false;
    let providerUsed = 'whatsapp-direct-link';
    let providerError: string | null = null;

    if (formattedPhone && apiKey) {
      // 1. Try Whapi.cloud gateway
      try {
        const whapiRes = await fetch('https://gate.whapi.cloud/messages/text', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: formattedPhone,
            body: message,
          }),
        });

        if (whapiRes.ok) {
          sentSuccess = true;
          providerUsed = 'whapi.cloud';
        } else {
          const errData: any = await whapiRes.json().catch(() => ({}));
          providerError = errData?.error || `HTTP ${whapiRes.status}`;
        }
      } catch (e: any) {
        providerError = e.message;
      }
    }

    res.json({
      success: sentSuccess,
      provider: providerUsed,
      phone: formattedPhone || null,
      schemeName: schemeName || null,
      error: providerError,
      directWebUrl,
      message: sentSuccess 
        ? `WhatsApp message delivered successfully via API to +${formattedPhone}!` 
        : `WhatsApp alert ready for +${formattedPhone || 'citizen'} via direct intent.`,
    });
  });


  // Mount Vite middlewares in development or serve static in production
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Benefits Navigator server running at http://localhost:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
