import { connectDb } from "@/lib/db";
import { Application } from "@/lib/models/Application";
import { searchPrograms } from "@/lib/site-data";

function toListItem(doc) {
  return {
    id: doc.appId,
    program: doc.course,
    uni: doc.university,
    status: doc.status,
    updated: new Date(doc.updatedAt).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  };
}

export async function listApplications({ studentEmail } = {}) {
  await connectDb();
  const query = studentEmail ? { studentEmail: studentEmail.toLowerCase() } : {};
  const docs = await Application.find(query).sort({ updatedAt: -1 }).lean();
  return docs.map(toListItem);
}

export async function getApplicationById(appId) {
  await connectDb();
  const app = await Application.findOne({ appId }).lean();
  if (!app) return null;
  return {
    id: app.appId,
    status: app.status,
    documents: app.documents || [],
    form: app.form || {},
    studentEmail: app.studentEmail,
  };
}

export async function createApplication(payload) {
  await connectDb();
  const now = Date.now();
  const appId = `app-${String(now).slice(-6)}`;
  const selectedProgram = searchPrograms.find(
    (p) =>
      p.course === payload?.form?.courseQuery &&
      (payload?.form?.courseUniversity === "All universities" ||
        p.university === payload?.form?.courseUniversity)
  );

  const created = await Application.create({
    appId,
    studentEmail: payload.form.email.trim().toLowerCase(),
    firstName: payload.form.firstName.trim(),
    familyName: payload.form.familyName.trim(),
    course: selectedProgram?.course || payload.form.courseQuery.trim(),
    university: selectedProgram?.university || payload.form.courseUniversity || "TBD",
    country: selectedProgram?.country || payload.form.courseCountry || "TBD",
    level: selectedProgram?.level || payload.form.courseProgramLevel || "",
    intake: payload.form.courseIntake === "All intakes" ? "" : payload.form.courseIntake,
    status: "Pending documents",
    form: payload.form,
    emergencyContacts: payload.emergencyContacts || [],
    educationEntries: payload.educationEntries || [],
    workEntries: payload.workEntries || [],
    documents: [
      { name: "CV", fileStatus: "Pending upload" },
      { name: "Passport", fileStatus: "Pending upload" },
    ],
  });

  return { id: created.appId, status: created.status };
}

export async function updateApplicationStatus(appId, status) {
  await connectDb();
  const updated = await Application.findOneAndUpdate(
    { appId },
    { $set: { status } },
    { new: true }
  ).lean();
  return updated ? { id: updated.appId, status: updated.status } : null;
}
