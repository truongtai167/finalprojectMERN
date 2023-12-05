import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import path from "../../ultils/path";
import { useSelector } from "react-redux";
import { PitchOwnerSidebar } from "../../components";
const PitchOwnerLayout = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  if (!isLoggedIn || !current || +current.role !== 20110396)
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  return (
    <div className="flex w-full bg-gray-100 min-h-screen relative text-gray-800">
      <div className="w-[327px] top-0 bottom-0 flex-none fixed">
        <PitchOwnerSidebar />
      </div>
      <div className="w-[327px]"></div>
      <div className="flex-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default PitchOwnerLayout;