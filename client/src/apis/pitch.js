import axios from "../axios";

export const apiGetPitches = (params) =>
  axios({
    url: "/pitch/",
    method: "get",
    params,
  });
// axios({
//   url: "/pitch/",
//   method: "get",
//   params,
// })
//   .then((response) => {
//     console.log("API Response in apiGetPitches:", response.pitches);
//     return response.pitches;
//   })
//   .catch((error) => {
//     console.error("API Error in apiGetPitches:", error);
//     throw error;
//   });
