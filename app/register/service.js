function register_service(register_repository) {
  this.register_repo = register_repository;
}

register_service.prototype.register = function (username, password) {
  this.register_repo.create_user(username, password);
  return true;
};

exports.RegisterService = register_service;
