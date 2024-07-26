import { createContext, ReactNode, useContext, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect } from "react";
import axios from "axios";

export const api_url = "https://nestjs-l8pdvdy47-ragulsuryas-projects.vercel.app";

type WatchlistProviderProps = {
  children: ReactNode;
};

export type Actor = {
  actorId: string;
  actorName: string;
  imageUrl: string;
};

export type Director = {
  directorId: string;
  directorName: string;
};

export type Writer = {
  writerName: string;
  writerId: string;
};

export type Genre = {
  genreId: string;
  genreName: string;
};

export type Country = {
  countryId: string;
  countryName: string;
};


export type Movie = {
  movieId: string
  title: string;
  year: string;
  rated: string;
  released: string;
  runtime: string;
  plot: string;
  language: string;
  awards: string;
  poster: string;
  trailer: string;
  metascore: string;
  rating: string;
  votes: string;
  boxOffice: string;
  actors: Actor[],
  directors: Director[],
  writers: Writer[],
  genres: Genre[],
  countries: Country[],
};

type WatchlistContext = {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: string) => void;
  loading: boolean;
};

const WatchlistContext = createContext({} as WatchlistContext);

export function useWatchlist() {
  return useContext(WatchlistContext);
}

export function WatchlistProvider({ children }: WatchlistProviderProps) {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuthenticator((context) => [context.user]);
  const userId = user.userId;

  useEffect(() => {
    const getWatchlist = async (userId: string) => {
      try {
        const watchlistData = await axios.get(
          `${api_url}/watchlist?userId=${userId}`
        );
        const m = watchlistData.data.map((item: any) => item.movie);
        setWatchlist(m);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      } finally {
        setLoading(false);
      }
    };
    getWatchlist(userId);
  }, [userId]);

  async function handleAddToWatchlist(movie: Movie, userId: string) {
    const movieId = movie.movieId;
    try {
      await axios.post(`${api_url}/watchlist`, { movieId, userId });
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  }

  function addToWatchlist(movie: Movie) {
    if (!watchlist.some((m) => m.movieId === movie.movieId)) {
      setWatchlist((prevWatchlist) => [...prevWatchlist, movie]);
      handleAddToWatchlist(movie, userId);
    }
  }

  async function handleRemoveFromWatchlist(movieId: string, userId: string) {
    try {
      await axios.delete(`${api_url}/watchlist/${userId}/${movieId}`);
    } catch (error) {
      console.error("Error removing from watchlist:", error);
    }
  }

  function removeFromWatchlist(movieId: string) {
    setWatchlist((prevWatchlist) =>
      prevWatchlist.filter((movie) => movie.movieId !== movieId)
    );
    handleRemoveFromWatchlist(movieId, userId);
  }

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, loading }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}
