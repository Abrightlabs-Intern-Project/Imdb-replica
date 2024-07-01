import Star from "../../../public/starr.png";
import { Link } from "react-router-dom";
import { Movie, useWatchlist } from "../../context/WatchlistContext";
import { FC } from "react";

const MovieCard: FC<{ props: Movie }> = ({ props }) => {
  const { addToWatchlist } = useWatchlist();

  function truncateString(str: string, maxLength: number) {
    if (str.length > maxLength) {
      return str.substring(0, maxLength - 3) + "...";
    }
    return str;
  }

  return (
    <div className="flex flex-col bg-[#1a1a1a] rounded">
      <Link to={`/movie/${props.movieId}`}>
        <img className="w-full object-cover h-72" src={`data:image/jpeg;base64,${props.poster}`} alt="" />
      </Link>
      <div className="flex flex-col gap-2 py-2 px-3">
        <div className="flex py-1 gap-2">
          <img className="w-6 h-6" src={Star} alt="" />
          <span className="text-gray-300">{props.rating}</span>
        </div>
        <span className="text-white">{truncateString(props.title, 20)}</span>
        <button
          className="text-blue-400 font-semibold px-3 sm:px-5 md:px-1 bg-[#333333] rounded-lg py-1 focus:outline-none focus:ring-2 focus:gray-blue-500 focus:ring-opacity-50 active:bg-gray-800"
          onClick={() => {
            addToWatchlist(props);
          }}
        >
          + Watchlist
        </button>
        <button
          className="py-3 flex justify-center items-center gap-1"
          onClick={() => (window.location.href = props.trailer)}
        >
          <img
            className="h-5"
            src="https://img.icons8.com/?size=100&id=9978&format=png&color=FFFFFF"
            alt=""
          />
          <span className=" text-white">Trailer</span>
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
