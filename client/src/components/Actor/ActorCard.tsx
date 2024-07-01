import { FC } from "react";

const ActorCard: FC<{ url: string; name: string }> = ({ url, name }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src={`data:image/jpeg;base64,${url}`}
        className="object-cover w-[70px] h-[70px] lg:w-[170px] lg:h-[170px] rounded-full object-top"
      />
      <span className=" text-lg font-semibold">{name}</span>
    </div>
  );
};

export default ActorCard;
