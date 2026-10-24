/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Terminal, Copy, Check, Code, Database, Share2, Play } from 'lucide-react';

export const DevelopersView: React.FC = () => {
  const [activeEndpoint, setActiveEndpoint] = useState<string>('/api/schemes');
  const [responseJson, setResponseJson] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchEndpoint = async (url: string) => {
    setActiveEndpoint(url);
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setResponseJson(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setResponseJson(JSON.stringify({ error: err?.message || 'Failed to fetch' }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const copyResponse = async () => {
    try {
      await navigator.clipboard.writeText(responseJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-full text-xs font-semibold mb-3">
          <Share2 className="w-3.5 h-3.5" />
          <span>Interoperable Data Layer (Track 1-05)</span>
        </div>
        <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white">
          Developer API & Scheme Schema
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 max-w-3xl leading-relaxed">
          Yojana360 exposes its entire curated welfare catalog via public, read-only JSON endpoints with full CORS headers enabled. Other civic tech tools, NGO caseworkers, and state portals can query or ingest verified eligibility rules without vendor lock-in.
        </p>
      </div>

      {/* Endpoints Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => fetchEndpoint('/api/schemes')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            activeEndpoint === '/api/schemes'
              ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 border-stone-900 shadow-sm'
              : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 hover:border-stone-400'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">GET</span>
            <Play className="w-3.5 h-3.5 opacity-60" />
          </div>
          <div className="font-mono text-xs font-semibold truncate mb-1">/api/schemes</div>
          <div className="text-[11px] opacity-80">List all 12 schemes with category and state filters</div>
        </button>

        <button
          onClick={() => fetchEndpoint('/api/schemes/pm-kisan')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            activeEndpoint === '/api/schemes/pm-kisan'
              ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 border-stone-900 shadow-sm'
              : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 hover:border-stone-400'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">GET</span>
            <Play className="w-3.5 h-3.5 opacity-60" />
          </div>
          <div className="font-mono text-xs font-semibold truncate mb-1">/api/schemes/:id</div>
          <div className="text-[11px] opacity-80">Fetch single scheme rules, criteria, & documents</div>
        </button>

        <button
          onClick={() => fetchEndpoint('/api/schema')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            activeEndpoint === '/api/schema'
              ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 border-stone-900 shadow-sm'
              : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 hover:border-stone-400'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-sky-400">GET</span>
            <Play className="w-3.5 h-3.5 opacity-60" />
          </div>
          <div className="font-mono text-xs font-semibold truncate mb-1">/api/schema</div>
          <div className="text-[11px] opacity-80">Machine-readable JSON Schema (Draft 2020-12)</div>
        </button>
      </div>

      {/* Interactive Console */}
      <div className="bg-stone-950 text-stone-100 rounded-3xl p-6 border border-stone-800 shadow-lg font-mono">
        <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-4">
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-stone-200 font-semibold">{activeEndpoint}</span>
          </div>

          <div className="flex items-center gap-2">
            {responseJson && (
              <button
                onClick={copyResponse}
                className="text-xs text-stone-400 hover:text-white flex items-center gap-1 bg-stone-900 px-2.5 py-1.5 rounded-lg border border-stone-800"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy JSON'}</span>
              </button>
            )}

            <button
              onClick={() => fetchEndpoint(activeEndpoint)}
              disabled={loading}
              className="text-xs font-semibold text-stone-950 bg-emerald-400 hover:bg-emerald-300 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{loading ? 'Executing...' : 'Run Request'}</span>
            </button>
          </div>
        </div>

        {/* Console Output */}
        <pre className="text-xs overflow-x-auto max-h-96 text-stone-300 leading-relaxed p-2 select-all">
          {responseJson || '// Click "Run Request" above to test the live API endpoint...'}
        </pre>
      </div>

      {/* cURL Example */}
      <div className="mt-8 p-6 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 text-xs">
        <h3 className="font-bold text-stone-900 dark:text-white text-sm mb-2 flex items-center gap-2">
          <Code className="w-4 h-4 text-stone-500" />
          <span>Quick cURL Example</span>
        </h3>
        <div className="p-3 bg-stone-100 dark:bg-stone-800 rounded-xl font-mono text-stone-800 dark:text-stone-200 overflow-x-auto select-all">
          curl -s https://{typeof window !== 'undefined' ? window.location.host : 'localhost:3000'}/api/schemes?category=agriculture | jq .
        </div>
      </div>
    </div>
  );
};
