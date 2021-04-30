const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const auths = require('./helpers/authentication')();
require('dotenv').config({path: 'variables.env'});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
	secret: '2C44-4D44-WppQ38S',
	resave: true,
	saveUninitialized: true
}));

app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Init mongo database
require('./helpers/mongo')(process.env.DB_URL);

// CORS Origin all permited
app.use(cors());

// Import routes
require('./Routes')(app, auths.auth, auths.adminAuth);

// catch 404 and send it
app.use(function(req, res, next) {
	res.sendStatus(404);
});

module.exports = app;
