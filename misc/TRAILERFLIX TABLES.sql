CREATE TABLE `actor` (
	`actorID` int NOT NULL AUTO_INCREMENT,
	`actorName` varchar(255) NOT NULL DEFAULT 'null',
	PRIMARY KEY (`actorID`)
);

CREATE TABLE `catalog` (
	`movieID` int NOT NULL AUTO_INCREMENT,
	`poster` varchar(255) NOT NULL DEFAULT 'null',
	`title` varchar(255) NOT NULL,
	`categoryID` int NOT NULL,
	`summary` TEXT NOT NULL,
	`seasons` varchar(10) NOT NULL DEFAULT 'null',
	`trailer` varchar(255) NOT NULL DEFAULT 'null',
	PRIMARY KEY (`movieID`)
);

CREATE TABLE `category` (
	`categoryID` int NOT NULL AUTO_INCREMENT,
	`categoryName` varchar(255) NOT NULL,
	PRIMARY KEY (`categoryID`)
);

CREATE TABLE `genre` (
	`genreID` int NOT NULL AUTO_INCREMENT,
	`genreName` varchar(255) NOT NULL DEFAULT 'null',
	PRIMARY KEY (`genreID`)
);

CREATE TABLE `moviecast` (
	`movieID` int NOT NULL,
	`actorID` int NOT NULL
);

CREATE TABLE `moviegenre` (
	`movieID` int NOT NULL,
	`genreID` int NOT NULL
);

ALTER TABLE `catalog` ADD CONSTRAINT `catalog_fk0` FOREIGN KEY (`categoryID`) REFERENCES `category`(`categoryID`);

ALTER TABLE `moviecast` ADD CONSTRAINT `moviecast_fk0` FOREIGN KEY (`movieID`) REFERENCES `catalog`(`movieID`);

ALTER TABLE `moviecast` ADD CONSTRAINT `moviecast_fk1` FOREIGN KEY (`actorID`) REFERENCES `actor`(`actorID`);

ALTER TABLE `moviegenre` ADD CONSTRAINT `moviegenre_fk0` FOREIGN KEY (`movieID`) REFERENCES `catalog`(`movieID`);

ALTER TABLE `moviegenre` ADD CONSTRAINT `moviegenre_fk1` FOREIGN KEY (`genreID`) REFERENCES `genre`(`genreID`);







