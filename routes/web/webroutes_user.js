var userservice =  new (require('../../services/userservice'))();
var routebaseUrl = 'users';

module.exports = function (router) 
{
    router.get('/', router.base.IsAuthenticated, function (req, res) {
        userservice.All()
            .then(function(users) {
                res.render('users/list', {
                    users: users
                });
            });
    });

    router.get('/profile', router.base.IsAuthenticated, function (req, res) {
        res.render('users/profile', { user: req.session.passport.user });
    });

    router.baseurl = routebaseUrl;

    return router;
}