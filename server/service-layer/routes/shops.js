var express = require('express');
var router = express.Router();

var DatabaseClient = require('../../database-layer/shops');

router.get('/getshops', function(req, res) {

    username = req.query.username

    DatabaseClient.GetShops(username, (result) => {
        res.send(result);
    });
})

router.post('/addshop', function (req, res) {
    var shop = {
        username: req.body.username,
        shopName: req.body.shopname,
        shopOwner: req.body.shopowner,
        shopAddress: req.body.shopaddress,
        shopContactNo: req.body.shopcontactno,
        image : '',
    };

    DatabaseClient.AddShop(shop, (result) => {
        res.send(result);
    });
});


module.exports = router;