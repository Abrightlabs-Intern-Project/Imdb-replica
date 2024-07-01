/*
  Warnings:

  - The primary key for the `movie` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `_actortomovie` DROP FOREIGN KEY `_ActorToMovie_B_fkey`;

-- DropForeignKey
ALTER TABLE `_countrytomovie` DROP FOREIGN KEY `_CountryToMovie_B_fkey`;

-- DropForeignKey
ALTER TABLE `_directortomovie` DROP FOREIGN KEY `_DirectorToMovie_B_fkey`;

-- DropForeignKey
ALTER TABLE `_genretomovie` DROP FOREIGN KEY `_GenreToMovie_B_fkey`;

-- DropForeignKey
ALTER TABLE `_movietowriter` DROP FOREIGN KEY `_MovieToWriter_A_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `watchlist` DROP FOREIGN KEY `Watchlist_movieId_fkey`;

-- AlterTable
ALTER TABLE `_actortomovie` MODIFY `B` CHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `_countrytomovie` MODIFY `B` CHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `_directortomovie` MODIFY `B` CHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `_genretomovie` MODIFY `B` CHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `_movietowriter` MODIFY `A` CHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `movie` DROP PRIMARY KEY,
    MODIFY `movieId` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`movieId`);

-- AlterTable
ALTER TABLE `review` MODIFY `movieId` CHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `watchlist` MODIFY `movieId` CHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE `Watchlist` ADD CONSTRAINT `Watchlist_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`movieId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`movieId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MovieToWriter` ADD CONSTRAINT `_MovieToWriter_A_fkey` FOREIGN KEY (`A`) REFERENCES `Movie`(`movieId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CountryToMovie` ADD CONSTRAINT `_CountryToMovie_B_fkey` FOREIGN KEY (`B`) REFERENCES `Movie`(`movieId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GenreToMovie` ADD CONSTRAINT `_GenreToMovie_B_fkey` FOREIGN KEY (`B`) REFERENCES `Movie`(`movieId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DirectorToMovie` ADD CONSTRAINT `_DirectorToMovie_B_fkey` FOREIGN KEY (`B`) REFERENCES `Movie`(`movieId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ActorToMovie` ADD CONSTRAINT `_ActorToMovie_B_fkey` FOREIGN KEY (`B`) REFERENCES `Movie`(`movieId`) ON DELETE CASCADE ON UPDATE CASCADE;
