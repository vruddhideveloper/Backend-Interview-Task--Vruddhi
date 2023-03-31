const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  address: {
    type: String,
    unique: true,
    required: true,
  },
  transaction: {
    type: Array,
    required: true,
  },
  balance: {
    type: Number,
  },
});

module.exports = mongoose.model("User", userSchema);
