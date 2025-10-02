/*
 * Project: Base
 * Author: Ayantik Sarkar
 * Copyright (c) 2025
 * Licensed under Apache 2.0
 */

const { Google } = require("arctic");

exports.google = new Google(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://project-base-backend.onrender.com/auth/google/callback"
);
