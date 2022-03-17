const AWS = require('aws-sdk');

module.exports = {
	connect: (config) => {
		// Assumes that config is in the form of data/connections/json.template

		AWS.config.update({
			region: config.region,
			endpoint: config.endpoint,
			accessKeyId: config.accessKeyId,
			secretAccessKey: config.secretAccessKey,
		});
		const db = new AWS.DynamoDB();

		return db;
	}
}
