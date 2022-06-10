/**
 * clientid controller module
 * @module app/clientid/controller
 */

/**
 * @alias ClientIdController
 * @constructor
 * @param {ClientService} client_service - client service
 */
function client_id_controller(client_service, jwt_supplier) {
  this.client_service = client_service;
  this.jwt_supplier = jwt_supplier;
}

/**
 * post client api handler
 * @param {request} req - express request
 * @param {response} res - express response
 */
client_id_controller.prototype.handler = function (req, res) {
  const token = req.header("Authorization");
  if (!token || !this.jwt_supplier.verify(token.slice(7))) {
    res.status(401).send("");
    return;
  }

  const { name, client_type, authorization_grant_type, redirect_urls } =
    req?.body;
  if (!name || !client_type || !authorization_grant_type || !redirect_urls) {
    res.status(400).send("");
    return;
  }

  this.client_service.issue_identifier({
    client_name: name,
    client_type,
    authorization_grant_type,
    redirect_urls,
  });
};

/**
 * @class
 */
exports.ClientIdController = client_id_controller;
