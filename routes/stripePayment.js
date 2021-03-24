var express = require("express");
const { makePayment } = require("../controllers/stripepayment");
var router = express.Router();
const { check, validationResult } = require("express-validator");

const { getUserById } = require("../controllers/user");

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);

router.post(
  "/payment/stripe/:userId",
  isSignedIn,
  isAuthenticated,
  makePayment
);

module.exports = router;
