import { FC, useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const UserReviews: FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<any[]>();
  useEffect(() => {
    async function getReviews() {
      try {
        const res = await axios.get(`http://localhost:3000/review/${id}`);
        setReviews(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    getReviews();
  }, []);
  if (loading) return <p>Loading...</p>;

  return (
    <div className="py-5">
      <div className=" flex flex-col gap-4 px-1">
        <div className=" flex justify-between w-full">
          <span className=" text-2xl font-bold md:text-3xl">
            <span className=" text-yellow-400">|</span> User Review &gt;
          </span>
          <Link to={`/movie/${id}/review`}>
            <span className=" text-sm text-blue-700 font-semibold px-2 py-1 hover:bg-blue-100 hover:rounded">
              <span className=" text-xl">+</span> Review
            </span>
          </Link>
        </div>
        {reviews &&
          reviews.map((review: any) => {
            return (
              <ReviewCard key={review.userEmail} review={review} id={id} />
            );
          })}
      </div>
    </div>
  );
};

export default UserReviews;
