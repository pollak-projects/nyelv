-- CreateTable
CREATE TABLE `feladatokPair` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `magyar_par` VARCHAR(191) NOT NULL,
    `angol_par` VARCHAR(191) NOT NULL,
    `tipus` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
