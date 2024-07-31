import { Link } from "react-router-dom";
import { Movie } from "../../context/WatchlistContext";
import { FC } from "react";

interface SearchSuggestionsProps {
  results: Movie[];
  onHideSuggestions: () => void;
}

const SearchSuggestions: FC<SearchSuggestionsProps> = ({
  results,
  onHideSuggestions,
}) => {

  return (
    <div className="absolute rounded-md mt-2 z-10 flex flex-col md:mr-16">
      {results.slice(0, 7).map((movie: Movie) => (
        <Link
          key={movie.movieId}
          to={`/movie/${movie.movieId}`}
          onClick={() => onHideSuggestions()}
        >
          <div className=" flex border border-black">
            <img src={`https://movie-assets.s3.amazonaws.com/${movie.poster}`}  className=" h-20 w-14" alt="" />
            <div className="py- bg-[#201c1c]  hover:bg-[#383434] text-white px-4 flex flex-col w-full md:w-[400px] lg:w-[500px] text-start">
              <div className="text:xs sm:text-lg">{movie.title}</div>
              <div className="text:xs sm:text-sm">{movie.year}</div>
              <div className="text:xs sm:text-sm hidden sm:block">{movie.awards}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchSuggestions;
