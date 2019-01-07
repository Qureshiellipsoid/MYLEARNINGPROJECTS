-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.0.33-community-nt


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema placement_cell
--

CREATE DATABASE IF NOT EXISTS placement_cell;
USE placement_cell;

--
-- Definition of table `city`
--

DROP TABLE IF EXISTS `city`;
CREATE TABLE `city` (
  `_id` int(10) unsigned NOT NULL auto_increment,
  `state_id` int(10) unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY  (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `city`
--

/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` (`_id`,`state_id`,`name`) VALUES 
 (1,1,'Gwalior'),
 (2,1,'Indore'),
 (3,1,'Bhopal'),
 (4,2,'Agra'),
 (5,2,'Allahabad'),
 (6,2,'Varanasi'),
 (7,3,'Mumbai'),
 (8,3,'Pune'),
 (9,3,'Nagpur');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;


--
-- Definition of table `company`
--

DROP TABLE IF EXISTS `company`;
CREATE TABLE `company` (
  `_id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(45) NOT NULL,
  `hr` varchar(45) NOT NULL,
  `email_id` varchar(45) NOT NULL,
  `mobile_no` varchar(45) NOT NULL,
  `website` varchar(45) NOT NULL,
  `state_id` varchar(45) NOT NULL,
  `city_id` varchar(45) NOT NULL,
  `local_address` varchar(100) NOT NULL,
  `password` varchar(45) NOT NULL,
  `logo` varchar(45) default NULL,
  PRIMARY KEY  (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `company`
--

/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` (`_id`,`name`,`hr`,`email_id`,`mobile_no`,`website`,`state_id`,`city_id`,`local_address`,`password`,`logo`) VALUES 
 (17,'Facebokk','Zuckerberg','zuckerberg@gmail.com','7755443322','http://www.facebook.com','1','1','Silicon Valley , Gole Ka Mandir','1234','8fe00449580decd06e64f8871cd52ecf'),
 (18,'Amazon','IC Kher','aa@gmail.com','7766554433','http://www.amazon.com','1','2','D 37, pragati vihar gole ka mandir gwalior','123','b2b8cc26c424f13705cf58b785244560');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;


--
-- Definition of table `state`
--

DROP TABLE IF EXISTS `state`;
CREATE TABLE `state` (
  `_id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY  (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `state`
--

/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` (`_id`,`name`) VALUES 
 (1,'Madhya Pradesh'),
 (2,'UttarPradesh'),
 (3,'Maharashtra');
/*!40000 ALTER TABLE `state` ENABLE KEYS */;




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
