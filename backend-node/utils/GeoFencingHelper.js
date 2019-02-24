const axios = require('axios');

const baseUrl = "https://api.tomtom.com/geofencing/1/";
const projectId = "805a487b-7d50-45c8-afb9-05feb8c84db7";
const apiKey = "A33GMSaeZaQA6Bxz0C85iEmxysCUQzTQ";
const adminKey = "haXQZY1KlYmNO0PlZO5ZCxxqRqhslcO2utCCG1S6vmmLX21x";

class GeoFencingHelper {

	
	// connect to the given url
	getReport(longitude, latitude) {
		return new Promise((resolve, reject) => {
			var url = baseUrl + "/report/" + projectId + "?range=0&key=" + apiKey + "&point=" + longitude + "," + latitude 
			console.log(url);
			axios.get(url)
	  			.then(function (response) {
	    			console.log(response.data.inside.features);
	    			resolve(response.data.inside.features);
	  			})
	  			.catch(function (error) {
	    			console.log(error);
	  			});
  		});
	}

}

module.exports = GeoFencingHelper;