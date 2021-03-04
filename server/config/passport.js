const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const userqueries = require("../db/user-queries");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //match user

      userqueries
        .getUserByEmail(email)
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "the email is not registered",
            });
          }
          // match pass
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "pass incorrect" });
            }
          });
        })
        .catch((err) => {
          console.log("ERROR", err);
        });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    userqueries.getUserById(id).then((user) => {
      done(null, user);
    });
  });
};
