const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

const herbsRoute = require("./api/routes/herbs");
const spellsRoute = require("./api/routes/spells");

// MIDDLEWARE

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASS}@apothecary-cluster0-sond5.mongodb.net/test?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .catch(err => console.log("MongoDB conenction err: ", err));

// logging
app.use(morgan("dev"));

// parse JSON
app.use(express.json());

// static /uploads route
app.use("/uploads", express.static("uploads"));

// add headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

// routes
app.use("/herbs", herbsRoute);
app.use("/spells", spellsRoute);

// error handling
// 404 error
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// catch-all error
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
