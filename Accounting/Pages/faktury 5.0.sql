-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: faktury
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `fx`
--

DROP TABLE IF EXISTS `fx`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fx` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nr_Faktury` varchar(30) DEFAULT NULL,
  `Data_wystawienia` date DEFAULT NULL,
  `Metoda_platnosci` text,
  `Waluta` text,
  `Cena_netto` float DEFAULT NULL,
  `Stawka_VAT` float DEFAULT NULL,
  `ID_wystawiajacy` int DEFAULT NULL,
  `ID_podmiot` int DEFAULT NULL,
  `Nazwa_towaru` varchar(100) DEFAULT NULL,
  `Ilość` varchar(15) DEFAULT NULL,
  `Termin_platnosci` date DEFAULT NULL,
  `Typ_faktury` varchar(30) DEFAULT NULL,
  `Miejsce_wystawienia` varchar(30) DEFAULT NULL,
  `Dostawa` text,
  `Odbiorca` text,
  `Płacący` text,
  `Sprzedający` text,
  `Jednostka_miary` text,
  `Utworzony_przez` text,
  `Odebrano` text,
  `Komentarze` mediumtext,
  `Zapłacono_dnia` date DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fx`
--

LOCK TABLES `fx` WRITE;
/*!40000 ALTER TABLE `fx` DISABLE KEYS */;
INSERT INTO `fx` VALUES (2,'202402','2024-06-05','cash','PLN',-800,0.23,1002,416387525,'Smartphone Samsung Galaxy S22','1','2024-06-18','do zapłaty','Kraków','osobiście','Ewa Nowak','Osoba prywatna','Sklep Elektroniczny \"Mobile Planet\"','szt.','Piotr Wiśniewski','Ewa Nowak','Sprzedaż telefonu na fakturę.','2024-06-05'),(6,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(20,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(22,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(23,'202401','2024-06-01','bank','PLN',-1500,0.23,13,416387525,'null','1','2024-06-14','do zapłaty','Warszawa','kurier','Jan Kowalski','Firma XYZ Sp. z o.o.','Sklep Komputerowy \"IT World\"','szt.','Anna Nowak','Jan Kowalski','Zakup laptopa przez firmę XYZ Sp. z o.o.','2024-06-10'),(24,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(26,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(27,'202403','2024-06-22','cash card bank','PLN',5000,0.23,13,716057728,'null','10','2024-06-20','wystawione','Jerozolima','poczta','Firma XYZ Sp. z o.o.','Firma XYZ Sp. z o.o.','Sklep Komputerowy \"IT World\"','licencja','Anna Nowak','Firma XYZ Sp. z o.o.','Zakup licencji na oprogramowanie biurowe.','2024-06-15');
/*!40000 ALTER TABLE `fx` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `podmiot`
--

DROP TABLE IF EXISTS `podmiot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `podmiot` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nazwa` varchar(30) NOT NULL,
  `NIP` int NOT NULL,
  `Adres` varchar(40) NOT NULL,
  `Telefon` varchar(30) DEFAULT NULL,
  `Komentarz` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=716057732 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `podmiot`
--

LOCK TABLES `podmiot` WRITE;
/*!40000 ALTER TABLE `podmiot` DISABLE KEYS */;
INSERT INTO `podmiot` VALUES (416387525,'EasyLease',2147483647,'adres','543634632','testowykomentarz');
/*!40000 ALTER TABLE `podmiot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nr_Albumu` int NOT NULL,
  `Imie` varchar(20) NOT NULL,
  `Nazwisko` varchar(30) NOT NULL,
  `UserName` varchar(20) NOT NULL,
  `Password` varchar(20) NOT NULL,
  `Access` int NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,999999,'Admin','Admin','admin','admin',0),(2,107910,'Robert','Cwyl','user1','pass1',0),(3,58667,'Bartłomiej','Rutkowski','user2','pass2',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-17  1:35:06
