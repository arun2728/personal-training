"use client";

import { useRouter } from "next/navigation";
import { Dumbbell, LogOut, CheckCircle, Calendar } from "lucide-react";

interface NavbarProps {
  workoutDate: string;
  onDateChange: (date: string) => void;
  onFinishWorkout: () => void;
  completedSetsCount: number;
}

export function Navbar({
  workoutDate,
  onDateChange,
  onFinishWorkout,
  completedSetsCount,
}: NavbarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch {
      // Fallback redirect
      router.push("/login");
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Dumbbell className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm font-bold text-white tracking-tight">
                PT Tracker
              </h1>
              <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-indigo-950 border border-indigo-500/30 text-indigo-300">
                Arun
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Coach: Aanchal</p>
          </div>
        </div>

        {/* Date & Actions */}
        <div className="flex items-center gap-2">
          {/* Workout Date Picker */}
          <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-300">
            <Calendar className="h-3.5 w-3.5 text-slate-400 mr-1.5 shrink-0" />
            <input
              type="date"
              value={workoutDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            />
          </div>

          {/* Finish & Sync Button */}
          <button
            onClick={onFinishWorkout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <CheckCircle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Finish</span>
            {completedSetsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-indigo-800/80 text-[10px] font-mono">
                {completedSetsCount}
              </span>
            )}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-slate-900 transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
