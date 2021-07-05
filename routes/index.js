const { Router } = require("express");
const router = Router();

router.use('/kids',require("./kid.route"));
router.use('/comments',require("./comment.route"));
router.use('/status',require("./status.route"));

module.exports = router;
