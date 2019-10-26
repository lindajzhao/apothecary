const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Spell = require("../models/spell");
const Herb = require("../models/herb");
const { formatSpellUrl } = require("../utils.js");

router.get("/", (req, res, next) => {
  Spell.find()
    .populate("herbId", "name color") // aggregate Herbs table
    .exec()
    .then(result => {
      res.status(200).json({
        count: result.length,
        result: result.map(r => formatSpellUrl(r))
      });
    })
    .catch(err => {
      res.status(500).json({ error: `Error: ${err}` });
    });
});

router.post("/", (req, res, next) => {
  const { name, quantity, herbId } = req.body;

  Herb.findById(herbId)
    .populate("herbId")
    .exec()
    .then(herb => {
      if (!herb) {
        // do not create spells containing nonexistant herbs
        return res.status(404).json({ message: "HerbID not found" });
      }

      return new Spell({
        _id: mongoose.Types.ObjectId(),
        name,
        herbId,
        quantity
      }).save();
    })
    .then(result => {
      console.log("second", result);
      res.status(201).json({
        message: "Saved spell",
        result
      });
    })
    .catch(error => res.status(500).json({ error }));
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  Spell.findById(id)
    .exec()
    .then(spell => {
      if (!spell) {
        // handle not found
        return res.status(404).json({ message: "Spell not found" });
      }

      res.status(200).json({ spell });
    });
});

router.delete("/:id", (req, res) => {
  const _id = req.params.id;

  Spell.remove({ _id })
    .exec()
    .then(result => {
      if (result.deletedCount < 1) {
        return res
          .status(404)
          .json({ error: `Spell with ID ${_id} not found` });
      }

      res.status(200).json({
        message: "Spell deleted",
        request: {
          type: "POST",
          url: "http://localhost:666/spells"
        }
      });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

module.exports = router;
