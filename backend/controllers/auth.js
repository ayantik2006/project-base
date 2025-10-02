// Copyright 2025 Ayantik Sarkar
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// See the LICENSE file in the project root for license information.
// SPDX-License-Identifier: Apache-2.0

const Account = require("../models/Account.js");
const bcrypt = require("bcrypt");
const { sendVerificationLink } = require("../services/sendVerificationLink.js");
const {
  sendForgotPasswordLink,
} = require("../services/sendForgotPasswordLink.js");
const jwt = require("jsonwebtoken");
const { getDateTime } = require("../services/getDateTime.js");
const {
  generateCodeVerifier,
  generateState,
  decodeIdToken,
} = require("arctic");
const { google } = require("../lib/oauth/google.js");
const isProduction = process.env.PRODUCTION === "true";

const frontendURL = isProduction
  ? "https://project-base-frontend.onrender.com"
  : "http://localhost:5173";

exports.getUser = (req, res) => {};

exports.signup = async (req, res) => {
  let { email, password, captchaKey } = req.body;

  const captchaSecretKey = process.env.CAPTCHA_SECRET_KEY;
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${captchaSecretKey}&response=${captchaKey}`;
  try {
    const response = await fetch(verificationUrl, { method: "POST" });
    const data = await response.json();
    if (!data.success) {
      return res.json({ msg: "captcha failure" });
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    let userData = await Account.findOne({ email: email });
    if (userData !== null && userData.isVerified === true) {
      return res.json({ msg: "failure 1" }); //failure 1: case of existence of a verified user
    } else if (userData !== null && userData.isVerified === false) {
      if (new Date().getTime() / 1000 - userData.linkSentAt > 60) {
        let userData = await Account.findOne({ email: email });
        await Account.updateOne({ email: email }, { password: password });
        sendVerificationLink(email, userData._id);
        await Account.updateOne(
          { email: email },
          { linkSentAt: new Date().getTime() / 1000 }
        );
        return res.json({ msg: "success" });
      } else if (new Date().getTime() / 1000 - userData.linkSentAt <= 60) {
        return res.json({ msg: "failure 2" }); //failure 2: case of existence of an unverified user trying email resend before 1 min
      }
    } else if (userData === null) {
      await Account.create({
        email: email,
        password: hashedPassword,
        linkSentAt: new Date().getTime() / 1000,
      });
      let userData = await Account.findOne({ email: email });
      sendVerificationLink(email, userData._id);
      return res.json({ msg: "success" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.verification = async (req, res) => {
  const id = req.params.id;
  const userData = await Account.findOne({ _id: id });
  if (
    !userData.isVerified &&
    new Date().getTime() / 1000 - userData.linkSentAt <= 600
  ) {
    await Account.updateOne({ _id: id }, { isVerified: true });
    await Account.updateOne({ _id: id }, { accountCreationAt: getDateTime() });
    res.render("../views/verify.ejs");
  } else if (
    !userData.isVerified &&
    new Date().getTime() / 1000 - userData.linkSentAt > 600
  ) {
    res.render("../views/verifyExpired.ejs");
  } else if (userData.isVerified) {
    res.render("../views/verify.ejs");
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const userData = await Account.findOne({ email: email });
  if (userData === null) {
    return res.json({ msg: "failure" });
  }
  if (!(await bcrypt.compare(password, userData.password))) {
    return res.json({ msg: "failure" });
  }
  if (!userData.isVerified) {
    return res.json({ msg: "failure" });
  }
  const token = jwt.sign({ id: email }, process.env.SECRET_KEY);
  res.cookie("user", token, {
    httpOnly: true,
    secure: isProduction, // later convert to true
    sameSite: isProduction ? "none" : "strict", //later convert to none
  });
  return res.json({ msg: "success" });
};

exports.signout = async (req, res) => {
  res.clearCookie("user", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "strict",
  });
  return res.json({ msg: "success" });
};

exports.getGoogleLoginPage = async (req, res) => {
  try {
    const email = await jwt.verify(req.cookies.user, process.env.SECRET_KEY).id;
    return res.redirect(frontendURL + "/feed");
  } catch (e) {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const url = google.createAuthorizationURL(state, codeVerifier, [
      "openid",
      "profile",
      "email",
    ]);

    const cookieConfig = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    res.cookie("google_oauth_state", state, cookieConfig);
    res.cookie("google_code_verifier", codeVerifier, cookieConfig);
    res.redirect(url.toString());
  }
};

exports.getGoogleLoginCallback = async (req, res) => {
  const { code, state } = req.query;

  const {
    google_oauth_state: storedState,
    google_code_verifier: codeVerifier,
  } = req.cookies;

  if (
    !code ||
    !state ||
    !storedState ||
    !codeVerifier ||
    state !== storedState
  ) {
    req.flash("errors", "Could not login!!");
    return res.redirect(frontendURL + "/signin");
  }

  let tokens;
  try {
    tokens = await google.validateAuthorizationCode(code, codeVerifier);
  } catch (e) {
    req.flash("errors", "Could not login!!");
    return res.redirect(frontendURL + "/signin");
  }

  const claims = decodeIdToken(tokens.idToken());
  const { sub: googleUserId, name, email } = claims;

  const userData = await Account.findOne({ email: email });
  if (userData === null) {
    await Account.create({
      email: email,
      isVerified: true,
      accountCreationAt: getDateTime(),
    });
    const token = jwt.sign({ id: email }, process.env.SECRET_KEY);
    res.cookie("user", token, {
      httpOnly: true,
      secure: true, // later convert to true
      sameSite: "none", //later convert to none
    });
    res.redirect(frontendURL + "/feed");
  } else if (userData !== null) {
    const token = jwt.sign({ id: email }, process.env.SECRET_KEY);
    res.cookie("user", token, {
      httpOnly: true,
      secure: true, // later convert to true
      sameSite: "none", //later convert to none
    });
    res.redirect(frontendURL + "/feed");
  }
};

exports.forgotPassword = async (req, res) => {
  const email = req.body.email;
  const userData = await Account.findOne({ email: email });
  if (userData == null) {
    return res.json({ msg: "failure 1" });
  }
  if (userData.password==="") {
    return res.json({ msg: "failure 2" });
  }
  if (
    userData.forgotPasswordLinkSentAt !== 0 &&
    new Date().getTime() / 1000 - userData.forgotPasswordLinkSentAt <= 60
  ) {
    return res.json({ msg: "failure 3" });
  }
  await sendForgotPasswordLink(email, userData._id);
  await Account.updateOne(
    { email: email },
    {
      isForgotPasswordActive: true,
      forgotPasswordLinkSentAt: new Date().getTime() / 1000,
    }
  );
  return res.json({ msg: "success" });
};

exports.getForgotPasswordPage = async (req, res) => {
  const id = req.params.id;
  const userData = await Account.findOne({ _id: id });
  if (
    userData.isForgotPasswordActive &&
    new Date().getTime() / 1000 - userData.forgotPasswordLinkSentAt <= 600
  )
    res.render("../views/forgotPassword.ejs", {
      backendURL: process.env.BACKEND_URL,
      id: id,
    });
  else if (
    userData.isForgotPasswordActive &&
    new Date().getTime() / 1000 - userData.forgotPasswordLinkSentAt > 600
  ) {
    res.render("../views/forgotPasswordExpired.ejs");
  } else if (!userData.isForgotPasswordActive) {
    res.render("../views/forgotPasswordDone.ejs");
  }
};

exports.forgotPasswordReset = async (req, res) => {
  const { password, id } = req.body;
  const userData = await Account.findOne({ _id: id });
  
  if (!userData.isForgotPasswordActive) {
    return res.render("../views/forgotPasswordDone.ejs");
  } else if (
    userData.isForgotPasswordActive &&
    new Date().getTime() / 1000 - userData.forgotPasswordLinkSentAt > 600
  ) {
    return res.render("../views/forgotPasswordExpired.ejs");
  }
  else{
    await Account.updateOne({_id:id},{password:await bcrypt.hash(password,10),isForgotPasswordActive:false});
    return res.render("../views/forgotPasswordDone.ejs");
  }
};
