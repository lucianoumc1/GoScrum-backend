const { ValidationError } = require("sequelize");

function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

function handleBoomError(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

function handleOrmError(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      name: err.name,
      message: err.message,
    });
  }
  next(err);
}

function handleError(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

module.exports = { logErrors, handleBoomError, handleError, handleOrmError };
