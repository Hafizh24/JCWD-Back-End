const ndoemailer = require("nodemailer");

const transporter = ndoemailer.createTransport({
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
