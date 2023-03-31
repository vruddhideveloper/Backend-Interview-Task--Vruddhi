const axios = require("axios");
const userSchema = require("../models/userSchema");
const getBalance = async (req, res) => {
  const address_fetched = req.params.address;
  try {
    const response = await userSchema.findOne({ address: address_fetched });

    console.log(response.balance);
    res.status(200).send({ message: `Balance Fetched : ${response.balance}` });
  } catch (err) {
    console.log("Something went wrong");
  }
};

module.exports = getBalance;
