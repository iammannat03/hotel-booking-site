const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, // This allows null/undefined values to exist
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

// Add the findOrCreateGoogleUser static method
userSchema.statics.findOrCreateGoogleUser = async function (
  profile
) {
  try {
    // First try to find an existing user
    let user = await this.findOne({ googleId: profile.id });

    if (user) {
      return user;
    }

    // Check if user exists with same email
    user = await this.findOne({
      email: profile.emails[0].value,
    });

    if (user) {
      // If user exists with email but no googleId, update the user
      user.googleId = profile.id;
      await user.save();
      return user;
    }

    // Create new user if none exists
    const username =
      profile.displayName ||
      profile.emails[0].value.split("@")[0];
    const email = profile.emails[0].value;

    const newUser = await this.create({
      username: username,
      email: email,
      googleId: profile.id,
    });

    return newUser;
  } catch (err) {
    console.error("Error in findOrCreateGoogleUser:", err);
    throw err;
  }
};

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
