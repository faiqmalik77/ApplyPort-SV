import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!global._mongooseCache) {
  global._mongooseCache = { conn: null, promise: null };
}

export async function connectDb() {
  if (!MONGODB_URI) {
    throw new Error("Missing MONGODB_URI environment variable.");
  }

  if (global._mongooseCache.conn) {
    return global._mongooseCache.conn;
  }

  if (!global._mongooseCache.promise) {
    global._mongooseCache.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: process.env.MONGODB_DB || "applyport",
      })
      .then((m) => m);
  }

  global._mongooseCache.conn = await global._mongooseCache.promise;
  return global._mongooseCache.conn;
}
