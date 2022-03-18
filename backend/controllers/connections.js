const bodyparser = require('body-parser');
const connections = require('../lib/connection-config');

/**
 * Controller for connections
 * @param {express.Router} app 
 */
module.exports = function (app) {
	app.get('/connections/list', async (req, res, next) => {
		try {
			res.json({
				success: true,
				connections: await connections.list()
			})
		}
		catch (err) {
			next(err);
		}
	});

	app.get('/connections/get/:name', async (req, res, next) => {
		const name = req.params.name;

		try {
			const conn = await connections.load(name);

			res.json({
				success: true,
				connection: {
					name: conn.name,
					...conn.data,
				}
			})
		}
		catch (err) {
			next(err);
		}
	});

	app.post('/connections/create/:name', bodyparser.json(), async (req, res, next) => {
		const name = req.params.name;
		const description = req.body.description;
		const region = req.body.region;
		const endpoint = req.body.endpoint;
		const accessKeyId = req.body.accessKeyId;
		const secretAccessKey = req.body.secretAccessKey;

		try {
			const conn = await connections.new(name);

			conn.data.description = description;
			conn.data.region = region;
			conn.data.endpoint = endpoint;
			conn.data.accessKeyId = accessKeyId;
			conn.data.secretAccessKey = secretAccessKey;

			await conn.save();

			res.json({
				success: true
			})
		}
		catch (err) {
			next(err);
		}
	});

	app.post('/connections/update/:name', bodyparser.json(), async (req, res, next) => {
		const name = req.params.name;
		const description = req.body.description;
		const region = req.body.region;
		const endpoint = req.body.endpoint;
		const accessKeyId = req.body.accessKeyId;
		const secretAccessKey = req.body.secretAccessKey;

		try {
			const conn = await connections.load(name);

			conn.data.description = description;
			conn.data.region = region;
			conn.data.endpoint = endpoint;
			conn.data.accessKeyId = accessKeyId;
			conn.data.secretAccessKey = secretAccessKey;

			await conn.save();

			res.json({
				success: true
			})
		}
		catch (err) {
			next(err);
		}
	});

	app.get('/connections/delete/:name', async (req, res, next) => {
		const name = req.params.name;

		try {
			await connections.delete(name);

			res.json({
				success: true
			})
		}
		catch (err) {
			next(err);
		}
	})
}
