-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS sim;
USE sim;

-- Create users and grant privileges
CREATE USER IF NOT EXISTS 'simuser'@'%' IDENTIFIED BY 'simpass';
CREATE USER IF NOT EXISTS 'simuser'@'localhost' IDENTIFIED BY 'simpass';
CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED BY '';
CREATE USER IF NOT EXISTS 'root'@'localhost' IDENTIFIED BY '';

GRANT ALL PRIVILEGES ON sim.* TO 'simuser'@'%';
GRANT ALL PRIVILEGES ON sim.* TO 'simuser'@'localhost';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';

FLUSH PRIVILEGES;

-- Create base tables (TypeORM will handle the rest through synchronize)
CREATE TABLE IF NOT EXISTS `user` (
  `id` varchar(36) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255),
  `googleId` varchar(255),
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `medication` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `dosage` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `prescription` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `medicationId` varchar(36) NOT NULL,
  `dosage` varchar(255) NOT NULL,
  `frequency` varchar(255) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`medicationId`) REFERENCES `medication` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;