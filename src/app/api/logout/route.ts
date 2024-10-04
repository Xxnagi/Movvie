// app/api/auth/logout/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("tmdb_session_id")?.value;

  if (sessionId) {
    // Delete the session from TMDB
    await fetch(
      `https://api.themoviedb.org/3/authentication/session?api_key=${process.env.TMDB_API_KEY}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id: sessionId }),
      }
    );

    // Clear the session cookie
    cookies().delete("tmdb_session_id");
  }

  return NextResponse.json({ success: true });
}
