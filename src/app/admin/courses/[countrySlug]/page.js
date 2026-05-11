import { notFound } from "next/navigation";
import {
  countryNameFromSlug,
  getInitialUniversitiesForCountry,
} from "@/lib/admin-courses";
import CountryUniversitiesClient from "./CountryUniversitiesClient";

export async function generateMetadata({ params }) {
  const { countrySlug } = await params;
  const country = countryNameFromSlug(countrySlug);
  return {
    title: country ? `Admin · ${country}` : "Admin · Country",
  };
}

export default async function AdminCountryUniversitiesPage({ params }) {
  const { countrySlug } = await params;
  const countryName = countryNameFromSlug(countrySlug);
  if (!countryName) notFound();

  const initialUniversities = getInitialUniversitiesForCountry(countryName);

  return (
    <CountryUniversitiesClient
      countrySlug={countrySlug}
      countryName={countryName}
      initialUniversities={initialUniversities}
    />
  );
}
