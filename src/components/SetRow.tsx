"use client";

import { useRef, useState } from "react";
import { SetLog } from "@/types/workout";
import { compressVideo } from "@/lib/videoCompressor";
import {
  Check,
  Video,
  Trash2,
  Play,
  Plus,
  Minus,
  X,
  Loader2,
  Flame,
} from "lucide-react";

interface SetRowProps {
  setLog: SetLog;
  setIndex: number;
  isWarmup?: boolean;
  workingSetNumber?: number;
  onUpdate: (updated: SetLog) => void;
  onDelete: () => void;
}

export function SetRow({
  setLog,
  setIndex,
  isWarmup = false,
  workingSetNumber,
  onUpdate,
  onDelete,
}: SetRowProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [compressProgress, setCompressProgress] = useState<number | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleWeightChange = (delta: number) => {
    const newWeight = Math.max(0, Math.round((setLog.weightKg + delta) * 10) / 10);
    onUpdate({ ...setLog, weightKg: newWeight });
  };

  const handleRepsChange = (delta: number) => {
    const newReps = Math.max(0, setLog.reps + delta);
    onUpdate({ ...setLog, reps: newReps });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // First create preview object URL immediately so user gets instant feedback
    const previewUrl = URL.createObjectURL(file);
    onUpdate({
      ...setLog,
      videoUrl: previewUrl,
      videoFileName: file.name,
      videoBlob: file,
      isCompressing: true,
    });

    // Run client-side compression in background
    setIsCompressing(true);
    setCompressProgress(1);

    try {
      const result = await compressVideo(file, {
        onProgress: (p) => setCompressProgress(p),
      });

      const compressedUrl = URL.createObjectURL(result.file);
      onUpdate({
        ...setLog,
        videoUrl: compressedUrl,
        compressedVideoUrl: compressedUrl,
        videoFileName: result.file instanceof File ? result.file.name : file.name,
        videoBlob: result.file,
        compressionRatio: result.reductionPercentage,
        isCompressing: false,
      });
    } catch {
      // Fall back to original file if compression failed
      onUpdate({
        ...setLog,
        videoUrl: previewUrl,
        videoFileName: file.name,
        videoBlob: file,
        isCompressing: false,
      });
    } finally {
      setIsCompressing(false);
      setCompressProgress(null);
    }
  };

  const removeVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdate({
      ...setLog,
      videoUrl: undefined,
      compressedVideoUrl: undefined,
      videoFileName: undefined,
      videoBlob: undefined,
      compressionRatio: undefined,
      isCompressing: false,
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <div
        className={`p-3 rounded-xl border transition-all ${
          setLog.completed
            ? isWarmup
              ? "bg-[#141009] border-[#38260d]"
              : "bg-[#0b140e] border-[#1d3823]"
            : isWarmup
            ? "bg-[#0c0a06] border-[#291e10] hover:border-[#3d2a12]"
            : "bg-[#0a0a0a] border-[#1f1f1f] hover:border-[#2a2a2a]"
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          {/* Set Number Label */}
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-mono font-bold ${
                setLog.completed
                  ? isWarmup
                    ? "bg-amber-500 text-black"
                    : "bg-emerald-500 text-black"
                  : isWarmup
                  ? "bg-[#211709] border border-[#3d2a10] text-amber-400"
                  : "bg-[#161616] border border-[#2a2a2a] text-[#888888]"
              }`}
            >
              {isWarmup ? "W" : workingSetNumber || setIndex + 1}
            </span>
            <div className="flex items-center gap-1.5">
              <span
                className={`text-[11px] font-mono uppercase tracking-wider font-semibold ${
                  isWarmup ? "text-amber-400" : "text-[#888888]"
                }`}
              >
                {isWarmup
                  ? `Warmup Set ${setIndex + 1}`
                  : `Working Set ${workingSetNumber || setIndex + 1}`}
              </span>
              {isWarmup && (
                <span className="inline-flex items-center gap-0.5 text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Flame className="h-2.5 w-2.5" />
                  Prep
                </span>
              )}
            </div>
          </div>

          {/* Delete Set */}
          <button
            onClick={onDelete}
            className="text-[#555555] hover:text-[#ff6666] p-1 rounded transition-colors cursor-pointer"
            title="Delete set"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Stepper Grid */}
        <div className="grid grid-cols-2 gap-2.5 mt-2.5">
          {/* Weight */}
          <div className="bg-black rounded-lg p-2 border border-[#222222]">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#666666] mb-1 flex justify-between">
              <span>Weight (kg)</span>
              <span className="text-white font-mono font-bold">
                {setLog.weightKg} kg
              </span>
            </div>
            <div className="flex items-center justify-between gap-1">
              <button
                type="button"
                onClick={() => handleWeightChange(-2.5)}
                className="w-7 h-7 rounded-md bg-[#141414] hover:bg-[#202020] text-[#ededed] border border-[#262626] flex items-center justify-center font-mono text-[10px] active:scale-95 cursor-pointer"
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
                className="w-16 text-center bg-transparent text-white font-mono font-bold text-sm focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleWeightChange(2.5)}
                className="w-7 h-7 rounded-md bg-[#141414] hover:bg-[#202020] text-[#ededed] border border-[#262626] flex items-center justify-center font-mono text-[10px] active:scale-95 cursor-pointer"
                title="+2.5 kg"
              >
                +2.5
              </button>
            </div>
          </div>

          {/* Reps */}
          <div className="bg-black rounded-lg p-2 border border-[#222222]">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#666666] mb-1 flex justify-between">
              <span>Reps</span>
              <span className="text-white font-mono font-bold">
                {setLog.reps}
              </span>
            </div>
            <div className="flex items-center justify-between gap-1">
              <button
                type="button"
                onClick={() => handleRepsChange(-1)}
                className="w-7 h-7 rounded-md bg-[#141414] hover:bg-[#202020] text-[#ededed] border border-[#262626] flex items-center justify-center active:scale-95 cursor-pointer"
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
                className="w-16 text-center bg-transparent text-white font-mono font-bold text-sm focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleRepsChange(1)}
                className="w-7 h-7 rounded-md bg-[#141414] hover:bg-[#202020] text-[#ededed] border border-[#262626] flex items-center justify-center active:scale-95 cursor-pointer"
                title="+1 rep"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Video Attachment & Completion Bar */}
        <div className="flex items-center justify-between gap-2 mt-2.5 pt-2 border-t border-[#1a1a1a]">
          <div>
            <input
              type="file"
              ref={fileInputRef}
              accept="video/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {setLog.videoUrl ? (
              <div className="flex items-center gap-1.5 bg-[#141414] border border-[#333333] rounded-lg px-2.5 py-1 text-xs text-[#ededed]">
                <button
                  type="button"
                  onClick={() => setShowVideoModal(true)}
                  className="flex items-center gap-1.5 font-medium hover:text-white cursor-pointer"
                >
                  <Play className="h-3 w-3 text-white fill-white" />
                  <span className="truncate max-w-[120px] font-mono text-[11px]">
                    {setLog.videoFileName || "View Video"}
                  </span>
                </button>

                {/* Compression status pill */}
                {isCompressing && compressProgress !== null && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded">
                    <Loader2 className="h-2.5 w-2.5 animate-spin" />
                    {compressProgress}%
                  </span>
                )}

                {setLog.compressionRatio !== undefined && setLog.compressionRatio > 0 && !isCompressing && (
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1 rounded">
                    -{setLog.compressionRatio}%
                  </span>
                )}

                <button
                  type="button"
                  onClick={removeVideo}
                  className="p-0.5 hover:text-[#ff6666] text-[#888888] rounded cursor-pointer"
                  title="Remove video"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black hover:bg-[#141414] text-[#888888] hover:text-white text-xs font-medium border border-[#262626] transition-colors cursor-pointer"
              >
                <Video className="h-3 w-3 text-white" />
                <span>Video</span>
              </button>
            )}
          </div>

          {/* Mark Done Toggle */}
          <button
            type="button"
            onClick={() => onUpdate({ ...setLog, completed: !setLog.completed })}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              setLog.completed
                ? isWarmup
                  ? "bg-amber-500 hover:bg-amber-400 text-black shadow-sm"
                  : "bg-emerald-500 hover:bg-emerald-400 text-black shadow-sm"
                : "bg-[#111111] hover:bg-[#1a1a1a] text-[#888888] hover:text-white border border-[#2a2a2a]"
            }`}
          >
            <Check className="h-3.5 w-3.5" />
            <span>{setLog.completed ? "Done" : "Mark"}</span>
          </button>
        </div>
      </div>

      {/* Video Modal Preview */}
      {showVideoModal && setLog.videoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border border-[#222222] rounded-2xl p-4 w-full max-w-md shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#222222]">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                  {isWarmup ? `Warmup Set ${setIndex + 1}` : `Working Set ${workingSetNumber || setIndex + 1}`} Recording
                </span>
                {setLog.compressionRatio !== undefined && setLog.compressionRatio > 0 && (
                  <p className="text-[10px] font-mono text-emerald-400 mt-0.5">
                    Compressed: {setLog.compressionRatio}% size reduction
                  </p>
                )}
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="p-1 text-[#888888] hover:text-white rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center border border-[#1f1f1f]">
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
                className="w-full py-2 bg-[#161616] hover:bg-[#222222] text-white rounded-lg text-xs font-semibold border border-[#2e2e2e]"
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
