const router = require("express").Router();
const { userController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");

router.patch("/verify", verifyToken, userController.updateVerified);
router.post("/", userController.register);
router.get("/login", userController.login);
router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.patch("/:id", userController.editById);
router.delete("/:id", userController.deleteById);

module.exports = router;
