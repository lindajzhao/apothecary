const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "handling GET herbs"
  });
});

router.post("/", (req, res, next) => {
  const herb = {
    name: req.body.name,
    description: req.body.description
  };

  res.status(201).json({
    message: "handling POST herbs"
  });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  if (id === "special") {
    res.status(200).json({
      message: "a lil someting special"
    });
  } else {
    res.status(200).json({
      message: "returning id"
    });
  }
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
