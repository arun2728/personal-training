"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { SheetTabsNav } from "@/components/SheetTabsNav";
import { BottomNav } from "@/components/BottomNav";
import { REHAB_ROUTINE } from "@/data/sheetData";
import {
  Activity,
  Check,
  Shield,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

export default function RehabPage() {
  const [completedSets, setCompletedSets] = useState<Record<string, boolean>>({});

  const toggleSet = (exName: string, setIndex: number) => {
    const key = `${exName}-set-${setIndex}`;
    setCompletedSets((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const totalPossibleSets = REHAB_ROUTINE.reduce((sum, r) => sum + r.sets, 0);
  const totalCompleted = Object.values(completedSets).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-black text-[#ededed] flex flex-col pb-28 selection:bg-white selection:text-black">
      <Navbar />
      <SheetTabsNav />

      <main className="max-w-2xl mx-auto w-full px-4 pt-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#141414] text-[#888888] border border-[#262626]">
                Sheet 8: Joint Health &amp; Posture
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight mt-1">
              Upper Body Rehab
            </h1>
            <p className="text-xs text-[#888888] font-mono mt-0.5">
              Rotator cuff, scapular upward rotation &amp; thoracic mobility
            </p>
          </div>

          <div className="w-10 h-10 rounded-xl bg-[#0a0a0a] border border-[#222222] flex items-center justify-center text-white">
            <Activity className="h-5 w-5" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-[#222222] flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-white font-mono uppercase tracking-wider">
              Rehab Session Progress
            </span>
            <p className="text-[11px] font-mono text-[#888888] mt-0.5">
              {totalCompleted} of {totalPossibleSets} sets completed
            </p>
          </div>
          <span className="text-sm font-bold font-mono text-emerald-400">
            {Math.round((totalCompleted / totalPossibleSets) * 100)}%
          </span>
        </div>

        {/* Rehab Exercises */}
        <div className="space-y-3">
          {REHAB_ROUTINE.map((ex, idx) => {
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#0a0a0a] border border-[#222222] hover:border-[#333333] transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#141414] text-[#888888] border border-[#262626]">
                      {ex.focus}
                    </span>
                    <h3 className="text-base font-semibold text-white tracking-tight mt-1">
                      {ex.name}
                    </h3>
                    <p className="text-xs font-mono text-sky-400 mt-0.5">
                      Target: {ex.sets} sets × {ex.reps}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#a1a1aa] font-sans leading-relaxed bg-black/40 p-2.5 rounded-xl border border-[#1a1a1a]">
                  {ex.instructions}
                </p>

                {/* Set completion check buttons */}
                <div className="pt-1 flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#666666] mr-1">
                    Mark Sets:
                  </span>
                  {Array.from({ length: ex.sets }).map((_, setIdx) => {
                    const key = `${ex.name}-set-${setIdx + 1}`;
                    const isDone = !!completedSets[key];

                    return (
                      <button
                        key={setIdx}
                        onClick={() => toggleSet(ex.name, setIdx + 1)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                          isDone
                            ? "bg-emerald-500 text-black font-semibold shadow-sm"
                            : "bg-[#141414] border border-[#262626] text-[#888888] hover:text-white"
                        }`}
                      >
                        <Check className="h-3 w-3" />
                        <span>Set {setIdx + 1}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
