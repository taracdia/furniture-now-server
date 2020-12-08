const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const passport = require("passport");
const authenticate = require("./authenticate");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const furnitureTypeRouter = require("./routes/furnitureTypeRouter");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/furnitureType", furnitureTypeRouter);

app.use(passport.initialize());
app.use(passport.session());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

function auth(req, res, next){
  if (req.user) {
    return next();
  } else {
   const err = new Error("you are not authenticated");
   err.status = 401;
   return next(err); 
  }
}

app.use(auth)

const mongoose = require("mongoose");
const passport = require("passport");
const url = "mongodb://localhost:27017/furniture-now";
const connect = mongoose.connect(url, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

connect.then(() => console.log("connected correclty to server"), err => console.log(err));

module.exports = app;