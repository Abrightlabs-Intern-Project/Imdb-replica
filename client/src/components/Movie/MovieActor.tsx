import { FC } from "react";

const MovieActor: FC<{ url: string; name: string }> = ({ url, name }) => {
  const imageUrl = `https://movie-assets.s3.amazonaws.com/${url}`
  return (
    <div className="flex items-center flex-col justify-center gap-3">
        <img
          src={imageUrl}
          className="object-cover w-[70px] h-[70px] lg:w-[100px] lg:h-[100px] rounded-full"
        />
        <span className=" text-lg font-semibold">{name}</span>
    </div>
  );
};

export default MovieActor;
