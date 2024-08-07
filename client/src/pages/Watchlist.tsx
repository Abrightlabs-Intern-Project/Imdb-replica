import { api_url, Movie, useWatchlist } from "../context/WatchlistContext";
import WatchlistMovieCard from "../components/Watchlist/WatchlistMovieCard";
import { WatchlistHeader } from "../components/Watchlist/WatchlistHeader";
import MovieSlider from "../components/common/MovieSlider";
import { useEffect, useState } from "react";
import axios from "axios";
import { FC } from "react";
import LoadingLogo from "../components/common/LoadingLogo";

const Watchlist: FC = () => {
  const { watchlist } = useWatchlist();
  const [loading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const movieData = await axios.get(`${api_url}/movies`);
        setMovies(movieData.data);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  if (loading) return <LoadingLogo />

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
        {watchlist.map((movie: Movie) => (
          <WatchlistMovieCard key={movie.movieId} movie={movie} actor={false} />
        ))}
      </div>
      <div className=" flex justify-center bg-black">
        <MovieSlider data={movies} />
      </div>
    </div>
  );
};

export default Watchlist;
