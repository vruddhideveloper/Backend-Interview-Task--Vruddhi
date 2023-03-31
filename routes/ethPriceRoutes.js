const express = require("express");

const router = express.Router();

const getEthPrice = require("../controllers/ethPriceController");

router.get("/", getEthPrice);

module.exports = router;
