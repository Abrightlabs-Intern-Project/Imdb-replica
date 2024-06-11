/*
  Warnings:

  - You are about to drop the column `movieId` on the `watchlist` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `watchlist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userEmail,imdbID]` on the table `Watchlist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imdbID` to the `Watchlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Watchlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `watchlist` DROP FOREIGN KEY `Watchlist_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `watchlist` DROP FOREIGN KEY `Watchlist_userId_fkey`;

-- DropIndex
DROP INDEX `Watchlist_userId_movieId_key` ON `watchlist`;

-- AlterTable
ALTER TABLE `watchlist` DROP COLUMN `movieId`,
    DROP COLUMN `userId`,
    ADD COLUMN `imdbID` VARCHAR(191) NOT NULL,
    ADD COLUMN `userEmail` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Watchlist_userEmail_imdbID_key` ON `Watchlist`(`userEmail`, `imdbID`);

-- AddForeignKey
ALTER TABLE `Watchlist` ADD CONSTRAINT `Watchlist_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Watchlist` ADD CONSTRAINT `Watchlist_imdbID_fkey` FOREIGN KEY (`imdbID`) REFERENCES `Movie`(`imdbID`) ON DELETE RESTRICT ON UPDATE CASCADE;
