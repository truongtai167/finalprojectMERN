import React, { useEffect, useState } from "react";
import { Banner, Sidebar, BestPrice } from "../../components";
// import { apiGetPitches } from "../../apis/pitch";
const Home = () => {
 

  return (
    <div className="w-main flex">
      <div className="flex flex-col gap-5 w-[20%] flex-auto ">
        <Sidebar />
        <span>Deal daily </span>
      </div>
      <div className="flex flex-col gap-5 pl-5 w-[80%] flex-auto ">
        <Banner />
        <BestPrice />
      </div>
    </div>
  );
};

export default Home;
