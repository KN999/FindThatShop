var express = require('express');
var router = express.Router();

var DatabaseClient = require('../../database-layer/search');

router.get('/searchQuery', function(req, res) {
    var query = req.query.query;
    DatabaseClient.FindThatShop(query, (result) => {
        res.send(result);
    })
})


module.exports = router;