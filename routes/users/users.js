const express = require("express");
const router = express.Router();
const {
  registration,
  login,
  logout,
  getCurrent,
} = require("../../controllers/users");
const guard = require("../../helpers/guard");
const { validateUser } = require("./validation");
const loginLimit = require("../../helpers/rate-limit-login");

router.post("/registration", validateUser, registration);

router.post("/login", validateUser, loginLimit, login);

router.post("/logout", guard, logout);

router.post("/current", guard, getCurrent);

module.exports = router;
