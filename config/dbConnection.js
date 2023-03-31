const mongoose = require("mongoose");
require("dotenv").config();
const connectDb = async () => {
  try {
    mongoose
      .connect(
        "mongodb+srv://vruddhi:vruddhi9@cluster0.1cpgefk.mongodb.net/?retryWrites=true&w=majority",
        {
          useUnifiedTopology: true,
        }
      )
      .then(() =>
        console.log(
          "==============Mongodb Database Connected Successfully=============="
        )
      )
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = connectDb;
