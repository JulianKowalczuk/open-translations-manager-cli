import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import expressValidator from 'express-validator';
import lusca from 'lusca';

import { phrasesRouter } from './modules/phrases';
import { phrasesCategoriesRouter } from './modules/phrasesCategories';
import './utils/logger';

const dashboardPath = __dirname + '/../node_modules/open-translations-manager-dashboard/build';
const app = express();

app.set('port', process.env.PORT || 4000);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: 'SOME_SECRET'
  })
);
app.use(
  lusca({
    xframe: 'SAMEORIGIN',
    xssProtection: true
  })
);

app.use('/', express.static(dashboardPath));
app.use('/phrases', phrasesRouter);
app.use('/phrasesCategories', phrasesCategoriesRouter);

export default app;
