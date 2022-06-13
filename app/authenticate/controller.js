/**
 * @alias AuthenticateController
 * @constructor
 * @param {JwtSupplier} jwt_supplier - jwt supplier
 */

function authenticate_controller(jwt_supplier) {
  this.jwt_supplier = jwt_supplier;
}

authenticate_controller.prototype.handler = function (req, res, next) {
  const jwt_token = req.header("Authorization");
  if (
    !jwt_token ||
    !this.jwt_supplier.verify(jwt_token.slice(7), process.env.SECRET_OF_JWT)
  ) {
    res.status(401).send("");
    return;
  }
  next();
};

/**
 * @class
 */
exports.AuthenticateController = authenticate_controller;
