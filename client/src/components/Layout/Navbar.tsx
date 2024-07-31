import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import SearchBar from "../Search/SearchBar";
import { Movie } from "../../context/WatchlistContext";
import SearchSuggestions from "../Search/SearchSuggestions";
import useIsAdmin from "../../pages/admin/useIsAdmin";
import Gear from "../../../public/user-setting.png";
import Hamburger from "hamburger-react";

type NavbarProps = {
  signOut: any;
  user: any;
};

const Navbar: FC<NavbarProps> = ({ signOut, user }) => {
  const [results, setResults] = useState<Movie[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { isAdmin } = useIsAdmin();

  const [isOpen, setOpen] = useState(false);

  const navigate = useNavigate();

  const hideSuggestions = () => {
    setResults([]);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      <div className="z-[999] md:hidden flex flex-col bg-[#181414] items-center">
        <div className="flex items-center px-2 justify-center">
          <SearchBar setResults={setResults} />
          <Hamburger toggled={isOpen} toggle={setOpen} color="white" />
        </div>
        <div className="flex justify-center">
            {results.length !== 0 && (
              <SearchSuggestions
                results={results}
                onHideSuggestions={hideSuggestions}
              />
            )}
          </div>
        {isOpen && 
          <div  className="bg-[#181414] text-white">
            <ul className="flex flex-col gap-2 my-2" onClick={() => {setOpen(false); hideSuggestions}}>
              <li>{user.username}</li>
              {user.username === "admin" && <li className="hover:underline"><Link to="/admin">Dashboard</Link></li>}
              <li className="hover:underline"><Link to="/">Home</Link></li>
              <li className="hover:underline"><Link to="/watchlist">Watchlist</Link></li>
              <li className="hover:underline"><Link to="/my-reviews">Reviews</Link></li>
              <li className="hover:cursor-pointer" onClick={() => signOut()}>Logout</li>
            </ul>
          </div>}
      </div>
      <div className="hidden md:block">
      <div className="bg-[#181414] flex flex-col gap-2 py-4 items-center md:flex-row md:justify-center md:gap-3 relative z-50">
        {isAdmin && (
          <button
            className="font-semibold"
            onClick={() => {
              navigate("/admin");
            }}
          >
            <img className="w-8" src={Gear} alt="" />
          </button>
        )}
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
            className="text-white text-2xl cursor-pointer"
            onClick={toggleDropdown}
          />
          {dropdownOpen && (
            <div className="absolute bg-[#201c1c] rounded-md mt-2 w-60">
              <span className="text-white block py-2 px-4 hover:bg-[#383434] w-full text-left">
                {user.username}
              </span>
              <button
                className="text-white block py-2 px-4 hover:bg-[#383434] w-full text-left"
                onClick={() => {
                  navigate("/my-reviews");
                  setDropdownOpen(false);
                }}
              >
                <span>my reviews</span>
              </button>
              <button
                className="text-white block py-2 px-4 hover:bg-[#383434] w-full text-left"
                onClick={() => {
                  signOut();
                  setDropdownOpen(false);
                }}
              >
                logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        {results.length !== 0 && (
          <SearchSuggestions
            results={results}
            onHideSuggestions={hideSuggestions}
          />
        )}
      </div>
    </div>
    </div>
  );
};

export default Navbar;
