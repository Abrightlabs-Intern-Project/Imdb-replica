import { Link } from 'react-router-dom';
import { Movie } from '../context/WatchlistContext';
import { FC } from 'react';

interface SearchSuggestionsProps {
  results: Movie[];
  onHideSuggestions: () => void;
}

const SearchSuggestions: FC<SearchSuggestionsProps> = ({ results, onHideSuggestions }) => {
  return (
    <div className="">
      {results.map((movie: Movie) => (
        <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`} onClick={()=>onHideSuggestions()}>
          <div className="py-2 bg-black border border-gray-900 text-white text-lg px-4 flex justify-center">{movie.title}</div>
        </Link>
      ))}
    </div>
  );
};

export default SearchSuggestions;
