import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import SearchBar from "./SearchBar";
import { Movie } from "../context/WatchlistContext";
import SearchSuggestions from "./SearchSuggestions";

const Navbar: FC = () => {

  const [results, setResults] = useState<Movie[]>([]);

  const hideSuggestions = () => {
    setResults([]);
  };

  return (
    <div>
    <div className="bg-[#1a1a1a] flex flex-col gap-2 py-4 items-center md:flex-row md:justify-center md:gap-3">
      <Link to="/">
        <img
          className="h-8"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/575px-IMDB_Logo_2016.svg.png"
          alt="Imdb logo"
        />
      </Link>
      <SearchBar setResults={setResults} />
      <Link to="/watchlist">
        <div className=" flex">
          <img
            className="h-6 pt-1"
            src="https://cdn.iconscout.com/icon/free/png-256/free-save-3251597-2724646.png"
            alt=""
          />
          <button className="text-white font-semibold">Watchlist</button>
        </div>
      </Link>
      <div>
        <button className="text-white text-2xl pt-1">
          <FaUserCircle />
        </button>
      </div>
    </div>
    {results.length !== 0 && <SearchSuggestions results={results} onHideSuggestions={hideSuggestions} />}
    </div>
  );
};

export default Navbar;
