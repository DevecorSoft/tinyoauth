const { ddbClient } = require("../../db/ddbClient");
const { RegisterController } = require("./controller");
const { RegisterRepository } = require("./repository");
const { RegisterService } = require("./service");

const register_controller = new RegisterController(
  new RegisterService(new RegisterRepository(ddbClient))
);

exports.register = register_controller.handler.bind(register_controller);
