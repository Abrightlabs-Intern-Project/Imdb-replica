import SlickSlider from "../components/SlickSlider";
import { useQuery } from '@apollo/client';
import { GET_MOVIES } from "../ApolloClient/queries";
import { FC } from "react";

const Home:FC = () => {

  const { loading, error, data } = useQuery(GET_MOVIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  const movies = data?.movies;
  
  return (  
    <div className=" bg-black text-white">
      <div className="flex flex-col items-center justify-center pt-6">
        <span className="font-semibold text-xl">
          <span className="text-yellow-400">|</span> Top picks{" "}
          <span className="text-yellow-400">&gt;</span>
        </span>
        <SlickSlider data={movies} />
      </div>
      <div className="flex flex-col items-center justify-center pt-6">
        <span className="font-semibold text-xl">
          <span className="text-yellow-400">|</span> Fan Favorites{" "}
          <span className="text-yellow-400">&gt;</span>
        </span>
        <SlickSlider data={movies} />
      </div>
      <div className="flex flex-col items-center justify-center py-6">
        <span className="font-semibold text-xl">
          <span className="text-yellow-400">|</span> Top 10 on IMDb this week{" "}
          <span className="text-yellow-400">&gt;</span>
        </span>
        <SlickSlider data={movies} />
      </div>
    </div>
  );
};

export default Home;
