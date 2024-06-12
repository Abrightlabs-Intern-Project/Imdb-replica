import { createContext, ReactNode, useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { ADD_TO_WATCHLIST, REMOVE_FROM_WATCHLIST, GET_WATCHLIST } from "../ApolloClient/queries";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";

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
  ratings: string;
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

  const { user } = useAuthenticator((context) => [context.user]);
  const userEmail = user.signInDetails?.loginId || "";

  const { data } = useQuery(GET_WATCHLIST, {
    variables: { userEmail },
    skip: !userEmail,
  });

  useEffect(() => {
    if (data && data.getWatchlist) {  
      setWatchlist(data.getWatchlist);
    }
  }, [data]);

  const [addToWatchlistMutation] = useMutation(ADD_TO_WATCHLIST);
  const [removeFromWatchlistMutation] = useMutation(REMOVE_FROM_WATCHLIST);

  async function handleAddToWatchlist(movie: Movie, userEmail: string) {
    const imdbID = movie.imdbID;
    try {
      await addToWatchlistMutation({ variables: { imdbID, userEmail } });
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  }

  function addToWatchlist(movie: Movie) {
    if (!watchlist.some((m) => m.imdbID === movie.imdbID)) {
      setWatchlist((prevWatchlist) => [...prevWatchlist, movie]);
      handleAddToWatchlist(movie, userEmail);
    }
  }

  async function handleRemoveFromWatchlist(imdbID: string, userEmail: string) {
    try {
      await removeFromWatchlistMutation({ variables: { imdbID, userEmail } });
    } catch (error) {
      console.error("Error removing from watchlist:", error);
    }
  }

  function removeFromWatchlist(imdbID: string) {
    setWatchlist((prevWatchlist) =>
      prevWatchlist.filter((movie) => movie.imdbID !== imdbID)
    );
    handleRemoveFromWatchlist(imdbID, userEmail);
  }

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}
