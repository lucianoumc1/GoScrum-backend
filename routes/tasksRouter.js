const { Router } = require("express");
const passport = require("passport");
const TaskService = require("../services/taskService");
const handleValidator = require("../middlewares/handleValidator");
const {
  createTaskSchema,
  updateTasksSchema,
  idTaskSchema,
} = require("../schemas/tasksSchema");

const router = Router();

const service = new TaskService();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const { teamId } = req.user;
    try {
      const response = await service.getAll(teamId);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const { id } = req.user;
    try {
      const response = await service.getByUser(id);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  handleValidator(createTaskSchema, "body"),
  async (req, res, next) => {
    const body = req.body;
    const user = req.user;
    try {
      const newTask = await service.create(user, body);

      const response = {
        statusCode: 200,
        message: "OK",
        result: {
          ...newTask.dataValues,
        },
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  handleValidator(idTaskSchema, "params"),
  handleValidator(updateTasksSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const taskId = req.params.id;
      const userId = req.user.id;

      const result = await service.update(taskId, body, userId);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  handleValidator(idTaskSchema, "params"),
  async (req, res, next) => {
    const taskId = req.params.id;
    const userId = req.user.id;
    try {
      const result = await service.delete(taskId, userId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
