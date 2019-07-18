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
    var user = {
         username : req.body.username,
         password : req.body.password,
    }

    console.log("username parsed : " + user.username)
    console.log("password parsed : " + user.password)

    mongodb.connect(url, function(err, client){
    
        if(err) throw err;
        console.log('connected to mongo')
        var db = client.db('shopkeeper');
        assert.equal(null, err);
        var cursor = db.collection('shopuser').find( {username : user.username} ).count()
        console.log("cursor legnth",Object.keys(cursor).length)
        console.log("cursor ",cursor)
        if(Object.keys(cursor).length === 0) {
            var user_id;
            db.collection('shopuser').find( {username : user.username} ).forEach(function(i){
                
                if(i.username === user.username && i.password === user.password)
                {
                    console.log("$$$$$$",i)
                    console.log('sending response',i.username,i.password,i._id)
                    console.log('found')
                }
                user_id = i._id
            }, ()=> {
                console.log("user_id", JSON.stringify(user_id))
                res.send(JSON.stringify(user_id));   
            });
        }
        else {
            res.send(false);
        }
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

    var cursor = db.collection('shopuser').find( {username : item.username} ).count()
    if (Object.keys(cursor).length != 0) {
        res.send(false)
        client.close();
    }
    else {
        console.log(item)
        db.collection('shopuser').insertOne(item, function(err, result) {
            assert.equal(null, err);
            console.log("item inserted");
            db.collection('shopuser').find( {username : item.username} ).forEach(function(i) {
                console.log("%%%%%%%%%%%%%",i)
                console.log("userid : ",JSON.stringify(i._id)) 
                client.close();
            })  
            res.send(JSON.stringify(i._id));   
        })    
    }
    
  })
  console.log(item)
});

module.exports = router;