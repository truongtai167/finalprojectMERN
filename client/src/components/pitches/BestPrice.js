import React, { useState, useEffect, memo } from "react";
import { apiGetPitches } from "apis/pitch";
import CustomSlider from "components/common/CustomSlider";
import banner from "assets/banner.jpg";
import banner2 from "assets/banner2.jpg";
import { getNewPitches } from "store/pitch/asyncAction";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

const tabs = [
  { id: 1, name: "best price" },
  { id: 2, name: "new pitches" },
];
const BestPrice = () => {
  const [bestSellers, setBestSellers] = useState(null);
  const [activedTab, setactivedTab] = useState(1);
  const [pitches, setPitches] = useState(null);
  const dispatch = useDispatch();
  const { newPitches } = useSelector((state) => state.pitch);
  const { isShowModal } = useSelector((state) => state.app);

  const fetchPitches = async () => {
    const response = await apiGetPitches({ sort: "price" });
    if (response.success) {
      setBestSellers(response.pitches);
      setPitches(response.pitches);
    }
  };
  useEffect(() => {
    fetchPitches();
    dispatch(getNewPitches());
  }, []);
  useEffect(() => {
    if (activedTab === 1) setPitches(bestSellers);
    if (activedTab === 2) setPitches(newPitches);
  }, [activedTab]);
  return (
    <div className={clsx(isShowModal ? "hidden" : "")}>
      <div className="flex text-[20px] gap-8 pb-4 border-b-2 border-blue-700">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`font-bold uppercase border-r cursor-pointer text-gray-400 ${
              activedTab === el.id ? "text-gray-900" : ""
            }`}
            onClick={() => setactivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-4">
        <CustomSlider pitches={pitches} activedTab={activedTab}></CustomSlider>
      </div>
      <div className="w-full flex gap-4 mt-8">
        <img
          src={banner}
          alt="banner"
          className="flex-1 object-cover w-[458px] h-[550px]"
        ></img>
        <img
          src={banner2}
          alt="banner"
          className="flex-1 object-cover w-[458px] h-[550px]"
        ></img>
      </div>
    </div>
  );
};

export default memo(BestPrice);
