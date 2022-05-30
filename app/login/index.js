/**
 * login module
 * @module app/login
 * @see module:app/register
 */


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

/**
 * post login api handler
 * @function
 * @param {request} req - express request
 * @param {response} res - express response
 * @see LoginController#handler
 */
exports.login = login_controller.handler.bind(login_controller);
