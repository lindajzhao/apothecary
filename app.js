const express = require("express");
const app = express();
const morgan = require("morgan");

const herbsRoute = require("./api/routes/herbs");
const spellsRoute = require("./api/routes/spells");

// MIDDLEWARE

// logging
app.use(morgan("dev"));

// routes
app.use("/herbs", herbsRoute);
app.use("/spells", spellsRoute);

// error handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
