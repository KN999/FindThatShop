var express = require('express');
var router = express.Router();
const crypto = require("crypto")

var DatabaseClient = require('../../database-layer/shops');
var Token = require('../../business-layer/Auth');

router.get('/getshops', function(req, res) {

    if ((Token.ValidateToken(req.query.token)).auth === true) {
        username = auth.decoded;
        DatabaseClient.GetShops(username, (result) => {
            res.send(result);
        });
    }
    else {
        res.send(auth)
    }
})

router.post('/addshop', function (req, res) {
    var auth = Token.ValidateToken(req.body.token);

    var shop = {
        shopid : crypto.randomBytes(16).toString("hex"),
        shopName: req.body.shopname,
        shopOwner: req.body.shopowner,
        shopAddress: req.body.shopaddress,
        shopContactNo: req.body.shopcontactno,
        image : '',
    };

    if (shop.shopid && auth.auth === true) {
        shop.username = auth.decoded;
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