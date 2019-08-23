var express = require('express');
var router = express.Router();
const crypto = require("crypto")

var DatabaseClient = require('../../database-layer/shops');
var Token = require('../../business-layer/Auth');

router.get('/usershops', function(req, res) {
    var username = req.query.token;
    DatabaseClient.UserShops(username, (result) => {
        res.send(result);
    })
})

router.post('/addshop', function (req, res) {

    var shop = {
        shopid : crypto.randomBytes(16).toString("hex"),
        shopName: req.body.shopname,
        shopOwner: req.body.shopowner,
        shopAddress: req.body.shopaddress,
        shopContactNo: req.body.shopcontactno,
        image : '',
    };

    if (shop.shopid) {
        console.log("$$$$$$$",shop.shopid)
        DatabaseClient.AddShop(shop, (result) => {
            res.send(result);
        });
    }
    else {
        res.send(auth)
    }

});

module.exports = router;