const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Herb = require("../models/herb");

router.get("/", (req, res, next) => {
  Herb.find().exec.then(found => {
    res.status(200).json({
      message: "all herbs"
    });
  });
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
      console.log(saved);
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
          message: `No valid entry found for ${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).json({ error: `Error: ${err}` });
    });
});

router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    message: `updating product ${id}`
  });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    message: `deleting product ${id}`
  });
});

module.exports = router;
