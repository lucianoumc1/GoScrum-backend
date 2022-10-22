const { Strategy, ExtractJwt } = require("passport-jwt");
const { jwtKey } = require("../../../config/config");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtKey,
};

const jwtStrategy = new Strategy(options, (payload, done) => {
  done(null, payload);
});

module.exports = jwtStrategy;
