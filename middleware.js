const { listingSchema, reviewSchema } = require("./schema");
const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError");
const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to perform this task!");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("You do not have the permission to perform this task!");
    res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.validateSchema = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    return new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  console.log(req.body);
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    return new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.isRevOwner = async (req, res, next) => {
  let { id, rid } = req.params;
  let review = await Review.findById(rid);
  if (!review.author._id.equals(res.locals.currUser._id)) {
    req.flash(
      "You do not have the permission to perform this task as you are not the owner of this review!"
    );
    res.redirect(`/listings/${id}`);
  }
  next();
};
