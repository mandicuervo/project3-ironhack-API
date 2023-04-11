const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User.model");

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, next) => {
      const googleID = profile.id;
      const email = profile.emails[0] ? profile.emails[0].value : undefined;
      const name = profile.displayName;
      const image = profile.photos[0].value;
      const username = (name + (Math.floor(Math.random() * 10000)).toString()).toLowerCase().replace(/ /g, "");

      if (googleID && email) {
        User.findOne({
          $or: [{ googleID }, { email }],
        })
          .then((user) => {
            if (user) {
              next(null, user);
              return;
            }

            return User.create({
              name,
              email,
              googleID,
              username,
              password: new mongoose.Types.ObjectId(),
              image,
              status: true,
            }).then((createdUser) => {
              next(null, createdUser);
            });
          })
          .catch(next);
      } else {
        next(null, false, { error: "Error connecting to Google." });
      }
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});