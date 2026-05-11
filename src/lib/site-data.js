/** Regions, guidance topics, and partner institutions shown across ApplyPort-SV. */

export const countries = [
  {
    slug: "usa",
    name: "United States",
    flag: "🇺🇸",
    blurb:
      "Top-ranked research universities, OPT opportunities, and diverse campuses.",
  },
  {
    slug: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    blurb:
      "Shorter master's timelines, strong industry links, and historic institutions.",
  },
  {
    slug: "canada",
    name: "Canada",
    flag: "🇨🇦",
    blurb:
      "PGWP pathways, welcoming policies, and high quality of life for students.",
  },
  {
    slug: "germany",
    name: "Germany",
    flag: "🇩🇪",
    blurb:
      "Low or no tuition at public universities with strong STEM programs.",
  },
  {
    slug: "australia",
    name: "Australia",
    flag: "🇦🇺",
    blurb:
      "Globally recognized degrees with post-study work options in key cities.",
  },
];

/**
 * Demo catalog for Search Programs (frontend-only filtering).
 * level: Bachelor | Master | PHD
 * tuitionFee: indicative annual or per-term fee text for search / admin display
 * applicationFee: one-time or per-application fee text
 */
export const searchPrograms = [
  {
    id: "1",
    country: "Canada",
    countrySlug: "canada",
    university: "LaSalle College",
    level: "Bachelor",
    course: "Accountancy",
    intakes: ["January", "May", "September"],
    tuitionFee: "CAD 19,200 / year (indicative)",
    applicationFee: "CAD 125 (non-refundable)",
  },
  {
    id: "2",
    country: "Canada",
    countrySlug: "canada",
    university: "LaSalle College",
    level: "Bachelor",
    course: "3D Production and Image Synthesis",
    intakes: ["January", "September"],
    tuitionFee: "CAD 21,000 / year (indicative)",
    applicationFee: "CAD 125 (non-refundable)",
  },
  {
    id: "3",
    country: "United States",
    countrySlug: "usa",
    university: "Troy University",
    level: "Master",
    course: "Computer Science",
    intakes: ["January", "August"],
    tuitionFee: "USD 24,500 / year (indicative)",
    applicationFee: "USD 50",
  },
  {
    id: "4",
    country: "United States",
    countrySlug: "usa",
    university: "Troy University",
    level: "Bachelor",
    course: "Business Administration",
    intakes: ["May", "September"],
    tuitionFee: "USD 22,000 / year (indicative)",
    applicationFee: "USD 50",
  },
  {
    id: "5",
    country: "United Kingdom",
    countrySlug: "uk",
    university: "Coventry University Main Campus",
    level: "Master",
    course: "International Business",
    intakes: ["January", "May"],
    tuitionFee: "GBP 18,500 / year (indicative)",
    applicationFee: "GBP 0 (online application)",
  },
  {
    id: "6",
    country: "United Kingdom",
    countrySlug: "uk",
    university: "Coventry University Main Campus",
    level: "PHD",
    course: "Engineering",
    intakes: ["September", "February"],
    tuitionFee: "GBP 4,712 / year — research programme (indicative)",
    applicationFee: "GBP 0 (online application)",
  },
  {
    id: "7",
    country: "Germany",
    countrySlug: "germany",
    university: "Berlin Tech Institute",
    level: "Master",
    course: "Data Science",
    intakes: ["October", "April"],
    tuitionFee: "No tuition; semester contribution approx. EUR 350 / term",
    applicationFee: "EUR 75 handling fee",
  },
  {
    id: "8",
    country: "Germany",
    countrySlug: "germany",
    university: "Munich Applied Sciences",
    level: "Bachelor",
    course: "Mechanical Engineering",
    intakes: ["October"],
    tuitionFee: "EUR 3,000 / year + semester fee (indicative)",
    applicationFee: "EUR 75 handling fee",
  },
  {
    id: "9",
    country: "Australia",
    countrySlug: "australia",
    university: "Sydney Coastal University",
    level: "Master",
    course: "Public Health",
    intakes: ["February", "July"],
    tuitionFee: "AUD 42,000 / year (indicative)",
    applicationFee: "AUD 100",
  },
  {
    id: "10",
    country: "Australia",
    countrySlug: "australia",
    university: "Melbourne Metro College",
    level: "Bachelor",
    course: "Information Technology",
    intakes: ["March", "July", "November"],
    tuitionFee: "AUD 38,500 / year (indicative)",
    applicationFee: "AUD 100",
  },
];

export const guidanceTopics = [
  {
    slug: "documents",
    title: "Document checklist",
    excerpt: "Transcripts, LORs, passports, and financial proofs — organized.",
  },
  {
    slug: "timeline",
    title: "Application timeline",
    excerpt: "When to take tests, submit apps, and follow up with universities.",
  },
  {
    slug: "finances",
    title: "Funding & scholarships",
    excerpt: "Merit aid, assistantships, and budgeting before you fly.",
  },
  {
    slug: "visas",
    title: "Visa basics",
    excerpt: "High-level visa categories and how applications connect to admission.",
  },
];

export const partnerInstitutions = [
  {
    slug: "pacific-north-uni",
    name: "Pacific North University",
    country: "USA",
    focus: "CS, Data Science, Engineering",
  },
  {
    slug: "highland-institute",
    name: "Highland Institute of Technology",
    country: "UK",
    focus: "Business, Finance, Economics",
  },
  {
    slug: "aurora-college",
    name: "Aurora College",
    country: "Canada",
    focus: "Health Sciences, Psychology",
  },
];
