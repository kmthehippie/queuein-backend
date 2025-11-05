const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const key = crypto.scryptSync(
  process.env.ENCRYPTION_KEY || "your-secret-key",
  "salt",
  32
);

function encrypt(text) {
  if (!text || typeof text !== "string") return text;
  const iv = Buffer.from("0123456789abcdef0123456789abcdef", "hex"); // Fixed IV for deterministic encryption
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

function decrypt(encrypted) {
  if (!encrypted || typeof encrypted !== "string" || !encrypted.includes(":")) {
    return encrypted;
  }
  const parts = encrypted.split(":");
  if (parts.length < 2) return encrypted;
  const ivHex = parts.shift();
  if (ivHex.length !== 32) return encrypted; // 16 bytes = 32 hex chars
  const iv = Buffer.from(ivHex, "hex");
  const encryptedText = parts.join(":");
  try {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (e) {
    console.error("Decrypt error:", e);
    return encrypted; // Return original if decryption fails
  }
}

module.exports = { encrypt, decrypt };
