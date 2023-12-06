import axios from "../axios";

export const apiRegister = (data) =>
  axios({
    url: "/user/register",
    method: "post",
    data,
    // withCredentials: true,
  });
export const apiVerify = (token) =>
  axios({
    url: "/user/verify/" + token,
    method: "put",
  });
export const apiLogin = (data) =>
  axios({
    url: "/user/login",
    method: "post",
    data,
  });
export const apiForgotPassword = (data) =>
  axios({
    url: "/user/forgotpassword",
    method: "post",
    data,
  });

export const apiResetPassword = (data) =>
  axios({
    url: "/user/resetpassword",
    method: "put",
    data,
  });
export const apiGetCurrent = () =>
  axios({
    url: "/user/current",
    method: "get",
  });
export const apiUpdateCurrent = (data) =>
  axios({
    url: "/user/current",
    method: "put",
    data,
  });
export const apiGetUsers = (params) =>
  axios({
    url: "/user/",
    method: "get",
    params,
  });

export const apiUpdateUserByAdmin = (data, userId) =>
  axios({
    url: "/user/" + userId,
    method: "put",
    data,
  });

export const apiDeleteUserByAdmin = (userId) =>
  axios({
    url: "/user/" + userId,
    method: "delete",
  });
export const apiBooking = (data) =>
  axios({
    url: "/user/booking",
    method: "post",
    data,
  });
export const apiGetUserOrder = (userId) =>
  axios({
    url: "/booking/" + userId,
    method: "get",
  });
export const apiDeleteOrder = (bid) =>
  axios({
    url: "/booking/" + bid,
    method: "delete",
  });
// export const apiUpdateOrder = (data) =>
// axios({
//   url: "/user/booking",
//   method: "put",
//   data,
// });
// export const apiRemoveOrder = (userId) =>
//   axios({
//     url: "/remove-order/" + userId  ,
//     method: "delete",
//   });
