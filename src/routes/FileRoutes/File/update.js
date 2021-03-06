const CTRL = require("../../../models/file/controller");
const GUID = require("../../../helpers/guid");
const DB = require("../../../helpers/db");
const fileUpload = require("express-fileupload");

/**
 * @typedef {{_id: {$oid: string}, guid: String, fileName: String, file: {name: String, data: Buffer, type: String, size: Number}, tokens: String[]}} file
 */

/**
 * 
 * @param {string} guid 
 */
async function GETFile(guid) {
	return await CTRL.getBy({guid: guid});
};

/**
 * 
 * @param {string} token 
 * @returns {{isAdmin: Boolean, isValid: Boolean, level: number}}
 */
async function firstVerify(token) {
	const isAdmin = token === process.env.adminCode;
	const isValid = isAdmin || token === "0" || GUID.L0.token.validate(token);

	return {
		isAdmin: isAdmin,
		isValid: isValid,

		level: isAdmin ? 2 : isValid ? 1 : 0
	}
}

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {file|undefined} 
 */
async function middleGet([_guid, _token] = [], res) {
	if(_guid == null && _token == null) {
		res.sendStatus(400);
		return;
	}
	const token = await firstVerify(_token);

	if(token.level === 0) {
		res.sendStatus(403);
		return;
	}

	const db = await GETFile(_guid);
	if(db.success && db.data.length > 0) {
		if(!token.isAdmin && db.data[0].tokens[0] !== _token) {
			res.sendStatus(403);
			return;
		}
		return db.data[0];
	} else {
		res.sendStatus(404);
	}

	return;
}
/**
 * 
 * @param {string} guid 
 * @param {string} token 
 * @param {fileUpload.UploadedFile} file
 * @param {Express.Response} res 
 */
 async function routerPut(guid, token, file, res) {
	const data = await middleGet([guid, token], res);

	if(!data) return;
	
	let e;
	if(e = CTRL.remove({guid: guid})) {
		await DB.SaveFileToDB(data.fileName, file, data.tokens[0] !== "0", {
			guid: guid,
			tokens: data.tokens
		});

		res.sendStatus(200);
	} else {
		console.log(e);
		res.sendStatus(500);
	};
}

module.exports = require("../../../helpers/Routes/exports")("/update", (router, Auth, AdminAuth) => {
	router.get("/", (req, res) => {
		res.render("file/update");
	});

	router.post("/", async (req, res) => {
		await routerPut(req.body.guid, req.body.token, req.files.file, res);
	});
});