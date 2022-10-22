const jwt = require("jsonwebtoken");
const { jwtKey } = require("../config/config");

const generateToken = (payload) => {
  const key = jwtKey;
  return jwt.sign(payload, key);
};

const verifyToken = (token) => {
  const key = jwtKey;
  return jwt.verify(token, key);
};

module.exports = { generateToken, verifyToken };
