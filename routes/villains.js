const express = require("express");
const router = express.Router();
const dbFns = require("../db/villain-queries");

// GET /villains/
router.get("/", (req, res) => {
  dbFns.getAllVillains((villains) => {
    res.json(villains);
  });
});

// GET /villains/:id
router.get("/:id", (req, res) => {
  dbFns.getVillainById(req.params.id).then((villain) => {
    res.json(villain);
  });
});

module.exports = router;
