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
  DETAIL_ORDER: "my-order",
  // Admin Route
  ADMIN: "admin",
  DASHBOARD: "dashboard",
  MANAGE_USER: "manage-user",
  CREATE_USER: "create-user",

  // PitchOwner Route
  PITCH_OWNER: "pitch-owner",
  DASHBOARD_OWNER: "dashboard-owner",
  MANAGE_PITCH: "manage-pitch",
  MANAGE_ORDER: "manage-order",
  CREATE_PITCH: "create-pitch",
  MANAGE_BRAND: "manage-brand",
  CREATE_BRAND: "create-brand",
  // Member Route
  MEMBER: "member",
  PERSONAL: "personal",
  MY_BOOKING: "my_booking",
  HISTORY: "buy-history",
};
export default path;
