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
    const userData=await Account.findOne({email:email});
    return res.json({username:userData.username,name:userData.name,intro:userData.intro})
};
