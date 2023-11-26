const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hafizhcbs@gmail.com",
    pass: "ghuu ozbc lhhg xcnq",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
