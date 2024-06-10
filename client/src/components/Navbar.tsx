import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import SearchBar from "./SearchBar";
import { Movie } from "../context/WatchlistContext";
import SearchSuggestions from "./SearchSuggestions";
import { useAuthenticator } from "@aws-amplify/ui-react";

const Navbar: FC = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [results, setResults] = useState<Movie[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const hideSuggestions = () => {
    setResults([]);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      <div className="bg-[#181414] flex flex-col gap-2 py-4 items-center md:flex-row md:justify-center md:gap-3 relative z-50">
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
        <div className="relative">
          <FaUserCircle
            className="text-white text-3xl cursor-pointer"
            onClick={toggleDropdown}
          />
          {dropdownOpen && (
            <div className="absolute bg-[#201c1c] rounded-md mt-2 w-60">
              <span className="text-white block py-2 px-4 hover:bg-[#383434] w-full text-left">
                {user.signInDetails?.loginId}
              </span>
              <button
                className="text-white block py-2 px-4 hover:bg-[#383434] w-full text-left"
                onClick={() => {
                  signOut();
                  setDropdownOpen(false);
                }}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
      {results.length !== 0 && (
        <SearchSuggestions
          results={results}
          onHideSuggestions={hideSuggestions}
        />
      )}
    </div>
  );
};

export default Navbar;
