const MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

const uri = "mongodb+srv://navin:navin@findthatshop-qbdo0.mongodb.net/test?retryWrites=true&w=majority";

exports.AddShop = (shopDetails, callback) => {

    MongoClient.connect(uri, function (err, client) {
        assert.equal(null, err);
        console.log("fdskjjsfjlj",shopDetails)
        var shop =  {
            shopid : shopDetails.shopid,
            shopName : shopDetails.shopName,
            shopOwner: shopDetails.shopOwner,
            shopAddress: shopDetails.shopAddress,
            shopContactNo: shopDetails.shopContactNo,
            image : '',
        }
        
        var userShop = {
            username : shopDetails.username,
            shops : []
        }
        userShop.shops.push(shop)
        
        var db = client.db('shopkeeper');
        var result = {};

        // Find the userShop delete it and add it to 
        db.collection('shop').find({ username: shopDetails.username }).forEach(function (dbshop) {
            if (dbshop) {
                dbshop.shops.forEach(element => {
                    userShop.shops.push(element)
                })
                
                db.collection('shop').deleteOne({ username: shopDetails.username, _id: dbshop._id })
                
            }
        }, () => {
            // Add shop
            db.collection('shop').insertOne(userShop, function (err, res) {

                result.code = 403;// 403 - shop registered successfully
                result.message = 'Success';
                console.log("item inserted");

                callback(result);
                client.close();
            });
        })
    });
}

exports.UserShops = (username, callback) => {
    MongoClient.connect(uri, function (err, client) {

        assert.equal(null, err);
        var db = client.db('shopkeeper');
        var result = {
            code : 405, // No shops added
            message : "No shop found",
        };

        // Find the userShop delete it and add it to 
        db.collection('shop').find({ username: username }).forEach(function (dbshop) {
            if (dbshop) {
                result.code = 404; // Success in retrieving data
                result.message = "Data found";
                result.shop = dbshop;
            }
        },() => {
                callback(result);
        })
    });
}

exports.GetShop = (shopid, callback) => {
    MongoClient.connect(uri, function (err, client) {
        console.log("%%%%%%%%%%%",shopid)
        assert.equal(null, err);
        var db = client.db('shopkeeper');
        var result = {
            code : 405, // No shops added
            message : "No shop found",
        };

        // Find the userShop delete it and add it to 
        db.collection('shop').find({"shops.shopid": shopid}).forEach(function (dbshop) {
            if (dbshop) {
                result.code = 404; // Success in retrieving data
                result.message = "Data found";
                result.shop = dbshop;
            }
        },() => {
                callback(result);
        })
    });
}