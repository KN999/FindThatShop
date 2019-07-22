var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var assert = require('assert');

var url = 'mongodb://127.0.0.1:27017/';

exports.AddShop = (shopDetails, callback) => {

    mongodb.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log(shopDetails)
        var shop =  {
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
                
                db.collection('shop').remove({ username: shopDetails.username, _id: dbshop._id })
                
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

exports.GetShops = (username, callback) => {
    mongodb.connect(url, function (err, client) {

        assert.equal(null, err);
        console.log("^^^^^^^^^^^^",username)
        var db = client.db('shopkeeper');
        var result = {};

        // Find the userShop delete it and add it to 
        db.collection('shop').find({ username: username }).forEach(function (dbshop) {
            if (dbshop) {
              callback(dbshop)
            }
        })
    });
}
