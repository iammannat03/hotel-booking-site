const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  // Any other fields you need for the user
});


userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
