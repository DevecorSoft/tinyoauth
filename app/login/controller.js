/**
 * login controller module
 * @module app/login/controller
 */

/**
 * @alias LoginController
 * @constructor
 * @param {LoginService} login_service
 * @param {ClientService} client_service
 */
function login_controller(login_service, client_service) {
  this.login_service = login_service;
  this.client_service = client_service;
}

/**
 * post login api handler
 * @param {request} req
 * @param {response} res
 */
login_controller.prototype.handler = async function (req, res) {
  const username = req.body?.username;
  const password = req.body?.password;

  const user_id = await this.login_service.verify(username, password);
  if (user_id) {
    await this.login_service.set_status(username, true);
    const jwt = this.login_service.issue_jwt(user_id)
    res.json({
      result: "succeeded",
      authenticator: jwt
    });
  } else {
    res.json({
      result: "failed",
      authenticator: null
    });
  }
};

/**
 * @class
 */
exports.LoginController = login_controller;
