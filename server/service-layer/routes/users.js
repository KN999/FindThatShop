var express = require('express');
var router = express.Router();

var DatabaseClient = require('../../database-layer/users');

router.get('/ping', function (req, res) {
    res.send("pong")
})

router.post('/login', function (req, res) {

    var user = {
        username: req.body.username,
        password: req.body.password,
    }

    DatabaseClient.ValidateUser(user, (result) => {
        res.send(result);
    });
});

router.post('/register', function (req, res) {
    var user = {
        username: req.body.username,
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    };

    DatabaseClient.CheckUsername(user.username, (result) => {
        if (result.code === 302) { // Username is available
            DatabaseClient.RegisterUser(user, (result) => {
                res.send(result);
            });
        }
        else {
            res.send(result);
        }
    });

});

module.exports = router;