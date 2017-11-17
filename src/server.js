const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.development' });


const Grant = require('grant-express');
const grantConfig = require('../config/grant.config');
const grant = new Grant(grantConfig[process.env.NODE_ENV]);

const homeController = require('./home/home.controller');
const authController = require('./auth/auth.controller');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(logger('dev'));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'very secret'
}));
app.use(grant);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

// controllers
app.get('/', homeController.index);
app.get('/login', homeController.login);

// api controllers

// oauth
app.get('/handle_github_callback', authController.githubCallbackHandler);
app.get('/handle_google_callback', authController.googleCallbackHandler);
app.get('/handle_twitter_callback', authController.twitterCallbackHandler);

app.listen(app.get('port'), () => {
    console.log(('  App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
