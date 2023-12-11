import axios from "../axios";

export const apiGetAllOrders = (params) =>
  axios({
    url: "/booking/all",
    method: "get",
    params,
  });
