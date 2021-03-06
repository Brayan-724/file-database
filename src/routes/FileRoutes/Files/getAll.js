const CTRL = require("../../../models/file/controller");
const { dataForCommonUser } = require("../../../helpers/resolveData");

function noTokens(obj) {
	if(obj.success) {
		return {
			success: true,
			data: obj.data.map(dataForCommonUser)
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