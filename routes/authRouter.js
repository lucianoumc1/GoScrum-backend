const { Router } = require("express");
const passport = require("passport");
const AuthService = require("../services/authService");
const { loginAuthSchema, createAuthSchema } = require("../schemas/authSchema");
const handleValidator = require("../middlewares/handleValidator");
const { generateToken } = require("../utils/jwt");

const authData = require("../utils/auth/authData.json");

const router = Router();
const service = new AuthService();

router.post(
  "/login",
  handleValidator(loginAuthSchema, "body"),
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req;

      const payload = {
        ...user.user.dataValues,
      };

      const token = generateToken(payload);

      const response = {
        statusCode: 200,
        message: "OK",
        result: {
          token,
          user: {
            userName: user.userName,
            ...user.user.dataValues,
          },
        },
      };

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/register",
  handleValidator(createAuthSchema, "body"),
  async (req, res, next) => {
    const { body } = req;
    try {
      const response = await service.create(body);
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/data", (req, res, next) => {
  try {
    res.json(authData);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
