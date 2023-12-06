const router = require("express").Router();
const controllers = require("../controllers/user");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploader = require("../config/cloudinaryconfig");
// Quest
router.post("/register", controllers.register);
router.post("/login", controllers.login);
router.post("/refreshtoken", controllers.refreshAccessToken);
router.get("/logout", controllers.logout);
router.post("/forgotpassword", controllers.forgotPassword);
router.put("/resetpassword", controllers.resetPassword);
router.put("/verify/:token", controllers.verifyEmail);
// User
router.get("/current", verifyAccessToken, controllers.getCurrent);
router.put(
  "/current",
  [verifyAccessToken, uploader.single("avatar")],
  controllers.updateUser
);
router.post("/booking", verifyAccessToken, controllers.BookingPitch);
// router.delete(
//   "/remove-order/:userId",
//   verifyAccessToken,
//   controllers.removeOrder
// );
// Admin
router.put(
  "/:userId",
  [verifyAccessToken, isAdmin],
  controllers.updateUserByAdmin
);
router.get("/", [verifyAccessToken, isAdmin], controllers.getUsers);
router.delete("/:userId", [verifyAccessToken, isAdmin], controllers.deleteUser);

module.exports = router;
