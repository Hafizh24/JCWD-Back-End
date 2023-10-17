const express = require("express");
const route = express.Router();
const expenseRoute = require("./expenseRoute");

route.use("/expense", expenseRoute);

module.exports = route;
