-- CreateTable
CREATE TABLE `Movie` (
    `movieId` CHAR(36) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `year` VARCHAR(4) NOT NULL,
    `rated` VARCHAR(10) NOT NULL,
    `released` VARCHAR(20) NOT NULL,
    `runtime` VARCHAR(10) NOT NULL,
    `plot` TEXT NOT NULL,
    `language` VARCHAR(150) NOT NULL,
    `awards` VARCHAR(255) NOT NULL,
    `poster` VARCHAR(255) NOT NULL,
    `trailer` VARCHAR(255) NOT NULL,
    `metascore` VARCHAR(5) NOT NULL,
    `rating` VARCHAR(5) NOT NULL,
    `votes` VARCHAR(15) NOT NULL,
    `boxOffice` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`movieId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Country` (
    `countryId` CHAR(36) NOT NULL,
    `countryName` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `Country_countryName_key`(`countryName`),
    PRIMARY KEY (`countryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genre` (
    `genreId` CHAR(36) NOT NULL,
    `genreName` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `Genre_genreName_key`(`genreName`),
    PRIMARY KEY (`genreId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Director` (
    `directorId` CHAR(36) NOT NULL,
    `directorName` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `Director_directorName_key`(`directorName`),
    PRIMARY KEY (`directorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Writer` (
    `writerId` CHAR(36) NOT NULL,
    `writerName` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `Writer_writerName_key`(`writerName`),
    PRIMARY KEY (`writerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Actor` (
    `actorId` CHAR(36) NOT NULL,
    `actorName` VARCHAR(50) NOT NULL,
    `imageUrl` TEXT NOT NULL,

    UNIQUE INDEX `Actor_actorName_key`(`actorName`),
    PRIMARY KEY (`actorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `userId` CHAR(36) NOT NULL,
    `userName` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `favouriteGenreId` CHAR(36) NULL,

    UNIQUE INDEX `User_userName_key`(`userName`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Watchlist` (
    `watchlistId` CHAR(36) NOT NULL,
    `userId` CHAR(36) NOT NULL,
    `movieId` CHAR(36) NOT NULL,

    UNIQUE INDEX `Watchlist_userId_movieId_key`(`userId`, `movieId`),
    PRIMARY KEY (`watchlistId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `reviewId` CHAR(36) NOT NULL,
    `rating` VARCHAR(5) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` CHAR(36) NOT NULL,
    `movieId` CHAR(36) NOT NULL,

    UNIQUE INDEX `Review_userId_movieId_key`(`userId`, `movieId`),
    PRIMARY KEY (`reviewId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MovieToWriter` (
    `A` CHAR(36) NOT NULL,
    `B` CHAR(36) NOT NULL,

    UNIQUE INDEX `_MovieToWriter_AB_unique`(`A`, `B`),
    INDEX `_MovieToWriter_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CountryToMovie` (
    `A` CHAR(36) NOT NULL,
    `B` CHAR(36) NOT NULL,

    UNIQUE INDEX `_CountryToMovie_AB_unique`(`A`, `B`),
    INDEX `_CountryToMovie_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GenreToMovie` (
    `A` CHAR(36) NOT NULL,
    `B` CHAR(36) NOT NULL,

    UNIQUE INDEX `_GenreToMovie_AB_unique`(`A`, `B`),
    INDEX `_GenreToMovie_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DirectorToMovie` (
    `A` CHAR(36) NOT NULL,
    `B` CHAR(36) NOT NULL,

    UNIQUE INDEX `_DirectorToMovie_AB_unique`(`A`, `B`),
    INDEX `_DirectorToMovie_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ActorToMovie` (
    `A` CHAR(36) NOT NULL,
    `B` CHAR(36) NOT NULL,

    UNIQUE INDEX `_ActorToMovie_AB_unique`(`A`, `B`),
    INDEX `_ActorToMovie_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_favouriteGenreId_fkey` FOREIGN KEY (`favouriteGenreId`) REFERENCES `Genre`(`genreId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Watchlist` ADD CONSTRAINT `Watchlist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Watchlist` ADD CONSTRAINT `Watchlist_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`movieId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`movieId`) ON DELETE CASCADE ON UPDATE CASCADE;

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
