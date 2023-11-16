import React, { useState, useEffect } from "react";
import { apiGetCategories } from "../apis/app";
const Sidebar = () => {
  const [categories, setCategory] = useState(null);
  const fetchCategories = async () => {
    const response = await apiGetCategories();
    // if(response.success) setCategory(response.pitchCategories)
    console.log(response);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return <div>Sidebar</div>;
};
export default Sidebar;
