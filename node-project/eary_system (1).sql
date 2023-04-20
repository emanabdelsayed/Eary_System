-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 20, 2023 at 02:32 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eary_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers_question`
--

CREATE TABLE `answers_question` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `answer` varchar(255) NOT NULL,
  `correct_answer` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `answers_question`
--

INSERT INTO `answers_question` (`id`, `question_id`, `answer`, `correct_answer`) VALUES
(1, 8, 'This is the answer option', 1),
(3, 10, 'This is the answerrr option', 1),
(5, 6, 'This is the answerrr nnnnn option', 0),
(6, 6, 'This nnnnn option eman eman eman', 0),
(7, 6, 'This nnnnn option sho sho sho sho ', 0),
(8, 6, 'This nnnnn option ssabhhhhhhhhhhh ', 0),
(9, 6, 'this is msh 3arf ehh', 1);

-- --------------------------------------------------------

--
-- Table structure for table `history_exam`
--

CREATE TABLE `history_exam` (
  `history_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `correct_answers` int(11) NOT NULL,
  `wrong_answers` int(1) NOT NULL,
  `score` int(11) NOT NULL,
  `total_answers` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `questions_exam`
--

CREATE TABLE `questions_exam` (
  `question_id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `audio_file` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '0-> inactive\r\n1-> active',
  `priority` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions_exam`
--

INSERT INTO `questions_exam` (`question_id`, `question`, `audio_file`, `status`, `priority`) VALUES
(6, 'ttttttttttttttttttttttttttttttt', 'alakhlas.mp3', 1, 0),
(8, 'fishhhhhhhhhhhhhhhhh', 'alakhlas.mp3', 1, 4),
(10, 'ddddddddddddddddddddddd', 'alakhlas.mp3', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0-> inactive\r\n1-> active',
  `token` varchar(255) NOT NULL,
  `role` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0 -> normal user\r\n1 -> admin user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `status`, `token`, `role`) VALUES
(2, 'shishi', 'emanabddud@gmail.com', '7656576', '', 2, 'ay 7aga', 0),
(3, 'salma hamn', 'salmahzim@gmail.com', '$2b$10$wypqZOb5Uey6Ew.9XBF/mugV9Jb4a8fBgE2LwAAJX.w', '', 0, '5e75ad240e74fd12ab89a72db74ca87a', 0),
(4, 'salma hamn', 'salmahzim@gmail.com', '$2b$10$GbUAjG3pCa.oFSb3QTu4suHTuJtmJaXC74ZCfWCAbkN', '', 0, '91b78d41b1dab0528bfc1ec20bdd4ff2', 0),
(5, 'Johnnn Doe', 'johnnnndoe@example.com', '$2b$10$YHcakXq7Ql4GHQYRBIDTOO6c1ltyjMqGHuiq8FLOeRr', '0106697797609', 0, 'fd0fe5ca29926346ca2bd33d0092bc20', 0),
(6, 'sabah hassan', 'sabahhassan@gmail.com', '$2b$10$FCO/IdQW2FaPjUiE7ByhsONlCqMsr5Rdku3fs.91YeY', '', 0, '4c34534957745ffcade497e65d315961', 0),
(7, 'sabah hassan', 'sabahhassan@gmail.com', '$2b$10$IqPhVt5L7j58GxlGwhQJlu7ZrKaMFe9/O9yjAyJ1q9b', '', 0, 'aada47fae3c74ec7c58b59d4c7984c56', 0),
(8, 'aliii sayed', 'sabahhhhh@gmail.com', '$2b$10$OGDbGC0ChT7SoYovYjAORuHBI3JDy4XPzrjQN09ola4', '', 0, 'efd28cf1bafe4918fbf44a04d2f06bd0', 0),
(9, 'hossam hassan', 'sabaaaaahhhhh@gmail.com', '$2b$10$a.AuFRf4L6qYWnN5dLJEveGMrnx4SPOf5W51MIBEkIH', '', 0, 'dd7e4ab9f08adcb842a224036d72d707', 0),
(12, 'admin admin', 'admin@gmail.com', '$2b$10$WqaUFfOIE9P97Ar.qg0.Zupuq1J5qAngmCycgXrzyQEi8uwsCWL5i', '0000', 1, 'd93f407419f582c07fd14cae27093ab8', 1),
(13, 'emannnn emannnn', 'admin@gmail.com', '$2b$10$ftw6/yuml3AzWcA7Akga4uCDa4ZijDZ.ccy2CAMg1RL2PIYAbXZ8e', '', 0, 'f6762995f366554734916a3ff780ca00', 0),
(14, 'emannnn emannnn', 'emanzaaaaaaaa@gmail.com', '$2b$10$ePAxkGB2tI8S9HFNulCF2eoI0.QLV.TbWRZLTP7P41ivZK0ltOkIG', '', 0, '128329bb6172781396c6b81ea834b5bc', 0),
(15, 'shosho shosho', 'shoshoshosho@gmail.com', '$2b$10$q85o23.czVHQmxwELHnPg.J376ld6O3ybsgtokWgjueTOUj1T/19.', '', 1, 'f12160630c389f3c648ce55c23731ddc', 0),
(16, 'nonononon nonononono', 'nononononononon@gmail.com', '$2b$10$6Ar0G1Byv3mmQYjPZdikleAc4/oMEUlVctJytdrgoFP3jyIsRpoZi', '', 1, 'b71588dfe4a21f88ffed5c327334aed2', 0),
(17, 'nononononnonononono', 'nonononhhhhhhhnon@gmail.com', '$2b$10$k3AV18OhO61WJkVyrcc61.bw3geLZkpGp8mJr80vVxntUsyozuz7C', '', 1, '7d77f69aa03a2ac60289de4328800d6d', 0),
(18, 'nhhhhhhhhhhhhhhhhhhh', 'nonononhhhhhon@gmail.com', '$2b$10$vnBh6aFW6EFwdCqrDuilcuybXkYB4Vxj/0aC7zt9GgEQmRg0yz8AK', '', 1, '7722ce80e66ba4147ae5b447d316b1d5', 0),
(19, 'shorokkkkkkkkkkkkk', 'emyemyemy@gmail.com', '$2b$10$xg3GzAN3AyMfe53G31un6ek1a3HBl1X9TkPBEEnhoXgSwJXbdcoPC', '', 0, '25b52ffc2017e4fe0ecec478374ab686', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers_question`
--
ALTER TABLE `answers_question`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_question_id` (`question_id`);

--
-- Indexes for table `history_exam`
--
ALTER TABLE `history_exam`
  ADD PRIMARY KEY (`history_id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Indexes for table `questions_exam`
--
ALTER TABLE `questions_exam`
  ADD PRIMARY KEY (`question_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers_question`
--
ALTER TABLE `answers_question`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `history_exam`
--
ALTER TABLE `history_exam`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `questions_exam`
--
ALTER TABLE `questions_exam`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answers_question`
--
ALTER TABLE `answers_question`
  ADD CONSTRAINT `fk_question_id` FOREIGN KEY (`question_id`) REFERENCES `questions_exam` (`question_id`);

--
-- Constraints for table `history_exam`
--
ALTER TABLE `history_exam`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
