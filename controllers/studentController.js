const db = require("../database");

module.exports = {
  getAll: (req, res) => {
    db.query("select * from students", (err, result) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(200).json({ status: "success", data: result });
      }
    });
  },
  getById: (req, res) => {
    const id = req.params.id;
    db.query(`select * from students where id=${id}`, (err, result) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(200).json({ status: "success", data: result });
      }
    });
  },
  addStudent: (req, res) => {
    const { name, age, address, gender } = req.body;

    db.query(
      `insert into students (name,age,adress,gender) values(${db.escape(name)},${db.escape(
        age
      )},${db.escape(address)},${db.escape(gender)})`,
      (err, result) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          res.status(201).json({ status: "success", data: result });
        }
      }
    );
  },
  updateByid: (req, res) => {
    const id = req.params.id;

    let value = [];

    for (const key in req.body) {
      if (typeof req.body[key] == "string") {
        value.push(`${key} = "${req.body[key]}"`);
      } else {
        value.push(`${key} = ${req.body[key]}`);
      }
    }

    res.send("success");

    db.query(`update students set ${value.join(", ")} where id = ${id}`, (err, result) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(201).json({ status: "success", data: result });
      }
    });
  },
  deleteById: (req, res) => {
    const id = req.params.id;
    db.query(`delete from students where id = ${id}`, (err, result) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(200).json({ status: "success deleted", data: result });
      }
    });
  },
};
