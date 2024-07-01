/*
  Warnings:

  - You are about to drop the `_movietoreview` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_reviewtouser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_movietoreview` DROP FOREIGN KEY `_MovieToReview_A_fkey`;

-- DropForeignKey
ALTER TABLE `_movietoreview` DROP FOREIGN KEY `_MovieToReview_B_fkey`;

-- DropForeignKey
ALTER TABLE `_reviewtouser` DROP FOREIGN KEY `_ReviewToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_reviewtouser` DROP FOREIGN KEY `_ReviewToUser_B_fkey`;

-- DropIndex
DROP INDEX `Review_movieId_fkey` ON `review`;

-- DropIndex
DROP INDEX `Review_userId_key` ON `review`;

-- DropTable
DROP TABLE `_movietoreview`;

-- DropTable
DROP TABLE `_reviewtouser`;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`movieId`) ON DELETE CASCADE ON UPDATE CASCADE;
