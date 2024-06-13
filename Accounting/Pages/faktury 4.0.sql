-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Cze 13, 2024 at 02:56 PM
-- Wersja serwera: 8.3.0
-- Wersja PHP: 8.1.2-1ubuntu2.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `faktury`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `fx`
--

CREATE TABLE `fx` (
  `ID` int NOT NULL,
  `Nr_Faktury` varchar(30) NOT NULL,
  `Data_wystawienia` date NOT NULL,
  `Metoda_platnosci` text NOT NULL,
  `Waluta` text NOT NULL,
  `Cena_netto` float NOT NULL,
  `Stawka_VAT` float NOT NULL,
  `ID_wystawiajacy` int NOT NULL,
  `ID_podmiot` int NOT NULL,
  `Nazwa_towaru` varchar(30) NOT NULL,
  `Ilość` varchar(15) NOT NULL,
  `Termin_platnosci` date NOT NULL,
  `Typ faktury` varchar(10) NOT NULL,
  `Miejsce wystawienia` varchar(30) NOT NULL,
  `Dostawa` text NOT NULL,
  `Odbiorca` text NOT NULL,
  `Płacący` text NOT NULL,
  `Sprzedający` text NOT NULL,
  `Jednostka miary` text NOT NULL,
  `Utworzony przez` text NOT NULL,
  `Odebrano` text NOT NULL,
  `Komentarze` mediumtext NOT NULL,
  `Zapłacono dnia` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `fx`
--

INSERT INTO `fx` (`ID`, `Nr_Faktury`, `Data_wystawienia`, `Metoda_platnosci`, `Waluta`, `Cena_netto`, `Stawka_VAT`, `ID_wystawiajacy`, `ID_podmiot`, `Nazwa_towaru`, `Ilość`, `Termin_platnosci`, `Typ faktury`, `Miejsce wystawienia`, `Dostawa`, `Odbiorca`, `Płacący`, `Sprzedający`, `Jednostka miary`, `Utworzony przez`, `Odebrano`, `Komentarze`, `Zapłacono dnia`) VALUES
(1, 'FX/1', '2024-04-25', 'BLIK', 'PLN', 1000, 23, 1, 1, 'jabłka', '1 tona', '2024-04-30', '', '', '', '', '', '', '', '', '', '', NULL),
(2, 'FX/2', '2024-04-21', 'gotówka', 'PLN', 250, 5, 2, 1, 'karta graficzna Nvidia Geforce', '1', '2024-04-29', '', '', '', '', '', '', '', '', '', '', NULL),
(3, 'FX/3', '2024-06-13', 'gotówka', 'PLN', 16.87, 5, 1, 2, 'gruszki', '3 kilogramy', '2024-06-17', 'paragon', 'Warszawa', 'dowóz pod miejsce zamieszkania', 'Kowalski', 'Nowak', 'Krasiński', 'kilogramy', 'rcwyl', 'admin', 'brak', '2024-06-19');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `podmiot`
--

CREATE TABLE `podmiot` (
  `ID` int NOT NULL,
  `Nazwa` varchar(30) NOT NULL,
  `NIP` int NOT NULL,
  `Adres` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user`
--

CREATE TABLE `user` (
  `ID` int NOT NULL,
  `Nr Albumu` int NOT NULL,
  `Imie` varchar(20) NOT NULL,
  `Nazwisko` varchar(30) NOT NULL,
  `UserName` varchar(20) NOT NULL,
  `Password` varchar(20) NOT NULL,
  `Access` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `Nr Albumu`, `Imie`, `Nazwisko`, `UserName`, `Password`, `Access`) VALUES
(1, 107910, 'Robert', 'Cwyl', 'user1', 'pass1', 0),
(2, 0, '', '', 'user2', 'pass2', 0);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `fx`
--
ALTER TABLE `fx`
  ADD PRIMARY KEY (`ID`);

--
-- Indeksy dla tabeli `podmiot`
--
ALTER TABLE `podmiot`
  ADD PRIMARY KEY (`ID`);

--
-- Indeksy dla tabeli `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fx`
--
ALTER TABLE `fx`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `podmiot`
--
ALTER TABLE `podmiot`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
