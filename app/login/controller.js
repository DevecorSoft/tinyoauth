const { request, response } = require("express");
const { LoginService, ClientService } = require("./service");

/**
 * @constructor
 * @param {LoginService} login_service
 * @param {ClientService} client_service
 */
function login_controller(login_service, client_service) {
  this.login_service = login_service;
  this.client_service = client_service;
}

/**
 *
 * @param {request} req
 * @param {response} res
 */
login_controller.prototype.handler = async function (req, res) {
  const username = req.body?.username;
  const password = req.body?.password;

  if (await this.login_service.verify(username, password)) {
    this.login_service.set_status(username, true);
    const { client_id, client_secret } =
      this.client_service.issue_identifier(username);
    res.json({
      result: "succeeded",
      client_id,
      client_secret,
    });
  } else {
    res.json({
      result: "failed",
      client_id: null,
      client_secret: null,
    });
  }
};

exports.LoginController = login_controller;
