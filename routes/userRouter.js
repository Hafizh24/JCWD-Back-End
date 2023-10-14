const router = require("express").Router();
const { userController } = require("../controllers");

router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.post("/", userController.addData);
router.patch("/:id", userController.editData);
router.delete("/:id", userController.deleteData);

module.exports = router;
