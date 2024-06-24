-- CreateTable
CREATE TABLE `Movie` (
    `movieId` CHAR(9) NOT NULL,
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
CREATE TABLE `MovieCountry` (
    `movieId` CHAR(9) NOT NULL,
    `countryId` CHAR(36) NOT NULL,

    UNIQUE INDEX `MovieCountry_movieId_countryId_key`(`movieId`, `countryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genre` (
    `genreId` CHAR(36) NOT NULL,
    `genreName` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `Genre_genreName_key`(`genreName`),
    PRIMARY KEY (`genreId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MovieGenre` (
    `movieId` CHAR(9) NOT NULL,
    `genreId` CHAR(36) NOT NULL,

    UNIQUE INDEX `MovieGenre_movieId_genreId_key`(`movieId`, `genreId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Director` (
    `directorId` CHAR(36) NOT NULL,
    `directorName` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `Director_directorName_key`(`directorName`),
    PRIMARY KEY (`directorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MovieDirector` (
    `movieId` CHAR(9) NOT NULL,
    `directorId` CHAR(36) NOT NULL,

    UNIQUE INDEX `MovieDirector_movieId_directorId_key`(`movieId`, `directorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Writer` (
    `writerId` CHAR(36) NOT NULL,
    `writerName` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `Writer_writerName_key`(`writerName`),
    PRIMARY KEY (`writerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MovieWriter` (
    `movieId` CHAR(9) NOT NULL,
    `writerId` CHAR(36) NOT NULL,

    UNIQUE INDEX `MovieWriter_movieId_writerId_key`(`movieId`, `writerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Actor` (
    `actorId` CHAR(36) NOT NULL,
    `actorName` VARCHAR(50) NOT NULL,
    `imageUrl` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Actor_actorName_key`(`actorName`),
    PRIMARY KEY (`actorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MovieActor` (
    `movieId` CHAR(9) NOT NULL,
    `actorId` CHAR(36) NOT NULL,

    UNIQUE INDEX `MovieActor_movieId_actorId_key`(`movieId`, `actorId`)
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
    `movieId` CHAR(9) NOT NULL,

    UNIQUE INDEX `Watchlist_userId_movieId_key`(`userId`, `movieId`),
    PRIMARY KEY (`watchlistId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `reviewId` CHAR(36) NOT NULL,
    `userId` CHAR(36) NOT NULL,
    `movieId` CHAR(9) NOT NULL,
    `rating` VARCHAR(5) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Review_userId_key`(`userId`),
    UNIQUE INDEX `Review_userId_movieId_key`(`userId`, `movieId`),
    PRIMARY KEY (`reviewId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MovieCountry` ADD CONSTRAINT `MovieCountry_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`movieId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieCountry` ADD CONSTRAINT `MovieCountry_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`countryId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieGenre` ADD CONSTRAINT `MovieGenre_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`movieId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieGenre` ADD CONSTRAINT `MovieGenre_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `Genre`(`genreId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieDirector` ADD CONSTRAINT `MovieDirector_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`movieId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieDirector` ADD CONSTRAINT `MovieDirector_directorId_fkey` FOREIGN KEY (`directorId`) REFERENCES `Director`(`directorId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieWriter` ADD CONSTRAINT `MovieWriter_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`movieId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieWriter` ADD CONSTRAINT `MovieWriter_writerId_fkey` FOREIGN KEY (`writerId`) REFERENCES `Writer`(`writerId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieActor` ADD CONSTRAINT `MovieActor_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`movieId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieActor` ADD CONSTRAINT `MovieActor_actorId_fkey` FOREIGN KEY (`actorId`) REFERENCES `Actor`(`actorId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_favouriteGenreId_fkey` FOREIGN KEY (`favouriteGenreId`) REFERENCES `Genre`(`genreId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Watchlist` ADD CONSTRAINT `Watchlist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Watchlist` ADD CONSTRAINT `Watchlist_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`movieId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`movieId`) ON DELETE RESTRICT ON UPDATE CASCADE;
