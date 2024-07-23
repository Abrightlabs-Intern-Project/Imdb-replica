import axios from "axios";
import { FC, useEffect, useState } from "react";
import MovieCard from "../components/common/MovieCard";
import { api_url, Genre, Movie } from "../context/WatchlistContext";
import LoadingLogo from "../components/common/LoadingLogo";

const GenreFiltering: FC = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genresResponse = await axios.get(`${api_url}/genre`);
        const moviesResponse = await axios.get(`${api_url}/movies`);
        setGenres(genresResponse.data);
        setMovies(moviesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchMoviesByGenre = async (genreId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`${api_url}/genre/${genreId}`);
      setMovies(response.data.movies);
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
    } finally {
      setLoading(false);
    }
  };  

  const handleGenreClick = (genre: Genre) => {
    setSelectedGenre(genre);
    fetchMoviesByGenre(genre.genreId);
  };

  if (loading) return <LoadingLogo />

  return (
    <div className="bg-black flex flex-col py-5 px-28 gap-4">
      <div className="flex gap-2 justify-center flex-wrap">
        {genres.map((genre: Genre) => {
          const isSelected = selectedGenre && selectedGenre.genreId === genre.genreId;
          return (
            <button
              key={genre.genreId}
              className={`px-4 py-1 rounded ${isSelected ? "bg-white text-black" : "text-white border border-white"}`}
              onClick={() => handleGenreClick(genre)}
            >
              {genre.genreName}
            </button>
          );
        })}
      </div>
      <div className="mt-4 text-white flex flex-wrap gap-5 justify-center">
        {movies.map((movie) => (
          <div key={movie.movieId} className="w-[200px]">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreFiltering;
