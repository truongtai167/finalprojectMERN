import React from "react";
import {
  Banner,
  Sidebar,
  BestPrice,
  DealDaily,
  FeaturePitches,
} from "../../components";
// import { apiGetPitches } from "../../apis/pitch";
const Home = () => {
  return (
    <>
      <div className="w-main flex">
        <div className="flex flex-col gap-5 w-[20%] flex-auto ">
          <Sidebar />
          <DealDaily />
        </div>
        <div className="flex flex-col gap-5 pl-5 w-[80%] flex-auto ">
          <Banner />
          <BestPrice />
        </div>
      </div>
      <div className="my-8">
        <FeaturePitches />
      </div>
      <div className="w-full h-[500px]"></div>
    </>
  );
};

export default Home;
