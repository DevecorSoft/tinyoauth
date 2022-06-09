/**
 * clientid controller module
 * @module app/clientid/controller
 */

/**
 * @alias ClientIdController
 * @constructor
 */
function client_id_controller() {}

/**
 * post client api handler
 * @param {request} req
 * @param {response} res
 */
client_id_controller.prototype.handler = function (req, res) {
  if (!req?.header("Authorization")) {
    res.status(401);
    return;
  }
  if (!req?.body?.name || !req?.body?.client_type) {
    res.status(400);
  }
};

/**
 * @class
 */
exports.ClientIdController = client_id_controller;
