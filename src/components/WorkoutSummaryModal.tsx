"use client";

import { useState } from "react";
import { WorkoutSession } from "@/types/workout";
import {
  Trophy,
  Copy,
  Check,
  Share2,
  FileSpreadsheet,
  X,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface WorkoutSummaryModalProps {
  session: WorkoutSession;
  onClose: () => void;
  onResetSession: () => void;
}

export function WorkoutSummaryModal({
  session,
  onClose,
  onResetSession,
}: WorkoutSummaryModalProps) {
  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false);
  const [copiedSheet, setCopiedSheet] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [syncMessage, setSyncMessage] = useState("");

  // Calculate volume & completed stats
  let totalVolumeKg = 0;
  let totalSetsCompleted = 0;
  let totalVideos = 0;

  session.exercises.forEach((ex) => {
    ex.sets.forEach((set) => {
      if (set.completed) {
        totalSetsCompleted += 1;
        totalVolumeKg += set.weightKg * set.reps;
        if (set.videoFileName || set.videoUrl) {
          totalVideos += 1;
        }
      }
    });
  });

  // Generate WhatsApp / Telegram share text
  const generateShareText = () => {
    let text = `🏋️‍♂️ Workout Summary — ${session.dayTitle}\n`;
    text += `📅 Date: ${session.date}\n`;
    text += `Coach: Aanchal | Trainee: Arun\n\n`;

    session.exercises.forEach((ex, idx) => {
      const completedSets = ex.sets.filter((s) => s.completed);
      if (completedSets.length === 0) return;

      text += `${idx + 1}. *${ex.exerciseName}*\n`;
      completedSets.forEach((s) => {
        const videoTag = s.videoFileName ? ` [📹 Video Attached]` : "";
        text += `   • Set ${s.setNumber}: ${s.weightKg} kg × ${s.reps} reps${videoTag}\n`;
      });
      text += `\n`;
    });

    text += `🔥 Total Volume: ${totalVolumeKg.toLocaleString()} kg\n`;
    text += `✅ Completed Sets: ${totalSetsCompleted}\n`;
    if (totalVideos > 0) text += `📹 Videos: ${totalVideos} set recordings ready for review\n`;

    return text;
  };

  // Generate Tab-Delimited text ready to paste directly into Google Sheets
  const generateSheetTsv = () => {
    let tsv = "Date\tWorkout Day\tExercise\tSet\tWeight (kg)\tReps\tVolume (kg)\tVideo Status\n";
    session.exercises.forEach((ex) => {
      ex.sets.forEach((s) => {
        if (s.completed) {
          const volume = s.weightKg * s.reps;
          const video = s.videoFileName ? `Attached (${s.videoFileName})` : "None";
          tsv += `${session.date}\t${session.dayTitle}\t${ex.exerciseName}\tSet ${s.setNumber}\t${s.weightKg}\t${s.reps}\t${volume}\t${video}\n`;
        }
      });
    });
    return tsv;
  };

  const copyWhatsApp = async () => {
    try {
      await navigator.clipboard.writeText(generateShareText());
      setCopiedWhatsapp(true);
      setTimeout(() => setCopiedWhatsapp(false), 2500);
    } catch {
      // Fallback
    }
  };

  const copySheetData = async () => {
    try {
      await navigator.clipboard.writeText(generateSheetTsv());
      setCopiedSheet(true);
      setTimeout(() => setCopiedSheet(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleSyncToSheets = async () => {
    setSyncing(true);
    setSyncStatus("idle");
    setSyncMessage("");

    try {
      const res = await fetch("/api/sync/sheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to sync to Google Sheets");
      }

      setSyncStatus("success");
      setSyncMessage(data.message || "Synced successfully to Aanchal's Google Sheet!");
    } catch (err: unknown) {
      setSyncStatus("error");
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Google Sheet credentials not yet configured. Use One-Click Copy below to paste directly!";
      setSyncMessage(errorMsg);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-xl"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Celebration */}
        <div className="text-center mb-6">
          <div className="h-14 w-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Trophy className="h-7 w-7" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Workout Completed! 💪
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {session.dayTitle} • {session.date}
          </p>
        </div>

        {/* High-Level Stats Cards */}
        <div className="grid grid-cols-3 gap-2.5 mb-6">
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3 text-center">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
              Volume
            </div>
            <div className="text-sm sm:text-base font-bold font-mono text-indigo-400 mt-1">
              {totalVolumeKg.toLocaleString()}
            </div>
            <div className="text-[9px] text-slate-400">kg lifted</div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3 text-center">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
              Sets Done
            </div>
            <div className="text-sm sm:text-base font-bold font-mono text-emerald-400 mt-1">
              {totalSetsCompleted}
            </div>
            <div className="text-[9px] text-slate-400">completed</div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3 text-center">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
              Videos
            </div>
            <div className="text-sm sm:text-base font-bold font-mono text-amber-400 mt-1">
              {totalVideos}
            </div>
            <div className="text-[9px] text-slate-400">set clips</div>
          </div>
        </div>

        {/* Direct Google Sheets Sync */}
        <div className="mb-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-semibold text-slate-200">
                Aanchal&apos;s Google Sheet
              </span>
            </div>
            <button
              onClick={handleSyncToSheets}
              disabled={syncing}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              <UploadCloud className="h-3.5 w-3.5" />
              <span>{syncing ? "Syncing..." : "Sync Now"}</span>
            </button>
          </div>

          {syncStatus === "success" && (
            <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 mt-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>{syncMessage}</span>
            </div>
          )}

          {syncStatus === "error" && (
            <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2 mt-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
              <div>
                <p>{syncMessage}</p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Tip: Use the &ldquo;Copy for Sheet&rdquo; button below to paste rows directly into your sheet right now.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Quick Action Share Buttons */}
        <div className="space-y-2.5 mb-6">
          {/* WhatsApp Text Share */}
          <button
            onClick={copyWhatsApp}
            className="w-full py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/20"
          >
            {copiedWhatsapp ? (
              <>
                <Check className="h-4 w-4 text-emerald-300" />
                <span>Copied WhatsApp Summary to Clipboard!</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4" />
                <span>Copy Summary for Aanchal (WhatsApp)</span>
              </>
            )}
          </button>

          {/* Sheet Row Format Copy */}
          <button
            onClick={copySheetData}
            className="w-full py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 active:bg-slate-800 text-slate-200 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-700"
          >
            {copiedSheet ? (
              <>
                <Check className="h-4 w-4 text-emerald-300" />
                <span>Copied Sheet Columns to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy Raw Rows for Google Sheet (Paste Anywhere)</span>
              </>
            )}
          </button>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
          <button
            onClick={onResetSession}
            className="flex-1 py-2.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors"
          >
            Start Fresh Workout
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl transition-colors"
          >
            Keep Editing
          </button>
        </div>
      </div>
    </div>
  );
}
