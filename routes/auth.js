var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");

const { signout, signup, signin } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name", "First Name Should be atleast 3 char").isLength({ min: 3 }),
    check("email", "Email is not Valid").isEmail(),
    check("password", "Password should be atleast 5 character").isLength({
      min: 5,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "Email is required").isLength({ min: 1 }),
    check("email", "Invalid Email Id").isEmail(),
    check("password", "Password field is required.").isLength({ min: 1 }),
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
