const MODEL = require("../models/file/model");
const CTRL = require("../models/file/controller");
const fileUpload = require("express-fileupload");
const GUID = require('./guid');

/** 
 * @typedef {{guid?: string, tokens?: string[]}} SaveOptions
 * 
 */

/**
 * 
 * @param {string} name 
 * @param {fileUpload.UploadedFile} file 
 * @param {boolean} isPrivate
 * @param {SaveOptions} opt
 * 
 * @returns {string}
 */
async function SaveFileToDB(name, file, isPrivate, opt = {}) {
	const guid = opt?.guid || GUID.L0.uuid();
	const tokens = opt?.tokens || [];

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

module.exports = {
	SaveFileToDB
}