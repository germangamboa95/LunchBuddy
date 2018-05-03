CREATE DATABASE lunchBuddy

CREATE TABLE users(
    user_id INT NOT NULL AUTO_INCREMENT, 
    user_email VARCHAR(30) NOT NULL UNIQUE, 
    user_password VARCHAR(30)
    PRIMARY KEY (user_id)
);

CREATE TABLE results(
    quiz_id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(30) NOT NULL,
    question_one BOOLEAN NOT NULL,
    question_two BOOLEAN NOT NULL,
    question_three BOOLEAN NOT NULL,
    question_four BOOLEAN NOT NULL,
    question_five BOOLEAN NOT NULL,
)

