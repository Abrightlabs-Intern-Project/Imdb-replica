import { useParams } from "react-router-dom";
import MovieHeader from "../components/MovieHeader";
import { Storyline } from "../components/Storyline";
import Cast from "../components/Cast";
import Details from "../components/Details";
import TechnicalSpecs from "../components/TechnicalSpecs";
import UserReviews from "../components/UserReviews";
import { FC, useEffect, useState } from "react";
import axios from "axios";

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
        console.log(movieData.data)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) getData(id);
  }, [id]);
  
  if (loading) return <p>Loading...</p>;

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
      {/* <UserReviews /> */}
      <TechnicalSpecs props={movieData} />
    </div>
  );
};

export default MovieDetails;
