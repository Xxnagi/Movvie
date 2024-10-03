import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  try {
    // Step 1: Create a request token
    const tokenResponse = await fetch(
      `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.API_KEY}`
    );
    const tokenData = await tokenResponse.json();

    if (!tokenData.success) {
      throw new Error("Failed to get request token");
    }

    // Step 2: Validate the request token with login
    const loginResponse = await fetch(
      `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${process.env.API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          request_token: tokenData.request_token,
        }),
      }
    );
    const loginData = await loginResponse.json();

    if (!loginData.success) {
      throw new Error("Invalid username or password");
    }

    // Step 3: Create a session ID
    const sessionResponse = await fetch(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request_token: loginData.request_token,
        }),
      }
    );
    const sessionData = await sessionResponse.json();

    if (!sessionData.success) {
      throw new Error("Failed to create session");
    }

    // Set the session ID as a httpOnly cookie
    cookies().set("tmdb_session_id", sessionData.session_id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600, // 1 hour
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during login",
      },
      { status: 400 }
    );
  }
}
export async function GET() {
  const sessionId = cookies().get("tmdb_session_id")?.value;

  if (!sessionId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // First, get the account details
  const accountResponse = await fetch(
    `https://api.themoviedb.org/3/account?api_key=${process.env.API_KEY}&session_id=${sessionId}`
  );
  const accountData = await accountResponse.json();

  if (!accountData.id) {
    return NextResponse.json(
      { error: "Failed to get account ID" },
      { status: 400 }
    );
  }

  // Now use the account ID to get favorite movies
  const response = await fetch(
    `https://api.themoviedb.org/3/account/${accountData.id}/favorite/movies?api_key=${process.env.API_KEY}&session_id=${sessionId}`
  );
  const data = await response.json();

  return NextResponse.json(data);
}
