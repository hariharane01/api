const jwt = require("jsonwebtoken");

function verify(req, res, next) {
  const authHeader = req.headers.token;
  if (authHeader) {
    //to get token
    const token = authHeader.split(" ")[1];

    //to verify the token
    jwt.verify(token, process.env.KEY, (err, user) => {
      if (err) res.status(403).json("Token is not valid! ");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
}

module.exports = verify;
