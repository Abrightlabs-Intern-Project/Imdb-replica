import Star from "../../public/starr.png";

const ReviewCard = ({ review }: any) => {
  return (
    <div className="">
      <div className="rounded-lg border border-gray-500 shadow p-3 w-full md:w-[700px] flex flex-col gap-2">
        <span className="text-blue-600 text-md">{review.userEmail}</span>
        <hr />
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span className=" text-xl font-bold">{review.title}</span>
            <div className="flex">
              <img className="h-6" src={Star} alt="" />
              <span className="">{review.rating}</span>
            </div>
          </div>
          <span>{review.description}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
