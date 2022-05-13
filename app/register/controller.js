const { request, response } = require("express");

function register_controller(register_service) {
  this.register_service = register_service;
}

/**
 *
 * @param {request} req
 * @param {response} res
 */
register_controller.prototype.handler = function(req, res) {
    const username = req?.body?.username
    const password = req?.body?.password
    if (this.register_service.register(username, password)) {
      res.json({
          result: "succeeded"
      })
    } else {
      res.json({
        result: "failed"
      })
    }
}

exports.RegisterController = register_controller;
