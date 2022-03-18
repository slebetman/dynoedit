#! /usr/bin/env node

const child_process = require('child_process');
const path = require('path');

const spawn = child_process.spawn;

const FRONTEND_DIR = path.join(__dirname, '../frontend');

function log (data) {
	process.stdout.write(`[FRONTEND] ${data}`);
}

const frontend = spawn('npx', ['webpack', 'build', '--config', 'webpack.config.js'],{
	cwd: FRONTEND_DIR,
})

frontend.stdout.on('data', log);
frontend.stderr.on('data', log);

let running = true;
function cleanup () {
	if (running) {
		running = false;
		frontend.kill();
	}
}

process.on('SIGINT', cleanup);
process.on('SIGHUP', cleanup);
process.on('exit', cleanup);
process.on('uncaughtException', cleanup);
