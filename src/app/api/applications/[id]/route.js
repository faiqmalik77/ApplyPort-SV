import { NextResponse } from "next/server";
import { APPLICATION_STATUS_ORDER } from "@/lib/application-demo";
import { getApplicationById, updateApplicationStatus } from "@/lib/server/applications";
import { getCurrentUserFromCookie, isAdminUser } from "@/lib/server/auth";

export async function GET(_req, { params }) {
  try {
    const user = await getCurrentUserFromCookie();
    if (!user) {
      return NextResponse.json({ error: "Please login to continue." }, { status: 401 });
    }

    const { id } = await params;
    const app = await getApplicationById(id);
    if (!app) {
      return NextResponse.json({ error: "Application not found." }, { status: 404 });
    }
    if (!isAdminUser(user) && app.studentEmail !== String(user.email || "").toLowerCase()) {
      return NextResponse.json({ error: "Access denied." }, { status: 403 });
    }
    return NextResponse.json(app);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to load application." },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const user = await getCurrentUserFromCookie();
    if (!user) {
      return NextResponse.json({ error: "Please login to continue." }, { status: 401 });
    }
    if (!isAdminUser(user)) {
      return NextResponse.json({ error: "Admin access required." }, { status: 403 });
    }

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
      { error: error.message || "Failed to update status." },
      { status: 500 }
    );
  }
}
