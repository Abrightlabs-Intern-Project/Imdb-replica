import TwitterLogo from "../../public/icons8-twitter-48.png";
import FacebookLogo from "../../public/icons8-facebook-48.png";
import InstaLogo from "../../public/icons8-instagram-48.png";
import YoutubeLogo from "../../public/icons8-youtube-48.png";
import { FC } from "react";

const Footer:FC = () => {
  return (
    <div className="bg-black text-white flex flex-col items-center gap-4 py-4">
      <div className="follow flex flex-col gap-2">
        <span>Follow IMDb on social</span>
        <div className="flex gap-3 px-2">
          <img className="h-6" src={TwitterLogo} alt="" />
          <img className="h-6" src={FacebookLogo} alt="" />
          <img className="h-6" src={InstaLogo} alt="" />
          <img className="h-6" src={YoutubeLogo} alt="" />
        </div>
      </div>
      <div className=" flex flex-col items-center gap-5 sm:flex-row">
        <span>Help</span>
        <span>Site Index</span>
        <span>IMDbPro</span>
        <span>Box Office Mojo</span>
        <span>License IMDb Data</span>
      </div>
      <div className=" flex flex-col md:flex-row gap-4">
        <div className=" flex flex-col items-center justify-center sm:flex-row gap-5">
          <span>Press Room</span>
          <span>Advertising</span>
          <span>Jobs</span>
        </div>
        <div className="flex flex-col items-center justify-center sm:flex-row gap-5">
          <span>Conditions of Use</span>
          <span>Privacy Policy</span>
          <span>Your Ads Privacy Choices</span>
        </div>
      </div>
      <div>
        <span>an amazon company</span>
      </div>
      <div>
        <span>1990-2024 by IMDb.com, Inc.</span>
      </div>
    </div>
  );
};

export default Footer;
