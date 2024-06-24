import { Movie, useWatchlist } from "../context/WatchlistContext";
import WatchlistMovieCard from "../components/WatchlistMovieCard";
import { WatchlistHeader } from "../components/WatchlistHeader";
import SlickSlider from "../components/SlickSlider";
import { useQuery } from "@apollo/client";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import axios from "axios";
// import { GET_MOVIES } from "../ApolloClient/queries";
import { FC } from "react";

const Watchlist: FC = () => {
  const [watchlist, setWatchlist] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState([]);



  const { user } = useAuthenticator((context) => [context.user]);
  const userId = user.userId;

  useEffect(() => {
    const getData = async (userId: string) => {
      try {
        const watchlistData = await axios.get(
          `http://localhost:3000/watchlist?userId=${userId}`
        );
        const movieData = await axios.get("http://localhost:3000/movies");
        const m = watchlistData.data.map((item: any) => item.movie);
        setWatchlist(m);
        setMovies(movieData.data);
      } finally {
        setLoading(false);
      }
    };
    getData(userId);
  }, []);
  if (loading) return <span>Loading...</span>;
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
          <WatchlistMovieCard key={movie.movieId} props={movie} />
        ))}
      </div>
      <div className=" flex justify-center bg-black">
        <SlickSlider data={movies} />
      </div>
    </div>
  );
};

export default Watchlist;
