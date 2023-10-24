const fs = require("fs");

let data = JSON.parse(fs.readFileSync("./tweets.json", "utf-8"));

module.exports = {
  getAll: (req, res) => {
    res.status(200).send(data);
  },
  post: (req, res) => {
    const id = data.length ? Math.max(...data.map((item) => item.id)) + 1 : 1;
    req.body.id = id;
    data.push(req.body);
    fs.writeFileSync("./tweets.json", JSON.stringify(data));
    res.status(201).send("Post success");
  },
};
