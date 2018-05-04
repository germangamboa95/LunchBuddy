const mysql = require("mysql");
const connection = require("./database.js");

class User {
  constructor() {
    this.connection = connection;
  }

  loginUser(email, password) {
    return new Promise((resolve, reject) => {
      const obj = [email, password];

      connection.getConnection((err, conn) => {
        conn.query(
          "SELECT * FROM users WHERE user_email = ? AND user_password = ?",
          obj,
          (err, results) => {
            conn.release();
            if (err) throw err;
            resolve(results);
          }
        );
      });
    });
  }

  getUsers(data) {
    return new Promise((resolve, reject) => {
      connection.getConnection((err, conn) => {
        conn.query(
          "SELECT * FROM users",
          (err, results) => {
            conn.release();
            if (err) throw err;
            resolve(results);
          }
        );
      });
    });

  }

  addUser(email, password) {
    return new Promise((resolve, reject) => {
      connection.getConnection((err, conn) => {
        conn.query(
          `INSERT INTO users(user_email, user_password) VALUES ('${email}', '${password}') `,
          (err, results) => {
            conn.release();
            if (err) throw err;
            resolve(results);
          }
        );
      });
    });
  }

  addQuiz(data) {
    return new Promise((resolve, reject) => {
      connection.getConnection((err, conn) => {
        conn.query(
          `INSERT INTO results(user_id, question_one, question_two, question_three, question_four, question_five) VALUES ('${
            data.id
          }', ${data.one},${data.two},${data.three},${data.four},${
            data.five
          }) `,
          (err, results) => {
            conn.release();
            if (err) throw err;
            resolve(results);
          }
        );
      });
    });
  }

  getMyMatch() {
    const query = `SELECT * FROM results INNER JOIN users ON results.user_id = users.user_id`;
    return new Promise((resolve, reject) => {
      connection.getConnection((err, conn) => {
        conn.query(query, (err, results) => {
          conn.release();
          if (err) throw err;
          resolve(results);
        });
      });
    });
  }
}




module.exports = User;
