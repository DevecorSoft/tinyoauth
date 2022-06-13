/**
 * @alias ClientIdController
 * @constructor
 * @param {ClientService} client_service - client service
 */
function client_id_controller(client_service) {
  this.client_service = client_service;
}

/**
 * post client api handler
 * @param {request} req - express request
 * @param {response} res - express response
 */
client_id_controller.prototype.handler = function (req, res) {
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

  res.json("");
};

/**
 * @class
 */
exports.ClientIdController = client_id_controller;
