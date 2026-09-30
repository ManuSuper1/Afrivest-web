"use client";

import { useResearch } from "../hooks/useResearch";
import { LandingView } from "../components/landing/LandingView";
import { ConfigModal } from "../components/config/ConfigModal";
import { AgentProgress } from "../components/loading/AgentProgress";
import { DossierView } from "../components/dossier/DossierView";
import { AlertCircle } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function Home() {
  const {
    appState,
    setAppState,
    start,
    reset,
    dossier,
    rawMarkdown,
    error,
    subagentStatuses,
    isSynthesizing,
  } = useResearch();

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Landing State Background always visible behind Config Modal */}
      {(appState === "landing" || appState === "config") && (
        <LandingView onStart={() => setAppState("config")} />
      )}

      {/* Config Overlay */}
      {appState === "config" && (
        <ConfigModal onBack={() => setAppState("landing")} onStart={start} />
      )}

      {/* Loading State */}
      {appState === "loading" && (
        <AgentProgress
          subagentStatuses={subagentStatuses}
          isSynthesizing={isSynthesizing}
        />
      )}

      {/* Dossier State */}
      {appState === "dossier" && (
        <DossierView dossier={dossier} rawMarkdown={rawMarkdown} onReset={reset} />
      )}

      {/* Error State */}
      {appState === "error" && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-red-200 p-8 flex flex-col items-center text-center space-y-6">
            <div className="p-4 bg-red-50 text-red-600 rounded-full">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Research Interrupted</h2>
            <p className="text-slate-600">
              {error || "An unexpected error occurred while generating your dossier."}
            </p>
            <div className="flex gap-4 pt-4">
              <Button variant="secondary" onClick={reset}>
                Start Over
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
