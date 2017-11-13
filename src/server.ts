import * as express from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as dotenv from 'dotenv';
import * as path from 'path';

import * as homeController from './controllers/home.controller';

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
