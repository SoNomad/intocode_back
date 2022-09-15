const Student = require("../models/Student.model");

module.exports.studentsController = {
  //добавить студента
  add: async (req, res) => {
    try {
      const { name, payStatus, notes, group, status } = req.body;
      const student = await Student.create({
        name,
        payStatus,
        notes,
        group,
        status,
      });
      res.json(student);
    } catch (e) {
      res.json(e);
    }
  },
  //редактировать через айди
  edit: async (req, res) => {
    try {
      const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(student);
    } catch (e) {
      res.json(e.message);
    }
  },
  //удалить по айди
  delete: async (req, res) => {
    await Student.findByIdAndDelete(req.params.id, (err, student) => {
      if (err) return res.json(err);

      res.json(`Student ${student.name} deleted`);
    });
  },
  //показать всех студентов
  getAll: async (req, res) => {
    try {
      const student = await Student.find({}, { name: 1, group: 1 }).populate(
        "group",
        "name"
      );
      res.json(student);
    } catch (e) {
      res.json(e);
    }
  },
  //добавить примечания студенту по айди
  addNote: async (req, res) => {
    try {
      const student = await Student.findByIdAndUpdate(
        req.params.id,
        {
          $push: { notes: req.body.text },
        },
        { new: true }
      );
      res.json(student);
    } catch (e) {
      res.json(e.message);
    }
  },
  //показать примечания студента по айди
  getSudentNote: async (req, res) => {
    try {
      const notes = await Student.findById(req.params.id, {
        name: 1,
        notes: 1,
      });
      res.json(notes);
    } catch (e) {
      res.json(e);
    }
  },
  //показать студентов по статусу (0% / 50% / 100%) оплаты
  getStudentByPayStatus: async (req, res) => {
    try {
      const student = await Student.find({ payStatus: req.params.paystatus });
      res.json(student);
    } catch (e) {
      res.json(e);
    }
  },
  //показать студентов по статусу (study / searching / offered / working) (searching - в поисках работы)
  getStudentByStatus: async (req, res) => {
    try {
      const student = await Student.find(
        { status: req.params.status },
        { name: 1, group: 1, status: 1 }
      ).populate("group", "name week");

      res.json(student);
    } catch (e) {
      res.json(e);
    }
  },
  //показать процент студентов в определенной группе, получивших оффер
  getOffered: async (req, res) => {
    try {
      const groupArr = await Student.find({ group: req.params.id });
      const offered = await Student.find({
        group: req.params.id,
        status: "offered",
      });
      const offered_percent = (offered.length / groupArr.length) * 100;
      res.json(offered_percent + "%");
    } catch (e) {
      res.json(e.message);
    }
  },
};
