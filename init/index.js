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
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "659d6b3401be779797baf6e5",
    geometry: { type: "Point", coordinates: [80.2349272, 12.7839153] },
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialised");
};

initDB();
