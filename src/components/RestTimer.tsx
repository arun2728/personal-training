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
      // Native vibration if on mobile
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
        className="fixed bottom-20 right-4 z-40 bg-indigo-600 hover:bg-indigo-500 text-white p-3.5 rounded-full shadow-lg shadow-indigo-600/30 flex items-center gap-2 text-sm font-semibold transition-all transform active:scale-95 cursor-pointer"
        title="Open Rest Timer"
      >
        <Timer className="h-5 w-5" />
        {isRunning && <span className="font-mono text-xs">{formatTime(secondsLeft)}</span>}
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:w-80 z-40 bg-slate-900/95 border border-slate-700/80 backdrop-blur-xl rounded-2xl p-4 shadow-2xl shadow-black/60">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Timer className="h-4 w-4 text-indigo-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Rest Stopwatch
          </span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-slate-200 p-1 rounded-lg"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Timer Display */}
      <div className="flex items-center justify-between mb-3">
        <div
          className={`font-mono text-3xl font-bold tracking-tight ${
            secondsLeft === 0
              ? "text-rose-400 animate-pulse"
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
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-medium flex items-center gap-0.5 cursor-pointer"
            title="+30 seconds"
          >
            <Plus className="h-3 w-3" />
            30s
          </button>
          <button
            onClick={() => resetTimer(initialSeconds)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={toggleRun}
            className={`p-2.5 rounded-xl font-medium cursor-pointer ${
              isRunning
                ? "bg-amber-600 hover:bg-amber-500 text-white"
                : "bg-indigo-600 hover:bg-indigo-500 text-white"
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
            className={`py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              initialSeconds === secs
                ? "bg-indigo-600/30 border border-indigo-500 text-indigo-300"
                : "bg-slate-800/80 hover:bg-slate-800 text-slate-400 border border-transparent"
            }`}
          >
            {secs}s
          </button>
        ))}
      </div>
    </div>
  );
}
