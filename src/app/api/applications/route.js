import { NextResponse } from "next/server";
import { createApplication, listApplications } from "@/lib/server/applications";
import { getCurrentUserFromCookie, isAdminUser } from "@/lib/server/auth";

export async function GET(req) {
  try {
    const user = await getCurrentUserFromCookie();
    if (!user) {
      return NextResponse.json({ error: "Please login to continue." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const studentEmail = searchParams.get("studentEmail") || "";
    const safeStudentEmail = isAdminUser(user)
      ? studentEmail || undefined
      : String(user.email || "").toLowerCase();
    const items = await listApplications({ studentEmail: safeStudentEmail });
    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to load applications." }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const user = await getCurrentUserFromCookie();
    if (!user) {
      return NextResponse.json({ error: "Please login to continue." }, { status: 401 });
    }

    const body = await req.json();
    const email = String(user?.email || "").trim();
    const firstName = String(body?.form?.firstName || "").trim();
    const familyName = String(body?.form?.familyName || "").trim();
    const courseQuery = String(body?.form?.courseQuery || "").trim();

    if (!email || !firstName || !familyName || !courseQuery) {
      return NextResponse.json(
        { error: "Missing required fields for application submission." },
        { status: 400 }
      );
    }

    const created = await createApplication({
      ...body,
      form: { ...(body?.form || {}), email },
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to submit application." },
      { status: 500 }
    );
  }
}
