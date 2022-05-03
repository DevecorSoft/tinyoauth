function login_service(login_repo) {
  this.login_repo = login_repo;
}

login_service.prototype.verify = function (username, password) {
  const user = this.login_repo.find_user_by_user_name(username);
  if (user) {
    if (user.password === password) {
      return true;
    }
    return false;
  }
  return false;
};
login_service.prototype.set_status = function (username, status) {
  this.login_repo.update_user_status(username, status);
  return true;
};

exports.LoginService = login_service;
