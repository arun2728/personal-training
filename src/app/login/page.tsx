"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, AlertCircle, Lock } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Please enter the PT passcode.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Incorrect password. Try again.");
        setLoading(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Connection error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-black text-[#ededed] relative overflow-hidden vercel-glow">
      {/* Background subtle grid pattern */}
      <div className="absolute inset-0 vercel-grid opacity-30 pointer-events-none" />

      <div className="w-full max-w-sm bg-[#0a0a0a] border border-[#222222] rounded-2xl p-7 shadow-2xl relative z-10">
        {/* Vercel Geometric Triangle Brand & Title */}
        <div className="flex flex-col items-center text-center mb-7">
          <div className="w-12 h-12 rounded-xl bg-black border border-[#333333] flex items-center justify-center mb-4 shadow-sm">
            <svg
              width="22"
              height="19"
              viewBox="0 0 76 65"
              fill="#ffffff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
          </div>
          
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#2a2a2a] bg-[#111111] text-[11px] font-mono tracking-wider text-[#888888] mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            PT://ARUN-AANCHAL
          </div>

          <h1 className="text-xl font-semibold tracking-tight text-white">
            Workout Tracker
          </h1>
          <p className="text-xs text-[#888888] mt-1">
            5-Day Training Plan &amp; Daily Logging
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-[#140808] border border-[#3b1212] text-[#ff6666] text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#888888] mb-1.5">
              Passcode
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#666666]">
                <Lock className="h-3.5 w-3.5" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter passcode..."
                className="w-full pl-9 pr-3.5 py-2.5 bg-black border border-[#2a2a2a] rounded-xl text-sm text-white placeholder-[#555555] focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all font-mono"
                autoComplete="current-password"
                autoFocus
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-white hover:bg-[#eaeaea] active:bg-[#d4d4d4] disabled:opacity-50 text-black text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            {loading ? (
              <div className="h-4 w-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-[#1f1f1f] text-center">
          <p className="text-[11px] text-[#555555] font-mono">
            Vercel-protected edge environment
          </p>
        </div>
      </div>
    </main>
  );
}
