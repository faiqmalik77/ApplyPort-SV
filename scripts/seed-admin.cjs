const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

function loadLocalEnvIfPresent() {
  const file = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(file)) return;
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx <= 0) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value || !String(value).trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value.trim();
}

async function seedAdmin() {
  loadLocalEnvIfPresent();

  const mongoUri = getRequiredEnv("MONGODB_URI");
  const dbName = (process.env.MONGODB_DB || "applyport").trim();
  const name = (process.env.ADMIN_SEED_NAME || "ApplyPort Admin").trim();
  const email = getRequiredEnv("ADMIN_SEED_EMAIL").toLowerCase();
  const password = getRequiredEnv("ADMIN_SEED_PASSWORD");

  const UserSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, unique: true, lowercase: true, trim: true },
      passwordHash: { type: String, required: true },
      role: { type: String, enum: ["student", "admin"], default: "student" },
    },
    { timestamps: true }
  );

  const User = mongoose.models.User || mongoose.model("User", UserSchema);
  await mongoose.connect(mongoUri, { dbName });

  const passwordHash = await bcrypt.hash(password, 12);
  const existing = await User.findOne({ email });

  if (existing) {
    existing.name = name;
    existing.passwordHash = passwordHash;
    existing.role = "admin";
    await existing.save();
    console.log(`Updated existing user as admin: ${email}`);
  } else {
    await User.create({ name, email, passwordHash, role: "admin" });
    console.log(`Created new admin user: ${email}`);
  }
}

seedAdmin()
  .then(async () => {
    await mongoose.disconnect();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error(error.message || "Failed to seed admin.");
    try {
      await mongoose.disconnect();
    } catch {
      // ignore disconnect errors
    }
    process.exit(1);
  });
