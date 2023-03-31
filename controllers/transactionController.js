const axios = require("axios");
require("dotenv").config();
const { isAddress } = require("web3-utils");
const API_KEY = process.env.API_KEY;
const User = require("../models/userSchema");

const getTransaction = async (req, res) => {
  const address = req.params.address;
  //   console.log(address);
  //   console.log(req.body);

  // Validate address
  if (!isAddress(address)) {
    return res.status(400).json({ message: "Invalid address format" });
  }

  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${API_KEY}`;

  const response = await axios.get(url);
  // console.log(response.data);
  // res.status(200).json(response.data);
  console.log(response.data.result);
  //balance
  let balance = 0;
  // let size = response.data.result.length();
  for (let i = 0; i < response.data.result.length; i++) {
    if (response.data.result[i].to === address) {
      balance = balance + Number(response.data.result[i].value);

      // console.log("address is same as to");
    } else if (response.data.result[i].from === address) {
      balance = balance - Number(response.data.result[i].value);
      // console.log(balance);
      // console.log("address is same as from");
    }
  }
  // converting gwei in eth
  balance = balance * 0.000000001;
  console.log(balance);

  //Storing balance and transaction in MongoDB database
  try {
    const resp = await User.create({
      address: address,
      transaction: response.data.result,
      balance: balance,
    });

    console.log(resp); // check the response from the database

    res
      .status(201)
      .send({ message: "Address , transaction , balance added successfully" });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = getTransaction;
