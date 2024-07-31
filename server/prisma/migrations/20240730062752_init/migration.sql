-- CreateTable
CREATE TABLE "Movie" (
    "movieId" CHAR(36) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "year" VARCHAR(4) NOT NULL,
    "rated" VARCHAR(10) NOT NULL,
    "released" VARCHAR(20) NOT NULL,
    "runtime" VARCHAR(10) NOT NULL,
    "plot" TEXT NOT NULL,
    "language" VARCHAR(150) NOT NULL,
    "awards" VARCHAR(255) NOT NULL,
    "poster" VARCHAR(255) NOT NULL,
    "trailer" VARCHAR(255) NOT NULL,
    "metascore" VARCHAR(5) NOT NULL,
    "rating" VARCHAR(5) NOT NULL,
    "votes" VARCHAR(15) NOT NULL,
    "boxOffice" VARCHAR(50) NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("movieId")
);

-- CreateTable
CREATE TABLE "Country" (
    "countryId" CHAR(36) NOT NULL,
    "countryName" VARCHAR(100) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("countryId")
);

-- CreateTable
CREATE TABLE "Genre" (
    "genreId" CHAR(36) NOT NULL,
    "genreName" VARCHAR(50) NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("genreId")
);

-- CreateTable
CREATE TABLE "Director" (
    "directorId" CHAR(36) NOT NULL,
    "directorName" VARCHAR(50) NOT NULL,

    CONSTRAINT "Director_pkey" PRIMARY KEY ("directorId")
);

-- CreateTable
CREATE TABLE "Writer" (
    "writerId" CHAR(36) NOT NULL,
    "writerName" VARCHAR(50) NOT NULL,

    CONSTRAINT "Writer_pkey" PRIMARY KEY ("writerId")
);

-- CreateTable
CREATE TABLE "Actor" (
    "actorId" CHAR(36) NOT NULL,
    "actorName" VARCHAR(50) NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Actor_pkey" PRIMARY KEY ("actorId")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" CHAR(36) NOT NULL,
    "userName" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "favouriteGenreId" CHAR(36),

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Watchlist" (
    "watchlistId" CHAR(36) NOT NULL,
    "userId" CHAR(36) NOT NULL,
    "movieId" CHAR(36) NOT NULL,

    CONSTRAINT "Watchlist_pkey" PRIMARY KEY ("watchlistId")
);

-- CreateTable
CREATE TABLE "Review" (
    "reviewId" CHAR(36) NOT NULL,
    "rating" VARCHAR(5) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" CHAR(36) NOT NULL,
    "movieId" CHAR(36) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("reviewId")
);

-- CreateTable
CREATE TABLE "_MovieToWriter" (
    "A" CHAR(36) NOT NULL,
    "B" CHAR(36) NOT NULL
);

-- CreateTable
CREATE TABLE "_CountryToMovie" (
    "A" CHAR(36) NOT NULL,
    "B" CHAR(36) NOT NULL
);

-- CreateTable
CREATE TABLE "_GenreToMovie" (
    "A" CHAR(36) NOT NULL,
    "B" CHAR(36) NOT NULL
);

-- CreateTable
CREATE TABLE "_DirectorToMovie" (
    "A" CHAR(36) NOT NULL,
    "B" CHAR(36) NOT NULL
);

-- CreateTable
CREATE TABLE "_ActorToMovie" (
    "A" CHAR(36) NOT NULL,
    "B" CHAR(36) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_countryName_key" ON "Country"("countryName");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_genreName_key" ON "Genre"("genreName");

-- CreateIndex
CREATE UNIQUE INDEX "Director_directorName_key" ON "Director"("directorName");

-- CreateIndex
CREATE UNIQUE INDEX "Writer_writerName_key" ON "Writer"("writerName");

-- CreateIndex
CREATE UNIQUE INDEX "Actor_actorName_key" ON "Actor"("actorName");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Watchlist_userId_movieId_key" ON "Watchlist"("userId", "movieId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_movieId_key" ON "Review"("userId", "movieId");

-- CreateIndex
CREATE UNIQUE INDEX "_MovieToWriter_AB_unique" ON "_MovieToWriter"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieToWriter_B_index" ON "_MovieToWriter"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CountryToMovie_AB_unique" ON "_CountryToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_CountryToMovie_B_index" ON "_CountryToMovie"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToMovie_AB_unique" ON "_GenreToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToMovie_B_index" ON "_GenreToMovie"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DirectorToMovie_AB_unique" ON "_DirectorToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_DirectorToMovie_B_index" ON "_DirectorToMovie"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ActorToMovie_AB_unique" ON "_ActorToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_ActorToMovie_B_index" ON "_ActorToMovie"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_favouriteGenreId_fkey" FOREIGN KEY ("favouriteGenreId") REFERENCES "Genre"("genreId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Watchlist" ADD CONSTRAINT "Watchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Watchlist" ADD CONSTRAINT "Watchlist_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("movieId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("movieId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToWriter" ADD CONSTRAINT "_MovieToWriter_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("movieId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToWriter" ADD CONSTRAINT "_MovieToWriter_B_fkey" FOREIGN KEY ("B") REFERENCES "Writer"("writerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CountryToMovie" ADD CONSTRAINT "_CountryToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Country"("countryId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CountryToMovie" ADD CONSTRAINT "_CountryToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("movieId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToMovie" ADD CONSTRAINT "_GenreToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("genreId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToMovie" ADD CONSTRAINT "_GenreToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("movieId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DirectorToMovie" ADD CONSTRAINT "_DirectorToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Director"("directorId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DirectorToMovie" ADD CONSTRAINT "_DirectorToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("movieId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActorToMovie" ADD CONSTRAINT "_ActorToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Actor"("actorId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActorToMovie" ADD CONSTRAINT "_ActorToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("movieId") ON DELETE CASCADE ON UPDATE CASCADE;
