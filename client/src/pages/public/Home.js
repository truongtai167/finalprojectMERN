import React from "react";
import {
  Banner,
  Sidebar,
  BestPrice,
  DealDaily,
  FeaturePitches,
  CustomSlider,
} from "../../components";
import { useSelector } from "react-redux";
import icons from "../../ultils/icons";
const { IoIosArrowForward } = icons;
const Home = () => {
  const { newPitches } = useSelector((state) => state.pitchs);
  const { categories } = useSelector((state) => state.app);
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
      <div className="my-8 my-8">
        <FeaturePitches />
      </div>
      <div className="my-8 w-main ">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main my-8">
          NEW ARRIVALS
        </h3>
        <div className="w-full mt-4 mr-0 ml-0">
          <CustomSlider pitches={newPitches}></CustomSlider>
        </div>
      </div>
      <div className="w-full h-[500px]"></div>
    </>
  );
};

export default Home;
