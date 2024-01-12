const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateSchema } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateSchema,
    wrapAsync(listingController.createListing)
  );

// new route
router.get("/new", isLoggedIn, wrapAsync(listingController.rendewNewForm));

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateSchema,
    wrapAsync(listingController.postEditListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// edit page route
router.get(
  "/:id/edit",
  isLoggedIn,
  wrapAsync(listingController.getEditListing)
);

module.exports = router;
