const { LoginController } = require("./controller");
const { LoginService } = require("./service");
const { LoginRepository } = require("./repository");
const { ddbClient } = require("../../db/ddbClient");
const { timeSuppiler } = require("../../lib/timeSupplier");

const login_controller = new LoginController(
  new LoginService(new LoginRepository(ddbClient, timeSuppiler))
);

exports.login = login_controller.handler.bind(login_controller);
