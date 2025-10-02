// Copyright 2025 Ayantik Sarkar
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// See the LICENSE file in the project root for license information.
// SPDX-License-Identifier: Apache-2.0

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
