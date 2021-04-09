const { Router } = require("express");

/**
 * 
 * @param {string} route 
 * @param {import("../../a").Routes.Route[]} routes 
 * @returns {import("../../a").Routes.Route}
 */
module.exports = function(route, routes) {
	const router = new Router();

	function s(Auth, AdminAuth) {
		/** @type {import("../../a").Routes.pFunc} */
		function exec(v) {v(Auth, AdminAuth)};

		for (const Route of routes) {
			exec(Route);
			router.use(Route.thisRoute, Route.r);
		}
	};

	s.r = router;
	s.thisRoute = route;

	return s;
}