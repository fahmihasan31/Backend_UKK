-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 05, 2024 at 05:18 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ukk_kasirkafe`
--

-- --------------------------------------------------------

--
-- Table structure for table `detail_transaksi`
--

CREATE TABLE `detail_transaksi` (
  `id_detail_transaksi` int(11) NOT NULL,
  `id_transaksi` int(11) DEFAULT NULL,
  `id_menu` int(11) DEFAULT NULL,
  `harga` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `detail_transaksi`
--

INSERT INTO `detail_transaksi` (`id_detail_transaksi`, `id_transaksi`, `id_menu`, `harga`, `qty`, `total`, `createdAt`, `updatedAt`) VALUES
(72, 67, 1, 10000, 2, 20000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(73, 68, 3, 4000, 2, 8000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(74, 69, 1, 10000, 1, 10000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(75, 70, 1, 10000, 1, 10000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(76, 71, 1, 10000, 1, 10000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(77, 72, 1, 10000, 1, 10000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(78, 73, 1, 10000, 2, 20000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(79, 74, 1, 10000, 2, 20000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(80, 75, 2, 10000, 2, 20000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(81, 76, 1, 10000, 2, 20000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(82, 76, 2, 10000, 2, 20000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(83, 77, 2, 10000, 2, 20000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(84, 78, 2, 10000, 2, 20000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(85, 79, 1, 10000, 1, 10000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(86, 80, 3, 4000, 2, 8000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(89, 82, 2, 10000, 2, 20000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(90, 82, 3, 4000, 1, 4000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(91, 82, 1, 10000, 2, 20000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(92, 82, 6, 4000, 1, 4000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(93, 83, 1, 10000, 2, 20000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(94, 83, 2, 10000, 2, 20000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(95, 83, 3, 4000, 1, 4000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(96, 84, 1, 10000, 2, 20000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(97, 84, 3, 4000, 2, 8000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(98, 85, 1, 10000, 2, 20000, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `meja`
--

CREATE TABLE `meja` (
  `id_meja` int(11) NOT NULL,
  `nomor_meja` varchar(255) DEFAULT NULL,
  `status` enum('terisi','kosong') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `meja`
--

INSERT INTO `meja` (`id_meja`, `nomor_meja`, `status`, `createdAt`, `updatedAt`) VALUES
(21, '5', 'kosong', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(22, '7', 'kosong', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(23, '1', 'kosong', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(24, '2', 'kosong', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(25, '3', 'kosong', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(26, '4', 'kosong', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id_menu` int(11) NOT NULL,
  `nama_menu` varchar(255) DEFAULT NULL,
  `jenis` enum('makanan','minuman') DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `harga` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id_menu`, `nama_menu`, `jenis`, `deskripsi`, `gambar`, `harga`, `createdAt`, `updatedAt`) VALUES
(1, 'burge', 'makanan', 'Family Mart', 'image-1731852539394-WhatsApp Image 2024-11-08 at 21.26.39_cc1555da.jpg', 10000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'cincau', 'minuman', 'Family Mart', 'image-1729995583569-kunjungan industri.jpg', 10000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'sate', 'makanan', 'degan degun', 'image-1730019167189-burger.jpeg', 4000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'kacang', 'makanan', 'kacang mahal kalau dikacangin wowowowoow\r\n\r\n', 'image-1730030361647-cart-item1.png', 5000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'daging', 'makanan', 'daging murmer\r\n', 'image-1730094041207-Screenshot 2024-10-23 141512.png', 4000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 'es pocong', 'minuman', 'es pocoong gacoan', 'image-1730094069770-Screenshot 2024-10-23 141549.png', 3000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 'sapi', 'makanan', 'sapi terbang', 'image-1730094133737-Screenshot 2024-10-23 141549.png', 8000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 'Basreng', 'makanan', 'Basreng Pedesan Kunchung', 'image-1730170161196-basreng.jpeg', 15000, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, 'kacang goreng', 'makanan', 'kacanng', 'image-1730172853262-basreng.jpeg', 2000, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20240917020031-create-user.js'),
('20240917020136-create-meja.js'),
('20240917020248-create-menu.js'),
('20240917020449-create-transaksi.js'),
('20240917020613-create-detail-transaksi.js');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` int(11) NOT NULL,
  `tgl_transaksi` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_user` int(11) DEFAULT NULL,
  `id_meja` int(11) DEFAULT NULL,
  `nama_pelanggan` varchar(255) DEFAULT NULL,
  `status` enum('belum_bayar','lunas') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id_transaksi`, `tgl_transaksi`, `id_user`, `id_meja`, `nama_pelanggan`, `status`, `createdAt`, `updatedAt`) VALUES
