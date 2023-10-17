const moment = require("moment");
const fs = require("fs");

let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

module.exports = {
  createId: (req, res, next) => {
    const id = data.length ? Math.max(...data.map((item) => item.id)) + 1 : 1;
    req.body.id = id;

    next();
  },
  createDate: (req, res, next) => {
    const formattedDate = moment(new Date()).format("MM-DD-YYY");
    req.body.date = formattedDate;

    next();
  },
};
