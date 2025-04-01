const User = require("../models/user");

module.exports.renderSignup = (req, res) => {
  res.render("users/signup");
};

module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(
      newUser,
      password
    );
    req.login(registeredUser, (err, next) => {
      if (err) {
        return next(err);
      } else {
        req.flash("success", "Welcome to Lime");
        res.redirect("/");
      }
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back to Lime");
  if (res.locals.redirectUrl) {
    res.redirect(res.locals.redirectUrl);
  } else {
    res.redirect("/");
  }
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/");
  });
};

module.exports.googleAuthCallback = (req, res) => {
  req.flash("success", "Welcome to Lime!");
  const redirectUrl = req.session.returnTo || "/listings";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.googleAuthFailure = (req, res) => {
  req.flash("error", "Failed to authenticate with Google");
  res.redirect("/login");
};
