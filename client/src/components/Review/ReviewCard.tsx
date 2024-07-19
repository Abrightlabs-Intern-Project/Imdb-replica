import Star from "../../../public/starr.png";
import { useAuthenticator } from "@aws-amplify/ui-react";
// import axios from "axios";
import { FC } from "react";

const ReviewCard: FC<{ review: any; id: any }> = ({ review, id }) => {
  // const { user } = useAuthenticator();
  // const userId = user.userId;

  // const deleteReview = async() => {
  //   try {
  //     await axios.delete(`http://localhost:3000/review/${userId}/${id}`)
  //   } catch (error) {
  //     console.log("error deleting review", error)
  //   }
  // }

  return (
    <div className="">
      <div className="rounded-lg border border-gray-100 shadow p-3 w-full flex flex-col gap-2">
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
        <div className=" flex justify-between">
        </div>
      </div>
      {id !== null && 
        <div className="flex">
          <span className="text-blue-600 text-md px-2">{review.user.userName} • </span>
          <span>{review.createdAt.split("T")[0]}</span>
        </div>
      }
    </div>
  );
};

export default ReviewCard;
