-- CreateTable
CREATE TABLE `feladatok` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kerdes` VARCHAR(191) NOT NULL,
    `valasz` VARCHAR(191) NOT NULL,
    `tipus` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
