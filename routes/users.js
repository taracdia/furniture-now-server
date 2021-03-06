const express = require("express");
const User = require("../models/user");
const cors = require("./cors");

const router = express.Router();

const passport = require("passport");
const authenticate = require("../authenticate");

/* GET users listing. */
router.get(
	"/",
	cors.corsWithOptions,
	authenticate.verifyUser,
	authenticate.verifyAdmin,
	function (req, res, next) {
		res.send("respond with a resource");
	}
);

router.post("/signup", cors.corsWithOptions, (req, res, next) => {
	User.register(
		new User({ username: req.body.username }),
		req.body.password,
		err => {
			if (err) {
				res.statusCode = 500;
				res.setHeader("Content-Type", "application/json");
				res.json({ err: err });
			} else {
				passport.authenticate("local")(req, res, () => {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json({
						success: true,
						status: "registration successful",
					});
				});
			}
		}
	);
});

router.post(
	"/login",
	cors.corsWithOptions,
	passport.authenticate("local"),
	(req, res) => {
		const token = authenticate.getToken({ _id: req.user.id });
		res.statusCode = 200;
		res.setHeader("Content-Type", "application/json");
		res.json({
			success: true,
			token: token,
			status: "You are successfully logged in",
		});
	}
);

module.exports = router;
