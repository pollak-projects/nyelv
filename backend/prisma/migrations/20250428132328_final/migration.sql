/*
  Warnings:

  - The primary key for the `feladatok` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `isAdmin` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `chatmessages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `feladatoklisteningaudio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `feladatokpair` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `feladatokpairpictures` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `chatmessages` DROP FOREIGN KEY `chatMessages_userId_fkey`;

-- DropIndex
DROP INDEX `user_email_key` ON `user`;

-- DropIndex
DROP INDEX `user_username_key` ON `user`;

-- AlterTable
ALTER TABLE `feladatok` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `isAdmin`,
    ADD COLUMN `user_role` VARCHAR(10) NOT NULL DEFAULT 'user';

-- DropTable
DROP TABLE `chatmessages`;

-- DropTable
DROP TABLE `feladatoklisteningaudio`;

-- DropTable
DROP TABLE `feladatokpair`;

-- DropTable
DROP TABLE `feladatokpairpictures`;

-- CreateTable
CREATE TABLE `gamewords` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `word` VARCHAR(5) NOT NULL,
    `used_date` DATE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dailywords` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `word` VARCHAR(100) NOT NULL,
    `date` DATE NOT NULL,

    UNIQUE INDEX `date`(`date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
