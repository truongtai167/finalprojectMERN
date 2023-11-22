import React from "react";
import { formatMoney, renderStarFromNumber } from "../ultils/helpers";

const PitchCard = ({ price, totalRatings, name, image }) => {
  return (
    <div className="w-1/3 flex-auto px-[10px] mb-[20px]">
      <div className="flex w-full border">
        <img
          src={image}
          alt="pitches"
          className="w-[200px] object-contain p-4"
        ></img>
        <div className="flex flex-col mt-[15px] items-start gap-1 w-full">
          <span className="line-clamp-1 capitalize text-base">{name}</span>
          <span className="flex h-4">
            {renderStarFromNumber(totalRatings)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
          </span>
          <span className="text-base">{`${formatMoney(price)} VNĐ`}</span>
        </div>
      </div>
    </div>
  );
};

export default PitchCard;
