import { FC } from "react";
import { Genre, Movie } from "../../context/WatchlistContext";
export const Storyline: FC<{ movie: Movie; movieGenres: Genre[] }> = ({
  movie,
  movieGenres,
}) => {
  return (
    <div className="sm:px-32 md:px-28 md:py-4 lg:px-40">
      <div className=" flex flex-col px-1 py-2 gap-2">
        <span className=" text-2xl font-bold md:text-3xl">
          {" "}
          <span className=" text-yellow-400">|</span> Storyline
        </span>
        <span className=" text-sm text-gray-700 px-2 md:text-base">
          {movie.plot}
        </span>
      </div>
      <hr className="border-gray-400" />
      <div className=" flex gap-2 px-3 py-2">
        <span className=" text-sm font-semibold">Genres</span>
        <span className=" text-sm text-blue-500">
          {movieGenres.map((genre: Genre, index: number) => {
            return <span>{genre.genreName} {index !== movieGenres.length - 1 && <span>•</span>} </span>;
          })}
        </span>
      </div>
      <hr className="border-gray-400" />
    </div>
  );
};
