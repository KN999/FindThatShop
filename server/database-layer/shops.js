var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var assert = require('assert');

var url = 'mongodb://127.0.0.1:27017/';

exports.AddShop = (shopDetails, callback) => {

    mongodb.connect(url, function (err, client) {
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
    mongodb.connect(url, function (err, client) {

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

exports.GetShop = (shopids, callback) => {
    mongodb.connect(url, function (err, client) {

        assert.equal(null, err);
        var db = client.db('shopkeeper');
        var result = {
            code : 405, // No shops Found
            message : "No shop found",
        };

        var shops = [];

        shopids.forEach(function(shopid) {
            db.collection('shop').find({ shopid: shopid }).forEach(function (dbshop) {
                if (dbshop) {
                    result.code = 404; // Success in retrieving data
                    result.message = "Data found";
                    shops.push(dbshop);
                    result.shop = shops;
                }
            })
        },() => {
            console.log("$$$$$$$$",result.shop)
            callback(result);
        })
        
    });
}