/** @type {import("./a").Routes.Route[]} */
const rts = [
    require('./routes/index'),
    require('./routes/upload'),
    require('./routes/files'),
    require('./routes/viewFile'),
    require('./routes/remove'),
    require('./routes/download'),
    require('./routes/tmp.js'),
    require('./routes/tests.js'),

    require("./routes/acount/join"),
    require("./routes/acount/signin"),

    require('./routes/profile')
]

/** @type {import("./Routes")} */
module.exports = function Routes(App, Auth, AdminAuth) {
    /** @type {import("./a").Routes.pFunc} */
    function exec(v) {v(Auth, AdminAuth)};

    const r = {};

    for (const Route of rts) {
        exec(Route);
        App.use(Route.thisRoute, Route.r);
    }
}