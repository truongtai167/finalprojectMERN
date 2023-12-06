import React, { useState, useEffect } from "react";
import { PitchCard } from "..";
import { apiGetPitches } from "../../apis/pitch";
import banner3 from "../../assets/banner3.png";
import banner4 from "../../assets/banner4.jpg";
import banner5 from "../../assets/banner5.png";
import banner6 from "../../assets/banner6.jpg";
import banner7 from "../../assets/banner7.jpg";
const FeaturePitches = () => {
  const [pitches, setpitches] = useState(null);

  const fetchPitches = async () => {
    const response = await apiGetPitches({
      limit: 9,
      page: Math.round(Math.random() * 2),
    });
    if (response.success) setpitches(response.pitches);
  };
  useEffect(() => {
    fetchPitches();
  }, []);
  return (
    <div className="w-full">
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
        FEATURED PITCHES
      </h3>
      <div className="flex flex-wrap mt-[15px] mx-[-10px]">
        {pitches?.map((el) => (
          <PitchCard
            key={el._id}
            image={el.images[0]}
            name={el.name}
            totalRatings={el.totalRatings}
            price={el.price}
          ></PitchCard>
        ))}
      </div>
      {/* <div className="flex justify-between">
        <img src={banner5} className="w-[40%] h-[380px]"></img>

        <div className="flex flex-col justify-between h-full w-[24%]">
          <img src={banner4} className="w-[100%] object-contain"></img>
          <img
            src={banner3}
            className="w-[100%] h-[200px] object-contain"
          ></img>
        </div>
        <img src={banner6} className="w-[35%] h-[380px]"></img>
      </div>
    </div> */}
      <div className="grid grid-cols-3 grid-rows-2 gap-4">
        <img
          src={banner5}
          className="w-full h-full object-cover col-span-2 row-span-2"
          alt="Banner 5"
        ></img>
        <img
          src={banner4}
          className="w-full h-full object-cover"
          alt="Banner 4"
        ></img>
        <img
          src={banner3}
          className="w-full h-full object-cover row-span-2"
          alt="Banner 3"
        ></img>
        <img
          src={banner6}
          className="w-full h-full object-cover"
          alt="Banner 6"
        ></img>
        <img
          src={banner7}
          className="w-full h-full object-cover"
          alt="Banner 7"
        ></img>
      </div>
    </div>
  );
};

export default FeaturePitches;
