-- CreateTable
CREATE TABLE `feladatok` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kerdes` VARCHAR(191) NOT NULL,
    `valasz` VARCHAR(191) NOT NULL,
    `tipus` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feladatokListeningAudio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valasz` VARCHAR(191) NOT NULL,
    `audio` BLOB NOT NULL,
    `tipus` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `feladatokListeningAudio_valasz_key`(`valasz`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feladatokPair` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `magyar_par` VARCHAR(191) NOT NULL,
    `angol_par` VARCHAR(191) NOT NULL,
    `tipus` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `feladatokPair_magyar_par_key`(`magyar_par`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feladatokPairPictures` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191) NOT NULL,
    `image` BLOB NOT NULL,
    `tipus` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `feladatokPairPictures_text_key`(`text`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `birth_date` DATETIME(3) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `user_level` INTEGER NOT NULL DEFAULT 1,
    `user_current_progress` INTEGER NOT NULL DEFAULT 0,
    `isAdmin` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `user_username_key`(`username`),
    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
