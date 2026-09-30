import { InvestmentDossier } from "./types";

export const MOCK_DOSSIER: InvestmentDossier = {
  report_id: "mock-1234",
  country: "Ghana",
  sector: "FinTech",
  executive_summary: "Ghana presents a strong opportunity for FinTech expansion, particularly in tier-2 payment services targeting the unbanked and diaspora remittances. Regulatory frameworks are progressive, though capital requirements and FX volatility pose moderate risks. Overall, the market readiness and competitive gaps support a conditional go recommendation.",
  regulatory: {
    licensing_requirements: [
      "Payment Service Provider (PSP) License from Bank of Ghana",
      "Data Protection Commission Registration"
    ],
    key_regulators: ["Bank of Ghana", "Data Protection Commission", "Registrar General"],
    foreign_ownership_rules: "100% foreign ownership allowed, but minimum 30% local participation recommended for faster licensing and local trust.",
    data_and_sector_specific_compliance: [
      "Data Protection Act, 2012 (Act 843)",
      "Cybersecurity Act 2020 (Act 1038)"
    ],
    estimated_setup_timeline: "6-9 months for full PSP licensing",
    red_flags: ["Strict minimum capital requirements for PSPs (approx $150k - $1M depending on tier)"],
    overall_regulatory_risk: "moderate",
    sources: [
      { title: "Bank of Ghana Payment Systems Act", url: "https://bog.gov.gh" }
    ]
  },
  competitive_landscape: {
    market_size_estimate: "$1.5B total addressable market with 15% YoY growth",
    competitors: [
      { name: "MTN MoMo", description: "Dominant telco mobile money provider", estimated_stage: "Incumbent", differentiator: "Ubiquitous agent network" },
      { name: "Zeepay", description: "Leading independent remittance and mobile money provider", estimated_stage: "Series A+", differentiator: "Cross-border focus" }
    ],
    market_gaps: ["B2B merchant payments", "Cross-border API infrastructure for SMEs"],
    barriers_to_entry: ["High capital requirement", "Establishing agent networks or reliable local partnerships"],
    distribution_channels: ["Direct sales to SME", "Partnerships with local banks", "Agent networks"],
    sources: [
      { title: "Ghana FinTech Report 2025", url: "https://example.com" }
    ]
  },
  financial_risk: {
    typical_setup_cost_usd_range: "$500,000 - $1,500,000",
    tax_regime_summary: "25% standard corporate tax rate. Potential for tax holidays in specific free zones, though FinTech often doesn't qualify.",
    funding_landscape: "Active local and regional VC ecosystem, strong presence of DFIs supporting financial inclusion.",
    repatriation_of_profits: "Generally permitted, but subject to FX availability and withholding taxes (8% on dividends).",
    key_financial_risks: ["FX volatility affecting USD-denominated returns", "Delayed licensing burning runway"],
    overall_financial_risk: "moderate",
    sources: []
  },
  currency_risk: {
    local_currency_code: "GHS",
    fx_rate_usd_to_local: 15.5,
    twelve_month_volatility_note: "GHS has experienced ~15% depreciation against USD over the past 12 months, driven by macroeconomic restructuring.",
    convertibility_and_capital_controls: "Freely convertible, but large transfers may face delays depending on bank USD liquidity.",
    hedging_recommendations: ["Price services in USD equivalents where legally permissible", "Maintain offshore USD accounts for capital raising"],
    overall_currency_risk: "high",
    sources: []
  },
  recommendation: "conditional_go",
  confidence: 0.85,
  key_risks: [
    "Currency depreciation eroding dollar-value returns",
    "Protracted licensing timeline with Bank of Ghana",
    "Fierce competition from incumbent telcos (MTN, Vodafone)"
  ],
  recommended_next_steps: [
    "Engage local counsel to confirm exact PSP tier requirements based on business model.",
    "Initiate preliminary discussions with Bank of Ghana's FinTech & Innovation Office.",
    "Formulate FX hedging strategy with a local tier-1 bank."
  ],
  generated_at: new Date().toISOString()
};
