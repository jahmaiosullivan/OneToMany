var self = this;

function RouterBase() {
}

RouterBase.prototype.IsAuthenticated = function (req, res, next) {
    if (req.user)
        return next();
    
    res.redirect('/login');
}
RouterBase.prototype.IsAnonymous = function (req, res, next) {
    if (!req.user)
        return next();
    
    res.redirect('/users/profile');
}

module.exports = RouterBase;