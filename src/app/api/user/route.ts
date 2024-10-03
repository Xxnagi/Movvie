import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const baseUrl = "https://api.themoviedb.org/3";
  const apiKey = "c1262193488dbfbfc4f91af75a0f3ddc";
  const sessionId = cookies().get("tmdb_session_id")?.value;

  console.log(apiKey);

  if (!sessionId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const accountResponse = await fetch(
    `${baseUrl}/account?api_key=${apiKey}&session_id=${sessionId}`
  );

  const accountData = await accountResponse.json();

  if (!accountData || !accountData.id) {
    return NextResponse.json(
      { error: "Failed to get account ID" },
      { status: 400 }
    );
  }
  const userResponse = await fetch(
    `${baseUrl}/account/${accountData.id}?api_key=${apiKey}&session_id=${sessionId}`
  );
  const userData = await userResponse.json();

  return NextResponse.json(userData);
}
