CREATE DATABASE lunchBuddy;

USE lunchBuddy;

CREATE TABLE users(
    user_id INT NOT NULL AUTO_INCREMENT, 
    user_email VARCHAR(30) NOT NULL UNIQUE, 
    user_password VARCHAR(30),
    PRIMARY KEY (user_id)
);

CREATE TABLE results(
    quiz_id INT NOT NULL AUTO_INCREMENT,
    user_id  INT NOT NULL,
    question_one BOOLEAN,
    question_two BOOLEAN,
    question_three BOOLEAN,
    question_four BOOLEAN,
    question_five BOOLEAN,
    PRIMARY KEY (quiz_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

