import { FC } from "react"
import { Movie } from "../context/WatchlistContext"

const Details:FC<{props: Movie}> = ({props}) => {

  return (
    <div className=" py-10 sm:px-32 md:px-28 lg:px-40">
        <div className=" px-2 flex flex-col gap-2">
            <div className=" text-2xl font-bold md:text-3xl">
                <span><span className=" text-yellow-400">|</span> Details</span>
            </div>
            <hr className="border-gray-400" />
            <div className=" flex px-2 gap-2">
                <span className=" text-black font-semibold text-sm md:text-base">Release Date</span>
                <span className=" text-blue-500 text-sm md:text-base">{props.released}</span>
            </div>
            <hr className="border-gray-400" />
            <div className=" flex px-2 gap-2">
                <span className=" text-black font-semibold text-sm md:text-base">Country of Orgin</span>
                <span className=" text-blue-500 text-sm md:text-base">{props.country}</span>
            </div>
            <hr className="border-gray-400" />
            <div className=" flex px-2 gap-2">
                <span className=" text-black font-semibold text-sm md:text-base">Languages</span>
                <span className=" text-blue-500 text-sm md:text-base">{props.language}</span>
            </div>
            <hr className="border-gray-400" />
            <div className=" flex px-2 gap-2">
                <span className=" text-black font-semibold text-sm md:text-base">Production companies</span>
                <span className=" text-blue-500 text-sm md:text-base">{props.production}</span>
            </div>
            <hr className="border-gray-400" />
            <div className=" flex px-2 gap-2">
                <span className=" text-black font-semibold text-sm md:text-base">Official sites</span>
                <span className=" text-blue-500 text-sm md:text-base">{props.website}</span>
            </div>
            <hr className="border-gray-400" />
        </div>
    </div>
  )
}

export default Details