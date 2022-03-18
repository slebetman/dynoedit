#! /usr/bin/env node

const child_process = require('child_process');

const spawn = child_process.spawn;

function log (data) {
	process.stdout.write(data);
}

const frontend = spawn('node', ['frontend.js'],{
	cwd: __dirname,
})

frontend.stdout.on('data', log);
frontend.stderr.on('data', log);

const backend = spawn('node', ['backend.js'],{
	cwd: __dirname,
})

backend.stdout.on('data', log);
backend.stderr.on('data', log);

function cleanup () {
	frontend.kill();
	backend.kill();
}

process.on('SIGINT', cleanup);
process.on('SIGHUP', cleanup);
process.on('exit', cleanup);
process.on('uncaughtException', cleanup);
