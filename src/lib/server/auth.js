import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectDb } from "@/lib/db";
import { User } from "@/lib/models/User";

const TOKEN_COOKIE = "applyport_token";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Missing JWT_SECRET environment variable.");
  return secret;
}

export async function registerUser({ name, email, password, role = "student" }) {
  await connectDb();
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const existing = await User.findOne({ email: normalizedEmail }).lean();
  if (existing) {
    const error = new Error("An account with this email already exists.");
    error.status = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name: name.trim(), email: normalizedEmail, passwordHash, role });
  return { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
}

export async function loginUser({ email, password }) {
  await connectDb();
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail });
  if (!user) {
    const error = new Error("Invalid email or password.");
    error.status = 401;
    throw error;
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    const error = new Error("Invalid email or password.");
    error.status = 401;
    throw error;
  }

  return { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
}

export function signAuthToken(user) {
  return jwt.sign(user, getJwtSecret(), { expiresIn: "7d" });
}

export async function setAuthCookie(token) {
  const store = await cookies();
  store.set(TOKEN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAuthCookie() {
  const store = await cookies();
  store.set(TOKEN_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function getCurrentUserFromCookie() {
  const store = await cookies();
  const token = store.get(TOKEN_COOKIE)?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, getJwtSecret());
  } catch {
    return null;
  }
}

export function isAdminUser(user) {
  if (!user) return false;
  if (user.role === "admin") return true;
  const allowed = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(String(user.email || "").toLowerCase());
}
