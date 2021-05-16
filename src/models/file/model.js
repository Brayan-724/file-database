const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _File = new Schema({
    name: String,
    data: Buffer,
    type: String,
    size: Number
});
const File = mongoose.model('saveFile_File', _File, 'Files');

const _Model = new Schema({
    guid: String,
    fileName: String,
    file: _File,
    tokens: [String]
});
const Model = mongoose.model('file', _Model, 'Files');

/**
 * @property {mongoose.Model} File
 * @property {mongoose.Model} Model
 */
module.exports = { File, Model };