CREATE TABLE `erp-microservices-auth`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NULL,
  `password` VARCHAR(100) NULL,
  `firstname` VARCHAR(100) NULL,
  `lastname` VARCHAR(100) NULL,
  `created_at_utc` DATETIME NULL,
  `updated_at_utc` DATETIME NULL,
  `deleted_at_utc` DATETIME NULL,
  `role_id` INT NULL,
  PRIMARY KEY (`id`));


