import { FC } from "react";
import Star from "../../../public/starr.png";
import { Movie } from "../../context/WatchlistContext";
import YouTube from "react-youtube";

const MovieHeader: FC<{
  movie: Movie;
  movieActors: any;
  movieDirectors: any;
  movieWriters: any;
}> = ({ movie, movieActors, movieDirectors, movieWriters }) => {
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
    // playerVars: {
    //   autoplay: 1,
    // }, 
  };

  return (
    <div className="bg-[#262a29] p-4 sm:px-32 md:px-28 lg:px-40">
      <div className="flex flex-col gap-2">
        <span className="text-white text-4xl">{movie.title}</span>
        <span className="text-gray-400">
          {movie.year} - {movie.rated} - {movie.runtime}
        </span>
      </div>
      <div className="flex flex-col py-2 gap-8 md:flex-row">
        <img className="w-72" src={`data:image/jpeg;base64,${movie.poster}`} alt="" />
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
      <hr className="border-gray-600" />
      <div className="flex gap-2 py-2 px-1">
        <span className="text-white text-sm font-semibold">Director</span>
        <span className="text-blue-500 text-sm">
          {movieDirectors.map((director: any) => {
            return <span>{director.directorName} • </span>;
          })}
        </span>
      </div>
      <hr className="border-gray-600" />
      <div className="flex gap-2 py-2 px-1">
        <span className="text-white text-sm font-semibold">Writer</span>
        <span className="text-blue-500 text-sm">
          {movieWriters.map((writer: any) => {
            return <span>{writer.writerName} • </span>;
          })}
        </span>
      </div>
      <hr className="border-gray-600" />
      <div className="flex gap-2 py-2 px-1">
        <span className="text-gray-400 text-sm font-semibold">Stars</span>
        <span className="text-blue-500 text-sm">
          {movieActors.map((actor: any) => {
            return <span>{actor.actorName} • </span>;
          })}
        </span>
      </div>
      <hr className="border-gray-600" />
    </div>
  );
};

export default MovieHeader;
