const express = require("express");
const PORT = 2002;
const app = express();
const db = require("./database");
const { studentRoute } = require("./routes");

app.use(express.json());

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("mysql connected");
  }
});
app.use("/students", studentRoute);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
