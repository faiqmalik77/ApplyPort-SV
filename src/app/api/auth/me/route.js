import { NextResponse } from "next/server";
import { getCurrentUserFromCookie } from "@/lib/server/auth";

export async function GET() {
  try {
    const user = await getCurrentUserFromCookie();
    return NextResponse.json({ user: user || null });
  } catch {
    return NextResponse.json({ user: null });
  }
}
