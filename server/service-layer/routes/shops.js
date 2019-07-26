var express = require('express');
var router = express.Router();
const crypto = require("crypto")

var DatabaseClient = require('../../database-layer/shops');

router.get('/getshops', function(req, res) {

    username = req.query.username

    DatabaseClient.GetShops(username, (result) => {
        res.send(result);
    });
})

router.post('/addshop', function (req, res) {
    var shop = {
        shopid : crypto.randomBytes(16).toString("hex"),
        username: req.body.username,
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
});


module.exports = router;