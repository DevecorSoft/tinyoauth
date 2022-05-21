const { LoginController } = require("./controller");
const { LoginService, ClientService } = require("./service");
const { LoginRepository, ClientRepository } = require("./repository");
const { ddbClient } = require("../../db/ddbClient");
const { time_suppiler } = require("../../lib/timeSupplier");
const {
  clientIdentifierSupplier,
} = require("../../lib/clientIdentifierSupplier");

const login_controller = new LoginController(
  new LoginService(new LoginRepository(ddbClient, time_suppiler)),
  new ClientService(
    clientIdentifierSupplier,
    new ClientRepository(ddbClient, time_suppiler)
  )
);

exports.login = login_controller.handler.bind(login_controller);
