var express = require("express");
var bodyParser = require('body-parser')
var app = express();
var router = express.Router();

var userRoute =  require('./service-layer/routes/users.js')
var shopRoute = require('./service-layer/routes/shops.js')
var inventoryRoute = require('./service-layer/routes/inventory.js')

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
router.use(bodyParser.json())

app.use('/user', userRoute);
app.use('/shop', shopRoute);
app.use('/inventory', inventoryRoute);

app.get('/', function(req, res, next) {
    res.send('Hello World');
});

app.listen(3001, () => {
 console.log("Server running on port 3001");
});