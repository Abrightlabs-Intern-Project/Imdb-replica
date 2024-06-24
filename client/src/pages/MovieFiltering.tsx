import axios from "axios";
import { FC, useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { Movie } from "../context/WatchlistContext";

const MovieFiltering:FC = () => {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<any>(null);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const genres = await axios.get(`http://localhost:3000/genre`);
        const movies = await axios.get(`http://localhost:3000/movies`);
        setGenres(genres.data);
        console.log(movies.data[0])
        setMovies(movies.data);
      } finally {
        setLoading(false);
      }
    };
    getGenres();
  }, []);


  const fetchMoviesByGenre = async (genreId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/genre/${genreId}`);
      const movieData = response.data.flatMap((movieGenre: any) => movieGenre.movie);
      setMovies(movieData);
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreClick = (genre: any) => {
    setSelectedGenre(genre);
    fetchMoviesByGenre(genre.genreId);
  };

  if(loading) return <span>Loading...</span>

  return (
    <div className="bg-black flex flex-col py-5 px-28 gap-4">
      <div className="flex gap-2 justify-center flex-wrap">
        {genres.map((genre: any) => {
          const isSelected = selectedGenre && selectedGenre.genreId === genre.genreId;
          return (
            <button
              key={genre.genreId}
              className={`px-4 py-1 rounded ${
                isSelected ? "bg-white text-black" : "text-white border border-white"
              }`}
              onClick={() => handleGenreClick(genre)}
            >
              {genre.genreName}
            </button>
          );
        })}
      </div>
      {(
        <div className="mt-4 text-white flex flex-wrap gap-5 justify-center">
            {movies.map((movie)=> {
                return (
                <div className="w-[200px]">
                    <MovieCard key={movie.movieId} props={movie} />
                </div>);
            })}
        </div>
      )}
    </div>
  );
};

export default MovieFiltering;