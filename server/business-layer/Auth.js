var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

exports.Token = (username) => {
    var token = jwt.sign({ username : username }, config.secret, {
        expiresIn: 86400
    }, () => {
        return json({ auth: true, token: token });
    });
}

exports.ValidateToken = (Token) => {
    var token = Token
    if (!token) return res.status(501).send({ auth: false, message: 'No token provided.' });
  
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      res.status(200).send(decoded);
    });
}