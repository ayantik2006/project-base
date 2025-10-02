/*
 * Project: Base
 * Author: Ayantik Sarkar
 * Copyright (c) 2025
 * Licensed under Apache 2.0
 */

const mongoose = require("mongoose");
const isProduction = process.env.PRODUCTION === "true";

const MONGO_URI = isProduction
  ? process.env.MONGO_URI
  : "mongodb://127.0.0.1:27017/project_base";

const mongodb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (err) {
    console.log("db connection failed");
  }
};

module.exports = mongodb;
