var express = require('express');
var router = express.Router();
const crypto = require("crypto")

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
        itemid: crypto.randomBytes(16).toString("hex"),
        itemName: req.body.itemname,
        itemPrice: req.body.price,
        itemQuantity: req.body.quantity,
        itemMass: req.body.mass,
        image : '',
    };

    DatabaseClient.AddItem(item, (result) => {
        res.send(result);
    });
});

module.exports = router;