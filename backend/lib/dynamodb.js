const AWS = require('aws-sdk');

module.exports = {
	connect: (config) => {
		// Assumes that config is in the form of data/connections/json.template -> aws

		AWS.config.update(config);
		const db = new AWS.DynamoDB();

		return db;
	}
}
