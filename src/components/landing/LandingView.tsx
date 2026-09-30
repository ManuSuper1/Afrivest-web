import React from "react";
import { Button } from "../ui/Button";
import { Globe, Rocket, TrendingUp } from "lucide-react";

export function LandingView({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto py-20 px-6 gap-16">
      <div className="text-center space-y-6 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-zinc-900">
          AfriVest Intelligence
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Turn “should I launch this in Ghana?” into a structured market-entry dossier with regulation checks, competition benchmarking and clear go/no-go recommendation
        </p>
        <Button onClick={onStart} className="text-lg px-8 py-4 mt-4">
          Start Your Research &gt;
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col items-start space-y-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold">For Diasporans</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Reduce the fear of entering unfamiliar markets. Get structured due diligence for your home country or other Africa markets.
          </p>
        </div>
        
        <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col items-start space-y-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl">
            <Rocket className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold">For Local Founders</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Shorten the time between idea and execution. Understand the landscape before committing capital.
          </p>
        </div>

        <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col items-start space-y-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold">For Foreign Investors</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Compare countries, understand regulatory friction and spot opportunities before deploying capital.
          </p>
        </div>
      </div>

      <div className="w-full max-w-3xl p-8 rounded-2xl border border-slate-200 bg-gray-50 flex flex-col gap-4">
        <h3 className="font-semibold text-lg text-zinc-900">How Deep Agents Work</h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm">
          <li>Breaks research into parallel tracks (legal, financial, competitive, market).</li>
          <li>Delegates specialized work to subagents with domain expertise.</li>
          <li>Assembles findings into a traceable, structured investment brief.</li>
          <li>Saves research artifacts to compare across multiple African markets.</li>
        </ol>
      </div>
    </div>
  );
}
