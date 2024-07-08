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
import { imdbTop10 } from "../__data__/top10Imdb";

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

  if (loading) return <LoadingLogo />;

  return (
    <div className="">
      <MovieHeader
        movie={movieData}
        movieActors={movieActors}
        movieDirectors={movieDirectors}
        movieWriters={movieWriters}
      />
      <Storyline movie={movieData} movieGenres={movieGenres} />
      <div className="grid grid-cols-1 xl:grid-cols-3 pt-3  sm:px-32 md:px-28 lg:px-40">
        <div className="lg:col-span-2 xl:pr-14">
          <Cast movieActors={movieActors} />
          <Details movie={movieData} movieCountries={movieCountries} />
          <UserReviews />
          <TechnicalSpecs props={movieData} />
        </div>
        <div className="col-span-1 pt-5 flex flex-col gap-5">
          <span className="font-bold text-3xl">
            <span className="text-yellow-600">|</span> More to explore{" "}
          </span>
          <span className="font-semibold text-xl">
            Top 10 most rated movies on IMDb
          </span>
          <div>
            {imdbTop10.map((movie, index: number) => {
              return (
                <>
                <div className="flex justify-between py-2">
                  <span>
                    <span className="font-bold">{index+1}</span>. <span className="text-gray-700 hover:underline hover:cursor-pointer">{movie.title}</span>
                  </span>
                  <span className="text-gray-600">{movie.rating}</span>
                </div>
                <hr />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
