const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const bcrypt = require("bcrypt");
const userqueries = require("../db/user-queries");

module.exports = function (passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:7865/auth/google/callback"
  },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          return done(err, user);
        });
    }
  ));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
}
