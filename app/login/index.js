const { LoginController } = require("./controller");
const { LoginService } = require("./service");
const { LoginRepository } = require("./repository");
const { ddbClient } = require("../../db/ddbClient");
const { time_suppiler } = require("../../lib/timeSupplier");

const login_controller = new LoginController(
  new LoginService(new LoginRepository(ddbClient, time_suppiler))
);

exports.login = login_controller.handler.bind(login_controller);
