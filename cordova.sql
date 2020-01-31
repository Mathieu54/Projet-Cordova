-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le :  ven. 31 jan. 2020 à 10:11
-- Version du serveur :  10.0.38-MariaDB-0+deb8u1
-- Version de PHP :  7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `cordova`
--

-- --------------------------------------------------------

--
-- Structure de la table `monuments_all`
--

CREATE TABLE `monuments_all` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `longitude` double NOT NULL,
  `latitude` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `monuments_all`
--

INSERT INTO `monuments_all` (`id`, `nom`, `description`, `image`, `longitude`, `latitude`) VALUES
(1, 'IUT de Metz', 'L\'institut universitaire de technologie de Metz est situé sur l’île du Saulcy ainsi qu’au Technopôle de Metz-Grigy. Il fait partie de l’université de Lorraine.', 'iut-de-metz.png', 6.163739, 49.120029),
(2, 'Temple Neuf', 'Le Temple neuf, ou Nouveau Temple protestant, est un édifice de culte réformé d’Alsace et de Lorraine construit à Metz, entre 1901 et 1905, durant la période wilhelminienne. Le contexte historique de l\'époque est celui de l\'Alsace-Lorraine rattachée au deuxième Reich allemand suite au traité de Francfort.', 'temple-neuf.png', 6.17222, 49.120768),
(3, 'Cathédrale Saint-Étienne de Metz', 'La cathédrale Saint-Étienne de Metz est la cathédrale catholique du diocèse de Metz, dans le département français de la Moselle en région Grand Est.', 'cathedrale-metz.png', 6.175048, 49.119722),
(4, 'Palais de Justice', 'Le palais de justice de Metz est le siège des tribunaux de la commune de Metz en Moselle ainsi que de la Cour d\'appel de Metz. Ce majestueux et imposant édifice fait avec la pierre de Jaumont, était à l’origine destiné à la résidence du gouverneur militaire royal et des intendants de la province des Trois-Évêchés.', 'palais-de-justice.png', 6.171126, 49.116841),
(5, 'Plan d\'eau', 'Le plan d\'eau, situé en plein coeur de ville, s\'ouvre à la plaisance, à de multiples activités sportives, telles que le canoë kayak, l\'aviron...', 'plan-deau.png', 6.165005, 49.116326),
(7, 'Esplanade', 'L’Esplanade est un jardin de Metz d’une superficie de 9 200 m² situé à l’ouest du quartier de Metz-Centre.', 'esplanade.png', 6.170391, 49.116013);

-- --------------------------------------------------------

--
-- Structure de la table `monuments_visited`
--

CREATE TABLE `monuments_visited` (
  `id_visite` int(11) NOT NULL,
  `id_monuments` int(11) NOT NULL,
  `id_users` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `monuments_visited`
--

INSERT INTO `monuments_visited` (`id_visite`, `id_monuments`, `id_users`) VALUES
(1, 7, 1),
(2, 3, 1),
(3, 4, 2),
(4, 7, 2),
(7, 1, 2),
(8, 5, 2),
(9, 2, 2),
(10, 3, 2),
(12, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `identifiant` varchar(255) NOT NULL,
  `mdp` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `identifiant`, `mdp`) VALUES
(1, 'mathieu', 'mat'),
(2, 'test', 'test');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `monuments_all`
--
ALTER TABLE `monuments_all`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `monuments_visited`
--
ALTER TABLE `monuments_visited`
  ADD PRIMARY KEY (`id_visite`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `monuments_all`
--
ALTER TABLE `monuments_all`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `monuments_visited`
--
ALTER TABLE `monuments_visited`
  MODIFY `id_visite` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
