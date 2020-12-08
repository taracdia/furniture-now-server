const express = require("express");
const User = require("../models/user");

const router = express.Router();

const passport = require("passport");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", (req, res, next) => {
  User.register(
    new User({username: req.body.username}),
    req.body.password,
    err => {
      if (err){
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({err: err});
      } else {
        passport.authenticate("local")(req, res, () => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({success: true, status: "registration successful"});
        });
      }
    }
  );
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({success: true, status: "You are successfully logged in"});
});

module.exports = router;
