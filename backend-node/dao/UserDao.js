const mongoose = require('mongoose');
require('../utils/MongoConnector');

const userSchema = new mongoose.Schema({
	wx_id:	    String,
	leetcode_name: String,
	timestamp:    Date,
	problem: 	{ type: String, default: 'NaN' },
	recent_problem: { type: Array, default: [] }
});

const User = mongoose.model('user', userSchema);

class UserDao {

	// params = { wx_id, leetcode_name }
	createOne(params) {
		const user = new User(params);
		return this.saveOne(user);
	}

	// params = { wx_id }
	findOneByWxId(params) {
		return new Promise((resolve, reject) => {
			User.findOne(params, (err, user) => err ? reject(err) : resolve(user));
		});
	}

	findAll() {
		return new Promise((resolve, reject) => {
			User.find({}, 'wx_id leetcode_name problem recent_problem',
				(err, user) => err ? reject(err) : resolve(user)).sort({ is_online: -1, username: 1 });
		});
	}


	saveOne(user) {
		return new Promise((resolve, reject) => {
			//user.save(err => err ? reject(err) : resolve(user));
			user.save().then(() => {console.log('Add user success'); resolve(user)}).catch( e => {reject(e.message)});
		});
	}

}


module.exports = UserDao;
