const router = require("express").Router();
const controllers = require("../controllers/pitch");
const { verifyAccessToken, isAdmin, isAdminAndPitchOwn } = require("../middlewares/verifyToken");
const uploader = require('../config/cloudinaryconfig')


// Quest
router.get("/:pitchId", controllers.getPitch);
router.get("/", controllers.getPitchs);


// User
router.put("/ratings", [verifyAccessToken], controllers.ratings);



// Admin - PitchOwner
router.put("/uploadimage/:pitchId", [verifyAccessToken, isAdminAndPitchOwn],uploader.array('images',10) ,controllers.uploadImagesPitch);
router.put("/:pitchId", [verifyAccessToken, isAdminAndPitchOwn] ,controllers.updatePitch);
router.put("/address/:pitchId", [verifyAccessToken, isAdminAndPitchOwn] ,controllers.updatePitchAddress);
router.delete("/:pitchId",[verifyAccessToken, isAdminAndPitchOwn],controllers.deletePitch);
router.post("/", [verifyAccessToken, isAdminAndPitchOwn], controllers.createPitch);
module.exports = router;
