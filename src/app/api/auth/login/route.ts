import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, EXPECTED_PASSWORD, createSessionToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || password.trim() !== EXPECTED_PASSWORD.trim()) {
      return NextResponse.json(
        { error: "Incorrect password. Please enter the valid PT code." },
        { status: 401 }
      );
    }

    const token = await createSessionToken(EXPECTED_PASSWORD);

    const response = NextResponse.json({
      success: true,
      message: "Authenticated successfully! Welcome Arun.",
    });

    // 90-day persistence cookie
    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 90, // 90 days
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Failed to process login request" },
      { status: 500 }
    );
  }
}