(67, '2024-10-28 20:26:05', 3, NULL, 'dono', 'belum_bayar', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(68, '2024-10-28 20:43:40', 3, NULL, 'jaki', 'belum_bayar', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(69, '2024-10-28 20:54:08', 3, NULL, 'ghj', 'belum_bayar', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(70, '2024-10-28 20:57:34', 3, NULL, 'jawad', 'lunas', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(71, '2024-10-28 20:59:15', 3, NULL, 'hj', 'lunas', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(72, '2024-10-28 21:00:20', 3, 21, 'vbn', 'lunas', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(73, '2024-10-28 21:21:41', 3, NULL, 'kiyomasa', 'lunas', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(74, '2024-10-28 21:22:16', 3, 21, 'sdfg', 'lunas', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(75, '2024-10-28 21:26:36', 3, 22, 'duan', 'lunas', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(76, '2024-10-28 21:27:42', 3, NULL, 'ijat', 'lunas', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(77, '2024-10-28 21:28:26', 3, NULL, 'abdul', 'lunas', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(78, '2024-10-28 21:28:52', 3, 21, 'doi', 'lunas', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(79, '2024-10-28 21:30:23', 3, 22, 'hasna', 'lunas', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(80, '2024-10-29 02:23:03', 3, NULL, 'halo', 'lunas', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(82, '2024-10-29 02:35:29', 3, NULL, 'kenji', 'lunas', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(83, '2024-10-29 03:35:22', 3, NULL, 'pak ilham', 'lunas', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(84, '2024-10-29 03:43:42', 5, 21, 'pak ilham2', 'lunas', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(85, '2024-11-17 14:09:46', 3, 23, '23', 'lunas', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `nama_user` varchar(255) DEFAULT NULL,
  `role` enum('admin','kasir','manajer') DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `nama_user`, `role`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 'admin', 'admin', '$2b$10$SZYK8xy1vAx/BdpFwPReSeGafXFpwr6sOI9eEo2mszLkWvySXMgWC', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'manajer', 'manajer', 'manajer', '$2b$10$ioJBG.6vAs3RxCvicZ8k2OU6rYrZRFWc0ge1wdt.qqAT3NaUtIBPO', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'kasir', 'kasir', 'kasir', '$2b$10$Z1CQQDex3OUvPw/9OmfRS.EslgkXRhITNNVxFhxrHICXaUtS.Ou2u', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'pak ilham', 'kasir', 'pak ilham', '$2b$10$uk97aCFVeOFFbtzdbZ4CCuHK7KPutgChveLm/DaxeH3P7XYgfRDd2', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD PRIMARY KEY (`id_detail_transaksi`),
  ADD KEY `id_transaksi` (`id_transaksi`),
  ADD KEY `id_menu` (`id_menu`);

--
-- Indexes for table `meja`
--
ALTER TABLE `meja`
  ADD PRIMARY KEY (`id_meja`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id_menu`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_meja` (`id_meja`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  MODIFY `id_detail_transaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `meja`
--
ALTER TABLE `meja`
  MODIFY `id_meja` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id_menu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id_transaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD CONSTRAINT `detail_transaksi_ibfk_1` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi` (`id_transaksi`),
  ADD CONSTRAINT `detail_transaksi_ibfk_2` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id_menu`);

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `transaksi_ibfk_2` FOREIGN KEY (`id_meja`) REFERENCES `meja` (`id_meja`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
