const MODEL = require("../../models/file/model");
const CTRL = require("../../models/file/controller");
const fileUpload = require("express-fileupload");
const GUID = require('../../helpers/guid');

/**
 * 
 * @param {string} name 
 * @param {fileUpload.UploadedFile} file 
 * @param {boolean} isPrivate
 */
async function SaveFileToDB(name, file, isPrivate) {
	const guid = GUID.L0.uuid();
	const tokens = [];

	if(!isPrivate) tokens.push("0");
	else tokens.push(GUID.L0.token.generate())

	const fileModel = new MODEL.File({
		name: file.name,
		data: file.data,
		size: file.size,
		type: file.mimetype
	});

	const Model = await CTRL.add({
		guid: guid,
		fileName: name,
		file: fileModel,
		tokens: tokens
	});

	return `${process.env.host}/file/${guid}/${tokens[0]}/file`;
}

module.exports = require("../../helpers/Routes/exports")("/upload", (router, Auth, AdminAuth) => {
	router.get("/", (req, res) => {
		res.render("file/upload");
	});

	router.post("/", async (req, res) => {
		const fileName = req.body.name;
		const isPrivate = req.body.private === "private";
		const file = req.files.file;
		
		const modelUrl = await SaveFileToDB(fileName, file, isPrivate);

		res
			.status(200)
			.contentType("text/plain")
			.send(modelUrl);
	});
})