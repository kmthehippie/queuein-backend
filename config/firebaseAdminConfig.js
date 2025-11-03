const fs = require("fs");
const path = require("path");

// Decode the base64 env var to JSON
const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
if (!serviceAccountBase64) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY env var not set");
}
const serviceAccount = JSON.parse(
  Buffer.from(serviceAccountBase64, "base64").toString("utf-8")
);

// Initialize Firebase Admin (if not already done)
const admin = require("firebase-admin");
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // Add other config if needed
  });
}

module.exports = admin;
