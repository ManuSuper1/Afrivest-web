import { InvestorType } from "./types";

export const COUNTRIES = [
  "Ghana",
  "Kenya",
  "Nigeria",
  "Rwanda",
  "South Africa",
];

export const SECTORS = [
  "FinTech",
  "CleanTech / Commercial Solar",
  "AgriTech",
  "HealthTech",
  "Logistics & Mobility",
];

export const GOALS = [
  "Setup Payment Service Provider (Tier-2)",
  "Deploy Commercial & Industrial Solar",
  "B2B SaaS Expansion",
  "Local Manufacturing Hub",
];

export const INVESTOR_TYPES: { label: string; value: InvestorType }[] = [
  { label: "Diaspora", value: "diaspora" },
  { label: "Foreign Investor", value: "foreign_investor" },
  { label: "Local Founder", value: "local_founder" },
  { label: "Other", value: "other" },
];
