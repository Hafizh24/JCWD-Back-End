let data = [
  { id: 1, username: "user1", password: "asdf" },
  { id: 2, username: "user2", password: "asdf" },
  { id: 3, username: "user3", password: "asdf" },
];

module.exports = {
  getAll: (req, res) => {
    res.status(200).send(data);
  },
  getById: (req, res) => {
    let id = req.params.id;
    let filteredData = data.filter((item) => item.id == id);
    res.send(filteredData);
  },
  addData: (req, res) => {
    const id = data.length + 1;
    let { username, password } = req.body;

    if (username && password) {
      data.push({ id, username, password });
      res.status(201).send("User added successfully.");
    } else {
      res.status(400).send("Invalid data");
    }
  },
  editData: (req, res) => {
    let id = req.params.id;
    let { username, password } = req.body;

    let user = data.find((item) => item.id == id);

    if (user) {
      if (username) {
        user.username = username;
      } else {
        user.username;
      }

      if (password) {
        user.password = password;
      } else {
        user.password;
      }
      res.send(data);
    } else {
      res.send("user not found");
    }
  },
  deleteData: (req, res) => {
    let id = req.params.id;
    let filteredData = data.filter((item) => item.id != id);

    if (filteredData.length < data.length) {
      data = filteredData;
      res.send(`user with id: ${id} deleted successfully`);
    } else {
      res.send("user not found");
    }
  },
};
