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
  res.status(401);
};

/**
 * @class
 */
exports.ClientIdController = client_id_controller;
