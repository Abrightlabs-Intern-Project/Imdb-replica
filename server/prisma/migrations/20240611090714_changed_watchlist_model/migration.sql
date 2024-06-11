/*
  Warnings:

  - Added the required column `ratings` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `watchlist` DROP FOREIGN KEY `Watchlist_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `watchlist` DROP FOREIGN KEY `Watchlist_userId_fkey`;

-- AlterTable
ALTER TABLE `movie` ADD COLUMN `ratings` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `watchlist` MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `movieId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Watchlist` ADD CONSTRAINT `Watchlist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Watchlist` ADD CONSTRAINT `Watchlist_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`imdbID`) ON DELETE RESTRICT ON UPDATE CASCADE;
