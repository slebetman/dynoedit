
/**
 * Controller for notes
 * @param {express.Router} app 
 */
 module.exports = function (app) {
	app.get('/test', async (req, res, next) => {
		try {
			res.json({
				success: true,
				test: 'OK'
			})
		}
		catch (err) {
			next(err);
		}
	});
}
