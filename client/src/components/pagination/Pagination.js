import React, { memo } from "react";
import usePagination from "hooks/usePagination";
import { PaginationItem } from "components";
import { useSearchParams } from "react-router-dom";
const Pagination = ({ totalCount, type = "pitches" }) => {
  const [params] = useSearchParams();
  const pagination = usePagination(totalCount, +params.get("page") || 1);

  const calculatePitch = () => {
    const currentPage = +params.get("page");
    const pageSize = +process.env.REACT_APP_PITCH_LIMIT || 6;
    const start = Math.min((currentPage - 1) * pageSize + 1, totalCount);
    const end = Math.min(currentPage * pageSize, totalCount);
    return `${start} - ${end}`;
  };
  return (
    <div className="flex w-full justify-between items-center">
      {!+params.get("page") ? (
        <span className="text-sm italic">
          {/*
                    Math.min để tránh trường hợp totalCount nhỏ hơn LIMIT, vd: Show pitchs 1 - 6 of 3   
                    */}
          {totalCount > 0
            ? `Show ${type} 1 - ${
                Math.min(+process.env.REACT_APP_PITCH_LIMIT, totalCount) || 6
              } of ${totalCount}`
            : `Show ${type} 0 - 0 of 0`}
        </span>
      ) : (
        ""
      )}
      {+params.get("page") ? (
        <span className="text-sm italic">
          {`Show ${type} ${calculatePitch()} of ${totalCount}`}
        </span>
      ) : (
        ""
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
