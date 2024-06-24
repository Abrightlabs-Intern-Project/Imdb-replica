import { createContext, ReactNode, useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { useAuthenticator } from "@aws-amplify/ui-react";
import {
  ADD_TO_WATCHLIST,
  REMOVE_FROM_WATCHLIST,
  GET_WATCHLIST,
} from "../ApolloClient/queries";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import axios from "axios";

type WatchlistProviderProps = {
  children: ReactNode;
};

export type Movie = {
  movieId: string;
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
};

type WatchlistContext = {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: string) => void;
};

const WatchlistContext = createContext({} as WatchlistContext);

export function useWatchlist() {
  return useContext(WatchlistContext);
}

export function WatchlistProvider({ children }: WatchlistProviderProps) {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  const { user } = useAuthenticator((context) => [context.user]);
  const userId = user.userId;

  useEffect(() => {
    const getWatchlist = async (userId: string) => {
      const watchlistData = await axios.get(
        `http://localhost:3000/watchlist?userId=${userId}`
      );
      setWatchlist(watchlistData.data);
    };
    getWatchlist(userId);
  }, [userId]);

  async function handleAddToWatchlist(movie: Movie, userId: string) {
    const movieId = movie.movieId;
    try {
      await axios.post(`http://localhost:3000/watchlist/add`, { movieId, userId });
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  }

  function addToWatchlist(movie: Movie) {
    if (!watchlist.some((m) => m.movieId === movie.movieId)) {
      handleAddToWatchlist(movie, userId);
      setWatchlist((prevWatchlist) => [...prevWatchlist, movie]);
    }
  }

  async function handleRemoveFromWatchlist(movieId: string, userId: string) {
    try {
      await axios.delete(`http://localhost:3000/watchlist/remove/${userId}/${movieId}`);
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
      value={{ watchlist, addToWatchlist, removeFromWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}
