import { FC } from "react";
import { Link } from "react-router-dom";

const ActorCard: FC<{ url: string; name: string; actorId: string, page: boolean }> = ({ url, name, actorId, page }) => {
  const actorImageUrl = `https://movie-assets.s3.amazonaws.com/${url}`;

  return (
    <div className="flex flex-col items-center gap-2">
      <Link to={`https://main.d2cqlvazj6nhr8.amplifyapp.com/actor/${actorId}`}>
        <img
          src={actorImageUrl}
          className={`${page ? 'rounded-md h-[70px] w-[70px] lg:w-[200px] lg:h-[200px]' : 'rounded-full w-[70px] h-[70px] lg:w-[170px] lg:h-[170px]'} object-cover  object-top`}
        />
      </Link> 
      <span className={`${page ? 'text-white' : 'text-black'}`}>{name}</span>
    </div>
  );
};

export default ActorCard;
