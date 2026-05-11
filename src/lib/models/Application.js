import mongoose from "mongoose";
import { APPLICATION_STATUS_ORDER } from "@/lib/application-demo";

const EmergencyContactSchema = new mongoose.Schema(
  {
    name: String,
    mobile: String,
    email: String,
    relationship: String,
  },
  { _id: false }
);

const EducationEntrySchema = new mongoose.Schema(
  {
    country: String,
    levelOfStudy: String,
    institution: String,
    course: String,
    startDate: String,
    endDate: String,
    gradingScore: String,
    resultInfo: String,
  },
  { _id: false }
);

const WorkEntrySchema = new mongoose.Schema(
  {
    jobTitle: String,
    organisationName: String,
    organisationAddress: String,
    workPhone: String,
    workFromDate: String,
    workToDate: String,
    currentlyWorksHere: Boolean,
  },
  { _id: false }
);

const ApplicationSchema = new mongoose.Schema(
  {
    appId: { type: String, required: true, unique: true, index: true },
    studentEmail: { type: String, required: true, trim: true, lowercase: true, index: true },
    firstName: { type: String, required: true },
    familyName: { type: String, required: true },
    course: { type: String, required: true },
    university: { type: String, required: true },
    country: { type: String, required: true },
    level: { type: String, default: "" },
    intake: { type: String, default: "" },
    status: {
      type: String,
      enum: APPLICATION_STATUS_ORDER,
      default: "Pending documents",
    },
    form: { type: mongoose.Schema.Types.Mixed, default: {} },
    emergencyContacts: { type: [EmergencyContactSchema], default: [] },
    educationEntries: { type: [EducationEntrySchema], default: [] },
    workEntries: { type: [WorkEntrySchema], default: [] },
    documents: {
      type: [
        new mongoose.Schema(
          {
            name: String,
            fileStatus: { type: String, default: "Pending upload" },
          },
          { _id: false }
        ),
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const Application =
  mongoose.models.Application || mongoose.model("Application", ApplicationSchema);
