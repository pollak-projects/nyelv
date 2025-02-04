/*
  Warnings:

  - You are about to drop the `apikey` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `isAdmin` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `apikey` DROP FOREIGN KEY `apikey_user_id_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `isAdmin` INTEGER NOT NULL;

-- DropTable
DROP TABLE `apikey`;
