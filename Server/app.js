var createError = require("http-errors");
var express = require("express");
var path = require("path");
const url = require('url');
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var tasksRouter = require("./routes/tasks");
var categoriesRouter = require("./routes/categories");
var inquiriesRouter = require("./routes/inquiries");
var cors = require("cors");
var app = express();
app.use(
  cors({
    origin: "*", //that will be site domain we put this here
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use((req, res, next) => {
  if (!req.url.endsWith(".js") && !req.url.endsWith(".css")) {
    res.type("text/html");
  }
  next();
});

app.use((req, res, next) => {
  if (req.url.endsWith(".js")) {
    res.type("text/javascript");
  }
  next();
});

app.use(
  "/assets",
  express.static(path.join(__dirname, "..", "Client", "dist", "assets"))
);
app.use(express.static(path.join(__dirname, "..", "Client", "dist")));

app.get("/index-*.js", function (req, res) {
  res.type("application/javascript");
  res.sendFile(
    path.join(__dirname, "..", "Client", "dist", "assets", req.path)
  );
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/userTasks", tasksRouter);
app.use("/categories", categoriesRouter);
app.use("/inquiries", inquiriesRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

app.get("*", (req, res) => {
  const filePath = path.join(
    __dirname,
    "..",
    "Client",
    "dist",
    "index.html"
  );
  console.log("File path:", filePath);
  res.sendFile(filePath);
});

module.exports = app;
