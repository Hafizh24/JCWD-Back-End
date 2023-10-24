const express = require("express");
const route = express.Router();
const userRoute = require("./userRouter");
const tweetRoute = require("./tweetRouter");

route.use("/user", userRoute);
route.use("/tweets", tweetRoute);

module.exports = route;
