DROP DATABASE IF EXISTS trackerDB;

CREATE DATABASE trackerDB;

USE trackerDB;

CREATE TABLE Employee 
(
    id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(20) NOT NULL,
    lastName VARCHAR(20) NOT NULL,
    role_ID INT NOT NULL,
    manager_ID INT,
    PRIMARY KEY (id)
);

CREATE TABLE Company 
(
    id INT NOT NULL AUTO_INCREMENT,
    department VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Roles 
(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(20) NOT NULL,
    department_role INT NOT NULL,
    salary DECIMAL NOT NULL
    PRIMARY KEY (id)
);