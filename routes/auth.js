const routerr = require("express").Router();
const User = require("../models/User");

//Register
routerr.post("/register", (req, res) => {
  const newUser = new User({
    username: req.body.username,
  });
});
