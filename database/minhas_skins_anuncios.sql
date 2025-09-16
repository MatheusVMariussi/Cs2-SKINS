CREATE DATABASE  IF NOT EXISTS `minhas_skins` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `minhas_skins`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: minhas_skins
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `anuncios`
--

DROP TABLE IF EXISTS `anuncios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anuncios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome_skin` varchar(100) NOT NULL,
  `arma` varchar(50) NOT NULL,
  `raridade` varchar(30) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `floatSkin` decimal(5,4) NOT NULL,
  `descricao` text,
  `imagem_url` varchar(255) NOT NULL,
  `vendedor` varchar(100) NOT NULL,
  `data_anuncio` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anuncios`
--

LOCK TABLES `anuncios` WRITE;
/*!40000 ALTER TABLE `anuncios` DISABLE KEYS */;
INSERT INTO `anuncios` VALUES (1,'Dragon Lore','AWP','Covert',9999.99,0.0123,'Uma das skins mais cobiçadas de CS. Estado de fábrica nova com float muito baixo.','https://www.csgodatabase.com/images/skins/webp/AWP_Dragon_Lore.webp','Trader_CS','2025-06-06 17:57:18'),(2,'Asiimov','AWP','Covert',349.50,0.2134,'Clássica e elegante. Condição testada em campo.','https://www.csgodatabase.com/images/skins/webp/AWP_Asiimov.webp','SkinsCollector','2025-06-06 17:57:18'),(3,'Fade','Karambit','Covert',5500.00,0.0087,'Padrão fade com alto percentual de rosa e amarelo. Estado de fábrica nova.','https://www.csgodatabase.com/images/knives/webp/Karambit_Fade.webp','KnifeDealer','2025-06-06 17:57:18'),(4,'Hyper Beast','M4A1-S','Covert',120.75,0.1456,'Design colorido e vibrante. Pouco desgaste, condição testada em campo.','https://www.csgodatabase.com/images/skins/webp/M4A1-S_Hyper_Beast.webp','M4_Fan','2025-06-06 17:57:18'),(5,'Neo-Noir','USP-S','Classified',85.90,0.0723,'Design artístico em estilo noir. Estado de fábrica nova.','https://www.csgodatabase.com/images/skins/webp/USP-S_Neo-Noir.webp','PistolKing','2025-06-06 17:57:18'),(6,'Vulcan','AK-47','Classified',285.25,0.0945,'Design futurista em azul e branco. Mínimo desgaste.','https://www.csgodatabase.com/images/skins/webp/AK-47_Vulcan.webp','AK_Master','2025-06-06 17:57:18'),(7,'Printstream','Desert Eagle','Covert',215.50,0.0356,'Skin premium com acabamento em preto e branco. Estado de fábrica nova.','https://www.csgodatabase.com/images/skins/webp/Desert_Eagle_Printstream.webp','Deagle_Expert','2025-06-06 17:57:18'),(8,'Gamma Doppler','Glock-18','Restricted',95.20,0.0078,'Rara skin com coloração verde esmeralda brilhante. Estado de fábrica nova com float muito baixo.','https://www.csgodatabase.com/images/skins/webp/Glock-18_Gamma_Doppler.webp','GlockFanatic','2025-06-06 17:57:18');
/*!40000 ALTER TABLE `anuncios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-06 17:41:13
