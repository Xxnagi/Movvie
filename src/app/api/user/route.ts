// app/api/user/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("tmdb_session_id")?.value;

  if (!sessionId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const accountResponse = await fetch(
      `https://api.themoviedb.org/3/account?api_key=${process.env.TMDB_API_KEY}&session_id=${sessionId}`
    );
    const accountData = await accountResponse.json();

    if (!accountData.id) {
      return NextResponse.json(
        { error: "Failed to get account data" },
        { status: 400 }
      );
    }

    return NextResponse.json(accountData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching user data" },
      { status: 500 }
    );
  }
}
