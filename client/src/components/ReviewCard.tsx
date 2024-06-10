const ReviewCard = ({review}: any) => {
  return (
    <div className="">
      <div className=" rounded-lg border border-gray-500 shadow p-3 w-full md:w-[700px]">
        <div className=" flex flex-col gap-2">
          <span className=" text-xl font-bold">{review.title}</span>
          <span>{review.description}</span>
          <span className=" text-blue-500">{review.date}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
