import { FC } from "react"
import ActorProfile from "./ActorProfile"

const Cast:FC<{movieActors: any}> = ({movieActors}) => {
  return (
    <div className="py-5 sm:px-32 md:px-28 lg:px-40">
      <div className=" px-2 flex flex-col gap-2">
        <div className=" text-2xl font-bold md:text-3xl">
          <span>
            <span className=" text-yellow-400">|</span> Cast
          </span>
        </div>
        <hr className="border-gray-400" />
        <div className=" flex flex-col gap-16 px-5 py-5 lg:flex-row">
            {movieActors.map((actor: any) => {
                return <ActorProfile url={actor.actor.imageUrl} name={actor.actor.actorName} />
            })}
        </div>
        <hr className="border-gray-400" />
      </div>
    </div>
  )
}

export default Cast