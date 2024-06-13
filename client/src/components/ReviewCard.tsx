import Star from "../../public/starr.png";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../ApolloClient/queries";
import { FC } from "react";

const ReviewCard: FC<{ review: any; id: any }> = ({ review, id }) => {
  const { user } = useAuthenticator();
  const email = user.signInDetails?.loginId;

  const [deleteReviewMutation] = useMutation(DELETE_REVIEW);

  return (
    <div className="">
      <div className="rounded-lg border border-gray-500 shadow p-3 w-full md:w-[700px] flex flex-col gap-2">
        <div className=" flex justify-between">
          <span className="text-blue-600 text-md">{review.userEmail}</span>
          {email === review.userEmail && (
            <button
              className="text-red-600"
              onClick={() => {
                deleteReviewMutation({
                  variables: { userEmail: email, imdbID: id },
                });
                window.location.reload();
              }}
            >
              Delete
            </button>
          )}
        </div>
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
