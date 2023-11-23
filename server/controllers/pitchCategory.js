const PitchCategory = require("../models/pitchCategory");
const asyncHandler = require("express-async-handler");
const { createSlug } = require("../ultils/helpers");
const createPitchCategory = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing input");
  if (req.body && req.body.title) {
    // req.body.slug = slugify(req.body.name);
    const slug = createSlug(req.body.title);
    // console.log(slug);
    req.body.slug = slug;
  }
  const response = await PitchCategory.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    pitchCategory: response ? response : "Cannot create new pitch category",
  });
});
const getPitchCategory = asyncHandler(async (req, res) => {
  const response = await PitchCategory.find().select("title  brand image");
  return res.status(200).json({
    success: response ? true : false,
    pitchCategories: response ? response : "Cannot get pitch categories",
  });
});
const updatePitchCategory = asyncHandler(async (req, res) => {
  const { pitchCategoryId } = req.params;
  if (req.body && req.body.title) req.body.slug = createSlug(req.body.title); // update slug
  const response = await PitchCategory.findByIdAndUpdate(
    pitchCategoryId,
    req.body,
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    updatedCategory: response ? response : "Cannot update pitch category",
  });
});
const deletePitchCategory = asyncHandler(async (req, res) => {
  const { pitchCategoryId } = req.params;
  const response = await PitchCategory.findByIdAndDelete(pitchCategoryId);
  return res.status(200).json({
    success: response ? true : false,
    deletedCategory: response ? response : "Cannot delete pitch category",
  });
});

module.exports = {
  createPitchCategory,
  getPitchCategory,
  updatePitchCategory,
  deletePitchCategory,
};
