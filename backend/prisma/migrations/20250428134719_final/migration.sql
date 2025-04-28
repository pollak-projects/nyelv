/*
  Warnings:

  - You are about to drop the `gamewords` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `feladatok` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `gamewords`;

-- CreateTable
CREATE TABLE `chatmessages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `flag` INTEGER NOT NULL DEFAULT 0,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feladatoklisteningaudio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valasz` VARCHAR(191) NOT NULL,
    `audio` LONGBLOB NOT NULL,
    `tipus` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feladatokpair` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `magyar_par` VARCHAR(191) NOT NULL,
    `angol_par` VARCHAR(191) NOT NULL,
    `tipus` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feladatokpairpictures` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191) NOT NULL,
    `image` LONGBLOB NOT NULL,
    `tipus` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
