import { FC } from "react";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Movie } from "../../context/WatchlistContext";
import axios from "axios";

interface SearchBarProps {
  setResults: (results: Movie[]) => void;
}

const SearchBar: FC<SearchBarProps> = ({ setResults }) => {
  const [input, setInput] = useState<string>("");

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get("http://localhost:3000/movies");
      setMovies(response.data);
    };
    fetchMovies();
  }, []);

  const filteringMovies = (): Movie[] => {
    return movies.filter((movie: Movie) => {
      return movie.title.toLowerCase().includes(input.toLowerCase());
    });
  };

  const handleChange = (value: string) => {
    setInput(value);
  };

  useEffect(() => {
    const filteredResults = filteringMovies();
    if (!input) {
      setResults([]);
    } else {
      setResults(filteredResults);
    }
  }, [input, setResults]);

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
