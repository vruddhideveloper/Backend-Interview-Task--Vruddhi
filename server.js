const express = require("express");
require("dotenv").config();
const connectDb = require("./config/dbConnection");
const app = express();

connectDb();
const PORT = process.env.PORT || 5000;

app.use("/api/transaction", require("./routes/transactionRoutes"));
app.use("/api/ethPrice", require("./routes/ethPriceRoutes"));
app.use("/api/balance", require("./routes/balanceRoutes"));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on ${PORT}`);
});
