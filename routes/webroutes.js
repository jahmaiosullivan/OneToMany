var viewsFolder = 'auth';
var passport = require('passport');
var userservice = new (require('../services/userservice'))();

module.exports = function (router) {
    
    // define the home page route
    router.get('', IsAnonymous, function (req, res) {
        res.render('home/landingpg', res);
    });
    
    
    /*************** Auth *****************************/
    router.get('/login', IsAnonymous, function (req, res) {
        res.render(viewsFolder + '/login', {});
    });
    
    router.get('/register', IsAnonymous, function (req, res) {
        res.render(viewsFolder + '/register', {});
    });
    
    router.post('/login', IsAnonymous, passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));
    
    //logs user out of site, deleting them from the session, and returns to homepage
    router.get('/logout', IsAuthenticated, function (req, res) {
        console.log("LOGGING OUT " + req.user.email);
        req.logout();
        res.redirect('/');
        req.session.notice = "You have successfully been logged out!";
    });
    
    router.post('/sign-up', IsAnonymous, passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));
    
    
    /************************** Users *************************************************/
    router.get('/users', IsAuthenticated, function (req, res) {
        userservice.All()
            .then(function (users) {
            res.render('users/list', {
                users: users
            });
        });
    });
    
    router.get('/users/profile', IsAuthenticated, function (req, res) {
        res.render('users/profile', { user: req.session.passport.user });
    });

    return router;
}


function IsAuthenticated(req, res, next) {
    if (req.user)
        return next();
    
    res.redirect('/login');
}
function IsAnonymous(req, res, next) {
    if (!req.user)
        return next();
    
    res.redirect('/users/profile');
}

