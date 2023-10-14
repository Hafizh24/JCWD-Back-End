const express = require("express");
const route = express.Router();
const userRoute = require("./userRouter");

route.use("/", userRoute);

module.exports = route;
