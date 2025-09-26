const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const mongodb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (err) {
    console.log("db connection failed");
  }
};

module.exports = mongodb;
