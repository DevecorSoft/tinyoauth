/**
 * @alias RegisterController
 * @constructor
 * @param {RegisterService} register_service - register service
 */
function register_controller(register_service) {
  this.register_service = register_service;
}

/**
 *
 * @param {request} req
 * @param {response} res
 */
register_controller.prototype.handler = async function (req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send("");
    return;
  }

  if (await this.register_service.register(username, password)) {
    res.json({
      result: "succeeded",
    });
  } else {
    res.json({
      result: "failed",
    });
  }
};

/**
 * @class
 */
exports.RegisterController = register_controller;
