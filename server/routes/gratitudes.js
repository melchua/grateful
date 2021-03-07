import express from "express";
const router = express.Router();
// import gratitudeQueries from "../db/gratitude-queries.js";

// GET /gratitudes
router.get("/", (req, res) => {
  userqueries.getAllUsers((users) => {
    res.json(users);
  });
});
