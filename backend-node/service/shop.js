"use strict";
var ShopDao = require('../dao/ShopDao');
var GeoFencingHelper = require('../utils/GeoFencingHelper');
var NotificationSender = require('../utils/NotificationSender');
var shopDao = new ShopDao();
var geoFencingHelper = new GeoFencingHelper();
var notificationSender = new NotificationSender();
var fs = require('fs');
var path = require('path');
const project1 = "62cfe960-b83a-4dab-adf7-dcedb821d32f"; //Small radius
const project2 = "3766f299-01a1-4328-b445-c9ef86a6b0e9"; //Large radius 
const distanceBound = 11000;
const token = "eNbwkCM9-Jk8tBnVq2WOHL";

const shopInfoFilePath = path.join(__dirname, "../data/shopInfo");

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
			let fenceRet = geoFencingHelper.getReport(longitude, latitude, project2);
			fenceRet.then((fenceArr) => {
				//2. Get all the shops
				let searchRet = shopDao.findAll();
				var fenceInsideArr = fenceArr.inside.features;
				var fenceOutsideArr = fenceArr.outside.features;
				searchRet.then((shopArr) => {
					//3. Filter the result
					var shops = [];
					console.log(shopArr.length);
					for (var i = 0; i < shopArr.length; i++){
						for (var j = 0; j < fenceInsideArr.length; j++){
							if (shopArr[i].name == fenceInsideArr[j].name){
								shops.push(shopArr[i]);
								break;
							}
						}
						for (var j = 0; j < fenceOutsideArr.length; j++){
							if (shopArr[i].name == fenceOutsideArr[j].name && fenceOutsideArr[j].distance < distanceBound){
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
	* get all shops
	*/
	checkInShop(longitude, latitude) {
		return new Promise((resolve, reject) => {
			
			//1. Get fences from the geoFence
			let fenceRet = geoFencingHelper.getReport(longitude, latitude, project1);
			fenceRet.then((fenceArr) => {
				var fenceInsideArr = fenceArr.inside.features;
				
				if (fenceInsideArr.length != 1){
					let ret = {
                    	"errorCode": 0,
                    	"errorMsg": "Not in an exact shop"
                	}
  					return resolve(ret);
				}
				var fenceName = fenceInsideArr[0].name.split("-")[0];
				//2. Get all the shops
				let param = {
					name : fenceName
				};
				console.log(param);
				let searchRet = shopDao.findOneByShopName(param);
				searchRet.then((result) => {
					notificationSender.sendNotice(result);

					let ret = {
                    	"errorCode": 0,
                    	"errorMsg": "Check success",
                    	"data": result
                	}
  					return resolve(ret);
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

	/*
	* Backfill shops
	*/
	backfillShop(projectid, range) {
		return new Promise((resolve, reject) => {
			//1. Read the file information
			try {  
    			var data = fs.readFileSync(shopInfoFilePath, 'utf8');
    			var lines = data.toString().split("\n"); 
    			var shopInfos = [];
    			for (var i = 1; i < lines.length; i++){
    				var line = lines[i].split(";");
    				var shopInfo = {
    					"name" : line[0],
    					"discountInfo" : line[1],
    					"logo" : line[2],
    					"latitude" : line[3],
    					"longitude" : line[4],
    					"distance" : line[5]
    				};
    				console.log(shopInfo);
    				shopInfos.push(shopInfo);
    			}
    			
    			let promises = [];
			
				for (var i = 0; i < shopInfos.length; i++){
					if (range > 40){
						promises.push(this.addShop(shopInfos[i]));
					}
					promises.push(geoFencingHelper.addFence(shopInfos[i], projectid, range));
				}

				Promise.all(promises).then(() => {
					
					let ret = {
                    	"errorCode": 0
                	}
					resolve(ret);
				}).catch((err) => {
				 	let ret = {
                    	"errorCode": -3,
                    	"errorMsg": err
                	}
                	reject(ret);
				});
			} catch(e) {
    			console.log('Error:', e.stack);
    			reject(e.stack);
			}

		});
	}
}

module.exports = Shop;



