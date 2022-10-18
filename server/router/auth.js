const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

require("../db/conn");

const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send(`Hello world from the serer js`);
});

//using promiss

// router.post("/register",  (req, res) => {

//   const { name, email, phone, work, password, cpassword } = req.body;
//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: "plz filled the data " });
//   }

//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ error: " Email Already Exist " });
//       }

//       const user = new User({ name, email, phone, work, password, cpassword });
//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "user registered successfuly" });
//         })
//         .catch((err) => res.status(500).json({ error: "Failed registered" }));
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// using async

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "plz filled the data " });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: " Email Already Exist " });
    }

    const user = new User({ name, email, phone, work, password, cpassword });

    await user.save();

    res.status(201).json({ message: "user registered successfuly" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "plz filled the data " });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: " Invalid Crediential pass" });
      } else {
        res.json({ message: "user Signin successfully" });
      }
    } else {
      res.status(400).json({ error: " Invalid Crediential " });
    }

    // console.log(userLogin);
  } catch (err) {
    console.log(err);
  }
});

//about us ka page

// router.get("/about", authenticate, (req, res) => {
//   res.send("Hello World from about");
// });

module.exports = router;
