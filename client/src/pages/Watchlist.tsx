import { useWatchlist } from "../context/WatchlistContext";
import WatchlistMovieCard from "../components/WatchlistMovieCard";
import { WatchlistHeader } from "../components/WatchlistHeader";
import SlickSlider from "../components/SlickSlider";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../ApolloClient/queries";
import { FC } from "react";

const Watchlist:FC = () => {
  const { watchlist } = useWatchlist();

  const { loading, error, data } = useQuery(GET_MOVIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  const movies = data?.movies;

  return (
    <div>
      <WatchlistHeader />
      <div className="py-2">
        {watchlist.length === 0 && (
          <span className=" px-2 sm:px-32 lg:px-40 text-xl">
            Watchlist is Empty
          </span>
        )}
      </div>
      <div className="px-2 sm:px-32 lg:px-40 flex flex-col gap-3 py-5">
        {watchlist.map((movie) => (
          <WatchlistMovieCard key={movie.imdbID} props={movie} />
        ))}
      </div>
      <div className=" flex justify-center bg-black">
        <SlickSlider data={movies} />
      </div>
    </div>
  );
};

export default Watchlist;
