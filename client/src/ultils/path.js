const path = {
  PUBLIC: "/",
  HOME: "",
  ALL: "*",
  LOGIN: "login",
  PITCHES: ":category",
  NEWS: "news",
  OUR_SERVICE: "services",
  FAQ: "faqs",
  DETAIL_PITCH: "pitch/:pitchId/:title",
  DETAIL_PITCH__CATEGORY__BRAND__PITCHID__TITLE:
    ":category/:brand/:pitchId/:title",
  VERIFY_EMAIL: "verify/:status",
  RESET_PASSWORD: "reset-password/:token",
};
export default path;
