-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 14 Kwi 2024, 12:51
-- Wersja serwera: 10.4.11-MariaDB
-- Wersja PHP: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `faktury`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `fx`
--

CREATE TABLE `fx` (
  `ID` int(10) NOT NULL,
  `Nr_Faktury` varchar(30) NOT NULL,
  `Data_wystawienia` date NOT NULL,
  `Metoda_platnosci` text NOT NULL,
  `Waluta` text NOT NULL,
  `Cena_netto` varchar(15) NOT NULL,
  `Stawka_VAT` varchar(10) NOT NULL,
  `ID_wystawiajacy` int(10) NOT NULL,
  `ID_podmiot` int(10) NOT NULL,
  `Nazwa_towaru` varchar(30) NOT NULL,
  `Ilość` varchar(15) NOT NULL,
  `Termin_platnosci` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `podmiot`
--

CREATE TABLE `podmiot` (
  `ID` int(10) NOT NULL,
  `Nazwa` varchar(30) NOT NULL,
  `NIP` int(10) NOT NULL,
  `Adres` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user`
--

CREATE TABLE `user` (
  `ID` int(10) NOT NULL,
  `UserName` varchar(20) NOT NULL,
  `Password` varchar(20) NOT NULL,
  `Acces` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
-- AUTO_INCREMENT dla tabeli `fx`
--
ALTER TABLE `fx`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `podmiot`
--
ALTER TABLE `podmiot`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
