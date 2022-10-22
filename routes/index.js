const authRouter = require("./authRouter");
const tasksRouter = require("./tasksRouter");
// const usersRouter = require("./usersRouter");

function routerApi(app) {
  app.use("/auth", authRouter);
  app.use("/task", tasksRouter);
  // app.use("/users", usersRouter);
}

module.exports = routerApi;
