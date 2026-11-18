"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { SheetTabsNav } from "@/components/SheetTabsNav";
import { BottomNav } from "@/components/BottomNav";
import { STRESS_PROTOCOLS } from "@/data/sheetData";
import {
  Wind,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function StressManagementPage() {
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [phase, setPhase] = useState<"Inhale" | "Hold" | "Exhale" | "Rest">("Inhale");
  const [countdown, setCountdown] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isBreathingActive) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev > 1) return prev - 1;

          // Transition to next 4-second box phase
          setPhase((currentPhase) => {
            if (currentPhase === "Inhale") return "Hold";
            if (currentPhase === "Hold") return "Exhale";
            if (currentPhase === "Exhale") return "Rest";
            setCycleCount((c) => c + 1);
            return "Inhale";
          });
          return 4;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathingActive]);

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
                Sheet 9: Autonomic Recovery
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight mt-1">
              Stress Management
            </h1>
            <p className="text-xs text-[#888888] font-mono mt-0.5">
              Nervous system down-regulation &amp; diaphragmatic breathing protocols
            </p>
          </div>

          <div className="w-10 h-10 rounded-xl bg-[#0a0a0a] border border-[#222222] flex items-center justify-center text-white">
            <Wind className="h-5 w-5" />
          </div>
        </div>

        {/* Live Box Breathing Pacer */}
        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-[#222222] text-center space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#888888]">
              Interactive Box Breathing (4-4-4-4)
            </span>
            <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
              {cycleCount} Rounds Completed
            </span>
          </div>

          {/* Breathing Circle Visualizer */}
          <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
            <div
              className={`absolute inset-0 rounded-full border-2 transition-all duration-1000 ease-in-out ${
                isBreathingActive
                  ? phase === "Inhale"
                    ? "scale-100 border-sky-400/80 bg-sky-500/10"
                    : phase === "Hold"
                    ? "scale-100 border-white/60 bg-white/5"
                    : phase === "Exhale"
                    ? "scale-75 border-amber-400/60 bg-amber-500/5"
                    : "scale-75 border-[#333333] bg-black"
                  : "scale-75 border-[#222222] bg-[#0c0c0c]"
              }`}
            ></div>

            <div className="relative z-10 flex flex-col items-center">
              <span className="text-sm font-mono uppercase tracking-wider font-bold text-white">
                {isBreathingActive ? phase : "Ready"}
              </span>
              <span className="text-3xl font-extrabold font-mono text-white mt-1">
                {isBreathingActive ? countdown : "4s"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setIsBreathingActive(!isBreathingActive)}
              className="py-2.5 px-6 rounded-xl bg-white hover:bg-[#eaeaea] text-black font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              {isBreathingActive ? (
                <>
                  <Pause className="h-4 w-4" />
                  <span>Pause Breathing</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-black" />
                  <span>Start Box Breathing</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setIsBreathingActive(false);
                setPhase("Inhale");
                setCountdown(4);
                setCycleCount(0);
              }}
              className="p-2.5 rounded-xl bg-[#141414] hover:bg-[#202020] border border-[#2a2a2a] text-[#888888] hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* 3 Prescribed Daily Protocols */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#888888] px-1">
            Prescribed Protocols by Aanchal
          </h2>

          {STRESS_PROTOCOLS.map((protocol, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#0a0a0a] border border-[#222222] space-y-2.5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    {protocol.title}
                  </h3>
                  <div className="text-[11px] font-mono text-sky-400 mt-0.5">
                    {protocol.timing} • {protocol.duration}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pl-1 pt-1">
                {protocol.steps.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-start gap-2 text-xs text-[#cccccc] font-sans"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#161616] border border-[#262626] text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5 text-[#888888]">
                      {sIdx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
