const express = require("express");
const router = express.Router();
const userqueries = require("../db/user-queries.js");
const bcrypt = require("bcrypt");
const passport = require("passport");
// login handle
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

// register handle
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  // console.log(" Name " + name + " email :" + email + " pass:" + password);
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if match
  if (password !== password2) {
    errors.push({ msg: "passwords dont match" });
  }

  //check if password is more than 6 characters
  if (password.length < 6) {
    errors.push({ msg: "password atleast 6 characters" });
  }
  if (errors.length > 0) {
    res.render("register", {
      errors: errors,
      name: name,
      email: email,
      password: password,
      password2: password2,
    });
    // res.json({ errors: errors });
  } else {
    //validation passed

    // check if user exists
    userqueries.getUserByEmail(email).then((user) => {
      if (user) {
        errors.push({ msg: "email already registered" });
        res.render("register", {
          errors: errors,
          name: name,
          email: email,
          password: password,
          password2: password2,
        });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            //save hash to pass
            const newPassword = hash;
            // save user
            userqueries
              .addUser(email, name, newPassword)
              .then((value) => {
                req.flash("success_msg", "You have now registered!");
                res.redirect("/users/login");
              })
              .catch((value) => console.log("err", value));
          });
        });
      }
    });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: true,
    successRedirect: "/dashboard",
  })(req, res, next);
});

// logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "Now logged out");
  res.redirect("/users/login");
});

module.exports = router;

// GET /users/
router.get("/", (req, res) => {
  userqueries.getAllUsers((users) => {
    res.json(users);
  });
});

// GET /users/:id
router.get("/:id", (req, res) => {
  userqueries.getUserById(req.params.id).then((user) => {
    res.json(user);
  });
});

// POST /users/

module.exports = router;
