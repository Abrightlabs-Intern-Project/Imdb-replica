import { FC } from "react";
import { Movie } from "../../context/WatchlistContext";

const TechnicalSpecs:FC<{props: Movie}> = ({props}) => {

  return (
    <div className=" py-5 sm:px-32 lg:px-40">
      <div>
        <div className=" pb-2">
          <span className=" text-2xl font-bold md:text-3xl">
            <span className=" text-yellow-400">|</span> Technical Specs &gt;
          </span>
        </div>
        <hr className="border-gray-400" />
        <div className=" flex gap-2 p-2">
          <span className=" text-sm md:text-base font-semibold">Runtime</span>
          <span className=" text-sm md:text-base">{props.runtime}</span>
        </div>
        <hr className="border-gray-400" />
        <div className=" flex gap-2 p-2">
          <span className=" text-sm md:text-base font-semibold">Color</span>
          <span className=" text-sm md:text-base text-blue-500">Color</span>
        </div>
        <hr className="border-gray-400" />
        <div className=" flex gap-2 p-2">
          <span className=" text-sm md:text-base font-semibold">
            Box Office
          </span>
          <span className=" text-sm md:text-base text-blue-500">
            {props.boxOffice}
          </span>
        </div>
        <hr className="border-gray-400" />
        <div className=" flex gap-2 p-2">
          <span className=" text-sm md:text-base font-semibold">
            Aspect ratio
          </span>
          <span className=" text-sm md:text-base">2.39 : 1</span>
        </div>
        <hr className="border-gray-400" />
      </div>
    </div>
  );
};

export default TechnicalSpecs;
