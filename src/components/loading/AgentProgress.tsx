import React, { useEffect, useState } from "react";
import { Check, Circle, Loader2 } from "lucide-react";
import { ResearchStepStatus } from "../../hooks/useResearch";

const SUBAGENTS = [
  "legal-regulatory-analyst",
  "market-competition-analyst",
  "financial-risk-analyst",
  "currency-fx-analyst",
] as const;

const DISPLAY_NAMES: Record<string, string> = {
  "legal-regulatory-analyst": "Subagent 1: Querying regulatory frameworks & licensing tiers...",
  "market-competition-analyst": "Subagent 2: Benchmarking market incumbents & competitive moats...",
  "financial-risk-analyst": "Subagent 3: Analyzing financial risks & setup costs...",
  "currency-fx-analyst": "Subagent 4: Analyzing currency volatility (FX) & repatriation...",
};

export function AgentProgress({
  subagentStatuses,
  isSynthesizing,
}: {
  subagentStatuses: Record<string, ResearchStepStatus>;
  isSynthesizing: boolean;
}) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeResearchCount = Object.values(subagentStatuses).filter(
    (status) => status === "running"
  ).length;

  const renderStatusIcon = (status: ResearchStepStatus) => {
    if (status === "complete") {
      return (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Check aria-hidden="true" className="h-5 w-5 stroke-[3]" />
        </span>
      );
    }

    if (status === "running") {
      return (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-700 text-white">
          <Loader2 aria-hidden="true" className="h-6 w-6 animate-spin" />
        </span>
      );
    }

    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-300 text-slate-300">
        <Circle aria-hidden="true" className="h-4 w-4" />
      </span>
    );
  };

  const renderStep = (key: string, label: string, status: ResearchStepStatus) => (
    <div
      key={key}
      aria-live={status === "running" ? "polite" : undefined}
      className={`flex min-h-[46px] items-center gap-3 rounded-full border bg-white px-3 py-2 transition-colors duration-300 sm:px-4 ${
        status === "complete"
          ? "border-emerald-300"
          : status === "running"
            ? "border-indigo-400"
            : "border-slate-200"
      }`}
    >
      {renderStatusIcon(status)}
      <span
        title={label}
        className={`min-w-0 flex-1 truncate text-xs leading-4 ${
          status === "pending" ? "text-slate-400" : "text-slate-800"
        }`}
      >
        {label}
      </span>
      <span
        className={`shrink-0 text-[10px] sm:text-xs ${
          status === "complete"
            ? "text-emerald-600"
            : status === "running"
              ? "text-indigo-600"
              : "text-slate-400"
        }`}
      >
        {status === "complete" ? "Complete" : status === "running" ? "Running..." : "Waiting"}
      </span>
      <span className="sr-only">
        {status === "complete" ? "Complete" : status === "running" ? "Running" : "Waiting"}
      </span>
    </div>
  );

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-5 py-10 sm:px-8">
      <section
        aria-label="Research progress"
        className="w-full max-w-[470px]"
      >
        <header className="mb-8 text-center">
          <h1 className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg">
            Deep Agent at Work
          </h1>
          <p className="mt-2 text-xs text-slate-500 sm:text-sm">
            Parallel research tracks running to build your investment brief
          </p>
        </header>

        <div className="space-y-2.5">
          {SUBAGENTS.map((step) =>
            renderStep(step, DISPLAY_NAMES[step], subagentStatuses[step] ?? "pending")
          )}
          {renderStep(
            "lead-agent",
            "Lead Agent: Compiling investment dossier...",
            isSynthesizing ? "running" : "pending"
          )}
        </div>

        <footer className="mt-7 text-center">
          <p className="font-mono text-xl tabular-nums text-slate-900">
            {elapsed}s elapsed
          </p>
          <p className="mt-2 text-xs text-slate-500">
            {activeResearchCount > 1
              ? `${activeResearchCount} research tracks are in progress in parallel.`
              : "Research tracks run in parallel; each is marked complete when its result returns."}
          </p>
        </footer>
      </section>
    </main>
  );
}
