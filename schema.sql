DROP DATABASE IF EXISTS trackerDB;

CREATE DATABASE trackerDB;

USE trackerDB;

CREATE TABLE employee 
(
    id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(20) NOT NULL,
    lastName VARCHAR(20) NOT NULL,
    title VARCHAR(20),
    salary INT,
    managerID INT,
    PRIMARY KEY (id)
);

CREATE TABLE title 
(
    id INT NOT NULL AUTO_INCREMENT,
    titleID VARCHAR(20),
    department_role VARCHAR,
    salary DECIMAL,
    PRIMARY KEY (id)
);

CREATE TABLE company 
(
    id INT NOT NULL AUTO_INCREMENT,
    department VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

USE trackerDB;

INSERT INTO company(department) VALUES ("Sales");

INSERT INTO company(department) VALUES ("Recuiters");

INSERT INTO company(department) VALUES ("Account Management");

INSERT INTO company(department) VALUES ("IT office");

INSERT INTO company(department) VALUES ("Maintenance");

INSERT INTO company(department) VALUES ("Human Resources");

INSERT INTO title(department_role) VALUES ("Web Developer");

INSERT INTO title(department_role) VALUES ("Software Engineer");

INSERT INTO title(department_role) VALUES ("Lead Recuiter");

INSERT INTO title(department_role) VALUES ("Maintanence Tech");

INSERT INTO employee(managerID) VALUES (100000);

INSERT INTO employee(managerID) VALUES (2);


