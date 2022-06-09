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
    res.status(401).send("");
    return;
  }
  const { name, client_type, authorization_grant_type } = req?.body;
  if (!name || !client_type || !authorization_grant_type) {
    res.status(400).send("");
  }
};

/**
 * @class
 */
exports.ClientIdController = client_id_controller;
