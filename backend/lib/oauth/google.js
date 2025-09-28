const { Google } = require("arctic/google");

exports.google = new Google(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://project-base-backend.onrender.com/auth/google/callback"
);
