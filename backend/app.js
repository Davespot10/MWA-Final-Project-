const express = require("express");
const cors = require("cors");
require("dotenv").config();
const userRouter = require("./routers/userRouter")
const { dbConnect } = require("./db/connection");
const morgan = require('morgan');

const app = express();
app.use(morgan("dev"))


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





try {
  dbConnect();
} catch (err) {
  console.log("database not connected due to : " + err);
}
app.use("/user", userRouter);





app.use("*", (req, res, next) => {
  next(new Error("Route Not found"));
});

app.use((err, req, res, next) => {
  res.status(400).json({
    success: false,
    data: err.message,
  });
});
app.listen(process.env.PORT || 3000, () => {
  console.log("running on port 3000");
});
