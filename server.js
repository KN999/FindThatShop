var express = require("express");
var bodyParser = require('body-parser')
var app = express();
var router = express.Router();
const path = require('path');

const PORT = process.env.PORT || 8080; // Step 1

var userRoute =  require('./server/service-layer/routes/users.js')
var shopRoute = require('./server/service-layer/routes/shops.js')
var inventoryRoute = require('./server/service-layer/routes/inventory.js')
var searchRoute = require('./server/service-layer/routes/search.js')

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
app.use('/search', searchRoute);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}

app.listen(PORT, () => {
    console.log(`Server is starting at PORT: ${PORT}`);
});