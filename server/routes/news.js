const router = require("express").Router();
const controllers = require("../controllers/news");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploader = require('../config/cloudinaryconfig')

// Quest
router.get("/", controllers.getAllNews);
router.get("/one/:newsId", controllers.getNews);

// User
router.put("/like/:newsId", [verifyAccessToken], controllers.likeNews);
router.put("/dislike/:newsId", [verifyAccessToken], controllers.DislikeNews);

// Admin
router.put("/image/:newsId", [verifyAccessToken, isAdmin], uploader.single('image'),controllers.uploadImagesNews);
router.put("/:newsId", [verifyAccessToken, isAdmin], controllers.updateNews);
router.delete("/:newsId", [verifyAccessToken, isAdmin], controllers.deleteNews);
router.post("/", [verifyAccessToken, isAdmin], controllers.createNews);
module.exports = router;
