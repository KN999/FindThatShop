var express = require('express');
var router = express.Router();
const crypto = require("crypto")

var DatabaseClient = require('../../database-layer/shops');
var Token = require('../../business-layer/Auth');

router.get('/usershops', function(req, res) {
    DatabaseClient.UserShops(req.query.token, (result) => {
        res.send(result);
    })
})

router.get('/getshop', function(req, res) {
    DatabaseClient.GetShop(req.query.shopid, (result)=> {
        res.send(result);
    })
})

router.post('/addshop', function (req, res) {

    var shop = {
        username: req.body.username,
        shopid : crypto.randomBytes(16).toString("hex"),
        shopName: req.body.shopname,
        shopOwner: req.body.shopowner,
        shopAddress: req.body.shopaddress,
        shopContactNo: req.body.shopcontactno,
        image : '',
    };

    if (shop.shopid) {
        console.log("$$$$$$$",shop.shopid,shop.username);
        DatabaseClient.AddShop(shop, (result) => {
            res.send(result);
        });
    }
    else {
        res.send({code: 907, message:"can't preocess data"});
    }

});

module.exports = router;