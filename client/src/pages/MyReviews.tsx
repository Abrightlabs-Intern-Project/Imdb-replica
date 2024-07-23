import { useAuthenticator } from "@aws-amplify/ui-react";
import axios from "axios";
import { useEffect, useState } from "react";
import ReviewCard from "../components/Review/ReviewCard";
import { api_url } from "../context/WatchlistContext";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthenticator((context) => [context.user]);
  const userId = user.userId;

  const handleDelete = async (reviewId: string) => {
    axios.delete(`${api_url}/review/${reviewId}`);
  }

  const getReviews = async () => {
    try {
      const response = await axios.get(`${api_url}/review/user/${userId}`);
      setReviews(response.data);
    } catch (err) {
      console.log("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReviews();
  }, [userId]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center py-6">My Movie Reviews</h2>
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 p-6 justify-center items-center">
        {reviews.map((review: any) => (
          <div key={review.reviewId} className="bg-white shadow-md rounded-lg p-4 w-full md:w-[730px]">
            <ReviewCard review={review} id={null} />
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg font-semibold">
                Title:{" "}
                <span className="text-blue-600">{review.movie.title}</span>
              </span>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700" onClick={() => {
                handleDelete(review.reviewId)
              }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
