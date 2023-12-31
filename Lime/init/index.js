const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// database setup
const MONGO_URL = "mongodb://127.0.0.1:27017/lime";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/lime");
}

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("data was initialised");
};

initDB();
