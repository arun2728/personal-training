import { NextResponse } from "next/server";
import { isAuthenticatedServer } from "@/lib/auth";

export async function POST(request: Request) {
  const isAuth = await isAuthenticatedServer();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const contentType = request.headers.get("content-type") || "";

    // Presigned upload URL request (for Cloudflare R2 / S3 / Supabase)
    if (contentType.includes("application/json")) {
      const { fileName, fileType } = await request.json();
      
      const storageBucket = process.env.STORAGE_BUCKET;
      const storageKey = `workouts/${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

      return NextResponse.json({
        success: true,
        uploadMode: storageBucket ? "s3-presigned" : "client-session",
        storageKey,
        // In local/session mode, client keeps object URL or direct upload
        url: `/uploads/${storageKey}`,
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
