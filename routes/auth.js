const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");

//Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    //creating new user
    username: req.body.username,
    email: req.body.email,

    //to encrypt the password
    password: CryptoJS.AES.encrypt(
      //use in crypto js for encrypt for password
      req.body.password,
      process.env.KEY
    ).toString(),
  });
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    //to check the user
    const user = await User.findOne({
      email: req.body.email,
    });
    !user && res.status(401).json("Wrong password or username! ");

    //to decrypt the password
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    
    //to check the password
    originalPassword !== req.body.password &&
      res.status(401).json("Wrong password or usetname!");
    //to store the password   
    const { password, ...info } = user._doc;

    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
