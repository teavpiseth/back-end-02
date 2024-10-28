-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 28, 2024 at 04:56 PM
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
-- Table structure for table `access_key`
--

CREATE TABLE `access_key` (
  `Id` int(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Code` varchar(255) NOT NULL,
  `ParentId` int(255) DEFAULT NULL,
  `Status` int(255) NOT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `access_key`
--

INSERT INTO `access_key` (`Id`, `Name`, `Code`, `ParentId`, `Status`, `CreateAt`, `UpdateAt`) VALUES
(10, 'Employee', 'Employee', NULL, 1, '2024-10-21 08:32:08', '2024-10-21 08:32:08'),
(15, 'Category', 'Category', NULL, 1, '2024-10-21 14:32:05', '2024-10-24 13:45:16'),
(16, 'Product Add', 'Product_add', 17, 1, '2024-10-21 14:32:28', '2024-10-24 14:11:52'),
(17, 'Product', 'Product', NULL, 1, '2024-10-21 14:33:13', '2024-10-21 14:33:13'),
(18, 'Empoyee add new', 'employee_add_new', 10, 1, '2024-10-22 14:21:53', '2024-10-22 14:21:53'),
(19, 'Employee update', 'employee_update', 10, 1, '2024-10-23 15:48:34', '2024-10-23 15:48:34'),
(20, 'Employee Delete', 'employee_delete', 10, 1, '2024-10-24 13:34:43', '2024-10-24 13:34:43'),
(21, 'Access Key', 'access_key', NULL, 1, '2024-10-24 13:35:50', '2024-10-24 13:35:50'),
(22, 'Access Key Add New', 'access_key_add', 21, 1, '2024-10-24 13:36:28', '2024-10-24 13:36:28'),
(23, 'Access Key Update', 'access_key_update', 21, 1, '2024-10-24 13:37:01', '2024-10-24 13:37:01'),
(26, 'Category Add', 'category_add', 15, 1, '2024-10-24 14:02:24', '2024-10-24 14:02:24'),
(27, 'Category Update', 'category_update', 15, 1, '2024-10-24 14:02:51', '2024-10-24 14:02:51'),
(28, 'Category Delete', 'category_delete', 15, 1, '2024-10-24 14:03:19', '2024-10-24 14:03:19'),
(29, 'Access Key Delete', 'access_key_delete', 21, 1, '2024-10-24 14:06:21', '2024-10-24 14:06:21'),
(30, 'Product Delete', 'product_delete', 17, 1, '2024-10-24 14:08:39', '2024-10-24 14:08:39'),
(31, 'Product Update', 'product_update', 17, 1, '2024-10-24 14:12:43', '2024-10-24 14:12:43');

-- --------------------------------------------------------

--
-- Table structure for table `access_role`
--

CREATE TABLE `access_role` (
  `Id` int(11) NOT NULL,
  `AccessKeyId` int(11) NOT NULL,
  `RoleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `access_role`
--

INSERT INTO `access_role` (`Id`, `AccessKeyId`, `RoleId`) VALUES
(1, 10, 28),
(2, 15, 28),
(3, 16, 28),
(4, 17, 28),
(15, 17, 29),
(17, 15, 29),
(18, 16, 29),
(20, 18, 28),
(21, 19, 28),
(22, 20, 28),
(23, 21, 28),
(24, 22, 28),
(25, 23, 28),
(26, 26, 28),
(27, 27, 28),
(28, 28, 28),
(29, 29, 28),
(30, 30, 28),
(31, 31, 28),
(32, 26, 29),
(35, 20, 27);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `Id` int(11) NOT NULL,
  `Name` varchar(120) NOT NULL,
  `Description` text DEFAULT NULL,
  `ParentsId` int(8) DEFAULT NULL,
  `Status` tinyint(1) NOT NULL DEFAULT 0,
  `Image` varchar(255) NOT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`Id`, `Name`, `Description`, `ParentsId`, `Status`, `Image`, `CreateAt`, `UpdateAt`) VALUES
(20, 'Car', 'Car Desciption', NULL, 1, 'image-1727104263758-859823204.jpeg', '2024-09-23 14:50:14', '2024-09-24 14:51:29'),
(21, 'Toyota', 'Toyota Des', 20, 1, 'image-1727103346283-47959321.jpg', '2024-09-23 14:55:46', '2024-09-23 14:55:46'),
(23, 'Moto', 'Moto Description', NULL, 1, 'image-1727187948734-148126725.jpg', '2024-09-24 14:25:48', '2024-09-24 14:25:48'),
(24, 'Hong da', 'Hong Da Description', 23, 1, 'image-1727188694138-530448326.jpeg', '2024-09-24 14:38:14', '2024-09-24 14:38:14');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
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
  `RoleId` int(11) NOT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `CreateBy` int(11) DEFAULT NULL,
  `UpdateBy` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`Id`, `FirstName`, `LastName`, `Image`, `Gender`, `Dob`, `Tel`, `Email`, `Address`, `Status`, `Salary`, `Password`, `RoleId`, `CreateAt`, `UpdateAt`, `CreateBy`, `UpdateBy`) VALUES
