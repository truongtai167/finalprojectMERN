const router = require("express").Router();
const controllers = require("../controllers/booking");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

// Quest

// User

router.post("/", verifyAccessToken, controllers.createBooking);
router.get("/", verifyAccessToken, controllers.getUserBooking);

// Admin

router.put(
  "/status/:bookingId",
  [verifyAccessToken, isAdmin],
  controllers.updateStatusBooking
);
router.get("/all", [verifyAccessToken, isAdmin], controllers.getBookings);
module.exports = router;
