/**
 * services of post register api
 * @module app/register/service
 */

/**
 * @alias RegisterService
 * @constructor
 * @param {RegisterRepository} register_repository
 * @param {UserIdSupplier} user_id_supplier
 */
function register_service(register_repository, user_id_supplier) {
  this.register_repo = register_repository;
  this.user_id_supplier = user_id_supplier;
}

/**
 * create user with username and password
 * @param {String} username
 * @param {String} password
 * @returns Boolean
 */
register_service.prototype.register = async function (username, password) {
  await this.register_repo.create_user(
    username,
    password,
    this.user_id_supplier.generate_user_id()
  );
  return true;
};

/**
 * @class
 */
exports.RegisterService = register_service;
