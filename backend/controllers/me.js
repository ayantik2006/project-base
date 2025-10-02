// Copyright 2025 Ayantik Sarkar
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// See the LICENSE file in the project root for license information.
// SPDX-License-Identifier: Apache-2.0

const Account = require("../models/Account.js");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

exports.nameUsername = async (req, res) => {
  const email = await jwt.verify(req.cookies.user, process.env.SECRET_KEY).id;
  const userData = await Account.findOne({ email: email });
  if (userData.username === "johndoe" || userData.name === "") {
    return res.json({ msg: "no name username" });
  }
};

exports.getMeProfileDetails = async (req, res) => {
  const email = await jwt.verify(req.cookies.user, process.env.SECRET_KEY).id;
  const userData = await Account.findOne({ email: email });
  return res.json({
    username: userData.username,
    name: userData.name,
    intro: userData.intro,
    avatarLink: userData.avatarLink,
    joined: userData.accountCreationAt,
    followersNum: userData.followersNum,
    followingNum: userData.followersNum,
    postsNum: userData.postsNum,
    projectsNum: userData.projectsNum,
    about: userData.about,
    education: userData.education,
  });
};

exports.isUsernameAvailable = async (req, res) => {
  const username = req.body.username;
  const email = await jwt.verify(req.cookies.user, process.env.SECRET_KEY).id;
  const userData = await Account.find({
    username: username,
    email: { $ne: email },
  });
  if (userData.length === 0 || username.split() === "")
    return res.json({ msg: "yes" });
  else return res.json({ msg: "no" });
};

exports.editProfile = async (req, res) => {
  const email = await jwt.verify(req.cookies.user, process.env.SECRET_KEY).id;
  const { name, username, intro, isRemoved } = req.body;

  try {
    const avatarLink = req.file.path;
    await Account.updateOne(
      { email: email },
      { name: name, username: username, intro: intro, avatarLink: avatarLink }
    );
    return res.json({
      msg: "success",
      avatarLink: avatarLink,
      name: name,
      username: username,
      intro: intro,
    });
  } catch (err) {
    const userData = await Account.findOne({ email: email });
    await Account.updateOne(
      { email: email },
      {
        name: name,
        username: username,
        intro: intro,
        avatarLink: userData.avatarLink,
      }
    );
    return res.json({
      msg: "success",
      avatarLink: userData.avatarLink,
      name: name,
      username: username,
      intro: intro,
    });
  }
};

exports.deleteProfilePicture = async (req, res) => {
  const email = await jwt.verify(req.cookies.user, process.env.SECRET_KEY).id;
  await Account.updateOne({ email: email }, { avatarLink: "" });
  return res.json({});
};

exports.saveAbout = async (req, res) => {
  const email = await jwt.verify(req.cookies.user, process.env.SECRET_KEY).id;
  const about = req.body.about;
  await Account.updateOne({ email: email }, { about: about });
  return res.json({});
};

exports.addEducation = async (req, res) => {
  const email = await jwt.verify(req.cookies.user, process.env.SECRET_KEY).id;
  const education = req.body.education;
  await Account.updateOne({ email: email }, { education: education });
  return res.json({});
};

exports.deleteEducation = async (req, res) => {
  const email = await jwt.verify(req.cookies.user, process.env.SECRET_KEY).id;
  const educationId = req.body.educationId;
  const userData = await Account.findOne({ email: email });
  let education = userData.education;
  education.delete(educationId);
  await Account.updateOne({ email: email }, { education: education });

  return res.json({ education: education });
};

