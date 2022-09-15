const { Router } = require("express");
const { groupsController } = require("../controllers/groups.controller");
const router = Router();

router.post("/group", groupsController.add); //создать группу
router.patch("/group/:id", groupsController.edit); //редактирование группы по айди
router.delete("/group/:id", groupsController.delete); //удаление группы по айди
router.get("/group", groupsController.get); //показать все группы
router.get("/group/:id/sudents", groupsController.getGroupPeople); //показать студентов определенной по айди группы
router.get("/group/:week", groupsController.getGroupByWeek); //покзаать группы по неделе обучения
router.get("/group/finished/list", groupsController.getFinishedGroup); //показать группы, завершившие обучение

module.exports = router;
