import { NextResponse } from "next/server";
import { searchPrograms } from "@/lib/site-data";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const country = searchParams.get("country") || "";
  const university = searchParams.get("university") || "";
  const level = searchParams.get("level") || "";
  const intake = searchParams.get("intake") || "";
  const q = (searchParams.get("q") || "").trim().toLowerCase();

  const items = searchPrograms.filter((p) => {
    if (country && p.country !== country) return false;
    if (university && p.university !== university) return false;
    if (level && p.level !== level) return false;
    if (intake && !(p.intakes || []).includes(intake)) return false;
    if (q && !p.course.toLowerCase().includes(q)) return false;
    return true;
  });

  return NextResponse.json({ items, total: items.length });
}
