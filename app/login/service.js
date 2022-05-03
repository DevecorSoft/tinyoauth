function login_service (login_repo) {
    this.login_repo = login_repo
}

login_service.prototype.verify = function(username, password) {}
login_service.prototype.set_status = function(username, status) {}

exports.LoginService = login_service