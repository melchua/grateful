const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const bcrypt = require("bcrypt");
const userqueries = require("../db/user-queries");

module.exports = function (passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:7865/users/auth/google/callback"
  },
    function(accessToken, refreshToken, profile, done) {
      user=profile;
      return done(null, user); 
    }
  ));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // fake user right now before we decide what we are doing with google users
  passport.deserializeUser(function(id, done) {
    console.log('Deserialize user called.');
    done(null, { firstName: 'Foo', lastName: 'Bar' });
  });

}
