"use strict";
var ShopDao = require('../dao/ShopDao');
var GeoFencingHelper = require('../utils/GeoFencingHelper');
var shopDao = new ShopDao();
var geoFencingHelper = new GeoFencingHelper();

/*
* Handle issues about shops
*/
class Shop {
	/*
	* get all shops
	*/
	getAllShops(longitude, latitude) {
		return new Promise((resolve, reject) => {
			
			//1. Get fences from the geoFence
			let fenceRet = geoFencingHelper.getReport(longitude, latitude);
			fenceRet.then((fenceArr) => {
				//2. Get all the shops
				let searchRet = shopDao.findAll();
				searchRet.then((shopArr) => {
					//3. Filter the result
					var shops = [];
					console.log(shopArr.length);
					for (var i = 0; i < shopArr.length; i++){
						for (var j = 0; j < fenceArr.length; j++){
							if (shopArr[i].name == fenceArr[j].name){
								shops.push(shopArr[i]);
								break;
							}
						}
					}
        			resolve(shops);
    			},(err) => {
        			reject(err);
    			})
    		},(err) => {
        		reject(err);
    		})
		});
	};

	/*
	* Get shop given the shopName
	*/
	getShopByName(shopName){
		return new Promise((resolve, reject) => {
			let param = {
				name : shopName
			};
			console.log(param);
			let searchRet = shopDao.findOneByShopName(param);
			searchRet.then((result) => {
        		resolve(result);
    		},(err) => {
        		reject(err);
    		})
		});
	};

	/*
	* Add new shops
	*/
	addShop(params) {
		return new Promise((resolve, reject) => {
			//1. Whether wxid existed
			let searchRet = shopDao.createOne(params);
			searchRet.then((result) => {
  				let ret = {
                    "errorCode": 0,
                    "errorMsg": "Add User Success",
                    "data": result
                }
  				resolve(ret);
  			}).catch((err) => {
  				let ret = {
                    "errorCode": -2,
                    "errorMsg": err
                }
                reject(ret);
  			});

		});
	};
}

module.exports = Shop;



