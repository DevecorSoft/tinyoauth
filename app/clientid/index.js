const { ClientService } = require("../login/service");
const { ClientIdController } = require("./controller");

const client_id_controller = new ClientIdController(new ClientService());

/**
 * post client api handler
 * @function
 * @param {request} req - express request
 * @param {response} res - express response
 * @see ClientIdController#handler
 */
exports.clientid = client_id_controller.handler.bind(client_id_controller);

/**
 * @typedef ClientData
 * @type {Object}
 * @property {string} user_id - user id
 * @property {string} client_id - client id
 * @property {string} client_secret - client secret
 * @property {string} client_name - client name
 * @property {string} client_type - client type
 * @property {string} authorization_grant_type - authorization grant type
 * @property {Array<string>} redirect_urls - redirect urls
 */
