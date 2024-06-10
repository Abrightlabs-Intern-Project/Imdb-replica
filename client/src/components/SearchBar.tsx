import { FC } from "react";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../ApolloClient/queries";
import { Movie } from "../context/WatchlistContext";

interface SearchBarProps {
  setResults: (results: Movie[]) => void;
}

const SearchBar: FC<SearchBarProps> = ({ setResults }) => {
  const [input, setInput] = useState<string>("");

  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const movies = data?.movies;

  const filteringMovies = (): Movie[] => {
    return movies.filter((movie: Movie) => {
      return movie.title.toLowerCase().includes(input.toLowerCase());
    });
  };

  const handleChange = (value: string) => {
    setInput(value);
    const filteredResults = filteringMovies();
    if (!value.trim()) {
      setResults([]);
    } else {
      setResults(filteredResults);
    }
  };

  return (
    <div className="flex w-full px-10 md:px-0 md:w-[500px] lg:w-[600px]">
      <input
        className="rounded-l px-4 py-1 focus:outline-none w-full"
        type="text"
        placeholder="Search IMDb"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      <button className="px-4 bg-white text-gray-500 rounded-r py-1 hover:bg-gray-200">
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
