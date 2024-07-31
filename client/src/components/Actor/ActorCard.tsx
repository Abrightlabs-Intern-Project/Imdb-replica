import { FC } from "react";
import { Link } from "react-router-dom";

const ActorCard: FC<{ url: string; name: string; actorId: string, page: boolean }> = ({ url, name, actorId, page }) => {
  const actorImageUrl = `https://movie-assets.s3.amazonaws.com/${url}`;

  return (
    <div className="flex flex-col items-center gap-2">
      <Link to={`https://main.d2cqlvazj6nhr8.amplifyapp.com/actor/${actorId}`}>
        <img
          src={actorImageUrl}
          className={`${page ? 'rounded-md h-[100px] w-[100px] sm:h-[125px] sm:w-[125px] md:h-[150px] md:w-[150px] lg:w-[200px] lg:h-[200px]' : 'rounded-full w-[100px] h-[100px] sm:h-[125px] sm:w-[125px] md:h-[150px] md:w-[150px] lg:w-[170px] lg:h-[170px]'} object-cover  object-top`}
        />
      </Link> 
      <span className={`${page ? 'text-white' : 'text-black'}`}>{name}</span>
    </div>
  );
};

export default ActorCard;
