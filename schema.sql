CREATE DATABASE lunchBuddy;

USE lunchBuddy;

CREATE TABLE users(
    user_id INT NOT NULL AUTO_INCREMENT, 
    user_email VARCHAR(30) NOT NULL UNIQUE, 
    user_password VARCHAR(30),
    user_image VARCHAR(100) NOT NULL DEFAULT './public/imgs/400x400.png',
    
    PRIMARY KEY (user_id)
);

ALTER TABLE users AUTO_INCREMENT  = 1; 

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

ALTER TABLE results AUTO_INCREMENT  = 1; 