"use client";

import { useState } from "react";
import { HistoricalFeedback, FeedbackStatus } from "@/types/workout";
import {
  History,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";

interface PreviousFeedbackBannerProps {
  previousFeedback: HistoricalFeedback;
  exerciseName: string;
}

export function PreviousFeedbackBanner({
  previousFeedback,
  exerciseName,
}: PreviousFeedbackBannerProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const renderBadge = (status?: FeedbackStatus) => {
    switch (status) {
      case "increase-weight":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#0b1424] text-sky-400 border border-[#162f55]">
            <ArrowUpRight className="h-3 w-3" />
            Bump Weight Today
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#0e1a11] text-emerald-400 border border-[#1b3823]">
            <CheckCircle2 className="h-3 w-3" />
            Form Approved
          </span>
        );
      case "needs-adjustment":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#1c1408] text-amber-400 border border-[#3d2a0f]">
            <AlertTriangle className="h-3 w-3" />
            Watch Form Today
          </span>
        );
      case "decrease-weight":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#1f0d0d] text-rose-400 border border-[#421b1b]">
            <ArrowDownRight className="h-3 w-3" />
            Focus on Form
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-3 rounded-xl bg-[#090c10] border border-[#182333] overflow-hidden transition-all">
      {/* Banner Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-3.5 py-2.5 flex items-center justify-between cursor-pointer select-none bg-[#0c1017] border-b border-[#182333]/60"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <div className="w-5 h-5 rounded-md bg-[#131b26] border border-[#1e2e42] flex items-center justify-center text-sky-400">
            <History className="h-3 w-3" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold">
            Prior Week Feedback
          </span>
          <span className="text-[10px] font-mono text-[#666666]">
            • {previousFeedback.date}
          </span>
          {renderBadge(previousFeedback.status)}
        </div>

        <button
          type="button"
          className="text-[#666666] hover:text-[#ededed] p-0.5 rounded"
        >
          {isExpanded ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* Expanded Content: Aanchal's Prior Feedback */}
      {isExpanded && (
        <div className="p-3.5 space-y-2">
          <div className="flex items-start gap-2">
            <div className="text-sky-400/80 font-mono text-xs mt-0.5 font-bold">
              Coach:
            </div>
            <p className="text-xs text-[#d1d5db] leading-relaxed italic">
              &ldquo;{previousFeedback.comment}&rdquo;
            </p>
          </div>

          {/* Previous Weight & Reps context if available */}
          {previousFeedback.lastWeightKg !== undefined && (
            <div className="pt-2 border-t border-[#141b24] flex items-center justify-between text-[11px] font-mono text-[#888888]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-sky-400" />
                <span>Last session best:</span>
              </span>
              <span className="text-white font-medium">
                {previousFeedback.lastWeightKg} kg
                {previousFeedback.lastReps ? ` × ${previousFeedback.lastReps} reps` : ""}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
