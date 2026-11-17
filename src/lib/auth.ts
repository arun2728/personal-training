import { cookies } from "next/headers";

export const AUTH_COOKIE_NAME = "pt_session_auth";
export const EXPECTED_PASSWORD = process.env.APP_PASSWORD || "PT@2026";
const SECRET_SALT = process.env.AUTH_SECRET || "pt_salt_aanchal_arun_2026_supersecret";

/**
 * Creates a simple deterministic hash of the password + secret for the session token.
 */
export async function createSessionToken(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${password}:${SECRET_SALT}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Checks if a session token is valid.
 */
export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const expectedToken = await createSessionToken(EXPECTED_PASSWORD);
  return token === expectedToken;
}

/**
 * Server-side check for authentication in Server Components / Route Handlers.
 */
export async function isAuthenticatedServer(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}
