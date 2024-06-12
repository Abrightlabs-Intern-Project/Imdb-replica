import { FC } from "react";
import ReviewCard from "./ReviewCard";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_REVIEW } from "../ApolloClient/queries";

const UserReviews: FC = () => {
  const { id } = useParams();

  const {loading, error, data} = useQuery(GET_REVIEW, {variables: {imdbID: id}})

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  const reviews = data?.getReviews;

  return (
    <div className="sm:px-32 md:px-28 lg:px-40 py-5">
      <div className=" flex flex-col gap-4 px-1">
        <div className=" flex justify-between w-full md:w-[700px]">
          <span className=" text-2xl font-bold md:text-3xl">
            <span className=" text-yellow-400">|</span> User Review &gt;
          </span>
          <Link to={`/movie/${id}/review`}>
            <span className=" text-sm text-blue-700 font-semibold px-2 py-1 hover:bg-blue-100 hover:rounded">
              <span className=" text-xl">+</span> Review
            </span>
          </Link>
        </div>
        {reviews.map((review: any) => {
          return <ReviewCard review={review} />;
        })}
      </div>
    </div>
  );
};

export default UserReviews;
