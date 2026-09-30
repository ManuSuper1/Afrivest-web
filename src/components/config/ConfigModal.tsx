import React, { useState } from "react";
import { Button } from "../ui/Button";
import { COUNTRIES, SECTORS, GOALS, INVESTOR_TYPES } from "../../lib/constants";
import { MarketEntryRequest } from "../../lib/types";

export function ConfigModal({
  onBack,
  onStart,
}: {
  onBack: () => void;
  onStart: (req: MarketEntryRequest) => void;
}) {
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [sector, setSector] = useState(SECTORS[0]);
  const [goal, setGoal] = useState(GOALS[0]);
  
  // Advanced options
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [investorType, setInvestorType] = useState(INVESTOR_TYPES[0].value);
  const [budget, setBudget] = useState("");
  const [timeHorizon, setTimeHorizon] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart({
      country,
      sector,
      investment_goal: goal,
      ...(showAdvanced && {
        investor_type: investorType,
        budget_usd: budget ? parseInt(budget, 10) : undefined,
        time_horizon_months: timeHorizon ? parseInt(timeHorizon, 10) : undefined,
        notes: notes || undefined,
      })
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-100/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg p-8 my-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-zinc-900">Configure Your Research</h2>
          <p className="text-slate-500 mt-2">Select your target market and investment parameters</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Target Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-colors appearance-none cursor-pointer"
            >
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Sector</label>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-colors appearance-none cursor-pointer"
            >
              {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Investment Goal</label>
            <div className="relative">
              <input
                type="text"
                list="goals-list"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-colors"
                placeholder="Type or select a goal..."
              />
              <datalist id="goals-list">
                {GOALS.map((g) => <option key={g} value={g} />)}
              </datalist>
            </div>
          </div>
          
          <div>
            <button 
              type="button" 
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-sm text-indigo-600 font-medium hover:text-indigo-700"
            >
              {showAdvanced ? "- Hide Advanced Options" : "+ Show Advanced Options"}
            </button>
          </div>

          {showAdvanced && (
            <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Investor Type</label>
                <select
                  value={investorType}
                  onChange={(e) => setInvestorType(e.target.value as import("../../lib/types").InvestorType)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                >
                  {INVESTOR_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Budget (USD)</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. 150000"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Time Horizon (Months)</label>
                  <input
                    type="number"
                    value={timeHorizon}
                    onChange={(e) => setTimeHorizon(e.target.value)}
                    placeholder="e.g. 6"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Additional Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any specific focus areas..."
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm h-20 resize-none"
                />
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="secondary" onClick={onBack} className="flex-1">
              Back
            </Button>
            <Button type="submit" className="flex-1">
              Generate Brief
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
