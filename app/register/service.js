const { RegisterRepository } = require("./repository");

/**
 * @constructor
 * @param {RegisterRepository} register_repository 
 */
function register_service(register_repository) {
  this.register_repo = register_repository;
}


/**
 * create user with username and password
 * @param {String} username 
 * @param {String} password 
 * @returns Boolean
 */
register_service.prototype.register = async function (username, password) {
  await this.register_repo.create_user(username, password);
  return true;
};

exports.RegisterService = register_service;
