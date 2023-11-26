const express = require("express");
const port = 2001;
const app = express();
const axios = require("axios");
const ioRedis = require("ioredis");
const client = ioRedis.createClient(6379);

client.on("connect", () => {
  console.log(`success connected to redis`);
});

app.get("/dogs", async (req, res) => {
  const { data } = await axios.get("https://dog.ceo/api/breeds/list/all");
  res.status(200).send(data);
});

app.get("/dogs/:breeds", async (req, res) => {
  try {
    const { breeds } = req.params;

    client.get(breeds, async (err, dogs) => {
      if (dogs) {
        return res.status(200).send(dogs);
      }
      const { data } = await axios.get(`https://dog.ceo/api/breed/${breeds}/images`);
      client.setex(breeds, 100, JSON.stringify(data));
      res.status(200).send(data);
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
