const mongoose = require("mongoose");

const ingredientSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  color: String
});

module.exports = mongoose.model("Herb", ingredientSchema);
