const express = require("express");

const router = express.Router();

const getBalance = require("../controllers/balanceController");

router.get("/:address", getBalance);

module.exports = router;
