const fs = require("fs");

let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

module.exports = {
  getExpenseList: (req, res) => {
    const { category, startdate, enddate } = req.query;
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

    if (category) {
      data = data.filter((expense) => expense.category == category);

      const totalExpense = filteredCategory.reduce(
        (total, expense) => total + expense.nominal,
        0
      );
      res.status(200).json({ total: totalExpense, data: filteredCategory });
    }
    if (startdate && enddate) {
      const start = new Date(startdate);
      const end = new Date(enddate);

      data = data.filter((item) => {
        const expenseDate = new Date(item.date);

        return expenseDate >= start && expenseDate <= end;
      });
    }

    const total = data.reduce((total, expense) => total + expense.nominal, 0);
    res.status(200).json({
      total: total.toLocaleString("id-ID", { styele: "currency", currency: "IDR" }),
      data,
    });
  },
  getExpenseDetail: (req, res) => {
    const id = req.params.id;
    const filteredId = data.filter((item) => item.id == id);
    if (filteredId.length == 1) {
      res.status(200).send(filteredId);
    } else {
      res.status(400).send("data not found");
    }
  },
  getTotalExpenseByCategory: (req, res) => {
    // const { category } = req.query;
    // if (!category) {
    //   return res.status(400).json({ error: "Category is required." });
    // }
    // const filteredCategory = data.filter((expense) => expense.category == category);
    // const totalExpense = filteredCategory.reduce(
    //   (total, expense) => total + expense.nominal,
    //   0
    // );
    // res.status(200).json({ total: totalExpense, data: filteredCategory });
  },
  getTotalExpenseByDate: (req, res) => {
    // const { startdate, enddate } = req.query;
    // 5
    // const start = new Date(startdate);
    // const end = new Date(enddate);
    // const expenseInRange = data.filter((item) => {
    //   const expenseDate = new Date(item.date);
    //   return expenseDate >= start && expenseDate <= end;
    // });
    // const totalExpense = expenseInRange.reduce((total, expense) => total + expense.nominal, 0);
    // res.status(200).json({ total: totalExpense, data: expenseInRange });
  },
  createExpense: (req, res) => {
    data.push(req.body);
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.status(201).send("transaction success");
  },
  updateById: (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    const index = data.findIndex((item) => item.id == id);

    if (index !== -1) {
      data[index] = { ...data[index], ...updateData };
      res.status(200).send(data[index]);
    } else {
      res.status(400).send("data not found");
    }
  },
  deleteById: (req, res) => {
    const id = req.params.id;
    const index = data.findIndex((item) => item.id == id);
    if (index >= 0) {
      data.splice(index, 1);
      res.status(200).send(data);
    } else {
      res.status(400).send("data not found");
    }
  },
};
