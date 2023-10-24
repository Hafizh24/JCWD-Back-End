const router = require("express").Router();
const { userController } = require("../controllers");

router.get("/", userController.getAll);
router.get("/login", userController.login);
router.get("/:id", userController.getbyId);
router.post("/", userController.register);

module.exports = router;
