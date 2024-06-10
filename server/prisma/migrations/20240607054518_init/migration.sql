-- CreateTable
CREATE TABLE `Movie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `rated` VARCHAR(191) NOT NULL,
    `released` VARCHAR(191) NOT NULL,
    `runtime` VARCHAR(191) NOT NULL,
    `genre` VARCHAR(191) NOT NULL,
    `director` VARCHAR(191) NOT NULL,
    `writer` VARCHAR(191) NOT NULL,
    `actors` VARCHAR(191) NOT NULL,
    `plot` VARCHAR(191) NOT NULL,
    `language` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `awards` VARCHAR(191) NOT NULL,
    `poster` VARCHAR(191) NOT NULL,
    `metascore` VARCHAR(191) NOT NULL,
    `imdbRating` VARCHAR(191) NOT NULL,
    `imdbVotes` VARCHAR(191) NOT NULL,
    `imdbID` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `dvd` VARCHAR(191) NOT NULL,
    `boxOffice` VARCHAR(191) NOT NULL,
    `production` VARCHAR(191) NOT NULL,
    `website` VARCHAR(191) NOT NULL,
    `response` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Movie_imdbID_key`(`imdbID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
