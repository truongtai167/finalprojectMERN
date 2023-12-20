import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { formatMoney } from "ultils/helper";
import { renderStarFromNumber } from "ultils/helper";

const PitchCard = ({
  price,
  totalRatings,
  title,
  image,
  pid,
  category,
  brand,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-1/3 flex-auto px-[10px] mb-[20px] cursor-pointer"
      onClick={(e) =>
        navigate(
          `/${category.toLowerCase()}/${brand.toLowerCase()}/${pid}/${title}`
        )
      }
    >
      <div className="flex h-[159px] w-[453px] border">
        <img
          src={image}
          alt="pitches"
          className="w-[200px] object-cover p-4"
        ></img>
        <div className="flex flex-col mt-[15px] items-start gap-1 w-full">
          <span className="line-clamp-1 capitalize text-red-500">{title}</span>
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

export default memo(PitchCard);
