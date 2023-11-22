import React, { useState, useEffect } from "react";
import { apiGetPitches } from "../apis/pitch";
import { Pitch } from "./";
import Slider from "react-slick";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
const tabs = [
  { id: 1, name: "best price" },
  { id: 2, name: "new pitches" },
];
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const BestPrice = () => {
  const [bestPrices, setbestPrices] = useState([]);
  const [newPitches, setnewPitches] = useState([]);
  const [activedTab, setactivedTab] = useState(1);
  const [pitchs, setpitchs] = useState([]);

  const fetchPitches = async () => {
    const response = await Promise.all([
      apiGetPitches({ sort: "--price" }),
      apiGetPitches({ sort: "-createdAt" }),
    ]);
    console.log("API Response:", response);
    if (response[0]?.success) {
      setbestPrices(response[0].pitches);
      setpitchs(response[0].pitches);
    }
    if (response[1]?.success) setnewPitches(response[1].pitches);
    setpitchs(response[0].pitches);
  };
  useEffect(() => {
    fetchPitches();
  }, []);
  useEffect(() => {
    if (activedTab === 1) setpitchs(bestPrices);
    if (activedTab === 2) setpitchs(newPitches);
  }, [activedTab]);

  return (
    <div>
      <div className="flex text-[20px] gap-8 pb-4 border-b-2 border-main">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`font-bold capitalize border-r cursor-pointer text-gray-400 ${
              activedTab === el.id ? "text-red-600" : ""
            }`}
            onClick={() => setactivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-4">
        <Slider {...settings}>
          {pitchs?.map((el) => (
            <Pitch
              key={el._id}
              pitchData={el}
              isNew={activedTab === 1 ? false : true}
            ></Pitch>
          ))}
        </Slider>
      </div>
      <div className="w-full flex gap-4 mt-8">
        <img
          src={banner1}
          alt="banner"
          className="flex-1 h-[400px] w-[100px] object-contain"
        />
        <img
          src={banner2}
          alt="banner"
          className="flex-1 h-[400px] w-[100px] object-contain"
        />
      </div>
    </div>
  );
};

export default BestPrice;
