export type InvestorType = "diaspora" | "foreign_investor" | "local_founder" | "other";

export interface MarketEntryRequest {
  country: string;
  sector: string;
  investment_goal: string;
  investor_type?: InvestorType;
  budget_usd?: number | null;
  time_horizon_months?: number | null;
  notes?: string | null;
}

export type GoNoGoRecommendation = "go" | "conditional_go" | "no_go";
export type RiskLevel = "low" | "moderate" | "high" | "severe";

export interface Citation {
  title: string;
  url: string;
  publisher?: string | null;
  published_date?: string | null;
  note?: string | null;
}

export interface RegulatoryFindings {
  licensing_requirements: string[];
  key_regulators: string[];
  foreign_ownership_rules: string;
  data_and_sector_specific_compliance: string[];
  estimated_setup_timeline: string;
  red_flags: string[];
  overall_regulatory_risk: RiskLevel;
  sources: Citation[];
}

export interface CompetitorProfile {
  name: string;
  description: string;
  estimated_stage?: string | null;
  differentiator?: string | null;
}

export interface CompetitiveLandscape {
  market_size_estimate: string;
  competitors: CompetitorProfile[];
  market_gaps: string[];
  barriers_to_entry: string[];
  distribution_channels: string[];
  sources: Citation[];
}

export interface FinancialRiskAssessment {
  typical_setup_cost_usd_range: string;
  tax_regime_summary: string;
  funding_landscape: string;
  repatriation_of_profits: string;
  key_financial_risks: string[];
  overall_financial_risk: RiskLevel;
  sources: Citation[];
}

export interface CurrencyRiskAssessment {
  local_currency_code: string;
  fx_rate_usd_to_local?: number | null;
  twelve_month_volatility_note: string;
  convertibility_and_capital_controls: string;
  hedging_recommendations: string[];
  overall_currency_risk: RiskLevel;
  sources: Citation[];
}

export interface InvestmentDossier {
  report_id: string;
  country: string;
  sector: string;
  executive_summary: string;
  regulatory: RegulatoryFindings;
  competitive_landscape: CompetitiveLandscape;
  financial_risk: FinancialRiskAssessment;
  currency_risk: CurrencyRiskAssessment;
  recommendation: GoNoGoRecommendation;
  confidence: number;
  key_risks: string[];
  recommended_next_steps: string[];
  generated_at: string;
}

export type SSEEvent =
  | { type: "todo_update"; todos: Record<string, unknown>[] }
  | { type: "tool_call"; tool: string; args: Record<string, unknown> }
  | { type: "tool_result"; tool: string; content: string }
  | { type: "subagent_complete"; subagent: string }
  | { type: "subagent_start"; subagent: string }
  | { type: "synthesis_start" }
  | { type: "message_delta"; text: string }
  | { type: "done"; dossier: InvestmentDossier }
  | { type: "error"; message: string };
