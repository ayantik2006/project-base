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
        avatarLink: isRemoved === "true" ? "" : userData.avatarLink,
      }
    );
    return res.json({
      msg: "success",
      avatarLink: isRemoved === "true" ? "" : userData.avatarLink,
      name: name,
      username: username,
      intro: intro,
    });
  }
};
