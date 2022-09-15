const { Router } = require("express");
const { groupsController } = require("../controllers/groups.controller");
const router = Router();

router.post("/group", groupsController.add);
router.patch("/group/:id", groupsController.edit);
router.delete("/group/:id", groupsController.delete);
router.get("/group", groupsController.get);
router.get("/group/:id/sudents", groupsController.getGroupPeople);
router.get("/group/:week", groupsController.getGroupByWeek);
router.get("/group/finished/list", groupsController.getFinishedGroup);

module.exports = router;
