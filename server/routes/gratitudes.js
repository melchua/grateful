const express = require("express");
const router = express.Router();
gratitudeQueries = require("../db/gratitude-queries.js");

// DELETE /gratitudes/:id
router.delete("/:id", (req, response) => {
  if (!req.params.id) return;
  // remove item from db
  gratitudeQueries.deleteGratitude(req.params.id).then((res) => {
    if (res.length > 0) {
      response.status(200).send(res);
    } else response.status(500).send([]);
  });
});

module.exports = router;
