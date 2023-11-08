const router = require("express").Router();
const controllers = require("../controllers/pitchCategory");
const { verifyAccessToken, isAdmin,isAdminAndPitchOwn } = require("../middlewares/verifyToken");


// Quest
router.get("/",  controllers.getPitchCategory);


// User

// Admin - PitchOwner
router.post("/", [verifyAccessToken, isAdminAndPitchOwn], controllers.createPitchCategory);
router.put("/:pitchCategoryId", [verifyAccessToken, isAdminAndPitchOwn], controllers.updatePitchCategory);
router.delete("/:pitchCategoryId", [verifyAccessToken, isAdminAndPitchOwn], controllers.deletePitchCategory);
module.exports = router;
