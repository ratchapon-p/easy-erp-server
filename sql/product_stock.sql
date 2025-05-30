CREATE TABLE `product_stock` (
    `id` int NOT NULL AUTO_INCREMENT,
    `product_id` int DEFAULT NULL,
    `item_per_barcode` int DEFAULT NULL,
    `receive_by` int DEFAULT NULL,
    `scan_by` int DEFAULT NULL,
    `updated_by` int DEFAULT NULL,
    `received_at_utc` datetime DEFAULT NULL,
    `send_at_utc` datetime DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  