const mongoose = require("mongoose");
const express = require("express");
const app = express();

require("dotenv").config();
require("./db/conn");

// const User = require('./model/userSchema');

app.use(express.json());

app.use(require("./router/auth"));

const PORT = process.env.PORT;

// app.get("/about",  (req, res) => {
//   res.send("Hello World from about");
// });

app.get("/contact", (req, res) => {
  res.send("Hello World from conatct");
});

// app.get("/signin", (req, res) => {
//   res.send("Hello World from Login");
// });

// app.get("/signup", (req, res) => {
//   res.send("Hello World from registration");
// });

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
