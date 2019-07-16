var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var assert = require('assert') ;


var url = 'mongodb://127.0.0.1:27017/';

router.get('/', function(req,res){
    res.send("Hello index")
console.log('index.js')
console.log(JSON.stringify(req.body, undefined, 2))
})

router.post('/login', function(req, res){
    var resultArray = [];
    var username = req.body.username;
    var password = req.body.password;

    console.log("username parsed : " + username)
    console.log("password parsed : " + password)

    mongodb.connect(url, function(err, client){
    
        if(err) throw err;
        console.log('connected to mongo')
        var db = client.db('shopkeeper');
        assert.equal(null, err);
        db.collection('user').find().forEach(function(i){
            if(i.username === username && i.password === password)
            {
                console.log('sending response')
                res.send(true)
                console.log('found')
            }
        });
        client.close();
    });
    
    console.log("get request");
});

router.post('/register', function(req, res) {
  var item = {
    username : req.body.username,
    name : req.body.name,
    password : req.body.password,
    confirmpassword : req.body.confirmpassword,
    email : req.body.email
  };

  mongodb.connect(url,function(err, client){
      if (err) throw err;

      var db = client.db('shopkeeper');
        console.log("connected to shopkeeper")
      assert.equal(null, err);
      console.log(item)
      db.collection('user').insertOne(item, function(err, result) {
          assert.equal(null, err);
          console.log("item inserted");
          client.close();
      })
  })
  
  res.send(true);
  console.log(item)
});

module.exports = router;