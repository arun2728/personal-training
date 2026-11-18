"use client";

import { useState } from "react";
import { WorkoutSession } from "@/types/workout";
import {
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
  let totalFeedbacks = 0;

  session.exercises.forEach((ex) => {
    if (ex.coachFeedback?.comment) {
      totalFeedbacks += 1;
    }
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

      if (ex.coachFeedback?.comment) {
        const tag = ex.coachFeedback.status ? `[${ex.coachFeedback.status.toUpperCase()}] ` : "";
        text += `   💬 *Aanchal's Review*: ${tag}"${ex.coachFeedback.comment}"\n`;
      }
      text += `\n`;
    });

    text += `🔥 Total Volume: ${totalVolumeKg.toLocaleString()} kg\n`;
    text += `✅ Completed Sets: ${totalSetsCompleted}\n`;
    if (totalVideos > 0) text += `📹 Videos: ${totalVideos} set recordings ready for review\n`;
    if (totalFeedbacks > 0) text += `💬 Coach Reviews: ${totalFeedbacks} exercises reviewed\n`;

    return text;
  };

  const generateSheetTsv = () => {
    let tsv = "Date\tWorkout Day\tExercise\tSet\tWeight (kg)\tReps\tVolume (kg)\tVideo Status\tCoach Feedback\n";
    session.exercises.forEach((ex) => {
      ex.sets.forEach((s) => {
        if (s.completed) {
          const volume = s.weightKg * s.reps;
          const video = s.videoFileName ? `Attached (${s.videoFileName})` : "None";
          const feedback = ex.coachFeedback?.comment || "";
          tsv += `${session.date}\t${session.dayTitle}\t${ex.exerciseName}\tSet ${s.setNumber}\t${s.weightKg}\t${s.reps}\t${volume}\t${video}\t${feedback}\n`;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0a0a0a] border border-[#222222] rounded-2xl p-6 w-full max-w-lg shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#888888] hover:text-white p-1 rounded-lg"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-xl bg-black border border-[#2a2a2a] flex items-center justify-center mx-auto mb-3 text-white shadow-sm">
            <svg
              width="16"
              height="14"
              viewBox="0 0 76 65"
              fill="#ffffff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-white tracking-tight">
            Workout Finished
          </h2>
          <p className="text-xs text-[#888888] font-mono mt-1">
            {session.dayTitle} • {session.date}
          </p>
        </div>

        {/* High-Level Stats */}
        <div className={`grid ${totalFeedbacks > 0 ? "grid-cols-4" : "grid-cols-3"} gap-2 mb-5`}>
          <div className="bg-black border border-[#222222] rounded-xl p-2.5 text-center">
            <div className="text-[10px] uppercase font-mono tracking-wider text-[#666666]">
              Volume
            </div>
            <div className="text-sm sm:text-base font-bold font-mono text-white mt-1">
              {totalVolumeKg.toLocaleString()}
            </div>
            <div className="text-[9px] text-[#666666] font-mono">kg total</div>
          </div>

          <div className="bg-black border border-[#222222] rounded-xl p-2.5 text-center">
            <div className="text-[10px] uppercase font-mono tracking-wider text-[#666666]">
              Sets Done
            </div>
            <div className="text-sm sm:text-base font-bold font-mono text-emerald-400 mt-1">
              {totalSetsCompleted}
            </div>
            <div className="text-[9px] text-[#666666] font-mono">completed</div>
          </div>

          <div className="bg-black border border-[#222222] rounded-xl p-2.5 text-center">
            <div className="text-[10px] uppercase font-mono tracking-wider text-[#666666]">
              Videos
            </div>
            <div className="text-sm sm:text-base font-bold font-mono text-white mt-1">
              {totalVideos}
            </div>
            <div className="text-[9px] text-[#666666] font-mono">clips ready</div>
          </div>

          {totalFeedbacks > 0 && (
            <div className="bg-black border border-[#1b3823] rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-mono tracking-wider text-emerald-400">
                Reviews
              </div>
              <div className="text-sm sm:text-base font-bold font-mono text-emerald-400 mt-1">
                {totalFeedbacks}
              </div>
              <div className="text-[9px] text-emerald-500/70 font-mono">logged</div>
            </div>
          )}
        </div>

        {/* Direct Google Sheets Sync */}
        <div className="mb-4 p-3.5 rounded-xl bg-black border border-[#222222]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4 text-[#ededed]" />
              <span className="text-xs font-medium text-white">
                Google Sheet Sync
              </span>
            </div>
            <button
              onClick={handleSyncToSheets}
              disabled={syncing}
              className="px-3 py-1 bg-white hover:bg-[#eaeaea] text-black rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              <UploadCloud className="h-3.5 w-3.5" />
              <span>{syncing ? "Syncing..." : "Sync Now"}</span>
            </button>
          </div>

          {syncStatus === "success" && (
            <div className="p-2.5 rounded-lg bg-[#0e1610] border border-[#1d3823] text-emerald-300 text-xs flex items-center gap-2 mt-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>{syncMessage}</span>
            </div>
          )}

          {syncStatus === "error" && (
            <div className="p-2.5 rounded-lg bg-[#140c0c] border border-[#301a1a] text-[#ff8080] text-xs flex items-start gap-2 mt-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-[#ff6666] mt-0.5" />
              <div>
                <p>{syncMessage}</p>
                <p className="mt-1 text-[11px] text-[#888888]">
                  Tip: Click &ldquo;Copy for Sheet&rdquo; below to paste rows directly into your spreadsheet.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Share Buttons */}
        <div className="space-y-2 mb-5">
          <button
            onClick={copyWhatsApp}
            className="w-full py-2.5 px-4 rounded-xl bg-[#141414] hover:bg-[#202020] border border-[#2e2e2e] text-white text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {copiedWhatsapp ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied WhatsApp Summary!</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5 text-white" />
                <span>Copy Summary for Aanchal (WhatsApp)</span>
              </>
            )}
          </button>

          <button
            onClick={copySheetData}
            className="w-full py-2.5 px-4 rounded-xl bg-black hover:bg-[#111111] border border-[#222222] hover:border-[#333333] text-[#888888] hover:text-white text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {copiedSheet ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-sans">Copied Sheet Columns!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Raw Rows for Google Sheet</span>
              </>
            )}
          </button>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-[#1f1f1f]">
          <button
            onClick={onResetSession}
            className="flex-1 py-2 text-xs text-[#888888] hover:text-[#ff6666] rounded-lg transition-colors font-mono"
          >
            Reset Session
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 text-xs bg-[#141414] hover:bg-[#202020] text-white font-medium rounded-lg transition-colors border border-[#2a2a2a]"
          >
            Back to Workout
          </button>
        </div>
      </div>
    </div>
  );
}
