import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { createSlug } from "../../ultils/helpers";
import { useSelector } from "react-redux";
import icons from "../../ultils/icons";
const { AiOutlineMenu } = icons;
const Sidebar = () => {
  const { categories } = useSelector((state) => state.app);
  // console.log(categories);
  return (
    <div className="border ">
      <div className="flex items-center justify-between p-4 w-full">
        <span className="flex-1 flex justify-center">
          <AiOutlineMenu size={20} color="red" />
        </span>
        <span className="flex-8 font-bold text-[20px] flex justify-center">
          ALL CATEGORY
        </span>
        <span className="flex-1"></span>
      </div>
      <div className="flex flex-col border">
        {categories?.map((el) => (
          <NavLink
            key={createSlug(el.title)}
            to={createSlug(el.title)}
            className={({ isActive }) =>
              isActive
                ? "bg-main text-white px-5 pt -[25px] pb-[20px] text-sm hover:text-main"
                : "px-5 pt-[25px] pb-[20px] text-sm hover:text-main"
            }
          >
            {el.title}
          </NavLink>
        ))}
      </div>{" "}
    </div>
  );
};
export default Sidebar;
