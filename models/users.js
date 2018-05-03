const mysql = require('mysql');
const connection = require('./database.js')

class User {
    constructor(){ 
        this.connection = connection;
    }

    loginUser(email, password) {
        return new Promise( (resolve, reject) => {
            const obj = [email, password];

            connection.getConnection((err, conn) =>{
                conn.query('SELECT * FROM users WHERE user_email = ? AND user_password = ?', obj, (err, results)=> {
            
                    conn.release();
                    if(err) throw err; 
                    resolve(results);

                });
            });
        });
    }

}

module.exports = User;