const PitchCategory = require("../models/pitchCategory");
const asyncHandler = require("express-async-handler");


const createPitchCategory = asyncHandler(async (req, res) => {
  const response = await PitchCategory.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    message: response ? response : "Cannot create new pitch category",
  });
});
const getPitchCategory = asyncHandler(async (req, res) => {
  const response = await PitchCategory.find().select("title  _id");
  return res.status(200).json({
    success: response ? true : false,
    message: response ? response : "Cannot get pitch category",
  });
});
const updatePitchCategory = asyncHandler(async (req, res) => {
  const { pitchCategoryId } = req.params;
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
