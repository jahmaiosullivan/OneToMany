var viewsFolder = 'auth';
var userservice = new (require('../services/userservice'))();
module.exports = router => {
    // define the home page route
    router.get('', isAnonymous, (req, res) => {
        res.render('home/landingpg', res);
    });
    /************************** Users *************************************************/
    router.get('/users', isAuthenticated, (req, res) => {
        userservice.All()
            .then(users => {
            res.render('users/list', {
                users: users
            });
        });
    });
    router.get('/users/profile', isAuthenticated, (req, res) => {
        res.render('users/profile', { user: req.user });
    });
    return router;
};
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
function isAnonymous(req, res, next) {
    if (req.isUnauthenticated())
        return next();
    res.redirect('/users/profile');
}
//# sourceMappingURL=webroutes.js.map