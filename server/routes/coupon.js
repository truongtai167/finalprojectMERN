const router = require("express").Router();
const controllers = require("../controllers/coupon");
const { verifyAccessToken, isAdmin,isAdminAndPitchOwn } = require("../middlewares/verifyToken");

// Quest
router.get("/", controllers.getCoupon);

// User

// Admin - PitchOwner
router.post("/", [verifyAccessToken, isAdminAndPitchOwn], controllers.createCoupon);
router.put("/:couponId", [verifyAccessToken, isAdminAndPitchOwn], controllers.updateCoupon);
router.delete("/:couponId", [verifyAccessToken, isAdminAndPitchOwn], controllers.deleteCoupon);
module.exports = router;
