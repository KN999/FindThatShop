var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var assert = require('assert');

var url = 'mongodb://127.0.0.1:27017/';

exports.FindThatShop = (query, callback) => {
    mongodb.connect(url, function (err, client) {

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
                result.code = 404; // Success in retrieving data
                result.message = "Data found";
                queriedShops.push(dbshop);
                result.shop = queriedShops;
            }
        },() => {
                callback(result);
        })
    });
}
