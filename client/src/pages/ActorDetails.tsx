// import YouTube from "react-youtube"
import WatchlistMovieCard from "../components/Watchlist/WatchlistMovieCard";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Actor, Movie } from "../context/WatchlistContext";

const ActorDetails = () => {

  const [movies, setMovies] = useState<Movie[]>()
  const [actor, setActor] = useState<Actor>()
  
  const { id } = useParams()
  
  useEffect(() => {
    const get = async() => {
      const res = await axios.get(`http://localhost:3000/actor/${id}`)
      setMovies(res.data.movies)
      setActor(res.data)
      console.log(res.data, "---", res.data.movies)
    }
    get()
  }, [id])

  // function getYouTubeVideoId(url: string) {
  //   const urlObj = new URL(url);
  //   let videoId = urlObj.searchParams.get("v");
  //   if (!videoId && urlObj.hostname === "youtu.be") {
  //     videoId = urlObj.pathname.substring(1);
  //   }
  //   return videoId;
  // }

  // const opts = {
  //   width: "100%",
  //   height: "100%",
  // };

  return (
    <div className="">
        <header className="bg-[#262a29] py-5 px-1 sm:px-32 md:px-28 lg:px-40 flex flex-col text-gray-200  gap-3">
            <span className="text-3xl font-semibold  ">{actor && actor.actorName}</span>
            <span>Actor</span>
            <div className="flex gap-10">
                <img className="object-cover w-[150px] h-[150px] lg:w-[360px] lg:h-[360px] object-top" src={`https://movie-assets.s3.amazonaws.com/${actor && actor.imageUrl}`} alt="" />
                {/* {movies&&<YouTube
                videoId={getYouTubeVideoId(movies[0].trailer)}
                style={{ width: "100%"}}
                opts={opts}
                />} */}
            </div>
        </header>
        <div className="px-1 text-3xl font-semibold sm:px-32 md:px-28 lg:px-40 py-5">
            <span className="text-yellow-700">|</span> Known For{" "}
        </div>
        <div className="px-1 sm:px-32 md:px-28 lg:px-40 mb-5 flex gap-10 flex-wrap">
          {movies && movies.map(movie => { return  <WatchlistMovieCard movie={movie} actor={true} />})}
        </div>
    </div>
  )
}

export default ActorDetails