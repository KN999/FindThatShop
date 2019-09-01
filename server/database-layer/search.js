const MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

const uri = "mongodb+srv://navin:navin@findthatshop-qbdo0.mongodb.net/test?retryWrites=true&w=majority";

exports.FindThatShop = (query, callback) => {

    MongoClient.connect(uri, function (err, client) {
        assert.equal(null, err);
        var db = client.db('shopkeeper');
        var result = {
            code : 705, // No shops found with that item
            message : "No shop found with that item",
        };

        var queriedShops = [];
 
        db.collection('item').find({ "items.itemName" : query }).forEach(function (dbshop) {
            if (dbshop) {
                console.log("Found that shop")
                result.code = 405; // Success in retrieving data
                result.message = "Data found";
                queriedShops.push(dbshop);
                result.shop = queriedShops;
    
            }
        },() => {
                callback(result);
        })
    });
}
