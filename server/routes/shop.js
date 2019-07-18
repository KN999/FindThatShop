var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var assert = require('assert') ;


var url = 'mongodb://127.0.0.1:27017/';

router.get('/', function(req,res){
    res.send("Hello shop")
console.log('index.js')
console.log(JSON.stringify(req.body, undefined, 2))
})

router.get('/dashboard', function(req, res) {
    // Send the users shop data to app server
    var user_id = req.body.user_id;

    mongodb.connect(url, function(err, client){
        if(err) throw err;

        var db = client.db('shopkeeper');
        console.log("connected to shopkeeper")
        var shops = [];
        db.collection('shop').find( {username : user_id} ).forEach(
            function(shop) {
                shops.push(shop)
                console.log("-------------------------")
                console.log(".................",JSON.stringify(shops))
            }, ()=> {
                res.send(shops)
            }
        )
    })
})

router.post('/addshop', function(req, res) {
  var shopDetails = {
    user_id : req.body.user_id,
    shopname : req.body.shopname,
    shopowner : req.body.shopowner,
    shopaddress : req.body.shopaddress,
    shopcontactno : req.body.shopcontactno,
  };

  mongodb.connect(url,function(err, client){
    if (err) throw err;

    var db = client.db('shopkeeper');
    console.log("connected to shopkeeper")

    // Check for if the user hasn't created a shop with the same name
    var shopnames = db.collection('shop').find( {shopname : shopDetails.shopname} ).count()

    if (Object.keys(shopnames).length != 0) {
        res.send(false)
        client.close();
    }
    else {
        assert.equal(null, err);
        console.log(shopDetails)
        db.collection('shop').insertOne(shopDetails, function(err, result) {
            assert.equal(null, err);
            console.log("item inserted");
            res.send(true);
            client.close();
        })
    }
  })
  console.log(shopDetails)
});

module.exports = router;