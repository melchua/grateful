const express = require("express");
const router = express.Router();
const userqueries = require("../db/user-queries.js");

// GET /users/:sub
router.get("/:sub", (req, res) => {
  userqueries.getUserBySub(req.params.sub).then((user) => {
    res.json(user);
  });
});

// POST /users/
router.post("/", (req, res) => {
  userqueries.addUserBySub(req.query.sub);
  res.status(201).send();
});

// PUT /users/:user_id
router.put("/:id", (req, res) => {
  userqueries.updateUserById(req.params.id, req.body.phoneNumber);
  res.status(201).send();
})

// for testing purposes
router.post("/veri/:id", (req, res) => {
  userqueries.setVerifiedFalse(req.params.id);
  res.status(201).send();
})

// GET /users/gratitudes/:user_id
router.get("/gratitudes/:id", (req, res) => {
  userqueries.getGratitudesByUserId(req.params.id).then((gratitudes) => {
    res.json(gratitudes);
  });
});

// POST /users/gratitudes/
router.post("/gratitudes/", (req, res) => {
  userqueries.addGratitudeByUserId(req.body.user_id, req.body.description);
  res.status(201).send();
});

// Unused Routes
// GET /users/
router.get("/", (req, res) => {
  userqueries.getAllUsers((users) => {
    res.json(users);
  });
});

module.exports = router;
