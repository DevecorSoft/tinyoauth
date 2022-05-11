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
    this.register_service.register(username, password)
    res.json({
        result: "succeeded"
    })
}

exports.RegisterController = register_controller;
