const { request, response } = require("express");
const { RegisterService } = require("./service");

/**
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
register_controller.prototype.handler = async function(req, res) {
    const username = req?.body?.username
    const password = req?.body?.password
    if (await this.register_service.register(username, password)) {
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
