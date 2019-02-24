var express = require('express');
var router = express.Router();
var Shop = require('../../service/shop');
shopObj = new Shop();

router.get('/:longitude/:latitude', execute_get_all);
router.get('/check/:longitude/:latitude', execute_check);
router.get('/:shopname', execute_get);
router.post('/', execute_post)
router.get('/hello', execute_hello);
router.get('/backfill/:projectid/:range', execute_backfill);

/*
* Get all user info
*/
function execute_get_all(req, res, next){
    var longitude = req.params.longitude;
    var latitude = req.params.latitude;
    let ret = shopObj.getAllShops(longitude, latitude);
    ret.then((result) => {
      	res.send(result);
  	},(err) => {
        res.send(err);
  	})
}

/*
* Check whether in one shop
*/
function execute_check(req, res, next){
    var longitude = req.params.longitude;
    var latitude = req.params.latitude;
    let ret = shopObj.checkInShop(longitude, latitude);
    ret.then((result) => {
        res.send(result);
    },(err) => {
        res.send(err);
    })
}

/*
* Add a new user
*/
function execute_get(req, res, next){
    var shopName = req.params.shopname;
    let ret = shopObj.getShopByName(shopName);
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
    res.send("Hello World");
}

/*
* Add a new shop
*/
function execute_post(req, res, next){
    let params = {
        "name" : "SweetGreen2",
        "maxDiscount" : "20%"
    }
    let ret = shopObj.addShop(params);
    ret.then((result) => {
        res.send(result);
    },(err) => {
        res.send(err);
    })
}

/*
* Backfill the shop info including Tomtom and mongoDB
*/
function execute_backfill(req, res, next){
    var projectid = req.params.projectid;
    var range = req.params.range;
    let ret = shopObj.backfillShop(projectid, range);
    ret.then((result) => {
        res.send(result);
    },(err) => {
        res.send(err);
    })
}

module.exports = router;