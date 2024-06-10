import { useParams } from "react-router-dom";
import MovieHeader from "../components/MovieHeader";
import { Storyline } from "../components/Storyline";
import Details from "../components/Details";
import TechnicalSpecs from "../components/TechnicalSpecs";
import UserReviews from "../components/UserReviews";
import { FC, useEffect, useState } from "react";
import { Movie } from "../context/WatchlistContext"
import { useQuery } from '@apollo/client';
import { GET_MOVIES } from "../ApolloClient/queries";

const MovieDetails:FC = () => {

  const { loading, error, data } = useQuery(GET_MOVIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  const movies = data?.movies;

  const { id } = useParams();

  const [movieData, setMovieData] = useState<Movie | null>(null);

  useEffect(() => {
    const filteredMovie = movies.find((movie: Movie) => movie.imdbID === id);
    if (filteredMovie) {
      setMovieData(filteredMovie);
    } else {
      console.error("Movie not found");
    }
  }, [id]);

  if (!movieData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <MovieHeader props={movieData}/>
      <Storyline props={movieData} />
      <Details props={movieData} />
      <UserReviews />
      <TechnicalSpecs props={movieData} />
    </div>
  );
};

export default MovieDetails;
