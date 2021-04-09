const CTRL = require("../../models/file/controller");

module.exports = require("../../helpers/Routes/exports")("/getAll", (router, Auth, AdminAuth) => {
	router.get("/", async (req, res, next) => {
		const db = await CTRL.getAll();

		res.contentType("json");
		res.status(200);
		res.send(JSON.stringify(db));
	});
});