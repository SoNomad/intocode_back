const { Router } = require("express");
const { studentsController } = require("../controllers/students.controller");
const router = Router();

router.post("/student", studentsController.add);
router.patch("/student/:id", studentsController.edit);
router.delete("/student/:ud", studentsController.delete);
router.patch("/student/:id/note", studentsController.addNote);
router.get("/student/:id/note", studentsController.getSudentNote);
router.get("/student", studentsController.getAll);
router.get(
  "/student/paystatus/:paystatus",
  studentsController.getStudentByPayStatus
);
router.get("/student/status/:status", studentsController.getStudentByStatus);
router.get("/group/offered/:id", studentsController.getOffered);

module.exports = router;
