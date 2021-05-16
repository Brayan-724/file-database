module.exports = require("../../../helpers/Routes/exports")("/upload", (router, Auth, AdminAuth) => {
	router.get("/", (req, res) => {
		res.send("Hello World");
	})
})