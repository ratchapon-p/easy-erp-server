CREATE TABLE `products` (
    `id` int NOT NULL AUTO_INCREMENT,
    `attribute_1` varchar(100) DEFAULT NULL,
    `attribute_2` varchar(100) DEFAULT NULL,
    `attribute_3` varchar(100) DEFAULT NULL,
    `attribute_4` varchar(100) DEFAULT NULL,
    `custom_barcode` varchar(100) DEFAULT NULL,
    `total` int DEFAULT NULL,
    `updated_by` int DEFAULT NULL,
    `created_at_utc` datetime DEFAULT NULL,
    `updated_at_utc` datetime DEFAULT NULL,
    `deleted_at_utc` datetime DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  