const db = require("../models");
const User = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const handlebars = require("handlebars");
const transporter = require("../middleware/transpoter");

module.exports = {
  register: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const isEmailExist = await User.findOne({
        where: {
          email,
        },
      });

      if (isEmailExist) {
        return res.status(400).send({ message: "email has been used" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      await User.create({
        username,
        email,
        password: hashPassword,
      });

      const data = fs.readFileSync("./template.html", "utf-8");
      const tempCompile = await handlebars.compile(data);
      const tempResult = tempCompile({ username: username });

      await transporter.sendMail({
        from: "hafizhcbs@gmail.com",
        to: email,
        subject: "Email Confirmation",
        html: tempResult,
      });

      res.status(201).send("Register Success");
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
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

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

      const payload = { id: isUserExist.id, isAdmin: isUserExist.isAdmin };
      const token = jwt.sign(payload, "JCWD08", { expiresIn: "1h" });

      res.status(200).send({ message: "login success", result: isUserExist, token: token });
    } catch (error) {
      console.log(error);
      res.status(400).send({ err: error.message });
    }
  },
  keeplogin: async (req, res) => {
    try {
      //   console.log(req.user);
      //   res.status(200).send("keep login");
      const result = await User.findOne({
        where: {
          id: req.user.id,
        },
      });
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      response.status(400).send({ err: error.message });
    }
  },
  editUser: async (req, res) => {
    try {
      const result = await User.update(req.body, {
        where: {
          id: req.user.id,
        },
      });
      res.status(200).send({ data: result });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },
  changePassword: async (req, res) => {
    try {
      const { password } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const result = await User.update(
        {
          password: hashPassword,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );

      res.status(200).send("berhasil diubah");
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: err.message });
    }
  },
  updateImage: async (req, res) => {
    try {
      await User.update(
        {
          imgProfile: req.file?.path,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      res.status(200).send("success upload");
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: error.message });
    }
  },
};
