const router = require("express").Router();
const { studentController } = require("../controllers");

router.get("/", studentController.getAll);
router.get("/:id", studentController.getById);
router.post("/", studentController.addStudent);
router.patch("/:id", studentController.updateByid);
router.delete("/:id", studentController.deleteById);

module.exports = router;
