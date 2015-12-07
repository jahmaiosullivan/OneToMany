module.exports = function (router) {
    router.baseurl = '';

    // define the home page route
    router.get('', router.base.IsAnonymous, function (req, res) {
        res.render('home/landingpg', res);
    });

    return router;
}

