const express = require("express");
const router = express.Router();
const {
  registration,
  login,
  logout,
  getCurrent,
  uploadAvatar,
  verifyUser,
  repeatEmailForVerifyUser,
} = require("../../controllers/users");
const guard = require("../../helpers/guard");
const { validateUser, validateUserVerification } = require("./validation");
const loginLimit = require("../../helpers/rate-limit-login");
const upload = require("../../helpers/uploads");
const wrapError = require("../../helpers/error-handler");

router.post("/registration", validateUser, registration);

router.post("/login", validateUser, loginLimit, login);

router.post("/logout", guard, logout);

router.post("/current", guard, getCurrent);

router.patch("/avatar", guard, upload.single("avatar"), uploadAvatar);

router.get("/verify/:verificationToken", wrapError(verifyUser));

router.post(
  "/verify",
  validateUserVerification,
  wrapError(repeatEmailForVerifyUser)
);

module.exports = router;
