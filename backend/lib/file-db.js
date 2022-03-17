// Simple data storage of objects as files (it's just JSON files)

const path = require('path');
const fs = require('fs/promises');

function normalPath (dir, name) {
	return path.normalize(path.join(dir, name));
}

class FileData {
	constructor (dir_path, name) {
		this.data = null;
		this.dir_path = dir_path;
		this.name = name;
		this.full_path = normalPath(dir_path, `${name}.json`);
	}

	load () {
		return this.loadFromTemplate(this.full_path);
	}

	async loadFromTemplate (template_path) {
		const data = await fs.readFile(template_path, 'utf8');
		this.data = JSON.parse(data);
		return this;
	}

	save () {
		return fs.writeFile(this.full_path, JSON.stringify(this.data));
	}

	rename (newname) {
		const old_path = this.full_path;
		this.name = newname;
		this.full_path = normalPath(this.dir_path, `${newname}.json`);
		return fs.rename(old_path, this.full_path);
	}

	delete () {
		return fs.unlink(this.full_path);
	}
}

class FileDB {
	constructor (root_dir) {
		this.DIRPATH = root_dir;
	}

	async list () {
		const ls = await fs.readdir(this.DIRPATH);
		return ls
			.filter(x => x.match(/\.json$/))
			.map(x => x.replace(/\.json$/,''));
	}

	open (name) {
		return new FileData(this.DIRPATH,name);
	}

	load (name) {
		const f = this.open(name);
		return f.load();
	}

	new (name) {
		const f = new FileData(normalPath(this.DIRPATH, `${name}.json`));
		return f.loadFromTemplate(normalPath(this.DIRPATH, 'json.template'));
	}

	rename (oldname, newname) {
		const f = this.open(oldname);
		return f.rename(newname);
	}

	delete (name) {
		const f = this.open(name);
		return f.delete();
	}
}

FileDB.FileData = FileData;

module.exports = FileDB;