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
export const apiCreatePitch = (data) =>
  axios({
    url: "/pitch/",
    method: "post",
    data,
  });

export const apiUpdatePitch = (data, pitchId) =>
  axios({
    url: "/pitch/" + pitchId,
    method: "put",
    data,
  });

export const apiDeletePitch = (pitchId) =>
  axios({
    url: "/pitch/" + pitchId,
    method: "delete",
  });
