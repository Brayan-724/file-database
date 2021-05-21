const CTRL = require("../../../models/file/controller");

module.exports = require("../../../helpers/Routes/exports")("/", (router, Auth, AdminAuth) => {
	router.get("/", async (req, res) => {
		let db = await CTRL.getAll();

		if(db.success) {
			res.render("files/all", {
				files: db.data
			})
		} else {
			res.sendStatus(500);
		}
	})
});