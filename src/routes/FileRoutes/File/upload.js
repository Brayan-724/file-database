const { SaveFileToDB } = require("../../../helpers/db");

module.exports = require("../../../helpers/Routes/exports")("/upload", (router, Auth, AdminAuth) => {
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