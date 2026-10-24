/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { SCHEMES } from './data/schemes.ts';
import { OFFICIAL_PORTALS } from './data/officialPortals.ts';
import { STATES_AND_UTS_DATA } from './data/statesData.ts';

dotenv.config();

export function createServerApp() {
  const app = express();

  app.use(express.json());

  // Interoperable CORS headers for public open data
  app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (_req.method === 'OPTIONS') {
      res.sendStatus(200);
      return;
    }
    next();
  });

  const api = Router();

  // 1. GET /schemes - Interoperable Registry API
  api.get('/schemes', (req: Request, res: Response) => {
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

  // 1b. GET /portals - Authoritative Official Government Gateways API (17 Portals)
  api.get('/portals', (req: Request, res: Response) => {
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

  // 1c. GET /states - All 28 States and 8 Union Territories Directory API
  api.get('/states', (req: Request, res: Response) => {
    const { type, search } = req.query;
    let results = STATES_AND_UTS_DATA;

    if (typeof type === 'string' && type) {
      results = results.filter((s) => s.type === type);
    }

    if (typeof search === 'string' && search) {
      const q = search.toLowerCase();
      results = results.filter((s) =>
        s.name.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q) ||
        s.capital.toLowerCase().includes(q)
      );
    }

    res.json({
      meta: {
        total: results.length,
        disclaimer: 'Authoritative State & Union Territory Portal Directory (.gov.in)',
        standards: 'Interoperable State Welfare Data v1.0',
      },
      data: results,
    });
  });

  // 1d. GET /states/:id - Single State/UT endpoint
  api.get('/states/:id', (req: Request, res: Response) => {
    const state = STATES_AND_UTS_DATA.find(
      (s) =>
        s.id.toLowerCase() === req.params.id.toLowerCase() ||
        s.code.toLowerCase() === req.params.id.toLowerCase() ||
        s.name.toLowerCase() === req.params.id.toLowerCase()
    );

    if (!state) {
      res.status(404).json({
        error: 'State or UT not found',
        message: `No State or Union Territory found for identifier: ${req.params.id}`,
      });
      return;
    }

    res.json({
      meta: {
        disclaimer: 'Official State/UT single-window portal and citizen services info',
        official_url: state.portal.url,
      },
      data: state,
    });
  });

  // 2. GET /schemes/:id - Single scheme endpoint
  api.get('/schemes/:id', (req: Request, res: Response) => {
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

  // 3. GET /schema - Public JSON Schema specification
  api.get('/schema', (_req: Request, res: Response) => {
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

  // 4. POST /ai/simplify - Optional AI Explainer endpoint
  api.post('/ai/simplify', async (req: Request, res: Response) => {
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

  // 4b. POST /ai/analyze-scheme - AI Scheme & Official Website Analysis
  api.post('/ai/analyze-scheme', async (req: Request, res: Response) => {
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
        const prompt = `You are a Senior Welfare & Public Administration Specialist for Yojana360 in India.
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

  // 5. POST /ai/chat - Interactive AI Assistant / Chatbot
  api.post('/ai/chat', async (req: Request, res: Response) => {
    const { message, character = 'dhanu', lang = 'en' } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // 1. Try Gemini Generative AI if key is present
    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      try {
        const ai = new GoogleGenAI();
        const isVedu = character === 'vedu' || character === 'mitra';
        const characterName = isVedu ? 'Vedu (AI Smart Assistant)' : 'Dhanu (AI Welfare Guide)';
        const langInstruction = lang === 'hi' ? 'Respond in Hindi (हिंदी)' : lang === 'mr' ? 'Respond in Marathi (मराठी)' : `Respond in the user's language (${lang})`;

        const prompt = `You are ${characterName} for the Yojana360 open-source public welfare platform in India.
${langInstruction}.
Answer the citizen's question clearly, warmly, and helpfully.
Your scope:
- Indian public welfare schemes (PM-Kisan, Ayushman Bharat, PMAY, Pensions, Sukanya Samriddhi, DBT, e-Shram, Ladli Behna, etc.).
- Explaining required documents and eligibility requirements.
- Guiding the user on how to use Yojana360 step-by-step.
- Always cite verified .gov.in websites where citizens can safely apply.
- Note that Yojana360 is a free, non-governmental decision support tool that never asks for passwords, Aadhaar, or fees.

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
    const isTender = lower.includes('tender') || lower.includes('gem') || lower.includes('procurement') || lower.includes('contractor') || lower.includes('निविदा') || lower.includes('टेंडर') || lower.includes('कंत्राटदार') || lower.includes('खरेदी');
    const isHealth = lower.includes('health') || lower.includes('hospital') || lower.includes('ayushman') || lower.includes('pmjay') || lower.includes('आरोग्य') || lower.includes('इलाज') || lower.includes('दवा');
    const isBusiness = lower.includes('business') || lower.includes('loan') || lower.includes('mudra') || lower.includes('startup') || lower.includes('udyam') || lower.includes('कर्ज') || lower.includes('ऋण') || lower.includes('उद्योग');
    const isPension = lower.includes('pension') || lower.includes('atal') || lower.includes('apy') || lower.includes('वृद्ध') || lower.includes('पेंशन') || lower.includes('निवृत्तीवेतन');

    let matchedCategory = 'general';
    if (isFarmer) matchedCategory = 'agriculture';
    else if (isWomenSHG) matchedCategory = 'women_shg';
    else if (isTender) matchedCategory = 'procurement_tenders';
    else if (isHealth) matchedCategory = 'health';
    else if (isBusiness) matchedCategory = 'enterprise';
    else if (isPension) matchedCategory = 'pension';

    const matchedSchemes = SCHEMES.filter((s) => {
      if (isFarmer) return s.category === 'agriculture';
      if (isWomenSHG) return s.code === 'LAKHPATI-DIDI' || s.code === 'UMED-MSRLM' || s.category === 'women_child';
      if (isTender) return s.code === 'MSE-PROCUREMENT-GEM';
      if (isHealth) return s.category === 'health';
      if (isBusiness) return s.category === 'banking' || s.category === 'livelihood';
      if (isPension) return s.category === 'pension';
      return false;
    }).slice(0, 3);

    const matchedPortals = OFFICIAL_PORTALS.filter((p) => {
      if (isFarmer) return p.category === 'agriculture';
      if (isWomenSHG) return p.id === 'umed-msrlm-portal' || p.id === 'lakhpati-didi-portal';
      if (isTender) return p.category === 'procurement_tenders';
      if (isBusiness) return p.category === 'enterprise';
      return false;
    }).slice(0, 3);

    let reply = '';
    if (lang === 'hi') {
      if (isFarmer) {
        reply = `नमस्ते! किसान भाइयों के लिए मुख्य योजनाएं हैं: **पीएम-किसान (₹6,000/वर्ष)**, **महाडीबीटी शेतकरी पोर्टल** और **पीएम फसल बीमा (PMFBY)**। आवेदन हेतु आधार कार्ड, 7/12 खतौनी और बैंक पासबुक आवश्यक है। आप सीधे https://pmkisan.gov.in पर ई-केवाईसी कर सकते हैं।`;
      } else if (isWomenSHG) {
        reply = `नमस्ते! महिला स्वयं सहायता समूहों (बचत गट) के लिए **उमेद (महाराष्ट्र MSRLM - https://umed.in)** और **लखपति दीदी योजना (https://lakhpatididi.gov.in)** सक्रिय हैं। इनके तहत बिना गारंटी रियायती ऋण (7% ब्याज), रिवॉल्विंग फंड (₹15,000) और सीआईएफ फंड मिलता है।`;
      } else if (isTender) {
        reply = `सरकारी निविदा एवं आपूर्ति हेतु आधिकारिक पोर्टल: **MahaTenders (https://mahatenders.gov.in)**, **केंद्रीय पोर्टल CPPP (https://eprocure.gov.in)** और **गवर्नमेंट ई-मार्केटप्लेस GeM (https://gem.gov.in)** हैं। सूक्ष्म व लघु उद्योगों (MSE) को टेंडर फॉर्म फीस और बयाना राशि (EMD) में छूट मिलती है।`;
      } else if (isHealth) {
        reply = `स्वास्थ्य सहायता हेतु **आयुष्मान भारत (PM-JAY)** के तहत प्रति वर्ष प्रति परिवार ₹5 लाख तक का निःशुल्क अस्पताल उपचार मिलता है। राशन कार्ड एवं आधार द्वारा पात्रता जांची जा सकती है।`;
      } else if (isBusiness) {
        reply = `व्यवसाय और ऋण हेतु **मुद्रा योजना (PMMY)** के तहत ₹50,000 से ₹20 लाख तक बिना गारंटी ऋण उपलब्ध है। इसके अलावा **उद्यम पोर्टल (https://udyamregistration.gov.in)** पर निःशुल्क एमएसएमई प्रमाण पत्र प्राप्त करें।`;
      } else {
        reply = `नमस्ते! मैं आपका जनकल्याण साथी हूँ। आप खेती (PM-Kisan), स्वास्थ्य (Ayushman Bharat), महिला बचत गट (UMED/लखपति दीदी), व्यवसाय ऋण (Mudra) या सरकारी टेंडर (GeM) के बारे में पूछ सकते हैं। आप प्रश्न पूछें, मैं सहायता करूँगा।`;
      }
    } else if (lang === 'mr') {
      if (isFarmer) {
        reply = `नमस्कार! शेतकरी बांधवांसाठी मुख्य योजना: **पीएम-किसान (दरवर्षी ₹६,०००)**, **महाडीबीटी कृषी पोर्टल (ट्रॅक्टर, ठिबक व शेततळे)** आणि **पीएम पीक विमा (PMFBY)** आहेत. आवश्यक कागदपत्रे: अद्ययावत ७/१२, ८-अ, आधार कार्ड व बँक पासबुक. अधिकृत संकेतस्थळ: https://mahadbt.maharashtra.gov.in`;
      } else if (isWomenSHG) {
        reply = `नमस्कार! महिला बचत गटांसाठी **उमेद (महाराष्ट्र राज्य ग्रामीण जीवनोन्नती अभियान - https://umed.in)** आणि **लखपती दीदी योजना (https://lakhpatididi.gov.in)** सुरू आहेत. बचत गटांना फिरता निधी (₹१५,०००), समुदाय गुंतवणूक निधी आणि ७% सवलतीच्या दरात विनातारण बँक कर्ज मिळते.`;
      } else if (isTender) {
        reply = `शासकीय निविदा व पुरवठ्यासाठी: **महाटेंडर्स (https://mahatenders.gov.in)**, **केंद्रीय CPPP (https://eprocure.gov.in)** आणि **GeM पोर्टल (https://gem.gov.in)** वापरा. एमएसएमई उद्योगांना निविदा फी व बयाणा रक्कम (EMD) सवलत लागू आहे.`;
      } else if (isHealth) {
        reply = `आरोग्य उपचारांसाठी **आयुष्मान भारत (PM-JAY)** योजनेतून दरवर्षी प्रति कुटुंब ₹५ लाखांपर्यंत मोफत कॅशलेस उपचार मिळतात. अधिकृत संकेतस्थळ: https://pmjay.gov.in`;
      } else if (isBusiness) {
        reply = `नवीन व्यवसाय व विस्तारासाठी **मुद्रा कर्ज योजना (₹५० हजार ते ₹२० लाख विनातारण)** आणि **उद्यम नोंदणी पोर्टल (https://udyamregistration.gov.in)** वरून मोफत अधिकृत एमएसएमई प्रमाणपत्र मिळवता येते.`;
      } else {
        reply = `नमस्कार! मी आपला जनकल्याण मार्गदर्शक आहे. शेती योजना, महिला बचत गट (उमेद/लखपती दीदी), व्यवसाय कर्ज (मुद्रा), शासकीय टेंडर किंवा आरोग्य योजनांबद्दल विचारा, मी माहिती देईन.`;
      }
    } else {
      if (isFarmer) {
        reply = `Hello! Primary farmer welfare initiatives include **PM-KISAN (₹6,000/year DBT)**, **MahaDBT Farmer Portal (subsidies for farm ponds, drip, tractors)**, and **PM Fasal Bima (Crop Insurance)**. Apply with your updated 7/12 extract, Aadhaar, and active bank passbook on https://pmkisan.gov.in or https://mahadbt.maharashtra.gov.in.`;
      } else if (isWomenSHG) {
        reply = `Hello! For Women Self-Help Groups (SHGs), key programs are **UMED – Maharashtra SRLM (https://umed.in)** and **Lakhpati Didi (https://lakhpatididi.gov.in)**. Eligible SHGs receive ₹15,000 revolving funds, Community Investment Funds up to ₹1.5 Lakh, and collateral-free bank credit at 7% interest subvention.`;
      } else if (isTender) {
        reply = `For government procurement and public tenders, authoritative portals are **MahaTenders (https://mahatenders.gov.in)**, **Central eProcure CPPP (https://eprocure.gov.in)**, and **GeM (https://gem.gov.in)**. MSMEs receive mandatory tender fee waivers and EMD exemptions under the Public Procurement Policy.`;
      } else if (isHealth) {
        reply = `For medical emergencies, **Ayushman Bharat (PM-JAY)** provides ₹5 Lakh per family per year cashless hospitalization coverage across empaneled public and private hospitals.`;
      } else if (isBusiness) {
        reply = `For business enterprises and trade, **Pradhan Mantri MUDRA Yojana** provides collateral-free loans from ₹50,000 up to ₹20 Lakhs, and the **Udyam Portal (https://udyamregistration.gov.in)** provides free official MSME certification.`;
      } else {
        reply = `Hello! I am your welfare advisor on Yojana360. You can ask me about agriculture schemes, Women SHGs (UMED / Lakhpati Didi), MSME loans, government tenders, or health benefits. How can I help you today?`;
      }
    }

    res.json({
      reply,
      source: 'welfare-knowledge-engine',
      character,
      schemes: matchedSchemes.map((s) => ({ id: s.id, code: s.code, name: s.name.en, url: s.official_url })),
      portals: matchedPortals.map((p) => ({ id: p.id, name: p.name.en, url: p.official_url })),
    });
  });

  // 6. POST /notifications/whatsapp - WhatsApp message dispatch endpoint
  api.post('/notifications/whatsapp', async (req: Request, res: Response) => {
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

  // Mount router on both '/api' and '/' to ensure 100% route compatibility across Vercel and local dev
  app.use('/api', api);
  app.use('/', api);

  return app;
}
