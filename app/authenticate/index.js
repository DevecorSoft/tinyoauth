/**
 * authenticate module
 * @module app/authenticate
 */

const { JwtSupplier } = require("../../lib/jwtSupplier");
const { AuthenticateController } = require("./controller");

const authenticate_controller = new AuthenticateController(JwtSupplier);

/**
 * authenticate user handler
 * @function
 * @param {request} req - express request
 * @param {response} res - express response
 * @param {Function} next - express next
 * @see AuthenticateController#handler
 */
exports.authenticate = authenticate_controller.handler.bind(
  authenticate_controller
);
