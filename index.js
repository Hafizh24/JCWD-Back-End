const express = require("express");
const PORT = 2001;
const db = require("./models");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/public", express.static("./public"));

app.get("/api", (req, res) => {
  res.send("This is my API");
});

const { userRouter } = require("./routers");
app.use("/users", userRouter);

app.listen(PORT, () => {
  // db.sequelize.sync({ alter: true });
  console.log(`Server running on Port : ${PORT}`);
});
