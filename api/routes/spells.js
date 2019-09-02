const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "handling GET spells"
  });
});

router.post("/", (req, res, next) => {
  res.status(201).json({
    message: "handling POST spells"
  });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  res.status(200).json({
    message: `getting single spell`,
    orderId: id
  });
});

module.exports = router;
