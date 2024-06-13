/*
  Warnings:

  - A unique constraint covering the columns `[userEmail,imdbID]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Review_userEmail_imdbID_key` ON `Review`(`userEmail`, `imdbID`);
