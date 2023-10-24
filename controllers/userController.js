const fs = require("fs");

let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

module.exports = {
  getAll: (req, res) => {
    res.status(200).send(data);
  },
  getbyId: (req, res) => {
    const id = req.params.id;
    const filteredId = data.filter((item) => item.id == id);
    if (filteredId.length == 1) {
      res.status(200).send(filteredId);
    } else {
      res.status(400).send("user not found");
    }
  },
  register: (req, res) => {
    const id = data.length ? Math.max(...data.map((item) => item.id)) + 1 : 1;
    req.body.id = id;
    data.push(req.body);
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.status(201).send("Register success");
  },
  login: (req, res) => {
    const { email, password } = req.query;
    const filteredId = data.filter((item) => item.email == email && item.password == password);
    if (filteredId.length == 1) {
      res.status(200).send(filteredId);
    } else {
      res.status(400).send("user not found");
    }
  },
};
