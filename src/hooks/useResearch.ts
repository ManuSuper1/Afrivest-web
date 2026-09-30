"use client";

import { useState } from "react";
import { startResearchStream } from "../lib/api";
import { MarketEntryRequest, InvestmentDossier, SSEEvent } from "../lib/types";

export type AppState = "landing" | "config" | "loading" | "dossier" | "error";

export type ResearchStepStatus = "pending" | "running" | "complete";

const SUBAGENTS = [
  "legal-regulatory-analyst",
  "market-competition-analyst",
  "financial-risk-analyst",
  "currency-fx-analyst",
] as const;

type SubagentName = (typeof SUBAGENTS)[number];
type SubagentStatuses = Record<SubagentName, ResearchStepStatus>;

const initialSubagentStatuses: SubagentStatuses = {
  "legal-regulatory-analyst": "pending",
  "market-competition-analyst": "pending",
  "financial-risk-analyst": "pending",
  "currency-fx-analyst": "pending",
};

export function useResearch() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [request, setRequest] = useState<MarketEntryRequest | null>(null);
  const [dossier, setDossier] = useState<InvestmentDossier | null>(null);
  const [rawMarkdown, setRawMarkdown] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  
  // Loading state
  const [subagentStatuses, setSubagentStatuses] =
    useState<SubagentStatuses>(initialSubagentStatuses);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [todos, setTodos] = useState<Record<string, unknown>[]>([]);

  const start = async (req: MarketEntryRequest) => {
    setRequest(req);
    setAppState("loading");
    setError(null);
    setDossier(null);
    setRawMarkdown("");
    setSubagentStatuses(initialSubagentStatuses);
    setIsSynthesizing(false);

    try {
      await startResearchStream(req, (event: SSEEvent) => {
        switch (event.type) {
          case "subagent_start":
            if (SUBAGENTS.includes(event.subagent as SubagentName)) {
              setSubagentStatuses((statuses) => ({
                ...statuses,
                [event.subagent as SubagentName]: "running",
              }));
            }
            break;
          case "subagent_complete":
            if (SUBAGENTS.includes(event.subagent as SubagentName)) {
              setSubagentStatuses((statuses) => ({
                ...statuses,
                [event.subagent as SubagentName]: "complete",
              }));
            }
            break;
          case "synthesis_start":
            setIsSynthesizing(true);
            break;
          case "todo_update":
            setTodos(event.todos);
            break;
          case "done":
            setSubagentStatuses({
              "legal-regulatory-analyst": "complete",
              "market-competition-analyst": "complete",
              "financial-risk-analyst": "complete",
              "currency-fx-analyst": "complete",
            });
            setIsSynthesizing(false);
            setDossier(event.dossier);
            setAppState("dossier");
            break;
          case "error":
            setError(event.message);
            setAppState("error");
            break;
        }
      });
    } catch (err: unknown) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "An error occurred during research.";
      setError(errorMessage);
      setAppState("error");
    }
  };

  const reset = () => {
    setAppState("landing");
    setDossier(null);
    setRawMarkdown("");
    setRequest(null);
    setError(null);
    setSubagentStatuses(initialSubagentStatuses);
    setIsSynthesizing(false);
  };

  return {
    appState,
    setAppState,
    start,
    reset,
    request,
    dossier,
    rawMarkdown,
    error,
    subagentStatuses,
    isSynthesizing,
    todos,
  };
}
