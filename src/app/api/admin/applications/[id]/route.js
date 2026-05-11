import { NextResponse } from "next/server";
import { APPLICATION_STATUS_ORDER } from "@/lib/application-demo";
import { updateApplicationStatus } from "@/lib/server/applications";
import { getCurrentUserFromCookie, isAdminUser } from "@/lib/server/auth";

function unauthorized(message = "Unauthorized.") {
  return NextResponse.json({ error: message }, { status: 401 });
}

export async function PATCH(req, { params }) {
  try {
    const user = await getCurrentUserFromCookie();
    if (!user) return unauthorized("Please login to continue.");
    if (!isAdminUser(user)) return unauthorized("Admin access required.");

    const { id } = await params;
    const body = await req.json();
    const status = String(body?.status || "");
    if (!APPLICATION_STATUS_ORDER.includes(status)) {
      return NextResponse.json({ error: "Invalid status value." }, { status: 400 });
    }

    const updated = await updateApplicationStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Application not found." }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to update application status." },
      { status: 500 }
    );
  }
}
