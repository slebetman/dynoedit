const path = require('path');
const cjson = require('cjson');

function file (fname) {
	return path.normalize(path.join(__dirname, '..', fname));
}

var conf = cjson.load([
	file('config-default.json'),
	file('config.json')
], true);

module.exports = conf;