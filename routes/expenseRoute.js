const router = require("express").Router();
const { expenseController } = require("../controllers");
const { middleware } = require("../middlewares");

router.get("/", expenseController.getExpenseList);
// router.get("/total", expenseController.getTotalExpenseByCategory);
// router.get("/total", expenseController.getTotalExpenseByDate);
router.get("/:id", expenseController.getExpenseDetail);
router.post("/", middleware.createId, middleware.createDate, expenseController.createExpense);
router.patch("/:id", expenseController.updateById);
router.delete("/:id", expenseController.deleteById);

module.exports = router;
