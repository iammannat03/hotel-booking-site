const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1682687982049-b3d433368cd1?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    set: (v) =>
      v === ""
        ? "https://images.unsplash.com/photo-1682687982049-b3d433368cd1?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        : v,
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
});

const Listing = new mongoose.model("Listing", listingSchema);
module.exports = Listing;
