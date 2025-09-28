const Account = require("../models/Account.js");
const bcrypt = require("bcrypt");
const { sendVerificationLink } = require("../services/sendVerificationLink.js");
const jwt = require("jsonwebtoken");
const { getDateTime } = require("../services/getDateTime.js");
import {generateCodeVerifier, generateState} from "arctic";
import { google } from "../lib/oauth/google.js";


exports.getUser = (req, res) => {};

exports.signup = async (req, res) => {
  let { email, password } = req.body;
  let hashedPassword = await bcrypt.hash(password, 10);
  let userData = await Account.findOne({ email: email });
  if (userData !== null && userData.isVerified === true) {
    return res.json({ msg: "failure 1" }); //failure 1: case of existence of a verified user
  } else if (userData !== null && userData.isVerified === false) {
    if (new Date().getTime() / 1000 - userData.linkSentAt > 60) {
      let userData = await Account.findOne({ email: email });
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
    secure: true, // later convert to true
    sameSite: "none", //later convert to none
  });
  return res.json({ msg: "success" });
};

exports.getGoogleLoginPage = async (req, res) => {
  try {
    const email = await jwt.verify(req.cookies.user, process.env.SECRET_KEY).id;
    return res.json({msg:"logged in"})
  } catch (e) {
    const state=generateState();
    const codeVerifier=generateCodeVerifier();
    const url=google.createAuthorizationURL(state,codeVerifier,["openid","profile","email"]);
  }

  const cookieConfig={
    httpOnly:true,
    secure:true,
    sameSite:"none"
  }

  res.cookie("google_oauth_state",state,cookieConfig);
  res.cookie("google_code_verifier",codeVerifier,cookieConfig);
  res.redirect(url.toString());
};
