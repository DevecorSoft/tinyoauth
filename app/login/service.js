/**
 * login service
 * @module login/service
 */
const { LoginRepository, ClientRepository } = require("./repository");
const crypto = require("crypto");

/**
 * @constructor
 * @param {LoginRepository} login_repo
 */
function login_service(login_repo) {
  this.login_repo = login_repo;
}

/**
 * verify user password
 * @param {String} username - user name
 * @param {String} password - hypertext password
 * @returns Boolean
 */
login_service.prototype.verify = async function (username, password) {
  const user = await this.login_repo.find_user_by_user_name(username);
  if (user) {
    if (user.password.S === password) {
      return user.user_id.S;
    }
    return false;
  }
  return false;
};

/**
 * set user status
 * @param {String} username - user name
 * @param {Boolean} status - online: true, offline: false
 * @returns Boolean
 */
login_service.prototype.set_status = async function (username, status) {
  await this.login_repo.update_user_status(username, status);
  return true;
};

/**
 * 
 * @param {ClientIdSupplier} clientIdSupplier - an object contains two funcions: generate_secret and generate_cid
 * @param {ClientRepository} clientRepository - client repository
 */
function client_service(clientIdSupplier, clientRepository) {
  this.clientIdSupplier = clientIdSupplier;
  this.clientRepository = clientRepository;
}

/**
 * issue client id and client secret
 * @param {String} user_id - user id
 * @returns {Promise<ClientIdentifier>}
 */
client_service.prototype.issue_identifier = async function (user_id) {
  const client_id = this.clientIdSupplier.generate_cid({
    user_id,
    id: crypto.randomUUID()
  });
  const client_secret = this.clientIdSupplier.generate_secret();
  await this.clientRepository.create_client_identifier({
    user_id,
    client_id,
    client_secret
  });
  return {
    client_id,
    client_secret,
  };
};

exports.LoginService = login_service;
exports.ClientService = client_service;

/**
 * @typedef ClientIdentifier
 * @type {Object}
 * @property {String} client_id - client id
 * @property {Strign} client_secret - client secret
 */

/**
 * @typedef ClientIdSupplier
 * @type {Object}
 * @property {Function} generate_cid
 * @property {Function} generate_secret
 */
