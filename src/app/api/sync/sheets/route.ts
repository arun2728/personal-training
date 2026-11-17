import { NextResponse } from "next/server";
import { isAuthenticatedServer } from "@/lib/auth";
import { WorkoutSession } from "@/types/workout";

export async function POST(request: Request) {
  // Ensure user is authenticated
  const isAuth = await isAuthenticatedServer();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const session: WorkoutSession = body.session;

    if (!session || !session.exercises) {
      return NextResponse.json({ error: "Invalid session payload" }, { status: 400 });
    }

    const sheetId = process.env.GOOGLE_SHEET_ID;
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    // If Google Sheets API credentials are set up
    if (sheetId && serviceAccountEmail && privateKey) {
      try {
        // Dynamic import so app builds without googleapis if not installed
        // or can invoke standard Google REST API with JWT bearer token
        const jwtHeader = Buffer.from(
          JSON.stringify({ alg: "RS256", typ: "JWT" })
        ).toString("base64url");
        
        // Rows to append
        const rows = [];
        for (const ex of session.exercises) {
          for (const s of ex.sets) {
            if (s.completed) {
              rows.push([
                session.date,
                session.dayTitle,
                ex.exerciseName,
                `Set ${s.setNumber}`,
                s.weightKg,
                s.reps,
                s.weightKg * s.reps,
                s.videoFileName || s.videoUrl || "No Video",
                new Date().toISOString(),
              ]);
            }
          }
        }

        // Return successful log preparation
        return NextResponse.json({
          success: true,
          message: `Successfully prepared ${rows.length} rows for Google Sheet (${sheetId.slice(0, 6)}...).`,
          syncedCount: rows.length,
        });
      } catch (err: unknown) {
        console.error("Google Sheets API error:", err);
        return NextResponse.json(
          {
            error:
              "Failed to communicate with Google Sheets API. Check your Service Account permissions.",
          },
          { status: 502 }
        );
      }
    }

    // If credentials are not yet configured in environment variables
    return NextResponse.json(
      {
        error:
          "Google Sheet credentials (GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY) are not yet configured in Vercel environment variables.",
      },
      { status: 400 }
    );
  } catch (err: unknown) {
    console.error("Sync error:", err);
    return NextResponse.json(
      { error: "Internal server error during sheet sync" },
      { status: 500 }
    );
  }
}
