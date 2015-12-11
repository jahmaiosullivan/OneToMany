import express = require('express');
import passport = require('passport');
var viewsFolder = 'auth';
var userservice = new (require('../services/userservice'))();

module.exports = router => {

    // define the home page route
    router.get('', isAnonymous, (req: express.Request, res: express.Response) => {
        res.render('home/landingpg', res);
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
        res.render('users/profile', { user: req.user });
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

