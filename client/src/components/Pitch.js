import React, { useState } from "react";
import defaultImage from "../assets/Coming_Soon.png";
import { formatMoney, renderStarFromNumber } from "../ultils/helpers";
import newTag from "../assets/newTag.png";
import bestpriceTag from "../assets/bestprice2.png";
import { SelectOption } from "./";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import path from "../ultils/path";

const { AiFillEye, AiOutlineMenu, BsFillSuitHeartFill } = icons;

const Pitch = ({ pitchData, isNew }) => {
  const [isShowOption, setisShowOption] = useState(false);
  return (
    <div className="w-full text-base pr-[10px]">
      <Link
        className="w-full border p-[15px] flex flex-col items-center"
        to={`/${pitchData?.category?.toLowerCase()}/${pitchData?._id}/${
          pitchData?.name
        }`}
        onMouseEnter={(e) => {
          e.stopPropagation();
          setisShowOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setisShowOption(false);
        }}
      >
        <div className="w-full relative">
          {isShowOption && (
            <div className="absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2 animate-slide-top">
              <span title="Quick View">
                <SelectOption icon={<AiFillEye />}></SelectOption>
              </span>
              <SelectOption icon={<AiOutlineMenu />}></SelectOption>
              <SelectOption icon={<BsFillSuitHeartFill />}></SelectOption>
            </div>
          )}
          <img
            src={pitchData?.images[0] || defaultImage}
            alt=""
            className="w-full h-[280px] object-cover"
          />
          <img
            src={isNew ? newTag : bestpriceTag}
            alt=""
            className={`absolute  ${
              isNew
                ? "w-[100px] h-[90px] top-[-20px] left-[-5px]"
                : "w-[100px] h-[90px] top-[-30px] left-[-0px]"
            } h-[50px] object-cover`}
          ></img>
          {/* <span className="font-bold  top-[-12px] left-[-10px] text-white absolute">
            {isNew ? "New" : "Best"}
          </span> */}
        </div>
        <div className="flex flex-col mt-[15px] items-start gap-1 w-full">
          <span className="flex h-4">
            {renderStarFromNumber(pitchData?.totalRatings)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
          </span>
          <span className="line-clamp-1">{pitchData?.name}</span>
          <span>{`${formatMoney(pitchData?.price)} VNĐ`}</span>
        </div>
      </Link>
    </div>
  );
};

export default Pitch;
