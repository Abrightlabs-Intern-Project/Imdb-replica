import { FC } from "react";
import Star from "../../public/starr.png";
import { Movie, useWatchlist } from "../context/WatchlistContext";
import { Link } from "react-router-dom";

const WatchlistMovieCard: FC<{ props: Movie }> = ({ props }) => {
  const { removeFromWatchlist } = useWatchlist();

  return (
    <div className=" border border-gray-500 p-2 rounded flex flex-col gap-3 w-full md:w-[800px]">
      <div className=" flex justify-between">
        <div className=" flex gap-3">
          <Link to={`/movie/${props.imdbID}`}>
            <img className=" w-16" src={props.poster} alt="" />
          </Link>
          <div className=" flex flex-col gap-1">
            <span className=" font-bold px-1">{props.title}</span>
            <div className=" flex gap-3 px-1">
              <span>{props.released}</span>
              <span>{props.runtime}</span>
            </div>
            <div className=" flex gap-1">
              <img className=" w-6 h-6" src={Star} alt="" />
              <span>{props.imdbRating}</span>
            </div>
          </div>
        </div>
        <div>
          <button
            className=" px-2 border border-black rounded bg-gray-200"
            onClick={() => removeFromWatchlist(props.imdbID)}
          >
            X
          </button>
        </div>
      </div>
      <div className=" flex flex-col gap-2">
        <div className=" flex gap-1">
          <span className=" text-sm font-semibold">Director</span>
          <span className=" text-sm text-blue-500">{props.director}</span>
        </div>
        <div className=" flex gap-1">
          <span className=" text-sm font-semibold">Stars</span>
          <span className=" text-sm text-blue-500">{props.actors}</span>
        </div>
      </div>
    </div>
  );
};

export default WatchlistMovieCard;
