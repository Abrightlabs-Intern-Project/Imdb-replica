import { FC } from "react";
import { Link } from "react-router-dom";

const MovieActor: FC<{ url: string; name: string; actorId: string }> = ({ url, name, actorId }) => {
  const imageUrl = `https://movie-assets.s3.amazonaws.com/${url}`
  return (
    <div className="flex items-center flex-col justify-center gap-3">
      <Link to={`http://localhost:5173/actor/${actorId}`}>
        <img
          src={imageUrl}
          className="object-cover w-[70px] h-[70px] lg:w-[100px] lg:h-[100px] rounded-full hover:cursor-pointer"
        />
      </Link>
      <span className=" text-lg font-semibold">{name}</span>
    </div>
  );
};

export default MovieActor;
