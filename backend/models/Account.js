/*
 * Project: Base
 * Author: Ayantik Sarkar
 * Copyright (c) 2025
 * Licensed under Apache 2.0
 */

const mongoose = require("mongoose");
const { forgotPassword } = require("../controllers/auth");

const schema = new mongoose.Schema({
  email: { type: String, default: "" },
  password: { type: String, default: "" },
  isVerified: { type: Boolean, default: false },
  isForgotPasswordActive: { type: Boolean, default: false },
  linkSentAt: { type: Number }, //store time in seconds
  forgotPasswordLinkSentAt: { type: Number, default: 0 }, //store time in seconds
  accountCreationAt: { type: String, default: "" },
  username: { type: String, default: "johndoe" },
  name: { type: String, default: "" },
  intro: { type: String, default: "" },
  avatarLink: { type: String, default: "" },
  followersNum: { type: Number, default: 0 },
  followingNum: { type: Number, default: 0 },
  postsNum: { type: Number, default: 0 },
  projectsNum: { type: Number, default: 0 },
  about: { type: String, default: "" },
});

module.exports = mongoose.model("Account", schema);
