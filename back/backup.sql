-- MySQL dump 10.13  Distrib 9.2.0, for macos15 (arm64)
--
-- Host: localhost    Database: Premier_Pas
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Article`
--

DROP TABLE IF EXISTS `Article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Article` (
  `id_article` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) NOT NULL,
  `contenu` text NOT NULL,
  `date_creation` datetime NOT NULL,
  `auteur` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_article`),
  KEY `idx_date_creation` (`date_creation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Article`
--

LOCK TABLES `Article` WRITE;
/*!40000 ALTER TABLE `Article` DISABLE KEYS */;
/*!40000 ALTER TABLE `Article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Bebe`
--

DROP TABLE IF EXISTS `Bebe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Bebe` (
  `id_bebe` int NOT NULL AUTO_INCREMENT,
  `id_grossesse` int DEFAULT NULL,
  `date_naissance` date DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `taille` int DEFAULT NULL,
  `poids` decimal(4,2) DEFAULT NULL,
  `dernier_dejeuner` timestamp NULL DEFAULT NULL,
  `sommeil` time DEFAULT NULL,
  `temperature` decimal(3,1) DEFAULT NULL,
  PRIMARY KEY (`id_bebe`),
  KEY `fk_grossesse` (`id_grossesse`),
  CONSTRAINT `fk_grossesse` FOREIGN KEY (`id_grossesse`) REFERENCES `Grossesse` (`id_grossesse`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bebe`
--

LOCK TABLES `Bebe` WRITE;
/*!40000 ALTER TABLE `Bebe` DISABLE KEYS */;
/*!40000 ALTER TABLE `Bebe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Commentaire`
--

DROP TABLE IF EXISTS `Commentaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Commentaire` (
  `id_commentaire` int NOT NULL AUTO_INCREMENT,
  `id_utilisateur` int NOT NULL,
  `contenu` text NOT NULL,
  `date_commentaire` date NOT NULL,
  PRIMARY KEY (`id_commentaire`),
  KEY `fk_commentaire_utilisateur` (`id_utilisateur`),
  CONSTRAINT `fk_commentaire_utilisateur` FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur` (`id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Commentaire`
--

LOCK TABLES `Commentaire` WRITE;
/*!40000 ALTER TABLE `Commentaire` DISABLE KEYS */;
/*!40000 ALTER TABLE `Commentaire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Grossesse`
--

DROP TABLE IF EXISTS `Grossesse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Grossesse` (
  `id_grossesse` int NOT NULL AUTO_INCREMENT,
  `id_utilisateur` int DEFAULT NULL,
  `date_debut` date DEFAULT NULL,
  `date_terme` date DEFAULT NULL,
  PRIMARY KEY (`id_grossesse`),
  KEY `fk_grossesse_utilisateur` (`id_utilisateur`),
  CONSTRAINT `fk_grossesse_utilisateur` FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur` (`id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Grossesse`
--

LOCK TABLES `Grossesse` WRITE;
/*!40000 ALTER TABLE `Grossesse` DISABLE KEYS */;
/*!40000 ALTER TABLE `Grossesse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Humeur`
--

DROP TABLE IF EXISTS `Humeur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Humeur` (
  `id_humeur` int NOT NULL AUTO_INCREMENT,
  `id_utilisateur` int NOT NULL,
  `humeur` varchar(255) NOT NULL,
  `date_enregistrement` date NOT NULL,
  `duree` time DEFAULT NULL,
  `note` text,
  PRIMARY KEY (`id_humeur`),
  KEY `fk_utilisateur` (`id_utilisateur`),
  CONSTRAINT `fk_utilisateur` FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur` (`id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Humeur`
--

LOCK TABLES `Humeur` WRITE;
/*!40000 ALTER TABLE `Humeur` DISABLE KEYS */;
/*!40000 ALTER TABLE `Humeur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Like_Commentaire`
--

DROP TABLE IF EXISTS `Like_Commentaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Like_Commentaire` (
  `id_like_commentaire` int NOT NULL AUTO_INCREMENT,
  `id_utilisateur` int NOT NULL,
  `id_commentaire` int NOT NULL,
  PRIMARY KEY (`id_like_commentaire`),
  KEY `fk_like_utilisateur` (`id_utilisateur`),
  KEY `fk_like_commentaire` (`id_commentaire`),
  CONSTRAINT `fk_like_commentaire` FOREIGN KEY (`id_commentaire`) REFERENCES `Commentaire` (`id_commentaire`),
  CONSTRAINT `fk_like_utilisateur` FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur` (`id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Like_Commentaire`
--

LOCK TABLES `Like_Commentaire` WRITE;
/*!40000 ALTER TABLE `Like_Commentaire` DISABLE KEYS */;
/*!40000 ALTER TABLE `Like_Commentaire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Like_Publication`
--

DROP TABLE IF EXISTS `Like_Publication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Like_Publication` (
  `id_liker` int NOT NULL AUTO_INCREMENT,
  `id_utilisateur` int NOT NULL,
  `id_publication` int NOT NULL,
  PRIMARY KEY (`id_liker`),
  KEY `fk_like_utilisateur_uniq` (`id_utilisateur`),
  KEY `fk_like_publication_uniq` (`id_publication`),
  CONSTRAINT `fk_like_publication_uniq` FOREIGN KEY (`id_publication`) REFERENCES `Publication` (`id_publication`),
  CONSTRAINT `fk_like_utilisateur_uniq` FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur` (`id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Like_Publication`
--

LOCK TABLES `Like_Publication` WRITE;
/*!40000 ALTER TABLE `Like_Publication` DISABLE KEYS */;
/*!40000 ALTER TABLE `Like_Publication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Liste_Categorie`
--

DROP TABLE IF EXISTS `Liste_Categorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Liste_Categorie` (
  `id_liste_categorie` int NOT NULL AUTO_INCREMENT,
  `titre_categorie` varchar(255) NOT NULL,
  `suggestion` varchar(255) NOT NULL,
  PRIMARY KEY (`id_liste_categorie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Liste_Categorie`
--

LOCK TABLES `Liste_Categorie` WRITE;
/*!40000 ALTER TABLE `Liste_Categorie` DISABLE KEYS */;
/*!40000 ALTER TABLE `Liste_Categorie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Media_Bebe`
--

DROP TABLE IF EXISTS `Media_Bebe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Media_Bebe` (
  `id_media_bebe` int NOT NULL AUTO_INCREMENT,
  `id_utilisateur` int NOT NULL,
  `type_media` enum('photo','video','audio') NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `date_ajout` datetime DEFAULT NULL,
  PRIMARY KEY (`id_media_bebe`),
  KEY `fk_utilisateur_media` (`id_utilisateur`),
  CONSTRAINT `fk_utilisateur_media` FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur` (`id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Media_Bebe`
--

LOCK TABLES `Media_Bebe` WRITE;
/*!40000 ALTER TABLE `Media_Bebe` DISABLE KEYS */;
/*!40000 ALTER TABLE `Media_Bebe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Message`
--

DROP TABLE IF EXISTS `Message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Message` (
  `id_message` int NOT NULL AUTO_INCREMENT,
  `id_utilisateur_envoyeur` int NOT NULL,
  `id_utilisateur_destinataire` int NOT NULL,
  `message` text NOT NULL,
  `date_envoie` date NOT NULL,
  PRIMARY KEY (`id_message`),
  KEY `fk_message_envoyeur` (`id_utilisateur_envoyeur`),
  KEY `fk_message_destinataire` (`id_utilisateur_destinataire`),
  CONSTRAINT `fk_message_destinataire` FOREIGN KEY (`id_utilisateur_destinataire`) REFERENCES `Utilisateur` (`id_utilisateur`),
  CONSTRAINT `fk_message_envoyeur` FOREIGN KEY (`id_utilisateur_envoyeur`) REFERENCES `Utilisateur` (`id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Message`
--

LOCK TABLES `Message` WRITE;
/*!40000 ALTER TABLE `Message` DISABLE KEYS */;
/*!40000 ALTER TABLE `Message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Modele_Notification`
--

DROP TABLE IF EXISTS `Modele_Notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Modele_Notification` (
  `id_notification` int NOT NULL,
  `type_notification` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `duree` timestamp NOT NULL,
  PRIMARY KEY (`id_notification`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Modele_Notification`
--

LOCK TABLES `Modele_Notification` WRITE;
/*!40000 ALTER TABLE `Modele_Notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `Modele_Notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Parrainage`
--

DROP TABLE IF EXISTS `Parrainage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Parrainage` (
  `id_parrainage` int NOT NULL AUTO_INCREMENT,
  `id_utilisateur` int DEFAULT NULL,
  `id_utilisateur_parraine` int DEFAULT NULL,
  `date_parrainage` date DEFAULT NULL,
  `code` varchar(255) NOT NULL,
  PRIMARY KEY (`id_parrainage`),
  KEY `fk_parrainage_utilisateur` (`id_utilisateur`),
  KEY `fk_parrainage_utilisateur_parraine` (`id_utilisateur_parraine`),
  CONSTRAINT `fk_parrainage_utilisateur` FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur` (`id_utilisateur`),
  CONSTRAINT `fk_parrainage_utilisateur_parraine` FOREIGN KEY (`id_utilisateur_parraine`) REFERENCES `Utilisateur` (`id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Parrainage`
--

LOCK TABLES `Parrainage` WRITE;
/*!40000 ALTER TABLE `Parrainage` DISABLE KEYS */;
/*!40000 ALTER TABLE `Parrainage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Partage`
--

DROP TABLE IF EXISTS `Partage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Partage` (
  `id_donnee` int NOT NULL AUTO_INCREMENT,
  `id_utilisateur_envoyer` int NOT NULL,
  `id_utilisateur_receveur` int NOT NULL,
  `table` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `date_creation` date NOT NULL,
  `statut` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_donnee`),
  KEY `fk_partage_utilisateur_envoyer` (`id_utilisateur_envoyer`),
  KEY `fk_partage_utilisateur_receveur` (`id_utilisateur_receveur`),
  CONSTRAINT `fk_partage_utilisateur_envoyer` FOREIGN KEY (`id_utilisateur_envoyer`) REFERENCES `Utilisateur` (`id_utilisateur`),
  CONSTRAINT `fk_partage_utilisateur_receveur` FOREIGN KEY (`id_utilisateur_receveur`) REFERENCES `Utilisateur` (`id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Partage`
--

LOCK TABLES `Partage` WRITE;
/*!40000 ALTER TABLE `Partage` DISABLE KEYS */;
/*!40000 ALTER TABLE `Partage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Publication`
--

DROP TABLE IF EXISTS `Publication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Publication` (
  `id_publication` int NOT NULL AUTO_INCREMENT,
  `id_utilisateur` int NOT NULL,
  `contenu` text NOT NULL,
  `date_publication` date NOT NULL,
  PRIMARY KEY (`id_publication`),
  KEY `fk_publication_utilisateur` (`id_utilisateur`),
  CONSTRAINT `fk_publication_utilisateur` FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur` (`id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Publication`
--

LOCK TABLES `Publication` WRITE;
/*!40000 ALTER TABLE `Publication` DISABLE KEYS */;
/*!40000 ALTER TABLE `Publication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Quiz`
--

DROP TABLE IF EXISTS `Quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Quiz` (
  `id_quiz` int NOT NULL AUTO_INCREMENT,
  `id_utilisateur` int NOT NULL,
  `titre` varchar(255) NOT NULL,
  `question` json NOT NULL,
  PRIMARY KEY (`id_quiz`),
  KEY `fk_quiz_utilisateur` (`id_utilisateur`),
  CONSTRAINT `fk_quiz_utilisateur` FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur` (`id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='question = JSON format';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Quiz`
--

LOCK TABLES `Quiz` WRITE;
/*!40000 ALTER TABLE `Quiz` DISABLE KEYS */;
/*!40000 ALTER TABLE `Quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rdv_medical`
--

DROP TABLE IF EXISTS `Rdv_medical`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rdv_medical` (
  `id_rdv_medical` int NOT NULL AUTO_INCREMENT,
  `id_type_rdv` int NOT NULL,
  `id_grossesse` int DEFAULT NULL,
  `id_bebe` int DEFAULT NULL,
  `id_utilisateur` int NOT NULL,
  `motif` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id_rdv_medical`),
  KEY `fk_rdv_utilisateur` (`id_utilisateur`),
  KEY `fk_rdv_grossesse` (`id_grossesse`),
  KEY `fk_rdv_bebe` (`id_bebe`),
  KEY `fk_rdv_type` (`id_type_rdv`),
  CONSTRAINT `fk_rdv_bebe` FOREIGN KEY (`id_bebe`) REFERENCES `Bebe` (`id_bebe`),
  CONSTRAINT `fk_rdv_grossesse` FOREIGN KEY (`id_grossesse`) REFERENCES `Grossesse` (`id_grossesse`),
  CONSTRAINT `fk_rdv_type` FOREIGN KEY (`id_type_rdv`) REFERENCES `Type_rdv` (`id_type_rdv`),
  CONSTRAINT `fk_rdv_utilisateur` FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur` (`id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rdv_medical`
--

LOCK TABLES `Rdv_medical` WRITE;
/*!40000 ALTER TABLE `Rdv_medical` DISABLE KEYS */;
/*!40000 ALTER TABLE `Rdv_medical` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reponse_Formulaire`
--

DROP TABLE IF EXISTS `Reponse_Formulaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reponse_Formulaire` (
  `id_reponse` int NOT NULL AUTO_INCREMENT,
  `id_formulaire` int NOT NULL,
  `id_utilisateur` int NOT NULL,
  `contenu` json NOT NULL,
  `raison` text NOT NULL,
  PRIMARY KEY (`id_reponse`),
  KEY `fk_reponse_utilisateur` (`id_utilisateur`),
  CONSTRAINT `fk_reponse_utilisateur` FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur` (`id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='json pour le contenu et récupérer le formulaire';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reponse_Formulaire`
--

LOCK TABLES `Reponse_Formulaire` WRITE;
/*!40000 ALTER TABLE `Reponse_Formulaire` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reponse_Formulaire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reponse_quiz`
--

DROP TABLE IF EXISTS `Reponse_quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reponse_quiz` (
  `id_reponse_quiz` int NOT NULL AUTO_INCREMENT,
  `id_quiz` int NOT NULL,
  `reponse` json NOT NULL,
  PRIMARY KEY (`id_reponse_quiz`),
  KEY `fk_reponse_quiz` (`id_quiz`),
  CONSTRAINT `fk_reponse_quiz` FOREIGN KEY (`id_quiz`) REFERENCES `Quiz` (`id_quiz`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='reponse = JSON format';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reponse_quiz`
--

LOCK TABLES `Reponse_quiz` WRITE;
/*!40000 ALTER TABLE `Reponse_quiz` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reponse_quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Todo_List`
--

DROP TABLE IF EXISTS `Todo_List`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Todo_List` (
  `id_todo_list` int NOT NULL AUTO_INCREMENT,
  `id_utilisateur` int NOT NULL,
  `id_liste_categorie` int NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id_todo_list`),
  KEY `fk_utilisateur_todo` (`id_utilisateur`),
  KEY `fk_liste_categorie_todo` (`id_liste_categorie`),
  CONSTRAINT `fk_liste_categorie_todo` FOREIGN KEY (`id_liste_categorie`) REFERENCES `Liste_Categorie` (`id_liste_categorie`),
  CONSTRAINT `fk_utilisateur_todo` FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur` (`id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Todo_List`
--

LOCK TABLES `Todo_List` WRITE;
/*!40000 ALTER TABLE `Todo_List` DISABLE KEYS */;
/*!40000 ALTER TABLE `Todo_List` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Type_rdv`
--

DROP TABLE IF EXISTS `Type_rdv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Type_rdv` (
  `id_type_rdv` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id_type_rdv`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Type_rdv`
--

LOCK TABLES `Type_rdv` WRITE;
/*!40000 ALTER TABLE `Type_rdv` DISABLE KEYS */;
/*!40000 ALTER TABLE `Type_rdv` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date_naissance` datetime NOT NULL,
  `suggested_name` json DEFAULT NULL,
  `point` int NOT NULL DEFAULT '0',
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'1990-01-01 00:00:00',NULL,0,'','','','',''),(2,'1990-01-01 00:00:00',NULL,0,'user','Dupont','Jean','jean.dupont@example.com','$2b$10$SdLzYslxlgR7X6JukQ70GO4Nhl05AEKbqRnLchzK5WnwTqdjymzQi');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Utilisateur`
--

DROP TABLE IF EXISTS `Utilisateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Utilisateur` (
  `id_utilisateur` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `date_naissance` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `role` tinyint(1) NOT NULL,
  `suggested_name` json NOT NULL,
  `point` int NOT NULL,
  PRIMARY KEY (`id_utilisateur`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='suggested_name = faire un json pour stocker les deux tableaux de prénoms';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Utilisateur`
--

LOCK TABLES `Utilisateur` WRITE;
/*!40000 ALTER TABLE `Utilisateur` DISABLE KEYS */;
/*!40000 ALTER TABLE `Utilisateur` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-21 10:20:50
