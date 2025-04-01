// if (process.env.NODE_ENV != "production") {
//   require("dotenv").config();
// }

// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const path = require("path");
// const Listing = require("./models/listing");
// const methodOverride = require("method-override");
// const ejsMate = require("ejs-mate");
// const wrapAsync = require("./utils/wrapAsync");
// const ExpressError = require("./utils/ExpressError");
// const listingsRouter = require("./routes/listings");
// const reviewsRouter = require("./routes/reviews");
// const userRouter = require("./routes/user");
// const session = require("express-session");
// const MongoStore = require("connect-mongo");
// const flash = require("connect-flash");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const User = require("./models/user");
// const dbUrl = process.env.ATLASDB_URL;

// app.use(methodOverride("_method"));
// app.use(express.static(path.join(__dirname, "public")));
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.urlencoded({ extended: true }));
// app.engine("ejs", ejsMate);

// // database setup
// main()
//   .then(() => {
//     console.log("connected to DB");
//   })
//   .catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect(dbUrl);
// }

// const store = MongoStore.create({
//   mongoUrl: dbUrl,
//   crypto: {
//     secret: process.env.SECRET,
//   },
//   touchAfter: 24 * 3600,
// });

// store.on("error", () => {
//   console.log("-----error in mongo session store-----", err);
// });

// const sessionOptions = {
//   store,
//   secret: process.env.SECRET,
//   saveUninitialized: true,
//   resave: false,
//   cookie: {
//     expire: Date.now() + 7 * 24 * 60 * 60 * 1000,
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//   },
// };

// app.use(session(sessionOptions));
// app.use(flash());

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use((req, res, next) => {
//   res.locals.successMessage = req.flash("success");
//   res.locals.errorMessage = req.flash("error");
//   res.locals.currUser = req.user;
//   next();
// });

// // routes
// app.get(
//   "/",
//   wrapAsync(async (req, res) => {
//     res.render("listings/root.ejs");
//   })
// );

// // routes
// app.use("/listings", listingsRouter);
// app.use("/listings/:id", reviewsRouter);
// app.use("/", userRouter);

// // middlewares
// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, "Page not found!!!"));
// });

// //error handling middlewares
// app.use((err, req, res, next) => {
//   let { statusCode = 500, message = "Something went wrong" } = err;
//   res.status(statusCode).render("error.ejs", { message });
// });

// app.listen("8080", () => {
//   console.log("app is listening on port 8080");
// });

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
  console.log(process.env.GOOGLE_CLIENT_ID)
  console.log(process.env.GOOGLE_CLIENT_SECRET)
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");
const listingsRouter = require("./routes/listings");
const reviewsRouter = require("./routes/reviews");
const userRouter = require("./routes/user");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const MONGO_URL = "mongodb://127.0.0.1:27017/lime";

// const clientID = process.env.GOOGLE_CLIENT_ID;
// const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

const clientID = process.env.GOOGLE_CLIENT_ID || "fallback-client-id";
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "fallback-client-secret";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error("Missing Google OAuth environment variables!");
  process.exit(1); // Stop the server if env variables are missing
}

// Setup session, flash, and passport
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);

// database setup
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const store = MongoStore.create({
  mongoUrl: MONGO_URL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("-----error in mongo session store-----", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: {
    expire: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.successMessage = req.flash("success");
  res.locals.errorMessage = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID:clientID,

    clientSecret:clientSecret,
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // Find or create the user based on Google profile
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

// Google OAuth routes
app.get('/auth/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

// routes
app.get(
  "/",
  wrapAsync(async (req, res) => {
    res.render("listings/root.ejs");
  })
);

app.use("/listings", listingsRouter);
app.use("/listings/:id", reviewsRouter);
app.use("/", userRouter);

// middlewares
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!!!"));
});

//error handling middlewares
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

app.listen("8080", () => {
  console.log("app is listening on port 8080");
});


