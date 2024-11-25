-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2024 at 11:46 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbsmschool`
--

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(5) NOT NULL,
  `st_id` int(5) DEFAULT NULL,
  `p_id` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`id`, `st_id`, `p_id`) VALUES
(1, 18, 14),
(2, 29, 14),
(3, 18, 14),
(4, 18, 14),
(5, 18, 14),
(6, 18, 14),
(7, 18, 14),
(8, 18, 14),
(9, 18, 14),
(10, 18, 14),
(11, 18, 14),
(12, 18, 14),
(13, 18, 14),
(14, 18, 15);

-- --------------------------------------------------------

--
-- Table structure for table `package`
--

CREATE TABLE `package` (
  `package_id` int(5) NOT NULL,
  `package_name` varchar(50) NOT NULL,
  `package_desti` varchar(50) NOT NULL,
  `package_arr` varchar(50) NOT NULL,
  `package_price` int(5) NOT NULL,
  `package_go` text NOT NULL,
  `package_back` varchar(50) NOT NULL,
  `package_desc` varchar(150) NOT NULL,
  `package_left` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `package`
--

INSERT INTO `package` (`package_id`, `package_name`, `package_desti`, `package_arr`, `package_price`, `package_go`, `package_back`, `package_desc`, `package_left`) VALUES
(14, 'London Tour', 'London', 'Thailand', 9800, '12 Jan 2024', '18 Jan 2024', 'London Tour (Jan 12–18, 2024) Explore London\'s top sights, including Buckingham Palace, the British Museum, the London Eye, and the Tower of London. E', 0),
(15, 'LA Tour', 'LA', 'Thailand', 9800, '12 Jan 2024', '18 Jan 2024', 'LA Tour (Jan 12–18, 2024) Explore LA top sights, including Buckingham Palace, the British Museum, the London Eye, and the Tower of London. Enjoy shopp', 5);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(5) NOT NULL,
  `stname` varchar(50) NOT NULL,
  `pwd` varchar(20) NOT NULL,
  `course` varchar(50) NOT NULL,
  `fee` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `stname`, `pwd`, `course`, `fee`) VALUES
(18, 'tt', '123', '135151', 'test@gamil.com'),
(19, 'TestJa', '123', '1234', 'eqeq@ffdfd.com'),
(24, 'TestRegis', '123', '9222222222', 'eqeq@ffdfd.com'),
(27, 'tt1', '123', '9222222222', 'eqeq@ffdfd.com'),
(28, 'admin', 'admin', '0987654321', 'admin@admin.com'),
(29, 'inter', '123', '1234', 'eqeq@ffdfd.com'),
(30, 'esper', '123', '999999999', 'fwqefw@fsdfad.com'),
(31, 'qwer', 'qwer', '999999999', 'fwqefw@fsdfad.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `st_id` (`st_id`),
  ADD KEY `p_id` (`p_id`);

--
-- Indexes for table `package`
--
ALTER TABLE `package`
  ADD PRIMARY KEY (`package_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_mdc` (`course`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `package`
--
ALTER TABLE `package`
  MODIFY `package_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `p_id` FOREIGN KEY (`p_id`) REFERENCES `package` (`package_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `st_id` FOREIGN KEY (`st_id`) REFERENCES `student` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
