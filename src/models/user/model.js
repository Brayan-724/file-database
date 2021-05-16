const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _Model = new Schema({
	name: String,
	tokens: [Object]
});

const Model = mongoose.model("user", _Model, "Users");

module.exports = { Model };