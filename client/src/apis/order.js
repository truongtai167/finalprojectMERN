import axios from "../axios";

export const apiGetAllOrders = (params) =>
  axios({
    url: "/booking/all",
    method: "get",
    params,
  });
// export const apiDeleteOrder = (bid) =>
//   axios({
//     url: "/booking/" + bid,
//     method: "delete",
//   });
export const apiDeleteOrder = (bid) =>
  axios({
    url: "/booking/" + bid,
    method: "delete",
  });
