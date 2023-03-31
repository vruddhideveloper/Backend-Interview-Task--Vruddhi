const express = require("express");

const getTransaction = require("../controllers/transactionController");
const router = express.Router();

router.get("/:address", getTransaction);

module.exports = router;
