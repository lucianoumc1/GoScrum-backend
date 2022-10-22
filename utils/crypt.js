const bcrypt = require("bcrypt");

const encrypt = async (pass) => {
  const passHash = await bcrypt.hash(pass, 10);
  return passHash;
};

const compare = async (input, hash) => {
  const res = await bcrypt.compare(input, hash);
  return res;
};

module.exports = { encrypt, compare };
