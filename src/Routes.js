/** @type {import("./a").Routes.Route[]} */
const rts = [
    require("./routes/fileRoutes"),
    require("./routes/userRoutes")
]

/** @type {import("./Routes")} */
module.exports = function Routes(App, Auth, AdminAuth) {
    /** @type {import("./a").Routes.pFunc} */
    function exec(v) {v(Auth, AdminAuth)};
    
    for (const Route of rts) {
        exec(Route);
        App.use(Route.thisRoute, Route.r);
    }
}