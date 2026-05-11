"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Upload } from "lucide-react";
import { searchPrograms } from "@/lib/site-data";

const DRAFT_KEY = "applyport-application-draft-v1";

export default function ApplicationWizard() {
  const nationalityOptions = [
    "Pakistan",
    "India",
    "Bangladesh",
    "Nepal",
    "Sri Lanka",
    "China",
    "United Arab Emirates",
    "Saudi Arabia",
    "Qatar",
    "United Kingdom",
    "United States",
    "Canada",
    "Australia",
    "New Zealand",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Turkey",
    "Malaysia",
  ];

  const steps = [
    { id: 1, label: "Personal details" },
    { id: 2, label: "Education" },
    { id: 3, label: "Travel & Immigration" },
    { id: 4, label: "Work details" },
    { id: 5, label: "Documents" },
    { id: 6, label: "Course selection" },
  ];

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    familyName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    countryOfBirth: "",
    nativeLanguage: "",
    passportName: "",
    passportNumber: "",
    passportIssueDate: "",
    passportExpiryDate: "",
    permanentCountry: "Pakistan",
    permanentAddress1: "",
    permanentAddress2: "",
    permanentPostCode: "",
    permanentState: "",
    permanentCity: "",
    sameAsPermanentAddress: true,
    currentCountry: "Pakistan",
    currentAddress1: "",
    currentAddress2: "",
    currentPostCode: "",
    currentState: "",
    currentCity: "",
    previousVisaRefusal: "",
    refusalDetails: "",
    traveledOutsideHomeCountry: "",
    previouslyAppliedVisa: "",
    visitedApplyingCountry: "",
    overstayedVisa: "",
    hadVisaRejection: "",
    countriesVisited: "",
    travelHistory: "",
    jobTitle: "",
    organisationName: "",
    organisationAddress: "",
    workPhone: "",
    workFromDate: "",
    workToDate: "",
    currentlyWorksHere: false,
    hasWorkDetails: "",
    courseCountry: "All countries",
    courseQuery: "",
    courseUniversity: "All universities",
    courseProgramLevel: "All levels",
    courseIntake: "All intakes",
  });
  const [errors, setErrors] = useState({});
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: "", mobile: "", email: "", relationship: "" },
  ]);
  const [educationEntries, setEducationEntries] = useState([
    {
      country: "Pakistan",
      levelOfStudy: "",
      institution: "",
      course: "",
      startDate: "",
      endDate: "",
      gradingScore: "Percentage",
      resultInfo: "",
    },
  ]);
  const [workEntries, setWorkEntries] = useState([
    {
      jobTitle: "",
      organisationName: "",
      organisationAddress: "",
      workPhone: "",
      workFromDate: "",
      workToDate: "",
      currentlyWorksHere: false,
    },
  ]);
  const permanentToCurrentMap = {
    permanentCountry: "currentCountry",
    permanentAddress1: "currentAddress1",
    permanentAddress2: "currentAddress2",
    permanentPostCode: "currentPostCode",
    permanentState: "currentState",
    permanentCity: "currentCity",
  };

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const draft = JSON.parse(raw);
      if (draft?.form) setForm((prev) => ({ ...prev, ...draft.form }));
      if (Array.isArray(draft?.emergencyContacts) && draft.emergencyContacts.length > 0) {
        setEmergencyContacts(draft.emergencyContacts);
      }
      if (Array.isArray(draft?.educationEntries) && draft.educationEntries.length > 0) {
        setEducationEntries(draft.educationEntries);
      }
      if (Array.isArray(draft?.workEntries) && draft.workEntries.length > 0) {
        setWorkEntries(draft.workEntries);
      }
      if (typeof draft?.step === "number" && draft.step >= 1 && draft.step <= 6) {
        setStep(draft.step);
      }
      setSaveMessage("Draft restored successfully.");
    } catch {
      // Ignore invalid draft JSON.
    }
  }, []);

  const saveDraft = (targetStep = step) => {
    try {
      const draft = {
        step: targetStep,
        form,
        emergencyContacts,
        educationEntries,
        workEntries,
        savedAt: new Date().toISOString(),
      };
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      setSaveMessage("Details saved successfully.");
      return true;
    } catch {
      setSaveMessage("Unable to save details in this browser.");
      return false;
    }
  };

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const setDateField = (key, value) => {
    if (!value) {
      setField(key, "");
      return;
    }
    const year = Number(value.slice(0, 4));
    if (Number.isNaN(year) || year < 1900 || year > 2100) return;
    setField(key, value);
  };

  const clearCourseFilters = () => {
    setForm((prev) => ({
      ...prev,
      courseCountry: "All countries",
      courseQuery: "",
      courseUniversity: "All universities",
      courseProgramLevel: "All levels",
      courseIntake: "All intakes",
    }));
    if (errors.courseQuery) setErrors((prev) => ({ ...prev, courseQuery: undefined }));
  };

  const setPermanentField = (key, value) => {
    const currentKey = permanentToCurrentMap[key];
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (prev.sameAsPermanentAddress && currentKey) next[currentKey] = value;
      return next;
    });
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const toggleSameAsPermanent = (checked) => {
    setForm((prev) => {
      const next = { ...prev, sameAsPermanentAddress: checked };
      if (checked) {
        Object.entries(permanentToCurrentMap).forEach(([permanentKey, currentKey]) => {
          next[currentKey] = prev[permanentKey];
        });
      }
      return next;
    });
  };

  const updateEmergencyContact = (index, key, value) => {
    setEmergencyContacts((prev) =>
      prev.map((contact, i) =>
        i === index ? { ...contact, [key]: value } : contact,
      ),
    );
  };

  const addEmergencyContact = () => {
    setEmergencyContacts((prev) => [
      ...prev,
      { name: "", mobile: "", email: "", relationship: "" },
    ]);
  };

  const updateEducationEntry = (index, key, value) => {
    setEducationEntries((prev) =>
      prev.map((entry, i) => (i === index ? { ...entry, [key]: value } : entry)),
    );
    const errorKey = `education-${index}-${key}`;
    if (errors[errorKey]) setErrors((prev) => ({ ...prev, [errorKey]: undefined }));
  };

  const addEducationEntry = () => {
    setEducationEntries((prev) => [
      ...prev,
      {
        country: "Pakistan",
        levelOfStudy: "",
        institution: "",
        course: "",
        startDate: "",
        endDate: "",
        gradingScore: "Percentage",
        resultInfo: "",
      },
    ]);
  };

  const removeEducationEntry = (index) => {
    setEducationEntries((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  };

  const updateWorkEntry = (index, key, value) => {
    setWorkEntries((prev) =>
      prev.map((entry, i) => (i === index ? { ...entry, [key]: value } : entry)),
    );
    const errorKey = `work-${index}-${key}`;
    if (errors[errorKey]) setErrors((prev) => ({ ...prev, [errorKey]: undefined }));
  };

  const addWorkEntry = () => {
    setWorkEntries((prev) => [
      ...prev,
      {
        jobTitle: "",
        organisationName: "",
        organisationAddress: "",
        workPhone: "",
        workFromDate: "",
        workToDate: "",
        currentlyWorksHere: false,
      },
    ]);
  };

  const removeWorkEntry = (index) => {
    setWorkEntries((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  };

  const validateStep = (currentStep) => {
    const nextErrors = {};
    if (currentStep === 1) {
      if (!form.firstName.trim()) nextErrors.firstName = "First name is required.";
      if (!form.familyName.trim()) nextErrors.familyName = "Family name is required.";
      if (!form.email.trim()) nextErrors.email = "Email is required.";
      if (!form.phone.trim()) nextErrors.phone = "Phone number is required.";
      if (!form.dateOfBirth) nextErrors.dateOfBirth = "Date of birth is required.";
      if (!form.gender) nextErrors.gender = "Gender is required.";
      if (!form.permanentAddress1.trim())
        nextErrors.permanentAddress1 = "Permanent address is required.";
      if (!form.permanentPostCode.trim())
        nextErrors.permanentPostCode = "Permanent post code is required.";
    }
    if (currentStep === 2) {
      educationEntries.forEach((entry, index) => {
        if (!entry.levelOfStudy.trim()) {
          nextErrors[`education-${index}-levelOfStudy`] = "Level of study is required.";
        }
        if (!entry.institution.trim()) {
          nextErrors[`education-${index}-institution`] = "Institution is required.";
        }
        if (!entry.course.trim()) {
          nextErrors[`education-${index}-course`] = "Course is required.";
        }
      });
    }
    if (currentStep === 3) {
      if (!form.traveledOutsideHomeCountry)
        nextErrors.traveledOutsideHomeCountry = "Please select yes or no.";
      if (!form.previouslyAppliedVisa)
        nextErrors.previouslyAppliedVisa = "Please select yes or no.";
      if (!form.visitedApplyingCountry)
        nextErrors.visitedApplyingCountry = "Please select yes or no.";
      if (!form.overstayedVisa) nextErrors.overstayedVisa = "Please select yes or no.";
      if (!form.hadVisaRejection) nextErrors.hadVisaRejection = "Please select yes or no.";
      if (form.hadVisaRejection === "Yes" && form.refusalDetails.trim().length < 10) {
        nextErrors.refusalDetails = "Please add at least 10 characters.";
      }
    }
    if (currentStep === 4) {
      if (!form.hasWorkDetails) {
        nextErrors.hasWorkDetails = "Please select yes or no.";
      }
      if (form.hasWorkDetails === "Yes") {
        workEntries.forEach((entry, index) => {
          if (!entry.jobTitle.trim()) nextErrors[`work-${index}-jobTitle`] = "Job title is required.";
          if (!entry.organisationName.trim()) {
            nextErrors[`work-${index}-organisationName`] = "Organisation name is required.";
          }
          if (!entry.organisationAddress.trim()) {
            nextErrors[`work-${index}-organisationAddress`] = "Organisation address is required.";
          }
          if (!entry.workFromDate) nextErrors[`work-${index}-workFromDate`] = "From date is required.";
          if (!entry.currentlyWorksHere && !entry.workToDate) {
            nextErrors[`work-${index}-workToDate`] = "To date is required.";
          }
        });
      }
    }
    if (currentStep === 6) {
      if (!(form.courseQuery || "").trim()) {
        nextErrors.courseQuery = "Please enter course name to continue.";
      }
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    saveDraft(Math.min(steps.length, step + 1));
    setStep((s) => Math.min(steps.length, s + 1));
  };

  const handleSubmit = async () => {
    setSubmitError("");
    for (let s = 1; s <= steps.length; s += 1) {
      if (!validateStep(s)) {
        setStep(s);
        return;
      }
    }

    try {
      setSubmitting(true);
      saveDraft(step);
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form, emergencyContacts, educationEntries, workEntries }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Unable to submit application.");
      setSubmitted(true);
      window.localStorage.removeItem(DRAFT_KEY);
    } catch (error) {
      setSubmitError(error.message || "Unable to submit application.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (key) =>
    `rounded-xl border bg-[var(--background)]/80 px-4 py-3 text-sm outline-none transition focus:ring-2 ${
      errors[key]
        ? "border-[var(--accent)]/50 focus:border-[var(--accent)]/60 focus:ring-[var(--accent)]/15"
        : "border-[var(--border)] focus:border-[var(--accent)]/50 focus:ring-[var(--accent)]/15"
    }`;

  const filteredCourses = searchPrograms.filter((program) => {
    const countryOk =
      form.courseCountry === "All countries" || program.country === form.courseCountry;
    const universityOk =
      form.courseUniversity === "All universities" || program.university === form.courseUniversity;
    const levelOk =
      form.courseProgramLevel === "All levels" || program.level === form.courseProgramLevel;
    const intakeOk =
      form.courseIntake === "All intakes" || program.intakes.includes(form.courseIntake);
    const query = (form.courseQuery || "").trim().toLowerCase();
    const courseOk = !query || program.course.toLowerCase().includes(query);
    return countryOk && universityOk && levelOk && intakeOk && courseOk;
  });

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-8 text-center"
      >
        <p className="text-lg font-semibold text-[var(--foreground)]">
          Application ready to submit
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Application saved to backend successfully. You can now track it from applications list.
        </p>
        <Link
          href="/applications"
          className="mt-6 inline-block rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--on-accent)]"
        >
          Back to applications
        </Link>
      </motion.div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 text-sm font-medium">
        {steps.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              setStep(s.id);
              setErrors({});
            }}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 transition ${
              step === s.id
                ? "bg-[var(--accent)] text-[var(--on-accent)]"
                : step > s.id
                  ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                  : "bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {step > s.id && <Check className="h-3.5 w-3.5" />}
            {s.label}
          </button>
        ))}
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35 }}
        className="mt-8 glass rounded-2xl p-8"
      >
        {Object.keys(errors).length > 0 && (
          <p
            className="mb-4 rounded-xl border border-[var(--accent)]/25 bg-[var(--accent)]/8 px-4 py-3 text-sm text-[var(--accent-dim)]"
            role="alert"
          >
            Please complete the required fields before continuing.
          </p>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <h3 className="text-lg font-semibold">Personal details</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <input
                  placeholder="First name *"
                  value={form.firstName}
                  onChange={(e) => setField("firstName", e.target.value)}
                  className={`w-full ${inputClass("firstName")}`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-[var(--accent-dim)]">{errors.firstName}</p>
                )}
              </div>
              <div>
                <input
                  placeholder="Family name *"
                  value={form.familyName}
                  onChange={(e) => setField("familyName", e.target.value)}
                  className={`w-full ${inputClass("familyName")}`}
                />
                {errors.familyName && (
                  <p className="mt-1 text-xs text-[var(--accent-dim)]">{errors.familyName}</p>
                )}
              </div>
              <div>
                <input
                  placeholder="Email *"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className={`w-full ${inputClass("email")}`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-[var(--accent-dim)]">{errors.email}</p>
                )}
              </div>
              <div>
                <input
                  placeholder="Mobile number *"
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  className={`w-full ${inputClass("phone")}`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-[var(--accent-dim)]">{errors.phone}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--muted)]">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  value={form.dateOfBirth}
                  onChange={(e) => setDateField("dateOfBirth", e.target.value)}
                  className={`w-full ${inputClass("dateOfBirth")}`}
                  min="1900-01-01"
                  max="2100-12-31"
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-xs text-[var(--accent-dim)]">{errors.dateOfBirth}</p>
                )}
              </div>
              <div>
                <select
                  value={form.gender}
                  onChange={(e) => setField("gender", e.target.value)}
                  className={`w-full ${inputClass("gender")}`}
                >
                  <option value="">Gender *</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="mt-1 text-xs text-[var(--accent-dim)]">{errors.gender}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--muted)]">
                  Nationality
                </label>
                <select
                  value={form.nationality}
                  onChange={(e) => setField("nationality", e.target.value)}
                  className={`w-full ${inputClass("nationality")}`}
                >
                  <option value="">Select nationality</option>
                  {nationalityOptions.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <input
                  placeholder="Country of birth"
                  value={form.countryOfBirth}
                  onChange={(e) => setField("countryOfBirth", e.target.value)}
                  className={`w-full ${inputClass("countryOfBirth")}`}
                />
              </div>
              <div>
                <input
                  placeholder="Native language"
                  value={form.nativeLanguage}
                  onChange={(e) => setField("nativeLanguage", e.target.value)}
                  className={`w-full ${inputClass("nativeLanguage")}`}
                />
              </div>
              <div>
                <input
                  placeholder="Name as it appears in passport"
                  value={form.passportName}
                  onChange={(e) => setField("passportName", e.target.value)}
                  className={`w-full ${inputClass("passportName")}`}
                />
              </div>
              <div>
                <input
                  placeholder="Passport number"
                  value={form.passportNumber}
                  onChange={(e) => setField("passportNumber", e.target.value)}
                  className={`w-full ${inputClass("passportNumber")}`}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--muted)]">
                  Issue date
                </label>
                <input
                  type="date"
                  value={form.passportIssueDate}
                  onChange={(e) => setDateField("passportIssueDate", e.target.value)}
                  className={`w-full ${inputClass("passportIssueDate")}`}
                  min="1900-01-01"
                  max="2100-12-31"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--muted)]">
                  Expiry date
                </label>
                <input
                  type="date"
                  value={form.passportExpiryDate}
                  onChange={(e) => setDateField("passportExpiryDate", e.target.value)}
                  className={`w-full ${inputClass("passportExpiryDate")}`}
                  min="1900-01-01"
                  max="2100-12-31"
                />
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-xl font-semibold">Permanent address</h4>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <input
                    placeholder="Country *"
                    value={form.permanentCountry}
                    onChange={(e) => setPermanentField("permanentCountry", e.target.value)}
                    className={`w-full ${inputClass("permanentCountry")}`}
                  />
                </div>
                <div>
                  <input
                    placeholder="Address 1 *"
                    value={form.permanentAddress1}
                    onChange={(e) => setPermanentField("permanentAddress1", e.target.value)}
                    className={`w-full ${inputClass("permanentAddress1")}`}
                  />
                  {errors.permanentAddress1 && (
                    <p className="mt-1 text-xs text-[var(--accent-dim)]">
                      {errors.permanentAddress1}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    placeholder="Address 2"
                    value={form.permanentAddress2}
                    onChange={(e) => setPermanentField("permanentAddress2", e.target.value)}
                    className={`w-full ${inputClass("permanentAddress2")}`}
                  />
                </div>
                <div>
                  <input
                    placeholder="Post code *"
                    value={form.permanentPostCode}
                    onChange={(e) => setPermanentField("permanentPostCode", e.target.value)}
                    className={`w-full ${inputClass("permanentPostCode")}`}
                  />
                  {errors.permanentPostCode && (
                    <p className="mt-1 text-xs text-[var(--accent-dim)]">
                      {errors.permanentPostCode}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    placeholder="State / Territory *"
                    value={form.permanentState}
                    onChange={(e) => setPermanentField("permanentState", e.target.value)}
                    className={`w-full ${inputClass("permanentState")}`}
                  />
                </div>
                <div>
                  <input
                    placeholder="City *"
                    value={form.permanentCity}
                    onChange={(e) => setPermanentField("permanentCity", e.target.value)}
                    className={`w-full ${inputClass("permanentCity")}`}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-xl font-semibold">Current address</h4>
              <label className="mt-3 inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.sameAsPermanentAddress}
                  onChange={(e) => toggleSameAsPermanent(e.target.checked)}
                  className="h-4 w-4 rounded border-[var(--border)]"
                />
                Same as permanent address
              </label>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <input
                    placeholder="Country of residence *"
                    value={form.currentCountry}
                    onChange={(e) => setField("currentCountry", e.target.value)}
                    className={`w-full ${inputClass("currentCountry")}`}
                    disabled={form.sameAsPermanentAddress}
                  />
                </div>
                <div>
                  <input
                    placeholder="Address 1 *"
                    value={form.currentAddress1}
                    onChange={(e) => setField("currentAddress1", e.target.value)}
                    className={`w-full ${inputClass("currentAddress1")}`}
                    disabled={form.sameAsPermanentAddress}
                  />
                </div>
                <div>
                  <input
                    placeholder="Address 2"
                    value={form.currentAddress2}
                    onChange={(e) => setField("currentAddress2", e.target.value)}
                    className={`w-full ${inputClass("currentAddress2")}`}
                    disabled={form.sameAsPermanentAddress}
                  />
                </div>
                <div>
                  <input
                    placeholder="Post code *"
                    value={form.currentPostCode}
                    onChange={(e) => setField("currentPostCode", e.target.value)}
                    className={`w-full ${inputClass("currentPostCode")}`}
                    disabled={form.sameAsPermanentAddress}
                  />
                </div>
                <div>
                  <input
                    placeholder="State / Territory of residence *"
                    value={form.currentState}
                    onChange={(e) => setField("currentState", e.target.value)}
                    className={`w-full ${inputClass("currentState")}`}
                    disabled={form.sameAsPermanentAddress}
                  />
                </div>
                <div>
                  <input
                    placeholder="City of residence *"
                    value={form.currentCity}
                    onChange={(e) => setField("currentCity", e.target.value)}
                    className={`w-full ${inputClass("currentCity")}`}
                    disabled={form.sameAsPermanentAddress}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h4 className="text-xl font-semibold">Emergency contact details</h4>
                <button
                  type="button"
                  onClick={addEmergencyContact}
                  className="rounded-xl bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-[var(--on-accent)]"
                >
                  Add another +
                </button>
              </div>
              <p className="mt-1 text-sm text-[var(--muted)]">For emergency communication only.</p>

              <div className="mt-4 space-y-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/30 p-4">
                {emergencyContacts.map((contact, index) => (
                  <div
                    key={`emergency-${index}`}
                    className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-3"
                  >
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                      <input
                        placeholder="Name *"
                        value={contact.name}
                        onChange={(e) =>
                          updateEmergencyContact(index, "name", e.target.value)
                        }
                        className={`w-full ${inputClass("emergencyName")}`}
                      />
                      <input
                        placeholder="Mobile number *"
                        value={contact.mobile}
                        onChange={(e) =>
                          updateEmergencyContact(index, "mobile", e.target.value)
                        }
                        className={`w-full ${inputClass("emergencyMobile")}`}
                      />
                      <input
                        placeholder="Email *"
                        value={contact.email}
                        onChange={(e) =>
                          updateEmergencyContact(index, "email", e.target.value)
                        }
                        className={`w-full ${inputClass("emergencyEmail")}`}
                      />
                      <input
                        placeholder="Relationship *"
                        value={contact.relationship}
                        onChange={(e) =>
                          updateEmergencyContact(index, "relationship", e.target.value)
                        }
                        className={`w-full ${inputClass("emergencyRelationship")}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold">Academic history</h3>
              <button
                type="button"
                onClick={addEducationEntry}
                className="rounded-xl bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-[var(--on-accent)]"
              >
                Add another +
              </button>
            </div>

            <div className="space-y-4">
              {educationEntries.map((entry, index) => (
                <div
                  key={`education-${index}`}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/30 p-4"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[var(--muted)]">Degree #{index + 1}</p>
                    {educationEntries.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducationEntry(index)}
                        className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      placeholder="Country *"
                      value={entry.country}
                      onChange={(e) => updateEducationEntry(index, "country", e.target.value)}
                      className={`w-full ${inputClass(`education-${index}-country`)}`}
                    />
                    <select
                      value={entry.levelOfStudy}
                      onChange={(e) => updateEducationEntry(index, "levelOfStudy", e.target.value)}
                      className={`w-full ${inputClass(`education-${index}-levelOfStudy`)}`}
                    >
                      <option value="">Level of study *</option>
                      <option value="Secondary School Certificate">
                        Secondary School Certificate
                      </option>
                      <option value="Higher Secondary School Certificate">
                        Higher Secondary School Certificate
                      </option>
                      <option value="Undergraduate">Undergraduate</option>
                      <option value="Postgraduate">Postgraduate</option>
                    </select>
                    {errors[`education-${index}-levelOfStudy`] && (
                      <p className="text-xs text-[var(--accent-dim)]">
                        {errors[`education-${index}-levelOfStudy`]}
                      </p>
                    )}

                    <div>
                      <input
                        placeholder="Institution *"
                        value={entry.institution}
                        onChange={(e) =>
                          updateEducationEntry(index, "institution", e.target.value)
                        }
                        className={`w-full ${inputClass(`education-${index}-institution`)}`}
                      />
                      {errors[`education-${index}-institution`] && (
                        <p className="mt-1 text-xs text-[var(--accent-dim)]">
                          {errors[`education-${index}-institution`]}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        placeholder="Course *"
                        value={entry.course}
                        onChange={(e) => updateEducationEntry(index, "course", e.target.value)}
                        className={`w-full ${inputClass(`education-${index}-course`)}`}
                      />
                      {errors[`education-${index}-course`] && (
                        <p className="mt-1 text-xs text-[var(--accent-dim)]">
                          {errors[`education-${index}-course`]}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-[var(--muted)]">
                        Start date
                      </label>
                      <input
                        type="date"
                        value={entry.startDate}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (!value) {
                            updateEducationEntry(index, "startDate", "");
                            return;
                          }
                          const year = Number(value.slice(0, 4));
                          if (Number.isNaN(year) || year < 1900 || year > 2100) return;
                          updateEducationEntry(index, "startDate", value);
                        }}
                        className={`w-full ${inputClass(`education-${index}-startDate`)}`}
                        min="1900-01-01"
                        max="2100-12-31"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-[var(--muted)]">
                        End date
                      </label>
                      <input
                        type="date"
                        value={entry.endDate}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (!value) {
                            updateEducationEntry(index, "endDate", "");
                            return;
                          }
                          const year = Number(value.slice(0, 4));
                          if (Number.isNaN(year) || year < 1900 || year > 2100) return;
                          updateEducationEntry(index, "endDate", value);
                        }}
                        className={`w-full ${inputClass(`education-${index}-endDate`)}`}
                        min="1900-01-01"
                        max="2100-12-31"
                      />
                    </div>
                    <select
                      value={entry.gradingScore}
                      onChange={(e) => updateEducationEntry(index, "gradingScore", e.target.value)}
                      className={`w-full ${inputClass(`education-${index}-gradingScore`)}`}
                    >
                      <option value="Percentage">Percentage</option>
                      <option value="CGPA">CGPA</option>
                      <option value="Grade">Grade</option>
                    </select>
                    <input
                      placeholder="Result info (0-100 / CGPA / Grade)"
                      value={entry.resultInfo}
                      onChange={(e) => updateEducationEntry(index, "resultInfo", e.target.value)}
                      className={`w-full ${inputClass(`education-${index}-resultInfo`)}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Travel & Immigration</h3>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/20 p-4">
              <h4 className="text-xl font-semibold">Travel History</h4>
              {[
                ["traveledOutsideHomeCountry", "Has this student traveled outside their home country in the past ten years?"],
                ["previouslyAppliedVisa", "Has this student previously applied for a visa to any country?"],
                ["visitedApplyingCountry", "Has this student ever visited the country they are applying to?"],
                ["overstayedVisa", "Has this student ever overstayed a visa in any country?"],
                ["hadVisaRejection", "Has this student ever had a visa rejection?"],
              ].map(([key, label]) => (
                <div key={key} className="mt-4">
                  <p className="text-sm font-medium">{label}</p>
                  <div className="mt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setField(key, "Yes")}
                      className={`rounded-lg border px-5 py-1.5 text-sm font-semibold ${
                        form[key] === "Yes"
                          ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--on-accent)]"
                          : "border-[var(--border)] bg-[var(--background)]"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setField(key, "No")}
                      className={`rounded-lg border px-5 py-1.5 text-sm font-semibold ${
                        form[key] === "No"
                          ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--on-accent)]"
                          : "border-[var(--border)] bg-[var(--background)]"
                      }`}
                    >
                      No
                    </button>
                  </div>
                  {errors[key] && <p className="mt-1 text-xs text-[var(--accent-dim)]">{errors[key]}</p>}
                </div>
              ))}

              {form.hadVisaRejection === "Yes" && (
                <div className="mt-4">
                  <textarea
                    placeholder="If yes, provide refusal details *"
                    value={form.refusalDetails}
                    onChange={(e) => setField("refusalDetails", e.target.value)}
                    rows={4}
                    className={`w-full ${inputClass("refusalDetails")}`}
                  />
                  {errors.refusalDetails && (
                    <p className="mt-1 text-xs text-[var(--accent-dim)]">{errors.refusalDetails}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Work details</h3>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/20 p-4">
              <p className="text-sm font-medium">Do you want to add work details?</p>
              <div className="mt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setField("hasWorkDetails", "Yes")}
                  className={`rounded-lg border px-5 py-1.5 text-sm font-semibold ${
                    form.hasWorkDetails === "Yes"
                      ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--on-accent)]"
                      : "border-[var(--border)] bg-[var(--background)]"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setField("hasWorkDetails", "No")}
                  className={`rounded-lg border px-5 py-1.5 text-sm font-semibold ${
                    form.hasWorkDetails === "No"
                      ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--on-accent)]"
                      : "border-[var(--border)] bg-[var(--background)]"
                  }`}
                >
                  No
                </button>
              </div>
              {errors.hasWorkDetails && (
                <p className="mt-2 text-xs text-[var(--accent-dim)]">{errors.hasWorkDetails}</p>
              )}
            </div>

            {form.hasWorkDetails === "Yes" && (
              <div className="space-y-4">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={addWorkEntry}
                    className="rounded-xl bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-[var(--on-accent)]"
                  >
                    Add another +
                  </button>
                </div>

                {workEntries.map((entry, index) => (
                  <div
                    key={`work-${index}`}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/20 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-[var(--muted)]">Experience #{index + 1}</p>
                      {workEntries.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeWorkEntry(index)}
                          className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white"
                        >
                          Delete
                        </button>
                      )}
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <input
                          placeholder="Job title *"
                          value={entry.jobTitle}
                          onChange={(e) => updateWorkEntry(index, "jobTitle", e.target.value)}
                          className={`w-full ${inputClass(`work-${index}-jobTitle`)}`}
                        />
                        {errors[`work-${index}-jobTitle`] && (
                          <p className="mt-1 text-xs text-[var(--accent-dim)]">
                            {errors[`work-${index}-jobTitle`]}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          placeholder="Name of organisation *"
                          value={entry.organisationName}
                          onChange={(e) =>
                            updateWorkEntry(index, "organisationName", e.target.value)
                          }
                          className={`w-full ${inputClass(`work-${index}-organisationName`)}`}
                        />
                        {errors[`work-${index}-organisationName`] && (
                          <p className="mt-1 text-xs text-[var(--accent-dim)]">
                            {errors[`work-${index}-organisationName`]}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          placeholder="Address of organisation *"
                          value={entry.organisationAddress}
                          onChange={(e) =>
                            updateWorkEntry(index, "organisationAddress", e.target.value)
                          }
                          className={`w-full ${inputClass(`work-${index}-organisationAddress`)}`}
                        />
                        {errors[`work-${index}-organisationAddress`] && (
                          <p className="mt-1 text-xs text-[var(--accent-dim)]">
                            {errors[`work-${index}-organisationAddress`]}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          placeholder="Mobile number"
                          value={entry.workPhone}
                          onChange={(e) => updateWorkEntry(index, "workPhone", e.target.value)}
                          className={`w-full ${inputClass(`work-${index}-workPhone`)}`}
                        />
                      </div>
                      <div>
                        <input
                          type="date"
                          value={entry.workFromDate}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (!value) {
                              updateWorkEntry(index, "workFromDate", "");
                              return;
                            }
                            const year = Number(value.slice(0, 4));
                            if (Number.isNaN(year) || year < 1900 || year > 2100) return;
                            updateWorkEntry(index, "workFromDate", value);
                          }}
                          className={`w-full ${inputClass(`work-${index}-workFromDate`)}`}
                          min="1900-01-01"
                          max="2100-12-31"
                        />
                        {errors[`work-${index}-workFromDate`] && (
                          <p className="mt-1 text-xs text-[var(--accent-dim)]">
                            {errors[`work-${index}-workFromDate`]}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="date"
                          value={entry.workToDate}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (!value) {
                              updateWorkEntry(index, "workToDate", "");
                              return;
                            }
                            const year = Number(value.slice(0, 4));
                            if (Number.isNaN(year) || year < 1900 || year > 2100) return;
                            updateWorkEntry(index, "workToDate", value);
                          }}
                          className={`w-full ${inputClass(`work-${index}-workToDate`)}`}
                          disabled={Boolean(entry.currentlyWorksHere)}
                          min="1900-01-01"
                          max="2100-12-31"
                        />
                        {errors[`work-${index}-workToDate`] && (
                          <p className="mt-1 text-xs text-[var(--accent-dim)]">
                            {errors[`work-${index}-workToDate`]}
                          </p>
                        )}
                      </div>
                      <div className="md:col-span-3">
                        <label className="inline-flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={Boolean(entry.currentlyWorksHere)}
                            onChange={(e) =>
                              updateWorkEntry(index, "currentlyWorksHere", e.target.checked)
                            }
                          />
                          Student currently works here
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {step === 5 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Documents</h3>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/25 p-4">
              <p className="text-sm font-semibold">Note: Please upload these documents</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
                <li>CV</li>
                <li>PASSPORT</li>
                <li>POSTGRADUATE, UNDERGRADUATE, HSSC, SSC (TRANSCRIPT)</li>
                <li>POSTGRADUATE, UNDERGRADUATE, HSSC, SSC (CERTIFICATE)</li>
                <li>LETTER OF RECOMMENDATION (LOR)</li>
                <li>ENGLISH TEST &amp; MOI</li>
                <li>OTHER DOCUMENTS</li>
              </ul>
            </div>
            <div className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border)] py-14 transition hover:border-[var(--accent)]/40">
              <Upload className="h-10 w-10 text-[var(--accent)]" />
              <p className="mt-3 text-sm text-[var(--muted)]">Upload documents</p>
            </div>
          </div>
        )}
        {step === 6 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Course selection</h3>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/25 p-4">
              <div className="grid gap-4 md:grid-cols-5">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[var(--muted)]">Country</label>
                  <select
                    value={form.courseCountry}
                    onChange={(e) => setField("courseCountry", e.target.value)}
                    className={`w-full ${inputClass("courseCountry")}`}
                  >
                    <option>All countries</option>
                    {[...new Set(searchPrograms.map((p) => p.country))].map((country) => (
                      <option key={country}>{country}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[var(--muted)]">Course</label>
                  <input
                    placeholder="Course name"
                    value={form.courseQuery}
                    onChange={(e) => setField("courseQuery", e.target.value)}
                    className={`w-full ${inputClass("courseQuery")}`}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[var(--muted)]">University</label>
                  <select
                    value={form.courseUniversity}
                    onChange={(e) => setField("courseUniversity", e.target.value)}
                    className={`w-full ${inputClass("courseUniversity")}`}
                  >
                    <option>All universities</option>
                    {[...new Set(searchPrograms.map((p) => p.university))].map((university) => (
                      <option key={university}>{university}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[var(--muted)]">Program level</label>
                  <select
                    value={form.courseProgramLevel}
                    onChange={(e) => setField("courseProgramLevel", e.target.value)}
                    className={`w-full ${inputClass("courseProgramLevel")}`}
                  >
                    <option>All levels</option>
                    {[...new Set(searchPrograms.map((p) => p.level))].map((level) => (
                      <option key={level}>{level}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[var(--muted)]">Intake</label>
                  <select
                    value={form.courseIntake}
                    onChange={(e) => setField("courseIntake", e.target.value)}
                    className={`w-full ${inputClass("courseIntake")}`}
                  >
                    <option>All intakes</option>
                    {[...new Set(searchPrograms.flatMap((p) => p.intakes))].map((intake) => (
                      <option key={intake}>{intake}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={clearCourseFilters}
                  className="rounded-xl border border-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent)]"
                >
                  Clear filters
                </button>
              </div>
              {errors.courseQuery && (
                <p className="mt-1 text-xs text-[var(--accent-dim)]">{errors.courseQuery}</p>
              )}
              <p className="text-xs text-[var(--muted)]">
                Matched courses: {filteredCourses.length}
              </p>
            </div>
          </div>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          {saveMessage && (
            <p className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)]/60 px-4 py-3 text-sm text-[var(--foreground)]">
              {saveMessage}
            </p>
          )}
          {submitError && (
            <p className="w-full rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {submitError}
            </p>
          )}
          <button
            type="button"
            onClick={() => saveDraft(step)}
            className="rounded-xl border border-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent)]"
          >
            Save details
          </button>
          {step > 1 && (
            <button
              type="button"
              onClick={() => {
                setErrors({});
                setStep((s) => s - 1);
              }}
              className="rounded-xl border border-[var(--border)] px-5 py-2.5 text-sm font-medium"
            >
              Back
            </button>
          )}
          {step < steps.length ? (
            <button
              type="button"
              onClick={goNext}
              className="rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--on-accent)]"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dim)] px-5 py-2.5 text-sm font-semibold text-[var(--on-accent)]"
            >
              {submitting ? "Submitting..." : "Submit application"}
            </button>
          )}
        </div>
      </motion.div>
    </>
  );
}
