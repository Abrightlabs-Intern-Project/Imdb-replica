-- DropForeignKey
ALTER TABLE `movieactor` DROP FOREIGN KEY `MovieActor_actorId_fkey`;

-- DropForeignKey
ALTER TABLE `movieactor` DROP FOREIGN KEY `MovieActor_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `moviecountry` DROP FOREIGN KEY `MovieCountry_countryId_fkey`;

-- DropForeignKey
ALTER TABLE `moviecountry` DROP FOREIGN KEY `MovieCountry_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `moviedirector` DROP FOREIGN KEY `MovieDirector_directorId_fkey`;

-- DropForeignKey
ALTER TABLE `moviedirector` DROP FOREIGN KEY `MovieDirector_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `moviegenre` DROP FOREIGN KEY `MovieGenre_genreId_fkey`;

-- DropForeignKey
ALTER TABLE `moviegenre` DROP FOREIGN KEY `MovieGenre_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `moviewriter` DROP FOREIGN KEY `MovieWriter_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `moviewriter` DROP FOREIGN KEY `MovieWriter_writerId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_userId_fkey`;

-- DropForeignKey
ALTER TABLE `watchlist` DROP FOREIGN KEY `Watchlist_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `watchlist` DROP FOREIGN KEY `Watchlist_userId_fkey`;

-- AlterTable
ALTER TABLE `actor` MODIFY `imageUrl` TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE `MovieCountry` ADD CONSTRAINT `MovieCountry_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`movieId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieCountry` ADD CONSTRAINT `MovieCountry_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`countryId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieGenre` ADD CONSTRAINT `MovieGenre_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`movieId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieGenre` ADD CONSTRAINT `MovieGenre_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `Genre`(`genreId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieDirector` ADD CONSTRAINT `MovieDirector_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`movieId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieDirector` ADD CONSTRAINT `MovieDirector_directorId_fkey` FOREIGN KEY (`directorId`) REFERENCES `Director`(`directorId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieWriter` ADD CONSTRAINT `MovieWriter_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`movieId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieWriter` ADD CONSTRAINT `MovieWriter_writerId_fkey` FOREIGN KEY (`writerId`) REFERENCES `Writer`(`writerId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieActor` ADD CONSTRAINT `MovieActor_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`movieId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieActor` ADD CONSTRAINT `MovieActor_actorId_fkey` FOREIGN KEY (`actorId`) REFERENCES `Actor`(`actorId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Watchlist` ADD CONSTRAINT `Watchlist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Watchlist` ADD CONSTRAINT `Watchlist_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`movieId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`movieId`) ON DELETE CASCADE ON UPDATE CASCADE;
