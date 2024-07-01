-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_userId_fkey`;

-- CreateTable
CREATE TABLE `_MovieToReview` (
    `A` VARCHAR(10) NOT NULL,
    `B` CHAR(36) NOT NULL,

    UNIQUE INDEX `_MovieToReview_AB_unique`(`A`, `B`),
    INDEX `_MovieToReview_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ReviewToUser` (
    `A` CHAR(36) NOT NULL,
    `B` CHAR(36) NOT NULL,

    UNIQUE INDEX `_ReviewToUser_AB_unique`(`A`, `B`),
    INDEX `_ReviewToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_MovieToReview` ADD CONSTRAINT `_MovieToReview_A_fkey` FOREIGN KEY (`A`) REFERENCES `Movie`(`movieId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MovieToReview` ADD CONSTRAINT `_MovieToReview_B_fkey` FOREIGN KEY (`B`) REFERENCES `Review`(`reviewId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ReviewToUser` ADD CONSTRAINT `_ReviewToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Review`(`reviewId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ReviewToUser` ADD CONSTRAINT `_ReviewToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
