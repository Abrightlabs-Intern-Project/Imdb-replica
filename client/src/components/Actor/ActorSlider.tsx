import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../common/SlickSlider.css";
import { FC, useEffect, useState } from "react";
import ActorCard from "./ActorCard";
import { Actor } from "../../context/WatchlistContext";

const ActorSlider: FC<{ actors: Actor[] }> = ({ actors }) => {
  const [slidesToShow, setSlidesToShow] = useState(5);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: slidesToShow,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 10000,
    arrows : false,
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 375px)").matches) {
        setSlidesToShow(1);
      } else if (window.matchMedia("(max-width: 640px)").matches) {
        setSlidesToShow(2);
      } else if (window.matchMedia("(max-width: 900px)").matches) {
        setSlidesToShow(3);
      } else if (window.matchMedia("(max-width: 1200px)").matches) {
        setSlidesToShow(4);
      } else if (window.matchMedia("(max-width: 1400px)").matches) {
        setSlidesToShow(5);
      } else {
        setSlidesToShow(6);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return (
    <Slider {...settings} className=" w-[80%]">
      {actors.map((actor: Actor, index: number) => (
        <div key={index}>
          <ActorCard url={actor.imageUrl} name={actor.actorName} actorId={actor.actorId} page={false}/>
        </div>
      ))}
    </Slider>
  );
};

export default ActorSlider;
