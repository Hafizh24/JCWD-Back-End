const express = require("express");
const PORT = 2000;
const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("This is my API");
});

app.listen(PORT, () => {
  // db.sequelize.sync({ alter: true });
  console.log(`Server running on Port : ${PORT}`);
});
