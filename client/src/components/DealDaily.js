import React, { useState, useEffect, memo } from "react";
import icons from "../ultils/icons";
import { apiGetPitches } from "../apis/pitch";
import defaultImage from "../assets/Coming_Soon.png";
import { formatMoney, renderStarFromNumber } from "../ultils/helpers";
import { CountDown } from "./";
import poster from "../assets/poster.jpg";

const { AiFillStar, AiOutlineMenu } = icons;
let idInterval;
const DealDaily = () => {
  const [dealdaily, setdealdaily] = useState([]);
  const [hour, sethour] = useState(0);
  const [minute, setminute] = useState(0);
  const [second, setsecond] = useState(0);
  const [expireTime, setexpireTime] = useState(false);
  const fetchDealDaily = async () => {
    const response = await apiGetPitches({
      limit: 1,
      page: Math.round(Math.random() * 3),
      totalRatings: 5,
    });
    if (response.success) {
      setdealdaily(response.pitches[0]);
      const h = 24 - new Date().getHours();
      const m = 60 - new Date().getMinutes();
      const s = 60 - new Date().getSeconds();
      sethour(h);
      setminute(m);
      setsecond(s);
    } else {
      sethour(0);
      setminute(59);
      setsecond(59);
    }
  };
  // useEffect(() => {
  //   fetchDealDaily();
  // }, []);
  useEffect(() => {
    idInterval && clearInterval(idInterval);
    fetchDealDaily();
  }, [expireTime]);
  useEffect(() => {
    idInterval = setInterval(() => {
      if (second > 0) setsecond((prev) => prev - 1);
      else {
        if (minute > 0) {
          setminute((prev) => prev - 1);
          setsecond(59);
        } else {
          if (hour > 0) {
            sethour((prev) => prev - 1);
            setminute(59);
            setsecond(59);
          } else {
            setexpireTime(!expireTime);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [second, minute, hour, expireTime]);

  // console.log(dealdaily);
  return (
    <div className="border w-full flex-auto">
      <div className="flex items-center justify-between p-4 w-full">
        <span className="flex-1 flex justify-center">
          <AiFillStar size={20} color="red"></AiFillStar>
        </span>
        <span className="flex-8 font-bold text-[20px] flex justify-center">
          DEAL DAILY
        </span>
        <span className="flex-1"></span>
      </div>
      <div className="w-full flex flex-col items-center pt-8 px-4 gap-2">
        <img
          src={dealdaily?.images || defaultImage}
          alt=""
          className="w-full object-contain"
        ></img>

        <span className="flex h-4">
          {renderStarFromNumber(dealdaily?.totalRatings, 20)?.map(
            (el, index) => (
              <span key={index}>{el}</span>
            )
          )}
        </span>
        <span className="line-clamp-1 text-center">{dealdaily?.name}</span>
        <span>{`${formatMoney(dealdaily?.price)} VNĐ`}</span>
      </div>

      <div className="px-4 mt-8">
        <div className="flex justify-center gap-2 items-center mb-6">
          <CountDown unit={"Hours"} number={hour}></CountDown>
          <CountDown unit={"Minutes"} number={minute}></CountDown>
          <CountDown unit={"Seconds"} number={second}></CountDown>
        </div>
        <button
          type="button"
          className="flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2"
        >
          <AiOutlineMenu />
          <span>Option</span>
        </button>
      </div>
      <div className="px-4 mt-8">
        <img
          src={poster}
          alt="poster"
          className="flex-1 h-full w-full object-contain"
        />
      </div>
    </div>
  );
};
export default memo(DealDaily);
