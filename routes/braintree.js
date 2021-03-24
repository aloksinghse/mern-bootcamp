var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { getUserById } = require("../controllers/user");

const { getToken, makePayment } = require("../controllers/braintree");

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);

router.get(
  "/payment/braintree/token/:userId",
  isSignedIn,
  isAuthenticated, getToken
);

router.post(
  "/payment/braintree/:userId",
  isSignedIn,
  isAuthenticated,
  makePayment
);

module.exports = router;
