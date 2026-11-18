"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { SheetTabsNav } from "@/components/SheetTabsNav";
import { BottomNav } from "@/components/BottomNav";
import { INITIAL_STEP_ENTRIES } from "@/data/sheetData";
import { StepEntry } from "@/types/workout";
import {
  Footprints,
  Plus,
  Minus,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Award,
  Calendar,
  Save,
} from "lucide-react";

export default function StepTrackerPage() {
  const [entries, setEntries] = useState<StepEntry[]>(INITIAL_STEP_ENTRIES);
  const [selectedDate, setSelectedDate] = useState("");
  const [currentSteps, setCurrentSteps] = useState(8500);
  const [currentNotes, setCurrentNotes] = useState("");
  const [isSavedToast, setIsSavedToast] = useState(false);

  useEffect(() => {
    setSelectedDate(new Date().toISOString().split("T")[0]);
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("pt_step_tracker_entries");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setEntries(parsed);
          }
        } catch {
          // Keep defaults
        }
      }
    }
  }, []);

  const handleSaveTodaySteps = () => {
    const goal = 10000;
    const goalMet = currentSteps >= goal;
    const existingIndex = entries.findIndex((e) => e.date === selectedDate);

    let updated: StepEntry[];
    if (existingIndex >= 0) {
      updated = [...entries];
      updated[existingIndex] = {
        ...updated[existingIndex],
        steps: currentSteps,
        goalMet,
        notes: currentNotes || updated[existingIndex].notes,
      };
    } else {
      const newEntry: StepEntry = {
        id: `step-${Date.now()}`,
        date: selectedDate,
        steps: currentSteps,
        goal,
        goalMet,
        notes: currentNotes || "Daily activity logged",
      };
      updated = [newEntry, ...entries];
    }

    setEntries(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("pt_step_tracker_entries", JSON.stringify(updated));
    }

    setIsSavedToast(true);
    setTimeout(() => setIsSavedToast(false), 2500);
  };

  const adjustSteps = (delta: number) => {
    setCurrentSteps((prev) => Math.max(0, prev + delta));
  };

  // Calculations
  const targetGoal = 10000;
  const progressPercent = Math.min(100, Math.round((currentSteps / targetGoal) * 100));

  const recent7 = entries.slice(0, 7);
  const avg7Days =
    recent7.length > 0
      ? Math.round(recent7.reduce((sum, e) => sum + e.steps, 0) / recent7.length)
      : 0;

  const totalMetDays = entries.filter((e) => e.goalMet).length;

  return (
    <div className="min-h-screen bg-black text-[#ededed] flex flex-col pb-28 selection:bg-white selection:text-black">
      <Navbar />
      <SheetTabsNav />

      <main className="max-w-2xl mx-auto w-full px-4 pt-5 space-y-4">
        {/* Header Title */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#141414] text-[#888888] border border-[#262626]">
                Sheet 2: Daily Activity
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight mt-1">
              Step Tracker
            </h1>
            <p className="text-xs text-[#888888] font-mono mt-0.5">
              Target: 10,000 steps daily • Aanchal&apos;s LISS &amp; NEAT goal
            </p>
          </div>

          <div className="w-10 h-10 rounded-xl bg-[#0a0a0a] border border-[#222222] flex items-center justify-center text-white">
            <Footprints className="h-5 w-5" />
          </div>
        </div>

        {/* Quick Summary Metrics */}
        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 rounded-xl bg-[#0a0a0a] border border-[#222222] text-center">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#666666]">
              7-Day Avg
            </div>
            <div className="text-base font-bold font-mono text-white mt-1">
              {avg7Days.toLocaleString()}
            </div>
            <div className="text-[9px] font-mono text-[#888888]">steps/day</div>
          </div>

          <div className="p-3 rounded-xl bg-[#0a0a0a] border border-[#222222] text-center">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#666666]">
              Goal Met
            </div>
            <div className="text-base font-bold font-mono text-emerald-400 mt-1">
              {totalMetDays} Days
            </div>
            <div className="text-[9px] font-mono text-[#888888]">10k target hit</div>
          </div>

          <div className="p-3 rounded-xl bg-[#0a0a0a] border border-[#222222] text-center">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#666666]">
              Weekly Pace
            </div>
            <div className="text-base font-bold font-mono text-sky-400 mt-1 flex items-center justify-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>+38%</span>
            </div>
            <div className="text-[9px] font-mono text-[#888888]">vs Week 1</div>
          </div>
        </div>

        {/* Today's Step Logger Card */}
        <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-[#222222] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white font-mono uppercase tracking-wider">
              Log Daily Steps
            </span>
            <div className="flex items-center gap-1.5 bg-black border border-[#222222] rounded-lg px-2 py-1 text-xs font-mono text-[#888888]">
              <Calendar className="h-3 w-3 text-[#666666]" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Big Step Counter */}
          <div className="p-4 rounded-xl bg-black border border-[#1f1f1f] text-center">
            <div className="text-3xl font-extrabold font-mono text-white tracking-tight">
              {currentSteps.toLocaleString()}
            </div>
            <div className="text-xs font-mono text-[#888888] mt-1">
              of {targetGoal.toLocaleString()} steps ({progressPercent}%)
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#1a1a1a] h-2 rounded-full overflow-hidden mt-3">
              <div
                className={`h-full transition-all duration-300 ${
                  progressPercent >= 100 ? "bg-emerald-400" : "bg-white"
                }`}
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {progressPercent >= 100 && (
              <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
                <Award className="h-3.5 w-3.5" />
                <span>Daily 10k Goal Achieved!</span>
              </div>
            )}
          </div>

          {/* Quick Increment Controls */}
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => adjustSteps(-1000)}
              className="py-2 rounded-xl bg-[#141414] hover:bg-[#1f1f1f] border border-[#262626] text-xs font-mono text-[#ededed] flex items-center justify-center gap-1"
            >
              <Minus className="h-3 w-3" />
              <span>1,000</span>
            </button>
            <button
              onClick={() => adjustSteps(-500)}
              className="py-2 rounded-xl bg-[#141414] hover:bg-[#1f1f1f] border border-[#262626] text-xs font-mono text-[#ededed] flex items-center justify-center gap-1"
            >
              <Minus className="h-3 w-3" />
              <span>500</span>
            </button>
            <button
              onClick={() => adjustSteps(500)}
              className="py-2 rounded-xl bg-[#141414] hover:bg-[#1f1f1f] border border-[#262626] text-xs font-mono text-[#ededed] flex items-center justify-center gap-1"
            >
              <Plus className="h-3 w-3" />
              <span>500</span>
            </button>
            <button
              onClick={() => adjustSteps(1000)}
              className="py-2 rounded-xl bg-[#141414] hover:bg-[#1f1f1f] border border-[#262626] text-xs font-mono text-[#ededed] flex items-center justify-center gap-1"
            >
              <Plus className="h-3 w-3" />
              <span>1,000</span>
            </button>
          </div>

          {/* Activity Note */}
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666666] mb-1">
              Activity Notes (Gym walk, errands, evening stroll)
            </label>
            <input
              type="text"
              value={currentNotes}
              onChange={(e) => setCurrentNotes(e.target.value)}
              placeholder="e.g. Went to gym via walking, evening jog"
              className="w-full px-3 py-2 bg-black border border-[#262626] rounded-xl text-xs text-white placeholder-[#555555] focus:outline-none focus:border-white font-mono"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveTodaySteps}
            className="w-full py-3 rounded-xl bg-white hover:bg-[#eaeaea] text-black font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Today&apos;s Step Count</span>
          </button>

          {isSavedToast && (
            <div className="p-2.5 rounded-lg bg-[#0e1710] border border-[#1d3823] text-emerald-400 text-xs font-mono text-center flex items-center justify-center gap-1.5 animate-in fade-in duration-200">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Step count saved successfully!</span>
            </div>
          )}
        </div>

        {/* Step Log History Table */}
        <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-[#222222] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-white font-mono uppercase tracking-wider">
              Step History Log
            </h3>
            <span className="text-[10px] font-mono text-[#666666]">
              {entries.length} days recorded
            </span>
          </div>

          <div className="space-y-1.5">
            {entries.slice(0, 15).map((entry) => (
              <div
                key={entry.id}
                className="p-2.5 rounded-xl bg-black border border-[#1f1f1f] flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-mono text-[11px] text-[#888888]">
                    {entry.date}
                  </div>
                  {entry.notes && (
                    <div className="text-[11px] text-[#cccccc] font-sans truncate max-w-[200px]">
                      {entry.notes}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-white text-sm">
                    {entry.steps.toLocaleString()}
                  </span>
                  {entry.goalMet ? (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="h-3 w-3" />
                      10k
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#141414] text-[#666666]">
                      <XCircle className="h-3 w-3" />
                      Miss
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
