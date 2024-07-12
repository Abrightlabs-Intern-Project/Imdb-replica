import MovieSlider from "../components/common/MovieSlider";
import { useEffect, useState } from "react";
import { FC } from "react";
import axios from "axios";
import ActorSlider from "../components/Actor/ActorSlider";
import { Link, useNavigate } from "react-router-dom";
import LoadingLogo from "../components/common/LoadingLogo";

const Home: FC = () => {
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | unknown>(null);

  const navigate = useNavigate()
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/movies");
        const actorsData = await axios.get("http://localhost:3000/actor");
        setMovies(response.data);
        setActors(actorsData.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) return <LoadingLogo />

  return (
    <div className=" bg-black text-white">
      <div className="relative">
        <img src="https://m.media-amazon.com/images/G/01/IMDb/brand/guidelines/imdb/IMDb_BrandBanner_1920x425.jpg" alt="Promo Banner" className="w-full h-64 object-cover" />
        <div className="absolute top-0 left-0 w-full h-64 bg-black bg-opacity-90 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold text-yellow-600">Welcome to IMDb Replica</h1>
          <p className="mt-2 text-lg text-gray-200">Discover <span onClick={() => {
            navigate('movies')
          }} className="hover:underline hover:cursor-pointer">movies</span>, <span className="hover:underline hover:cursor-pointer" onClick={() => {
            navigate('actors')
          }}>actors</span>, and more!</p>
        </div>
      </div>

      <div className="flex flex-col pt-6 ">
        <span className="font-semibold text-xl pl-28 md:pl-32 lg:pl-48">
          <span className="text-yellow-400">|</span> Top picks{" "}
          <span className="text-yellow-400">&gt;</span>
        </span>
        <div className=" flex justify-center">
          <MovieSlider data={movies} />
        </div>
      </div>
      <div className="flex flex-col pt-6 gap-2  pl-28 md:pl-32 lg:pl-48">
        <span className="font-semibold text-xl">
          <span className="text-yellow-400">|</span> More To Watch{" "}
        </span>
        <span className=" text-gray-400 ">
          IMDb helps you to filter movies
        </span>
        <div className="flex gap-4">
          <Link to={`/genre-filter`}>
            <button className="border border-white px-4 py-1 rounded">
              Genre
            </button>
          </Link>
          <Link to={`/advanced-filter`}>
            <button className="border border-white px-4 py-1 rounded">
              Advanced
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col pt-6">
        <span className="font-semibold text-xl pl-28 md:pl-32 lg:pl-48">
          <span className="text-yellow-400">|</span> Fan Favorites{" "}
          <span className="text-yellow-400">&gt;</span>
        </span>
        <div className=" flex justify-center">
          <MovieSlider data={movies} />
        </div>
      </div>
      <div className="flex flex-col py-6">
        <span className="font-semibold text-xl pl-28 md:pl-32 lg:pl-48">
          <span className="text-yellow-400">|</span> Most Popular Actors{" "}
        </span>
        <div className=" flex justify-center">
          <ActorSlider actors={actors} />
        </div>
      </div>
      <div className="flex flex-col py-6">
        <span className="font-semibold text-xl pl-28 md:pl-32 lg:pl-48">
          <span className="text-yellow-400">|</span> Top 10 on IMDb this week{" "}
          <span className="text-yellow-400">&gt;</span>
        </span>
        <div className=" flex justify-center">
          <MovieSlider data={movies} />
        </div>
      </div>
    </div>
  );
};

export default Home;
