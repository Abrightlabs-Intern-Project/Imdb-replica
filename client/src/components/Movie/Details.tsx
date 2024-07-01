import { FC } from "react";
import { Movie } from "../../context/WatchlistContext";

const Details: FC<{ movie: Movie; movieCountries: any }> = ({
  movie,
  movieCountries,
}) => {
  return (
    <div className=" py-5 sm:px-32 md:px-28 lg:px-40">
      <div className=" px-2 flex flex-col gap-2">
        <div className=" text-2xl font-bold md:text-3xl">
          <span>
            <span className=" text-yellow-400">|</span> Details
          </span>
        </div>
        <hr className="border-gray-400" />
        <div className=" flex px-2 gap-2">
          <span className=" text-black font-semibold text-sm md:text-base">
            Release Date
          </span>
          <span className=" text-blue-500 text-sm md:text-base">
            {movie.released}
          </span>
        </div>
        <hr className="border-gray-400" />
        <div className=" flex px-2 gap-2">
          <span className=" text-black font-semibold text-sm md:text-base">
            Country of Orgin
          </span>
          <span className=" text-blue-500 text-sm md:text-base">
            {movieCountries.map((country: any) => {
              return (
                <span key={country.countryId}>{country.countryName} • </span>
              );
            })}
          </span>
        </div>
        <hr className="border-gray-400" />
        <div className=" flex px-2 gap-2">
          <span className=" text-black font-semibold text-sm md:text-base">
            Languages
          </span>
          <span className=" text-blue-500 text-sm md:text-base">
            {movie.language}
          </span>
        </div>
        <hr className="border-gray-400" />
        <div className=" flex px-2 gap-2">
          <span className=" text-black font-semibold text-sm md:text-base">
            Awards
          </span>
          <span className=" text-blue-500 text-sm md:text-base">
            {movie.awards}
          </span>
        </div>
        <hr className="border-gray-400" />
      </div>
    </div>
  );
};

export default Details;
