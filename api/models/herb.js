const mongoose = require("mongoose");

const herbSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  color: String
});

module.exports = mongoose.model("Herb", herbSchema);
