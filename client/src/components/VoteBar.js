import React, { useRef, useEffect, memo } from "react";
import icons from "../ultils/icons";

const { AiFillStar } = icons;
const VoteBar = ({ number, ratingCount, ratingTotal }) => {
  const percent = Math.round((ratingCount * 100) / ratingTotal) || 0;
  const percentRef = useRef();
  useEffect(() => {
    percentRef.current.style.cssText = `right: ${100 - percent}% `;
  }, [ratingCount, ratingTotal]);
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <div className="flex w-[10%] items-center justify-center gap-1 text-sm">
        <span>{number}</span>
        <AiFillStar color="orange"></AiFillStar>
      </div>
      <div className="w-[75%]">
        <div className="w-full h-[6px] relative bg-gray-200 rounded-1-full rounded-r-full">
          <div ref={percentRef} className="absolute inset-0 bg-red-500"></div>
        </div>
      </div>
      <div className="w-[15%] flex justify-end text-xs text-400">{`${
        ratingCount || 0
      } reviewers`}</div>
    </div>
  );
};

export default memo(VoteBar);
