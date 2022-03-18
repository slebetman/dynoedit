#! /usr/bin/env node

const child_process = require('child_process');
const path = require('path');

const spawn = child_process.spawn;

const BACKEND_DIR = path.join(__dirname, '../backend');

function log (data) {
	process.stdout.write(`[BACKEND] ${data}`);
}

const backend = spawn('npx', ['nodemon', 'main.js'],{
	cwd: BACKEND_DIR,
})

backend.stdout.on('data', log);
backend.stderr.on('data', log);

let running = true;
function cleanup () {
	if (running) {
		running = false;
		log('Shutting down..\n');
		backend.kill();
	}
}

process.on('SIGINT', cleanup);
process.on('SIGHUP', cleanup);
process.on('exit', cleanup);
process.on('uncaughtException', cleanup);
