/* host / api/ auth */

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const router = Router();
const { createUser, loginUser, renewToken } = require("../controllers/auth");

router.post(
  "/new",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password should have at least 6 characters").isLength({
      min: 6,
    }),
    validateFields,
  ],
  createUser
); // en llaves va una collecion de middlewares
router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password should have at least 6 characters").isLength({
      min: 6,
    }),
    validateFields,
  ],
  loginUser
);

router.get("/renew", renewToken);

module.exports = router;
