const News = require("../models/news");
const asyncHandler = require("express-async-handler");

const createNews = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category) throw new Error("Missing inputs");
  const response = await News.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    createdNews: response ? response : "Cannot create new news",
  });
});

const updateNews = asyncHandler(async (req, res) => {
  const { newsId } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  const response = await News.findByIdAndUpdate(newsId, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    updatedNews: response ? response : "Cannot update news",
  });
});
const getAllNews = asyncHandler(async (req, res) => {
  const response = await News.find();
  return res.status(200).json({
    success: response ? true : false,
    newsData: response ? response : "Cannot get news",
  });
});
// like news
// check user's dislike and like
const likeNews = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { newsId } = req.params;
  if (!newsId) throw new Error("Missing inputs");
  const news = await News.findById(newsId);
  const alreadyDisliked = news?.disliked?.find((el) => el.toString() === _id);
  if (alreadyDisliked) {
    const response = await News.findByIdAndUpdate(
      newsId,
      {
        $pull: { disliked: _id },
      },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      result: response,
    });
  }
  const isLiked = news?.likes?.find((el) => el.toString() === _id);
  if (isLiked) {
    const response = await News.findByIdAndUpdate(
      newsId,
      {
        $pull: { likes: _id },
      },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      result: response,
    });
  } else {
    const response = await News.findByIdAndUpdate(
      newsId,
      {
        $push: { likes: _id },
      },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      result: response,
    });
  }
});

const DislikeNews = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { newsId } = req.params;
  if (!newsId) throw new Error("Missing inputs");
  const news = await News.findById(newsId);
  const alreadyLiked = news?.likes?.find((el) => el.toString() === _id);
  if (alreadyLiked) {
    const response = await News.findByIdAndUpdate(
      newsId,
      {
        $pull: { likes: _id },
      },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      result: response,
    });
  }
  const isDisliked = news?.dislikes?.find((el) => el.toString() === _id);
  if (isDisliked) {
    const response = await News.findByIdAndUpdate(
      newsId,
      {
        $pull: { dislikes: _id },
      },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      result: response,
    });
  } else {
    const response = await News.findByIdAndUpdate(
      newsId,
      {
        $push: { dislikes: _id },
      },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      result: response,
    });
  }
});
const excludeFields = "name";
const getNews = asyncHandler(async (req, res) => {
  const { newsId } = req.params;
  const news = await News.findByIdAndUpdate(
    newsId,
    { $inc: { numberViews: 1 } },
    { new: true }
  )
    .populate("likes", excludeFields)
    .populate("dislikes", excludeFields);
  return res.status(200).json({
    success: news ? true : false,
    news: news,
  });
});
const deleteNews = asyncHandler(async (req, res) => {
  const { newsId } = req.params;
  const news = await News.findByIdAndDelete(newsId);
  return res.status(200).json({
    success: news ? true : false,
    deletedNews: news || "Something went wrong",
  });
});

const uploadImagesNews = asyncHandler(async (req, res) => {
  const { newsId } = req.params;
  if (!req.file) throw new Error("Missing Inputs");

  const response = await News.findByIdAndUpdate(
    newsId,
    { image: req.file.path },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    updatedNews: response ? response : "Cannot upload image news",
  });
});
module.exports = {
  createNews,
  getNews,
  updateNews,
  likeNews,
  DislikeNews,
  getAllNews,
  deleteNews,
  uploadImagesNews,
};
