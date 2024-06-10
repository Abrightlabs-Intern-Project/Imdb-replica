import { createContext, ReactNode, useContext, useState } from "react";

type WatchlistProviderProps = {
  children: ReactNode;
};

export type Movie = {
  title: string;
  year: string;
  rated: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  language: string;
  country: string;
  awards: string;
  poster: string;
  ratings: { Source: string; Value: string }[];
  metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  type: string;
  dvd: string;
  boxOffice: string;
  production: string;
  website: string;
  response: string;
};

type WatchlistContext = {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (imdbID: string) => void;
};

const WatchlistContext = createContext({} as WatchlistContext);

export function useWatchlist() {
  return useContext(WatchlistContext);
}

export function WatchlistProvider({ children }: WatchlistProviderProps) {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  function addToWatchlist(movie: Movie) {
    if (!watchlist.some((m) => m.imdbID === movie.imdbID)) {
      setWatchlist((prevWatchlist) => [...prevWatchlist, movie]);
    }   
  }

  function removeFromWatchlist(imdbID: string) {
    setWatchlist((prevWatchlist) =>
      prevWatchlist.filter((movie) => movie.imdbID !== imdbID)
    );
  }

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}