(8, 'sokhin', 'sing', 'image-1726583888724-643339916.jpg', 'male', '2000-09-08 00:00:00', '0122112', NULL, 'street 200', 1, NULL, NULL, 27, '2024-09-11 14:16:14', '2024-10-24 14:24:22', NULL, NULL),
(15, 'try', 'sokheng', 'image-1726583863122-872903543.jpg', 'male', '2000-09-08 00:00:00', '012999988', NULL, 'street 200', 1, NULL, NULL, 27, '2024-09-11 14:33:27', '2024-10-24 14:24:26', NULL, NULL),
(19, 'pi', 'sey', 'image-1726583851936-149832683.jpg', 'male', '2000-09-08 00:00:00', '098989898', NULL, 'street 90', 1, NULL, NULL, 27, '2024-09-12 15:43:00', '2024-10-24 14:24:30', NULL, NULL),
(21, 'pi', 'sal', 'image-1726500819163-400408331.jpg', 'other', '2024-09-16 00:00:00', '121212', NULL, '13', 12, NULL, NULL, 27, '2024-09-16 14:44:10', '2024-10-24 14:24:33', NULL, NULL),
(22, 'panha', 'sing', 'image-1726757561694-150940821.jpg', 'male', '2024-09-11 00:00:00', '123', NULL, '13', 1, NULL, '$2b$10$OiYGmslWx/WLJkBLYYy9Gez.G4OxVvi9WRYTdGt2pRusNnBc744sO', 27, '2024-09-19 14:52:41', '2024-10-24 15:07:50', NULL, NULL),
(23, 'khin', 'khin', 'image-1728574065566-848771739.png', 'male', '2024-10-10 00:00:00', '987654321', NULL, '13', 1, NULL, '$2b$10$OiYGmslWx/WLJkBLYYy9Gez.G4OxVvi9WRYTdGt2pRusNnBc744sO', 28, '2024-10-10 15:27:45', '2024-10-24 14:42:37', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `persons`
--

CREATE TABLE `persons` (
  `ID` int(11) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `FirstName` varchar(255) DEFAULT NULL,
  `Age` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `Id` int(11) NOT NULL,
  `CategoryId` int(11) DEFAULT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` text DEFAULT NULL,
  `Qty` int(6) DEFAULT 0,
  `Price` decimal(12,2) DEFAULT 0.00,
  `DiscountPercent` decimal(12,2) DEFAULT 0.00,
  `DiscountAmount` decimal(12,2) NOT NULL,
  `NetPrice` decimal(12,2) NOT NULL,
  `Image` varchar(255) DEFAULT NULL,
  `Status` tinyint(1) DEFAULT 1,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `CreateBy` int(11) DEFAULT NULL,
  `UpdateAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `UpdateBy` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`Id`, `CategoryId`, `Name`, `Description`, `Qty`, `Price`, `DiscountPercent`, `DiscountAmount`, `NetPrice`, `Image`, `Status`, `CreateAt`, `CreateBy`, `UpdateAt`, `UpdateBy`) VALUES
(5, 20, 'Name01', 'des01', 1, 1000.00, 10.00, 100.00, 900.00, NULL, 1, '2024-09-25 14:56:44', 8, '2024-09-25 21:56:44', 8),
(8, 23, 'Pcx', 'Pcx corl red', 1, 2000.00, 10.00, 200.00, 1800.00, '', 1, '2024-09-26 14:59:18', 8, '2024-10-07 21:14:31', 8),
(9, 23, 'Dream 125', 'Dream 125 Des', 1, 1000.00, 10.00, 100.00, 900.00, NULL, 1, '2024-10-07 14:19:05', 8, '2024-10-07 21:19:05', 8),
(10, 23, 'Moto01', 'Moto01 description', 2, 2000.00, 1.00, 1.00, 1800.00, NULL, 1, '2024-10-08 14:54:10', 8, '2024-10-08 21:54:10', 8);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `Id` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Description` varchar(500) NOT NULL,
  `Image` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`Id`, `Title`, `Description`, `Image`) VALUES
(1, 'Note Book', 'Note Book Des', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg/640px-Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg'),
(2, 'Book 01', 'Book 02 Des', 'https://dictionary.cambridge.org/images/thumb/book_noun_001_01679.jpg?version=6.0.31'),
(3, 'Red Book', 'Red book description', 'https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY=');

-- --------------------------------------------------------

--
-- Table structure for table `product_image`
--

CREATE TABLE `product_image` (
  `Id` int(11) NOT NULL,
  `ProductId` int(11) DEFAULT NULL,
  `Image` varchar(255) NOT NULL,
  `CreateBy` int(11) DEFAULT 1,
  `UpdateBy` int(11) NOT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `product_image`
--

INSERT INTO `product_image` (`Id`, `ProductId`, `Image`, `CreateBy`, `UpdateBy`, `CreateAt`, `UpdateAt`) VALUES
(29, 8, 'image-1728314459398-550069004.jpg', 8, 8, '2024-10-07 15:20:59', '2024-10-07 15:20:59'),
(30, 8, 'image-1728314459399-332627738.jpg', 8, 8, '2024-10-07 15:20:59', '2024-10-07 15:20:59'),
(31, 9, 'image-1728397501099-666903320.png', 8, 8, '2024-10-08 14:25:01', '2024-10-08 14:25:01'),
(32, 9, 'image-1728397501101-694364297.png', 8, 8, '2024-10-08 14:25:01', '2024-10-08 14:25:01'),
(33, 5, 'image-1728397531880-520920350.png', 8, 8, '2024-10-08 14:25:31', '2024-10-08 14:25:31'),
(34, 5, 'image-1728397531882-288852273.png', 8, 8, '2024-10-08 14:25:31', '2024-10-08 14:25:31'),
(35, 10, 'image-1728399365702-316319857.jpg', 8, 8, '2024-10-08 14:56:05', '2024-10-08 14:56:05');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `Id` int(11) NOT NULL,
  `Name` varchar(120) NOT NULL,
  `Code` varchar(120) NOT NULL,
  `Status` tinyint(1) NOT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`Id`, `Name`, `Code`, `Status`, `CreateAt`, `UpdateAt`) VALUES
(27, 'IT', 'it', 1, '2024-10-21 12:44:07', '2024-10-21 12:44:07'),
(28, 'Admin', 'admin', 1, '2024-10-21 14:34:30', '2024-10-21 14:34:30'),
(29, 'Account', 'account', 1, '2024-10-21 14:34:47', '2024-10-21 14:34:47');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) NOT NULL,
  `expires` int(11) NOT NULL,
  `data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `access_key`
--
ALTER TABLE `access_key`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `KeyName` (`Code`);

--
-- Indexes for table `access_role`
--
ALTER TABLE `access_role`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `access_key_id` (`AccessKeyId`),
  ADD KEY `role_id` (`RoleId`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `role_id` (`RoleId`);

--
-- Indexes for table `persons`
--
ALTER TABLE `persons`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `CategoryId` (`CategoryId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `product_image`
--
ALTER TABLE `product_image`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `ProductId` (`ProductId`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Code` (`Code`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `access_key`
--
ALTER TABLE `access_key`
  MODIFY `Id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `access_role`
--
ALTER TABLE `access_role`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product_image`
--
ALTER TABLE `product_image`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `access_role`
--
ALTER TABLE `access_role`
  ADD CONSTRAINT `access_role_ibfk_1` FOREIGN KEY (`RoleId`) REFERENCES `role` (`Id`),
  ADD CONSTRAINT `access_role_ibfk_2` FOREIGN KEY (`AccessKeyId`) REFERENCES `access_key` (`Id`);

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`RoleId`) REFERENCES `role` (`Id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`CategoryId`) REFERENCES `category` (`Id`);

--
-- Constraints for table `product_image`
--
ALTER TABLE `product_image`
  ADD CONSTRAINT `product_image_ibfk_1` FOREIGN KEY (`ProductId`) REFERENCES `product` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
