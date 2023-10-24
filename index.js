const express = require("express");
const cors = require("cors");
const PORT = 2000;
const app = express();
const routes = require("./routes");

app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
