/**
 * login service
 * @module login/service
 */

const { LoginRepository } = require("./repository");

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
      return true;
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
 * @param {String} username - user name
 * @returns {ClientIdentifier}
 */
client_service.prototype.issue_identifier = function (username) {
  const client_id = this.clientIdSupplier.generate_cid();
  const client_secret = this.clientIdSupplier.generate_secret();
  this.clientRepository.create_client_identifier({
    user: username,
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
