"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { SheetTabsNav } from "@/components/SheetTabsNav";
import { BottomNav } from "@/components/BottomNav";
import { CARDIO_GUIDELINES } from "@/data/sheetData";
import {
  HeartPulse,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Clock,
  Activity,
  Droplets,
  ShieldAlert,
} from "lucide-react";

export default function CardioPage() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const targetSeconds = 30 * 60; // 30 minutes target

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercent = Math.min(100, Math.round((seconds / targetSeconds) * 100));

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
                Sheet 7: Aerobic Conditioning
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight mt-1">
              LISS Cardio Plan
            </h1>
            <p className="text-xs text-[#888888] font-mono mt-0.5">
              Low-Intensity Steady State guidelines for fat loss &amp; recovery
            </p>
          </div>

          <div className="w-10 h-10 rounded-xl bg-[#0a0a0a] border border-[#222222] flex items-center justify-center text-white">
            <HeartPulse className="h-5 w-5" />
          </div>
        </div>

        {/* Live LISS Cardio Session Timer */}
        <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-[#222222] text-center space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#888888]">
              Live Session Timer
            </span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Zone 2 • RPE 2-4
            </span>
          </div>

          <div className="py-2">
            <div className="text-4xl sm:text-5xl font-extrabold font-mono text-white tracking-tight">
              {formatTimer(seconds)}
            </div>
            <div className="text-xs font-mono text-[#888888] mt-1">
              Target: 30:00 - 35:00 minutes ({progressPercent}%)
            </div>
          </div>

          <div className="w-full bg-[#1a1a1a] h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                progressPercent >= 100 ? "bg-emerald-400" : "bg-white"
              }`}
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-center gap-2 pt-1">
            <button
              onClick={() => setIsActive(!isActive)}
              className="py-2.5 px-6 rounded-xl bg-white hover:bg-[#eaeaea] text-black font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              {isActive ? (
                <>
                  <Pause className="h-4 w-4" />
                  <span>Pause Timer</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-black" />
                  <span>Start LISS Session</span>
                </>
              )}
            </button>
            <button
              onClick={() => {
                setIsActive(false);
                setSeconds(0);
              }}
              className="p-2.5 rounded-xl bg-[#141414] hover:bg-[#202020] border border-[#2a2a2a] text-[#888888] hover:text-white transition-colors cursor-pointer"
              title="Reset"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Prescription Highlights */}
        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 rounded-xl bg-[#0a0a0a] border border-[#222222] text-center">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#666666]">
              Duration
            </div>
            <div className="text-sm sm:text-base font-bold font-mono text-white mt-1">
              30 - 35 min
            </div>
            <div className="text-[9px] font-mono text-[#888888]">per session</div>
          </div>

          <div className="p-3 rounded-xl bg-[#0a0a0a] border border-[#222222] text-center">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#666666]">
              Frequency
            </div>
            <div className="text-sm sm:text-base font-bold font-mono text-white mt-1">
              3 - 4x / week
            </div>
            <div className="text-[9px] font-mono text-[#888888]">post-lift / rest</div>
          </div>

          <div className="p-3 rounded-xl bg-[#0a0a0a] border border-[#222222] text-center">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#666666]">
              Weekly Total
            </div>
            <div className="text-sm sm:text-base font-bold font-mono text-emerald-400 mt-1">
              120 - 150 min
            </div>
            <div className="text-[9px] font-mono text-[#888888]">dedicated LISS</div>
          </div>
        </div>

        {/* Modalities */}
        <div className="space-y-2">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#888888] px-1">
            Recommended Low-Impact Modalities
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {CARDIO_GUIDELINES.modalities.map((mod, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#0a0a0a] border border-[#222222] space-y-1"
              >
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-emerald-400" />
                  <h3 className="text-xs font-semibold text-white tracking-tight">
                    {mod.name}
                  </h3>
                </div>
                <p className="text-xs text-[#a1a1aa] font-sans leading-relaxed">
                  {mod.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Pointers */}
        <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-[#222222] space-y-2">
          <h3 className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
            Considerations from Aanchal
          </h3>
          <ul className="text-xs text-[#cccccc] font-sans space-y-1.5 pl-5 list-disc leading-relaxed">
            {CARDIO_GUIDELINES.keyPointers.map((pointer, idx) => (
              <li key={idx}>{pointer}</li>
            ))}
          </ul>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
