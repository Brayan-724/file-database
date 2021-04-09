const CTRL = require("../../models/file/controller");

/**
 * 
 * @param {string} guid 
 */
async function GETFile(guid) {
	console.log(guid);
	return await CTRL.getBy({guid: guid});
};

/**
 * 
 * @param {Express.Request} req 
 * @param {string} paramName 
 */
async function GETDirect(req, paramName) {
	return await GETFile(req.params[paramName]);
}

module.exports = require("../../helpers/Routes/exports")("/file", (router, Auth, AdminAuth) => {
	router.get("/:guid/file", async (req, res) => {
		const db = await GETDirect(req, "guid");

		if(db.success && db.data.length > 0) {
			res.contentType(db.data[0].file.type).status(200).send(db.data[0].file.data);
		} else {
			res.sendStatus(404);
		}
	})
})