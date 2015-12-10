import express = require('express');
var viewsFolder = 'auth';
var userservice = new (require('../services/userservice'))();

module.exports = router => {

    // define the home page route
    router.get('', isAnonymous, (req: express.Request, res: express.Response) => {
        res.render('home/landingpg', res);
    });
    
    
    /*************** Auth *****************************/
    router.get('/login', isAnonymous,(req: express.Request, res: express.Response) => {
        res.render(viewsFolder + '/login', {});
    });
    
    router.get('/register', isAnonymous, (req: express.Request, res: express.Response) => {
        res.render(viewsFolder + '/register', {});
    });
    
    router.post('/login', isAnonymous, (req: express.Request, res: express.Response) => {
        req.session.passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })
    });
    
    //logs user out of site, deleting them from the session, and returns to homepage
    router.get('/logout', isAuthenticated, (req: express.Request, res: express.Response) => {
        console.log("LOGGING OUT " + req.user.email);
        req.logout();
        res.redirect('/');
        req.session.notice = "You have successfully been logged out!";
    });
    
    router.post('/sign-up', isAnonymous, (req: express.Request, res: express.Response) => {
        req.session.passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/login'
        });
    });
    
    
    /************************** Users *************************************************/
    router.get('/users', isAuthenticated, (req: express.Request, res: express.Response) => {
        userservice.All()
            .then(users => {
                res.render('users/list', {
                    users: users
                });
            });
    });
    
    router.get('/users/profile', isAuthenticated, (req: express.Request, res: express.Response) => {
        res.render('users/profile', { user: req.session.user });
    });

    return router;
}


function isAuthenticated(req: express.Request, res: express.Response, next) {
    if (req.isAuthenticated())
        return next();
    
    res.redirect('/login');
}
function isAnonymous(req: express.Request, res: express.Response, next) {
    if (req.isUnauthenticated())
        return next();
    
    res.redirect('/users/profile');
}

