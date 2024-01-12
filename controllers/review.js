const Review = require("../models/review.js");
const Listing = require("../models/listing");

module.exports.postReview = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  console.log(newReview);
  listing.review.push(newReview);

  await newReview.save();
  await listing.save();

  req.flash("success", "New Review Posted!");
  res.redirect(`/listings/${id}`);
};
module.exports.destroyReview = async (req, res) => {
  const { id, rid } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { review: rid } });
  await Review.findByIdAndDelete(rid);

  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
};
