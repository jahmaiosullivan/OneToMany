import passport = require('passport');
var viewsFolder = 'auth';

module.exports = function (router) {
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
    
    return router;
}

