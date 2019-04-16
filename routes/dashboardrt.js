var express = require('express');
var router = express.Router();
var loggedIn = false;

router.get('/dashboard/', function(request, response) {

    response.render('dashboard', { pageID: "dashboard" });

    /*  loggedIn = request.app.get("logged-in");
      if (loggedIn) {

          response.render('dashboard', { pageID: "dashboard" });

      } else {

          response.render('login', { pageID: "login" });
      }
      */

});

module.exports = router;