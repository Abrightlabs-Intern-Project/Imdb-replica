import { useParams } from "react-router-dom";
import MovieHeader from "../components/Movie/MovieHeader";
import { Storyline } from "../components/Movie/Storyline";
import Cast from "../components/Movie/Cast";
import Details from "../components/Movie/Details";
import TechnicalSpecs from "../components/Movie/TechnicalSpecs";
import UserReviews from "../components/Review/UserReviews";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import LoadingLogo from "../components/common/LoadingLogo";

const MovieDetails: FC = () => {
  const { id } = useParams();
  const [movieActors, setMovieActors] = useState<[any]>([undefined]);
  const [movieDirectors, setMovieDirectors] = useState<[any]>([undefined]);
  const [movieWriters, setMovieWriters] = useState<[any]>([undefined]);
  const [movieCountries, setMovieCountries] = useState<[any]>([undefined]);
  const [movieData, setMovieData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | unknown>(null);
  const [movieGenres, setMovieGenre] = useState<[any]>([undefined]);

  useEffect(() => {
    const getData = async (id: string) => {
      try {
        const movieData = await axios.get(`http://localhost:3000/movies/${id}`);
        setMovieGenre(movieData.data.genres);
        setMovieData(movieData.data);
        setMovieWriters(movieData.data.writers);
        setMovieActors(movieData.data.actors);
        setMovieDirectors(movieData.data.directors);
        setMovieCountries(movieData.data.countries);
        console.log(movieData.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (id) getData(id);
  }, [id]);

  if (loading) return <LoadingLogo />

  return (
    <div className="">
      <MovieHeader
        movie={movieData}
        movieActors={movieActors}
        movieDirectors={movieDirectors}
        movieWriters={movieWriters}
      />
      <Storyline movie={movieData} movieGenres={movieGenres} />
      <Cast movieActors={movieActors} />
      <Details movie={movieData} movieCountries={movieCountries} />
      <UserReviews />
      <TechnicalSpecs props={movieData} />
    </div>
  );
};

export default MovieDetails;
