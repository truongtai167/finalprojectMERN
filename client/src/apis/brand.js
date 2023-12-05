import axios from "../axios";
export const apiCreateBrand = (data) =>
  axios({
    url: "/brand/",
    method: "post",
    data,
  });
