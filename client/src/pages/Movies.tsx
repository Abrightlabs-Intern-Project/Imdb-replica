import axios from "axios";
import { useEffect, useState } from "react";
import { Movie } from "../context/WatchlistContext";
import MovieCard from "../components/common/MovieCard";
import LoadingLogo from "../components/common/LoadingLogo";

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesResponse = await axios.get(`http://localhost:3000/movies`);
        setMovies(moviesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingLogo/>

  return (
    <div className="bg-black flex flex-wrap gap-10 px-40 py-10">
      {movies.map((movie) => (
        <div key={movie.movieId} className="w-[200px]">
          <MovieCard movie={movie} bg_color={undefined} />
        </div>
      ))}
    </div>
  );
};

export default Movies;
