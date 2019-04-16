var express = require('express');
var router = express.Router();
var loggedIn = false;

router.get('/', function(request, response) {

    loggedIn = request.app.get("logged-in");

    if (request.params) {
        console.log(request);
    }

    if (!loggedIn) {

        response.render('login', { pageID: "login" });

    } else {

        response.render('index', { pageID: "index" });
    }

});
router.get('/?', function(request, response) {

    loggedIn = request.app.get("logged-in");

    if (!loggedIn) {

        response.render('login', {

            pageID: 'login'

        });

    } else {

        response.render('index');

    }

});


module.exports = router;