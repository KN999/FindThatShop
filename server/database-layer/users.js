var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var assert = require('assert');

var url = 'mongodb://127.0.0.1:27017/';

exports.ValidateUser = function (user, callback) {

    mongodb.connect(url, function (err, client) {

        assert.equal(null, err);

        var db = client.db('shopkeeper');
        var result = {};

        db.collection('shopuser').find({ username: user.username }).forEach(function (dbuser) {

            if (dbuser.password === user.password) {
                result.code = 102; // 102 - Credential Matched
                result.message = 'Success';
            }
            else {
                result.code = 101; //101 - Invalid Password
                result.message = 'Failure: Password is incorrect';
            }

        }, () => {
            if (result.code !== 101 && result.code !== 102) {
                result.code = 100; // 100 - Invalid username
                result.message = 'user doesn\'t exist';
            }
            client.close();
            callback(result);
        });

    });
}

exports.CheckUsername = (username, callback) => {
    mongodb.connect(url, function (err, client) {

        assert.equal(null, err);

        var db = client.db('shopkeeper');
        var result = {};

        // Check if username is available
        db.collection('shopuser').find({ username: username }).forEach(function (dbuser) {
            if (dbuser) {

                result.code = 300; // 300 - Invalid Username/ username already taken
                result.message = 'Failure: Username already exists';
            }
        }, () => {

            if (result.code !== 300) {

                result.code = 302; // 302 - username available
                result.message = "Success"
            }

            client.close();
            callback(result)
        });

    });
}


exports.RegisterUser = (user, callback) => {
    mongodb.connect(url, function (err, client) {

        assert.equal(null, err);

        var db = client.db('shopkeeper');
        var result = {};

        // Add user
        db.collection('shopuser').insertOne(user, function (err, res) {

            result.code = 303;// 303 - user registered successfully
            result.message = 'Success';
            console.log("item inserted");

            callback(result);
            client.close();
        });

    });
}

