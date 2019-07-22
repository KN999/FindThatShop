var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var assert = require('assert');

var url = 'mongodb://127.0.0.1:27017/';

exports.AddItem = (itemDetails, callback) => {

    mongodb.connect(url, function (err, client) {

        assert.equal(null, err);
        console.log(itemDetails)
        var item =  {
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
                
                db.collection('item').remove({ shopid : itemDetails.shopid })
                
            }
        }, () => {
            // Add shop
            db.collection('item').insertOne(shopItem, function (err, res) {

                result.code = 503;// 403 - shop registered successfully
                result.message = 'Success';
                console.log("item inserted");

                callback(result);
                client.close();
            });
        })

    });
}

exports.GetItems = (shopid, callback) => {
    mongodb.connect(url, function (err, client) {

        assert.equal(null, err);
        console.log("^^^^^^^^^^^^",shopid)
        var db = client.db('shopkeeper');

        var result = {};

        // Find the userShop delete it and add it to 
        db.collection('item').find({ shopid: shopid }).forEach(function (dbitem) {
            if (dbitem) {

                result.code = 500; // Item Found
                result.message = "Success"
              callback(dbitem)
            }
    
        }, () => {
            if (result.code !== 500) {
                result.code =501; // Wrong Shopid
                result.message = "Failure"
                callback(result)
            }
        })
    });
}
