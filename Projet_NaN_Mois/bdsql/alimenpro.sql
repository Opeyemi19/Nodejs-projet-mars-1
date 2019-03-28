-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  jeu. 28 mars 2019 à 07:14
-- Version du serveur :  10.1.32-MariaDB
-- Version de PHP :  7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `alimenpro`
--

-- --------------------------------------------------------

--
-- Structure de la table `boulangerie`
--

CREATE TABLE `boulangerie` (
  `id` int(11) NOT NULL,
  `name_pain` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `price_pain` double NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `boulangerie`
--

INSERT INTO `boulangerie` (`id`, `name_pain`, `price_pain`, `description`, `image`, `user_id`, `create_at`) VALUES
(24, 'Baguette Moulée', 2500, 'tous nos pains sont fabriqués dans nos fournils, dans le respect de la tradition boulangère avec des méthodes de travail rigoureuses, laissant aux pâtes le temps d\'exprimer tout leur potentiel.', 'image-1553727068444.jpg', 1, '2019-03-27 22:51:08'),
(25, 'Baguette Campagne', 245, 'La qualité et le goût sont les maîtres mots qui nous animent quotidiennement. Aux « Délices de Thouaré », nous sommes amoureux des pâtes bien hydratées, des tours de main bien maîtrisés,', 'image-1553746977707.jpg', 1, '2019-03-28 04:22:57'),
(26, 'Pain ', 345, 'shhsjdn hxnchnxn hsn xnhx xnx', 'image-1553748737052.jpg', 1, '2019-03-28 04:52:16'),
(28, 'psain', 456, 'sjjssmsms', 'image-1553750727810.jpg', 1, '2019-03-28 05:25:27');

-- --------------------------------------------------------

--
-- Structure de la table `panier`
--

CREATE TABLE `panier` (
  `id_pan` int(11) NOT NULL,
  `name_prod` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `price_prod` double NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `users_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `panier`
--

INSERT INTO `panier` (`id_pan`, `name_prod`, `price_prod`, `image`, `users_id`) VALUES
(43, 'Baguette Moulée de ', 2500, 'image-1553727068444.jpg', 6),
(44, 'Baguette Moulée de ', 2500, 'image-1553727068444.jpg', 1),
(47, 'Baguette Moulée', 2500, 'image-1553727068444.jpg', 8),
(53, 'Pain ', 345, 'image-1553748737052.jpg', 2);

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('3asUB-MLQyO_Fd50-A8C4b8PYx_Wp3UA', 1553839326, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{\"error\":[\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\"]},\"passport\":{\"user\":1}}');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `fullname` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `statut` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `fullname`, `statut`) VALUES
(1, 'sodik', '$2a$10$hV0E6pju0q/RC/9MD6cHNukNpyTJIr4GDJnyziVOg1fKkz8HVZKbC', 'sodik fatayo', 1),
(2, 'riki', '$2a$10$82rw50pB7iRJA9eZMSba/Ox5KowNweKBod8VJgxxgzCvl0KbTJISu', 'riki fatayo', 0),
(3, 'fatayo', '$2a$10$FOIY48OkEZC.BQb5UDa5CubENfASSg8jxULN52LoCfPeUy.QiSK/6', 'rikifat', 0),
(4, 'Opeyemi', '$2a$10$3zN4BSw7dlZB9AhPkZObhO8KcP9jWAsD6C3PGon/raS2HPR.H0kn2', 'Fatayo Opeyemi Sodik', 0),
(5, 'daou', '$2a$10$UVR5JYEUSnBDoGPsueBZHO2dmWwKsWx2SKoDl/kW.5dry12auq0eW', 'daou Fofana', 0),
(6, 'rik', '$2a$10$B2/Yx.f5xQsALEURpOvhp.7iyrUtVzvReeayqwAQuzfAwIy84dg5e', 'sodi', 0),
(7, 'kofi', '$2a$10$p5k8usgGHSJTa7jBxPWmBumKJwPEXYbpN4HBHipadSaA.9Gc8Hb62', 'Kofi', 0),
(8, 'fatayo', '$2a$10$/bthqzmu.m86s8yXVHP1DeggUDSD2LPDMLP1YSGSaw.aLUyoqFVKe', 'fatayo', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `boulangerie`
--
ALTER TABLE `boulangerie`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user` (`user_id`);

--
-- Index pour la table `panier`
--
ALTER TABLE `panier`
  ADD PRIMARY KEY (`id_pan`),
  ADD KEY `fk_users` (`users_id`);

--
-- Index pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `boulangerie`
--
ALTER TABLE `boulangerie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT pour la table `panier`
--
ALTER TABLE `panier`
  MODIFY `id_pan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `boulangerie`
--
ALTER TABLE `boulangerie`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `panier`
--
ALTER TABLE `panier`
  ADD CONSTRAINT `fk_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
