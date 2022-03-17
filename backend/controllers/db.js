const bodyparser = require('body-parser');
const connections = require('../lib/connection-config');
const dynamo = require('../lib/dynamodb');

/**
 * Controller for database access
 * @param {express.Router} app 
 */
module.exports = function (app) {
	app.get('/db/:name/tables', async (req, res, next) => {
		const name = req.params.name;

		const conn = await connections.load(name);
		const db = dynamo.connect(conn.data);

		try {
			db.listTables((err, result) => {
				if (err) return next(err);

				res.json({
					success: true,
					tables: result.TableNames
				})
			})
		}
		catch (err) {
			next(err);
		}
	});

}
