const { LoginController } = require("./controller");
const { LoginService } = require("./service");
const { LoginRepository } = require("./repository");
const { ddbClient } = require("../../db/ddbClient");
const { timeSuppiler } = require("../../lib/timeSupplier");

exports.login = new LoginController(
  new LoginService(new LoginRepository(ddbClient, timeSuppiler))
).handler;