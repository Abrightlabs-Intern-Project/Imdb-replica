import { FC } from "react";
import Star from "../../public/starr.png"
import { Movie } from "../context/WatchlistContext";

const MovieHeader:FC<{props: Movie}> = ({props}) => {
  return (
    <div className="bg-[#262a29] p-4 sm:px-32 md:px-28 lg:px-40">
      <div className=" flex flex-col gap-2">
        <span className=" text-white text-4xl">{props.title}</span>
        <span className=" text-gray-400">{props.year} - {props.rated} - {props.runtime}</span>
      </div>
      <div className=" flex py-2 justify-center">
        <img className="md:h-96" src={props.poster} alt="" />
        <span className="hidden md:block text-white px-4 text-xs sm:text-sm md:text-md lg:text-lg text-justify">{props.plot}</span>
      </div>
      <hr className="border-gray-600" />
      <div className="flex gap-2 py-2">
        <img className="h-6" src={Star} alt="" />
        <span className="text-white">{props.imdbRating}</span>
      </div>
      <hr className="border-gray-600" />
      <div className=" flex gap-2 py-2 px-1">
        <span className="text-white text-sm font-semibold">Director</span>
        <span className=" text-blue-500 text-sm">{props.director}</span>
      </div>
      <hr className="border-gray-600" />
      <div className=" flex gap-2 py-2 px-1">
        <span className=" text-white text-sm font-semibold">Writer</span>
        <span className=" text-blue-500 text-sm">{props.writer}</span>
      </div>
      <hr className="border-gray-600" />
      <div className=" flex gap-2 py-2 px-1">
        <span className=" text-gray-400 text-sm font-semibold">Stars</span>
        <span className=" text-blue-500 text-sm ">{props.actors}</span>
      </div>
      <hr className="border-gray-600" />
    </div>
  );
};

export default MovieHeader;
