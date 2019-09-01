const MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

const uri = "mongodb+srv://navin:navin@findthatshop-qbdo0.mongodb.net/test?retryWrites=true&w=majority";

exports.AddItem = (itemDetails, callback) => {

    MongoClient.connect(uri, function (err, client) {
        assert.equal(null, err);
        console.log(itemDetails)
        var item =  {
            itemid: itemDetails.itemid,
            itemName : itemDetails.itemName,
            itemPrice: itemDetails.itemPrice,
            itemQuantity: itemDetails.itemQuantity,
            itemMass: itemDetails.itemMass,
            image : '',
        }

        var shopItem = {
            shopid : itemDetails.shopid,
            items : []
        }

        shopItem.items.push(item)
        
        var db = client.db('shopkeeper');
        var result = {};

        // Find the userShop delete it and add it to 
        db.collection('item').find({ shopid : itemDetails.shopid }).forEach(function (dbitem) {
            if (dbitem) {
                dbitem.items.forEach(element => {
                    shopItem.items.push(element)
                })
                
                db.collection('item').deleteOne({ shopid : itemDetails.shopid })
                
            }
        }, () => {
            // Add item
            db.collection('item').insertOne(shopItem, function (err, res) {

                result.code = 503;// 503 - item added successfully
                result.message = 'Success';
                console.log("item inserted");

                callback(result);
                client.close();
            });
        })

    });
}

exports.GetItems = (shopid, callback) => {

    MongoClient.connect(uri, function (err, client) {
        assert.equal(null, err);
        console.log("^^^^^^^^^^^^",shopid)
        var db = client.db('shopkeeper');

        var result = {
            code : 501, // Wrong Shopid
            message : "Failure",
        };
        console.log("##########",shopid)
        // Find the userShop delete it and add it to 
        db.collection('item').find({ shopid: shopid }).forEach(function (dbitem) {
            if (dbitem) {
                
                result.code = 500; // Item Found
                result.message = "Success"
                result.item = dbitem
                console.log("found them")
            }
            console.log("DBITEM",dbitem)
        }, () => {    
                callback(result)
            })
    });
}
