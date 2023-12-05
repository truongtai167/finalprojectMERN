const router = require("express").Router();
const controllers = require("../controllers/pitch");
const {
  verifyAccessToken,
  isAdmin,
  isAdminAndPitchOwn,
} = require("../middlewares/verifyToken");
const uploader = require("../config/cloudinaryconfig");

// Quest
router.get("/:pitchId", controllers.getPitch);
router.get("/", controllers.getPitches);

// User
router.put("/ratings", [verifyAccessToken], controllers.ratings);

// Admin - PitchOwner
router.put(
  "/uploadimage/:pitchId",
  [verifyAccessToken, isAdminAndPitchOwn],
  uploader.array("images", 10),
  controllers.uploadImagesPitch
);
router.put(
  "/:pitchId",
  [verifyAccessToken, isAdminAndPitchOwn],
  uploader.fields([
    { name: "images", maxCount: 10 },
    { name: "thumb", maxCount: 1 },
  ]),
  controllers.updatePitch
);
router.put(
  "/address/:pitchId",
  [verifyAccessToken, isAdminAndPitchOwn],
  controllers.updatePitchAddress
);
router.put(
  "/description/:pitchId",
  [verifyAccessToken, isAdminAndPitchOwn],
  controllers.updatePitchDescription
);
router.delete(
  "/:pitchId",
  [verifyAccessToken, isAdminAndPitchOwn],
  controllers.deletePitch
);
router.post(
  "/",
  [verifyAccessToken, isAdminAndPitchOwn],
  uploader.fields([
    { name: "images", maxCount: 10 },
    { name: "thumb", maxCount: 1 },
  ]),
  controllers.createPitch
);
module.exports = router;
