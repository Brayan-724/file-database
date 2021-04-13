const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const cors = require('cors');
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
const db = require('./helpers/mongo')(process.env.DB_URL);


app.use(cors());

// Import routes
let Routes = require('./Routes')(app, auth, adminAuth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	res.sendStatus(404);
});

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
function auth(req, res, next) {
	if(aAuth(req, res)) next();
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
function adminAuth(req, res, next) {
	if(aAuth(req, res)) {
		if(getIfHas(req.session, "isAdmin")) {
			next();
		}
	}
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
 function isLogged(req, res) {
	// Check if has session
	if(req.session) {
		// check is is logged
		if(getIfHas(req, "session", "isLogged")) {
			return true;
		} else {
			return false;
		}
	} else {
		throw new Error("Something in auth");
	}
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
function aAuth(req, res) {
	if(isLogged(req, res)) return true;
	res.redirect("/join");
	return false;
}

/**
 * 
 * @param {Document} obj 
 * @param {string[]} props 
 * @returns {any}
 */
function getIfHas(obj, ...props) {
	let lastObj = obj;
	let lastProp = props.pop();

	for(let prop of props) {
		if(prop in lastObj) lastObj = lastObj[prop];
		else return undefined;
	}

	if(lastProp in lastObj) return lastObj[lastProp];
	return undefined;
}

module.exports = app;
