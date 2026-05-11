import { NextResponse } from "next/server";
import { registerUser, setAuthCookie, signAuthToken } from "@/lib/server/auth";

export async function POST(req) {
  try {
    const body = await req.json();
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const password = String(body?.password || "");

    if (name.length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters." }, { status: 400 });
    }
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }

    const user = await registerUser({ name, email, password });
    const token = signAuthToken(user);
    await setAuthCookie(token);
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Unable to register user." },
      { status: error.status || 500 }
    );
  }
}
