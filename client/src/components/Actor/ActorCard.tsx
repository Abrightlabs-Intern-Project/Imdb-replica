import { FC } from "react";
import { Link } from "react-router-dom";

const ActorCard: FC<{ url: string; name: string; actorId: string }> = ({ url, name, actorId }) => {
  const actorImageUrl = `https://movie-assets.s3.amazonaws.com/${url}`;

  return (
    <div className="flex flex-col items-center gap-2">
      <Link to={`http://localhost:5173/actor/${actorId}`}>
        <img
          src={actorImageUrl}
          className="object-cover w-[70px] h-[70px] lg:w-[170px] lg:h-[170px] rounded-full object-top"
        />
      </Link>
      <span className=" text-lg font-semibold">{name}</span>
    </div>
  );
};

export default ActorCard;
