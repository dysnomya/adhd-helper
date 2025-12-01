CREATE TABLE IF NOT EXISTS `users`(
    `id` VARCHAR(256) PRIMARY KEY,
    `name` VARCHAR(256) NOT NULL,
    `email` VARCHAR(256) NOT NULL
);

CREATE TABLE IF NOT EXISTS `categories`(
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `user_id` VARCHAR(256) NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
    `name` VARCHAR(50) NOT NULL,
    `color` VARCHAR(7) NULL
);

CREATE TABLE IF NOT EXISTS `tasks`(
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `user_id` VARCHAR(256) NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
    `category_id` BIGINT NULL REFERENCES `categories`(`id`) ON DELETE SET NULL,
    `parent_id` BIGINT NULL REFERENCES `tasks`(`id`) ON DELETE SET NULL,
    `name` VARCHAR(256) NOT NULL,
    `day` DATE NOT NULL,
    `priority` VARCHAR(20) NULL,
    `time_needed` INTEGER NULL,
    `exp_amount` INTEGER NULL,
    `completed` BIT(1) NOT NULL DEFAULT 0
);