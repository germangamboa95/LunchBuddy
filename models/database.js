var mysql      = require('mysql');
var connection = mysql.createPool({
  host: "us-cdbr-iron-east-05.cleardb.net",

  // Your username
  user: "b1b33428f65f9b",

  // Your password
  password: "3ea11123",
  database: "heroku_0420777eb6f6d22"
});


module.exports =  connection;