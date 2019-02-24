var express = require('express');
var router = express.Router();
var User = require('../../service/user');
userObj = new User();

router.get('/', execute_get);
router.post('/', execute_post);
router.get('/hello', execute_hello);

/*
* Get all user info
*/
function execute_get(req, res, next){
	let ret = userObj.getAllUsers();
  	ret.then((result) => {
      	res.send(result);
  	},(err) => {
    	res.send(err);
  	})
}

/*
* Add a new user
*/
function execute_post(req, res, next){
	let wxid = req.body.wxid;
  	let leetcodeName = req.body.leetcodeName;
  	console.log(wxid, leetcodeName);
  	let ret = userObj.addUser(wxid, leetcodeName);
  	ret.then((result) => {
      	res.send(result);
  	},(err) => {
    	res.send(err);
  	})
}

/*
* Hello!
*/
function execute_hello(req, res, next){
  res.send(userObj.hello());
}

module.exports = router;