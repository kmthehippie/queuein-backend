// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://localhost:3000",
//   "127.0.0.1",
//   "https://queuein-frontend.onrender.com",
// ];

const corsOrigins = process.env.CORS_ORIGINS;

let allowedOrigins = [];

if (corsOrigins) {
  allowedOrigins = corsOrigins.split(",").map((s) => s.trim());
}

module.exports = allowedOrigins;
