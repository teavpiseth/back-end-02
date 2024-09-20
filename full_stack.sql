-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 20, 2024 at 05:26 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `full_stack01`
--

-- --------------------------------------------------------

--
-- Table structure for table `Employee`
--

CREATE TABLE `Employee` (
  `Id` int(11) NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `Image` varchar(255) NOT NULL,
  `Gender` varchar(255) NOT NULL DEFAULT 'Male',
  `Dob` datetime NOT NULL,
  `Tel` varchar(255) NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Address` text NOT NULL,
  `Status` int(11) NOT NULL,
  `Salary` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `CreateBy` int(11) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `Employee`
--

INSERT INTO `Employee` (`Id`, `FirstName`, `LastName`, `Image`, `Gender`, `Dob`, `Tel`, `Email`, `Address`, `Status`, `Salary`, `Password`, `CreateAt`, `UpdateAt`, `CreateBy`, `UpdateBy`) VALUES
(8, 'sokhin', 'sing', 'image-1726583888724-643339916.jpg', 'male', '2000-09-08 00:00:00', '0122112', NULL, 'street 200', 1, NULL, NULL, '2024-09-11 14:16:14', '2024-09-17 14:38:08', NULL, NULL),
(15, 'try', 'sokheng', 'image-1726583863122-872903543.jpg', 'male', '2000-09-08 00:00:00', '012999988', NULL, 'street 200', 1, NULL, NULL, '2024-09-11 14:33:27', '2024-09-17 14:37:43', NULL, NULL),
(19, 'pi', 'sey', 'image-1726583851936-149832683.jpg', 'male', '2000-09-08 00:00:00', '098989898', NULL, 'street 90', 1, NULL, NULL, '2024-09-12 15:43:00', '2024-09-17 14:37:31', NULL, NULL),
(21, 'pi', 'sal', 'image-1726500819163-400408331.jpg', 'other', '2024-09-16 00:00:00', '121212', NULL, '13', 12, NULL, NULL, '2024-09-16 14:44:10', '2024-09-17 14:31:56', NULL, NULL),
(22, 'panha', 'sing', 'image-1726757561694-150940821.jpg', 'male', '2024-09-11 00:00:00', '12', NULL, '13', 1, NULL, NULL, '2024-09-19 14:52:41', '2024-09-19 14:52:41', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Persons`
--

CREATE TABLE `Persons` (
  `ID` int(11) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `FirstName` varchar(255) DEFAULT NULL,
  `Age` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

CREATE TABLE `Products` (
  `Id` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Description` varchar(500) NOT NULL,
  `Image` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `Products`
--

INSERT INTO `Products` (`Id`, `Title`, `Description`, `Image`) VALUES
(1, 'Note Book', 'Note Book Des', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg/640px-Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg'),
(2, 'Book 01', 'Book 02 Des', 'https://dictionary.cambridge.org/images/thumb/book_noun_001_01679.jpg?version=6.0.31'),
(3, 'Red Book', 'Red book description', 'https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY=');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Employee`
--
ALTER TABLE `Employee`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `Persons`
--
ALTER TABLE `Persons`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Employee`
--
ALTER TABLE `Employee`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `Products`
--
ALTER TABLE `Products`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
