import axios from "../axios";
export const apiCreateBrand = (data) =>
  axios({
    url: "/brand/",
    method: "post",
    data,
  });
  export const apiGetBrandByOwner = (userId) =>
  axios({
    url: "/brand/" + userId,
    method: "get",
  });