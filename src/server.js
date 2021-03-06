const express = require('express');
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const compression = require('compression');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.development' });
const redisClient = redis.createClient();

// auth middleware
const Grant = require('grant-express');
const grantConfig = require('../config/grant.config');
const grant = new Grant(grantConfig[process.env.NODE_ENV]);

// middleware
const staleCookieMiddleware = require('./middleware/staleCookieMiddleware');
const hasAuth = require('./middleware/hasAuth');

// controllers
const homeController = require('./home/home.controller');
const authController = require('./auth/auth.controller');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(logger(process.env.LOG_FORMAT));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(staleCookieMiddleware);
app.use(session({
    key: 'user_sid',
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new RedisStore({
        host: process.env.REDIS_URI,
        port: process.env.REDIS_PORT,
        client: redisClient,
        ttl: 260
    })
}));
app.use(grant);
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

// controllers
app.get('/', homeController.index);
app.get('/login', homeController.login);
app.get('/logout', homeController.logout);
app.get('/lobby', hasAuth, homeController.lobby);

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
