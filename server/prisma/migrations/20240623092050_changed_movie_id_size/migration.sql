/*
  Warnings:

  - The primary key for the `movie` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `movieactor` DROP FOREIGN KEY `MovieActor_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `moviecountry` DROP FOREIGN KEY `MovieCountry_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `moviedirector` DROP FOREIGN KEY `MovieDirector_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `moviegenre` DROP FOREIGN KEY `MovieGenre_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `moviewriter` DROP FOREIGN KEY `MovieWriter_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `watchlist` DROP FOREIGN KEY `Watchlist_movieId_fkey`;

-- AlterTable
ALTER TABLE `movie` DROP PRIMARY KEY,
    MODIFY `movieId` VARCHAR(10) NOT NULL,
    ADD PRIMARY KEY (`movieId`);

-- AlterTable
ALTER TABLE `movieactor` MODIFY `movieId` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `moviecountry` MODIFY `movieId` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `moviedirector` MODIFY `movieId` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `moviegenre` MODIFY `movieId` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `moviewriter` MODIFY `movieId` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `review` MODIFY `movieId` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `watchlist` MODIFY `movieId` VARCHAR(10) NOT NULL;

-- AddForeignKey
ALTER TABLE `MovieCountry` ADD CONSTRAINT `MovieCountry_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`movieId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieGenre` ADD CONSTRAINT `MovieGenre_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`movieId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieDirector` ADD CONSTRAINT `MovieDirector_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`movieId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieWriter` ADD CONSTRAINT `MovieWriter_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`movieId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieActor` ADD CONSTRAINT `MovieActor_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`movieId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Watchlist` ADD CONSTRAINT `Watchlist_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`movieId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`movieId`) ON DELETE RESTRICT ON UPDATE CASCADE;
