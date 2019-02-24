const axios = require('axios');

const baseUrl = "https://api.tomtom.com/geofencing/1";
const apiKey = "A33GMSaeZaQA6Bxz0C85iEmxysCUQzTQ";
const adminKey = "haXQZY1KlYmNO0PlZO5ZCxxqRqhslcO2utCCG1S6vmmLX21x";

class GeoFencingHelper {

	
	// connect to the given url
	getReport(longitude, latitude, projectid) {
		return new Promise((resolve, reject) => {
			var url = baseUrl + "/report/" + projectid + "?range=11000&key=" + apiKey + "&point=" + longitude + "," + latitude 
			console.log(url);
			axios.get(url)
	  			.then(function (response) {
	    			console.log(response.data);
	    			resolve(response.data);
	  			})
	  			.catch(function (error) {
	    			console.log(error);
	  			});
  		});
	}

	addFence(shopInfo, projectid, range){
		return new Promise((resolve, reject) => {
			var url = baseUrl + "/projects/" + projectid + "/fence?key=" + apiKey + "&adminKey=" + adminKey;
			console.log(url);
			 axios.defaults.headers = {
        		'Content-Type': 'application/json'
    		}
    		var name = shopInfo["name"];
    		if (range < 40){
    			name = shopInfo["name"] + "-point";
    		}
			var params = {
				"name": name,
    			"type": "Feature",
    			"geometry": {
        			"radius": parseInt(range, 10),
        			"type": "Point",
        			"shapeType": "Circle",
       				"coordinates": [parseFloat(shopInfo["longitude"]), parseFloat(shopInfo["latitude"])]
    			},
    			"properties": {
        			"maxSpeedKmh": 70
    			}
			}
			console.log(params);
			axios.post(url, params)
	  			.then(function (response) {
	    			//console.log(response.data.id);
	    			resolve("response.data.id");
	  			})
	  			.catch(function (error) {
	    			console.log(error);
	  			});
  		});
	}

}

module.exports = GeoFencingHelper;