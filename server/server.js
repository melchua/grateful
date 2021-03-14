require("dotenv").config();
const express = require("express");
const app = express();
const expressEjsLayout = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const userRouter = require("./routes/users");
const messagesRouter = require("./routes/messages");
require("./config/passport-google")(passport);
require("./config/passport")(passport);
var cors = require("cors");

const port = parseInt(process.env.GRAT_PORT) || 7080;

//EJS
app.set("view engine", "ejs");
app.use(expressEjsLayout);
app.use(cors());
//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    name: "grateful",
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
app.use("/api/users", userRouter);
app.use("/api/messages", messagesRouter);

app.listen(port, () => {
  console.log("app is listening on port ", port);
});
