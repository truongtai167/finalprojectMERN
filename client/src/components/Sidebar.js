import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { apiGetCategories } from "../apis/app";
import { createSlug } from "../ultils/helpers";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const  {categories}  = useSelector((state) => state.app);
  console.log(categories);
  return (
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
    </div>
  );
};
export default Sidebar;
