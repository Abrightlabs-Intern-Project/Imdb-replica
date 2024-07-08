import { FC } from "react";
import ActorProfile from "./MovieActor";

const Cast: FC<{ movieActors: any }> = ({ movieActors }) => {
  return (
    <div className="py-5">
      <div className=" px-2 flex flex-col gap-2">
        <div className=" text-2xl font-bold md:text-3xl">
          <span>
            <span className=" text-yellow-400">|</span> Cast
          </span>
        </div>
        <hr className="border-gray-400" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 py-5">
          {movieActors.map((actor: any) => {
            return <ActorProfile url={actor.imageUrl} name={actor.actorName} actorId={actor.actorId} />;
          })}
        </div>
        <hr className="border-gray-400" />
      </div>
    </div>
  );
};
export default Cast;
