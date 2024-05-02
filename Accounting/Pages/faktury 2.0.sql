-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 02 Maj 2024, 12:19
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
  `Termin_platnosci` date NOT NULL,
  `Typ faktury` varchar(10) NOT NULL,
  `Miejsce wystawienia` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `fx`
--

INSERT INTO `fx` (`ID`, `Nr_Faktury`, `Data_wystawienia`, `Metoda_platnosci`, `Waluta`, `Cena_netto`, `Stawka_VAT`, `ID_wystawiajacy`, `ID_podmiot`, `Nazwa_towaru`, `Ilość`, `Termin_platnosci`, `Typ faktury`, `Miejsce wystawienia`) VALUES
(1, 'FX/1', '2024-04-25', 'BLIK', 'PLN', '1000', '23%', 1, 1, 'jabłka', '1 tona', '2024-04-30', '', ''),
(2, 'FX/2', '2024-04-21', 'gotówka', 'PLN', '250', '5%', 2, 1, 'karta graficzna Nvidia Geforce', '1', '2024-04-29', '', '');

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
  `Nr Albumu` int(20) NOT NULL,
  `Imie` varchar(20) NOT NULL,
  `Nazwisko` varchar(30) NOT NULL,
  `UserName` varchar(20) NOT NULL,
  `Password` varchar(20) NOT NULL,
  `Access` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `user`
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
-- AUTO_INCREMENT dla tabeli `fx`
--
ALTER TABLE `fx`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `podmiot`
--
ALTER TABLE `podmiot`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
