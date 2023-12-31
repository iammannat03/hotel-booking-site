const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);

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

// routes
app.get("/", (req, res) => {
  res.send("root");
});

// index route
app.get("/listings", async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

// new route
app.get("/listings/new", (req, res) => {
  try {
    res.render("listings/new.ejs");
  } catch (err) {
    throw err;
  }
});
app.post("/listings", (req, res) => {
  let newListing = Listing(req.body.listing);
  newListing
    .save()
    .then((result) => {
      res.redirect("/listings");
    })
    .catch((err) => {
      console.log(title);
      res.send(err);
    });
});

// show route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

// update
// edit page route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

// update put route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let nlisting = req.body.listing;
  await Listing.findByIdAndUpdate(id, nlisting)
    .then(() => {
      res.redirect("/listings");
    })
    .catch((err) => {
      res.send(err);
    });
});

// delete route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/listings");
    })
    .catch((err) => {
      res.send(err);
    });
});

// // update
// app.get("/listings/:id/edit", async (req, res) => {
//   let { id } = req.params;
//   let listing = await Listing.findById(id);
//   res.render("listings/edit.ejs", { listing });
// });
// app.put("/listings/:id", async (req, res) => {
//   let { id } = req.params;
//   await Listing.findByIdAndUpdate(id, { ...req.body.listing })
//     .then(() => {
//       res.redirect("/listings");
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

// app.get("/testL", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "hi title",
//     description: "hi desc",
//     price: 234,
//     location: "kolkata",
//     country: "India",
//   });
//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });

app.listen("8080", () => {
  console.log("appn is listening on port 8080");
});
