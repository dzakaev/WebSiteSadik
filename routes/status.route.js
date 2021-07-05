const { Router } = require("express");
const { statusController } = require("../controllers/status.controller");

const router = Router();

router.get("/", statusController.allStatus);
router.get("/:id", statusController.idStatus);
router.post("/:id",statusController.postStatus);
router.patch("/:id", statusController.patchStatus)

module.exports = router;
