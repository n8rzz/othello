const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

const homeController = require('./controllers/home.controller');

dotenv.config({ path: '.env.development' });

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

// controllers
app.get('/', homeController.index);

// api controllers
// oauth

app.listen(app.get('port'), () => {
    // tslint:disable no-console
    console.log(('  App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
    // tslint:enable no-console
});

module.exports = app;
