import { FC } from "react";
import Star from "../../../public/starr.png";
import { Actor, Director, Movie, Writer } from "../../context/WatchlistContext";
import YouTube from "react-youtube";
import Blur from "../../../public/black-blur.jpg";

const MovieHeader: FC<{movie: Movie; movieActors: Actor[]; movieDirectors: Director[]; movieWriters: Writer[];}> = ({ movie, movieActors, movieDirectors, movieWriters }) => {

  function getYouTubeVideoId(url: string) {
    const urlObj = new URL(url);
    let videoId = urlObj.searchParams.get("v");
    if (!videoId && urlObj.hostname === "youtu.be") {
      videoId = urlObj.pathname.substring(1);
    }
    return videoId;
  }

  const videoId = getYouTubeVideoId(movie.trailer);

  const opts = {
    width: "100%",
    height: "100%",
  };

  const posterUrl = `https://movie-assets.s3.amazonaws.com/${movie.poster}`;

  return (
    <div className="relative">
      <img src={Blur} alt="Promo Banner" className="w-full h-full object-cover absolute top-0 left-0" />
      <div className="relative p-4 sm:px-32 md:px-28 lg:px-40 w-full">
        <div className="flex flex-col gap-2">
          <span className="text-white text-4xl">{movie.title}</span>
          <span className="text-gray-400">
            {movie.year} - {movie.rated} - {movie.runtime}
          </span>
        </div>
        <div className="flex flex-col py-2 gap-8 md:flex-row">
          <img className="w-72" src={posterUrl} alt="" />
          {videoId && (
            <div style={{ width: "100%" }}>
              <YouTube
                videoId={videoId}
                opts={opts}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          )}
        </div>
        <hr className="border-gray-600" />
        <div className="flex gap-2 py-2">
          <img className="h-6" src={Star} alt="" />
          <span className="text-white">{movie.rating}</span>
        </div>
        {movieDirectors.length !== 0 && <hr className="border-gray-600" />}
        {movieDirectors.length !== 0 && <div className="flex gap-2 py-2 px-1">
          <span className="text-white text-sm font-semibold">Director</span>
          <span className="text-[#5799EF] text-sm">
            {movieDirectors.map((director: Director, index: number) => {
              return <span>{director.directorName} {index !== movieDirectors.length - 1 && <span>•</span>} </span>;
            })}
          </span>
        </div>}
        {movieWriters.length !== 0 && <hr className="border-gray-600" />}
        {movieWriters.length !== 0 && <div className="flex gap-2 py-2 px-1">
          <span className="text-white text-sm font-semibold">Writer</span>
          <span className="text-blue-500 text-sm">
            {movieWriters.map((writer: Writer, index: number) => {
              return <span>{writer.writerName} {index !== movieWriters.length - 1 && <span>•</span>} </span>;
            })}
          </span>
        </div>}
        <hr className="border-gray-600" />
        <div className="flex gap-2 py-2 px-1">
          <span className="text-gray-400 text-sm font-semibold">Stars</span>
          <span className="text-blue-500 text-sm">
            {movieActors.map((actor: Actor, index: number) => {
              return <span>{actor.actorName} {index !== movieActors.length - 1 && <span>•</span>} </span>;
            })}
          </span>
        </div>
        <hr className="border-gray-600" />
      </div>
    </div>
  );
};

export default MovieHeader;
