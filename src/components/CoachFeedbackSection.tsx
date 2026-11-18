"use client";

import { useState } from "react";
import { CoachFeedback, FeedbackStatus } from "@/types/workout";
import {
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Edit2,
  Trash2,
  CornerDownRight,
  Sparkles,
} from "lucide-react";

interface CoachFeedbackSectionProps {
  exerciseName: string;
  feedback?: CoachFeedback;
  onSaveFeedback: (feedback: CoachFeedback | undefined) => void;
}

const FEEDBACK_PRESETS = [
  "Form looks solid, ready to increase weight +2.5kg",
  "Control the eccentric (negative) on the last 2 reps",
  "Great depth and lockout on all sets",
  "Keep elbows tucked, avoid flaring out",
  "Pace was too fast, pause 1s at peak contraction",
  "Good intensity today, maintain this weight",
];

export function CoachFeedbackSection({
  exerciseName,
  feedback,
  onSaveFeedback,
}: CoachFeedbackSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState(feedback?.comment || "");
  const [status, setStatus] = useState<FeedbackStatus>(
    feedback?.status || "approved"
  );

  const handleStartEdit = () => {
    setComment(feedback?.comment || "");
    setStatus(feedback?.status || "approved");
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!comment.trim()) {
      onSaveFeedback(undefined);
      setIsEditing(false);
      return;
    }

    onSaveFeedback({
      comment: comment.trim(),
      status,
      updatedAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    onSaveFeedback(undefined);
    setComment("");
    setIsEditing(false);
  };

  const addPreset = (text: string) => {
    setComment((prev) => (prev ? `${prev}. ${text}` : text));
  };

  const renderStatusBadge = (s?: FeedbackStatus) => {
    switch (s) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#0e1a11] text-emerald-400 border border-[#1b3823]">
            <CheckCircle2 className="h-3 w-3" />
            Form Approved
          </span>
        );
      case "increase-weight":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#0b1424] text-sky-400 border border-[#162f55]">
            <ArrowUpRight className="h-3 w-3" />
            Increase Weight
          </span>
        );
      case "needs-adjustment":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#1c1408] text-amber-400 border border-[#3d2a0f]">
            <AlertTriangle className="h-3 w-3" />
            Adjust Form
          </span>
        );
      case "decrease-weight":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#1f0d0d] text-rose-400 border border-[#421b1b]">
            <ArrowDownRight className="h-3 w-3" />
            Lower Weight
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono text-[#888888] bg-[#141414] border border-[#262626]">
            Review
          </span>
        );
    }
  };

  // 1. If currently editing or adding
  if (isEditing) {
    return (
      <div className="mt-3 p-3.5 rounded-xl bg-black border border-[#2a2a2a] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-white text-black font-mono font-bold text-[10px] flex items-center justify-center">
              A
            </div>
            <span className="text-xs font-semibold text-white tracking-tight">
              Aanchal&apos;s Review for {exerciseName}
            </span>
          </div>
          <button
            onClick={() => setIsEditing(false)}
            className="text-[11px] font-mono text-[#888888] hover:text-white"
          >
            Cancel
          </button>
        </div>

        {/* Status Selection Pills */}
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666666] mb-1.5">
            Evaluation Tag
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {(
              [
                { id: "approved", label: "Approved Form" },
                { id: "increase-weight", label: "+ Increase Wt" },
                { id: "needs-adjustment", label: "Needs Adjust" },
                { id: "decrease-weight", label: "- Lower Wt" },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setStatus(item.id)}
                className={`py-1.5 px-2 rounded-lg text-[11px] font-mono transition-all cursor-pointer ${
                  status === item.id
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "bg-[#111111] hover:bg-[#1a1a1a] text-[#888888] border border-[#222222]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Comment Textarea */}
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666666] mb-1.5">
            Coach Feedback &amp; Form Notes
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder={`Enter Aanchal's feedback for ${exerciseName} across all sets...`}
            className="w-full p-2.5 bg-[#0a0a0a] border border-[#262626] focus:border-white focus:ring-1 focus:ring-white rounded-lg text-xs text-white placeholder-[#555555] focus:outline-none transition-all leading-relaxed"
            autoFocus
          />
        </div>

        {/* Quick Suggestion Presets */}
        <div>
          <span className="text-[10px] font-mono text-[#555555] block mb-1 flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> Quick Cues:
          </span>
          <div className="flex flex-wrap gap-1">
            {FEEDBACK_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => addPreset(preset)}
                className="px-2 py-0.5 rounded-md bg-[#141414] hover:bg-[#1f1f1f] border border-[#222222] text-[#888888] hover:text-[#ededed] text-[10px] font-mono truncate max-w-[200px] cursor-pointer"
                title={preset}
              >
                + {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-[#1a1a1a]">
          {feedback && (
            <button
              type="button"
              onClick={handleDelete}
              className="text-[#666666] hover:text-[#ff6666] p-1 text-xs flex items-center gap-1 font-mono transition-colors cursor-pointer"
            >
              <Trash2 className="h-3 w-3" />
              <span>Remove</span>
            </button>
          )}
          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 rounded-lg bg-[#111111] hover:bg-[#1a1a1a] text-[#888888] hover:text-white text-xs font-mono border border-[#222222] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-[#eaeaea] text-black text-xs font-semibold cursor-pointer shadow-sm transition-all"
            >
              Save Feedback
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. If feedback exists (View mode)
  if (feedback && feedback.comment) {
    return (
      <div className="mt-3 p-3 rounded-xl bg-[#0b0f0c] border border-[#1b2b1e] relative group">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono font-bold text-[10px] flex items-center justify-center">
              A
            </div>
            <span className="text-[11px] font-mono font-semibold text-emerald-400 tracking-wider">
              COACH AANCHAL
            </span>
            {renderStatusBadge(feedback.status)}
          </div>

          <div className="flex items-center gap-2">
            {feedback.updatedAt && (
              <span className="text-[10px] font-mono text-[#666666]">
                {feedback.updatedAt}
              </span>
            )}
            <button
              type="button"
              onClick={handleStartEdit}
              className="text-[#666666] hover:text-white p-1 rounded hover:bg-[#141414] transition-colors cursor-pointer"
              title="Edit Feedback"
            >
              <Edit2 className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Feedback Quote Text */}
        <div className="flex items-start gap-2 pl-1">
          <CornerDownRight className="h-3.5 w-3.5 text-emerald-500/60 shrink-0 mt-0.5" />
          <p className="text-xs text-[#d1d5db] leading-relaxed font-sans italic">
            &ldquo;{feedback.comment}&rdquo;
          </p>
        </div>
      </div>
    );
  }

  // 3. If no feedback yet (Collapsed prompt)
  return (
    <div className="mt-2.5 pt-1">
      <button
        type="button"
        onClick={handleStartEdit}
        className="w-full py-2 px-3 rounded-xl bg-[#0a0a0a] hover:bg-[#121212] border border-[#1f1f1f] hover:border-[#2e2e2e] text-[#777777] hover:text-[#cccccc] text-xs font-mono flex items-center justify-between transition-colors cursor-pointer group"
      >
        <span className="flex items-center gap-2">
          <MessageSquare className="h-3.5 w-3.5 text-[#555555] group-hover:text-white transition-colors" />
          <span>Aanchal&apos;s Feedback on Sets</span>
        </span>
        <span className="text-[10px] uppercase tracking-wider text-[#555555] group-hover:text-[#888888] font-semibold">
          + Add Review
        </span>
      </button>
    </div>
  );
}
