const mongoose = require("mongoose");
const { forgotPassword } = require("../controllers/auth");

const schema = new mongoose.Schema({
  email: { type: String, default: "" },
  password: { type: String, default: "" },
  isVerified: { type: Boolean, default: false },
  isForgotPasswordActive: { type: Boolean, default: false },
  linkSentAt: { type: Number }, //store time in seconds
  forgotPasswordLinkSentAt: { type: Number, default:0 }, //store time in seconds
  accountCreationAt: { type: String, default: "" },
});

module.exports = mongoose.model("Account", schema);
