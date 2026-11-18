"use client";

import { useRouter } from "next/navigation";
import { LogOut, CheckCircle, Calendar } from "lucide-react";

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
      router.push("/login");
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-[#222222] px-4 py-3">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] flex items-center justify-center text-white shrink-0 shadow-sm">
            <svg
              width="15"
              height="13"
              viewBox="0 0 76 65"
              fill="#ffffff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold tracking-tight text-white">
                Workout Tracker
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded border border-[#2a2a2a] bg-[#111111] text-[#888888]">
                Arun
              </span>
            </div>
            <p className="text-[10px] text-[#666666] font-mono">
              Coach: Aanchal
            </p>
          </div>
        </div>

        {/* Date & Actions */}
        <div className="flex items-center gap-2">
          {/* Workout Date Picker */}
          <div className="relative flex items-center bg-[#0a0a0a] border border-[#2a2a2a] hover:border-[#444444] rounded-lg px-2 py-1 text-xs text-[#ededed] transition-colors">
            <Calendar className="h-3.5 w-3.5 text-[#888888] mr-1.5 shrink-0" />
            <input
              type="date"
              value={workoutDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="bg-transparent text-xs text-[#ededed] focus:outline-none cursor-pointer font-mono"
            />
          </div>

          {/* Finish & Sync Button */}
          <button
            onClick={onFinishWorkout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#eaeaea] active:bg-[#d4d4d4] text-black text-xs font-semibold transition-all cursor-pointer shadow-sm"
          >
            <CheckCircle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Finish</span>
            {completedSetsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-black/10 text-[10px] font-mono font-bold">
                {completedSetsCount}
              </span>
            )}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="p-1.5 text-[#666666] hover:text-white rounded-lg hover:bg-[#111111] transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
