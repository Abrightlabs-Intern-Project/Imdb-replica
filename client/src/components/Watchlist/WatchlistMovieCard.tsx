import { FC } from "react";
import Star from "../../../public/starr.png";
import { Movie, useWatchlist } from "../../context/WatchlistContext";
import { Link } from "react-router-dom";

const WatchlistMovieCard: FC<{ movie: Movie, actor: boolean }> = ({ movie, actor=false }) => {
  const { removeFromWatchlist } = useWatchlist();
  const posterUrl = `https://movie-assets.s3.amazonaws.com/${movie.poster}`

  return (
    <div className="py-3 px-2 border border-gray-300 rounded-sm flex flex-col gap-3 w-full md:w-[500px]">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <Link to={`/movie/${movie.movieId}`}>
            <img className=" w-16" src={posterUrl} alt="" />
          </Link>
          <div className="flex flex-col gap-1 p-1">
            <span className="font-bold px-1">{movie.title}</span>
            <div className="flex gap-3 px-1">
              <span className="text-sm">{movie.released}</span>
              <span className="text-sm">{movie.runtime}</span>
            </div>
            <div className="flex items-center">
              <img className="w-5 h-5" src={Star} alt="" />
              <span className="text-sm">{movie.rating}</span>
              <span className="text-xs ml-2"><span className="bg-green-600 text-white px-1">{movie.metascore}</span> Metascore</span>
            </div>
            
          </div>
        </div>
        <div className="p-2">
         {(!actor) && <button
            className="px-1 rounded-sm bg-white text-gray-400 border border-gray-400 hover:bg-gray-200 focus:outline-none"
            onClick={() => removeFromWatchlist(movie.movieId)}
          >
            &#x2715;
          </button>}
        </div>
      </div>
      {/* <div className=" flex flex-col gap-2">
        <div className=" flex gap-1">
          <span className=" text-sm font-semibold">Director</span>
          <span className=" text-sm text-blue-500">{props.director}</span>
        </div>
        <div className=" flex gap-1">
          <span className=" text-sm font-semibold">Stars</span>
          <span className=" text-sm text-blue-500">{props.actors}</span>
        </div>
      </div> */}
    </div>
  );
};

export default WatchlistMovieCard;
