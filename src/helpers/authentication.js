const express = require('express');

function __init__() {
	/**
	 * @param {express.Request<Document, any, any, qs.ParsedQs, Record<String, any>>} req 
	 * @param {express.Response<any, Record<String, any>, number>} res 
	 * @param {express.NextFunction} next 
	 */
	function auth(req, res, next) {
		if(aAuth(req, res)) next();
	}

	/**
	 * 
	 * @param {express.Request<Document, any, any, qs.ParsedQs, Record<String, any>>} req 
	 * @param {express.Response<any, Record<String, any>, number>} res 
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
	 * @param {express.Request<Document, any, any, qs.ParsedQs, Record<String, any>>} req 
	 * @param {express.Response<any, Record<String, any>, number>} res
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
			req.session = {};
		}
	}

	/**
	 * 
	 * @param {express.Request<Document, any, any, qs.ParsedQs, Record<String, any>>} req 
	 * @param {express.Response<any, Record<String, any>, number>} res
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


	return {
		auth,
		adminAuth,
		isLogged
	}

};


module.exports = __init__;