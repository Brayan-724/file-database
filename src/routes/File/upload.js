const MODEL = require("../../models/file/model");
const CTRL = require("../../models/file/controller");
const fileUpload = require("express-fileupload");
const GUID = require('../../helpers/guid');

/**
 * 
 * @param {string} name 
 * @param {fileUpload.UploadedFile} file 
 */
async function SaveFileToDB(name, file) {
	const guid = GUID.L0.generate();

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
	});

	return Model;
}

module.exports = require("../../helpers/Routes/exports")("/upload", (router, Auth, AdminAuth) => {
	router.get("/", (req, res) => {
		res.render("file/upload");
	});

	router.post("/", async (req, res) => {
		const fileName = req.body.name;
		const file = req.files.file;
		
		const model = await SaveFileToDB(fileName, file);

		res
			.status(200)
			.contentType("json")
			.send(JSON.stringify(model));
	});
})