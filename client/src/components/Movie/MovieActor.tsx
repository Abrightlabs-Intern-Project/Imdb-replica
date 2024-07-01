import { FC } from "react";

const MovieActor: FC<{ url: string; name: string }> = ({ url, name }) => {
  return (
    <div className=" flex items-center gap-3">
        <img
          src={`data:image/jpeg;base64,${url}`}
          className="object-cover w-[70px] h-[70px] lg:w-[100px] lg:h-[100px] rounded-full"
        />
      <span className=" text-lg font-semibold">{name}</span>
    </div>
  );
};

export default MovieActor;
