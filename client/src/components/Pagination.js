import React, { memo } from "react";
import usePagination from "../hooks/usePagination";
import { useSearchParams } from "react-router-dom";
import { PaginationItem } from "./";
const Pagination = ({ totalCount, currentPage }) => {
  //   const [params] = useSearchParams();
  //   const pagination = usePagination(50,4);

  const [params] = useSearchParams();
  const pagination = usePagination(totalCount, +params.get("page") || 1);

  const calculatePitch = () => {
    const currentPage = +params.get("page");
    const pageSize = +process.env.REACT_APP_PITCH_LIMIT || 6;
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalCount);
    if (start > 0 && end <= 0) {
      return "0 - 0";
    } else {
      return `${start} - ${end}`;
    }
  };
  console.log(pagination);
  return (
    <div className="flex w-full justify-between items-center">
      {+params.get("page") === 0 && (
        <span className="text-sm italic">
          {/*
                    Math.min để tránh trường hợp totalCount nhỏ hơn LIMIT, vd: Show pitchs 1 - 6 of 3   
                    */}
          {`Show pitchs 1 - ${
            Math.min(+process.env.REACT_APP_PITCH_LIMIT, totalCount) || 6
          } of ${totalCount}`}
        </span>
      )}
      {+params.get("page") > 0 && (
        <span className="text-sm italic">
          {`Show pitchs ${calculatePitch()} of ${totalCount}`}
        </span>
      )}
      <div className="flex items-center">
        {pagination?.map((el) => (
          <PaginationItem key={el}>{el}</PaginationItem>
        ))}
      </div>
    </div>
  );
};

export default memo(Pagination);
