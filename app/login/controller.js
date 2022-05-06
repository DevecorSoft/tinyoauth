const { request, response } = require("express");
const { LoginService } = require("./service");

/**
 * @constructor
 * @param {LoginService} login_service
 */
function login_controller(login_service) {
  this.login_service = login_service;
}

/**
 *
 * @param {request} req
 * @param {response} res
 */
login_controller.prototype.handler = function (req, res) {
  const username = req.body?.username;
  const password = req.body?.password;

  if (this.login_service.verify(username, password)) {
    this.login_service.set_status(username, true);
    res.json({
      result: "succeeded",
    });
  } else {
    res.json({
      result: "failed",
    });
  }
};

exports.LoginController = login_controller;
