/**
 * Demo-only application state (until API + DB exist).
 * Keep in sync with admin STATUS_OPTIONS in AdminApplicationsClient.jsx
 */
export const APPLICATION_STATUS_ORDER = [
  "Pending documents",
  "Under review",
  "University requirement pending",
  "Submitted",
  "Offer letter",
  "Rejected",
];

const DEMO = {
  "app-1024": {
    status: "Under review",
    documents: [
      { name: "transcript.pdf", fileStatus: "Verified" },
      { name: "passport.jpg", fileStatus: "Processing" },
    ],
  },
  "app-1025": {
    status: "Pending documents",
    documents: [
      { name: "transcript.pdf", fileStatus: "Processing" },
      { name: "passport.jpg", fileStatus: "Pending upload" },
    ],
  },
  "app-1020": {
    status: "Offer letter",
    documents: [
      { name: "transcript.pdf", fileStatus: "Verified" },
      { name: "passport.jpg", fileStatus: "Verified" },
    ],
  },
};

export function getDemoApplication(id) {
  return DEMO[id] ?? null;
}
