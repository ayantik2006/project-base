const Account = require("../models/Account.js");
const jwt = require("jsonwebtoken");

exports.nameUsername = async (req, res) => {
  const email = await jwt.verify(req.cookies.user, process.env.SECRET_KEY).id;
  const userData = await Account.findOne({ email: email });
  if (userData.username === "" || userData.name === "") {
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
  });
};

exports.isUsernameAvailable = async (req, res) => {
  const username = req.body.username;
  const userData = await Account.find({ username: username });
  if (userData.length === 0) return res.json({ msg: "yes" });
  else return res.json({ msg: "no" });
};
