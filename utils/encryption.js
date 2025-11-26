const crypto = require("crypto");

const algorithm = "aes-256-gcm";
const key = crypto.scryptSync(
  process.env.ENCRYPTION_KEY || "your-secret-key",
  "salt",
  32
);

// ✅ GENERIC HASH FUNCTION (works for everything)
function hash(text) {
  if (!text || typeof text !== "string") return null;

  // Normalize: lowercase, trim, remove extra whitespace
  const normalized = text.toLowerCase().trim().replace(/\s+/g, " ");

  return crypto.createHash("sha256").update(normalized).digest("hex");
}

// ✅ SPECIALIZED HASH FOR PHONE NUMBERS (removes formatting)
function hashPhone(phone) {
  if (!phone || typeof phone !== "string") return null;

  // Remove all non-digit characters: +65-1234-5678 → 6512345678
  const cleanPhone = phone.replace(/\D/g, "");

  return crypto.createHash("sha256").update(cleanPhone).digest("hex");
}

// ✅ ENCRYPTION (for display fields)
function encrypt(text) {
  if (!text || typeof text !== "string") return text;

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag();

  return iv.toString("hex") + ":" + authTag.toString("hex") + ":" + encrypted;
}

function decrypt(encrypted) {
  if (!encrypted || typeof encrypted !== "string" || !encrypted.includes(":")) {
    return encrypted;
  }

  try {
    const parts = encrypted.split(":");
    if (parts.length !== 3) return encrypted;

    const iv = Buffer.from(parts[0], "hex");
    const authTag = Buffer.from(parts[1], "hex");
    const encryptedText = parts[2];

    if (iv.length !== 16 || authTag.length !== 16) return encrypted;

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (e) {
    console.error("Decrypt error:", e.message);
    return encrypted;
  }
}

module.exports = {
  hash, // ✅ Generic hash for emails, names, etc.
  hashPhone, // ✅ Specialized hash for phone numbers
  encrypt,
  decrypt,
};
