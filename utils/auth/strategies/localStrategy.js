const boom = require("@hapi/boom");
const LocalStrategy = require("passport-local");
const { compare } = require("../../crypt");
const AuthService = require("../../../services/authService");

const service = new AuthService();

const localStrategy = new LocalStrategy(
  {
    usernameField: "userName",
    passwordField: "password",
  },
  async (userName, password, done) => {
    try {
      const user = await service.findByUserName(userName);
      const isMatch = await compare(password, user.password);
      if (!isMatch) {
        done(boom.notFound("user or password is incorrect"), false);
      }
      delete user.dataValues.password;
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = localStrategy;
