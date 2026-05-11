import { notFound } from "next/navigation";
import {
  countryNameFromSlug,
  getInitialCoursesForUniversity,
  universityNameFromSlug,
} from "@/lib/admin-courses";
import UniversityCoursesClient from "./UniversityCoursesClient";

export async function generateMetadata({ params }) {
  const { countrySlug, universitySlug } = await params;
  const country = countryNameFromSlug(countrySlug);
  const university = country ? universityNameFromSlug(country, universitySlug) : null;
  return {
    title: university ? `Admin · ${university}` : "Admin · University",
  };
}

export default async function AdminUniversityCoursesPage({ params }) {
  const { countrySlug, universitySlug } = await params;
  const countryName = countryNameFromSlug(countrySlug);
  if (!countryName) notFound();

  const universityName = universityNameFromSlug(countryName, universitySlug);
  if (!universityName) notFound();

  const initialCourses = getInitialCoursesForUniversity(countryName, universityName);

  return (
    <UniversityCoursesClient
      countrySlug={countrySlug}
      countryName={countryName}
      universityName={universityName}
      initialCourses={initialCourses}
    />
  );
}
