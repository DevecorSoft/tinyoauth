const jsonwebtoken = require("jsonwebtoken");

exports.JwtSupplier = {
  sign: (payload, secret) =>
    jsonwebtoken.sign(payload, secret, { expiresIn: 60 * 60 }),
  verify: (token, secret) => {
    try {
      return jsonwebtoken.verify(token, secret);
    } catch {
      return "";
    }
  },
};
