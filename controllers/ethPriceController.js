const axios = require("axios");
const ethPrice = require("../models/ethPriceSchema");
const getEthPrice = async (req, res) => {
  const url =
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr";

  try {
    let count = 1;
    const response = await axios.get(url);
    const result = ethPrice.findOne({ ethPrice: { $exists: true } });

    const func = async () => {
      const updatedResponse = await axios.get(url);
      console.log(updatedResponse.data);
      const resp = await ethPrice.findOneAndUpdate(
        { ethPrice: { $exists: true } },
        { $set: { ethPrice: updatedResponse.data.ethereum.inr } }
      );
      if (count) {
        res.status(200).json(resp);
        count--;
      }
    };

    // Checking if the ethereum price is stored in mongoDB
    if (result) {
      console.log("eth is present");
      setInterval(func, 10 * 60 * 1000);
    } else {
      await ethPrice
        .create({ ethPrice: response.data.ethereum.inr })
        .then(() => {
          setInterval(func, 10 * 60 * 1000);
        });
      res.status(201).send({ message: "Eth Price created successfully" });
    }
  } catch (error) {
    res.status(500).send({ message: "Cannot fetch eth price" });
  }
};

module.exports = getEthPrice;
