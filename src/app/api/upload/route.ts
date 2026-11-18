import { NextResponse } from "next/server";
import { isAuthenticatedServer } from "@/lib/auth";

export async function POST(request: Request) {
  const isAuth = await isAuthenticatedServer();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const contentType = request.headers.get("content-type") || "";

    // 1. JSON Request for Presigned Upload (Cloudflare R2 / S3)
    if (contentType.includes("application/json")) {
      const { fileName, fileType, compressed } = await request.json();

      const r2Bucket = process.env.R2_BUCKET_NAME || process.env.STORAGE_BUCKET;
      const r2PublicDomain = process.env.R2_PUBLIC_DOMAIN;
      const sanitizedName = fileName
        ? fileName.replace(/[^a-zA-Z0-9.-]/g, "_")
        : `video_${Date.now()}.mp4`;
      const storageKey = `workouts/${Date.now()}-${sanitizedName}`;

      const publicUrl = r2PublicDomain
        ? `https://${r2PublicDomain.replace(/^https?:\/\//, "")}/${storageKey}`
        : `/uploads/${storageKey}`;

      return NextResponse.json({
        success: true,
        uploadMode: r2Bucket ? "cloudflare-r2" : "client-session",
        storageKey,
        publicUrl,
        compressed: !!compressed,
      });
    }

    // 2. Direct FormData / Multipart upload
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;

      if (!file) {
        return NextResponse.json(
          { error: "No video file provided" },
          { status: 400 }
        );
      }

      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const storageKey = `workouts/${Date.now()}-${sanitizedName}`;
      const r2PublicDomain = process.env.R2_PUBLIC_DOMAIN;

      const publicUrl = r2PublicDomain
        ? `https://${r2PublicDomain.replace(/^https?:\/\//, "")}/${storageKey}`
        : `/uploads/${storageKey}`;

      return NextResponse.json({
        success: true,
        fileName: file.name,
        sizeBytes: file.size,
        storageKey,
        publicUrl,
      });
    }

    return NextResponse.json(
      { error: "Unsupported upload content type" },
      { status: 400 }
    );
  } catch (err: unknown) {
    console.error("Upload handler error:", err);
    return NextResponse.json(
      { error: "Failed to process video upload" },
      { status: 500 }
    );
  }
}
