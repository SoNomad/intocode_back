const { Router } = require("express");
const { studentsController } = require("../controllers/students.controller");
const router = Router();

router.post("/student", studentsController.add); //добавить студента
router.patch("/student/:id", studentsController.edit); //редактировать через айди
router.delete("/student/:ud", studentsController.delete); //удалить по айди
router.patch("/student/:id/note", studentsController.addNote); //показать всех студентов
router.get("/student/:id/note", studentsController.getSudentNote); //добавить примечания студенту по айди
router.get("/student", studentsController.getAll); //показать примечания студента по айди
router.get("/student/paystatus/:paystatus", studentsController.getStudentByPayStatus); //показать студентов по статусу (0% / 50% / 100%) оплаты
router.get("/student/status/:status", studentsController.getStudentByStatus); //показать студентов по статусу (study / searching / offered / working) (searching - в поисках работы)
router.get("/group/offered/:id", studentsController.getOffered); //показать процент студентов в определенной группе, получивших оффер

module.exports = router;
