"use client";

import { useState, useEffect, useRef } from "react";
import { Timer, Play, Pause, RotateCcw, Plus, X } from "lucide-react";

export function RestTimer() {
  const [isOpen, setIsOpen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(90);
  const [initialSeconds, setInitialSeconds] = useState(90);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      timerRef.current = setTimeout(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      if (typeof window !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isRunning, secondsLeft]);

  const toggleRun = () => setIsRunning(!isRunning);

  const resetTimer = (secs: number = initialSeconds) => {
    setIsRunning(false);
    setInitialSeconds(secs);
    setSecondsLeft(secs);
  };

  const addTime = (secs: number) => {
    setSecondsLeft((prev) => prev + secs);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}:${remaining.toString().padStart(2, "0")}`;
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          setIsOpen(true);
          setIsRunning(true);
        }}
        className="fixed bottom-20 right-4 z-40 bg-white hover:bg-[#eaeaea] text-black px-3.5 py-3 rounded-full shadow-xl border border-white/20 flex items-center gap-2 text-xs font-semibold font-mono transition-all transform active:scale-95 cursor-pointer"
        title="Open Rest Timer"
      >
        <Timer className="h-4 w-4" />
        {isRunning ? (
          <span>{formatTime(secondsLeft)}</span>
        ) : (
          <span>Timer</span>
        )}
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:w-80 z-40 bg-[#0a0a0a]/95 border border-[#2a2a2a] backdrop-blur-xl rounded-2xl p-4 shadow-2xl">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#222222]">
        <div className="flex items-center gap-2">
          <Timer className="h-4 w-4 text-white" />
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#888888]">
            Rest Stopwatch
          </span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-[#888888] hover:text-white p-1 rounded-lg"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Timer Display */}
      <div className="flex items-center justify-between mb-3">
        <div
          className={`font-mono text-3xl font-bold tracking-tight ${
            secondsLeft === 0
              ? "text-[#ff6666] animate-pulse"
              : secondsLeft <= 10
              ? "text-amber-400"
              : "text-white"
          }`}
        >
          {formatTime(secondsLeft)}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => addTime(30)}
            className="p-2 rounded-lg bg-[#141414] hover:bg-[#202020] border border-[#262626] text-xs text-[#ededed] font-mono flex items-center gap-0.5 cursor-pointer"
            title="+30 seconds"
          >
            <Plus className="h-3 w-3" />
            30s
          </button>
          <button
            onClick={() => resetTimer(initialSeconds)}
            className="p-2 rounded-lg bg-[#141414] hover:bg-[#202020] border border-[#262626] text-[#888888] hover:text-white cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={toggleRun}
            className={`p-2 rounded-lg font-medium cursor-pointer transition-colors ${
              isRunning
                ? "bg-[#222222] text-white border border-[#333333]"
                : "bg-white text-black hover:bg-[#eaeaea]"
            }`}
          >
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Preset Quick Buttons */}
      <div className="grid grid-cols-4 gap-1.5 pt-1">
        {[45, 60, 90, 120].map((secs) => (
          <button
            key={secs}
            onClick={() => resetTimer(secs)}
            className={`py-1 rounded-lg text-xs font-mono font-medium cursor-pointer transition-colors ${
              initialSeconds === secs
                ? "bg-white text-black font-semibold"
                : "bg-[#111111] hover:bg-[#1a1a1a] text-[#888888] border border-[#222222]"
            }`}
          >
            {secs}s
          </button>
        ))}
      </div>
    </div>
  );
}
