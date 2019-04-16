const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const fs = require('fs');
const url = require('url');
const morgan = require('morgan');
const winston = require('./config/winston');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const debug = require('debug')('app');
const chalk = require('chalk');
const K = require('ks');
const path = require('path');
const settings = require('./config/settings').settings;
const hostName = settings.hostName;
const portNumber = settings.portNumber;
const reloadPort = settings.reloadPort;
const refreshStructure = true;
if(refreshStructure){
    const reload = require('reload');
}

const sqlServerToolkit = require('./config/sqlservertookitobjects');
//const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
var isFirstRun = true;

function startProcesses() {
    if (cluster.isMaster) {
        debug(`Master ${process.pid} is running`);
        initWorkers();
    } else {
        startExpressHttpServer(hostName, portNumber);
        debug(`Worker ${process.pid} started`);

    }
}

function datePrevDaysfromNow(previousDay) {
    var newDate = new Date();
    var curDate = new Date();
    curDate.setDate(newDate.getDate() - previousDay);
    var yyyy = curDate.getFullYear();
    var mm = curDate.getMonth() < 9 ? "0" + (curDate.getMonth() + 1) : (curDate.getMonth() + 1); // getMonth() is zero-based
    var dd = curDate.getDate() < 10 ? "0" + curDate.getDate() : curDate.getDate();
    var hh = curDate.getHours() < 10 ? "0" + curDate.getHours() : curDate.getHours();
    var min = curDate.getMinutes() < 10 ? "0" + curDate.getMinutes() : curDate.getMinutes();
    var ss = curDate.getSeconds() < 10 ? "0" + curDate.getSeconds() : curDate.getSeconds();
    return "".concat(yyyy).concat("-").concat(mm).concat("-").concat(dd).concat(" ").concat(hh).concat(":").concat(min).concat(":").concat(ss);
};

function initWorkers() {
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} has been terminated`);
    });

}

var session = function(request, response, next) {
    request.sessionInfo = sessionInfo;
    next();
};

function startExpressHttpServer(hostname, port) {
    var express = require('express');
    //var path = require('path');
    var app = express();
    require('./config/passport')(app);
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(
        (username, password, done) => {
            findUser(username, (err, user) => {
                if (err) {
                    return done(err);
                }

                // User not found
                if (!user) {
                    return done(null, false);
                }

                // Always use hashed passwords and fixed time comparison
                /*   bcrypt.compare(password, user.passwordHash, (err, isValid) => {
                       if (err) {
                           return done(err);
                       }
                       if (!isValid) {
                           return done(null, false);
                       }
                       return done(null, user);
                   });
                   */
            });
        }
    ));
    app.use(morgan('combined', { stream: winston.stream }));
    app.use((req, res, next) => {
        const test = /\?[^]*\//.test(req.url);
        if ((req.url.substr(-1) === '/' || req.url.substr(-1) === '#') && req.url.length > 1 && !test)
            res.redirect(301, req.url.slice(0, -1));
        else
            next();
    });
    app.set('views', 'views');
    app.set('view engine', 'ejs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));
    var serverPort = process.env.OPENSHIFT_NODEJS_PORT || port;
    var serverHostName = process.env.OPENSHIFT_NODEJS_IP || hostname;
    app.set('port', serverPort);
    app.set('ipaddr', serverHostName);
    app.engine('html', require('ejs').renderFile);
    app.set('logged-in', false);

    app.locals.logo = "";
    app.locals.time = datePrevDaysfromNow(0);
    app.locals.timeOut = "";
    app.locals.userName = "";
    app.locals.userCode = "";
    app.locals.previousurl = "";
    app.locals.siteName = settings.siteName;
    app.locals.siteTitle = settings.siteTitle;
    app.locals.sqlServerToolkit = sqlServerToolkit;

    // app.use(express.static(path.join(__dirname, 'public')));

    app.use(require('./routes/indexrt'));
    app.use(require('./routes/dashboardrt'));



    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        // add this line to include winston logging
        winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

        // render the error page
        res.status(err.status || 500);
        // res.render('error');
        res.sendFile(path.join(__dirname + '/error.html'));
    });
    // http.createServer(app).listen(app.get('port'), function(){
    var server = app.listen(app.get('port'), function() {
        console.log(`Server running at http://${serverHostName}:${serverPort}/`);

    });
    var sessionInfo = {};
    if(refreshStructure){ '

        reload(app, { port: reloadPort });

    }
}

function authenticationMiddleware() {
    return function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    }
}
startProcesses();
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.methodOverride());
// app.use(app.router);
// app.use(express.errorHandler());
//app.use(express.static(__dirname + '/public'));
//app.use('/js', express.static(__dirname + '/js'));
//app.use('/assets', express.static(__dirname + '/assets'));
//app.use('/css', express.static(__dirname + '/css'));
//app.use('/images', express.static(__dirname + '/images'));
//app.use('/fonts', express.static(__dirname + '/fonts'));
//var favicon = require('serve-favicon');
//app.use(favicon(__dirname + '/public/images/favicon.ico'));