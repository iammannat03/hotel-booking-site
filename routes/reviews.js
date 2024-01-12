const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isRevOwner, validateReview } = require("../middleware.js");
const reviewController = require("../controllers/review.js");

router.post(
  "/reviews",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.postReview)
);

// delete review route
router.delete(
  "/reviews/:rid",
  isLoggedIn,
  isRevOwner,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
