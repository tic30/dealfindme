const mongoose = require('mongoose');

const Values = require('./Values');


class MongoConnector {

	// connect to the given url
	static connect(url) {
		mongoose.Promise = global.Promise;
		mongoose.connect(url);
		const conn = mongoose.connection;

		conn.on('error', console.error.bind(console, 'connection error:'));
		conn.once('open', () => console.log("connected to mongodb."));
	}

}


MongoConnector.connect(Values.MONGO_URL);
