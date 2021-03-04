const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const bcrypt = require("bcrypt");
const userqueries = require("../db/user-queries");

module.exports = function (passport) {
  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:7865/auth/google/callback"
  },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          return done(err, user);
        });
    }
  ));
}
