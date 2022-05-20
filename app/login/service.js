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

function client_service() {}

exports.LoginService = login_service;
exports.ClientService = client_service;
