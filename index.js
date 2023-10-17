const express = require("express");
const PORT = 2000;
const app = express();
const routes = require("./routes");

app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
