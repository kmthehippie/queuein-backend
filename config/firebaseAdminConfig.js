const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

// Decode the base64 env var to JSON
const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
if (!serviceAccountBase64) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY env var not set");
}
const serviceAccount = JSON.parse(
  Buffer.from(serviceAccountBase64, "base64").toString("utf-8")
);

try {
  // Try to get the existing app to avoid re-initialization
  admin.getApp();
  console.log("Firebase Admin SDK already initialized (reusing existing app).");
} catch (error) {
  // If no app exists, initialize it
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Firebase Admin SDK initialized successfully.");
}

module.exports = admin;
