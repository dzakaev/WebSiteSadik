const { Router } = require("express");
const { commentController } = require("../controllers/comment.controller");

const router = Router();

router.get("/", commentController.commentAll);
router.get("/:id", commentController.commentId);
router.post("/:id", commentController.postComment);
router.patch("/:id", commentController.patchComment);


module.exports = router;
