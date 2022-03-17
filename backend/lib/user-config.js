const path = require('path');
const FileDB = require('./file-db');

const db = new FileDB(path.normalize(path.join(__dirname, '../../data/users')));

module.exports = db;
