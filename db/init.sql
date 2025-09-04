-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS sim;
USE sim;

-- Create user with all privileges
CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED BY '';
CREATE USER IF NOT EXISTS 'root'@'172.19.0.1' IDENTIFIED BY '';
CREATE USER IF NOT EXISTS 'root'@'localhost' IDENTIFIED BY '';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'172.19.0.1';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';
FLUSH PRIVILEGES;

-- Create tables