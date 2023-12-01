import axios from "../axios";

export const apiGetPitches = (params) =>
  axios({
    url: "/pitch/",
    method: "get",
    params,
  });

export const apiGetPitch = (pitchId) =>
  axios({
    url: "/pitch/" + pitchId,
    method: "get",
  });
export const apiRatings = (data) =>
  axios({
    url: "/pitch/ratings",
    method: "put",
    data,
  });
