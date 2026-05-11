import { NextResponse } from "next/server";
import { loginUser, setAuthCookie, signAuthToken } from "@/lib/server/auth";

export async function POST(req) {
  try {
    const body = await req.json();
    const email = String(body?.email || "").trim();
    const password = String(body?.password || "");

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const user = await loginUser({ email, password });
    const token = signAuthToken(user);
    await setAuthCookie(token);
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Unable to login." },
      { status: error.status || 500 }
    );
  }
}
