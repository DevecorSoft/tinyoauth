const passport = require('passport')

module.exports.authenticate = function() {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
}