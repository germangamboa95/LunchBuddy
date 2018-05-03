var mysql      = require('mysql');
var connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  database : 'lunchBuddy',
  port: '3306'
});


module.exports =  connection;