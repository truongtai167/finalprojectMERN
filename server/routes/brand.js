const router = require("express").Router();
const controllers = require("../controllers/brand");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

// Quest
router.get("/",  controllers.getBrand);

//User

// Admin
router.post("/", [verifyAccessToken, isAdmin], controllers.createBrand);
router.put("/:brandId", [verifyAccessToken, isAdmin], controllers.updateBrand);
router.delete("/:brandId", [verifyAccessToken, isAdmin], controllers.deleteBrand);
module.exports = router;
