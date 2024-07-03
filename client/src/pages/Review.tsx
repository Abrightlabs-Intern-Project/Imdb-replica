import { useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Movie } from "../context/WatchlistContext";
import LoadingLogo from "../components/common/LoadingLogo";

const Review = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState<boolean>(true);

  const { user } = useAuthenticator((context) => [context.user]);
  const userId = user.userId;

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const movie = await axios.get(`http://localhost:3000/movies/${id}`);
        setMovie(movie.data);
      } finally {
        setLoading(false);
      }
    };
    getMovieDetails();
  }, [id]);

  const handleRatingChange = (value: string) => {
    setRating(value);
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3000/review", {
        userId,
        movieId: id,
        rating,
        title,
        description,
      });
      setRating("");
      setTitle("");
      setDescription("");
      navigate("redirect");
    } catch (error) {
      console.log("error", error);
    }
  };

  if (loading) return <LoadingLogo />

  const posterUrl = `https://movie-assets.s3.amazonaws.com/${movie?.poster}`

  return (
    <div className="px-3 py-10 lg:px-80 bg-[#f8f4f4] flex flex-col gap-4">
      <div className="flex gap-3">
        <img className="h-32" src={posterUrl} alt="" />
        <div className="flex flex-col gap-3">
          <span className="text-xl font-semibold">{movie?.title}</span>
          <hr />
          <span className="text-xl font-semibold">Add a review</span>
        </div>
      </div>
      <form className="form flex flex-col gap-3" onSubmit={handleSubmit}>
        <span className="text-gray-700">YOUR RATING</span>
        <div>
          <input
            className="border border-gray-700 rounded px-2 py-1"
            type="number"
            id="quantity"
            name="quantity"
            min="0"
            max="10"
            onChange={(event) => {
              handleRatingChange(event.target.value);
            }}
          />
        </div>
        <span className="text-gray-700">YOUR REVIEW</span>
        <div className="flex flex-col gap-4">
          <input
            className="px-2 py-1 border border-gray-500 rounded"
            type="text"
            placeholder="Write a headline for your review here"
            onChange={(event) => {
              handleTitleChange(event.target.value);
            }}
          />
          <textarea
            className="px-2 py-1 border border-gray-500 rounded h-[200px]"
            name=""
            id=""
            placeholder="Write your review here"
            onChange={(event) => {
              handleDescriptionChange(event.target.value);
            }}
          ></textarea>
        </div>
        <button className="border border-gray-500 bg-white px-2 py-1 rounded w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Review;
