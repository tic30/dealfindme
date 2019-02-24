class Values {

	static get MONGO_URL() {
		return 'mongodb://root:root@cluster0-shard-00-00-r22vb.mongodb.net:27017,cluster0-shard-00-01-r22vb.mongodb.net:27017,cluster0-shard-00-02-r22vb.mongodb.net:27017/dealfindme?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
	}

}


module.exports = Values;
