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
import defaultImage from "../../assets/Coming_Soon.png";
const { MdArrowRight } = icons;

const Home = () => {
  const { newPitches } = useSelector((state) => state.pitches);
  // console.log("pitches", newPitches);
  const { categories } = useSelector((state) => state.app);
  const { isLoggedIn, current } = useSelector((state) => state.user);
  // console.log({isLoggedIn, current});
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
      <div className="my-8 w-full">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
          HOT PITCHES
        </h3>
        <div className="flex flex-wrap gap-4 mt-4">
          {categories
            ?.filter((el) => el.brands.length > 0)
            .map((el) => (
              <div key={el._id} className="w-[680px]">
                <div className="border flex">
                  <img
                    src={el?.image || defaultImage}
                    alt="picture category"
                    className="w-[250px] flex-1 h-[250px] object-cover"
                  />
                  <div className="flex-1 text-black-700">
                    <h4 className="font-semibold uppercase ml-10 mt-3">
                      {el.title}
                    </h4>
                    <ul className="text-sm mt-4 ml-4 text-base ">
                      {el?.brands?.map((item) => (
                        <span key={item} className="flex gap-1 items-center">
                          <MdArrowRight size={14} />
                          <li>{item}</li>
                        </span>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="w-full h-[500px]"></div>
    </>
  );
};

export default Home;
