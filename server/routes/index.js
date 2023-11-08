const userRouter = require("./user");
const pitchRouter = require("./pitch");
const pitchCategoryRouter = require("./pitchCategory");
const newsCategoryRouter = require("./newsCategory");
const newsRouter = require("./news");
const brandRouter = require("./brand");
const couponRouter = require("./coupon");
const bookingRouter = require("./booking");
const { notFound, ErrorHandle } = require("../middlewares/errorHandler");
const initRouter = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/pitch", pitchRouter);
  app.use("/api/pitchcategory", pitchCategoryRouter);
  app.use("/api/newscategory", newsCategoryRouter);
  app.use("/api/news", newsRouter);
  app.use("/api/brand", brandRouter);
  app.use("/api/coupon", couponRouter);
  app.use("/api/booking", bookingRouter);
  app.use(notFound);
  app.use(ErrorHandle);
};

module.exports = initRouter;
