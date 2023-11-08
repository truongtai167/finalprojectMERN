const router = require("express").Router();
const controllers = require("../controllers/newsCategory");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

// Quest
router.get("/",  controllers.getNewsCategory);

// User

// Admin
router.post("/", [verifyAccessToken, isAdmin], controllers.createNewsCategory);
router.put("/:newsCategoryId", [verifyAccessToken, isAdmin], controllers.updateNewsCategory);
router.delete("/:newsCategoryId", [verifyAccessToken, isAdmin], controllers.deleteNewsCategory);




module.exports = router;
