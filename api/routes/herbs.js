const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Herb = require("../models/herb");

// return all herbs (find())
router.get("/", (req, res, next) => {
  Herb.find()
    .exec()
    .then(found => {
      res.status(200).json({
        results: found
      });
    })
    .catch(err => res.status(500).json({ error: `Error: ${err}` }));
});

router.post("/", (req, res, next) => {
  const herb = new Herb({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    color: req.body.color
  });

  herb
    .save()
    .then(saved => {
      res.status(200).json({
        message: "Saved herb",
        createdHerb: saved
      });
    })
    .catch(err => {
      res.status(500).json({ error: `Error: ${err}` });
    });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  Herb.findById(id)
    .exec()
    .then(found => {
      console.log(found);

      if (found) {
        res.status(200).json({
          message: "Herb found by ID",
          result: found
        });
      } else {
        res.status(404).json({
          message: `No data found with ID: ${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).json({ error: `Error: ${err}` });
    });
});

router.patch("/:id", (req, res, next) => {
  // get id from route, props to change from body.
  const _id = req.params.id;

  Herb.update({ _id }, { $set: { ...req.body } })
    .exec()
    .then(result => res.status(200).json(result))
    .catch(err => {
      res.status(500).json({ error: `Error: ${err}` });
    });
});

router.delete("/:id", (req, res, next) => {
  const _id = req.params.id;

  Herb.remove({ _id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({ error: `Error: ${err}` });
    });
});

module.exports = router;
