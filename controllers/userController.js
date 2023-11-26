const db = require("../models");
const User = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const handlebars = require("handlebars");
const transpoter = require("../middleware/transpoter");

module.exports = {
  register: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (user) {
        return res.status(400).send("user already exist");
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const result = await User.create({
        username,
        email,
        password: hashPassword,
      });

      const payload = { id: result.id };
      const token = jwt.sign(payload, "JCWD08");

      const data = fs.readFileSync("./template.html", "utf-8");
      const tempCompile = await handlebars.compile(data);
      const tempResult = tempCompile({ username: username, token: token });

      await transpoter.sendMail({
        from: "hafizhcbs@gmail.com",
        to: email,
        subject: "Email Confirmation",
        html: tempResult,
      });

      res.status(200).send("Register Success");
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const result = await User.findAll();
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },
  getById: async (req, res) => {
    try {
      const result = await User.findOne({
        attributes: {
          exclude: ["password"],
        },
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.query;
      const isUserExist = await User.findOne({
        where: {
          email,
        },
      });

      if (!isUserExist) {
        return res.status(404).send({ message: "user not found" });
      }

      const isValid = await bcrypt.compare(password, isUserExist.password);

      if (!isValid) {
        return res.status(400).send({ message: "incorrect password" });
      }

      const payload = { id: isUserExist.id };
      const token = jwt.sign(payload, "JCWD08");

      res.status(200).json({ message: "login success", token: token });
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: err.message });
    }
  },
  deleteById: async (req, res) => {
    try {
      const result = await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send({ data: result });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },
  editById: async (req, res) => {
    try {
      const result = await User.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send({ data: result });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },
  updateVerified: async (req, res) => {
    try {
      await User.update(
        {
          isVerified: 1,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );

      res.status(200).send({ message: "success update" });
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  },
};
