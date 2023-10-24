const router = require("express").Router();
const { tweetController } = require("../controllers");

router.get("/", tweetController.getAll);
router.post("/", tweetController.post);

module.exports = router;
