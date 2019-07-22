var express = require('express');
var router = express.Router();

var DatabaseClient = require('../../database-layer/inventory');

router.get('/getitems', function(req, res) {

    shopid = req.query.shopid
    DatabaseClient.GetItems(shopid, (result) => {
        res.send(result);
    });
})

router.post('/additem', function (req, res) {
    var item = {
        shopid: req.body.shopid,
        itemName: req.body.itemname,
        itemPrice: req.body.itemprice,
        itemQuantity: req.body.itemquantity,
        itemMass: req.body.itemmass,
        image : '',
    };

    DatabaseClient.AddItem(item, (result) => {
        res.send(result);
    });
});

module.exports = router;