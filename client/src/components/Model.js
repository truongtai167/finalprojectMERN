import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { showModel } from "../store/app/appSlice";

const Model = ({ children }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() =>
        dispatch(showModel({ isShowModel: false, modelChildren: null }))
      }
      className="absolute inset-0 z-50 bg-overlay flex items-center justify-center"
    >
      {children}
    </div>
  );
};

export default memo(Model);
