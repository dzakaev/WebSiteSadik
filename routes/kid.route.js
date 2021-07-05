const { Router } = require("express");
const { kidController } = require("../controllers/kid.controller");

const router = Router();

router.get("/", kidController.getAll);
router.get("/:id", kidController.getKidId);
router.post("/", kidController.postKid);
router.patch("/:id", kidController.patchKid);
router.delete("/:id", kidController.deleteKid);

module.exports = router;
