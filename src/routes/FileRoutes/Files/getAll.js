const CTRL = require("../../../models/file/controller");

function noTokens(obj) {
	if(obj.success) {
		return {
			success: true,
			data: obj.data.map((v) => {
				v.tokens = "MR. HACKER";
				v.file.data = Buffer.from("MR. HACKER");
				return v;
			})
		}
	}

	return obj;
}

module.exports = require("../../../helpers/Routes/exports")("/getAll", (router, Auth, AdminAuth) => {
	router.get("/", async (req, res, next) => {
		let db = await CTRL.getAll();

		db = noTokens(db);

		res.contentType("json");
		res.status(200);
		res.send(JSON.stringify(db));
	});
});