var express = require("express");
var bodyParser = require('body-parser')
var app = express();
var router = express.Router();



var indexRoute =  require('./routes/index.js')

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
router.use(bodyParser.json())

app.use('/index', indexRoute);

app.get('/', function(req, res, next) {
    res.send('Hello World');
});

app.listen(3001, () => {
 console.log("Server running on port 3001");
});