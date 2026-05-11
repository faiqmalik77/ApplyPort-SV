import { NextResponse } from "next/server";
import { listApplications } from "@/lib/server/applications";
import { getCurrentUserFromCookie, isAdminUser } from "@/lib/server/auth";

function unauthorized(message = "Unauthorized.") {
  return NextResponse.json({ error: message }, { status: 401 });
}

export async function GET() {
  try {
    const user = await getCurrentUserFromCookie();
    if (!user) return unauthorized("Please login to continue.");
    if (!isAdminUser(user)) return unauthorized("Admin access required.");

    const items = await listApplications();
    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to load admin applications." },
      { status: 500 }
    );
  }
}
