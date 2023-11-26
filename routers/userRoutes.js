const router = require("express").Router();
const { userController } = require("../controllers");
const { verifyToken, checkRole } = require("../middleware/auth");
const { multerUpload } = require("../middleware/multer");
const { checkRegister } = require("../middleware/validator");

router.get("/", verifyToken, checkRole, userController.getAll);
router.post("/", checkRegister, userController.register);
router.post("/login", userController.login);
router.get("/keep-login", verifyToken, userController.keeplogin);
router.patch("/keep-login", verifyToken, userController.editUser);
router.patch("/change-password", verifyToken, userController.changePassword);
router.patch(
  "/change-image",
  verifyToken,
  multerUpload().single("file"),
  userController.updateImage
);

module.exports = router;
