const express = require("express");
const cors=require("cors");
require("dotenv").config();
const authRoutes=require("./routes/auth.js")
const cookieParser=require("cookie-parser");
const mongodb = require("./config/db.js");
const path = require('path');

const app = express();
const PORT = process.env.PORT;
const SECRET_KEY=process.env.SECRET_KEY;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend/build')));
const frontendURL="https://project-base-frontend.onrender.com";
app.use(
  cors({
    origin: [frontendURL], 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true, 
  })
);
mongodb();
app.set("view engine","ejs");
app.use(cookieParser(SECRET_KEY));
app.use("/auth",authRoutes);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log("server live");
});
