import { useParams } from "react-router-dom";
import MovieHeader from "../components/MovieHeader";
import { Storyline } from "../components/Storyline";
import Details from "../components/Details";
import TechnicalSpecs from "../components/TechnicalSpecs";
import UserReviews from "../components/UserReviews";
import { FC, useEffect, useState } from "react";
import { Movie } from "../context/WatchlistContext";
import { useQuery } from "@apollo/client";
import { GET_MOVIE } from "../ApolloClient/queries";

const MovieDetails: FC = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { imdbID: id },
  });

  const [movieData, setMovieData] = useState<Movie | null>(null);

  useEffect(() => {
    if (!loading && !error && data) {
      setMovieData(data?.getMovie);
    }
  }, [id, loading, error, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!movieData) return <div>Loading...</div>;

  return (
    <div className="">
      <MovieHeader props={movieData} />
      <Storyline props={movieData} />
      <Details props={movieData} />
      <UserReviews />
      <TechnicalSpecs props={movieData} />
    </div>
  );
};

export default MovieDetails;
