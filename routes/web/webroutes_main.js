var viewsFolder = 'auth';
var passport = require('passport');
var userservice = new (require('../../services/userservice'))();

module.exports = function (router) {
    router.baseurl = '';
    
    // define the home page route
    router.get('', router.base.IsAnonymous, function (req, res) {
        res.render('home/landingpg', res);
    });
    
    
    /*************** Auth *****************************/
    router.get('/login', function (req, res) {
        res.render(viewsFolder + '/login', {});
    });
    
    router.get('/register', function (req, res) {
        res.render(viewsFolder + '/register', {});
    });
    
    router.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));
    
    //logs user out of site, deleting them from the session, and returns to homepage
    router.get('/logout', function (req, res) {
        console.log("LOGGING OUT " + req.user.email);
        req.logout();
        res.redirect('/');
        req.session.notice = "You have successfully been logged out!";
    });
    
    router.post('/sign-up', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));
    
    
    /************************** Users *************************************************/
    router.get('/users', router.base.IsAuthenticated, function (req, res) {
        userservice.All()
            .then(function (users) {
            res.render('users/list', {
                users: users
            });
        });
    });
    
    router.get('/users/profile', router.base.IsAuthenticated, function (req, res) {
        res.render('users/profile', { user: req.session.passport.user });
    });

    return router;
}

