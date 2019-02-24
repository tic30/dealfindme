const mongoose = require('mongoose');
require('../utils/MongoConnector');

const shopSchema = new mongoose.Schema({
	name:	    String,
	discountInfo: String,
	logo:    String,
	latitude: String,
	longitude: String,
	distance: String
});

const Shop = mongoose.model('shop', shopSchema);

class ShopDao {

	createOne(params) {
		const shop = new Shop(params);
		return this.saveOne(shop);
	}

	// params = { shopName }
	findOneByShopName(params) {
		return new Promise((resolve, reject) => {
			Shop.findOne(params, (err, shop) => err ? reject(err) : resolve(shop));
		});
	}

	findAll() {
		return new Promise((resolve, reject) => {
			Shop.find({}, 'name maxDiscount logo latitude longitude distance',
				(err, shop) => err ? reject(err) : resolve(shop));
		});
	}


	saveOne(shop) {
		return new Promise((resolve, reject) => {
			shop.save().then(() => {console.log('Add shop success'); resolve(shop)}).catch( e => {reject(e.message)});
		});
	}

}


module.exports = ShopDao;
