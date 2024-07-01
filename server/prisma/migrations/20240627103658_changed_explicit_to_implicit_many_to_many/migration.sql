/*
  Warnings:

  - You are about to drop the `movieactor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `moviecountry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `moviedirector` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `moviegenre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `moviewriter` table. If the table is not empty, all the data it contains will be lost.

*/
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

-- DropTable
DROP TABLE `movieactor`;

-- DropTable
DROP TABLE `moviecountry`;

-- DropTable
DROP TABLE `moviedirector`;

-- DropTable
DROP TABLE `moviegenre`;

-- DropTable
DROP TABLE `moviewriter`;

-- CreateTable
CREATE TABLE `_MovieToWriter` (
    `A` VARCHAR(10) NOT NULL,
    `B` CHAR(36) NOT NULL,

    UNIQUE INDEX `_MovieToWriter_AB_unique`(`A`, `B`),
    INDEX `_MovieToWriter_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CountryToMovie` (
    `A` CHAR(36) NOT NULL,
    `B` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `_CountryToMovie_AB_unique`(`A`, `B`),
    INDEX `_CountryToMovie_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GenreToMovie` (
    `A` CHAR(36) NOT NULL,
    `B` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `_GenreToMovie_AB_unique`(`A`, `B`),
    INDEX `_GenreToMovie_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DirectorToMovie` (
    `A` CHAR(36) NOT NULL,
    `B` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `_DirectorToMovie_AB_unique`(`A`, `B`),
    INDEX `_DirectorToMovie_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ActorToMovie` (
    `A` CHAR(36) NOT NULL,
    `B` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `_ActorToMovie_AB_unique`(`A`, `B`),
    INDEX `_ActorToMovie_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_MovieToWriter` ADD CONSTRAINT `_MovieToWriter_A_fkey` FOREIGN KEY (`A`) REFERENCES `Movie`(`movieId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MovieToWriter` ADD CONSTRAINT `_MovieToWriter_B_fkey` FOREIGN KEY (`B`) REFERENCES `Writer`(`writerId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CountryToMovie` ADD CONSTRAINT `_CountryToMovie_A_fkey` FOREIGN KEY (`A`) REFERENCES `Country`(`countryId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CountryToMovie` ADD CONSTRAINT `_CountryToMovie_B_fkey` FOREIGN KEY (`B`) REFERENCES `Movie`(`movieId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GenreToMovie` ADD CONSTRAINT `_GenreToMovie_A_fkey` FOREIGN KEY (`A`) REFERENCES `Genre`(`genreId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GenreToMovie` ADD CONSTRAINT `_GenreToMovie_B_fkey` FOREIGN KEY (`B`) REFERENCES `Movie`(`movieId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DirectorToMovie` ADD CONSTRAINT `_DirectorToMovie_A_fkey` FOREIGN KEY (`A`) REFERENCES `Director`(`directorId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DirectorToMovie` ADD CONSTRAINT `_DirectorToMovie_B_fkey` FOREIGN KEY (`B`) REFERENCES `Movie`(`movieId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ActorToMovie` ADD CONSTRAINT `_ActorToMovie_A_fkey` FOREIGN KEY (`A`) REFERENCES `Actor`(`actorId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ActorToMovie` ADD CONSTRAINT `_ActorToMovie_B_fkey` FOREIGN KEY (`B`) REFERENCES `Movie`(`movieId`) ON DELETE CASCADE ON UPDATE CASCADE;
