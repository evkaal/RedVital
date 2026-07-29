-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: red_vital
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `cat_estatus_ordenes`
--

DROP TABLE IF EXISTS `cat_estatus_ordenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat_estatus_ordenes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat_estatus_ordenes`
--

LOCK TABLES `cat_estatus_ordenes` WRITE;
/*!40000 ALTER TABLE `cat_estatus_ordenes` DISABLE KEYS */;
INSERT INTO `cat_estatus_ordenes` VALUES (1,'Pendiente'),(2,'En Proceso'),(3,'Completada'),(4,'Cancelada');
/*!40000 ALTER TABLE `cat_estatus_ordenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat_estatus_unidades`
--

DROP TABLE IF EXISTS `cat_estatus_unidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat_estatus_unidades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat_estatus_unidades`
--

LOCK TABLES `cat_estatus_unidades` WRITE;
/*!40000 ALTER TABLE `cat_estatus_unidades` DISABLE KEYS */;
INSERT INTO `cat_estatus_unidades` VALUES (1,'Disponible'),(2,'Asignada'),(3,'Caducada'),(4,'Utilizada');
/*!40000 ALTER TABLE `cat_estatus_unidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_notificaciones`
--

DROP TABLE IF EXISTS `historial_notificaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial_notificaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orden_id` int DEFAULT NULL,
  `tipo_canal` varchar(50) DEFAULT NULL,
  `mensaje` text,
  `fecha_envio` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `leido` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `orden_id` (`orden_id`),
  CONSTRAINT `historial_notificaciones_ibfk_1` FOREIGN KEY (`orden_id`) REFERENCES `ordenes_solicitud` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_notificaciones`
--

LOCK TABLES `historial_notificaciones` WRITE;
/*!40000 ALTER TABLE `historial_notificaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `historial_notificaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hospitales`
--

DROP TABLE IF EXISTS `hospitales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hospitales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `ciudad` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `contacto_email` varchar(100) DEFAULT NULL,
  `estatus_activo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospitales`
--

LOCK TABLES `hospitales` WRITE;
/*!40000 ALTER TABLE `hospitales` DISABLE KEYS */;
INSERT INTO `hospitales` VALUES (1,'Hospital Central','Av. Reforma 123','Oaxaca','9511234567','contacto@hcentral.gob',1),(2,'Clínica Regional Norte','Calle 5 de Mayo 45','Oaxaca','9517654321','info@crnorte.gob',1);
/*!40000 ALTER TABLE `hospitales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orden_detalle`
--

DROP TABLE IF EXISTS `orden_detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orden_detalle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orden_id` int DEFAULT NULL,
  `unidad_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orden_id` (`orden_id`),
  KEY `unidad_id` (`unidad_id`),
  CONSTRAINT `orden_detalle_ibfk_1` FOREIGN KEY (`orden_id`) REFERENCES `ordenes_solicitud` (`id`),
  CONSTRAINT `orden_detalle_ibfk_2` FOREIGN KEY (`unidad_id`) REFERENCES `unidades_sangre` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orden_detalle`
--

LOCK TABLES `orden_detalle` WRITE;
/*!40000 ALTER TABLE `orden_detalle` DISABLE KEYS */;
/*!40000 ALTER TABLE `orden_detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordenes_solicitud`
--

DROP TABLE IF EXISTS `ordenes_solicitud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordenes_solicitud` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hospital_solicitante_id` int DEFAULT NULL,
  `usuario_solicitante_id` int DEFAULT NULL,
  `fecha_solicitud` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `urgencia_nivel` int DEFAULT NULL,
  `estatus_orden_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `hospital_solicitante_id` (`hospital_solicitante_id`),
  KEY `usuario_solicitante_id` (`usuario_solicitante_id`),
  KEY `estatus_orden_id` (`estatus_orden_id`),
  CONSTRAINT `ordenes_solicitud_ibfk_1` FOREIGN KEY (`hospital_solicitante_id`) REFERENCES `hospitales` (`id`),
  CONSTRAINT `ordenes_solicitud_ibfk_2` FOREIGN KEY (`usuario_solicitante_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `ordenes_solicitud_ibfk_3` FOREIGN KEY (`estatus_orden_id`) REFERENCES `cat_estatus_ordenes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordenes_solicitud`
--

LOCK TABLES `ordenes_solicitud` WRITE;
/*!40000 ALTER TABLE `ordenes_solicitud` DISABLE KEYS */;
INSERT INTO `ordenes_solicitud` VALUES (1,2,2,'2026-07-29 02:55:19',3,1);
/*!40000 ALTER TABLE `ordenes_solicitud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrador','Acceso total al sistema'),(2,'Gestor','Gestión de inventario y solicitudes'),(3,'Medico','Solicitud de unidades');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_sangre`
--

DROP TABLE IF EXISTS `tipos_sangre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_sangre` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(5) NOT NULL,
  `factor_rh` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_sangre`
--

LOCK TABLES `tipos_sangre` WRITE;
/*!40000 ALTER TABLE `tipos_sangre` DISABLE KEYS */;
INSERT INTO `tipos_sangre` VALUES (1,'O','+'),(2,'O','-'),(3,'A','+'),(4,'A','-'),(5,'B','+'),(6,'B','-'),(7,'AB','+'),(8,'AB','-');
/*!40000 ALTER TABLE `tipos_sangre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidades_sangre`
--

DROP TABLE IF EXISTS `unidades_sangre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidades_sangre` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo_sangre_id` int DEFAULT NULL,
  `hospital_origen_id` int DEFAULT NULL,
  `fecha_extraccion` timestamp NULL DEFAULT NULL,
  `fecha_caducidad` timestamp NULL DEFAULT NULL,
  `estatus_unidad_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tipo_sangre_id` (`tipo_sangre_id`),
  KEY `hospital_origen_id` (`hospital_origen_id`),
  KEY `estatus_unidad_id` (`estatus_unidad_id`),
  CONSTRAINT `unidades_sangre_ibfk_1` FOREIGN KEY (`tipo_sangre_id`) REFERENCES `tipos_sangre` (`id`),
  CONSTRAINT `unidades_sangre_ibfk_2` FOREIGN KEY (`hospital_origen_id`) REFERENCES `hospitales` (`id`),
  CONSTRAINT `unidades_sangre_ibfk_3` FOREIGN KEY (`estatus_unidad_id`) REFERENCES `cat_estatus_unidades` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidades_sangre`
--

LOCK TABLES `unidades_sangre` WRITE;
/*!40000 ALTER TABLE `unidades_sangre` DISABLE KEYS */;
INSERT INTO `unidades_sangre` VALUES (1,1,1,'2026-07-29 02:55:19','2026-08-28 02:55:19',1),(2,3,1,'2026-07-29 02:55:19','2026-08-28 02:55:19',1),(3,2,2,'2026-07-29 02:55:19','2026-08-03 02:55:19',1);
/*!40000 ALTER TABLE `unidades_sangre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol_id` int DEFAULT NULL,
  `hospital_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `rol_id` (`rol_id`),
  KEY `hospital_id` (`hospital_id`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`hospital_id`) REFERENCES `hospitales` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Mónica Alcántara','monica@redvital.com','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',1,1),(2,'Juan Pérez','juan@gestor.com','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',2,1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'red_vital'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-28 22:15:55
