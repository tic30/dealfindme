const axios = require('axios');
const token = "ExponentPushToken[eNbwkCM9-Jk8tBnVq2WOHL]";
const url = "https://exp.host/--/api/v2/push/send";


class NotificationSender {

	
	// connect to the given url
	sendNotice(shopInfo) {
		return new Promise((resolve, reject) => {
			console.log(url);

			var params = {
				"to" : token,
				"data?" : shopInfo,
				"title?" : "Welcome to the " + shopInfo["name"] + ", you might want to check out this discount.",
				"body?" : shopInfo["name"] + " have a deal " + shopInfo["discountInfo"] + " for you!",
				"sound?" : "default",
				"priority?" : "high",
				"badge?" : 2,
				"content-available?" : 1
			}
			console.log(params);
			axios.post(url, params)
	  			.then(function (response) {
	    			console.log(response.data);
	    			resolve(response.data);
	  			})
	  			.catch(function (error) {
	    			console.log(error);
	  			});
  		});
	}


}

module.exports = NotificationSender;