const mongoose = require("mongoose");

const spellSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, require: true },
  herbId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Herb",
    required: true
  },
  quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model("Spell", spellSchema);
