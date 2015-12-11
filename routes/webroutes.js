var viewsFolder = 'auth';
var userservice = new (require('../services/userservice'))();
var authHelper = require('./authHelper');
module.exports = router => {
    // define the home page route
    router.get('', authHelper.isAnonymous, (req, res) => {
        res.render('home/landingpg', res);
    });
    /************************** Users *************************************************/
    router.get('/users', authHelper.isAuthenticated, (req, res) => {
        userservice.All()
            .then(users => {
            res.render('users/list', {
                users: users
            });
        });
    });
    router.get('/users/profile', authHelper.isAuthenticated, (req, res) => {
        res.render('users/profile', { user: req.user });
    });
    return router;
};
//# sourceMappingURL=webroutes.js.map