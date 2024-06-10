import { FC } from "react";
import ReviewCard from "./ReviewCard";

const UserReviews:FC = () => {
  const reviews = [
    {
      title: "Generation defining.",
      description:
        "The 20th Century had Casablanca, Star Wars, the Godfather, Blade Runner, and others - this is the first of the 21st Century masterpieces. Truly in awe at how amazing this movie is, an astounding show of all aspects of films. Amazing story and cinematography accompanied with actors worthy of telling the tale. Remarkable and breathtaking.",
      date: "Nov 15, 2021",
    },
    {
      title: "Generation defining.",
      description:
        "The 20th Century had Casablanca, Star Wars, the Godfather, Blade Runner, and others - this is the first of the 21st Century masterpieces. Truly in awe at how amazing this movie is, an astounding show of all aspects of films. Amazing story and cinematography accompanied with actors worthy of telling the tale. Remarkable and breathtaking.",
      date: "Nov 15, 2021",
    },
    {
      title: "Generation defining.",
      description:
        "The 20th Century had Casablanca, Star Wars, the Godfather, Blade Runner, and others - this is the first of the 21st Century masterpieces. Truly in awe at how amazing this movie is, an astounding show of all aspects of films. Amazing story and cinematography accompanied with actors worthy of telling the tale. Remarkable and breathtaking.",
      date: "Nov 15, 2021",
    },
    {
      title: "Generation defining.",
      description:
        "The 20th Century had Casablanca, Star Wars, the Godfather, Blade Runner, and others - this is the first of the 21st Century masterpieces. Truly in awe at how amazing this movie is, an astounding show of all aspects of films. Amazing story and cinematography accompanied with actors worthy of telling the tale. Remarkable and breathtaking.",
      date: "Nov 15, 2021",
    },
  ];

  return (
    <div className="sm:px-32 md:px-28 lg:px-40 py-5">
      <div className=" flex flex-col gap-4 px-1">
        <span className=" text-2xl font-bold md:text-3xl">
          <span className=" text-yellow-400">|</span> User Review &gt;
        </span>
        {reviews.map((review) => {
          return <ReviewCard review={review}/>;
        })}
      </div>
    </div>
  );
};

export default UserReviews;
