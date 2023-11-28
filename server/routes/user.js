const router = require("express").Router();
const controllers = require("../controllers/user");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

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
router.put("/current", verifyAccessToken, controllers.updateUser);
router.put("/booking", verifyAccessToken, controllers.updateOrder);

// Admin
router.put(
  "/:userId",
  [verifyAccessToken, isAdmin],
  controllers.updateUserByAdmin
);
router.get("/", [verifyAccessToken, isAdmin], controllers.getUsers);
router.delete("/", [verifyAccessToken, isAdmin], controllers.deleteUser);

module.exports = router;
