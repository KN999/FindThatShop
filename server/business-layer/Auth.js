var jwt = require('jsonwebtoken');
//var bcrypt = require('bcryptjs');
var config = require('../config');

exports.TokenGenerator = (username) => {
    var token = jwt.sign({ username : username }, config.secret, {
        expiresIn: 86400
    }, () => {
        return token;
    });
}

exports.ValidateToken = (Token) => {
    var token = Token
    if (!token) return { auth: false, message: 'No token provided.' };// 601 - No token provided
  
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return { auth: false, message: 'Failed to authenticate token.' }; // 602 - Invalid Token
      
      return { auth: true, message: 'Success', decoded : decoded}; // 600 - Valid Token
    });
}