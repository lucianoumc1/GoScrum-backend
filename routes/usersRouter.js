const express = require("express");

const UsersServices = require("../services/usersServices");
const handleValidator = require("../middlewares/handleValidator");
const { createUserSchema, loginUserSchema } = require("../schemas/userSchema");

const router = express.Router();

const service = new UsersServices();

router.get("/", async (req, res, next) => {
  try {
    const users = await service.getAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.getOne(id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/register",
  handleValidator(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newUser = await service.create(body);
      res.status(201).json({
        message: "Created",
        data: newUser,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/login",
  handleValidator(loginUserSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const response = await service.login(body);
      res.status(200).json({
        message: "ok",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const response = await service.update(id, body);
    res.status(200).json({
      message: "update",
      data: response,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.status(202).json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
