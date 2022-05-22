const { ddbClient } = require("../../db/ddbClient");
const { time_suppiler } = require("../../lib/timeSupplier");
const { user_id_supplier } = require("../../lib/userIdSupplier");
const { RegisterController } = require("./controller");
const { RegisterRepository } = require("./repository");
const { RegisterService } = require("./service");

const register_controller = new RegisterController(
  new RegisterService(new RegisterRepository(ddbClient, time_suppiler), user_id_supplier)
);

exports.register = register_controller.handler.bind(register_controller);
