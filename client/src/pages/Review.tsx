import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_MOVIE, ADD_REVIEW } from "../ApolloClient/queries";
import { useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";

const Review = () => {
  const [rating, setRating] = useState<number>();
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();

  const { user } = useAuthenticator((context) => [context.user]);

  const [addReviewMutation] = useMutation(ADD_REVIEW);

  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { imdbID: id },
  });

  const handleRatingChange = (value: string) => {
    setRating(+value);
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await addReviewMutation({
      variables: { userEmail: user, imdbID: id, rating, title, description },
    });
    console.log(result);
    try {
      const result = await addReviewMutation({
        variables: { userEmail: user, imdbID: id, rating, title, description },
      });
      if (result) {
        alert("Review submitted successfully!");
        setRating(0);
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.log("error");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const movie = data?.getMovie;
  return (
    <div className="px-3 py-10 lg:px-80 bg-[#f8f4f4] flex flex-col gap-4">
      <div className=" flex gap-3 ">
        <img className=" h-32" src={movie.poster} alt="" />
        <div className=" flex flex-col gap-3">
          <span className=" text-xl font-semibold">{movie.title}</span>
          <hr />
          <span className=" text-xl font-semibold">Add an item</span>
        </div>
      </div>
      <form className="form flex flex-col gap-3" onSubmit={handleSubmit}>
        <span className=" text-gray-700">YOUR RATING</span>
        <div>
          <input
            className=" border border-gray-700 rounded px-2 py-1"
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
        <span className=" text-gray-700">YOUR REVIEW</span>
        <div className=" flex flex-col gap-4">
          <input
            className=" px-2 py-1 border border-gray-500 rounded"
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
        <button className=" border border-gray-500 bg-white px-2 py-1 rounded w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Review;
