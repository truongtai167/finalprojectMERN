const Pitch = require("../models/pitch");
const asyncHandler = require("express-async-handler");
// const slugify = require("slugify");
// import { createSlug } from "../ultils/helpers";
const { createSlug } = require("../ultils/helpers");
const createPitch = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (Object.keys(req.body).length === 0) throw new Error("Missing input");

  if (req.body && req.body.name && _id) {
    // req.body.slug = slugify(req.body.name);
    const slug = createSlug(req.body.name);
    // console.log(slug);
    req.body.slug = slug;
    req.body.owner = _id;
  }

  const newPitch = await Pitch.create(req.body);
  return res.status(200).json({
    success: newPitch ? true : false,
    NewPitch: newPitch ? newPitch : "Cannot create new pitch",
  });
});

const getPitch = asyncHandler(async (req, res) => {
  const { pitchId } = req.params;
  const excludeFields = ["name", "address", "email", "phoneNumber"];
  const pitch = await Pitch.findById(pitchId).populate("owner", excludeFields);
  return res.status(200).json({
    success: pitch ? true : false,
    PitchData: pitch ? pitch : "Cannot get pitch",
  });
});

const getPitches = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  // seperate special field
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);
  // Format operators
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchedEl) => `$${matchedEl}`
  );
  const formatedQueries = JSON.parse(queryString);
  // console.log(formatedQueries);
  // filtering
  if (queries?.name)
    formatedQueries.name = { $regex: queries.name, $options: "i" };
  let queryCommand = Pitch.find(formatedQueries);
  // softing
  if (req.query.sort) {
    const softBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(softBy);
  }
  // fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }
  // pagination
  // limit
  //skip: 1 2 3 ....10 => skip = 2
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PITCH;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);
  // Execute query
  //  Số lượng sản phẩm thỏa mãn điều kiện !== số lượng sp trả về 1 lần gọi API
  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err.message);

    const counts = await Pitch.find(formatedQueries).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      pitches: response ? response : "Cannot get pitch",
      totalCount: counts,
    });
  });
});

const updatePitch = asyncHandler(async (req, res) => {
  const { pitchId } = req.params;
  if (req.body && req.body.name) req.body.slug = createSlug(req.body.name); // update slug
  const updatedPitch = await Pitch.findByIdAndUpdate(pitchId, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updatedPitch ? true : false,
    message: updatedPitch ? updatedPitch : "Cannot update pitch",
  });
});

const deletePitch = asyncHandler(async (req, res) => {
  const { pitchId } = req.params;

  const deletedPitch = await Pitch.findByIdAndDelete(pitchId);
  return res.status(200).json({
    success: deletedPitch ? true : false,
    message: deletedPitch ? deletedPitch : "Cannot delete pitch",
  });
});

const ratings = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const { star, comment, pitchId } = req.body;
  if (!star || !pitchId) throw new Error("Missing input");
  const ratingPitch = await Pitch.findById(pitchId);
  // console.log(ratingPitch);
  const alreadyRating = ratingPitch?.ratings?.find(
    (el) => el.postedBy.toString() === _id
  );
  // console.log({ alreadyRating });
  if (alreadyRating) {
    // update rating
    await Pitch.updateOne(
      {
        ratings: { $elemMatch: alreadyRating },
      },
      {
        $set: { "ratings.$.star": star, "ratings.$.comment": comment },
      },
      { new: true }
    );
  } else {
    // add star and comment
    await Pitch.findByIdAndUpdate(
      pitchId,
      {
        $push: { ratings: { star, comment, postedBy: _id } },
      },
      { new: true }
    );
    // console.log(response);
  }
  // sum ratings
  const updatePitch = await Pitch.findById(pitchId);

  const ratingCount = updatePitch.ratings.length;

  const sumRatings = updatePitch.ratings.reduce((sum, el) => sum + +el.star, 0);

  updatePitch.totalRatings = Math.round((sumRatings * 10) / ratingCount) / 10;
  await updatePitch.save();

  return res.status(200).json({
    status: true,
    updatePitch,
  });
});
const uploadImagesPitch = asyncHandler(async (req, res) => {
  const { pitchId } = req.params;
  if (!req.files) throw new Error("Missing Inputs");

  const response = await Pitch.findByIdAndUpdate(
    pitchId,
    {
      $push: { images: { $each: req.files.map((el) => el.path) } },
    },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    message: response ? response : "Cannot upload images pitch",
  });
});
const updatePitchDescription = asyncHandler(async (req, res) => {
  const { pitchId } = req.params;
  if (!req.body.description) throw new Error("Missing Inputs");
  const response = await Pitch.findByIdAndUpdate(
    pitchId,
    { $push: { description: req.body.description } },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    message: response ? response : "Cannot update description pitch",
  });
});
const updatePitchAddress = asyncHandler(async (req, res) => {
  const { pitchId } = req.params;
  if (!req.body.address) throw new Error("Missing Inputs");
  const response = await Pitch.findByIdAndUpdate(
    pitchId,
    { $push: { address: req.body.address } },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    message: response ? response : "Cannot update address pitch",
  });
});

module.exports = {
  createPitch,
  getPitch,
  getPitches,
  updatePitch,
  deletePitch,
  ratings,
  uploadImagesPitch,
  updatePitchDescription,
  updatePitchAddress,
};
