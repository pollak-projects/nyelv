-- AlterTable
ALTER TABLE `feladatokpairpictures` MODIFY `image` LONGBLOB NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `user_level` VARCHAR(191) NOT NULL DEFAULT 'beginner';
