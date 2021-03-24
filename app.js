require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");
const stripeRouter = require("./routes/stripePayment");
const braintreeRouter = require("./routes/braintree");
const orderRouter = require("./routes/order");

const port = process.env.PORT || 8000;

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", stripeRouter);
app.use("/api", braintreeRouter);
app.use("/api", orderRouter);

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB CONNECTED !");
  })
  .catch(() => {
    console.log("CONNECTION ERROR!");
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
