/**
 * Client-side video compressor for workout recordings.
 * Compresses large camera recordings (e.g. 50-150MB 4K/1080p) down to ~4-8MB (720p @ ~1.5 Mbps)
 * before uploading to Cloudflare R2 or cloud storage.
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  targetBitrate?: number; // bits per second, default 1,500,000 (1.5 Mbps)
  targetFps?: number;
  onProgress?: (percent: number) => void;
}

export interface CompressionResult {
  file: File | Blob;
  originalSize: number;
  compressedSize: number;
  reductionPercentage: number;
  durationSeconds: number;
}

export async function compressVideo(
  inputFile: File,
  options: CompressionOptions = {}
): Promise<CompressionResult> {
  const {
    maxWidth = 1280,
    maxHeight = 720,
    targetBitrate = 1_500_000,
    targetFps = 30,
    onProgress,
  } = options;

  const originalSize = inputFile.size;

  // If already under 3MB, compression isn't strictly necessary
  if (originalSize < 3 * 1024 * 1024) {
    onProgress?.(100);
    return {
      file: inputFile,
      originalSize,
      compressedSize: originalSize,
      reductionPercentage: 0,
      durationSeconds: 0,
    };
  }

  // Ensure running in browser
  if (typeof window === "undefined" || !window.MediaRecorder) {
    return {
      file: inputFile,
      originalSize,
      compressedSize: originalSize,
      reductionPercentage: 0,
      durationSeconds: 0,
    };
  }

  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";

    const objectUrl = URL.createObjectURL(inputFile);
    video.src = objectUrl;

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null;
    let stream: MediaStream;
    let recorder: MediaRecorder;
    const chunks: Blob[] = [];
    let animationFrameId: number;

    const cleanup = () => {
      cancelAnimationFrame(animationFrameId);
      URL.revokeObjectURL(objectUrl);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };

    video.onloadedmetadata = () => {
      const duration = video.duration || 10;
      let width = video.videoWidth;
      let height = video.videoHeight;

      // Downscale if larger than bounds while preserving aspect ratio
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      // Ensure even dimensions for video codecs
      width = width % 2 === 0 ? width : width - 1;
      height = height % 2 === 0 ? height : height - 1;

      canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      ctx = canvas.getContext("2d", { alpha: false });

      if (!ctx) {
        cleanup();
        resolve({
          file: inputFile,
          originalSize,
          compressedSize: originalSize,
          reductionPercentage: 0,
          durationSeconds: duration,
        });
        return;
      }

      // Capture canvas at target FPS
      stream = canvas.captureStream(targetFps);

      // Select supported mime type
      const possibleTypes = [
        "video/mp4;codecs=avc1,mp4a.40.2",
        "video/mp4",
        "video/webm;codecs=vp8,opus",
        "video/webm;codecs=h264",
        "video/webm",
      ];
      const selectedType =
        possibleTypes.find((type) => MediaRecorder.isTypeSupported(type)) ||
        "video/webm";

      try {
        recorder = new MediaRecorder(stream, {
          mimeType: selectedType,
          videoBitsPerSecond: targetBitrate,
        });
      } catch {
        cleanup();
        resolve({
          file: inputFile,
          originalSize,
          compressedSize: originalSize,
          reductionPercentage: 0,
          durationSeconds: duration,
        });
        return;
      }

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        cleanup();
        const extension = selectedType.includes("mp4") ? "mp4" : "webm";
        const compressedBlob = new Blob(chunks, { type: selectedType });
        const compressedSize = compressedBlob.size;

        // If compressed file is larger (rare), keep original
        if (compressedSize >= originalSize) {
          resolve({
            file: inputFile,
            originalSize,
            compressedSize: originalSize,
            reductionPercentage: 0,
            durationSeconds: duration,
          });
          return;
        }

        const reduction = Math.round(
          ((originalSize - compressedSize) / originalSize) * 100
        );
        const compressedFile = new File(
          [compressedBlob],
          inputFile.name.replace(/\.[^/.]+$/, `_compressed.${extension}`),
          { type: selectedType }
        );

        onProgress?.(100);
        resolve({
          file: compressedFile,
          originalSize,
          compressedSize,
          reductionPercentage: reduction,
          durationSeconds: duration,
        });
      };

      // Frame draw loop
      const drawFrame = () => {
        if (video.paused || video.ended) return;
        ctx?.drawImage(video, 0, 0, width, height);

        if (duration > 0) {
          const currentProgress = Math.min(
            98,
            Math.round((video.currentTime / duration) * 100)
          );
          onProgress?.(currentProgress);
        }

        animationFrameId = requestAnimationFrame(drawFrame);
      };

      video.onplay = () => {
        drawFrame();
      };

      video.onended = () => {
        cancelAnimationFrame(animationFrameId);
        recorder.stop();
      };

      video.onerror = () => {
        cleanup();
        resolve({
          file: inputFile,
          originalSize,
          compressedSize: originalSize,
          reductionPercentage: 0,
          durationSeconds: 0,
        });
      };

      // Start recording and playback
      recorder.start(100);
      video.play().catch(() => {
        cleanup();
        resolve({
          file: inputFile,
          originalSize,
          compressedSize: originalSize,
          reductionPercentage: 0,
          durationSeconds: 0,
        });
      });
    };

    video.onerror = () => {
      cleanup();
      resolve({
        file: inputFile,
        originalSize,
        compressedSize: originalSize,
        reductionPercentage: 0,
        durationSeconds: 0,
      });
    };
  });
}
