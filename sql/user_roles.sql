CREATE TABLE
`easy-erp`.`user_roles` (
    `id` INT NOT NULL,
    `role_name` VARCHAR(45) NULL,
    `role_access` LONGTEXT NULL,
    `created_at_utc` datetime DEFAULT NULL,
    `updated_at_utc` datetime DEFAULT NULL,
    `deleted_at_utc` datetime DEFAULT NULL,
    PRIMARY KEY (`id`)
);

ALTER TABLE `easy-erp`.`user_roles` 
CHANGE COLUMN `id` `id` INT NOT NULL AUTO_INCREMENT ;
