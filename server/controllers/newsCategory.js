const NewsCategory = require("../models/newsCategory");
const asyncHandler = require("express-async-handler");

const createNewsCategory = asyncHandler(async (req, res) => {
  const response = await NewsCategory.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    createdNewsCategory: response
      ? response
      : "Cannot create new news category",
  });
});
const getNewsCategory = asyncHandler(async (req, res) => {
  const response = await NewsCategory.find().select("title  _id");
  return res.status(200).json({
    success: response ? true : false,
    NewsCategoryData: response ? response : "Cannot get news category",
  });
});
const updateNewsCategory = asyncHandler(async (req, res) => {
  const { newsCategoryId } = req.params;
  const response = await NewsCategory.findByIdAndUpdate(
    newsCategoryId,
    req.body,
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    updatedCategory: response ? response : "Cannot update news category",
  });
});
const deleteNewsCategory = asyncHandler(async (req, res) => {
  const { newsCategoryId } = req.params;
  const response = await NewsCategory.findByIdAndDelete(newsCategoryId);
  return res.status(200).json({
    success: response ? true : false,
    deletedCategory: response ? response : "Cannot delete news category",
  });
});

module.exports = {
  createNewsCategory,
  getNewsCategory,
  updateNewsCategory,
  deleteNewsCategory,
};
