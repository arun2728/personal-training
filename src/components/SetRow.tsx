"use client";

import { useRef, useState } from "react";
import { SetLog } from "@/types/workout";
import { Check, Video, Trash2, Play, Plus, Minus, X } from "lucide-react";

interface SetRowProps {
  setLog: SetLog;
  setIndex: number;
  onUpdate: (updated: SetLog) => void;
  onDelete: () => void;
}

export function SetRow({ setLog, setIndex, onUpdate, onDelete }: SetRowProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleWeightChange = (delta: number) => {
    const newWeight = Math.max(0, Math.round((setLog.weightKg + delta) * 10) / 10);
    onUpdate({ ...setLog, weightKg: newWeight });
  };

  const handleRepsChange = (delta: number) => {
    const newReps = Math.max(0, setLog.reps + delta);
    onUpdate({ ...setLog, reps: newReps });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create temporary local object URL for instant preview in session
    const objectUrl = URL.createObjectURL(file);
    onUpdate({
      ...setLog,
      videoUrl: objectUrl,
      videoFileName: file.name,
      videoBlob: file,
    });
  };

  const removeVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdate({
      ...setLog,
      videoUrl: undefined,
      videoFileName: undefined,
      videoBlob: undefined,
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <div
        className={`p-3.5 rounded-2xl border transition-all ${
          setLog.completed
            ? "bg-emerald-950/20 border-emerald-500/30 shadow-sm"
            : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          {/* Set Number Label & Status */}
          <div className="flex items-center gap-2">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                setLog.completed
                  ? "bg-emerald-500 text-slate-950 font-bold"
                  : "bg-slate-800 text-slate-400"
              }`}
            >
              {setIndex + 1}
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Set {setIndex + 1}
            </span>
          </div>

          {/* Quick Actions (Delete Set) */}
          <button
            onClick={onDelete}
            className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors cursor-pointer"
            title="Delete set"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Weight & Reps Stepper Grid */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          {/* Weight Stepper */}
          <div className="bg-slate-950/60 rounded-xl p-2.5 border border-slate-800/80">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1 flex justify-between">
              <span>Weight (kg)</span>
              <span className="text-indigo-400 font-mono font-bold">
                {setLog.weightKg} kg
              </span>
            </div>
            <div className="flex items-center justify-between gap-1">
              <button
                type="button"
                onClick={() => handleWeightChange(-2.5)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold text-xs active:scale-95 cursor-pointer"
                title="-2.5 kg"
              >
                -2.5
              </button>
              <input
                type="number"
                step="0.5"
                min="0"
                value={setLog.weightKg === 0 ? "" : setLog.weightKg}
                onChange={(e) =>
                  onUpdate({
                    ...setLog,
                    weightKg: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="0"
                className="w-16 text-center bg-transparent text-white font-mono font-bold text-base focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleWeightChange(2.5)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold text-xs active:scale-95 cursor-pointer"
                title="+2.5 kg"
              >
                +2.5
              </button>
            </div>
          </div>

          {/* Reps Stepper */}
          <div className="bg-slate-950/60 rounded-xl p-2.5 border border-slate-800/80">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1 flex justify-between">
              <span>Reps</span>
              <span className="text-amber-400 font-mono font-bold">
                {setLog.reps} reps
              </span>
            </div>
            <div className="flex items-center justify-between gap-1">
              <button
                type="button"
                onClick={() => handleRepsChange(-1)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold text-xs active:scale-95 cursor-pointer"
                title="-1 rep"
              >
                <Minus className="h-3 w-3" />
              </button>
              <input
                type="number"
                min="0"
                value={setLog.reps === 0 ? "" : setLog.reps}
                onChange={(e) =>
                  onUpdate({
                    ...setLog,
                    reps: parseInt(e.target.value, 10) || 0,
                  })
                }
                placeholder="0"
                className="w-16 text-center bg-transparent text-white font-mono font-bold text-base focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleRepsChange(1)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold text-xs active:scale-95 cursor-pointer"
                title="+1 rep"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Video Attachment & Completion Bar */}
        <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-slate-800/80">
          {/* Video Attachment Button / Indicator */}
          <div>
            <input
              type="file"
              ref={fileInputRef}
              accept="video/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {setLog.videoUrl ? (
              <div className="flex items-center gap-1.5 bg-indigo-950/40 border border-indigo-500/30 rounded-xl px-2.5 py-1 text-xs text-indigo-300">
                <button
                  type="button"
                  onClick={() => setShowVideoModal(true)}
                  className="flex items-center gap-1.5 font-medium hover:text-white cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5 text-indigo-400 fill-indigo-400" />
                  <span className="truncate max-w-[120px]">
                    {setLog.videoFileName || "View Video"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={removeVideo}
                  className="p-1 hover:text-rose-400 rounded cursor-pointer"
                  title="Remove video"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700/60 transition-colors cursor-pointer"
              >
                <Video className="h-3.5 w-3.5 text-indigo-400" />
                <span>Attach Video</span>
              </button>
            )}
          </div>

          {/* Mark Done Toggle */}
          <button
            type="button"
            onClick={() => onUpdate({ ...setLog, completed: !setLog.completed })}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
              setLog.completed
                ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            }`}
          >
            <Check
              className={`h-3.5 w-3.5 ${
                setLog.completed ? "text-white" : "text-slate-400"
              }`}
            />
            <span>{setLog.completed ? "Done" : "Mark Done"}</span>
          </button>
        </div>
      </div>

      {/* Video Modal Preview */}
      {showVideoModal && setLog.videoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 w-full max-w-md shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800">
              <span className="text-sm font-semibold text-slate-200">
                Set {setIndex + 1} Recording Review
              </span>
              <button
                onClick={() => setShowVideoModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center">
              <video
                src={setLog.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
            <div className="mt-3 text-center">
              <button
                onClick={() => setShowVideoModal(false)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
