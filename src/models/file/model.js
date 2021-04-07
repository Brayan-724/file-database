const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _File = new Schema({
    name: String,
    data: Buffer,
    type: String,
});
const File = mongoose.model('saveFile_File', _File, 'Files');

const _Proyect = new Schema({
    path: String,
    name: String,
});
const Proyect = mongoose.model('saveFile_Proyect', _Proyect, 'Files');

const _Model = new Schema({
    url: String,
    fileName: String,
    smType: [String],
    file: _File,
    proyect: _Proyect,
    category: String
});
const Model = mongoose.model('file', _Model, 'Files');


exports = {File, Proyect, Model};

module.exports = exports;