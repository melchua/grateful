const express = require("express");
const router = express.Router();
const { sendSMS } = require("../services/twilio");

router.post("/", (req, res) => {
  sendSMS(req.body.to, req.body.body);
  res.status(201).send();
});

module.exports = router;
