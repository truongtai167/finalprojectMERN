import React from "react";
import banner from "../assets/banner.jpg";

const Banner = () => {
  return (
    <div className="w-full">
      <img
        src={banner}
        alt="banner"
        className="h-[420px] w-full object-cover"
      ></img>
    </div>
  );
};

export default Banner;
