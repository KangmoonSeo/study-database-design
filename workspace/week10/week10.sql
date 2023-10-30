CREATE DATABASE week10;

USE week10;

CREATE TABLE user (
    Id VARCHAR(255) PRIMARY KEY,
    Password VARCHAR(255),
    Role VARCHAR(255)
);

CREATE TABLE department (
    Id int PRIMARY KEY,
    Dname VARCHAR(255),
    Dnumber int
);

INSERT INTO user (Id, Password, Role)
VALUES
('admin', 'admin1234', 'super'),
('student1', 'st1234', 'student');

INSERT INTO department (Id, Dname, Dnumber)
VALUES
(0, 'Information and Communication Engineering', 1),
(1, 'Electrical Engineering', 2),
(2, 'Computer Engineering', 3),
(3, 'Electronics Engineering', 4);

