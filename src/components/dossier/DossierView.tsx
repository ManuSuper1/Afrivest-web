import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Download, RefreshCw } from "lucide-react";
import { InvestmentDossier } from "../../lib/types";
import { Button } from "../ui/Button";

function MetricCard({ title, value, subtitle, colorScheme }: { title: string, value: string, subtitle: string, colorScheme: "green" | "purple" | "orange" | "red" }) {
  const colors = {
    green: "bg-green-50 border-green-200 text-green-700",
    purple: "bg-purple-50 border-purple-200 text-purple-700",
    orange: "bg-orange-50 border-orange-200 text-orange-700",
    red: "bg-red-50 border-red-200 text-red-700",
  };
  
  return (
    <div className={`rounded-2xl border p-6 flex flex-col ${colors[colorScheme]}`}>
      <span className="text-sm font-medium opacity-80 mb-2">{title}</span>
      <span className="text-2xl font-bold mb-1">{value}</span>
      <span className="text-sm opacity-90">{subtitle}</span>
    </div>
  );
}

function getRecommendationColor(rec: string) {
  if (rec === "go") return "green";
  if (rec === "conditional_go") return "orange";
  return "red";
}

function getRiskColor(risk: string) {
  if (risk === "low") return "green";
  if (risk === "moderate") return "orange";
  return "red";
}

export function DossierView({
  dossier,
  rawMarkdown,
  onReset
}: {
  dossier: InvestmentDossier | null;
  rawMarkdown: string;
  onReset: () => void;
}) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 print:flex-row print:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 mb-2">
              {dossier ? `Investment Brief: ${dossier.sector} in ${dossier.country}` : "Investment Brief"}
            </h1>
            <p className="text-slate-500">
              Market Entry Analysis - Generated {dossier ? new Date(dossier.generated_at).toLocaleDateString() : new Date().toLocaleDateString()}
            </p>
          </div>
          <Button variant="outline" onClick={handlePrint} className="print:hidden flex gap-2">
            <Download className="w-4 h-4" /> Export PDF
          </Button>
        </div>

        {/* Metrics Grid */}
        {dossier && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard 
              title="Recommendation" 
              value={dossier.recommendation.replace("_", " ").toUpperCase()} 
              subtitle={`Confidence: ${(dossier.confidence * 100).toFixed(0)}%`}
              colorScheme={getRecommendationColor(dossier.recommendation)} 
            />
            <MetricCard 
              title="Regulatory Risk"
              value={dossier.regulatory.overall_regulatory_risk.toUpperCase()}
              subtitle="Overall regulatory exposure"
              colorScheme={getRiskColor(dossier.regulatory.overall_regulatory_risk)}
            />
            <MetricCard 
              title="Financial Risk" 
              value={dossier.financial_risk.overall_financial_risk.toUpperCase()} 
              subtitle="Overall financial exposure"
              colorScheme={getRiskColor(dossier.financial_risk.overall_financial_risk)} 
            />
          </div>
        )}

        {/* Markdown Body */}
        <div className="prose prose-slate prose-lg max-w-none prose-headings:font-semibold prose-a:text-indigo-600">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {rawMarkdown || generateMarkdownFromDossier(dossier)}
          </ReactMarkdown>
        </div>

        {dossier && (
          <section className="border-t border-slate-200 pt-6">
            <h2 className="text-xl font-semibold text-zinc-900">Research Sources</h2>
            <p className="mt-1 text-sm text-slate-500">
              Report ID: <span className="font-mono">{dossier.report_id}</span>
            </p>
            {getSources(dossier).length > 0 ? (
              <ul className="mt-4 space-y-3">
                {getSources(dossier).map((source) => (
                  <li key={source.url} className="text-sm">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-indigo-700 underline underline-offset-2"
                    >
                      {source.title}
                    </a>
                    {source.publisher && (
                      <span className="text-slate-500"> — {source.publisher}</span>
                    )}
                    {source.published_date && (
                      <span className="text-slate-500"> ({source.published_date})</span>
                    )}
                    {source.note && (
                      <p className="mt-1 text-slate-600">{source.note}</p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm font-medium text-amber-800">
                No citations were included in this report. Verify its factual claims
                against primary sources before relying on it.
              </p>
            )}
          </section>
        )}

        {/* Footer Actions */}
        <div className="pt-12 mt-12 border-t border-slate-100 flex justify-center print:hidden">
          <Button onClick={onReset} className="flex gap-2 items-center px-8 text-lg">
            <RefreshCw className="w-5 h-5" /> Start New Research
          </Button>
        </div>

      </div>
    </div>
  );
}

function getSources(dossier: InvestmentDossier) {
  const sources = [
    ...dossier.regulatory.sources,
    ...dossier.competitive_landscape.sources,
    ...dossier.financial_risk.sources,
    ...dossier.currency_risk.sources,
  ];
  return Array.from(new Map(sources.map((source) => [source.url, source])).values());
}

function generateMarkdownFromDossier(dossier: InvestmentDossier | null): string {
  if (!dossier) return "";
  
  return `
## 1. Executive Summary & Market Sizing
${dossier.executive_summary}

**Market Size Estimate:** ${dossier.competitive_landscape.market_size_estimate}

## 2. Regulatory Compliance & Licensing
${dossier.regulatory.licensing_requirements.map(req => `- ${req}`).join('\n')}

**Foreign Ownership Rules:** ${dossier.regulatory.foreign_ownership_rules}
**Setup Timeline:** ${dossier.regulatory.estimated_setup_timeline}
**Red Flags:** 
${dossier.regulatory.red_flags.map(flag => `- ${flag}`).join('\n')}

## 3. Competitor Matrix & Market Gaps
**Key Competitors:**
${dossier.competitive_landscape.competitors.map(c => `- **${c.name}** (${c.estimated_stage || 'Unknown'}): ${c.description} - *${c.differentiator || 'N/A'}*`).join('\n')}

**Market Gaps:**
${dossier.competitive_landscape.market_gaps.map(gap => `- ${gap}`).join('\n')}

## 4. Currency, FX & Macroeconomic Risk
**Local Currency:** ${dossier.currency_risk.local_currency_code} (Rate to USD: ${dossier.currency_risk.fx_rate_usd_to_local || 'N/A'})

**Volatility Note:** ${dossier.currency_risk.twelve_month_volatility_note}

**Capital Controls:** ${dossier.currency_risk.convertibility_and_capital_controls}

## 5. Strategic Go/No-Go Verdict & Immediate Next Steps
**Key Risks:**
${dossier.key_risks.map(risk => `- ${risk}`).join('\n')}

**Recommended Next Steps:**
${dossier.recommended_next_steps.map(step => `- ${step}`).join('\n')}
  `;
}
