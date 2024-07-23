import { useState, useEffect } from 'react';
import Img from "../../../public/image.png";
import { api_url, Genre, Movie } from '../../context/WatchlistContext';
import axios from 'axios';
import WatchlistMovieCard from '../Watchlist/WatchlistMovieCard';

const AdvancedFiltering = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [title, setTitle] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [minRating, setMinRating] = useState('');
  const [maxRating, setMaxRating] = useState('');
  const [releaseYearFrom, setReleaseYearFrom] = useState('');
  const [releaseYearTo, setReleaseYearTo] = useState('');
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [rated, setRated] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await axios.get("http://localhost:3000/genre")
      setGenres(res.data)
    };
    fetchGenres();
  }, []);


  const handleSearch = async (e: any) => {
  e.preventDefault();
  const params = new URLSearchParams();
  if (title) params.append('title', title);
  if (rated) params.append('rated', rated);
  if (selectedGenre) params.append('selectedGenre', selectedGenre);
  if (minRating) params.append('minRating', minRating);
  if (maxRating) params.append('maxRating', maxRating);
  if (releaseYearFrom) params.append('releaseYearFrom', releaseYearFrom);
  if (releaseYearTo) params.append('releaseYearTo', releaseYearTo);

  const res = await axios.get(`${api_url}/movies/search?${params.toString()}`);
  setFilteredMovies(res.data);
};


  return (
    <div className='px-40 py-5'>
      <header className='flex flex-col gap-5'>
        <span className='text-4xl text-[#231e1e] font-semibold mt-5'>Advanced title search</span>
        <p>Discover IMDb's robust title search. Mix and match info to refine your searches. Looking for 1970s Canadian horror films rated above 6 by at least 100 users? Find them here. All fields below are optional, but at least one is needed for a search. For ranges (release date, votes), use 'min' for larger/after and 'max' for smaller/before. You can also press 'Enter' after checking a box or focusing on a field. To learn more please visit our <a className='text-blue-600 hover:underline' href="https://help.imdb.com/article/imdb/discover-watch/using-the-advanced-search-feature/GLUEUYWPQNPTEVPU#">help site</a> and <a className='text-blue-600 hover:underline' href="https://help.imdb.com/article/imdb/new-features-updates/advanced-search-redesign/G73SLJ6K33AA6NB5#">FAQs.</a></p>
      </header>
      <div className='grid grid-cols-3 gap-10'>
        <div className='my-8'>
         <span className='text-xl font-semibold'>Search filters</span>
         <form action="">
         <div className='col-span-1 flex flex-col gap-4 border px-4 py-3 shadow-md mt-5'>
          <label>
            <span className='block text-sm font-semibold my-1'>Title</span>
            <input
              type='text'
              className='border border-gray-300 p-2 rounded w-full focus:outline-none'
              placeholder='Enter movie title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            <span className='block text-sm font-semibold my-1'>Rated</span>
            <select
              className='border border-gray-300 p-2 rounded w-full focus:outline-none'
              value={rated}
              onChange={(e: any) => setRated(e.target.value)}
            >
              <option value=''>None</option>
              <option value='TV-14'>TV-14</option>
              <option value='PG'>PG</option>
              <option value='PG-13'>PG-13</option>
              <option value='R'>R</option>
              <option value='TV-MA'>TV-MA</option>
            </select>
          </label>
          <label>
            <span className='block text-sm mb-1 font-semibold'>Genre</span>
            <select
              className='border border-gray-300 p-2 rounded w-full'
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value=''>None</option>
              {genres.map((genre) => (
                <option key={genre.genreId} value={genre.genreId}>{genre.genreName}</option>
              ))}
            </select>
          </label>
          <label>
                <span className='block text-sm font-semibold mb-1'>Rating</span>
                <div className='flex gap-2'>
                  <input
                    type='number'
                    className='border border-gray-300 p-2 rounded w-full focus:outline-none'
                    placeholder='Min'
                    min='0'
                    max='10'
                    value={minRating}
                    onChange={(e) => setMinRating(e.target.value)}
                  />
                  <input
                    type='number'
                    className='border border-gray-300 p-2 rounded w-full focus:outline-none'
                    placeholder='Max'
                    min='0'
                    max='10'
                    value={maxRating}
                    onChange={(e) => setMaxRating(e.target.value)}
                  />
                </div>
              </label>
          <label>
            <span className='block text-sm mb-1 font-semibold'>Release Year</span>
            <div className='flex gap-2'>
              <input
                type='number'
                className='border border-gray-300 p-2 rounded w-full focus:outline-none'
                placeholder='From'
                min='1900'
                value={releaseYearFrom}
                onChange={(e) => setReleaseYearFrom(e.target.value)}
              />
              <input
                type='number'
                className='border border-gray-300 p-2 rounded w-full focus:outline-none'
                placeholder='To'
                min='1900'
                value={releaseYearTo}
                onChange={(e) => setReleaseYearTo(e.target.value)}
              />
            </div>
          </label>
          <button
            className='bg-blue-600 text-white p-2 rounded mt-4'
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
         </form>
        </div>
        <div className='col-span-2 flex flex-col items-center gap-3'>
          {filteredMovies.length === 0 ? (
            <>
              <img className='h-96' src={Img} alt="Advanced search" />
              <span className='text-xl font-semibold'>Create a more specific title search</span>
              <p>Create a search using a variety of options to filter the different types of information we have in our catalog.</p>
            </>
          ) : (
            <div className='my-8 flex flex-col gap-4'>
              <span className='text-xl font-semibold'>Search Results:</span>
              <div className=''>
                {filteredMovies.map((movie) => (
                  <WatchlistMovieCard key={movie.movieId} movie={movie} actor={true} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedFiltering;
