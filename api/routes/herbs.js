const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { formatHerbUrl } = require("../utils.js");
const Herb = require("../models/herb");

// return all herbs (find())
router.get("/", (req, res, next) => {
  Herb.find()
    .select("_id name price color")
    .exec()
    .then(herbs => {
      res.status(200).json({
        count: herbs.length,
        result: herbs.map(h => formatHerbUrl(h))
      });
    })
    .catch(error => res.status(500).json({ error }));
});

router.post("/", (req, res, next) => {
  const { name, color, price } = req.body;
  const herb = new Herb({
    _id: new mongoose.Types.ObjectId(),
    name,
    color,
    price
  });

  herb
    .save()
    .then(saved => {
      res.status(200).json({
        message: "Saved herb",
        createdHerb: saved
      });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  Herb.findById(id)
    .exec()
    .then(result => {
      if (result) {
        res.status(200).json({
          message: "Herb found by ID",
          result: result
        });
      } else {
        res.status(404).json({
          message: `No data found with ID: ${id}`
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

router.patch("/:id", (req, res, next) => {
  // get id from route, props to change from body.
  const _id = req.params.id;

  Herb.update({ _id }, { $set: { ...req.body } })
    .exec()
    .then(result => res.status(200).json(result))
    .catch(error => {
      res.status(500).json({ error });
    });
});

router.delete("/:id", (req, res, next) => {
  const _id = req.params.id;

  Herb.remove({ _id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

module.exports = router;
