/*
  Warnings:

  - A unique constraint covering the columns `[actorName]` on the table `Actor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[countryName]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[directorName]` on the table `Director` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[writerName]` on the table `Writer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Actor_actorName_key` ON `Actor`(`actorName`);

-- CreateIndex
CREATE UNIQUE INDEX `Country_countryName_key` ON `Country`(`countryName`);

-- CreateIndex
CREATE UNIQUE INDEX `Director_directorName_key` ON `Director`(`directorName`);

-- CreateIndex
CREATE UNIQUE INDEX `Writer_writerName_key` ON `Writer`(`writerName`);
