const mongoose = require("mongoose");

const ethPrice = new mongoose.Schema({
  ethPrice: {
    type: Number,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("ethPrice", ethPrice);
