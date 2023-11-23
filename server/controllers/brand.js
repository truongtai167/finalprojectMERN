const Brand = require("../models/brand");
const PitchCategory = require("../models/pitchCategory");
const asyncHandler = require("express-async-handler");
const { createSlug } = require("../ultils/helpers");
const createBrand = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (Object.keys(req.body).length === 0) throw new Error("Missing input");
  if (req.body && req.body.title && _id) {
    // req.body.slug = slugify(req.body.name);
    const slug = createSlug(req.body.title);
    req.body.slug = slug;
    req.body.owner = _id;
  }
  let categories = [];
  if (req.body.categories) {
    categories = req.body.categories.split(",");
  }
  req.body.categories = categories;
  const response = await Brand.create(req.body);

  if (response && req.body.categories) {
    // Chờ cho brand được tạo xong rồi mới thực hiện cập nhật category
    await Promise.all(
      categories.map(async (categoryTitle) => {
        // Tìm category có title tương ứng
        const pitchCategory = await PitchCategory.findOne({
          title: categoryTitle,
        });
        if (pitchCategory) {
          // Cập nhật mảng brands của category
          console.log("response.title:", response.title);
          pitchCategory.brands.push(response.title);
          await pitchCategory.save();
        }
      })
    );
  }
  return res.status(200).json({
    success: response ? true : false,
    createdBrand: response ? response : "Cannot create new brand",
  });
});
const getBrand = asyncHandler(async (req, res) => {
  const { brandId } = req.params;
  const excludeFields = [
    "title",
    "address",
    "category",
    "description",
    "images",
  ];
  const response = await Brand.findById(brandId).populate(
    "owner",
    excludeFields
  );
  return res.status(200).json({
    success: response ? true : false,
    BrandData: response ? response : "Cannot get brand",
  });
});
const updateBrand = asyncHandler(async (req, res) => {
  const { brandId } = req.params;
  // find old title
  const oldBrand = await Brand.findById(brandId);
  const oldTitle = oldBrand.title;
  // console.log("oldBrand.title", oldBrand.title);
  if (req.body && req.body.title) req.body.slug = createSlug(req.body.title); // update slug
  const updatedBrand = await Brand.findByIdAndUpdate(brandId, req.body, {
    new: true,
  });
  // update pitchCategory
  // console.log("updateBrand.title", updatedBrand.title);
  const categories = updatedBrand.categories;
  await Promise.all(
    categories.map(async (categoryTitle) => {
      // console.log("categoryTitle", categoryTitle);
      // Tìm category có title tương ứng
      const updatedCategory = await PitchCategory.findOneAndUpdate(
        { brands: { $all: [oldTitle] } },
        { $set: { "brands.$": updatedBrand.title } },
        { new: true }
      );
      // console.log("YES");
    })
  );

  return res.status(200).json({
    success: updatedBrand ? true : false,
    updatedBrand: updatedBrand ? updatedBrand : "Cannot update brand",
  });
});
const deleteBrand = asyncHandler(async (req, res) => {
  const { brandId } = req.params;

  // find old title
  const deletedBrand = await Brand.findById(brandId);
  const deletedTitle = deletedBrand.title;
  console.log("deletedBrand.title", deletedBrand.title);
  // update pitchCategory
  const categories = deletedBrand.categories;
  await Promise.all(
    categories.map(async (categoryTitle) => {
      // console.log("categoryTitle", categoryTitle);
      // Tìm category có title tương ứng
      const updatedCategory = await PitchCategory.findOneAndUpdate(
        { brands: { $in: [deletedTitle] } },
        { $pull: { brands: deletedTitle } },
        { new: true }
      );
    })
  );

  const response = await Brand.findByIdAndDelete(brandId);
  return res.status(200).json({
    success: response ? true : false,
    deletedBrand: response ? response : "Cannot delete brand",
  });
});

// const updateBrandD = asyncHandler(async (req, res) => {
//   const { pitchId } = req.params;
//   if (!req.body.address) throw new Error("Missing Inputs");
//   const response = await Pitch.findByIdAndUpdate(
//     pitchId,
//     { $push: { address: req.body.address } },
//     { new: true }
//   );
//   return res.status(200).json({
//     success: response ? true : false,
//     message: response ? response : "Cannot update address pitch",
//   });
// });

const ratings = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const { star, comment, brandId } = req.body;
  if (!star || !brandId) throw new Error("Missing input");
  const ratingBrand = await Brand.findById(brandId);
  // console.log(ratingPitch);
  const alreadyRating = ratingBrand?.ratings?.find(
    (el) => el.postedBy.toString() === _id
  );
  // console.log({ alreadyRating });
  if (alreadyRating) {
    // update rating
    await Brand.updateOne(
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
    await Brand.findByIdAndUpdate(
      brandId,
      {
        $push: { ratings: { star, comment, postedBy: _id } },
      },
      { new: true }
    );
    // console.log(response);
  }
  // sum ratings
  const updateBrand = await Pitch.findById(brandId);

  const ratingCount = updateBrand.ratings.length;

  const sumRatings = updateBrand.ratings.reduce((sum, el) => sum + +el.star, 0);

  updateBrand.totalRatings = Math.round((sumRatings * 10) / ratingCount) / 10;
  await updateBrand.save();

  return res.status(200).json({
    status: true,
    updateBrand,
  });
});

const updateBrandDescription = asyncHandler(async (req, res) => {
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
const updateBrandAddress = asyncHandler(async (req, res) => {
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
const uploadImagesBrand = asyncHandler(async (req, res) => {
  const { brandId } = req.params;
  if (!req.files) throw new Error("Missing Inputs");

  const response = await Brand.findByIdAndUpdate(
    brandId,
    {
      $push: { images: { $each: req.files.map((el) => el.path) } },
    },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    message: response ? response : "Cannot upload images brand",
  });
});
module.exports = {
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
  ratings,
  updateBrandDescription,
  updateBrandAddress,
  uploadImagesBrand,
};
