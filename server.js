const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// This is for production use only
// if (process.env.NODE_ENV === "production") {
app.use(express.static("client/build"));
// }

app.use(routes);

mongoose.Promise = Promise;
mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb://shital:shital732@ds239940.mlab.com:39940/heroku_knfvvbkj",
  { useNewUrlParser: true }
);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
