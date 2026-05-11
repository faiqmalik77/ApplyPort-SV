import { searchPrograms } from "@/lib/site-data";

/** Default countries shown on admin Universities & Courses list */
export const ADMIN_COURSE_SEED_COUNTRIES = [
  "United Kingdom",
  "Spain",
  "Cyprus",
  "Malta",
  "Hungary",
  "New Zealand",
  "Sweden",
  "France",
];

/** Demo universities for United Kingdom (admin UI), merged with catalog */
const UNITED_KINGDOM_ADMIN_SEED_UNIVERSITIES = [
  "Birmingham City University",
  "University of Lancashire",
  "University of Wolverhampton",
  "Bangor University",
  "Metropolitan University",
];

function catalogUniversitiesForCountry(countryName) {
  if (!countryName) return [];
  const lower = countryName.toLowerCase();
  const seen = new Set();
  const out = [];
  for (const p of searchPrograms) {
    if (p.country.toLowerCase() !== lower) continue;
    const u = p.university;
    if (!seen.has(u.toLowerCase())) {
      seen.add(u.toLowerCase());
      out.push(u);
    }
  }
  return out;
}

export function getInitialUniversitiesForCountry(countryName) {
  const catalog = catalogUniversitiesForCountry(countryName);
  const extras =
    countryName.trim().toLowerCase() === "united kingdom"
      ? UNITED_KINGDOM_ADMIN_SEED_UNIVERSITIES
      : [];

  const seen = new Set();
  const out = [];
  for (const u of [...extras, ...catalog]) {
    const key = u.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(u);
  }
  return out;
}

export function slugifyCountry(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Resolve dynamic segment to display country name.
 * Matches seed/catalog first, then title-cases the slug.
 */
export function countryNameFromSlug(segment) {
  if (!segment || typeof segment !== "string") return null;
  const slugKey = slugifyCountry(segment);
  if (!slugKey) return null;

  const catalogCountries = [...new Set(searchPrograms.map((p) => p.country))];
  const all = [...new Set([...ADMIN_COURSE_SEED_COUNTRIES, ...catalogCountries])];

  for (const name of all) {
    if (slugifyCountry(name) === slugKey) return name;
  }

  const words = slugKey.split("-").filter(Boolean);
  if (!words.length) return null;
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
}

/** URL segment for a university name (same rules as country slug). */
export function slugifyUniversity(name) {
  return slugifyCountry(name);
}

/**
 * Resolve university segment for a given country (seed/catalog match, then title-case slug).
 */
export function universityNameFromSlug(countryName, universitySlug) {
  if (!countryName || !universitySlug || typeof universitySlug !== "string") return null;
  const slugKey = slugifyUniversity(universitySlug);
  if (!slugKey) return null;

  for (const u of getInitialUniversitiesForCountry(countryName)) {
    if (slugifyUniversity(u) === slugKey) return u;
  }

  const words = slugKey.split("-").filter(Boolean);
  if (!words.length) return null;
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
}

/** Courses from demo catalog for a country + university pair. */
export function getInitialCoursesForUniversity(countryName, universityName) {
  if (!countryName || !universityName) return [];
  const countryLower = countryName.toLowerCase();
  const uniLower = universityName.toLowerCase();
  const out = [];
  for (const p of searchPrograms) {
    if (p.country.toLowerCase() !== countryLower) continue;
    if (p.university.toLowerCase() !== uniLower) continue;
    out.push({
      id: `catalog-${p.id}`,
      name: p.course,
      level: p.level,
      intakes: Array.isArray(p.intakes) ? p.intakes.join(", ") : String(p.intakes ?? ""),
      tuitionFee: p.tuitionFee ?? "",
      applicationFee: p.applicationFee ?? "",
      entryRequirements: p.entryRequirements ?? "",
      englishProficiency: p.englishProficiency ?? "",
      otherDetails: p.otherDetails ?? "",
    });
  }
  return out;
}
