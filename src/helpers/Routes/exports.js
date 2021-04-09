const { Router } = require("express");

/**
 * 
 * @param {Express.Response} res 
 * @param {string} render
 * @param {string} end
 */
function waitAndRedirect(res, render, end, options) {
    res.render(render, options, (err, html) => {
        res.write(html + "\n");
    });
    return function() {
        res.end("<script>window.location='"+end+"'</script>");
    }
}

/** @type {import("../../a").Routes._exports} */
module.exports = function(route, callback) {

    const router = Router();
    
    function toReturn(Auth, AdminAuth) {
        callback(router, Auth, AdminAuth, waitAndRedirect);
    };

    toReturn.r = router;
    toReturn.thisRoute = route;

    return toReturn;
}