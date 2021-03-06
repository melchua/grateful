require("dotenv").config();
const express = require("express");
const app = express();
const expressEjsLayout = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const userRouter = require("./routes/users");
require("./config/passport-google")(passport);
require("./config/passport")(passport);

const port = parseInt(process.env.GRAT_PORT) || 7865;

//EJS
app.set("view engine", "ejs");
app.use(expressEjsLayout);

//body parser
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// use flash
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//Routes
app.use("/", require("./routes/index"));
app.use("/users", userRouter);

app.listen(port, () => {
  console.log("app is listening on port ", port);
});
