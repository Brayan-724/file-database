const CTRL = require("../../models/file/controller");
const GUID = require("../../helpers/guid");
const FormData = require("form-data");
const axios = require("axios").default;

/**
 * 
 * @param {string} guid 
 */
async function GETFile(guid) {
	return await CTRL.getBy({guid: guid});
};

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {{guid: String, fileName: String, file: {name: String, data: Buffer, type: String, size: Number}, tokens: String[]}?} 
 */
async function middleGet([_guid, _token] = [], res) {
	const token = _token;
	const isAdmin = token === process.env.adminCode

	if(token !== "0" && !isAdmin) 
	if(!GUID.L0.token.validate(token)) {
		res.sendStatus(403);
		return;
	}

	const db = await GETFile(_guid);
	if(db.success && db.data.length > 0) {
		if(!isAdmin && db.data[0].tokens[0] !== token) res.sendStatus(403);
		return db.data[0];
	} else {
		res.sendStatus(404);
	}

	return;
}

/**
 * 
 * @param {Document} data 
 */
function form(data) {
	const formData = new FormData();
	for(let n in data) {
		formData.append(n, data[n]);
	}
	return formData;
}

module.exports = require("../../helpers/Routes/exports")("/file", (router, Auth, AdminAuth) => {
	
	router.get("/", async (req, res) => {
		
		const data = await middleGet([req.body.guid, req.body.token], res);
		
		if(data) {
			res.status(200).contentType(data.file.type).send(data.file.data);
		}
	});
	router.get("/:guid/:token/file", async (req, res) => {
		try{
			const r = await axios.get(process.env.host+"/file",{
				data: req.params
			});

			res.status(r.status).contentType(r.headers['content-type']).send(r.data)
		} catch(e) {
			res.sendStatus(e.request.res.statusCode);
		}
	});

	router.put("/:guid/:token/", async (req, res) => {
		const data = await middleGet(req, res);

		if(data) {
			res.contentType(data.file.type).status(200).send(data.file.data);
		}
	});
})