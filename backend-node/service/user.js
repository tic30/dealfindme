"use strict";
var UserDAO = require('../dao/UserDao');
var userDao = new UserDAO();
var spawn = require("child_process").spawn;
/*
* Handle issues about users
*/
class User {

	//Hello World
	hello() {
		return "Hello World";
	};

	/*
	* Add new users
	*/
	addUser(wxid, leetcodeName) {
		return new Promise((resolve, reject) => {
			
			let params = {
				'wx_id' : wxid
			}
			//1. Whether wxid existed
			let searchRet = userDao.findOneByWxId(params);
			searchRet.then((result) => {
				if (result != null){
					let ret = {
                    	"errorCode": -1,
                    	"errorMsg": "User Existed"
                	}
					reject(ret);
				}

				//3. Save
      			let params = {
					'wx_id' : wxid,
					'leetcode_name' : leetcodeName
				}
				let createRet = userDao.createOne(params);
				return createRet;
  			}).then((result) => {
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

			//2. Whether leetcodeName exist
		});
	};

	/*
	* Get all users and their latest information
	*/
	getAllUsers(){
		return new Promise((resolve, reject) => {
			let searchRet = userDao.findAll();
			searchRet.then((users) => {
				//console.log(users);
				let promises = [];
			
				for (var user in users) {
					promises.push(this.getProblemsByName(users[user].leetcode_name));
				}

				Promise.all(promises).then((problemInfo) => {
					//console.log(problemInfo);
					for (var index in users) {
						users[index].problem = problemInfo[index].problem;
						users[index].recent_problem = problemInfo[index].recent_problem;
					}
					resolve(users);
				}).catch((err) => {
				 	let ret = {
                    	"errorCode": -3,
                    	"errorMsg": err
                	}
                	reject(ret);
				});
  			}, (err) => {
  				let ret = {
                    "errorCode": -2,
                    "errorMsg": err
                }
                reject(ret);
  			});

			//2. Whether leetcodeName exist
		});
	};

	/*
	* Get data from leetcode by leetcodeName
	*/
	getProblemsByName(leetcodeName){
		console.log("Try to Get ProblemInfo from: ", leetcodeName);
		return new Promise((resolve, reject) => {
			const pyprog = spawn('python3', ['./LeetCode_scraper.py', leetcodeName]);
			
			pyprog.stdout.on('data', function(data) {
				let problemInfoArr = data.toString().split('\n');
				console.log("Get success", problemInfoArr);
				problemInfoArr[1] = problemInfoArr[1].replace(/'/g, '"');  
				let recent_problem = '';
				try {
  					recent_problem = JSON.parse(problemInfoArr[1]);
				}
				catch(error) {
  					console.error(error);
				}
				let problemInfo = {
					'problem' : problemInfoArr[0],
					'recent_problem' : recent_problem
				};
        		
        		resolve(problemInfo);
    		});
    		pyprog.stderr.on('data', (data) => {
				console.log("Get failed", data.toString());
       			reject(data.toString());

    		});

		});
	};
}

module.exports = User;



